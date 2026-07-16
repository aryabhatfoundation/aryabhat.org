// ============================================================
// ConceptDB — the query layer over window.CONCEPTS.
//
// Runs in the browser (after data/*.js) and in Node (see cli.js,
// which fakes a `window` and requires the same files). Keep it
// dependency-free and ES5-ish so both work.
//
// Responsibilities, in order of importance to callers:
//   1. normalize()  — fill defaults so every consumer sees a full
//                     record and no one repeats `c.aliases || []`
//   2. validate()   — catch dangling ids, cycles, bad enums BEFORE
//                     they reach the page. CLI exits non-zero on error.
//   3. filter()/traversal — what the explorer page needs.
//
// Deliberately NOT here: text→concept matching. Mapping a source
// document onto concepts is a reading-comprehension job, not a
// string-matching one — an n-gram scorer cannot tell the Summer
// Triangle from a triangle. That work is done by a human or an LLM
// reading the document; see README.md. This file's job is to hold
// the data honestly and answer questions about the graph.
//
// ConceptDB.build() is idempotent; call it again after mutating
// window.CONCEPTS.
// ============================================================

(function (global) {
    "use strict";

    // ---------------- text utilities ----------------

    // Lowercase and reduce to space-separated word tokens, so page
    // search is insensitive to case, accents and punctuation:
    // "pañcāṅga" and "Panchanga" both normalize to "panchanga".
    function normText(s) {
        if (!s) return "";
        var out;
        try {
            out = String(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ");
        } catch (e) {
            // Environment without unicode property escapes.
            out = String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ");
        }
        return out.trim().replace(/\s+/g, " ");
    }

    // ---------------- normalization ----------------

    function deriveGrades(c, TRACKS) {
        var set = {};
        (c.tracks || []).forEach(function (t) {
            var def = TRACKS[t];
            if (def && def.grades) def.grades.forEach(function (g) { set[g] = 1; });
        });
        return Object.keys(set).map(Number).sort(function (a, b) { return a - b; });
    }

    function arr(v) { return Array.isArray(v) ? v.slice() : []; }

    // ---------------- build ----------------

    function build() {
        var SUBJECTS = global.CONCEPT_SUBJECTS || {},
            DOMAINS = global.CONCEPT_DOMAINS || {},
            LEVELS = global.CONCEPT_LEVELS || {},
            TRACKS = global.CONCEPT_TRACKS || {},
            BANDS = global.CONCEPT_GRADE_BANDS || {},
            STATUS = global.CONCEPT_STATUS || {},
            BOARDS = global.SYLLABUS_BOARDS || {},
            KINDS = global.TOOL_KINDS || {},
            RAW = global.CONCEPTS || [];

        var all = [], byId = {}, dependents = {};

        // -- pass 1: normalize + index by id
        RAW.forEach(function (c) {
            var dom = DOMAINS[c.domain];
            var n = {
                id: c.id,
                name: c.name,
                desc: c.desc || "",
                domain: c.domain,
                subject: dom ? dom.subject : null,
                level: c.level,
                grades: arr(c.grades),
                syllabusRefs: arr(c.syllabusRefs),
                prereqs: arr(c.prereqs),
                related: arr(c.related),
                aliases: arr(c.aliases),
                keywords: arr(c.keywords),
                misconceptions: arr(c.misconceptions),
                tracks: arr(c.tracks),
                tools: arr(c.tools),
                status: c.status || "published",
                sources: arr(c.sources)
            };
            if (!n.grades.length) n.grades = deriveGrades(n, TRACKS);
            all.push(n);
            // On a duplicate id the first record wins; validate() reports it.
            if (!byId[n.id]) byId[n.id] = n;
            dependents[n.id] = dependents[n.id] || [];
        });

        // -- pass 2: reverse edges + symmetric `related`
        all.forEach(function (c) {
            c.prereqs.forEach(function (p) {
                if (dependents[p]) dependents[p].push(c.id);
            });
        });
        all.forEach(function (c) {
            c.related.forEach(function (r) {
                var other = byId[r];
                if (other && other.related.indexOf(c.id) === -1) other.related.push(c.id);
            });
        });

        // -- pass 3: bands + depth
        all.forEach(function (c) {
            c.bands = Object.keys(BANDS).filter(function (b) {
                return BANDS[b].grades.some(function (g) { return c.grades.indexOf(g) !== -1; });
            });
        });

        // Longest prerequisite chain. Cycle-safe: a node already on the
        // stack contributes 0 rather than recursing forever, so a broken
        // DAG still renders (validate() is what complains about it).
        var depth = {}, inProgress = {};
        function depthOf(id) {
            if (depth[id] != null) return depth[id];
            if (inProgress[id]) return 0;
            var c = byId[id];
            if (!c) return 0;
            inProgress[id] = true;
            var ps = c.prereqs.filter(function (p) { return byId[p]; });
            depth[id] = ps.length ? 1 + Math.max.apply(null, ps.map(depthOf)) : 0;
            inProgress[id] = false;
            return depth[id];
        }
        all.forEach(function (c) { c.depth = depthOf(c.id); });

        var domainKeys = Object.keys(DOMAINS);
        var subjectKeys = Object.keys(SUBJECTS);

        return {
            all: all, byId: byId, dependents: dependents,
            SUBJECTS: SUBJECTS, DOMAINS: DOMAINS, LEVELS: LEVELS,
            TRACKS: TRACKS, BANDS: BANDS, STATUS: STATUS,
            BOARDS: BOARDS, KINDS: KINDS,
            domainKeys: domainKeys, subjectKeys: subjectKeys
        };
    }

    var S = null;
    function db() { return S || (S = build()); }

    // ---------------- traversal ----------------

    function walk(startIds, nextOf) {
        var out = {}, stack = startIds.slice();
        while (stack.length) {
            var n = stack.pop();
            if (out[n]) continue;
            out[n] = true;
            (nextOf(n) || []).forEach(function (x) { stack.push(x); });
        }
        return out;
    }

    function ancestorsOf(id) {
        var d = db(), c = d.byId[id];
        if (!c) return {};
        return walk(c.prereqs.slice(), function (n) {
            return d.byId[n] ? d.byId[n].prereqs : [];
        });
    }

    function descendantsOf(id) {
        var d = db();
        return walk((d.dependents[id] || []).slice(), function (n) { return d.dependents[n]; });
    }

    // Teaching order: prerequisites always land before their dependents.
    // Ties break by level, then subject, then domain, then name — so the
    // same set always exports in the same order.
    function teachingSort(ids) {
        var d = db();
        return ids.slice().filter(function (id) { return d.byId[id]; }).sort(function (a, b) {
            var A = d.byId[a], B = d.byId[b];
            return (A.depth - B.depth) ||
                (A.level - B.level) ||
                (d.subjectKeys.indexOf(A.subject) - d.subjectKeys.indexOf(B.subject)) ||
                (d.domainKeys.indexOf(A.domain) - d.domainKeys.indexOf(B.domain)) ||
                (A.name < B.name ? -1 : A.name > B.name ? 1 : 0);
        });
    }

    // ---------------- filter ----------------

    // Every key is optional; omitted keys do not constrain. Arrays are
    // OR within a key and AND across keys.
    //   {subjects:[], domains:[], levels:[], maxLevel:n, grades:[],
    //    bands:[], tracks:[], status:[], search:"", ids:[]}
    function filter(q) {
        q = q || {};
        var d = db();
        var text = q.search ? normText(q.search) : "";
        return d.all.filter(function (c) {
            if (q.ids && q.ids.indexOf(c.id) === -1) return false;
            if (q.subjects && q.subjects.length && q.subjects.indexOf(c.subject) === -1) return false;
            if (q.domains && q.domains.length && q.domains.indexOf(c.domain) === -1) return false;
            if (q.levels && q.levels.length && q.levels.indexOf(c.level) === -1) return false;
            if (q.maxLevel != null && c.level > q.maxLevel) return false;
            if (q.status && q.status.length && q.status.indexOf(c.status) === -1) return false;
            if (q.grades && q.grades.length &&
                !q.grades.some(function (g) { return c.grades.indexOf(g) !== -1; })) return false;
            if (q.bands && q.bands.length &&
                !q.bands.some(function (b) { return c.bands.indexOf(b) !== -1; })) return false;
            if (q.tracks && q.tracks.length &&
                !q.tracks.some(function (t) { return c.tracks.indexOf(t) !== -1; })) return false;
            if (text) {
                var hay = normText(c.name + " " + c.desc + " " + c.aliases.join(" ") + " " + c.keywords.join(" "));
                if (hay.indexOf(text) === -1) return false;
            }
            return true;
        });
    }

    // ---------------- validate ----------------

    // errors  = the page or the data model is actually broken
    // warnings = smells worth a human look, but nothing breaks
    function validate() {
        var d = db();
        var errors = [], warnings = [];
        function err(id, msg) { errors.push({ id: id, msg: msg }); }
        function warn(id, msg) { warnings.push({ id: id, msg: msg }); }

        var seen = {};
        d.all.forEach(function (c) {
            if (!c.id) return err("(missing)", "concept has no id");
            if (seen[c.id]) err(c.id, "duplicate id");
            seen[c.id] = true;

            if (!c.name) err(c.id, "missing name");
            if (!c.desc) warn(c.id, "missing desc");
            if (!d.DOMAINS[c.domain]) err(c.id, "unknown domain '" + c.domain + "'");
            if (!d.LEVELS[c.level]) err(c.id, "level must be 1..5, got " + c.level);
            if (!d.STATUS[c.status]) err(c.id, "unknown status '" + c.status + "'");

            c.prereqs.forEach(function (p) {
                if (!d.byId[p]) err(c.id, "dangling prereq -> '" + p + "'");
                if (p === c.id) err(c.id, "is its own prereq");
            });
            c.related.forEach(function (r) {
                if (!d.byId[r]) err(c.id, "dangling related -> '" + r + "'");
            });
            c.tracks.forEach(function (t) {
                if (!d.TRACKS[t]) err(c.id, "unknown track '" + t + "'");
            });
            c.tools.forEach(function (t) {
                if (!d.KINDS[t.k]) err(c.id, "unknown tool kind '" + t.k + "'");
                if (!t.label) warn(c.id, "tool with no label");
            });
            c.grades.forEach(function (g) {
                if (!(g >= 1 && g <= 12)) err(c.id, "grade out of range: " + g);
            });
            c.syllabusRefs.forEach(function (r) {
                var parts = String(r).split(":");
                if (parts.length !== 4) return err(c.id, "syllabusRef must be board:grade:subject:chapter — got '" + r + "'");
                if (!d.BOARDS[parts[0]]) err(c.id, "unknown board '" + parts[0] + "' in '" + r + "'");
                if (!(+parts[1] >= 1 && +parts[1] <= 12)) err(c.id, "bad grade in '" + r + "'");
            });

            // Soft signals
            if (!c.grades.length) warn(c.id, "no grades and no school-* track to derive them from");
            if (!c.aliases.length && !c.keywords.length) warn(c.id, "no aliases/keywords — search can only find it by exact name");
            c.prereqs.forEach(function (p) {
                var pre = d.byId[p];
                if (pre && pre.level > c.level) {
                    warn(c.id, "prereq '" + p + "' is L" + pre.level + " but this is L" + c.level);
                }
            });
        });

        // Cycles — report each elementary cycle once, from its entry point.
        var WHITE = 0, GREY = 1, BLACK = 2, color = {}, stack = [];
        var reported = {};
        function visit(id) {
            color[id] = GREY;
            stack.push(id);
            (d.byId[id] ? d.byId[id].prereqs : []).forEach(function (p) {
                if (!d.byId[p]) return;
                if (color[p] === GREY) {
                    var cyc = stack.slice(stack.indexOf(p)).concat(p).join(" -> ");
                    var key = stack.slice(stack.indexOf(p)).slice().sort().join("|");
                    if (!reported[key]) { reported[key] = 1; err(id, "prereq cycle: " + cyc); }
                } else if (color[p] !== BLACK) {
                    visit(p);
                }
            });
            stack.pop();
            color[id] = BLACK;
        }
        d.all.forEach(function (c) { if (color[c.id] !== BLACK) visit(c.id); });

        // Two concepts answering to the same name or alias is the signature
        // of an accidental duplicate — the main hazard when the database
        // grows by mapping new source documents onto it. Surface the clash
        // so a human decides: rename, re-alias, or merge.
        var claims = {};
        d.all.forEach(function (c) {
            [c.name].concat(c.aliases).forEach(function (t) {
                var k = normText(t);
                if (!k) return;
                (claims[k] = claims[k] || {})[c.id] = 1;
            });
        });
        Object.keys(claims).forEach(function (t) {
            var ids = Object.keys(claims[t]);
            if (ids.length > 1) {
                warnings.push({
                    id: ids.join(", "),
                    msg: "'" + t + "' names " + ids.length + " concepts — possible duplicate"
                });
            }
        });

        return { errors: errors, warnings: warnings, ok: errors.length === 0 };
    }

    // ---------------- stats ----------------

    function stats() {
        var d = db();
        var s = {
            concepts: d.all.length,
            edges: d.all.reduce(function (a, c) { return a + c.prereqs.length; }, 0),
            bySubject: {}, byDomain: {}, byLevel: {}, byStatus: {}, byGrade: {},
            roots: 0, leaves: 0, maxDepth: 0
        };
        d.all.forEach(function (c) {
            s.bySubject[c.subject] = (s.bySubject[c.subject] || 0) + 1;
            s.byDomain[c.domain] = (s.byDomain[c.domain] || 0) + 1;
            s.byLevel[c.level] = (s.byLevel[c.level] || 0) + 1;
            s.byStatus[c.status] = (s.byStatus[c.status] || 0) + 1;
            c.grades.forEach(function (g) { s.byGrade[g] = (s.byGrade[g] || 0) + 1; });
            if (!c.prereqs.length) s.roots++;
            if (!(d.dependents[c.id] || []).length) s.leaves++;
            if (c.depth > s.maxDepth) s.maxDepth = c.depth;
        });
        return s;
    }

    // ---------------- export ----------------

    // Plain JSON of the normalized records — the handoff format for any
    // tool that does not want to eval the js files.
    function toJSON() {
        var d = db();
        return {
            schema: 1,
            subjects: d.SUBJECTS, domains: d.DOMAINS, levels: d.LEVELS,
            tracks: d.TRACKS, gradeBands: d.BANDS, boards: d.BOARDS,
            status: d.STATUS, toolKinds: d.KINDS,
            concepts: d.all.map(function (c) {
                var o = {};
                Object.keys(c).forEach(function (k) { o[k] = c[k]; });
                return o;
            })
        };
    }

    global.ConceptDB = {
        build: function () { S = build(); return S; },
        get all() { return db().all; },
        get subjects() { return db().SUBJECTS; },
        get domains() { return db().DOMAINS; },
        get levels() { return db().LEVELS; },
        get tracks() { return db().TRACKS; },
        get gradeBands() { return db().BANDS; },
        get statuses() { return db().STATUS; },
        get boards() { return db().BOARDS; },
        get toolKinds() { return db().KINDS; },
        byId: function (id) { return db().byId[id]; },
        dependentsOf: function (id) { return (db().dependents[id] || []).slice(); },
        prereqsOf: function (id) { var c = db().byId[id]; return c ? c.prereqs.slice() : []; },
        ancestorsOf: ancestorsOf,
        descendantsOf: descendantsOf,
        teachingSort: teachingSort,
        filter: filter,
        validate: validate,
        stats: stats,
        toJSON: toJSON,
        normText: normText
    };

})(typeof window !== "undefined" ? window : globalThis);
