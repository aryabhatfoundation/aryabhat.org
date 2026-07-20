# The Aryabhat Quiz Format

**Version 1.0** · normative for everything under `concepts/quizzes/`

This document specifies how questions and quizzes are recorded. It is the
contract between the people who write questions, the tools that render them
(`build-quiz-pdf.js`, `quiz.html`), and the validator that refuses to ship a
broken paper (`quizdb.js`).

---

## 1. Is this a standard format?

**No. It is ours, and it is deliberately not any of the existing ones.**

That is worth being blunt about, because "standard" is a real question with a
real answer. The established interchange formats for assessment are:

| Format | Who uses it | What it is |
|---|---|---|
| **QTI** (IMS Question & Test Interoperability) | Moodle, Canvas, Blackboard, most VLEs | Large XML standard. The genuine lingua franca. |
| **GIFT** | Moodle native | Compact plain-text; quick to author, limited structure. |
| **Aiken** | Moodle import | Trivially simple MCQ text format. |
| **H5P** | Interactive web content | JSON, packaged with a player. |
| **xAPI / Caliper** | Learning analytics | Records *results*, not questions. |
| **Markdown + YAML** | Many small tools | Ad-hoc; no shared semantics. |

We use none of them. Each record here is a plain JavaScript object pushed onto
a global array — the same pattern the concept and course layers already use.

### Why not QTI

QTI is the right answer if the goal is to move a question bank between
learning-management systems. That is not our goal, and QTI actively cannot
express the one thing this bank exists to record.

QTI models a distractor as *a wrong option, optionally with feedback*. It has
no notion of **what a wrong option means about the student**. Our `diagnoses`
field is not feedback text — it is a claim about the learner's mental model,
tied to a specific misconception documented on the concept record. It is the
field the entire layer exists for, and encoding it into QTI would mean
smuggling it through a vendor-extension element that no QTI tool would
understand. At that point the interoperability is nominal.

The other three load-bearing things QTI would not carry:

- **`concept`** — every question names exactly one concept id from the concept
  graph. This is what makes "which concepts does this course teach but never
  test?" a query rather than a meeting.
- **The scope check** — because quizzes attach to courses and courses know
  which session teaches what, the validator can prove an entry quiz is not
  quietly examining the syllabus. This requires the course graph; a portable
  question file has no access to it.
- **No build step** — data files are `window.QUESTIONS.push(...)`. The browser
  loads them with `<script>`; Node loads the *same files* by faking a `window`.
  One copy of the data, no export pipeline, no drift between the printed paper
  and the web page.

### When you would want QTI anyway

If Aryabhat ever needs to hand this bank to a school running Moodle, write an
exporter: `QuizDB → QTI XML`. It is a lossy but straightforward mapping, and
`diagnoses` would degrade into per-option feedback, which is the honest
approximation. **Do not restructure the source format to make that export
easier.** The diagnostic data is the asset; QTI is a delivery detail.

---

## 2. The three layers

```
concepts/data/*.js     what an idea IS          → ConceptDB
concepts/courses/*.js  when it is TAUGHT        → CourseDB
concepts/quizzes/*.js  whether it LANDED        → QuizDB
```

Each layer references the one below by id and never the reverse. A question
points at a concept; a quiz points at a course. Nothing in the concept graph
knows a quiz exists.

---

## 3. File layout and load order

```
concepts/quizzes/
  _schema.js            taxonomy + creates window.QUESTIONS / window.QUIZZES
  entry-practical.js    a bank
  topics-practical-a.js a bank
  topics-practical-b.js a bank
```

**`_schema.js` must load first.** It creates the arrays every other file
pushes into. After it, load order is irrelevant — ids resolve at `build()`
time, so a question may sit in a different file from the quiz that uses it.

Files are loaded by directory scan. **Only data belongs in `quizzes/`.** A
script placed here will be `require()`d and executed by every tool; this has
already broken the CLI once. Tools live in `concepts/`. The loader now refuses
any file starting with `#!` and warns.

---

## 4. The question record

```js
window.QUESTIONS.push({
    id: "q-lunar-phases-01",
    concept: "lunar-phases",
    kind: "mcq",
    difficulty: 2,
    stem: "The Moon is a fat crescent, and it sets a couple of hours after "
        + "the Sun. Where must the Sun be relative to the Moon?",
    options: [
        { text: "Below the western horizon, a little way round from the Moon — "
              + "the lit edge points back at it",
          correct: true },
        { text: "Directly behind the Earth, which is why part of the Moon is dark",
          diagnoses: "Phases as Earth's shadow — that is an eclipse" },
        { text: "Directly behind the Moon, lighting the face we cannot see",
          diagnoses: "New-moon geometry applied to every phase" },
        { text: "It does not matter; the Moon makes its own phases as it spins",
          diagnoses: "Phases attributed to lunar rotation" }
    ],
    explain: "The lit limb always points at the Sun. A crescent setting after "
           + "sunset puts the Sun just below the horizon, near the Moon.",
    sources: ["Study_Material_2.pdf p14"]
});
```

### Required

| Field | Type | Notes |
|---|---|---|
| `id` | string | Stable slug. Convention `q-<concept>-NN`. **Changing it changes the answer letters** — see §6. |
| `concept` | string | Exactly one concept id. Must exist in `ConceptDB`. |
| `kind` | string | `mcq` · `short` · `practical` |
| `stem` | string | The question as asked. |

### Required by kind

| Kind | Also required |
|---|---|
| `mcq` | `options[]`, exactly one with `correct: true` |
| `short` | `answer` — what a correct response must contain |
| `practical` | `answer` — what the assessor watches the student **do** |

### Optional

| Field | Default | Notes |
|---|---|---|
| `explain` | — | Why the answer is right. Printed on the marker's key only. Omitting it raises a warning: the marker has nothing to go on. |
| `difficulty` | `2` | `1` recall · `2` apply · `3` reason |
| `status` | `"published"` | `published` · `review` · `draft` |
| `sources` | `[]` | Provenance, same meaning as the concept layer. |

### The option object

```js
{ text: "...", correct: true }                        // exactly one per question
{ text: "...", diagnoses: "the wrong model it reveals" }
{ text: "..." }                                        // permitted, but see below
```

A `correct: true` option carrying `diagnoses` is an **error**, not a warning.
A right answer cannot reveal a misconception.

---

## 5. `diagnoses` — the reason this format exists

A distractor is not filler to be guessed between. Each one should be a wrong
model somebody actually holds, and `diagnoses` names it.

```js
{ text: "The Earth's shadow falls on the Moon",
  diagnoses: "Phases as Earth's shadow — that is an eclipse" }
```

A marked paper then says *"nine students hold the shadow model of phases"*
rather than *"nine students scored 60%"*. The first tells you what to reteach
on Day 2. The second tells you nothing you can act on.

**Write `diagnoses` as a diagnosis, not as a rebuttal.** It names the state of
the learner's head, not the correction:

- ✅ `"Magnification treated as the figure of merit; aperture ignored"`
- ❌ `"Wrong — aperture is what matters, not magnification"`

Concept records already carry a `misconceptions` array. Draw distractors from
there. `QuizDB.validate()` warns when a question tests a concept that has
documented misconceptions but diagnoses none of them — a missed diagnostic
opportunity, not an error.

---

## 6. Option order is derived, not authored

**Author the correct option first.** It reads better in source and it is the
only convention that survives editing.

The order you write is **not** the order anyone sees. `QuizDB.build()` applies
a permutation derived from the question id (FNV-1a → xorshift32 → Fisher-Yates)
before any consumer sees the options.

This matters, and it was not always true. Every one of the first 82 questions
was authored correct-first and rendered correct-first, which meant answering
(a) to everything scored **100% on every paper**. The permutation now spreads
them 23 / 17 / 19 / 23 across a–d.

The permutation is **deterministic on `id`** and nothing else — no randomness,
no timestamp, no per-render state. This is load-bearing: a key printed today
must letter its options exactly as the paper printed last week, or the marking
is worthless. The web page, the student PDF, the marker's key and the CLI all
derive the same order from the same id.

> **Consequence:** renaming a question id reshuffles its letters. Treat a
> question id as a published permalink. If papers are already in circulation,
> do not rename.

---

## 7. The quiz record

```js
window.QUIZZES.push({
    id: "practical-s6",
    name: "Session 6 — The Moon arrives",
    purpose: "session",
    course: "quiz-practical-intensive",
    session: 6,
    duration: 15,
    blurb: "Terminator over full moon, impacts over volcanoes, 59% over 50%.",
    status: "draft",
    questions: ["q-lunar-observing-01", "q-lunar-geology-01", /* ... */]
});
```

| Field | Required | Notes |
|---|---|---|
| `id`, `name` | yes | |
| `purpose` | yes | `entry` · `session` · `exit` |
| `questions` | yes | Ordered question ids. Duplicates are an error. |
| `course` | strongly advised | Turns on the scope check — the reason to bother. |
| `session` | when `purpose: "session"` | 1-based. Must be within the course's session count. |
| `blurb`, `duration`, `status`, `sources` | no | `duration` in minutes. |

---

## 8. The scope check

Attaching a quiz to a course lets the validator enforce what is easy to get
wrong and impossible to see by eye across ninety questions:

| Purpose | Rule |
|---|---|
| `entry` | Every question tests a concept the course **assumes**, and **none** it teaches. An entry quiz that examines the syllabus is not measuring readiness, it is measuring clairvoyance. |
| `session` | Every question tests a concept taught in **that session or earlier**, or assumed. No asking on Day 1 about Day 3's material. |
| `exit` | Every question tests a concept the course teaches or assumes. |

"Assumes" is **prereq-closed**: assuming X assumes everything beneath X in the
concept graph. This mirrors the course layer and is why the check is worth
running — the transitive set is not something a human tracks.

Violations are **errors**. Without a `course`, the check silently does not run.

---

## 9. What the validator enforces

`node concepts/cli.js quiz-validate`

**Errors** — these block:

- missing or duplicate `id`; no `stem`; unknown `kind`
- `concept` not present in `ConceptDB`
- mcq with no options, no `correct`, or more than one `correct`
- an option with no `text`
- a `correct: true` option carrying `diagnoses`
- `short` / `practical` with no `answer`
- `difficulty` not in 1–3
- quiz with no questions, unknown question id, or a repeated question
- unknown `course`; `session` missing or out of range
- **any scope violation** (§8)

**Warnings** — these are judgement calls:

- fewer than 3 options (guessing gets profitable)
- no `explain`
- concept has documented misconceptions but no distractor diagnoses one
- the same concept tested more than twice in one paper

> One warning is currently deliberate: `practical-s7` tests `solar-observing`
> three times, because it is a safety gate rather than a topic.

---

## 10. Rendering

Everything reads the live `QuizDB`, so a paper can never disagree with what
the validator passed.

```bash
node concepts/build-quiz-pdf.js practical-s6        > paper.html
node concepts/build-quiz-pdf.js practical-s6 --key  > key.html
# then: Chrome --headless --no-pdf-header-footer --print-to-pdf=out.pdf file://...
```

The student paper and the marker's key are **deliberately different
documents**, not one document with a flag:

| | Student paper | Marker's key |
|---|---|---|
| Questions | ✅ | ✅ |
| Name / date fields, answer lines | ✅ | — |
| Correct answer marked | — | ✅ |
| `diagnoses` per distractor | — | ✅ (as **REVEALS**) |
| `explain`, concept / difficulty tags | — | ✅ |
| Assessor script for practicals | — | ✅ |

`concepts/quiz.html` takes the same quizzes in a browser. It marks MCQs,
shows the model answer for short answers and lets the learner mark themselves
(kept in a **separate** tally — self-marking is not the same evidence), and
lists practicals without scoring them. The results page leads with the
diagnosis, not the percentage, and the percentage states exactly what it
covers.

---

## 11. Adding a bank

1. Create `concepts/quizzes/<name>.js`. Data only — no shebang, no top-level
   side effects beyond `push`.
2. `window.QUESTIONS.push(...)` each question; `window.QUIZZES.push(...)` the
   quiz that orders them.
3. Tag every question with **one** `concept` that exists in the graph.
4. Draw distractors from that concept's `misconceptions`, and write
   `diagnoses` for each.
5. Author the correct option **first**.
6. Add `<script src="quizzes/<name>.js"></script>` to `quiz.html`, after
   `quizzes/_schema.js` and before `quizdb.js`.
7. Run `node concepts/cli.js quiz-validate` until it is clean.

New quizzes should land as `status: "draft"` until a human has read the paper.

---

## 12. Versioning this format

This is **v1.0**. Rules for changing it:

- **Adding an optional field** is a minor version. Consumers ignore what they
  do not know.
- **Adding a required field, or changing the meaning of one**, is a major
  version, and needs a migration pass over every existing bank.
- **Changing the option permutation** invalidates every answer key ever
  printed. Do not, without reprinting.
- Question ids are permalinks. Prefer deprecating a question to renaming it.

---

## 13. Current state

| | |
|---|---|
| Questions | 97 — 82 mcq, 4 short, 11 practical |
| Quizzes | 10 — 1 entry, 9 session |
| Validator | 0 errors, 1 deliberate warning |
| Status | all `draft`, pending human review |

*Related: [README.md](README.md) for the concept and course layers · [quiz.html](quiz.html) to take a paper.*
