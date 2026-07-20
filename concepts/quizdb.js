// ============================================================
// QuizDB — the query layer over window.QUESTIONS / window.QUIZZES.
//
// Sibling of db.js and coursedb.js; same rules — runs in the browser
// and in Node (cli.js fakes a `window`), no dependencies, ES5-ish.
//
// It holds the checks that only exist once questions are tagged with
// concept ids and quizzes are attached to courses:
//
//   scope()      an "entry" quiz must test only what the course
//                ASSUMES, never what it teaches. A session quiz must
//                not ask about material from a later session. This is
//                unenforceable by eye across 90 questions and is the
//                reason the layer exists.
//   diagnostics() which documented misconceptions the paper actually
//                probes — and which it leaves untested.
//   coverage()   which of a course's concepts have questions at all.
//
// QuizDB.build(questions, quizzes, conceptDB, courseDB) is idempotent.
// courseDB may be null: without it, questions and quizzes still
// validate, but the scope check quietly does not run.
// ============================================================

(function (global) {
    "use strict";

    function arr(v) { return Array.isArray(v) ? v.slice() : []; }

    // ---------------- option order ----------------
    //
    // Questions are AUTHORED with the correct option first — it reads
    // better in source, and a bank written any other way invites the
    // author to lose track of which one is right. But presented that
    // way it is not a test: answer (a) to everything and score 100%.
    //
    // So the display order is decided here, once, for every consumer —
    // web page, printed paper, marker's key, CLI. The permutation is
    // DETERMINISTIC on the question id, which is the load-bearing part:
    // a key printed today must letter its options exactly as the paper
    // printed last week, or the marking is worthless. Nothing random,
    // nothing time-dependent, no per-render state.
    //
    // Re-ordering a question's options is therefore a change of answer
    // key. Change an id and the letters move.

    function seedOf(str) {                   // FNV-1a, 32-bit
        var h = 0x811c9dc5;
        for (var i = 0; i < str.length; i++) {
            h ^= str.charCodeAt(i);
            h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
        }
        return h || 1;
    }

    function shuffleFor(id, list) {
        var s = seedOf(id);
        var out = list.slice();
        // Fisher-Yates driven by a xorshift32 seeded from the id.
        for (var i = out.length - 1; i > 0; i--) {
            s ^= s << 13; s >>>= 0;
            s ^= s >> 17;
            s ^= s << 5;  s >>>= 0;
            var j = s % (i + 1);
            var t = out[i]; out[i] = out[j]; out[j] = t;
        }
        return out;
    }

    // ---------------- normalization ----------------

    function normQuestion(q) {
        var opts = arr(q.options).map(function (o) {
            return { text: o.text, correct: !!o.correct, diagnoses: o.diagnoses || null };
        });
        return {
            id: q.id,
            concept: q.concept,
            kind: q.kind || "mcq",
            stem: q.stem || "",
            options: opts.length ? shuffleFor(q.id || "", opts) : opts,
            answer: q.answer || "",
            explain: q.explain || "",
            difficulty: q.difficulty || 2,
            status: q.status || "published",
            sources: arr(q.sources)
        };
    }

    function normQuiz(z) {
        return {
            id: z.id,
            name: z.name,
            purpose: z.purpose,
            course: z.course || null,
            session: z.session === undefined ? null : z.session,
            blurb: z.blurb || "",
            duration: z.duration || 0,
            questions: arr(z.questions),
            status: z.status || "published",
            sources: arr(z.sources)
        };
    }

    var _db = null;

    function build(questions, quizzes, conceptDB, courseDB) {
        var qs = (questions || global.QUESTIONS || []).map(normQuestion);
        var zs = (quizzes || global.QUIZZES || []).map(normQuiz);
        var qById = {}, zById = {}, byConcept = {};
        qs.forEach(function (q) {
            qById[q.id] = q;
            (byConcept[q.concept] = byConcept[q.concept] || []).push(q.id);
        });
        zs.forEach(function (z) { zById[z.id] = z; });
        _db = {
            questions: qs, quizzes: zs,
            qById: qById, zById: zById, byConcept: byConcept,
            concepts: conceptDB, courses: courseDB || null,
            kinds: global.QUESTION_KINDS || {},
            purposes: global.QUIZ_PURPOSES || {}
        };
        return _db;
    }

    function db() {
        if (!_db) throw new Error("QuizDB.build(...) must run first");
        return _db;
    }

    function allQuizzes() { return db().quizzes.slice(); }
    function allQuestions() { return db().questions.slice(); }
    function quizById(id) { return db().zById[id] || null; }
    function questionById(id) { return db().qById[id] || null; }
    function byConcept(id) { return (db().byConcept[id] || []).slice(); }

    // ---------------- course scope ----------------

    // What a course assumes (prereq-closed) and what it teaches.
    // Returns null when there is no course layer to ask.
    function courseScope(courseId) {
        var d = db();
        if (!d.courses) return null;
        var co = d.courses.byId(courseId);
        if (!co) return null;
        var taught = {}, taughtAt = {};
        co.sessions.forEach(function (s) {
            s.concepts.forEach(function (id) {
                if (taughtAt[id] === undefined) taughtAt[id] = s.idx;
                taught[id] = 1;
            });
        });
        // Mirror the course layer: assuming X assumes everything beneath X.
        var assumed = {};
        co.assumes.forEach(function (id) {
            if (!d.concepts.byId(id)) return;
            assumed[id] = 1;
            Object.keys(d.concepts.ancestorsOf(id)).forEach(function (a) { assumed[a] = 1; });
        });
        return { course: co, taught: taught, taughtAt: taughtAt, assumed: assumed };
    }

    // The headline check. Returns a list of violations; empty means the
    // paper is asking about the right things at the right time.
    function scope(quizOrId) {
        var z = typeof quizOrId === "string" ? quizById(quizOrId) : quizOrId;
        var d = db();
        if (!z.course) return [];
        var sc = courseScope(z.course);
        if (!sc) return [];
        var bad = [];

        z.questions.forEach(function (qid) {
            var q = d.qById[qid];
            if (!q) return; // reported by validate()
            var c = q.concept;

            if (z.purpose === "entry") {
                // An entry check measures readiness. Testing something the
                // course teaches measures nothing a student could have.
                if (sc.taught[c] !== undefined) {
                    bad.push({ q: qid, concept: c, why: "entry quiz tests '" + c +
                        "', which the course TEACHES in session " + (sc.taughtAt[c] + 1) });
                } else if (!sc.assumed[c]) {
                    bad.push({ q: qid, concept: c, why: "entry quiz tests '" + c +
                        "', which the course neither assumes nor teaches" });
                }
            } else if (z.purpose === "session") {
                var at = sc.taughtAt[c];
                if (at === undefined && !sc.assumed[c]) {
                    bad.push({ q: qid, concept: c, why: "'" + c + "' is never taught or assumed by this course" });
                } else if (at !== undefined && at > (z.session - 1)) {
                    bad.push({ q: qid, concept: c, why: "session " + z.session + " quiz asks about '" + c +
                        "', not taught until session " + (at + 1) });
                }
            } else if (z.purpose === "exit") {
                if (sc.taught[c] === undefined && !sc.assumed[c]) {
                    bad.push({ q: qid, concept: c, why: "'" + c + "' is never taught or assumed by this course" });
                }
            }
        });
        return bad;
    }

    // ---------------- diagnostics ----------------

    // Which documented misconceptions this paper actually probes, and
    // which concepts it tests without probing any. The second list is
    // where the paper is merely scoring rather than diagnosing.
    function diagnostics(quizOrId) {
        var z = typeof quizOrId === "string" ? quizById(quizOrId) : quizOrId;
        var d = db();
        var probes = [], blind = [];
        z.questions.forEach(function (qid) {
            var q = d.qById[qid];
            if (!q) return;
            var c = d.concepts.byId(q.concept);
            if (!c) return;
            var diag = q.options.filter(function (o) { return o.diagnoses; })
                .map(function (o) { return o.diagnoses; });
            if (diag.length) probes.push({ q: qid, concept: q.concept, diagnoses: diag });
            else if (c.misconceptions.length) blind.push({ q: qid, concept: q.concept, available: c.misconceptions.length });
        });
        return { probes: probes, blind: blind };
    }

    // ---------------- coverage ----------------

    // Which of a course's concepts have any question at all. Answers
    // "what are we teaching but never checking?"
    function coverage(courseId) {
        var d = db();
        var sc = courseScope(courseId);
        if (!sc) return null;
        var taught = Object.keys(sc.taught);
        var tested = [], untested = [];
        taught.forEach(function (id) {
            (byConcept(id).length ? tested : untested).push(id);
        });
        var assumedIds = Object.keys(sc.assumed);
        var aTested = assumedIds.filter(function (id) { return byConcept(id).length; });
        return {
            taught: taught.length, tested: tested.length, untested: untested,
            assumed: assumedIds.length, assumedTested: aTested.length
        };
    }

    // ---------------- paper ----------------

    // The assembled paper, questions resolved in declared order.
    function paper(quizOrId) {
        var z = typeof quizOrId === "string" ? quizById(quizOrId) : quizOrId;
        var d = db();
        return z.questions.map(function (qid) {
            var q = d.qById[qid];
            if (!q) return null;
            var c = d.concepts.byId(q.concept);
            return {
                q: q,
                concept: c,
                subject: c ? c.subject : null
            };
        }).filter(Boolean);
    }

    function stats(quizOrId) {
        var z = typeof quizOrId === "string" ? quizById(quizOrId) : quizOrId;
        var d = db();
        var byDiff = {}, byKind = {}, concepts = {}, diag = 0;
        z.questions.forEach(function (qid) {
            var q = d.qById[qid];
            if (!q) return;
            byDiff[q.difficulty] = (byDiff[q.difficulty] || 0) + 1;
            byKind[q.kind] = (byKind[q.kind] || 0) + 1;
            concepts[q.concept] = 1;
            if (q.options.some(function (o) { return o.diagnoses; })) diag++;
        });
        return {
            questions: z.questions.length,
            concepts: Object.keys(concepts).length,
            diagnostic: diag,
            byDifficulty: byDiff,
            byKind: byKind
        };
    }

    // ---------------- validate ----------------

    function validate() {
        var d = db();
        var errors = [], warnings = [];
        var seenQ = {}, seenZ = {};

        d.questions.forEach(function (q) {
            function err(m) { errors.push({ id: q.id || "(no id)", msg: m }); }
            function warn(m) { warnings.push({ id: q.id || "(no id)", msg: m }); }

            if (!q.id) return err("question has no id");
            if (seenQ[q.id]) err("duplicate question id");
            seenQ[q.id] = 1;
            if (!q.stem) err("no stem");
            if (!d.kinds[q.kind]) return err("unknown kind '" + q.kind + "'");

            var c = d.concepts.byId(q.concept);
            if (!c) return err("tests unknown concept '" + q.concept + "'");

            if (d.kinds[q.kind].needsOptions) {
                var correct = q.options.filter(function (o) { return o.correct; });
                if (!q.options.length) err("mcq with no options");
                else {
                    if (correct.length === 0) err("no option marked correct");
                    if (correct.length > 1) err(correct.length + " options marked correct — exactly one");
                    if (q.options.length < 3) warn("only " + q.options.length + " options — 3+ makes guessing less profitable");
                }
                q.options.forEach(function (o) {
                    if (!o.text) err("an option has no text");
                    if (o.correct && o.diagnoses) err("a CORRECT option cannot diagnose a misconception");
                });
                // The whole point of the layer: use the documented wrong ideas.
                if (c.misconceptions.length && !q.options.some(function (o) { return o.diagnoses; })) {
                    warn("'" + q.concept + "' has " + c.misconceptions.length +
                        " documented misconceptions but no distractor diagnoses one");
                }
            } else {
                if (!q.answer) err(q.kind + " question has no `answer` for the marker");
                if (q.options.length) warn(q.kind + " question carries options — ignored");
            }

            if (!q.explain) warn("no `explain` — the marker has nothing to go on");
            if ([1, 2, 3].indexOf(q.difficulty) === -1) err("difficulty must be 1, 2 or 3");
        });

        d.quizzes.forEach(function (z) {
            function err(m) { errors.push({ id: z.id || "(no id)", msg: m }); }
            function warn(m) { warnings.push({ id: z.id || "(no id)", msg: m }); }

            if (!z.id) return err("quiz has no id");
            if (seenZ[z.id]) err("duplicate quiz id");
            seenZ[z.id] = 1;
            if (!z.name) err("no name");
            if (!d.purposes[z.purpose]) err("unknown purpose '" + z.purpose + "'");
            if (!z.questions.length) err("quiz has no questions");

            z.questions.forEach(function (qid) {
                if (!d.qById[qid]) err("references unknown question '" + qid + "'");
            });
            var dupes = {};
            z.questions.forEach(function (qid) { dupes[qid] = (dupes[qid] || 0) + 1; });
            Object.keys(dupes).forEach(function (qid) {
                if (dupes[qid] > 1) err("question '" + qid + "' appears " + dupes[qid] + " times in this quiz");
            });

            if (z.course && d.courses && !d.courses.byId(z.course)) err("unknown course '" + z.course + "'");
            if (z.purpose === "session" && z.session === null) err("a session quiz needs a `session` number");
            if (z.purpose === "session" && z.course && d.courses) {
                var co = d.courses.byId(z.course);
                if (co && (z.session < 1 || z.session > co.sessions.length)) {
                    err("session " + z.session + " is outside the course's 1–" + co.sessions.length);
                }
            }

            // The scope check.
            scope(z).forEach(function (v) { err(v.why + " (" + v.q + ")"); });

            // A paper that asks the same concept repeatedly is thin.
            var cs = {};
            z.questions.forEach(function (qid) {
                var q = d.qById[qid];
                if (q) cs[q.concept] = (cs[q.concept] || 0) + 1;
            });
            Object.keys(cs).forEach(function (cid) {
                if (cs[cid] > 2) warn("tests '" + cid + "' " + cs[cid] + " times");
            });
        });

        return { ok: errors.length === 0, errors: errors, warnings: warnings };
    }

    global.QuizDB = {
        build: build,
        allQuizzes: allQuizzes,
        allQuestions: allQuestions,
        quizById: quizById,
        questionById: questionById,
        byConcept: byConcept,
        scope: scope,
        diagnostics: diagnostics,
        coverage: coverage,
        paper: paper,
        stats: stats,
        validate: validate
    };

})(typeof window !== "undefined" ? window : globalThis);
