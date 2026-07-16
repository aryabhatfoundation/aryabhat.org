#!/usr/bin/env node
// ============================================================
// Render every course to a single print-ready HTML document.
//
//   node concepts/courses/build-pdf.js > courses.html
//   (then Chrome --headless --print-to-pdf)
//
// Reads the live CourseDB, so the booklet can never disagree with
// what `course-validate` passes — the running orders, moon windows
// and kit lists are computed, not transcribed.
// ============================================================

"use strict";

var fs = require("fs");
var path = require("path");
var ROOT = path.resolve(__dirname, "..");

global.window = global;
require(path.join(ROOT, "data", "_schema.js"));
fs.readdirSync(path.join(ROOT, "data"))
    .filter(function (f) { return f.endsWith(".js") && f !== "_schema.js"; })
    .forEach(function (f) { require(path.join(ROOT, "data", f)); });
require(path.join(ROOT, "db.js"));
var CDB = global.ConceptDB.build(global.CONCEPTS);

require(path.join(__dirname, "_schema.js"));
fs.readdirSync(__dirname)
    .filter(function (f) { return f.endsWith(".js") && f !== "_schema.js" && f !== "build-pdf.js"; })
    .sort()
    .forEach(function (f) { require(path.join(__dirname, f)); });
require(path.join(ROOT, "coursedb.js"));
global.CourseDB.build(global.COURSES, global.ConceptDB);
var CO = global.CourseDB;

// ---------------- helpers ----------------

function esc(s) {
    return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function hrs(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return h ? (m ? h + " h " + m + " min" : h + " h") : m + " min";
}
function moonGlyph(age) {
    var f = age / 29.53;
    if (f < 0.03 || f > 0.97) return "🌑 new";
    if (f < 0.22) return "🌒 waxing crescent";
    if (f < 0.28) return "🌓 first quarter";
    if (f < 0.47) return "🌔 waxing gibbous";
    if (f < 0.53) return "🌕 full";
    if (f < 0.72) return "🌖 waning gibbous";
    if (f < 0.78) return "🌗 last quarter";
    return "🌘 waning crescent";
}

// Order the booklet the way a reader wants it, not alphabetically.
var ORDER = [
    "school-astro-6", "school-astro-7", "school-astro-8", "school-astro-9",
    "quiz-prelim-prep", "quiz-practical-intensive", "astrophoto-beginner",
    "teacher-training-middle"
];
var courses = CO.all().slice().sort(function (a, b) {
    var ia = ORDER.indexOf(a.id), ib = ORDER.indexOf(b.id);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
});

// One course per file: pass its id and the booklet becomes a standalone
// leaflet — no combined cover, no cross-course table of contents.
var ONLY = process.argv[2] || null;
if (ONLY) {
    courses = courses.filter(function (c) { return c.id === ONLY; });
    if (!courses.length) { process.stderr.write("no course '" + ONLY + "'\n"); process.exit(1); }
}

var SUBJ = global.CONCEPT_SUBJECTS;
var LEVELS = global.CONCEPT_LEVELS;
var MODES = global.SESSION_MODES;
var MOONREQ = global.MOON_REQS;
var KINDS = global.COURSE_KINDS;
var TRACKS = global.CONCEPT_TRACKS;
var EQUIP = global.EQUIPMENT;
var TARGETS = global.TARGETS;

// ---------------- per-course rendering ----------------

function courseSection(co) {
    var s = CO.stats(co);
    var moon = CO.moonSolve(co);
    var kit = CO.kit(co);
    var syll = CO.syllabus(co);
    var h = "";

    h += '<section class="course">';
    h += '<div class="course-head">';
    h += '<div class="kicker">' + esc((KINDS[co.kind] || {}).name) + '</div>';
    h += '<h1>' + esc(co.name) + '</h1>';
    if (co.blurb) h += '<p class="blurb">' + esc(co.blurb) + '</p>';

    h += '<div class="facts">';
    h += fact(s.sessions, "sessions");
    h += fact(s.concepts, "concepts taught");
    h += fact(hrs(s.minutes), "total");
    if (s.outdoorMinutes) h += fact(hrs(s.outdoorMinutes), "outdoors");
    h += fact((TRACKS[co.audience] || {}).name || co.audience, "audience");
    h += '</div>';

    if (moon.constrained) {
        h += '<div class="moonband">';
        if (moon.feasible) {
            h += '<strong>Moon:</strong> ';
            h += moon.windows.map(function (w) {
                return "start when the moon is <b>" + w[0] + "–" + w[1] + " days old</b> (" +
                    esc(moonGlyph(w[0])) + (w[0] === w[1] ? "" : " → " + esc(moonGlyph(w[1]))) + ")";
            }).join(" &nbsp;or&nbsp; ");
        } else {
            h += '<strong class="bad">Moon: unschedulable</strong>';
        }
        h += '</div>';
    }
    h += '</div>'; // course-head

    if (co.assumes.length) {
        h += '<div class="assumes"><h3>Assumed already known</h3><p>';
        h += co.assumes.map(function (id) {
            var c = CDB && CDB.byId ? null : null;
            var cc = CO.byId ? null : null;
            var rec = global.ConceptDB.byId(id);
            return '<span class="chip">' + esc(rec ? rec.name : id) + '</span>';
        }).join(" ");
        h += '</p><p class="fine">Closed under prerequisites: ' + s.assumed +
            ' concepts in total are taken as prior knowledge.</p></div>';
    }

    // sessions
    syll.forEach(function (sess) {
        var mode = MODES[sess.mode] || {};
        h += '<div class="session' + (mode.outdoor ? ' outdoor' : '') + '">';
        h += '<div class="s-head">';
        h += '<div class="s-title"><span class="s-num">' + (sess.idx + 1) + '</span>' + esc(sess.title) + '</div>';
        h += '<div class="s-meta">' + esc(mode.name) + ' &middot; ' + esc(hrs(sess.duration)) +
            (sess.day ? ' &middot; day ' + sess.day : '') + '</div>';
        h += '</div>';

        if (sess.sky) {
            var req = MOONREQ[sess.sky.moon] || {};
            h += '<div class="sky"><span class="sky-tag">SKY</span> needs <b>' + esc(req.name) + '</b>';
            if (sess.sky.targets.length) {
                h += ' &middot; ' + sess.sky.targets.map(function (t) {
                    return esc((TARGETS[t] || {}).name || t);
                }).join(", ");
            }
            h += '</div>';
        }
        if (sess.equipment.length) {
            h += '<div class="kitline"><span class="kit-tag">KIT</span> ' +
                sess.equipment.map(function (e) { return esc((EQUIP[e] || {}).name || e); }).join(" &middot; ") +
                '</div>';
        }

        h += '<ul class="concepts">';
        sess.concepts.forEach(function (c) {
            var col = (SUBJ[c.subject] || {}).color || "#888";
            h += '<li><span class="lvl" style="border-color:' + col + ';color:' + col + '">L' + c.level + '</span>' +
                '<span class="cname">' + esc(c.name) + '</span>' +
                '<span class="cdesc">' + esc(c.desc) + '</span></li>';
        });
        h += '</ul>';

        if (sess.notes) {
            h += '<div class="note"><span class="note-tag">Trainer note</span> ' + esc(sess.notes) + '</div>';
        }
        h += '</div>'; // session
    });

    // kit summary
    var kitKeys = Object.keys(kit).sort();
    if (kitKeys.length) {
        h += '<div class="kitsummary"><h3>Full kit list</h3><table>';
        kitKeys.forEach(function (e) {
            var def = EQUIP[e] || {};
            h += '<tr><td class="kn">' + esc(def.name || e) + (def.consumable ? ' <em>(consumable)</em>' : '') +
                '</td><td class="ks">sessions ' + kit[e].map(function (i) { return i + 1; }).join(", ") + '</td></tr>';
        });
        h += '</table></div>';
    }

    h += '</section>';
    return h;
}

function fact(v, label) {
    return '<div class="fact"><span class="fv">' + esc(v) + '</span><span class="fl">' + esc(label) + '</span></div>';
}

// ---------------- contents + cover ----------------

function cover() {
    var totalSessions = courses.reduce(function (a, c) { return a + c.sessions.length; }, 0);
    var h = '<section class="cover">';
    h += '<div class="cover-mark">✦</div>';
    h += '<h1>Aryabhat Astronomy</h1>';
    h += '<h2>Course Handbook</h2>';
    h += '<p class="cover-sub">' + courses.length + ' courses &middot; ' + totalSessions +
        ' sessions &middot; every prerequisite checked</p>';
    h += '<div class="toc"><h3>Contents</h3><ol>';
    courses.forEach(function (co) {
        var st = CO.stats(co);
        h += '<li><span class="toc-name">' + esc(co.name) + '</span>' +
            '<span class="toc-meta">' + (KINDS[co.kind] || {}).name + ' &middot; ' +
            st.sessions + ' sessions &middot; ' + hrs(st.minutes) + '</span></li>';
    });
    h += '</ol></div>';
    h += '<p class="cover-foot">Generated from the Aryabhat concept graph. Every course below passes ' +
        '<code>course-validate</code>: no concept is taught before its prerequisites, and every ' +
        'observing night has a moon it can actually run under. Courses are marked <b>draft</b> — ' +
        'structure is machine-checked; pacing and emphasis await a human pass.</p>';
    h += '</section>';
    return h;
}

// ---------------- document ----------------

var css = [
    '@page { size: A4; margin: 16mm 15mm 18mm; }',
    '* { box-sizing: border-box; }',
    'html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }',
    'body { font: 10.5pt/1.5 "Georgia","Times New Roman",serif; color: #1a1c22; margin: 0; }',
    'h1,h2,h3 { font-family: "Helvetica Neue",Arial,sans-serif; }',
    'code { font-family: "SF Mono",Menlo,monospace; font-size: .88em; background:#f0f1f4; padding:1px 4px; border-radius:3px; }',

    // cover
    '.cover { height: 262mm; display: flex; flex-direction: column; justify-content: center; page-break-after: always; text-align:center; }',
    '.cover-mark { font-size: 54pt; color:#d4a017; line-height:1; margin-bottom: 6mm; }',
    '.cover h1 { font-size: 34pt; margin: 0; letter-spacing:-.5px; }',
    '.cover h2 { font-size: 18pt; font-weight: 400; color:#555; margin: 2mm 0 6mm; }',
    '.cover-sub { color:#777; font-size:11pt; margin: 0 0 14mm; }',
    '.toc { text-align:left; max-width: 130mm; margin: 0 auto; }',
    '.toc h3 { font-size:11pt; text-transform:uppercase; letter-spacing:1.5px; color:#999; border-bottom:1px solid #ddd; padding-bottom:3mm; }',
    '.toc ol { list-style:none; counter-reset: toc; padding:0; margin:0; }',
    '.toc li { counter-increment: toc; display:flex; justify-content:space-between; align-items:baseline; padding:2.4mm 0; border-bottom:1px dotted #e2e2e2; gap: 8mm; }',
    '.toc li::before { content: counter(toc) "."; color:#d4a017; font-weight:bold; font-family:Arial,sans-serif; margin-right:3mm; }',
    '.toc-name { font-weight:600; flex:1; }',
    '.toc-meta { color:#999; font-size:8.5pt; white-space:nowrap; font-family:Arial,sans-serif; }',
    '.cover-foot { max-width:130mm; margin: 12mm auto 0; font-size:8.5pt; color:#888; line-height:1.55; }',

    // course
    '.course { page-break-before: always; }',
    '.course-head { border-bottom: 2.5pt solid #1a1c22; padding-bottom: 4mm; margin-bottom: 5mm; }',
    '.kicker { font-family:Arial,sans-serif; font-size:8.5pt; text-transform:uppercase; letter-spacing:2px; color:#d4a017; font-weight:700; }',
    '.course h1 { font-size:21pt; margin: 1mm 0 2mm; letter-spacing:-.4px; }',
    '.blurb { margin: 0 0 4mm; color:#3a3d45; font-size:10.5pt; }',
    '.facts { display:flex; flex-wrap:wrap; gap: 7mm; margin-bottom: 3mm; }',
    '.fact { display:flex; flex-direction:column; }',
    '.fv { font-family:Arial,sans-serif; font-weight:700; font-size:12pt; }',
    '.fl { font-size:7.5pt; text-transform:uppercase; letter-spacing:.8px; color:#999; }',
    '.moonband { margin-top:2mm; background:#f6f2e8; border:1px solid #e8ddc0; border-radius:5px; padding:2.4mm 3.5mm; font-size:9.5pt; }',
    '.moonband .bad { color:#c0392b; }',

    '.assumes { background:#f5f6f8; border-radius:6px; padding:3.5mm 4mm; margin-bottom:5mm; }',
    '.assumes h3 { font-size:8.5pt; text-transform:uppercase; letter-spacing:1.2px; color:#888; margin:0 0 2.5mm; }',
    '.chip { display:inline-block; background:#fff; border:1px solid #d8dbe0; border-radius:11px; padding:.6mm 2.6mm; font-size:8.5pt; margin:0 1.4mm 1.4mm 0; font-family:Arial,sans-serif; }',
    '.fine { font-size:8pt; color:#999; margin:1.5mm 0 0; font-style:italic; }',

    // session
    '.session { page-break-inside: avoid; border-left: 2.5pt solid #e3e5ea; padding: 0 0 0 4.5mm; margin-bottom: 5mm; }',
    '.session.outdoor { border-left-color:#d4a017; }',
    '.s-head { display:flex; justify-content:space-between; align-items:baseline; gap:6mm; margin-bottom:1.5mm; }',
    '.s-title { font-family:Arial,sans-serif; font-weight:700; font-size:11pt; }',
    '.s-num { display:inline-block; min-width:6mm; height:6mm; line-height:6mm; text-align:center; background:#1a1c22; color:#fff; border-radius:50%; font-size:8pt; margin-right:2.5mm; }',
    '.session.outdoor .s-num { background:#d4a017; }',
    '.s-meta { font-family:Arial,sans-serif; font-size:8pt; color:#999; white-space:nowrap; text-transform:uppercase; letter-spacing:.5px; }',
    '.sky, .kitline { font-size:8.5pt; margin: 1mm 0; color:#444; }',
    '.sky-tag,.kit-tag { display:inline-block; font-family:Arial,sans-serif; font-size:6.8pt; font-weight:700; letter-spacing:1px; padding:.3mm 1.6mm; border-radius:3px; margin-right:2mm; vertical-align:1px; }',
    '.sky-tag { background:#fbf0d0; color:#8a6d1a; }',
    '.kit-tag { background:#eceef1; color:#777; }',
    '.concepts { list-style:none; margin:2mm 0; padding:0; }',
    '.concepts li { display:grid; grid-template-columns: 9mm 1fr; gap:0 2mm; padding:1.3mm 0; border-bottom:1px solid #f0f1f3; align-items:baseline; }',
    '.lvl { grid-row: span 2; font-family:Arial,sans-serif; font-size:7.5pt; font-weight:700; border:1.2px solid; border-radius:3px; text-align:center; padding:.4mm 0; align-self:start; }',
    '.cname { font-weight:600; font-size:10pt; }',
    '.cdesc { grid-column:2; font-size:8.8pt; color:#5a5d66; line-height:1.4; }',
    '.note { background:#fafaf7; border:1px solid #ece9df; border-radius:5px; padding:2.6mm 3.2mm; font-size:9pt; color:#3a3d45; margin-top:2mm; line-height:1.5; }',
    '.note-tag { font-family:Arial,sans-serif; font-weight:700; font-size:7pt; text-transform:uppercase; letter-spacing:1px; color:#b8901a; margin-right:2mm; }',

    '.kitsummary { page-break-inside:avoid; margin-top:6mm; border-top:1px solid #e3e5ea; padding-top:3mm; }',
    '.kitsummary h3 { font-size:9pt; text-transform:uppercase; letter-spacing:1.2px; color:#888; margin:0 0 2mm; }',
    '.kitsummary table { width:100%; border-collapse:collapse; font-size:9pt; }',
    '.kitsummary td { padding:1mm 0; border-bottom:1px solid #f2f2f4; vertical-align:top; }',
    '.kn { font-weight:600; }',
    '.kn em { font-weight:400; color:#aaa; font-size:8pt; }',
    '.ks { text-align:right; color:#999; font-family:Arial,sans-serif; font-size:8pt; white-space:nowrap; }'
].join("\n");

var title = ONLY ? courses[0].name : "Aryabhat Course Handbook";
// A standalone leaflet must not open with the combined cover, nor waste
// its first sheet on the page-break that separates courses in the booklet.
var firstCourseCss = ONLY ? ".course:first-child { page-break-before: avoid; }" : "";

var out = "<!doctype html><html><head><meta charset='utf-8'><title>" + esc(title) + "</title>" +
    "<style>" + css + "\n" + firstCourseCss + "</style></head><body>";
if (!ONLY) out += cover();
courses.forEach(function (co) { out += courseSection(co); });
out += "</body></html>";

process.stdout.write(out);
