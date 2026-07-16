# The Concept Database

A DAG of school science & maths concepts. Every node is one idea, kept as small as
it can usefully be; every edge means *you cannot understand this without that first*.

The graph is the interesting part. Any textbook can give you a list of topics — what
this gives you is the **order**, and the **gaps**: take a chapter and you can see not
just what it covers, but what it quietly assumes you already know.

- **Explore it:** [index.html](index.html) — flat table by default, DAG on a toggle
- **Query it:** `node concepts/cli.js help`
- **Extend it:** that's what this document is for

511 concepts across 7 subjects, 769 prerequisite edges.

---

## Files

Everything lives under `concepts/` and depends on nothing outside it.

```
concepts/
  index.html      the explorer page
  README.md       this file — schema + authoring contract
  db.js           ConceptDB: normalize, filter, validate, traverse
  coursedb.js     CourseDB: coverage + moon feasibility        ← the course layer
  cli.js          Node CLI over both
  data/
    _schema.js    taxonomy tables + window.CONCEPTS = []   ← loads FIRST
    astronomy.js  253 concepts   (the original corpus, plus the quiz mapping)
    maths.js       84
    physics.js     94
    chemistry.js   41   seed
    biology.js     42   seed
    earth.js       32   seed
    skills.js      16   seed
  courses/
    _schema.js    course taxonomy + window.COURSES = []   ← loads FIRST
    *.js          one file per course
  coverage/
    *.md          which concepts a source document covers
```

There is **no build step**. Subject files are plain `window.CONCEPTS.push(...)` calls;
the page loads them with `<script>` tags and the CLI fakes a `window` and `require`s
the identical files. One copy of the data, no generated artefact to drift.

`_schema.js` must load first — it creates the array everything else pushes into.
The subject files' order among themselves does not matter: prereqs resolve after all
files have loaded, so a physics concept may depend on a maths concept declared later.

---

## The record

Only six fields are required. `ConceptDB` fills a sane default for every other one,
so a minimal record is legal and a rich one is better.

```js
{
    // ---- required ----
    id: "moon-phases",          // stable slug — NEVER change once published
    name: "Phases of the Moon",
    domain: "sky",              // a key of CONCEPT_DOMAINS; implies the subject
    level: 2,                   // 1..5 — pedagogical depth (NOT age)
    desc: "The Moon is always half-lit by the Sun; the phase is how much of that " +
          "lit half faces us, cycling in about 29.5 days.",
    prereqs: ["moon-observation", "day-night"],

    // ---- curriculum ----
    grades: [5, 6, 8],                    // NCERT/CBSE classes where actually taught
    syllabusRefs: ["ncert:8:sci:13"],     // board:grade:subject:chapter

    // ---- graph ----
    related: ["lunar-months"],            // linked by meaning, NOT a prerequisite

    // ---- naming ----
    aliases: ["lunar phases", "phases of the moon", "chandra kala"],
    keywords: ["crescent", "gibbous", "waxing", "waning", "synodic month", "29.5 days"],

    // ---- teaching ----
    misconceptions: ["Thinking phases are caused by Earth's shadow on the Moon"],
    tracks: ["school-primary", "club", "indic"],
    tools: [{ k: "activity", label: "Lamp + ball around your head: all phases in one minute" }],

    // ---- provenance ----
    status: "published",                  // published | review | draft
    sources: ["ncert-class8-science.pdf#ch13"]
}
```

### `id` — the one irreversible decision

An id is a permalink (`concepts/#c=moon-phases`) and the target of every edge pointing
at it. Renaming one silently breaks bookmarks and any external tool that stored it.
Choose carefully, then treat it as immutable. If a name turns out wrong, change `name`
and leave `id` alone — they are allowed to disagree.

### `level` vs `grades` — orthogonal, both needed

This trips people up. They measure different things:

| | means | example |
|---|---|---|
| `level` | how deep the treatment goes | `gravity-basics` L1 · `gravitation` L4 |
| `grades` | when the syllabus introduces it | `[9, 11]` |

A **Spark**-level concept can show up in class 3 or class 9. Filtering a curriculum
by grade and filtering by depth are different questions, so both axes exist.

- **L1 Spark** — first wonder, noticing, no machinery
- **L2 Explorer** — patterns and simple models
- **L3 Observer** — working knowledge; the standard school treatment
- **L4 Practitioner** — quantitative models and real instruments
- **L5 Specialist** — advanced technique, frontier ideas

Omit `grades` and `ConceptDB` derives them from any `school-*` track. An empty
`grades` is the **correct** answer for off-syllabus material (most astrophotography,
most of `indic`) — don't invent a grade to fill the field.

### `prereqs` vs `related`

> **prereq**: a genuine "cannot understand X without Y".
> **related**: adjacent, useful, but not blocking.

The commonest authoring error is putting topical neighbours in `prereqs`. It inflates
the graph, wrecks teaching order, and makes every curriculum export drag in half the
database. When unsure, ask: *could a bright student meet X first and still follow it?*
If yes → `related`.

Keep prereq lists **tight** — 1–3 is typical. No prereqs at all is a fine answer; the
graph needs roots.

`related` is made **symmetric** automatically: declare it on one side only.

The graph must stay **acyclic**. `validate` reports any cycle with its full path.

### `aliases` / `keywords`

**aliases** are alternative *names* for this exact concept — what a textbook, exam
paper or manual would actually call it. 2–5 each. They do real work:

- **page search** matches them, so a teacher typing `surya grahan` finds `solar-eclipse`
  even though that phrase is nowhere in its name or description;
- **they are how you avoid duplicates** when mapping a new document — searching aliases
  is how you discover that the "thing" you were about to add already exists under
  another name.

Include the Indian phrasings — `surya grahan`, `chandra grahan`, `nakshatra`,
`panchanga`/`panchang`, `rashi`, `ayanamsa` — plus romanisation variants. Search is
accent- and punctuation-insensitive, so `pañcāṅga` and `panchanga` both normalize to
the same thing, but list the spellings a real document would use.

**keywords** are the sub-terms, jargon, proper nouns, numbers and units that
characterise the concept. 3–10 each. Concrete tokens are the useful ones:
`"29.5 days"`, `"f/10"`, `"Chandrasekhar"`, `"yogatara"`. They document the concept's
scope as much as anything else.

Two concepts should not answer to the same name or alias — that is the signature of an
accidental duplicate, and `validate` flags it as *possible duplicate*. Prefer specific
multi-word phrasings; `"gravity"` alone belongs to neither `gravity-basics` nor
`gravitation`. An honest `aliases: []` beats padding.

### `syllabusRefs`

Format: `board:grade:subject:chapter` → `"ncert:8:sci:13"`.

Boards live in `SYLLABUS_BOARDS` (`ncert`, `icse`, `ib`, `state`) — adding one is the
whole cost of supporting it. Subject segment uses the board's own short codes
(`sci`, `math`, `phy`, `chem`, `bio`, `geo`).

**Only cite a chapter you are confident of. Omit the field otherwise — never guess.**
NCERT renumbered heavily in the 2023 rationalisation and again in the 2024–25
*Curiosity* / *Ganita Prakash* books; a wrong citation is worse than none. `grades`
without a `syllabusRef` is a perfectly good record.

### `status` — the review pipeline

| | |
|---|---|
| `published` | reviewed, live (the default) |
| `review` | drafted, awaiting a human pass |
| `draft` | mapped from a source, not yet checked |

**Anything added by mapping a document lands as `draft` or `review`.** A human promotes
it. The page and the CLI both filter on this, so drafts are visible but never
masquerade as vetted content.

### `tools`

`{ k: <TOOL_KINDS key>, label: "...", url: "..." }`. `url` is optional and overrides
the kind's default. **Never invent a URL** — omit it. `k: "activity"` with a concrete,
cheap-materials label is the default and the most valuable kind.

---

## Mapping a source document onto the database

The workflow this schema exists to serve: hand over a set of PDFs, get back the
concepts they cover, plus new records for the ones that are missing.

**This is a reading job, not a string-matching one, and it is done by a person or an
LLM — not by code here.** There is deliberately no `match` command. An n-gram scorer
cannot tell the Summer *Triangle* from the geometry concept, or stellar *magnitude*
from a vector's magnitude; it produces confident nonsense that then has to be
un-picked. Reading the document is both more accurate and less work.

### 1. Load the current database

```bash
node concepts/cli.js export --out /tmp/concepts.json   # everything, defaults filled
node concepts/cli.js ls --subject physics              # or browse a slice
node concepts/cli.js stats
```

### 2. Read the document and list its actual concepts

Work through the source and write down the ideas it teaches, at the granularity this
database uses: **one small idea per node**, not one per chapter heading.

### 3. For each, decide: exists, or new?

Search before adding. Duplicates are the main failure mode of expansion, and the
database already contains near-neighbours that are easy to miss:

```bash
node concepts/cli.js ls --search "refraction"
node concepts/cli.js get reflection-refraction
```

Boundaries that are deliberate, not accidents — bridge them with `related`, don't merge:

- School optics lives in **physics** (`p-light`: `law-of-reflection`, `lens-formula`,
  `curved-mirrors`). Astronomy's `light` domain is only the astro-specific remainder
  (magnitude, spectra, filters).
- **Mechanical** properties of matter (density, pressure, buoyancy) are physics
  `p-matter`. **Compositional** ones (states, particle model, mixtures, separation) are
  chemistry `c-matter`.
- Radioactivity and fission/fusion are physics `p-modern`; bonding and the periodic
  table are chemistry.
- The **living** side of ecology is biology `b-eco`; the **physical** environment
  (weather, water cycle, pollution) is `earth`.
- Astronomy's `found` domain already holds proto-physics/maths (`speed-distance-time`,
  `gravity-basics`, `angles-protractor`, `big-numbers`). Use them as prereqs.

### 4. Add the new ones

Append to the right subject file, following the record shape above:

```js
{
    id: "combustion-conditions", name: "Conditions for Combustion", domain: "c-reaction", level: 2,
    desc: "...",
    grades: [8],
    syllabusRefs: ["ncert:8:sci:6"],
    tracks: ["school-middle"],
    prereqs: ["oxidation-reduction"],
    aliases: ["conditions necessary for burning", "fire triangle", "ignition temperature"],
    keywords: ["inflammable", "kindling", "oxygen supply", "combustible"],
    misconceptions: ["Thinking a substance burns because it is hot, not because it reached ignition temperature"],
    status: "draft",
    sources: ["ncert-class8-science.pdf#ch6"]
}
```

Always set `status: "draft"` and record `sources`. Provenance is what lets the next
person check your work — and what makes it possible to re-map a document later.

Wiring the new concept into the graph is the part that carries the value. A node with
no edges is a flashcard; a node with honest prereqs is a curriculum.

### 5. Validate — non-negotiable

```bash
node concepts/cli.js validate
```

Exits non-zero on any error, so it drops straight into CI or a pre-commit hook.

**Errors** (data is broken): dangling prereq/related ids, duplicate ids, prereq cycles,
unknown domain/track/status/tool-kind, level outside 1–5, grade outside 1–12,
malformed `syllabusRef`.

**Warnings** (worth a look): no aliases/keywords, no grades, a prereq at a *higher*
level than its dependent, a name/alias claimed by two concepts (**possible duplicate**
— read these).

```bash
node concepts/cli.js validate --quiet   # errors only
node concepts/cli.js stats              # did the counts move as expected?
```

### 6. Check it landed

```bash
node concepts/cli.js get combustion-conditions
```

Prints the record with its full prerequisite chain in teaching order — the fastest way
to see whether your edges actually make sense.

---

## Using ConceptDB from your own tool

Browser: load `data/_schema.js`, the subject files, then `db.js`.
Node: copy the `global.window = global` shim from `cli.js`.
Or skip both — `node concepts/cli.js export --out concepts.json` gives you plain JSON
with every default already filled in.

```js
ConceptDB.filter({subjects, domains, levels, maxLevel, grades, bands, tracks, status, search, ids})
ConceptDB.teachingSort(ids)       // prereqs always before dependents, stable
ConceptDB.ancestorsOf(id)         // {id: true} — the full transitive prereq set
ConceptDB.descendantsOf(id)       // everything this unlocks
ConceptDB.prereqsOf(id)           // direct only
ConceptDB.dependentsOf(id)        // direct only
ConceptDB.validate()              // {errors, warnings, ok}
ConceptDB.stats()
ConceptDB.byId(id)                // normalized record
ConceptDB.toJSON()                // taxonomy + all concepts
ConceptDB.build()                 // re-index after mutating window.CONCEPTS
```

Normalization guarantees every optional field is present (arrays never undefined,
`status` always set, `grades` derived from tracks, `subject` resolved from `domain`,
`related` made symmetric, `depth` and `bands` computed), so consumers never need
`c.aliases || []`.

---

## The course layer

A concept answers *"what is this idea, and what must you know first?"* — a fact about
knowledge, true whoever is in the room. A course answers *"who, in what order, on which
night, with what equipment?"* — a fact about delivery. They are separate files for a
reason: the same concept takes a teacher ten minutes and a beginner forty-five, so
**duration, equipment and session grouping live on the session, never on the concept.**
Concepts stay reusable; courses stay free to disagree about pacing.

A course is an ordered list of sessions, each teaching some concept ids:

```js
{
  id: "astrophoto-beginner", kind: "workshop", audience: "photo",
  assumes: ["lenses-mirrors", "pole-star"],          // closed under prereqs
  sessions: [
    { title: "Day 1 — The camera, before dark", mode: "theory", day: 1, duration: 150,
      concepts: ["exposure-triangle", "raw-format", "histogram-reading"],
      equipment: ["dslr", "tripod"] },
    { title: "Day 1 — First night", mode: "imaging", day: 1, duration: 180,
      concepts: ["nightscapes", "star-trail-imaging"],
      sky: { moon: "dark", targets: ["milky-way"] } }
  ]
}
```

```
node concepts/cli.js courses                          list, with moon feasibility
node concepts/cli.js course <id>                      full running order
node concepts/cli.js course-validate                  exits 1 on error
node concepts/cli.js course-gaps <id>                 what it stands on but never teaches
node concepts/cli.js course-misconceptions <id>       the handout, generated
node concepts/cli.js course-kit <id>                  the packing list
```

### The two checks that justify the layer

**Prereq coverage.** Every concept in session *N* must have its prereqs taught in session
≤ *N*, or declared in `assumes`. Anything else is a hole the trainer falls into live.
This is not theoretical: the three courses in `courses/` were written by hand, with care,
by someone who had just spent a day in this database — and the first `course-validate`
found **29 real gaps** in them, including a workshop that taught `histogram-reading`
before `exposure-triangle`.

`assumes` is closed under prereqs — assuming `moon-phases` assumes everything beneath it.
Without that you would have to list the whole ancestor chain by hand, which nobody does
correctly. Use `course-gaps` to see everything a course leans on; if the `IMPLICIT` list
is long, the course is lying about its prerequisites.

**Moon feasibility.** `sky: { moon: ... }` on a dated session declares what the night
needs. `MOON_REQS` maps each requirement to acceptable moon ages, and CourseDB
brute-forces every start age in the 29.53-day cycle looking for one that satisfies every
dated session at once. If none exists the course is unschedulable — an error, not a
warning — and it names the offending pair of nights.

This catches what no eye catches. "Milky Way on Friday, craters on Saturday" is
impossible, and does not look impossible: those two need moon ages about seven days
apart. It also caught the reverse mistake in the student camp — the moon *waxes*, so a
camp that opens on a crescent and wants a dark sky on night three has the direction
backwards. Fixing it improved the teaching order too: start at new moon, deep sky on the
dark nights, and the crescent arrives on cue for the lunar session.

The windows are the whole model, so keep them **tight and non-adjacent**. An early draft
ran `dark` to day 6 and started `first-quarter` at day 6; because they touched, the
impossible schedule above validated clean. A 6-day moon is neither.

The solver is honest about its limits: it models the moon, which is the constraint that
actually drives astronomy scheduling. Whether Saturn is up on your dates is a question
for `sky.html` / `whatsup.html`, and `sky.targets` is documentation checked only for
typos.

### Authoring a course

1. Copy the shape above into `courses/<name>.js`, opening with `window.COURSES.push(`.
2. Pick the `audience` track first — validation warns when a session teaches a concept
   not tagged for it, which is how you catch a beginner workshop drifting into L5 theory.
3. Write sessions in delivery order. Concepts within a session can be in any order;
   `CourseDB.syllabus()` teaching-sorts them for you.
4. `node concepts/cli.js course-validate`, then fix what it finds.
   **Fix the course, not the graph.** When the validator said the beginner
   astrophotography workshop needed `telescope-designs` and `equatorial-coords`, the
   honest answer was to cut the star-tracker night, not to weaken the prereqs. The graph
   was right: you cannot teach polar alignment to someone who has never met a mount.
5. `status: "draft"` until a human has read it end to end.

---

## Adding a subject

1. Add it to `CONCEPT_SUBJECTS` in `data/_schema.js` with a **distinct** colour — the
   graph tints nodes by subject whenever more than one is on screen.
2. Add its domains to `CONCEPT_DOMAINS`, each with `subject:` pointing back. Prefix the
   keys (`m-`, `p-`, `c-`, `b-`, `e-`, `s-`) so namespaces stay clean. Astronomy's bare
   keys are historic and stay as they are.
3. Create `data/<subject>.js` opening with `window.CONCEPTS.push(`.
4. Add a `<script>` tag to `index.html`, after `_schema.js`.
5. `node concepts/cli.js validate`.

Everything else — filters, colours, the flat view, the graph, export — picks it up with
no further code.
