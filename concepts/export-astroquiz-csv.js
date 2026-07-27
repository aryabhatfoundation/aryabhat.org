#!/usr/bin/env node
// ============================================================
// Export concept-tagged questions to the astro quiz platform CSV.
//
//   node concepts/export-astroquiz-csv.js                 > additions.csv
//   node concepts/export-astroquiz-csv.js --start 321     > additions.csv
//   node concepts/export-astroquiz-csv.js --combine ~/Downloads/astroquiz_question_repaired.csv > full.csv
//
// Selects every question whose `sources` mentions "astroquiz" and
// emits platform rows: id,num,content,option1..option4,correct_answer.
//
// THE POINT: the platform CSV cannot hold concept tags, diagnoses or
// validation — so the CSV is a BUILD ARTIFACT, never the source of
// truth. Author in concepts/quizzes/, validate, then export.
//
// Option order comes from QuizDB's deterministic id-hash shuffle —
// the same order every consumer sees (QUIZ-FORMAT.md §6). The
// correct_answer column is computed AFTER that shuffle. Re-exporting
// therefore never moves answers unless a question id changes.
//
// Lives in concepts/, not quizzes/ — data directories are require()d
// wholesale and would execute this file. See README.
// ============================================================

"use strict";

var fs = require("fs");
var path = require("path");
var ROOT = path.resolve(__dirname);

global.window = global;

function loadDir(dir) {
    require(path.join(dir, "_schema.js"));
    fs.readdirSync(dir)
        .filter(function (f) {
            if (!f.endsWith(".js") || f === "_schema.js") return false;
            return fs.readFileSync(path.join(dir, f), "utf8").slice(0, 2) !== "#!";
        })
        .sort()
        .forEach(function (f) { require(path.join(dir, f)); });
}

loadDir(path.join(ROOT, "data"));
require(path.join(ROOT, "db.js"));
global.ConceptDB.build(global.CONCEPTS);

loadDir(path.join(ROOT, "courses"));
require(path.join(ROOT, "coursedb.js"));
global.CourseDB.build(global.COURSES, global.ConceptDB);

loadDir(path.join(ROOT, "quizzes"));
require(path.join(ROOT, "quizdb.js"));
global.QuizDB.build(global.QUESTIONS, global.QUIZZES, global.ConceptDB, global.CourseDB);

// ---------------- args ----------------

var args = process.argv.slice(2);
function argOf(flag) {
    var i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : null;
}
var START = parseInt(argOf("--start") || "321", 10);
var COMBINE = argOf("--combine");

// ---------------- select ----------------

// Exported set: questions that declare an astroquiz source. Order is
// authoring order (the bank file's push order), which keeps platform
// ids stable across re-exports as long as nothing is inserted mid-file.
var out = global.QuizDB.allQuestions().filter(function (q) {
    return q.sources.some(function (s) { return String(s).indexOf("astroquiz") !== -1; });
});

if (!out.length) {
    process.stderr.write("no questions carry an 'astroquiz' source — nothing to export\n");
    process.exit(1);
}

var bad = out.filter(function (q) { return q.kind !== "mcq" || q.options.length !== 4; });
if (bad.length) {
    process.stderr.write("platform needs exactly-4-option mcqs; offending: " +
        bad.map(function (q) { return q.id; }).join(", ") + "\n");
    process.exit(1);
}

// ---------------- emit ----------------

function q(s) { return '"' + String(s).replace(/"/g, '""') + '"'; }

var rows = [];
if (COMBINE) {
    // pass the existing platform file through untouched (minus its header)
    fs.readFileSync(COMBINE, "utf8").split(/\r?\n/).forEach(function (line) {
        if (!line.trim()) return;
        var m = line.match(/^"(\d+)"/);
        if (m) rows.push(line);
    });
}

out.forEach(function (item, i) {
    var n = START + i;
    // QuizDB has already applied the deterministic shuffle; find where
    // the correct option landed.
    var correct = -1;
    item.options.forEach(function (o, oi) { if (o.correct) correct = oi + 1; });
    rows.push([q(n), q(n), q(item.stem),
        q(item.options[0].text), q(item.options[1].text),
        q(item.options[2].text), q(item.options[3].text), q(correct)].join(","));
});

process.stdout.write('"id","num","content","option1","option2","option3","option4","correct_answer"\n' +
    rows.join("\n") + "\n");
process.stderr.write("exported " + out.length + " questions" +
    (COMBINE ? " appended after " + (rows.length - out.length) + " existing" : "") +
    ", platform ids " + START + "-" + (START + out.length - 1) + "\n");
