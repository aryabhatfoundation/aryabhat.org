# Astro Quiz Bank — Repair Pass Changelog

Applied to `astroquiz_question.csv` -> **`astroquiz_question_repaired.csv`** (the
original is untouched). 300 questions in, 300 out: defective questions were fixed
in place; duplicates and unsalvageable items were **replaced** with new questions
aimed at the empty strands identified in
[astroquiz-bank-analysis.md](astroquiz-bank-analysis.md).

| # | Action | Reason |
|---|--------|--------|
| 33 | edited | wrong: 'Singularity' is not the theory of spacetime distortion; it is general relativity |
| 45 | edited | wrong+encoding: zodiac belt is ~18 deg wide, not 10; degree signs mangled |
| 123 | edited | wrong: exactly TWO moons (Ganymede, Titan) exceed Mercury; 'Two' was not even offered |
| 312 | edited | wrong: Milky Way is described with 4 major arms, not 8 |
| 36 | edited | outdated: farthest known objects are JWST-era high-redshift galaxies, not quasars |
| 169 | edited | outdated premise: all four giant planets have rings; reframed to the observable fact |
| 282 | edited | outdated: largest solar telescope is the Inouye (DKIST), not McMath |
| 284 | edited | outdated: largest solar telescope aperture is DKIST's 4 m, not McMath's 1.6 m |
| 21 | edited | ambiguous: 13 IAU constellations cross the ecliptic (id 176 answers that); signs are 12 |
| 74 | edited | ambiguous: 333 ly sits inside Polaris's real measurement dispute (323-445 ly); trap removed |
| 87 | edited | sloppy: brown dwarfs DO shine (infrared); they fail to sustain fusion |
| 161 | edited | ambiguous: Venus (3 deg effective tilt) is also season-less; swapped for a seasonal planet |
| 174 | edited | ambiguous: the MAGNETIC (Hale) cycle is 22 y; 11 y is the sunspot cycle the key wants |
| 215 | edited | wrong pick between near-synonyms: solar tower telescopes standardly use a coelostat |
| 251 | edited | subjective 'most popular' -> the objective fact intended |
| 261 | edited | ambiguous: fruit flies preceded dogs in space; Laika's record is ORBIT |
| 266 | edited | ambiguous: Slipher saw redshifts first; Hubble's actual credit is the distance relation |
| 281 | edited | sloppy: Hubble still operates; JWST is its successor, not replacement |
| 121 | edited | encoding: ¯ mangled where ° intended |
| 198 | edited | encoding: ¯ mangled where ° intended |
| 206 | edited | encoding: ¯ mangled where ° intended |
| 207 | edited | encoding: ¯ mangled where ° intended |
| 107 | edited | encoding: Greek letters corrupted to ‡ · Î; replaced with clean designations |
| 60 | **replaced** -> `aryabhata-work` | dup of 59 (both: Andromeda is the naked-eye galaxy) |
| 81 | **replaced** -> `equinoxes-solstices` | dup of 68 (both: Taurus is the bull) |
| 105 | **replaced** -> `sidereal-day` | dup of 80 + outdated ('only star photographed' false since ~2017) |
| 118 | **replaced** -> `pole-star-latitude` | contested credit (40 Eridani B vs Sirius B) not settleable in one line |
| 135 | **replaced** -> `lunar-phases` | unclear stem resting on an obscure maria-distribution subtlety |
| 144 | **replaced** -> `space-missions-india` | dup of 141 (both: Jupiter is biggest/heaviest) |
| 148 | **replaced** -> `jantar-mantar` | not astronomy + ambiguous (element vs compound) |
| 212 | **replaced** -> `aperture` | outdated AND would duplicate 247 once corrected |
| 250 | **replaced** -> `star-trails` | ambiguous ('most common rocket fuel' has no single answer) |
| 283 | **replaced** -> `magnification` | outdated AND would duplicate 247 once corrected |
| 298 | **replaced** -> `panchang` | dup of 265 (both: Newton and the mirror telescope) |
| 301 | **replaced** -> `synodic-month` | exact duplicate of 179 (verbatim stem, answer at a different position) |
| 134 | kept as-is | Saturn-floats factoid kept: physically loose but the classic density teaching point, and the intended answer is unambiguous |

## Verification of the repaired file

- 300 questions, ids 21-320 intact, header clean
- exact-duplicate stems: **0** (was 1)
- mangled characters: **0** (was 6 rows)
- answer positions 67/84/87/62 — balance preserved
- length envelope unchanged (median 17 words, max 33)

## Deliberately NOT fixed in this pass

- **The never-correct "None of these" pattern** (25 remaining instances). Fixing it
  properly means rewriting options or making it the answer sometimes — an editorial
  decision per question, queued for the expansion waves rather than a mechanical pass.
- The ~25 **obscure-trivia** questions (comet discovery months, Apollo pilots). They are
  factually fine; whether unpreparable trivia belongs in the quiz is a policy call.
- Minor spelling ("Hubbles effect", "Saggitarius") where the answer is unaffected.
