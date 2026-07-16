// ============================================================
// Aryabhat Concept Graph — schema & taxonomy.
//
// LOAD ORDER MATTERS. This file must be the first of the
// data/*.js scripts: it declares the taxonomy tables and
// creates window.CONCEPTS, which every subject file push()es into.
//
// ------------------------------------------------------------
// CONCEPT RECORD
// ------------------------------------------------------------
// Required:
//   id       : stable slug — NEVER change once published; it is a
//              permalink (#c=<id>) and the target of prereq edges.
//   name     : short display name
//   desc     : 1–2 sentence teaching-oriented explanation
//   domain   : a key of CONCEPT_DOMAINS (implies the subject)
//   level    : 1..5 — pedagogical depth, see CONCEPT_LEVELS
//   prereqs  : ids of concepts to understand first (DAG edges)
//
// Optional (ConceptDB fills sane defaults for all of these):
//   grades       : [6,7,8]  — NCERT/CBSE classes where it is taught.
//                  Omit and ConceptDB derives it from `tracks`.
//   syllabusRefs : ["ncert:8:sci:13"] — board:grade:subject:chapter
//   related      : ids linked by meaning but NOT prerequisites
//   aliases      : other names a text might use for this same concept
//   keywords     : extra matching terms (symbols, sub-topics, jargon)
//   misconceptions : common wrong ideas, phrased as the wrong idea
//   tracks       : audience subsets (CONCEPT_TRACKS keys)
//   tools        : suggested tools/activities; k = TOOL_KINDS key
//   status       : "published" | "review" | "draft"  (default published)
//   sources      : provenance — where this concept was mapped from,
//                  e.g. "ncert-class8-science.pdf#ch13"
//
// `level` and `grades` are ORTHOGONAL and both matter:
//   level  = how deep the treatment is (Spark → Specialist)
//   grades = when the curriculum actually introduces it
// A Spark-level concept can appear in class 3 or class 9.
//
// See README.md for the full authoring contract.
// ============================================================

// ------------------------------------------------------------
// SUBJECTS — the top-level grouping of the flat view.
// Colours must stay maximally distinct: the graph tints nodes by
// subject whenever more than one subject is on screen.
// ------------------------------------------------------------
window.CONCEPT_SUBJECTS = {
    astronomy: { name: "Astronomy",           color: "#ffcc33", blurb: "The sky, and everything we can work out by watching it." },
    maths:     { name: "Mathematics",         color: "#60a5fa", blurb: "Number, shape, pattern and change." },
    physics:   { name: "Physics",             color: "#2dd4bf", blurb: "Matter, motion, energy and the rules they follow." },
    chemistry: { name: "Chemistry",           color: "#f472b6", blurb: "What things are made of and how they rearrange." },
    biology:   { name: "Biology",             color: "#4ade80", blurb: "Life — its parts, processes and diversity." },
    earth:     { name: "Earth & Environment", color: "#fb923c", blurb: "The planet as a physical and living system." },
    skills:    { name: "Science & Maths Skills", color: "#c084fc", blurb: "How science is actually done, across every subject." }
};

// ------------------------------------------------------------
// DOMAINS (strands) — the second level of grouping.
// Key prefixes keep namespaces clean:
//   astronomy = bare keys (historic — these ids are published)
//   maths m-  · physics p-  · chemistry c-
//   biology b- · earth e-   · skills s-
// Colours are shades within the parent subject's hue, used when a
// single subject is selected.
// ------------------------------------------------------------
window.CONCEPT_DOMAINS = {

    // ---------------- ASTRONOMY (existing keys — do not rename) ----------------
    found:  { subject: "astronomy", name: "Science & Geography Basics", color: "#d4a373" },
    sky:    { subject: "astronomy", name: "Naked-Eye Sky",              color: "#ffcc33" },
    sphere: { subject: "astronomy", name: "Celestial Sphere & Motion",  color: "#38bdf8" },
    time:   { subject: "astronomy", name: "Time & Calendars",           color: "#a78bfa" },
    solar:  { subject: "astronomy", name: "Solar System",               color: "#f87171" },
    light:  { subject: "astronomy", name: "Light & Optics (Astro)",     color: "#34d399" },
    scope:  { subject: "astronomy", name: "Telescopes & Observing",     color: "#f472b6" },
    stars:  { subject: "astronomy", name: "Stars, Galaxies & Cosmos",   color: "#818cf8" },
    astro:  { subject: "astronomy", name: "Astrophotography",           color: "#cbd5e1" },
    indic:  { subject: "astronomy", name: "Indian Astronomy",           color: "#ff9933" },

    // ---------------- MATHEMATICS ----------------
    "m-number":     { subject: "maths", name: "Number & Arithmetic",            color: "#60a5fa" },
    "m-algebra":    { subject: "maths", name: "Algebra & Patterns",             color: "#3b82f6" },
    "m-geometry":   { subject: "maths", name: "Geometry & Shape",               color: "#818cf8" },
    "m-mensuration":{ subject: "maths", name: "Measurement & Mensuration",      color: "#93c5fd" },
    "m-data":       { subject: "maths", name: "Data, Statistics & Probability", color: "#2563eb" },
    "m-trig":       { subject: "maths", name: "Trigonometry",                   color: "#6366f1" },
    "m-calculus":   { subject: "maths", name: "Calculus & Change",              color: "#a5b4fc" },
    "m-reason":     { subject: "maths", name: "Reasoning & Proof",              color: "#1d4ed8" },

    // ---------------- PHYSICS ----------------
    "p-measure": { subject: "physics", name: "Measurement & Units",         color: "#5eead4" },
    "p-motion":  { subject: "physics", name: "Motion & Force",              color: "#2dd4bf" },
    "p-energy":  { subject: "physics", name: "Work, Energy & Power",        color: "#14b8a6" },
    "p-matter":  { subject: "physics", name: "Matter & Fluids",             color: "#22d3ee" },
    "p-heat":    { subject: "physics", name: "Heat & Thermodynamics",       color: "#06b6d4" },
    "p-wave":    { subject: "physics", name: "Waves & Sound",               color: "#67e8f9" },
    "p-light":   { subject: "physics", name: "Light & Optics",              color: "#0ea5e9" },
    "p-em":      { subject: "physics", name: "Electricity & Magnetism",     color: "#0891b2" },
    "p-modern":  { subject: "physics", name: "Atoms, Nuclei & Relativity",  color: "#7dd3fc" },

    // ---------------- CHEMISTRY ----------------
    "c-matter":   { subject: "chemistry", name: "Matter & Its States",        color: "#f472b6" },
    "c-atomic":   { subject: "chemistry", name: "Atoms & Molecules",          color: "#ec4899" },
    "c-periodic": { subject: "chemistry", name: "Periodic Table & Bonding",   color: "#d946ef" },
    "c-reaction": { subject: "chemistry", name: "Chemical Reactions",         color: "#fb7185" },
    "c-acid":     { subject: "chemistry", name: "Acids, Bases & Salts",       color: "#f9a8d4" },
    "c-metal":    { subject: "chemistry", name: "Metals & Non-metals",        color: "#e879f9" },
    "c-organic":  { subject: "chemistry", name: "Carbon & Organic Chemistry", color: "#fda4af" },

    // ---------------- BIOLOGY ----------------
    "b-cell":     { subject: "biology", name: "Cells & Life Processes",    color: "#4ade80" },
    "b-plant":    { subject: "biology", name: "Plants & Photosynthesis",   color: "#22c55e" },
    "b-body":     { subject: "biology", name: "Human Body & Health",       color: "#86efac" },
    "b-genetics": { subject: "biology", name: "Genetics & Evolution",      color: "#16a34a" },
    "b-eco":      { subject: "biology", name: "Ecology & Ecosystems",      color: "#a3e635" },
    "b-classify": { subject: "biology", name: "Diversity & Classification",color: "#65a30d" },

    // ---------------- EARTH & ENVIRONMENT ----------------
    "e-geo":   { subject: "earth", name: "Earth Structure & Geology", color: "#fb923c" },
    "e-atmo":  { subject: "earth", name: "Atmosphere & Weather",      color: "#fdba74" },
    "e-water": { subject: "earth", name: "Water & Oceans",            color: "#f97316" },
    "e-env":   { subject: "earth", name: "Environment & Resources",   color: "#ea580c" },

    // ---------------- SKILLS ----------------
    "s-inquiry": { subject: "skills", name: "Scientific Method & Inquiry", color: "#c084fc" },
    "s-model":   { subject: "skills", name: "Models, Scale & Estimation",  color: "#d8b4fe" }
};

// ------------------------------------------------------------
// LEVELS — pedagogical depth, NOT age. Deliberately subject-neutral
// so a maths concept and an astronomy concept at L3 feel comparable.
// ------------------------------------------------------------
window.CONCEPT_LEVELS = {
    1: { name: "Spark",        hint: "First wonder — noticing, no machinery required" },
    2: { name: "Explorer",     hint: "Patterns and simple models" },
    3: { name: "Observer",     hint: "Working knowledge — the standard school treatment" },
    4: { name: "Practitioner", hint: "Quantitative models and real instruments" },
    5: { name: "Specialist",   hint: "Advanced technique and frontier ideas" }
};

// ------------------------------------------------------------
// GRADE BANDS — a readable roll-up of the `grades` array.
// NCERT/CBSE class numbering.
// ------------------------------------------------------------
window.CONCEPT_GRADE_BANDS = {
    foundation: { name: "Foundation (1–2)",  grades: [1, 2] },
    primary:    { name: "Primary (3–5)",     grades: [3, 4, 5] },
    middle:     { name: "Middle (6–8)",      grades: [6, 7, 8] },
    secondary:  { name: "Secondary (9–10)",  grades: [9, 10] },
    senior:     { name: "Senior (11–12)",    grades: [11, 12] }
};

// ------------------------------------------------------------
// TRACKS — audience subsets. Orthogonal to `grades`: these carry the
// non-school audiences that a class number cannot express.
// ConceptDB derives `grades` from the school-* tracks when a concept
// declares none, so legacy records keep working.
// ------------------------------------------------------------
window.CONCEPT_TRACKS = {
    "school-foundation": { name: "School: Foundation (1–2)", grades: [1, 2] },
    "school-primary":    { name: "School: Primary (3–5)",    grades: [3, 4, 5] },
    "school-middle":     { name: "School: Middle (6–8)",     grades: [6, 7, 8] },
    "school-high":       { name: "School: High (9–12)",      grades: [9, 10, 11, 12] },
    "club":              { name: "Amateur Astronomy Club" },
    "photo":             { name: "Astrophotography Group" },
    "indic":             { name: "Indian Traditional Astronomy" },
    "olympiad":          { name: "Olympiad / Enrichment" }
};

// ------------------------------------------------------------
// SYLLABUS BOARDS — the `board` segment of a syllabusRef.
// Format: "board:grade:subject:chapter"  e.g. "ncert:8:sci:13"
// Subject segment uses the board's own short codes (sci, math, phy,
// chem, bio). Adding a board here is the whole cost of supporting it.
// ------------------------------------------------------------
window.SYLLABUS_BOARDS = {
    ncert: { name: "NCERT / CBSE" },
    icse:  { name: "ICSE / CISCE" },
    ib:    { name: "IB MYP / DP" },
    state: { name: "State Board" }
};

// ------------------------------------------------------------
// STATUS — the review pipeline for machine-assisted expansion.
// Concepts mapped out of a PDF land as "draft" and are promoted by a
// human. The flat view can filter on this.
// ------------------------------------------------------------
window.CONCEPT_STATUS = {
    published: { name: "Published", hint: "Reviewed and live" },
    review:    { name: "In review", hint: "Drafted and awaiting a human pass" },
    draft:     { name: "Draft",     hint: "Auto-mapped or stubbed — not yet checked" }
};

// ------------------------------------------------------------
// TOOL KINDS. A tool entry may carry its own `url`, overriding the
// kind-level url. This page links out with absolute URLs.
// ------------------------------------------------------------
window.TOOL_KINDS = {
    gol:      { name: "Gol (Astro Lab)",          url: "https://gol.kaalshodh.com" },
    sky:      { name: "Sky Map",                  url: "https://aryabhat.org/sky.html" },
    whatsup:  { name: "What's Up",                url: "https://aryabhat.org/whatsup.html" },
    kaal:     { name: "Web tool · kaalshodh.com", url: "https://kaalshodh.com/app.html" },
    web:      { name: "Web tool · alokm.com",     url: null },
    android:  { name: "Android app",              url: null },
    activity: { name: "Hands-on activity",        url: null },
    app:      { name: "App / software",           url: null }
};

// Every data/<subject>.js file appends to this.
window.CONCEPTS = [];
