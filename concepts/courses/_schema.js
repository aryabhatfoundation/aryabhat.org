// ============================================================
// Aryabhat Course Layer — schema & taxonomy.
//
// LOAD ORDER MATTERS. This file must be the first of the
// courses/*.js scripts: it declares the taxonomy tables and
// creates window.COURSES, which every course file push()es into.
//
// It also loads AFTER the concept data — a course is nothing but
// an ordered delivery plan over concept ids, and CourseDB checks
// every one of them against ConceptDB.
//
// ------------------------------------------------------------
// WHY THIS IS A SEPARATE LAYER
// ------------------------------------------------------------
// A concept answers "what is this idea, and what must you know
// first?" — a fact about knowledge, true regardless of who is in
// the room. A course answers "who, in what order, on which night,
// with what equipment?" — a fact about delivery.
//
// The same concept takes a teacher 10 minutes and a beginner 45.
// So duration, equipment and session grouping live HERE, on the
// session, never on the concept. Concepts stay reusable across
// every course; courses stay free to disagree about pacing.
//
// ------------------------------------------------------------
// COURSE RECORD
// ------------------------------------------------------------
// Required:
//   id       : stable slug
//   name     : short display name
//   kind     : a key of COURSE_KINDS
//   audience : a key of CONCEPT_TRACKS — the track this course
//              draws from. Validation warns if a session teaches a
//              concept not tagged with it, which is how you catch
//              an astrophotography course drifting into olympiad
//              theory.
//   sessions : ordered array of session records (below)
//
// Optional:
//   blurb    : 1–2 sentences on who it is for and what they leave with
//   assumes  : concept ids the learner is taken to know ALREADY.
//              Closed under prereqs automatically — assuming
//              `moon-phases` assumes everything beneath it too.
//              This is the honest alternative to silently teaching
//              on top of a gap.
//   status   : "published" | "review" | "draft"  (default published)
//   sources  : provenance, same meaning as on a concept
//
// ------------------------------------------------------------
// SESSION RECORD
// ------------------------------------------------------------
// Required:
//   title    : what this session is called on the timetable
//   mode     : a key of SESSION_MODES
//   duration : minutes, wall-clock
//   concepts : concept ids TAUGHT here, in any order (CourseDB
//              teaching-sorts them for you)
//
// Optional:
//   day      : 1-based day within the course. REQUIRED if `sky` is
//              set — the moon solver needs to know the spacing.
//   equipment: keys of EQUIPMENT
//   sky      : { moon: MOON_REQS key, targets: [TARGETS keys] }
//              Only for sessions that actually go outside.
//   notes    : anything the trainer needs that the concepts don't say
//
// ------------------------------------------------------------
// THE POINT OF ALL THIS
// ------------------------------------------------------------
// Two checks that are impossible without this layer, and that no
// amount of care catches by eye:
//
//   1. Prereq coverage. Session 4 teaches `histogram-reading` but
//      nothing ever taught `exposure-triangle` and it is not in
//      `assumes` — a CLI error, not a discovery at 11pm on night 4.
//
//   2. Moon feasibility. Night 2 wants a dark sky for the Milky Way
//      and night 3 wants a first-quarter terminator for craters.
//      Those are ~7 days apart. No start date in the 29.53-day cycle
//      satisfies both on consecutive nights, and the solver says so.
// ============================================================

// ------------------------------------------------------------
// COURSE KINDS — what sort of programme this is.
// ------------------------------------------------------------
window.COURSE_KINDS = {
    "teacher-training":  { name: "Teacher Training",     blurb: "Equipping teachers to run the topic themselves." },
    "student-intensive": { name: "Student Intensive",    blurb: "Selected students, deeper and hands-on." },
    "workshop":          { name: "Workshop",             blurb: "Short, skill-focused, produces an artefact." },
    "school-module":     { name: "School Module",        blurb: "A year-long classroom module in regular periods." },
    "public-outreach":   { name: "Public Outreach",      blurb: "Drop-in audience, no prior knowledge assumed." }
};

// ------------------------------------------------------------
// SESSION MODES — how the time is actually spent. `observing` and
// `imaging` are the ones that imply a sky and therefore a `day`.
// ------------------------------------------------------------
window.SESSION_MODES = {
    theory:    { name: "Classroom",       outdoor: false },
    lab:       { name: "Indoor lab",      outdoor: false },
    workshop:  { name: "Hands-on / build", outdoor: false },
    observing: { name: "Observing night", outdoor: true },
    solar:     { name: "Solar session",   outdoor: true },
    imaging:   { name: "Imaging night",   outdoor: true },
    review:    { name: "Review & assess", outdoor: false }
};

// ------------------------------------------------------------
// MOON REQUIREMENTS — the sky constraint that actually drives
// astronomy scheduling.
//
// `windows` are acceptable moon ages in days since new moon, as
// [lo, hi] ranges on the 29.53-day cycle. CourseDB brute-forces a
// start age against every dated session; if no start works, the
// course is unschedulable and that is an error, not a warning.
// ------------------------------------------------------------
window.MOON_SYNODIC = 29.53;

// These windows are the whole model, so they are worth getting right.
// The trap is making them generous: an earlier draft ran `dark` to day 6
// and started `first-quarter` at day 6, which made "Milky Way Friday,
// craters Saturday" come out schedulable. It is not — a 6-day moon is
// neither a dark sky nor a first quarter. Windows that touch will
// cheerfully validate a schedule that fails in the field, so they are
// kept deliberately tight and non-adjacent.
//
// Modelled on the evening sky, which is when sessions run. A young
// crescent sets soon after sunset, so `crescent` nights genuinely do go
// dark later on — that is why `dark` and `crescent` overlap slightly
// around days 2.5–3.5, and the overlap is physical, not sloppiness.
window.MOON_REQS = {
    any:             { name: "Any moon",              windows: [[0, 29.53]] },
    dark:            { name: "Dark sky (no moon)",    windows: [[0, 3.5], [26, 29.53]] },
    crescent:        { name: "Thin crescent",         windows: [[2.5, 6.5]] },
    "first-quarter": { name: "First quarter",         windows: [[6.5, 9.5]] },
    gibbous:         { name: "Gibbous",               windows: [[10, 13]] },
    full:            { name: "Full moon",             windows: [[13.5, 16]] },
    lit:             { name: "Moon up and lit",       windows: [[4, 24]] }
};

// ------------------------------------------------------------
// TARGETS — a controlled vocabulary so typos are caught. This is
// documentation, not an ephemeris: whether Saturn is actually up
// on your dates is a question for a planetarium app, and the
// `sky.html` / `whatsup.html` tools already answer it.
// ------------------------------------------------------------
window.TARGETS = {
    sun: { name: "The Sun" },
    moon: { name: "The Moon" },
    mercury: { name: "Mercury" }, venus: { name: "Venus" }, mars: { name: "Mars" },
    jupiter: { name: "Jupiter" }, saturn: { name: "Saturn" },
    "milky-way": { name: "Milky Way" },
    "bright-stars": { name: "Bright stars" },
    constellations: { name: "Constellations" },
    "double-stars": { name: "Double stars" },
    "open-cluster": { name: "Open clusters" },
    "globular-cluster": { name: "Globular clusters" },
    nebula: { name: "Nebulae" },
    galaxy: { name: "Galaxies" },
    "iss-satellites": { name: "ISS / satellites" },
    meteors: { name: "Meteors" },
    "star-trails": { name: "Star trails" },
    horizon: { name: "Horizon / cardinal points" }
};

// ------------------------------------------------------------
// EQUIPMENT — what has to be in the boot of the car. Validation
// only checks the keys resolve; the useful output is the packing
// list `cli.js course kit` derives per session.
// ------------------------------------------------------------
window.EQUIPMENT = {
    "naked-eye":     { name: "No equipment", consumable: false },
    "red-torch":     { name: "Red torch", consumable: false },
    "star-chart":    { name: "Star chart / planisphere", consumable: false },
    binoculars:      { name: "Binoculars", consumable: false },
    dobsonian:       { name: "Dobsonian reflector", consumable: false },
    refractor:       { name: "Refractor", consumable: false },
    "eq-mount":      { name: "Equatorial mount", consumable: false },
    "star-tracker":  { name: "Star tracker", consumable: false },
    tripod:          { name: "Tripod", consumable: false },
    dslr:            { name: "DSLR / mirrorless", consumable: false },
    phone:           { name: "Smartphone", consumable: false },
    "phone-adapter": { name: "Phone-to-eyepiece adapter", consumable: false },
    "solar-filter":  { name: "Solar filter (front aperture)", consumable: false },
    eyepieces:       { name: "Eyepiece set", consumable: false },
    laptop:          { name: "Laptop", consumable: false },
    projector:       { name: "Projector", consumable: false },
    gnomon:          { name: "Gnomon / shadow stick", consumable: true },
    "measuring-tape":{ name: "Measuring tape", consumable: false },
    stationery:      { name: "Paper, pencils, protractor", consumable: true },
    "power-bank":    { name: "Power bank / batteries", consumable: false }
};

window.COURSE_STATUS = window.CONCEPT_STATUS;

// Every courses/*.js file push()es into this.
window.COURSES = [];
