// ============================================================
// Practical Astronomy Intensive — for students selected from the
// Aryabhat Astronomy Quiz.
//
// These students arrive having read the quiz study material, so they
// know what a G2 dwarf is and have never found Sagittarius. The
// coverage map (concepts/coverage/aryabhat-astronomy-quiz.md) makes
// the gap explicit: the material covers 61% of astronomy concepts
// but almost none of `Naked-Eye Sky`, `Telescopes & Observing` or
// `Indian Astronomy`. This course is aimed squarely at that gap —
// it deliberately teaches almost nothing the quiz already tested.
//
// Hence the large `assumes` block: unusual for a course, correct
// here, and honest — every id in it is one the study material
// genuinely covers.
//
// The moon drives the schedule. Nights 2, 3 and 4 need a young moon
// that sets early: lunar work while it is up, deep sky once it is
// down. `cli.js course moon quiz-practical-intensive` prints the
// window to start in.
// ============================================================

window.COURSES.push(

    {
        id: "quiz-practical-intensive",
        name: "Practical Astronomy Intensive",
        kind: "student-intensive",
        audience: "club",
        blurb: "Four days for quiz-selected students who know the theory and have never used a telescope. Sky reading, telescope handling, safe solar observing and a first taste of astrophotography — book astronomy turned into finding things in a real sky.",

        // Every id here is one the quiz study material genuinely covers —
        // see the coverage map. These students have read it; re-teaching it
        // would waste the camp. Prereq closure pulls the rest in behind them.
        //
        // Note the deliberate overlap with what Day 3 teaches: `stellar-evolution`
        // assumes `stellar-parallax` beneath it, and Day 3 teaches parallax
        // anyway. That is not redundancy — the book gave them the number,
        // the camp gives them the measurement. It is the whole thesis of
        // the course.
        assumes: [
            "solar-system-inventory",
            "sun-as-star",
            "apparent-magnitude",
            "constellations",
            "galaxies",
            "milky-way-structure",
            "nebulae-clusters",
            "catalogs-messier",
            "stellar-evolution",
            "lenses-mirrors",
            "moon-orbit",
            "tidal-locking",
            "solar-eclipse",
            "lunar-eclipse",
            "ecliptic-zodiac",
            "heliocentric-model",
            "planets-wanderers",
            "spectrum-color",
            "scale-of-solar-system",
            "latitude-longitude",
            "air-atmosphere",
            "eyes-vision",
            "temperature-heat",
            "big-numbers",
            "maps-scale",
            "model-thinking",
            "cardinal-directions"
        ],

        sessions: [
            {
                title: "Day 1 — Where things are: the celestial sphere",
                mode: "theory",
                day: 1,
                duration: 120,
                concepts: [
                    "angular-measure",
                    "diurnal-motion",
                    "celestial-sphere",
                    "altaz-coords",
                    "pole-star",
                    "circumpolar-stars",
                    "meridian-transit",
                    "latitude-sky"
                ],
                equipment: ["projector", "star-chart", "stationery"],
                notes: "They can define the celestial sphere and cannot point at the meridian. Do this indoors first, then make every claim checkable outside tonight. Angular measure comes first because every other session leans on it and nobody arrives with it — the quiz never asked them to measure anything."
            },
            {
                title: "Day 1 — First night: eyes only",
                mode: "observing",
                day: 1,
                duration: 120,
                concepts: [
                    "stars-vary",
                    "eye-at-night",
                    "dark-adaptation",
                    "asterisms",
                    "star-names",
                    "star-charts",
                    "light-pollution",
                    "milky-way-band"
                ],
                equipment: ["star-chart", "red-torch"],
                sky: { moon: "dark", targets: ["constellations", "bright-stars", "milky-way", "horizon"] },
                notes: "No telescopes tonight, on purpose. Twenty minutes of dark adaptation, ruined by one white phone screen — let that happen once and the red-torch rule needs no further explanation. A moonless night is not a compromise here, it is the point: they have read about the Milky Way and most have never seen it."
            },
            {
                title: "Day 2 — How a telescope actually works",
                mode: "theory",
                day: 2,
                duration: 150,
                concepts: [
                    "telescope-designs",
                    "aperture",
                    "magnification-eyepieces",
                    "focal-ratio",
                    "exit-pupil",
                    "resolution-limit",
                    "seeing-transparency"
                ],
                equipment: ["dobsonian", "refractor", "eyepieces", "projector"],
                notes: "Hands on the actual instruments while explaining. The '600x!' box-claim misconception dies fastest when they compute exit pupil for themselves and then look through it."
            },
            {
                title: "Day 2 — First light, then deep sky",
                mode: "observing",
                day: 2,
                duration: 180,
                concepts: [
                    "binoculars",
                    "telescope-operation",
                    "star-hopping",
                    "observing-log",
                    "double-variable-stars",
                    "planetary-observing",
                    "deepsky-observing",
                    "visual-filters"
                ],
                equipment: ["dobsonian", "binoculars", "eyepieces", "star-chart", "red-torch", "stationery"],
                sky: { moon: "dark", targets: ["double-stars", "jupiter", "saturn", "open-cluster", "globular-cluster", "nebula", "galaxy"] },
                notes: "First light on doubles and planets — bright, easy, forgiving, and the fastest route to a beginner actually finding something. Then spend the dark half on deep sky while the sky is at its blackest. Manage the disappointment honestly and early: M31 is a grey smudge, not the photograph. Averted vision is the skill of the night. They have read the Messier table — tonight they find three of them by star-hopping, with no GoTo."
            },
            {
                title: "Day 3 — Distances, and how anyone knows",
                mode: "theory",
                day: 3,
                duration: 120,
                concepts: [
                    "stellar-parallax",
                    "lightyear-scale",
                    "inverse-square",
                    "luminosity-absmag",
                    "star-colors-temp",
                    "atmospheric-extinction"
                ],
                equipment: ["projector", "stationery"],
                notes: "They memorised that Sirius is 8.6 light-years away. Ask how that number was obtained. Parallax with a thumb at arm's length, then the arithmetic — this is the session that turns a fact back into a measurement."
            },
            {
                title: "Day 3 — The Moon arrives",
                mode: "observing",
                day: 3,
                duration: 150,
                concepts: [
                    "lunar-observing",
                    "lunar-geology",
                    "lunar-libration",
                    "phone-astrophotography"
                ],
                equipment: ["dobsonian", "binoculars", "eyepieces", "phone", "phone-adapter", "red-torch", "stationery"],
                sky: { moon: "crescent", targets: ["moon", "double-stars"] },
                notes: "The moon is deliberately last. The camp starts at new moon so the two dark nights come first, and by tonight a crescent has climbed into the evening sky — the sky supplies the lesson on schedule. Work the terminator: craters are invisible at full moon and unmissable along the day–night line. Sketch first — a pencil forces them to actually look — THEN bring out the phone adapter: the moon is the one target where a phone at the eyepiece gives a genuinely good photograph on the first try, and everyone goes home with one."
            },
            {
                title: "Day 4 — The Sun, safely",
                mode: "solar",
                day: 4,
                duration: 90,
                concepts: [
                    "solar-observing",
                    "solar-activity",
                    "solar-structure"
                ],
                equipment: ["refractor", "solar-filter", "stationery"],
                sky: { moon: "any", targets: ["sun"] },
                notes: "Front-aperture filter fitted and checked by the instructor personally, every time, before anyone's eye goes near it. Never an eyepiece filter. State the rule, then explain what a Herschel wedge does to an unfiltered finder — the fear is the lesson."
            },
            {
                title: "Day 4 — Indian sky, and what to do next",
                mode: "theory",
                day: 4,
                duration: 120,
                concepts: [
                    "indian-star-names",
                    "nakshatra",
                    "tithi",
                    "panchanga",
                    "citizen-science"
                ],
                equipment: ["projector", "star-chart"],
                notes: "The quiz is named for Aryabhata and its study material never mentions the nakshatras — close that gap here. Saptarishi is the Big Dipper they found on night one; Arundhati–Vasishtha is a naked-eye double they can still check. Finish with citizen science so the camp has an afterwards."
            },
            {
                title: "Day 4 — Last night: first frames",
                mode: "imaging",
                day: 4,
                duration: 120,
                concepts: [
                    "exposure-triangle",
                    "nightscapes",
                    "star-trail-imaging"
                ],
                equipment: ["phone", "dslr", "tripod", "red-torch", "power-bank"],
                sky: { moon: "crescent", targets: ["milky-way", "star-trails", "constellations"] },
                notes: "The taste of astrophotography, not the meal. The day-4 crescent sets in the first hour — watch it go down, then the sky is dark and every phone and camera comes out on a tripod. One wide nightscape and one short star-trail stack each; the trail arcs centre on the pole star they found on night one, which closes the camp's circle. Anyone hungry for more gets pointed at the full astrophotography workshop."
            }
        ],

        status: "draft",
        sources: ["concepts/coverage/aryabhat-astronomy-quiz.md"]
    }

);
