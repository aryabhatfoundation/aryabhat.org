// ============================================================
// CourseDB — the query layer over window.COURSES.
//
// Sibling of db.js, same rules: runs in the browser and in Node
// (cli.js fakes a `window` and requires the same files), no
// dependencies, ES5-ish.
//
// A course is an ordered delivery plan over concept ids. This file
// holds the checks that only become possible once delivery order
// exists — and that nobody catches by eye:
//
//   coverage()   every concept's prereqs are taught earlier in the
//                course, or declared in `assumes`. Catches the gap
//                BEFORE the workshop, not during it.
//   moonSolve()  is there any start date in the 29.53-day lunar
//                cycle that satisfies every dated session at once?
//                Brute force beats intuition here: "dark sky Friday,
//                first-quarter Saturday" is impossible and does not
//                look impossible.
//
// CourseDB.build(conceptDB) is idempotent; call it again after
// mutating window.COURSES. It needs a built ConceptDB — courses are
// meaningless without the graph they plan over.
// ============================================================

(function (global) {
    "use strict";

    var SYNODIC = 29.53;

    function arr(v) { return Array.isArray(v) ? v.slice() : []; }

    // ---------------- normalization ----------------

    function normSession(s, i) {
        return {
            idx: i,
            title: s.title,
            mode: s.mode,
            duration: Number(s.duration) || 0,
            day: s.day === undefined ? null : Number(s.day),
            concepts: arr(s.concepts),
            equipment: arr(s.equipment),
            sky: s.sky ? { moon: s.sky.moon || "any", targets: arr(s.sky.targets) } : null,
            notes: s.notes || ""
        };
    }

    function normCourse(c) {
        return {
            id: c.id,
            name: c.name,
            kind: c.kind,
            audience: c.audience,
            blurb: c.blurb || "",
            assumes: arr(c.assumes),
            sessions: arr(c.sessions).map(normSession),
            status: c.status || "published",
            sources: arr(c.sources)
        };
    }

    // ---------------- build ----------------

    var _db = null;

    function build(courses, conceptDB) {
        var list = (courses || global.COURSES || []).map(normCourse);
        var byId = {};
        list.forEach(function (c) { byId[c.id] = c; });
        _db = {
            all: list,
            byId: byId,
            concepts: conceptDB,
            kinds: global.COURSE_KINDS || {},
            modes: global.SESSION_MODES || {},
            moonReqs: global.MOON_REQS || {},
            targets: global.TARGETS || {},
            equipment: global.EQUIPMENT || {},
            tracks: global.CONCEPT_TRACKS || {}
        };
        return _db;
    }

    function db() {
        if (!_db) throw new Error("CourseDB.build(courses, conceptDB) must run first");
        return _db;
    }

    function byId(id) { return db().byId[id] || null; }
    function all() { return db().all.slice(); }

    // ---------------- assumed knowledge ----------------

    // `assumes` is closed under prereqs: taking `moon-phases` as known
    // means taking everything beneath it as known too. Without this the
    // author would have to list the whole ancestor chain by hand, which
    // nobody does correctly, so coverage() would drown in false errors.
    function assumedClosure(course) {
        var C = db().concepts;
        var set = {};
        course.assumes.forEach(function (id) {
            if (!C.byId(id)) return;
            set[id] = 1;
            Object.keys(C.ancestorsOf(id)).forEach(function (a) { set[a] = 1; });
        });
        return set;
    }

    // Every concept the course teaches, mapped to the session index that
    // teaches it first.
    function taughtIndex(course) {
        var seen = {};
        course.sessions.forEach(function (s) {
            s.concepts.forEach(function (id) {
                if (seen[id] === undefined) seen[id] = s.idx;
            });
        });
        return seen;
    }

    // ---------------- coverage ----------------

    // The core check. For every concept taught in session i, every one of
    // its prereqs must be taught in session <= i, or be assumed. Anything
    // else is a hole the trainer will fall into live.
    function coverage(courseOrId) {
        var course = typeof courseOrId === "string" ? byId(courseOrId) : courseOrId;
        var C = db().concepts;
        var taught = taughtIndex(course);
        var assumed = assumedClosure(course);
        var gaps = [];

        course.sessions.forEach(function (s) {
            s.concepts.forEach(function (id) {
                var c = C.byId(id);
                if (!c) return; // reported by validate()
                c.prereqs.forEach(function (p) {
                    if (assumed[p]) return;
                    var at = taught[p];
                    if (at !== undefined && at <= s.idx) return;
                    gaps.push({
                        session: s.idx,
                        sessionTitle: s.title,
                        concept: id,
                        missing: p,
                        // Distinguishing these two matters: "taught too late"
                        // is a reorder, "never taught" is a decision.
                        reason: at === undefined ? "never-taught" : "taught-later"
                    });
                });
            });
        });
        return gaps;
    }

    // What a course would have to assume to be self-consistent, if you
    // are not going to teach the missing prereqs. This is the "just make
    // it valid" escape hatch — and printing it is usually enough to show
    // the author that they are assuming too much.
    function impliedAssumes(courseOrId) {
        var course = typeof courseOrId === "string" ? byId(courseOrId) : courseOrId;
        var C = db().concepts;
        var taught = taughtIndex(course);
        var set = {};
        Object.keys(taught).forEach(function (id) {
            var c = C.byId(id);
            if (!c) return;
            Object.keys(C.ancestorsOf(id)).forEach(function (a) {
                if (taught[a] === undefined) set[a] = 1;
            });
        });
        return C.teachingSort(Object.keys(set));
    }

    // ---------------- moon solver ----------------

    function inWindow(age, windows) {
        for (var i = 0; i < windows.length; i++) {
            if (age >= windows[i][0] && age <= windows[i][1]) return true;
        }
        return false;
    }

    // Brute-force every start age in the cycle at quarter-day steps and
    // keep the ones under which every dated session's moon requirement
    // holds. Quarter-day resolution is far finer than the requirement
    // windows, which are days wide.
    function moonSolve(courseOrId) {
        var course = typeof courseOrId === "string" ? byId(courseOrId) : courseOrId;
        var REQS = db().moonReqs;
        var dated = course.sessions.filter(function (s) { return s.sky && s.day !== null; });
        if (!dated.length) return { constrained: false, feasible: true, windows: [], sessions: [] };

        var ok = [];
        for (var a0 = 0; a0 < SYNODIC; a0 += 0.25) {
            var good = dated.every(function (s) {
                var req = REQS[s.sky.moon];
                if (!req) return false;
                var age = (a0 + (s.day - 1)) % SYNODIC;
                return inWindow(age, req.windows);
            });
            if (good) ok.push(Math.round(a0 * 100) / 100);
        }

        // Collapse the accepted start ages into contiguous ranges, which is
        // what a human can act on: "start when the moon is 2–5 days old".
        var windows = [];
        ok.forEach(function (a) {
            var last = windows[windows.length - 1];
            if (last && Math.abs(a - last[1]) <= 0.26) last[1] = a;
            else windows.push([a, a]);
        });

        return {
            constrained: true,
            feasible: ok.length > 0,
            windows: windows,
            sessions: dated.map(function (s) {
                return { day: s.day, title: s.title, moon: s.sky.moon };
            })
        };
    }

    // Which session pairs are individually fine but jointly impossible.
    // Only worth computing when moonSolve() fails — it turns "this course
    // cannot be scheduled" into "these two nights are the reason".
    function moonConflicts(courseOrId) {
        var course = typeof courseOrId === "string" ? byId(courseOrId) : courseOrId;
        var REQS = db().moonReqs;
        var dated = course.sessions.filter(function (s) { return s.sky && s.day !== null; });
        var bad = [];
        for (var i = 0; i < dated.length; i++) {
            for (var j = i + 1; j < dated.length; j++) {
                var A = dated[i], B = dated[j], any = false;
                for (var a0 = 0; a0 < SYNODIC && !any; a0 += 0.25) {
                    var ra = REQS[A.sky.moon], rb = REQS[B.sky.moon];
                    if (!ra || !rb) continue;
                    if (inWindow((a0 + A.day - 1) % SYNODIC, ra.windows) &&
                        inWindow((a0 + B.day - 1) % SYNODIC, rb.windows)) any = true;
                }
                if (!any) bad.push({ a: A, b: B });
            }
        }
        return bad;
    }

    // ---------------- derived views ----------------

    // The course as a running order: sessions in order, concepts inside
    // each session in teaching order.
    function syllabus(courseOrId) {
        var course = typeof courseOrId === "string" ? byId(courseOrId) : courseOrId;
        var C = db().concepts;
        return course.sessions.map(function (s) {
            return {
                idx: s.idx, title: s.title, mode: s.mode, day: s.day,
                duration: s.duration, sky: s.sky, notes: s.notes,
                equipment: s.equipment,
                concepts: C.teachingSort(s.concepts).map(function (id) { return C.byId(id); })
            };
        });
    }

    // Union of equipment across a course, plus per-session lists. The
    // packing list nobody wants to build by hand.
    function kit(courseOrId) {
        var course = typeof courseOrId === "string" ? byId(courseOrId) : courseOrId;
        var set = {};
        course.sessions.forEach(function (s) {
            s.equipment.forEach(function (e) { (set[e] = set[e] || []).push(s.idx); });
        });
        return set;
    }

    // Every misconception the course will have to confront, in teaching
    // order. For teacher training this is close to being the syllabus:
    // knowing the wrong idea a student walks in with IS the skill.
    function misconceptions(courseOrId) {
        var course = typeof courseOrId === "string" ? byId(courseOrId) : courseOrId;
        var C = db().concepts;
        var out = [];
        C.teachingSort(Object.keys(taughtIndex(course))).forEach(function (id) {
            var c = C.byId(id);
            if (c && c.misconceptions.length) out.push({ id: id, name: c.name, items: c.misconceptions });
        });
        return out;
    }

    function stats(courseOrId) {
        var course = typeof courseOrId === "string" ? byId(courseOrId) : courseOrId;
        var C = db().concepts;
        var taught = Object.keys(taughtIndex(course));
        var minutes = 0, outdoor = 0;
        course.sessions.forEach(function (s) {
            minutes += s.duration;
            if ((db().modes[s.mode] || {}).outdoor) outdoor += s.duration;
        });
        var byLevel = {}, bySubject = {};
        taught.forEach(function (id) {
            var c = C.byId(id);
            if (!c) return;
            byLevel[c.level] = (byLevel[c.level] || 0) + 1;
            bySubject[c.subject] = (bySubject[c.subject] || 0) + 1;
        });
        return {
            sessions: course.sessions.length,
            concepts: taught.length,
            assumed: Object.keys(assumedClosure(course)).length,
            minutes: minutes,
            outdoorMinutes: outdoor,
            byLevel: byLevel,
            bySubject: bySubject
        };
    }

    // ---------------- validate ----------------

    function validate() {
        var d = db();
        var C = d.concepts;
        var errors = [], warnings = [];
        var seenId = {};

        d.all.forEach(function (co) {
            function err(msg) { errors.push({ id: co.id, msg: msg }); }
            function warn(msg) { warnings.push({ id: co.id, msg: msg }); }

            if (!co.id) return err("course has no id");
            if (seenId[co.id]) err("duplicate course id");
            seenId[co.id] = 1;
            if (!co.name) err("no name");
            if (!d.kinds[co.kind]) err("unknown kind '" + co.kind + "'");
            if (!d.tracks[co.audience]) err("unknown audience track '" + co.audience + "'");
            if (!co.sessions.length) err("no sessions");

            co.assumes.forEach(function (id) {
                if (!C.byId(id)) err("assumes unknown concept '" + id + "'");
            });

            var taught = taughtIndex(co);

            // Assuming something you also teach is a contradiction, and it
            // silently defeats coverage() — so it is an error, not a warning.
            co.assumes.forEach(function (id) {
                if (taught[id] !== undefined) {
                    err("'" + id + "' is in assumes but session " + (taught[id] + 1) + " also teaches it");
                }
            });

            co.sessions.forEach(function (s) {
                var where = "session " + (s.idx + 1) + " (" + (s.title || "untitled") + ")";
                if (!s.title) warn(where + " has no title");
                if (!d.modes[s.mode]) err(where + ": unknown mode '" + s.mode + "'");
                if (!s.duration) warn(where + " has no duration");
                if (s.duration > 240) warn(where + " runs " + s.duration + " min — long for one sitting");
                if (!s.concepts.length) warn(where + " teaches no concepts");

                s.concepts.forEach(function (id) {
                    if (!C.byId(id)) return err(where + ": unknown concept '" + id + "'");
                    var c = C.byId(id);
                    if (c.tracks.indexOf(co.audience) === -1) {
                        warn(where + ": '" + id + "' is not tagged for audience '" + co.audience + "'");
                    }
                    if (c.status === "draft") {
                        warn(where + ": '" + id + "' is still a draft concept");
                    }
                });

                s.equipment.forEach(function (e) {
                    if (!d.equipment[e]) err(where + ": unknown equipment '" + e + "'");
                });

                if (s.sky) {
                    if (!d.moonReqs[s.sky.moon]) err(where + ": unknown moon requirement '" + s.sky.moon + "'");
                    if (s.day === null) err(where + " has a sky constraint but no `day` — the moon solver needs it");
                    s.sky.targets.forEach(function (t) {
                        if (!d.targets[t]) err(where + ": unknown target '" + t + "'");
                    });
                }
                if ((d.modes[s.mode] || {}).outdoor && !s.sky) {
                    warn(where + " is an outdoor mode but declares no sky constraint");
                }
            });

            // Teaching the same concept twice is usually a copy-paste slip,
            // but it can be deliberate revision — warn, don't fail.
            var dupes = {};
            co.sessions.forEach(function (s) {
                s.concepts.forEach(function (id) {
                    dupes[id] = (dupes[id] || 0) + 1;
                });
            });
            Object.keys(dupes).forEach(function (id) {
                if (dupes[id] > 1) warn("'" + id + "' is taught in " + dupes[id] + " sessions");
            });

            // The headline check.
            coverage(co).forEach(function (g) {
                err("session " + (g.session + 1) + " teaches '" + g.concept + "' but prereq '" +
                    g.missing + "' is " +
                    (g.reason === "never-taught" ? "never taught and not in assumes"
                                                 : "not taught until later"));
            });

            // And the one no eye catches.
            var moon = moonSolve(co);
            if (moon.constrained && !moon.feasible) {
                err("no start date in the 29.53-day lunar cycle satisfies every night");
                moonConflicts(co).forEach(function (c) {
                    err("  day " + c.a.day + " wants '" + c.a.sky.moon + "' and day " + c.b.day +
                        " wants '" + c.b.sky.moon + "' — impossible " + Math.abs(c.b.day - c.a.day) + " days apart");
                });
            }
        });

        return { ok: errors.length === 0, errors: errors, warnings: warnings };
    }

    // ---------------- export ----------------

    global.CourseDB = {
        build: build,
        all: all,
        byId: byId,
        coverage: coverage,
        impliedAssumes: impliedAssumes,
        moonSolve: moonSolve,
        moonConflicts: moonConflicts,
        syllabus: syllabus,
        kit: kit,
        misconceptions: misconceptions,
        stats: stats,
        validate: validate,
        SYNODIC: SYNODIC
    };

})(typeof window !== "undefined" ? window : globalThis);
