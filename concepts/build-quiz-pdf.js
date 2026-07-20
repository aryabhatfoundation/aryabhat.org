#!/usr/bin/env node
// ============================================================
// Render a quiz to print-ready HTML — student paper or marker's key.
//
//   node concepts/build-quiz-pdf.js <quizId>        > paper.html
//   node concepts/build-quiz-pdf.js <quizId> --key  > key.html
//   (then Chrome --headless --print-to-pdf)
//
// Reads the live QuizDB, so a paper can never disagree with what
// `quiz-validate` passes — including the scope check that keeps an
// entry paper off the syllabus it is supposed to precede.
//
// The two copies are deliberately different documents, not one
// document with a flag:
//   student — the questions, and room to answer. Nothing else.
//   key     — the answer, WHAT EACH WRONG OPTION REVEALS, and the
//             explanation. The `diagnoses` column is the point: it
//             turns marking from scoring into diagnosis.
//
// Lives in concepts/, not quizzes/ — the data directories are
// require()d wholesale and would execute this file. See README.
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

var QD = global.QuizDB;

// ---------------- args ----------------

var args = process.argv.slice(2);
var KEY = args.indexOf("--key") !== -1;
var quizId = args.filter(function (a) { return a.slice(0, 2) !== "--"; })[0];
if (!quizId) {
    process.stderr.write("usage: build-quiz-pdf.js <quizId> [--key]\n");
    process.exit(1);
}
var z = QD.quizById(quizId);
if (!z) {
    process.stderr.write("no quiz '" + quizId + "'\n");
    process.exit(1);
}

// ---------------- helpers ----------------

function esc(s) {
    return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var LETTERS = "abcdefgh";

var PURPOSES = global.QUIZ_PURPOSES;
var DIFF = global.QUESTION_DIFFICULTY;
var KINDS = global.QUESTION_KINDS;

var stats = QD.stats(z);
var course = z.course && global.CourseDB.byId(z.course);

// ---------------- render ----------------

function head() {
    var h = '<header class="sheet-head">';
    h += '<div class="kicker">' + esc((PURPOSES[z.purpose] || {}).name) +
        (KEY ? ' &middot; <span class="keytag">Marker\'s key</span>' : '') + '</div>';
    h += '<h1>' + esc(z.name) + '</h1>';
    if (course) h += '<div class="courseline">' + esc(course.name) + '</div>';

    if (!KEY) {
        h += '<div class="idbox">' +
            '<label>Name <span class="rule"></span></label>' +
            '<label>Date <span class="rule short"></span></label>' +
            '</div>';
    }

    h += '<div class="facts">' +
        '<span><b>' + stats.questions + '</b> questions</span>' +
        (z.duration ? '<span><b>' + z.duration + '</b> minutes</span>' : '') +
        (KEY ? '<span><b>' + stats.concepts + '</b> concepts</span>' +
               '<span><b>' + stats.diagnostic + '</b> diagnostic</span>' : '') +
        '</div>';

    if (z.blurb) h += '<p class="blurb">' + esc(z.blurb) + '</p>';

    if (!KEY) {
        h += '<p class="instr">Circle one letter for each multiple-choice question. ' +
            'Write short answers on the lines. Tasks marked <b>Practical</b> are done, ' +
            'not written — your assessor will watch.</p>';
    }
    h += '</header>';
    return h;
}

function question(row, i) {
    var q = row.q;
    var h = '<div class="q">';
    h += '<div class="q-head"><span class="q-num">' + (i + 1) + '</span>';
    h += '<span class="q-stem">' + esc(q.stem) + '</span></div>';

    if (KEY) {
        h += '<div class="q-tags">' +
            '<span class="tag">' + esc(q.concept) + '</span>' +
            '<span class="tag">' + esc((DIFF[q.difficulty] || {}).name) + '</span>' +
            '<span class="tag">' + esc((KINDS[q.kind] || {}).name) + '</span>' +
            '</div>';
    }

    if (q.options.length) {
        h += '<ol class="opts">';
        q.options.forEach(function (o, oi) {
            var cls = KEY && o.correct ? ' class="right"' : "";
            h += '<li' + cls + '><span class="ltr">' + LETTERS.charAt(oi) + '</span>';
            h += '<span class="otext">' + esc(o.text) + (KEY && o.correct ? ' <b class="tick">&#10003;</b>' : '') + '</span>';
            if (KEY && o.diagnoses) {
                h += '<span class="diag"><b>reveals</b> ' + esc(o.diagnoses) + '</span>';
            }
            h += '</li>';
        });
        h += '</ol>';
    } else if (KEY) {
        h += '<div class="ans"><b>Answer / what to watch for</b><br>' + esc(q.answer) + '</div>';
    } else {
        // Room to answer. A practical needs none — it is done, not written.
        h += q.kind === "practical"
            ? '<div class="prac">Practical &mdash; performed for your assessor.</div>'
            : '<div class="lines"><span></span><span></span></div>';
    }

    if (KEY && q.explain) h += '<div class="expl">' + esc(q.explain) + '</div>';
    h += '</div>';
    return h;
}

var css = [
    '@page { size: A4; margin: 15mm 15mm 16mm; }',
    '* { box-sizing: border-box; }',
    'html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }',
    'body { font: 10.5pt/1.5 "Georgia","Times New Roman",serif; color: #1a1c22; margin: 0; }',
    'h1 { font-family: "Helvetica Neue",Arial,sans-serif; font-size: 19pt; margin: 1mm 0 1mm; letter-spacing:-.3px; }',

    '.sheet-head { border-bottom: 2.5pt solid #1a1c22; padding-bottom: 4mm; margin-bottom: 5mm; }',
    '.kicker { font-family:Arial,sans-serif; font-size:8.5pt; text-transform:uppercase; letter-spacing:2px; color:#d4a017; font-weight:700; }',
    '.keytag { color:#c0392b; }',
    '.courseline { font-size:9.5pt; color:#888; font-style:italic; }',
    '.facts { display:flex; gap:6mm; font-family:Arial,sans-serif; font-size:8.5pt; color:#777; margin-top:3mm; }',
    '.facts b { color:#1a1c22; font-size:10pt; }',
    '.blurb { margin: 3mm 0 0; font-size:9.5pt; color:#3a3d45; }',
    '.instr { margin: 3mm 0 0; font-size:9pt; color:#666; font-style:italic; }',

    '.idbox { display:flex; gap:10mm; margin-top:4mm; font-family:Arial,sans-serif; font-size:9pt; }',
    '.idbox label { display:flex; align-items:baseline; gap:2mm; flex:1; }',
    '.rule { flex:1; border-bottom:1px solid #999; height:6mm; }',
    '.rule.short { max-width:38mm; }',

    '.q { page-break-inside: avoid; margin-bottom: 6mm; }',
    '.q-head { display:flex; gap:3mm; align-items:baseline; }',
    '.q-num { flex:0 0 auto; font-family:Arial,sans-serif; font-weight:700; font-size:9pt; background:#1a1c22; color:#fff; width:6mm; height:6mm; line-height:6mm; text-align:center; border-radius:50%; }',
    '.q-stem { font-size:10.5pt; }',
    '.q-tags { margin: 1mm 0 1.5mm 9mm; display:flex; gap:2mm; }',
    '.tag { font-family:"SF Mono",Menlo,monospace; font-size:7pt; background:#f0f1f4; color:#777; border-radius:3px; padding:.4mm 1.6mm; }',

    '.opts { list-style:none; margin:2mm 0 0 9mm; padding:0; }',
    '.opts li { display:grid; grid-template-columns: 6mm 1fr; gap:0 1mm; padding:1.2mm 0; align-items:baseline; }',
    '.ltr { font-family:Arial,sans-serif; font-size:9pt; color:#888; }',
    '.opts li.right { background:#f2f8f2; border-radius:4px; }',
    '.opts li.right .ltr { color:#2d6a3e; font-weight:700; }',
    '.otext { font-size:10pt; }',
    '.tick { color:#2d6a3e; }',
    '.diag { grid-column:2; font-size:8.2pt; color:#a06b1a; line-height:1.35; margin-top:.4mm; }',
    '.diag b { font-family:Arial,sans-serif; font-size:6.8pt; text-transform:uppercase; letter-spacing:.8px; margin-right:1.5mm; }',

    '.lines { margin: 3mm 0 0 9mm; }',
    '.lines span { display:block; border-bottom:1px solid #ccc; height:7mm; }',
    '.prac { margin: 2mm 0 0 9mm; font-size:9pt; color:#8a6d1a; background:#fbf7ea; border:1px solid #ece0c0; border-radius:4px; padding:2mm 3mm; font-style:italic; }',

    '.ans { margin: 2mm 0 0 9mm; background:#f2f8f2; border:1px solid #d5e8d8; border-radius:5px; padding:2.4mm 3mm; font-size:9.2pt; line-height:1.45; }',
    '.ans b { font-family:Arial,sans-serif; font-size:7.5pt; text-transform:uppercase; letter-spacing:1px; color:#2d6a3e; }',
    '.expl { margin: 2mm 0 0 9mm; font-size:8.8pt; color:#5a5d66; border-left:2pt solid #e3e5ea; padding-left:3mm; line-height:1.45; }'
].join("\n");

var title = z.name + (KEY ? " — Marker's key" : "");
var out = "<!doctype html><html><head><meta charset='utf-8'><title>" + esc(title) + "</title>" +
    "<style>" + css + "</style></head><body>";
out += head();
QD.paper(z).forEach(function (row, i) { out += question(row, i); });
out += "</body></html>";

process.stdout.write(out);
