#!/usr/bin/env node
// ============================================================
// Activity Handbook — every hands-on activity in the school
// courses (Classes 6-9), compiled for the teacher who runs them.
//
//   node concepts/build-activity-handbook.js               > handbook.html
//   node concepts/build-activity-handbook.js --no-digital  > handbook-plain.html
//   (then Chrome --headless --print-to-pdf)
//
// --no-digital omits every "Pairs with" line (web tools, apps,
// URLs) — the version for schools where the activity IS the lesson
// and screens are not part of it.
//
// Reads the live ConceptDB + CourseDB: activities live on CONCEPT
// records (tools with k:"activity"), and the courses decide which
// concept is taught when. So the handbook can never disagree with
// the course booklets — same data, different cut.
//
// A concept repeated in a later class gets a one-line back-reference,
// not a copy: the handbook says where the activity FIRST ran and what
// class to revisit it with.
//
// Lives in concepts/ — data directories are require()d wholesale and
// would execute this file. See README.
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

var CD = global.ConceptDB, CO = global.CourseDB;
var EQUIP = global.EQUIPMENT || {};
var MODES = global.SESSION_MODES || {};

var DIGITAL = process.argv.indexOf("--no-digital") === -1;

var GRADES = [
    { id: "school-astro-6", short: "Class 6" },
    { id: "school-astro-7", short: "Class 7" },
    { id: "school-astro-8", short: "Class 8" },
    { id: "school-astro-9", short: "Class 9" }
];

function esc(s) {
    return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// first place each concept's activity appears: conceptId -> {grade, session}
var firstSeen = {};

var out = [];

out.push('<header class="cover">');
out.push('<div class="kicker">Aryabhat Foundation &middot; Curriculum Lab</div>');
out.push('<h1>Sky &amp; Space<br>Activity Handbook</h1>');
out.push('<p class="cover-sub">Every hands-on activity in the Class 6&ndash;9 astronomy courses, in teaching order &mdash; with the concept each one teaches and the kit it needs' +
    (DIGITAL ? ', and the digital tools that pair with it' : '') + '.</p>');

// cover stats
var totalActs = 0, totalSessions = 0;
GRADES.forEach(function (g) {
    var c = CO.byId(g.id);
    c.sessions.forEach(function (s) {
        var n = 0;
        s.concepts.forEach(function (id) {
            var co = CD.byId(id);
            if (co) n += (co.tools || []).filter(function (t) { return t.k === "activity"; }).length;
        });
        if (n) totalSessions++;
        totalActs += n;
    });
});
out.push('<div class="cover-facts">' +
    '<span><b>' + totalActs + '</b> activities</span>' +
    '<span><b>' + totalSessions + '</b> sessions with hands-on work</span>' +
    '<span><b>4</b> classes</span></div>');
out.push('<p class="cover-note">An activity is listed in full the FIRST time its concept is taught; when a later class returns to it, the handbook points back rather than repeating. Companion booklets: one per course, in files/2026/courses/.</p>');
out.push('</header>');

GRADES.forEach(function (g) {
    var c = CO.byId(g.id);
    out.push('<section class="grade">');
    out.push('<div class="grade-head"><span class="grade-tag">' + esc(g.short) + '</span>');
    out.push('<h2>' + esc(c.name) + '</h2>');
    if (c.blurb) out.push('<p class="grade-blurb">' + esc(c.blurb) + '</p>');

    // kit summary for the grade
    var kit = CO.kit(c) || {};
    var kitNames = Object.keys(kit).map(function (k) {
        return (EQUIP[k] && EQUIP[k].name) || k;
    });
    if (kitNames.length) {
        out.push('<div class="kitline"><b>Kit for the year:</b> ' + esc(kitNames.join(" · ")) + '</div>');
    }
    out.push('</div>');

    c.sessions.forEach(function (s) {
        // collect this session's activity-bearing concepts
        var blocks = [], refs = [];
        s.concepts.forEach(function (id) {
            var co = CD.byId(id);
            if (!co) return;
            var acts = (co.tools || []).filter(function (t) { return t.k === "activity"; });
            if (!acts.length) return;
            if (firstSeen[id]) {
                refs.push({ concept: co, at: firstSeen[id] });
            } else {
                firstSeen[id] = { grade: g.short, session: s.idx + 1, title: s.title };
                var digital = (co.tools || []).filter(function (t) { return t.k !== "activity"; });
                blocks.push({ concept: co, acts: acts, digital: digital });
            }
        });
        if (!blocks.length && !refs.length) return; // pure-theory session: not in this book

        out.push('<div class="session">');
        var mode = MODES[s.mode] ? (MODES[s.mode].name || s.mode) : s.mode;
        out.push('<div class="s-head"><span class="s-num">' + (s.idx + 1) + '</span>' +
            '<span class="s-title">' + esc(s.title) + '</span>' +
            '<span class="s-meta">' + esc(mode) + (s.duration ? ' &middot; ' + s.duration + ' min' : '') + '</span></div>');

        if (s.equipment && s.equipment.length) {
            out.push('<div class="s-kit">Bring: ' + esc(s.equipment.map(function (k) {
                return (EQUIP[k] && EQUIP[k].name) || k;
            }).join(", ")) + '</div>');
        }

        blocks.forEach(function (b) {
            b.acts.forEach(function (a) {
                out.push('<div class="act">');
                out.push('<div class="act-label">' + esc(a.label) + '</div>');
                out.push('<div class="act-why"><b>' + esc(b.concept.name) + '</b> &mdash; ' + esc(b.concept.desc) + '</div>');
                if (DIGITAL && b.digital.length) {
                    out.push('<div class="act-digital">Pairs with: ' + b.digital.map(function (t) {
                        var kindName = (global.TOOL_KINDS[t.k] && global.TOOL_KINDS[t.k].name) || t.k;
                        var url = t.url || (global.TOOL_KINDS[t.k] && global.TOOL_KINDS[t.k].url);
                        var label = esc(t.label) + ' <span class="tk">(' + esc(kindName) + ')</span>';
                        return url ? label + ' &mdash; <span class="url">' + esc(url) + '</span>' : label;
                    }).join(" &middot; ") + '</div>');
                }
                out.push('</div>');
            });
        });

        refs.forEach(function (r) {
            out.push('<div class="act-ref">&#8618; <b>' + esc(r.concept.name) + '</b> returns here &mdash; activity first run in ' +
                esc(r.at.grade) + ', session ' + r.at.session + ' (&ldquo;' + esc(r.at.title) + '&rdquo;). Rerun it with this year\'s depth.</div>');
        });

        if (s.notes) out.push('<div class="s-notes">' + esc(s.notes) + '</div>');
        out.push('</div>');
    });

    out.push('</section>');
});

// ---------------- styles + shell ----------------

var css = [
    '@page { size: A4; margin: 15mm 16mm 17mm; }',
    '* { box-sizing: border-box; }',
    'html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }',
    'body { font: 10.5pt/1.55 Georgia,"Times New Roman",serif; color: #1a1c22; margin: 0; }',

    '.cover { border-bottom: 2.5pt solid #1a1c22; padding-bottom: 6mm; margin-bottom: 8mm; }',
    '.kicker { font-family: Arial,sans-serif; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 2px; color: #d4a017; font-weight: 700; }',
    '.cover h1 { font-family: "Helvetica Neue",Arial,sans-serif; font-size: 30pt; line-height: 1.05; letter-spacing: -.5px; margin: 3mm 0 4mm; }',
    '.cover-sub { font-size: 11.5pt; color: #3a3d45; max-width: 150mm; margin: 0 0 4mm; }',
    '.cover-facts { display: flex; gap: 8mm; font-family: Arial,sans-serif; font-size: 9pt; color: #777; margin: 4mm 0; }',
    '.cover-facts b { color: #1a1c22; font-size: 13pt; }',
    '.cover-note { font-size: 9pt; color: #666; font-style: italic; max-width: 150mm; }',

    '.grade { page-break-before: always; }',
    '.grade-head { border-bottom: 2pt solid #1a1c22; padding-bottom: 3.5mm; margin-bottom: 5mm; }',
    '.grade-tag { font-family: Arial,sans-serif; font-size: 9pt; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; background: #1a1c22; color: #fff; padding: 1mm 3mm; border-radius: 3px; }',
    '.grade-head h2 { font-family: "Helvetica Neue",Arial,sans-serif; font-size: 19pt; margin: 2.5mm 0 1.5mm; letter-spacing: -.3px; }',
    '.grade-blurb { font-size: 10pt; color: #555; margin: 0 0 2.5mm; }',
    '.kitline { font-size: 9pt; color: #555; font-family: Arial,sans-serif; }',
    '.kitline b { color: #1a1c22; }',

    '.session { margin: 0 0 6mm; page-break-inside: avoid; }',
    '.s-head { display: flex; align-items: baseline; gap: 3mm; border-bottom: 1pt solid #d8dadf; padding-bottom: 1.5mm; margin-bottom: 2.5mm; }',
    '.s-num { font-family: Arial,sans-serif; font-weight: 700; font-size: 9.5pt; background: #f0ead6; color: #7a5f10; min-width: 7mm; height: 7mm; line-height: 7mm; text-align: center; border-radius: 50%; }',
    '.s-title { font-family: "Helvetica Neue",Arial,sans-serif; font-weight: 600; font-size: 12pt; flex: 1; }',
    '.s-meta { font-family: Arial,sans-serif; font-size: 8.5pt; color: #999; }',
    '.s-kit { font-family: Arial,sans-serif; font-size: 8.5pt; color: #7a5f10; margin: 0 0 2mm 10mm; }',

    '.act { margin: 0 0 3.5mm 10mm; padding: 2.8mm 3.5mm; background: #f8f7f2; border: 1px solid #e7e3d4; border-left: 2.5pt solid #d4a017; border-radius: 4px; page-break-inside: avoid; }',
    '.act-label { font-family: "Helvetica Neue",Arial,sans-serif; font-weight: 600; font-size: 10.5pt; margin-bottom: 1.2mm; }',
    '.act-why { font-size: 9.3pt; color: #4a4d55; line-height: 1.5; }',
    '.act-why b { color: #1a1c22; }',
    '.act-digital { font-size: 8.3pt; color: #666; margin-top: 1.6mm; font-family: Arial,sans-serif; line-height: 1.5; }',
    '.tk { color: #999; }',
    '.url { color: #2a6496; }',

    '.act-ref { margin: 0 0 3mm 10mm; font-size: 9pt; color: #666; font-style: italic; }',
    '.act-ref b { color: #1a1c22; font-style: normal; }',

    '.s-notes { margin: 2mm 0 0 10mm; font-size: 8.8pt; color: #5a5d66; border-left: 2pt solid #e3e5ea; padding-left: 3mm; line-height: 1.5; }'
].join("\n");

process.stdout.write("<!doctype html><html><head><meta charset='utf-8'><title>Sky & Space Activity Handbook — Classes 6–9</title>" +
    "<style>" + css + "</style></head><body>" + out.join("\n") + "</body></html>");
