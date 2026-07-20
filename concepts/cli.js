#!/usr/bin/env node
// ============================================================
// concepts cli — drive the concept database from the terminal.
//
// The data/*.js files are browser globals (window.CONCEPTS). This
// fakes a `window` so the exact same files Node-load, with no build
// step and no second copy of the data to drift.
//
//   node concepts/cli.js validate            # exits 1 on error
//   node concepts/cli.js stats
//   node concepts/cli.js ls --subject maths
//   node concepts/cli.js get moon-phases
//   node concepts/cli.js export --out concepts.json
//
//   node concepts/cli.js courses             # the course layer
//   node concepts/cli.js course <id>
//   node concepts/cli.js course-validate     # exits 1 on error
//
// Mapping a source document onto concepts is not a command here —
// it is a reading job done by a human or an LLM. `export` and `ls`
// are how you hand the current database to whoever is doing it.
// See README.md.
// ============================================================

"use strict";

var fs = require("fs");
var path = require("path");

var ROOT = path.resolve(__dirname);
var CONCEPTS_DIR = path.join(ROOT, "data");
var COURSES_DIR = path.join(ROOT, "courses");
var QUIZZES_DIR = path.join(ROOT, "quizzes");

// ---------------- load ----------------

// The files assign onto `window`; make that the Node global object so
// db.js (which prefers `window`) sees the same namespace.
global.window = global;

function load() {
    if (!fs.existsSync(CONCEPTS_DIR)) die("no data/ directory at " + CONCEPTS_DIR);
    var files = dataFiles(CONCEPTS_DIR);
    if (files.indexOf("_schema.js") === -1) die("data/_schema.js is missing — it must load first");
    // _schema.js declares the taxonomy and creates window.CONCEPTS; every
    // other file push()es into it, so their order among themselves is free.
    var ordered = ["_schema.js"].concat(files.filter(function (f) { return f !== "_schema.js"; }).sort());
    ordered.forEach(function (f) { require(path.join(CONCEPTS_DIR, f)); });
    require(path.join(ROOT, "db.js"));
    return { db: global.ConceptDB, files: ordered };
}

// Quizzes load on demand, and need the course layer for the scope check.
function loadQuizzes(db) {
    var CD = loadCourses(db);
    if (!fs.existsSync(QUIZZES_DIR)) die("no quizzes/ directory at " + QUIZZES_DIR);
    var files = dataFiles(QUIZZES_DIR);
    if (files.indexOf("_schema.js") === -1) die("quizzes/_schema.js is missing — it must load first");
    var ordered = ["_schema.js"].concat(files.filter(function (f) { return f !== "_schema.js"; }).sort());
    ordered.forEach(function (f) { require(path.join(QUIZZES_DIR, f)); });
    require(path.join(ROOT, "quizdb.js"));
    global.QuizDB.build(global.QUESTIONS, global.QUIZZES, db, CD);
    return global.QuizDB;
}

// Courses load on demand — the concept commands must keep working even
// if the course layer is absent or broken.
function loadCourses(db) {
    if (!fs.existsSync(COURSES_DIR)) die("no courses/ directory at " + COURSES_DIR);
    var files = dataFiles(COURSES_DIR);
    if (files.indexOf("_schema.js") === -1) die("courses/_schema.js is missing — it must load first");
    var ordered = ["_schema.js"].concat(files.filter(function (f) { return f !== "_schema.js"; }).sort());
    ordered.forEach(function (f) { require(path.join(COURSES_DIR, f)); });
    require(path.join(ROOT, "coursedb.js"));
    global.CourseDB.build(global.COURSES, db);
    return global.CourseDB;
}

// Moon age (days since new) → the shape everyone actually pictures.
function moonGlyph(age) {
    var f = age / 29.53;
    if (f < 0.03 || f > 0.97) return "new";
    if (f < 0.22) return "waxing crescent";
    if (f < 0.28) return "first quarter";
    if (f < 0.47) return "waxing gibbous";
    if (f < 0.53) return "full";
    if (f < 0.72) return "waning gibbous";
    if (f < 0.78) return "last quarter";
    return "waning crescent";
}

function die(msg) {
    process.stderr.write("error: " + msg + "\n");
    process.exit(2);
}

// The data directories are require()d wholesale, so anything dropped in
// one is EXECUTED on every CLI call. A tool put in courses/ once killed
// every course command silently. Executable scripts declare themselves
// with a shebang; data files never do. Refuse the former, loudly.
function dataFiles(dir) {
    return fs.readdirSync(dir).filter(function (f) {
        if (!f.endsWith(".js")) return false;
        var head = fs.readFileSync(path.join(dir, f), "utf8").slice(0, 2);
        if (head === "#!") {
            process.stderr.write("warning: skipping " + f + " in " + path.basename(dir) +
                "/ — it is a script, not data. Tools belong in concepts/.\n");
            return false;
        }
        return true;
    });
}

// ---------------- arg parsing ----------------

var argv = process.argv.slice(2);
var cmd = argv.shift();
var positional = [];
var flags = {};
for (var i = 0; i < argv.length; i++) {
    var a = argv[i];
    if (a.slice(0, 2) === "--") {
        var key = a.slice(2);
        var next = argv[i + 1];
        if (next === undefined || next.slice(0, 2) === "--") flags[key] = true;
        else { flags[key] = next; i++; }
    } else positional.push(a);
}

function listFlag(name) {
    var v = flags[name];
    if (!v || v === true) return null;
    return String(v).split(",").map(function (s) { return s.trim(); }).filter(Boolean);
}
function numFlag(name, dflt) {
    var v = flags[name];
    return v === undefined || v === true ? dflt : Number(v);
}

// ---------------- output helpers ----------------

var C = process.stdout.isTTY
    ? { dim: "\x1b[2m", bold: "\x1b[1m", red: "\x1b[31m", yellow: "\x1b[33m", green: "\x1b[32m", cyan: "\x1b[36m", off: "\x1b[0m" }
    : { dim: "", bold: "", red: "", yellow: "", green: "", cyan: "", off: "" };

function pad(s, n) { s = String(s); return s + " ".repeat(Math.max(0, n - s.length)); }
function jsonOut(o) { process.stdout.write(JSON.stringify(o, null, 2) + "\n"); }

// ---------------- commands ----------------

var COMMANDS = {

    validate: function (db) {
        var r = db.validate();
        r.errors.forEach(function (e) {
            process.stdout.write(C.red + "ERROR  " + C.off + pad(e.id, 28) + " " + e.msg + "\n");
        });
        if (!flags["quiet"]) {
            r.warnings.forEach(function (w) {
                process.stdout.write(C.yellow + "warn   " + C.off + pad(w.id, 28) + " " + w.msg + "\n");
            });
        }
        var s = db.stats();
        process.stdout.write("\n" + (r.ok ? C.green + "OK" + C.off : C.red + "FAILED" + C.off) +
            " — " + s.concepts + " concepts, " + s.edges + " edges, " +
            r.errors.length + " errors, " + r.warnings.length + " warnings\n");
        process.exit(r.ok ? 0 : 1);
    },

    stats: function (db) {
        var s = db.stats();
        if (flags["json"]) return jsonOut(s);
        process.stdout.write(C.bold + "Concept database" + C.off + "\n");
        process.stdout.write("  " + s.concepts + " concepts · " + s.edges + " prereq edges · max chain depth " + s.maxDepth + "\n");
        process.stdout.write("  " + s.roots + " roots (no prereqs) · " + s.leaves + " leaves (nothing builds on them)\n\n");

        process.stdout.write(C.bold + "By subject" + C.off + "\n");
        Object.keys(db.subjects).forEach(function (k) {
            if (!s.bySubject[k]) return;
            process.stdout.write("  " + pad(db.subjects[k].name, 26) + pad(s.bySubject[k], 5) + "\n");
        });
        process.stdout.write("\n" + C.bold + "By level" + C.off + "\n");
        Object.keys(db.levels).forEach(function (l) {
            process.stdout.write("  L" + l + " " + pad(db.levels[l].name, 23) + pad(s.byLevel[l] || 0, 5) + "\n");
        });
        process.stdout.write("\n" + C.bold + "By status" + C.off + "\n");
        Object.keys(s.byStatus).forEach(function (k) {
            process.stdout.write("  " + pad(k, 26) + pad(s.byStatus[k], 5) + "\n");
        });
        process.stdout.write("\n" + C.bold + "By grade" + C.off + "\n  ");
        for (var g = 1; g <= 12; g++) process.stdout.write(g + ":" + (s.byGrade[g] || 0) + "  ");
        process.stdout.write("\n");
    },

    ls: function (db) {
        var list = db.filter({
            subjects: listFlag("subject"),
            domains: listFlag("domain"),
            status: listFlag("status"),
            grades: (listFlag("grade") || []).map(Number).filter(function (n) { return n; }),
            search: flags["search"] && flags["search"] !== true ? flags["search"] : ""
        });
        if (flags["json"]) return jsonOut(list);
        list.sort(function (a, b) {
            return (a.subject < b.subject ? -1 : a.subject > b.subject ? 1 : 0) ||
                (a.domain < b.domain ? -1 : a.domain > b.domain ? 1 : 0) ||
                a.level - b.level;
        });
        var lastDomain = null;
        list.forEach(function (c) {
            if (c.domain !== lastDomain) {
                var d = db.domains[c.domain];
                process.stdout.write("\n" + C.bold + (d ? d.name : c.domain) + C.off +
                    C.dim + "  (" + c.subject + ")" + C.off + "\n");
                lastDomain = c.domain;
            }
            process.stdout.write("  " + pad(c.id, 30) + C.dim + "L" + c.level +
                "  g" + (c.grades.join(",") || "-") +
                (c.status !== "published" ? "  [" + c.status + "]" : "") + C.off + "\n");
        });
        process.stdout.write("\n" + list.length + " concepts\n");
    },

    get: function (db) {
        var c = db.byId(positional[0]);
        if (!c) die("no concept with id '" + positional[0] + "'");
        if (flags["json"]) return jsonOut(c);
        process.stdout.write(C.bold + c.name + C.off + C.dim + "  " + c.id + C.off + "\n");
        process.stdout.write(c.desc + "\n\n");
        process.stdout.write("  subject   " + c.subject + " / " + c.domain + "\n");
        process.stdout.write("  level     L" + c.level + " " + db.levels[c.level].name + "\n");
        process.stdout.write("  grades    " + (c.grades.join(", ") || "-") + "\n");
        process.stdout.write("  status    " + c.status + "\n");
        if (c.syllabusRefs.length) process.stdout.write("  syllabus  " + c.syllabusRefs.join(", ") + "\n");
        if (c.aliases.length) process.stdout.write("  aliases   " + c.aliases.join(", ") + "\n");
        if (c.keywords.length) process.stdout.write("  keywords  " + c.keywords.join(", ") + "\n");
        process.stdout.write("\n  " + C.bold + "learn first" + C.off + "  " + (c.prereqs.join(", ") || "— nothing, a starting point") + "\n");
        process.stdout.write("  " + C.bold + "unlocks" + C.off + "      " + (db.dependentsOf(c.id).join(", ") || "—") + "\n");
        if (c.related.length) process.stdout.write("  " + C.bold + "related" + C.off + "      " + c.related.join(", ") + "\n");
        if (c.misconceptions.length) {
            process.stdout.write("\n  " + C.bold + "misconceptions" + C.off + "\n");
            c.misconceptions.forEach(function (m) { process.stdout.write("    · " + m + "\n"); });
        }
        var chain = db.teachingSort(Object.keys(db.ancestorsOf(c.id)));
        if (chain.length) {
            process.stdout.write("\n  " + C.bold + "full prereq chain" + C.off + " (" + chain.length + ", teaching order)\n");
            chain.forEach(function (id, i) { process.stdout.write("    " + (i + 1) + ". " + db.byId(id).name + "\n"); });
        }
    },

    export: function (db) {
        var out = JSON.stringify(db.toJSON(), null, 2);
        if (flags["out"] && flags["out"] !== true) {
            fs.writeFileSync(flags["out"], out + "\n");
            process.stdout.write("wrote " + flags["out"] + " (" + db.stats().concepts + " concepts)\n");
        } else process.stdout.write(out + "\n");
    },

    // ---------------- course layer ----------------

    courses: function (db) {
        var CD = loadCourses(db);
        var list = CD.all();
        if (flags["json"]) return jsonOut(list);
        list.forEach(function (co) {
            var s = CD.stats(co);
            var moon = CD.moonSolve(co);
            process.stdout.write("\n" + C.bold + co.name + C.off + C.dim + "  " + co.id + C.off + "\n");
            process.stdout.write("  " + C.dim + (global.COURSE_KINDS[co.kind] || {}).name +
                " · audience " + co.audience +
                (co.status !== "published" ? " · [" + co.status + "]" : "") + C.off + "\n");
            process.stdout.write("  " + s.sessions + " sessions · " + s.concepts + " concepts taught · " +
                s.assumed + " assumed · " + Math.round(s.minutes / 60 * 10) / 10 + " h" +
                (s.outdoorMinutes ? " (" + Math.round(s.outdoorMinutes / 60 * 10) / 10 + " h outdoors)" : "") + "\n");
            if (moon.constrained) {
                process.stdout.write("  " + (moon.feasible
                    ? C.green + "moon: schedulable" + C.off
                    : C.red + "moon: UNSCHEDULABLE" + C.off) + "\n");
            }
        });
        process.stdout.write("\n" + list.length + " courses\n");
    },

    course: function (db) {
        var CD = loadCourses(db);
        var co = CD.byId(positional[0]);
        if (!co) die("no course with id '" + positional[0] + "' — try `courses`");
        if (flags["json"]) return jsonOut({ course: co, syllabus: CD.syllabus(co), moon: CD.moonSolve(co) });

        var s = CD.stats(co);
        process.stdout.write(C.bold + co.name + C.off + C.dim + "  " + co.id + C.off + "\n");
        if (co.blurb) process.stdout.write(co.blurb + "\n");
        process.stdout.write("\n  kind      " + (global.COURSE_KINDS[co.kind] || {}).name +
            "\n  audience  " + (db.tracks[co.audience] || {}).name +
            "\n  size      " + s.sessions + " sessions · " + s.concepts + " concepts · " +
            Math.round(s.minutes / 60 * 10) / 10 + " h" +
            "\n  status    " + co.status + "\n");

        if (co.assumes.length) {
            process.stdout.write("\n  " + C.bold + "assumes known" + C.off + " (" + s.assumed + " with prereqs closed)\n");
            co.assumes.forEach(function (id) {
                process.stdout.write("    · " + (db.byId(id) || {}).name + C.dim + "  " + id + C.off + "\n");
            });
        }

        CD.syllabus(co).forEach(function (sess) {
            var mode = global.SESSION_MODES[sess.mode] || {};
            process.stdout.write("\n" + C.bold + (sess.idx + 1) + ". " + sess.title + C.off +
                C.dim + "  " + mode.name + " · " + sess.duration + " min" +
                (sess.day ? " · day " + sess.day : "") + C.off + "\n");
            if (sess.sky) {
                var req = global.MOON_REQS[sess.sky.moon] || {};
                process.stdout.write("   " + C.cyan + "sky" + C.off + "  needs " + req.name +
                    (sess.sky.targets.length ? " · " + sess.sky.targets.join(", ") : "") + "\n");
            }
            if (sess.equipment.length) {
                process.stdout.write("   " + C.dim + "kit  " + sess.equipment.map(function (e) {
                    return (global.EQUIPMENT[e] || {}).name || e;
                }).join(", ") + C.off + "\n");
            }
            sess.concepts.forEach(function (c) {
                process.stdout.write("     " + pad(c.id, 26) + C.dim + "L" + c.level + "  " + c.name + C.off + "\n");
            });
            if (sess.notes && !flags["brief"]) {
                process.stdout.write("   " + C.dim + "note " + sess.notes + C.off + "\n");
            }
        });

        var moon = CD.moonSolve(co);
        if (moon.constrained) {
            process.stdout.write("\n" + C.bold + "Moon" + C.off + "\n");
            if (!moon.feasible) {
                process.stdout.write("  " + C.red + "UNSCHEDULABLE" + C.off + " — no start date in the 29.53-day cycle works\n");
                CD.moonConflicts(co).forEach(function (x) {
                    process.stdout.write("    day " + x.a.day + " needs '" + x.a.sky.moon + "' · day " +
                        x.b.day + " needs '" + x.b.sky.moon + "' — " +
                        Math.abs(x.b.day - x.a.day) + " days apart\n");
                });
            } else {
                moon.windows.forEach(function (w) {
                    process.stdout.write("  " + C.green + "start when the moon is " +
                        w[0] + "–" + w[1] + " days old" + C.off +
                        C.dim + "  (" + moonGlyph(w[0]) + " → " + moonGlyph(w[1]) + ")" + C.off + "\n");
                });
            }
        }
    },

    "course-validate": function (db) {
        var CD = loadCourses(db);
        var r = CD.validate();
        r.errors.forEach(function (e) {
            process.stdout.write(C.red + "ERROR  " + C.off + pad(e.id, 26) + " " + e.msg + "\n");
        });
        if (!flags["quiet"]) {
            r.warnings.forEach(function (w) {
                process.stdout.write(C.yellow + "warn   " + C.off + pad(w.id, 26) + " " + w.msg + "\n");
            });
        }
        var n = CD.all().length;
        process.stdout.write("\n" + (r.ok ? C.green + "OK" + C.off : C.red + "FAILED" + C.off) +
            " — " + n + " courses, " + r.errors.length + " errors, " + r.warnings.length + " warnings\n");
        process.exit(r.ok ? 0 : 1);
    },

    // What you would have to add to `assumes` to make a course valid
    // without teaching the gaps. Printing it is usually the argument
    // against doing it.
    "course-gaps": function (db) {
        var CD = loadCourses(db);
        var co = CD.byId(positional[0]);
        if (!co) die("no course with id '" + positional[0] + "'");
        var gaps = CD.coverage(co);
        if (!gaps.length) {
            process.stdout.write(C.green + "no gaps" + C.off + " — every prereq is taught in time or assumed\n");
        } else {
            gaps.forEach(function (g) {
                process.stdout.write(C.red + g.reason + C.off + "  session " + (g.session + 1) +
                    " '" + g.concept + "' needs '" + g.missing + "'\n");
            });
        }
        var implied = CD.impliedAssumes(co);
        process.stdout.write("\n" + C.bold + "Everything this course stands on but does not teach" + C.off +
            " (" + implied.length + ", teaching order)\n");
        implied.forEach(function (id) {
            var c = db.byId(id);
            var assumed = co.assumes.indexOf(id) !== -1;
            process.stdout.write("  " + (assumed ? C.green + "declared" + C.off : C.yellow + "IMPLICIT" + C.off) +
                "  " + pad(id, 26) + C.dim + "L" + c.level + "  " + c.name + C.off + "\n");
        });
    },

    // The teacher-training payload: every wrong idea the course must
    // confront, in the order it will meet them.
    "course-misconceptions": function (db) {
        var CD = loadCourses(db);
        var co = CD.byId(positional[0]);
        if (!co) die("no course with id '" + positional[0] + "'");
        var list = CD.misconceptions(co);
        if (flags["json"]) return jsonOut(list);
        process.stdout.write(C.bold + co.name + C.off + " — misconceptions to confront\n");
        list.forEach(function (m) {
            process.stdout.write("\n" + C.bold + m.name + C.off + C.dim + "  " + m.id + C.off + "\n");
            m.items.forEach(function (i) { process.stdout.write("  · " + i + "\n"); });
        });
        var n = list.reduce(function (a, m) { return a + m.items.length; }, 0);
        process.stdout.write("\n" + n + " misconceptions across " + list.length + " concepts\n");
    },

    // ---------------- quiz layer ----------------

    quizzes: function (db) {
        var QD = loadQuizzes(db);
        var list = QD.allQuizzes();
        if (flags["json"]) return jsonOut(list);
        list.forEach(function (z) {
            var s = QD.stats(z);
            process.stdout.write("\n" + C.bold + z.name + C.off + C.dim + "  " + z.id + C.off + "\n");
            process.stdout.write("  " + C.dim + (global.QUIZ_PURPOSES[z.purpose] || {}).name +
                (z.course ? " · " + z.course : "") +
                (z.session ? " · session " + z.session : "") +
                (z.status !== "published" ? " · [" + z.status + "]" : "") + C.off + "\n");
            process.stdout.write("  " + s.questions + " questions · " + s.concepts + " concepts · " +
                s.diagnostic + " diagnostic" +
                (z.duration ? " · " + z.duration + " min" : "") + "\n");
        });
        process.stdout.write("\n" + list.length + " quizzes · " + QD.allQuestions().length + " questions in the bank\n");
    },

    // The student's paper. --key adds answers, explanations and what each
    // distractor reveals.
    quiz: function (db) {
        var QD = loadQuizzes(db);
        var z = QD.quizById(positional[0]);
        if (!z) die("no quiz with id '" + positional[0] + "' — try `quizzes`");
        if (flags["json"]) return jsonOut({ quiz: z, paper: QD.paper(z), stats: QD.stats(z) });
        var key = !!flags["key"];

        process.stdout.write(C.bold + z.name + C.off + "\n");
        if (z.blurb) process.stdout.write(z.blurb + "\n");
        var s = QD.stats(z);
        process.stdout.write(C.dim + "  " + s.questions + " questions" +
            (z.duration ? " · " + z.duration + " minutes" : "") +
            (key ? " · MARKER'S COPY" : "") + C.off + "\n");

        QD.paper(z).forEach(function (row, i) {
            var q = row.q;
            process.stdout.write("\n" + C.bold + (i + 1) + ". " + C.off + q.stem + "\n");
            if (key) {
                process.stdout.write(C.dim + "   [" + q.concept + " · " +
                    (global.QUESTION_DIFFICULTY[q.difficulty] || {}).name + " · " + q.kind + "]" + C.off + "\n");
            }
            if (q.options.length) {
                q.options.forEach(function (o, oi) {
                    var letter = "abcdefgh".charAt(oi);
                    if (!key) {
                        process.stdout.write("   " + letter + ") " + o.text + "\n");
                    } else if (o.correct) {
                        process.stdout.write("   " + C.green + letter + ") " + o.text + "  ✓" + C.off + "\n");
                    } else {
                        process.stdout.write("   " + letter + ") " + o.text +
                            (o.diagnoses ? C.yellow + "   → reveals: " + o.diagnoses + C.off : "") + "\n");
                    }
                });
            } else if (key) {
                process.stdout.write("   " + C.green + "answer: " + q.answer + C.off + "\n");
            } else {
                process.stdout.write("   " + C.dim + "________________________________________" + C.off + "\n");
            }
            if (key && q.explain) process.stdout.write("   " + C.dim + q.explain + C.off + "\n");
        });
        process.stdout.write("\n");
    },

    "quiz-validate": function (db) {
        var QD = loadQuizzes(db);
        var r = QD.validate();
        r.errors.forEach(function (e) {
            process.stdout.write(C.red + "ERROR  " + C.off + pad(e.id, 26) + " " + e.msg + "\n");
        });
        if (!flags["quiet"]) {
            r.warnings.forEach(function (w) {
                process.stdout.write(C.yellow + "warn   " + C.off + pad(w.id, 26) + " " + w.msg + "\n");
            });
        }
        process.stdout.write("\n" + (r.ok ? C.green + "OK" + C.off : C.red + "FAILED" + C.off) +
            " — " + QD.allQuizzes().length + " quizzes, " + QD.allQuestions().length + " questions, " +
            r.errors.length + " errors, " + r.warnings.length + " warnings\n");
        process.exit(r.ok ? 0 : 1);
    },

    // What a course teaches but never checks.
    "quiz-coverage": function (db) {
        var QD = loadQuizzes(db);
        var cov = QD.coverage(positional[0]);
        if (!cov) die("no course with id '" + positional[0] + "'");
        if (flags["json"]) return jsonOut(cov);
        process.stdout.write(C.bold + positional[0] + C.off + " — question coverage\n\n");
        process.stdout.write("  taught concepts   " + cov.tested + " / " + cov.taught + " have questions\n");
        process.stdout.write("  assumed concepts  " + cov.assumedTested + " / " + cov.assumed + " have questions\n");
        if (cov.untested.length) {
            process.stdout.write("\n" + C.bold + "Taught but never tested" + C.off + " (" + cov.untested.length + ")\n");
            db.teachingSort(cov.untested).forEach(function (id) {
                process.stdout.write("  " + pad(id, 26) + C.dim + db.byId(id).name + C.off + "\n");
            });
        }
    },

    // Which documented misconceptions a paper actually probes.
    "quiz-diagnostics": function (db) {
        var QD = loadQuizzes(db);
        var z = QD.quizById(positional[0]);
        if (!z) die("no quiz with id '" + positional[0] + "'");
        var d = QD.diagnostics(z);
        if (flags["json"]) return jsonOut(d);
        process.stdout.write(C.bold + z.name + C.off + " — what this paper diagnoses\n");
        d.probes.forEach(function (p) {
            process.stdout.write("\n" + C.bold + p.concept + C.off + C.dim + "  " + p.q + C.off + "\n");
            p.diagnoses.forEach(function (x) { process.stdout.write("  → " + x + "\n"); });
        });
        if (d.blind.length) {
            process.stdout.write("\n" + C.yellow + "Scoring but not diagnosing" + C.off +
                " — these test a concept with documented misconceptions, but no distractor uses them:\n");
            d.blind.forEach(function (b) {
                process.stdout.write("  " + pad(b.q, 24) + C.dim + b.concept + " (" + b.available + " available)" + C.off + "\n");
            });
        }
        process.stdout.write("\n" + d.probes.length + " diagnostic · " + d.blind.length + " merely scoring\n");
    },

    // The packing list.
    "course-kit": function (db) {
        var CD = loadCourses(db);
        var co = CD.byId(positional[0]);
        if (!co) die("no course with id '" + positional[0] + "'");
        var k = CD.kit(co);
        if (flags["json"]) return jsonOut(k);
        process.stdout.write(C.bold + co.name + C.off + " — kit\n\n");
        Object.keys(k).sort().forEach(function (e) {
            var def = global.EQUIPMENT[e] || {};
            process.stdout.write("  " + pad(def.name || e, 32) +
                C.dim + "sessions " + k[e].map(function (i) { return i + 1; }).join(", ") +
                (def.consumable ? "  (consumable)" : "") + C.off + "\n");
        });
        process.stdout.write("\n" + Object.keys(k).length + " items\n");
    }
};

// ---------------- main ----------------

if (!cmd || cmd === "help" || cmd === "--help" || cmd === "-h" || !COMMANDS[cmd]) {
    process.stdout.write([
        "concepts cli — query and validate the Aryabhat concept database",
        "",
        "  validate                 check ids, dangling refs, cycles, enums (exit 1 on error)",
        "  stats                    counts by subject, level, status, grade",
        "  ls                       list concepts   --subject --domain --grade --status --search",
        "  get <id>                 one concept in full, with its prereq chain",
        "  export [--out f.json]    normalized JSON — the handoff for any external tool",
        "",
        C.bold + "Courses" + C.off + " — delivery plans over concept ids (teacher training, camps, workshops)",
        "",
        "  courses                  list courses with size and moon feasibility",
        "  course <id>              full running order   --brief to drop trainer notes",
        "  course-validate          prereq coverage + moon feasibility (exit 1 on error)",
        "  course-gaps <id>         what a course stands on but never teaches",
        "  course-misconceptions <id>   every wrong idea it must confront, in order",
        "  course-kit <id>          packing list, by session",
        "",
        C.bold + "Quizzes" + C.off + " — questions tagged with concept ids",
        "",
        "  quizzes                  list quizzes and the bank size",
        "  quiz <id>                the paper   --key for answers + what each distractor reveals",
        "  quiz-validate            scope check + one-correct-answer (exit 1 on error)",
        "  quiz-coverage <course>   what a course teaches but never tests",
        "  quiz-diagnostics <id>    which documented misconceptions the paper probes",
        "",
        "  Shared flags: --json  --subject a,b  --grade 8,9  --search text",
        "",
        "  Adding concepts from a source document? Read concepts/README.md.",
        ""
    ].join("\n"));
    process.exit(cmd && cmd !== "help" && cmd !== "--help" && cmd !== "-h" ? 2 : 0);
}

var loaded = load();
COMMANDS[cmd](loaded.db);
