// ============================================================
// Astronomy for Middle-School Teachers — a two-day residential.
//
// The premise: middle-school teachers are not short of facts, they
// are short of the *models* that make the facts stick, and they
// carry the same misconceptions their students do. Nearly every
// concept here is one an adult will confidently get wrong — seasons
// by distance, moon phases by Earth's shadow, the pole star as the
// brightest. So the spine of this course is the `misconceptions`
// field, not the `desc` field:
//
//   node concepts/cli.js course-misconceptions teacher-training-middle
//
// is the handout, generated rather than written.
//
// Deliberately narrow: the Earth–Sun–Moon system and the naked-eye
// sky, which is all of NCERT 6–8 astronomy. No telescopes — a
// teacher who can run the shadow-stick lesson with a ₹0 budget is
// worth more than one who has seen Saturn once.
//
// Session 2 is the load-bearing one: a stick in the ground yields
// local noon, the cardinal line, latitude and the size of the Earth.
// Everything after it is a variation on "measure, then model".
// ============================================================

window.COURSES.push(

    {
        id: "teacher-training-middle",
        name: "Astronomy for Middle-School Teachers",
        kind: "teacher-training",
        audience: "school-middle",
        blurb: "Two days for teachers of classes 6–8. Confront the misconceptions you and your students share, then rebuild the Earth–Sun–Moon system from things you can do in a school ground with a stick.",

        // Adults, and teachers at that. Both are safe; neither is astronomy.
        assumes: [
            "angles-protractor",
            "gravity-basics"
        ],

        sessions: [
            {
                title: "Day 1 — What we all get wrong",
                mode: "theory",
                day: 1,
                duration: 120,
                concepts: [
                    "spin-axis",
                    "day-night",
                    "cardinal-directions",
                    "sky-dome",
                    "sun-daily-arc"
                ],
                equipment: ["projector", "stationery"],
                notes: "Open by asking the room to explain the seasons on paper, before any teaching. Collect the answers — most will say 'the Earth is closer in summer'. Keep the papers and hand them back in Day 2's seasons session. This is the most effective eight minutes in the course, and it only works if you do it before you teach anything."
            },
            {
                title: "Day 1 — Shadows: the whole system from a stick",
                mode: "lab",
                day: 1,
                duration: 150,
                concepts: [
                    "light-shadow",
                    "earth-globe",
                    "latitude-longitude",
                    "angular-measure",
                    "shadow-clock",
                    "earth-sphere",
                    "eratosthenes"
                ],
                equipment: ["gnomon", "measuring-tape", "stationery"],
                notes: "A stick in the ground gives local noon, the true cardinal line, the latitude, and — with a partner school a few hundred km north or south — the circumference of the Earth. Teachers who do this once run it every year: no budget, no breakage, and a result the class computes themselves. If you cut one thing from this course, do not cut this."
            },
            {
                title: "Day 1 — Evening sky: what a beginner actually sees",
                mode: "observing",
                day: 1,
                duration: 90,
                concepts: [
                    "stars-vary",
                    "constellations",
                    "asterisms",
                    "diurnal-motion",
                    "pole-star"
                ],
                equipment: ["star-chart", "red-torch"],
                sky: { moon: "crescent", targets: ["constellations", "bright-stars", "horizon", "moon"] },
                notes: "A crescent gives earthshine and an easy first target without washing out the constellations. Teach the fist-at-arm's-length = 10° trick here; the pole star lands best right after they have watched everything else visibly wheel around it for twenty minutes. Expect at least one teacher to be surprised it is not the brightest star in the sky."
            },
            {
                title: "Day 2 — Seasons and the tilt",
                mode: "lab",
                day: 2,
                duration: 120,
                concepts: [
                    "seasons",
                    "equinox-solstice",
                    "tropics-circles",
                    "climate-zones"
                ],
                equipment: ["projector", "stationery"],
                notes: "Hand back Day 1's papers first. A globe and one lamp settles it faster than any slide: keep the tilt fixed and walk the globe around the lamp. The distance explanation dies the moment someone notices it would give both hemispheres the same season at once — let a teacher say that out loud rather than saying it yourself."
            },
            {
                title: "Day 2 — The Moon, slowly",
                mode: "lab",
                day: 2,
                duration: 120,
                concepts: [
                    "moon-observation",
                    "moon-phases",
                    "moon-orbit",
                    "solar-eclipse",
                    "lunar-eclipse"
                ],
                equipment: ["projector", "stationery"],
                notes: "Ball-and-lamp, one ball per teacher, everyone holding their own moon at arm's length and turning on the spot. Phases are a viewing-angle effect and the room has to see it from inside the orbit, not from a diagram drawn above it. Only then contrast with an eclipse — the shadow explanation of phases is the single misconception this session exists to kill, and a diagram will not kill it."
            },
            {
                title: "Day 2 — Building your own lesson",
                mode: "workshop",
                day: 2,
                duration: 90,
                concepts: [
                    "model-thinking",
                    "maps-scale",
                    "observation-inference"
                ],
                equipment: ["stationery"],
                notes: "Each teacher leaves with one lesson plan, for one concept from this course, using only what their school already owns. Peer-review in pairs against the misconception list — the test of a plan here is whether it would have caught the teacher's own Day 1 answer."
            }
        ],

        status: "draft",
        sources: []
    }

);
