// ============================================================
// Sky & Space: Class 6 — a year-long school module.
//
// The entry year. A class-6 child arrives knowing the Sun rises,
// the Moon changes, and very little else that is *organised* — so
// this module assumes nothing but school maths (a protractor) and
// the everyday fact that things fall. The year runs one narrative
// arc: my place on a spinning Earth → shadows and time → the Moon
// → eclipses → the solar system family → India in space. Each
// block earns the next; nothing is taught because it is "in the
// syllabus" and everything because the previous session created
// the question it answers.
//
// The delivery constraint shapes everything: 40-minute single
// periods and 80-minute doubles, spread across a school year, with
// exactly ONE evening the school will actually grant us (day 94,
// crescent moon — earthshine, an easy first target, and the sky
// still dark enough for constellations) and one daytime solar
// outing for the noon-shadow project. Everything else must work
// under a classroom roof or in the school ground during a period.
//
// The spine is the shadow stick. It appears in session 3 as a
// clock, in session 4 it measures the Earth, in session 6 it
// finds the tropics; by then the class has done real astronomy
// three times without any equipment the school does not already
// own. The Moon block runs on homework — a month of naked-eye
// moon diary between sessions 7 and 8 — because phases cannot be
// taught faster than the Moon performs them.
//
// Deliberately NOT here: scale-of-solar-system (drags in the
// heliocentric model, a grade-11 argument), calendar-systems
// (stands on lunar-months, high-track material), and
// astronomy-vs-astrology (stands on rashi and the ecliptic —
// that confrontation is better had when they can follow it).
// The graph said no, and the graph is right.
// ============================================================

window.COURSES.push(

    {
        id: "school-astro-6",
        name: "Sky & Space: Class 6",
        kind: "school-module",
        audience: "school-middle",
        blurb: "A year-long module for class 6 in regular school periods: from a spinning ball underfoot to India in space, built on shadow sticks, a moon diary, and one sky night.",

        // School maths and everyday physics only. Everything
        // astronomical is taught, because nothing astronomical
        // can be assumed at entry.
        assumes: [
            "angles-protractor",
            "gravity-basics"
        ],

        sessions: [
            {
                title: "A ball, spinning",
                mode: "theory",
                day: 3,
                duration: 40,
                concepts: [
                    "earth-globe",
                    "spin-axis",
                    "day-night"
                ],
                equipment: ["projector", "stationery"],
                notes: "Darken the room, one torch, one globe, and put a sticker on your city — day and night must happen to THEM, not to a diagram. Expect the classic wrong answer that the Sun goes around us or that it 'switches off'; let a student rotate the globe and discover their sticker carrying them into shadow. Do not mention orbits, seasons or tilt-consequences yet — one revolution of the globe is the whole lesson, and it is enough."
            },
            {
                title: "The dome overhead and the Sun's road",
                mode: "lab",
                day: 10,
                duration: 80,
                concepts: [
                    "sky-dome",
                    "cardinal-directions",
                    "sun-daily-arc"
                ],
                equipment: ["stationery", "gnomon"],
                notes: "Take the double period so you can step into the school ground twice, an hour apart, and mark the Sun's position against a fixed landmark — the arc has to be SEEN moving, not asserted. Fix the cardinal directions to the school building itself ('the gate is west') so every later session has a shared compass. Most children believe the Sun rises exactly east every day; plant the doubt now, the seasons session will harvest it."
            },
            {
                title: "A stick tells the time",
                mode: "lab",
                day: 17,
                duration: 40,
                concepts: [
                    "light-shadow",
                    "shadow-clock",
                    "angular-measure"
                ],
                equipment: ["gnomon", "measuring-tape", "stationery"],
                notes: "Plant the gnomon before school and have monitors mark the shadow tip every period — by this class there is a curve on the ground and the shortest shadow points true north. Teach fist-at-arm's-length = 10° here, on the gnomon's shadow angle; the class will use it all year. The stick stays planted: it is the course's only permanent instrument, and sessions 4 and 6 come back to it."
            },
            {
                title: "How big is the Earth?",
                mode: "lab",
                day: 31,
                duration: 80,
                concepts: [
                    "maps-scale",
                    "latitude-longitude",
                    "earth-sphere",
                    "eratosthenes"
                ],
                equipment: ["gnomon", "measuring-tape", "stationery", "projector"],
                notes: "Start from the school map they drew in geography and shrink outwards — city, country, globe — so scale is a habit before it is a number. Then Eratosthenes: same stick, same noon, a partner school a few hundred km north or south, and the class computes the circumference of the planet themselves. Arrange the partner school weeks in advance; a WhatsApp photo of their noon shadow is all you need. If the numbers come out within 15% the room goes silent — do not fill the silence."
            },
            {
                title: "Why summer? (Not what you think)",
                mode: "theory",
                day: 45,
                duration: 40,
                concepts: [
                    "seasons",
                    "equinox-solstice"
                ],
                equipment: ["projector", "stationery"],
                notes: "Before teaching anything, have every child write one sentence explaining summer. Most will say the Earth gets closer to the Sun — keep the slips. Globe and lamp, tilt fixed, walk the orbit: let a student notice that 'closer' would make BOTH hemispheres hot at once, while Australia's December beaches say otherwise. Return the slips at the end and let them mark their own. The gnomon's noon shadow, now weeks long in your logbook, shows the solstice drift for free."
            },
            {
                title: "The noon shadow project",
                mode: "solar",
                day: 52,
                duration: 40,
                concepts: [
                    "tropics-circles",
                    "zero-shadow-day"
                ],
                equipment: ["gnomon", "measuring-tape", "stationery"],
                sky: { moon: "any", targets: ["sun"] },
                notes: "A daytime outing to the faithful stick: measure the noon shadow carefully and compute your latitude's distance from the Tropic of Cancer. If your school sits south of the Tropic, find your actual zero-shadow date from the tables and move THIS session to match it — a vertical stick with no shadow is the single most photographed moment of the year. North of the Tropic, teach it as the shadow that never quite dies, and why that line on the map is drawn where it is. Never let anyone stare at the Sun; the shadow is the instrument."
            },
            {
                title: "Start your moon diary",
                mode: "theory",
                day: 59,
                duration: 40,
                concepts: [
                    "moon-observation"
                ],
                equipment: ["stationery"],
                notes: "One concept, one period, and a month of homework: every child sketches the Moon each clear night — shape, time, and which side is lit — in a printed 30-box diary. Teach them that the Moon is up in the DAYTIME half the month, which most adults do not know, so morning sketches count. This session exists to start the clock: the phases lesson is deliberately four weeks away, because the Moon is the only teacher of its own rhythm. Chase the diaries weekly or the lab on day 87 falls flat."
            },
            {
                title: "Phases, from inside the orbit",
                mode: "lab",
                day: 87,
                duration: 80,
                concepts: [
                    "moon-phases",
                    "moon-orbit",
                    "model-thinking"
                ],
                equipment: ["stationery"],
                notes: "Darken the hall: one lamp is the Sun, every child holds a ball at arm's length and turns on the spot — each of them is the Earth watching their own moon wax and crescent. Phases must be seen from inside the orbit; a diagram drawn from above teaches the teacher, not the child. Then lay their month of diaries end to end and match diary to ball. The misconception to kill on sight: 'phases are the Earth's shadow'. Do not kill it with words — ask where the shadow would have to be, and let the lamp answer. Close by naming what you just did: the lamp is not the Sun and the ball is not the Moon, yet they answered a real question — that is what a scientific model IS, and this class will use models all year."
            },
            {
                title: "The sky night",
                mode: "observing",
                day: 94,
                duration: 80,
                concepts: [
                    "stars-vary",
                    "constellations",
                    "diurnal-motion",
                    "pole-star",
                    "indian-star-names"
                ],
                equipment: ["star-chart", "red-torch"],
                sky: { moon: "crescent", targets: ["moon", "constellations", "bright-stars", "horizon"] },
                notes: "The one evening the school will give you — spend it on the naked eye, not on a telescope queue. A crescent moon greets them early (point out the earthshine even though you are not formally teaching it) and sets before it can wash out the constellations. Anchor two constellations, then return to them after an hour so the class SEES the sky wheel; only then reveal the one star that did not move. Expect disbelief that Dhruva is faint — that surprise is the lesson. Give the Indian names alongside the Greek ones as equals, not as trivia. Have a cloud date agreed with the school in advance."
            },
            {
                title: "When shadows swallow the Moon and Sun",
                mode: "lab",
                day: 101,
                duration: 80,
                concepts: [
                    "eyes-vision",
                    "lunar-eclipse",
                    "solar-eclipse"
                ],
                equipment: ["projector", "stationery"],
                notes: "Same lamp and balls as the phases lab, deliberately — an eclipse is what happens on the rare month the three actually line up, and the class already owns the model that shows why it is rare. Contrast against phases explicitly: last month's wrong answer ('Earth's shadow') is this month's right one, and saying so out loud inoculates both. Teach eye safety with full weight here: a solar eclipse is the one astronomical event that can injure a child, and the pinhole projector they build in the last twenty minutes is their licence to watch one. Address the eclipse-food superstitions directly and without mockery — the children will hear them at home."
            },
            {
                title: "The wanderers and the family",
                mode: "lab",
                day: 122,
                duration: 80,
                concepts: [
                    "planets-wanderers",
                    "solar-system-inventory",
                    "big-numbers",
                    "scale-of-solar-system"
                ],
                equipment: ["projector", "stationery", "measuring-tape"],
                notes: "Start from the sky night: everything they saw stayed fixed in its constellation — except, had they watched for weeks, a few bright 'stars' that drift. That drift, not a poster of eight balls, is what a planet IS, and it is why five of them have been known since before history. Then take the family tour, but keep insisting on the difference between what we see (dots that wander) and what we know (worlds). Walk the planet order down the corridor first — sequence only. Then do it honestly: Earth a peppercorn, the Sun a football 25 m away, Neptune 750 m down the road. Every textbook poster lies about this, and the walk is the one lesson about the solar system nobody forgets: it is made of emptiness."
            },
            {
                title: "India in space",
                mode: "review",
                day: 150,
                duration: 80,
                concepts: [
                    "space-missions-india",
                    "aryabhata-work"
                ],
                equipment: ["projector", "stationery"],
                notes: "The closing session joins the two ends of the year: Aryabhata computed the Earth's spin and explained eclipses by shadows fifteen centuries before the satellite named after him flew — and the class has personally redone both of those pieces of work with a stick and a lamp. Run it as review-by-storytelling: Chandrayaan needs their moon diary, Aditya needs their eye-safety rules, Mangalyaan needs their wanderers. End by having each child present one measurement THEY made this year. The message to land: this subject is not finished, and it is theirs."
            }
        ],

        status: "draft",
        sources: []
    }

);
