# Astro Quiz Question Bank — Coverage Analysis & Expansion Plan

**Source:** `astroquiz_question.csv` — 320 rows; rows 1–20 are general-knowledge
demonstration questions and are excluded throughout. The analysed bank is
**300 astronomy questions** (ids 21–320).

**Method:** every question was tagged with (a) a topic, (b) the single best-matching
concept id from the 253-concept astronomy graph in `concepts/data/`, (c) a cognitive
level, and (d) quality flags. Mechanical properties (length, answer balance,
duplicates, option patterns) were computed directly from the CSV. Tag data:
scratchpad `tags-all.json`; scripts `mech.js`, `agg.js`, `pdfalign.js`.

The quiz format this feeds: **20 questions in 180 seconds** — 9 seconds to read a
stem and four options and commit. Every recommendation below respects that budget.

---

## 1. The headline numbers

| Dimension | Value | Reading |
|---|---|---|
| Questions | 300 | |
| Distinct concepts tested | **90 of 253** (36%) | two-thirds of the graph untested |
| Questions on the top 24 concepts | **142 (47%)** | half the bank sits on 10% of what it tests |
| Concepts tested exactly once | 36 | the genuinely diverse tail |
| Questions matching **no** concept | **55 (18%)** | facility names, discovery dates, mission trivia |
| Cognitive level | **289 recall · 11 apply · 0 reason** | the bank tests memory, almost exclusively |
| Study-PDF alignment | 233/300 questions inside PDF territory, but only **~43% of PDF concepts tested** | re-asks the same patch |
| Flagged questions | **~44 of 300** | wrong (4), outdated (7), ambiguous (15), duplicated (13), mangled (6) |

### Similar vs diverse — the direct answer

- **142 questions are "similar coverage"**: they pile onto just 24 concepts.
  The worst: `moons-solar-system` ×13, `comets` ×12, `space-missions-india` ×9,
  `ecliptic-zodiac` ×8, `sun-as-star` ×8, `solar-activity` ×7, `observatory-sites` ×7.
- **36 questions are "diverse"**: sole owner of their concept.
- **55 questions cover nothing on any syllabus**: which month Hale-Bopp was
  spotted, the orbital-debris growth rate, the nearest Wolf-Rayet star's
  constellation, who piloted Apollo 11. A student cannot *prepare* for these;
  they reward having read the same trivia list the author read.
- **13 are duplicates** of each other, including one verbatim repeat
  (`How old is our Sun?` — ids 179 and 301, with the correct answer at
  *different positions*).

### Length — the one dimension already right

Median question is 10 stem words + four ~2-word options ≈ 17 words total; only 4
questions exceed 30. **The 9-second budget is not the problem.** New questions
must simply stay in this envelope: stem ≤ 12 words, options ≤ 4 words.

---

## 2. Coverage against the concept graph, by strand

| Strand | Tested / total | % | Verdict |
|---|---|---|---|
| Stars, Galaxies & Cosmos | 33 / 50 | 66% | strong |
| Solar System | 29 / 45 | 64% | strong |
| Naked-Eye Sky | 10 / 30 | 33% | weak — and this is what students can *verify outdoors* |
| Telescopes & Observing | 9 / 30 | 30% | facility trivia, not optics |
| Light & Optics (Astro) | 3 / 10 | 30% | weak |
| Celestial Sphere & Motion | 3 / 11 | 27% | weak — the quiz's practical round depends on it |
| Time & Calendars | 2 / 11 | 18% | near-absent |
| **Indian Astronomy** | **1 / 21** | **5%** | one question — for the *Aryabhat* Foundation's quiz |
| **Astrophotography** | **0 / 24** | **0%** | absent |
| **Science & Geography Basics** | **0 / 21** | **0%** | absent (defensible — these are prerequisites) |

The bank is a 1990s trivia bank in shape: deep on stars/deep-sky/comets, thin on
the sky itself, and silent on the two strands that define the Foundation's own
programmes (Indian astronomy, astrophotography).

---

## 3. Quality defects to fix regardless of expansion

### Wrong (marked answer is false) — 4

| id | Problem |
|---|---|
| 33 | "Theory postulating distortion of time & space" — marked answer *Singularity*; the theory is general relativity. With "None of these" present, the marked answer is simply wrong. |
| 45 | Zodiac belt width — marked 10°; the standard figure is ~16–18° (8–9° either side). |
| 123 | "How many natural satellites are bigger than Mercury?" — true answer **two** (Ganymede, Titan) is not among the options; "Three" is marked. |
| 312 | Milky Way arm count — marked **Eight**; standard description is 4 major (or 2 major + minor). |

### Outdated — 7

| id | Problem |
|---|---|
| 36 | Farthest known objects are JWST-era high-z galaxies, not quasars. |
| 80/105 | "Only star whose surface has been photographed" (Betelgeuse) — true in 1995; Antares, R Doradus and others have since been resolved. Also a self-duplicate. |
| 169 | "Which **two** planets have rings" — all four giants have rings; the stem's premise is false. |
| 212, 282, 283, 284 | The largest-solar-telescope cluster. Ids 282–284 answer for the McMath era (Arizona, 1.6 m); id 247 answers for the DKIST era (Maui, 4 m). **The bank currently contradicts itself depending on which question a student draws.** |

### Structural tells

- **"None of these" appears 26 times and is never correct.** Any coached student
  eliminates it for free. Either delete the pattern or make it the answer ~25% of
  the time it appears.
- 6 rows have mangled characters (`¯` for `°`, corrupted Greek letters): ids
  45, 107, 121, 198, 206, 207.
- 15 further questions are ambiguous (two defensible answers or unclear stem) —
  full list with reasons in the tag data. Worst offenders: id 21 (12 zodiac signs
  vs 13 ecliptic constellations — *and id 176 in the same bank answers 13*),
  id 174 (magnetic cycle is 22 y; sunspot cycle is 11 y; the stem says magnetic,
  the key says 11), id 118 (40 Eridani B vs Sirius B as first white dwarf).

**Net: retire or repair ~44 questions (~15% of the bank).**

---

## 4. Expansion plan

### Principles

1. **Every new question carries a concept id.** Coverage then stays a query, not
   an audit. The 55 unmappable trivia questions are the cautionary tale.
2. **Testable preparation.** A question should be answerable by a student who
   studied the material — the study PDFs, the concept map — not one who owns a
   1997 almanac. Prefer understanding to anniversaries.
3. **Shift the level mix.** Current: 96% recall. New questions: ~50% recall,
   ~40% apply, ~10% reason. Apply-level fits 9 seconds when the stem is one
   situation: *"Full moon rises at? — Sunset / Midnight / Sunrise / Noon."*
4. **Keep the envelope**: stem ≤ 12 words, options ≤ 4 words, no compound options.
5. **Fix the tells**: no never-correct "None of these"; answer positions balanced
   by pipeline, not by author discipline.

### Where the ~300 new questions go

Doubling the bank to ~600, allocated against the gaps, not the strengths:

| Strand | Now | Add | Rationale |
|---|---|---|---|
| Naked-Eye Sky | 10 concepts hit | **+45** | The quiz's identity — questions checkable by looking up. Phases, motions, seasonal skies, planet-spotting, bright-star geography. |
| **Indian Astronomy** | 1 | **+40** | Aryabhat, Bhaskara, jantar mantars, panchang, nakshatras, yogataras, Indian eclipse records, ISRO *science* (not just launch dates). The Foundation's namesake strand cannot be one question. |
| Celestial Sphere & Motion | 3 | **+30** | Horizon/equatorial coordinates, circumpolarity by latitude, meridian, sidereal vs solar — feeder for the practical round. |
| Time & Calendars | 2 | **+25** | Day/month/year origins, leap rules, time zones vs solar time, ancient timekeeping. |
| Telescopes & Observing | 9 | **+30** | Optics over facilities: aperture vs magnification, focal ratio, mounts, why observatories sit on mountains. |
| Light & Optics | 3 | **+20** | Spectra, redshift, why stars twinkle and planets don't, atmospheric windows. |
| Astrophotography | 0 | **+20** | Exposure, tracking, star trails, phone-at-eyepiece — matches the new track in the graph. |
| Solar System | 29 | **+35** | Deepen with apply-level: seasons on Mars, why Venus is hottest (not nearest), tides, eclipse geometry. |
| Stars & Cosmos | 33 | **+40** | Apply-level: HR-diagram reasoning, lifetime vs mass, why red = cool, scale ladders. |
| Science Basics | 0 | **+15** | Gravity, density, states of matter — the easy floor every paper needs. |

### Difficulty strata for paper assembly

Tag every question 1/2/3. A 20-question paper draws a fixed profile — e.g.
**8 easy recall + 8 apply + 4 hard** — so papers are comparable across rounds and
no student meets a wall of trivia or a wall of reasoning.

### Pipeline: author in the concept-tagged layer, export to CSV

Author new questions in the `concepts/quizzes/` format ([QUIZ-FORMAT.md](../QUIZ-FORMAT.md))
and generate the platform CSV with an exporter, because the layer already provides
what the CSV cannot:

- **Validation** — one correct option, concept must exist, difficulty bounds.
- **Deterministic option shuffling** — authors write correct-first; the pipeline
  balances positions. (The internal bank shipped with 82/82 answers at position
  (a) before this existed. This CSV is better — 69/83/86/62 — but only by hand.)
- **`diagnoses` on distractors** — wrong options drawn from documented
  misconceptions, so even a speed quiz's aggregate results say *what* the cohort
  misunderstands.
- **Coverage as a query** — "which PDF concepts still lack questions" becomes a
  CLI command instead of a spreadsheet afternoon.

The exporter is ~40 lines: emit `id,num,content,option1..4,correct_answer` from
`QuizDB.paper()`, correct_answer being the post-shuffle index. The existing 300
questions can be imported gradually — flagged ones first (they need editing
anyway), the clean majority as a bulk pass with concept tags from `tags-all.json`.

### Sequence

1. **Repair pass** — ✅ DONE (`astroquiz_question_repaired.csv`; changelog in
   [astroquiz-bank-repairs.md](astroquiz-bank-repairs.md)).
2. **Gap wave 1** (+140) — ✅ DONE. Authored concept-tagged in
   [`quizzes/astroquiz-bank.js`](../quizzes/astroquiz-bank.js) (45 sky, 40 indic,
   30 sphere, 25 time; difficulty 67/57/16; 79 questions carry diagnosed
   distractors; 62 concepts, every previously-zero concept in the four strands
   now covered). Exported via
   [`export-astroquiz-csv.js`](../export-astroquiz-csv.js) as platform ids
   321–460: `astroquiz_new_questions.csv` (additions) and
   `astroquiz_question_v2.csv` (full 460-question bank). Post-export bank:
   0 duplicate stems, 0 mangled rows, answers 100/125/117/98 across a–d.
3. **Gap wave 2** (+160) — ✅ DONE. Solar 35 · Stars 40 · Telescopes 30 ·
   Light 20 · Astrophotography 20 · Basics 15; difficulty 67/70/23; 100 with
   diagnosed distractors; 98 concepts, reaching ~65 previously untested ones
   (Kepler, tides, eclipse geometry, exoplanets, distance ladder, telescope
   optics, dark adaptation, the whole astrophotography strand). Four
   cross-strand fact duplicates caught in review and replaced. Exported as
   platform ids 461–620: `astroquiz_new_questions_wave2.csv` and the full
   620-row `astroquiz_question_v3.csv`. Bank now 600 questions; answers
   134/174/155/137 across a–d; 0 duplicate stems.
4. **Legacy import**: bring the old 300 into the quiz layer (concept mappings
   ready in [astroquiz-bank-tags.json](astroquiz-bank-tags.json)); retire the
   CSV as source of truth, keep it as build artifact.

---

*Per-question tags (topic, concept id, level, flags):
[`astroquiz-bank-tags.json`](astroquiz-bank-tags.json) — the seed data for the
import pass. Concept graph: [`concepts/data/`](../data/). Study-PDF coverage:
[`aryabhat-astronomy-quiz.md`](aryabhat-astronomy-quiz.md).*
