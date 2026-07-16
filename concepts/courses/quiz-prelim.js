// ============================================================
// Aryabhat Quiz: Preliminary Preparation — a weekly classroom
// series for students sitting the written preliminary round.
//
// The syllabus is not ours to choose: the quiz tests its own four
// study PDFs, and those are mapped concept-by-concept in
// concepts/coverage/aryabhat-astronomy-quiz.md. This course
// teaches that map — where the coverage doc says the material
// covers something, this course covers it; where the material is
// silent (naked-eye skills, instruments in the hand, Indian
// astronomy), the practical intensive picks up after the results,
// not this course.
//
// The running order is the study material's own narrative — Sun,
// eclipses, planets, Moon, small bodies, the sky, stars, deep sky,
// cosmology, ISRO, telescopes — bent in two places where the
// prerequisite graph refused the PDFs' order, and the graph won:
//
//   1. The celestial sphere and the constellations come SECOND,
//      before eclipses, because the ecliptic and the zodiac stand
//      on the seasonal parade of constellations. The material
//      buries the sky in Part 2; the graph says you cannot say
//      "the Moon's orbit is tilted 5.1° to the ecliptic" to a
//      student who has not met the ecliptic.
//   2. Deep sky comes AFTER stellar lives and deaths, not before
//      as in Part 2: Sgr A* needs black holes taught first, and
//      Population I vs II is meaningless before nucleosynthesis.
//
// Everything is classroom: theory and lab only, no observing
// nights, no sky constraints, no day numbers. The prelim is a
// written paper — the sky can wait.
//
// Many concepts here carry status "draft": they were added to the
// database FROM these very PDFs and are the reason this course can
// exist. The validator's draft warnings on them are expected.
//
// Two kinds of content, and the notes say which is which: the
// memorisation tables (planet statistics, the Messier list, the
// ten brightest stars, the ISRO milestones, the largest
// telescopes) versus the ideas the quiz reasons about (why
// eclipses skip months, why massive stars die young, why a red
// giant can be cool AND bright). Drill the first kind; argue the
// second.
//
// One landmine the trainer must know: Study_Material_3 dates the
// universe at 12.5 billion years. The accepted figure is 13.8.
// The Week 12 notes carry the warning.
// ============================================================

window.COURSES.push(

    {
        id: "quiz-prelim-prep",
        name: "Aryabhat Quiz: Preliminary Preparation",
        kind: "student-intensive",
        audience: "club",
        blurb: "Fourteen weekly classroom sessions for classes 6–10, walking the quiz's own study material end to end — every session mapped to the PDFs the written preliminary round is set from.",

        // School foundations a quiz entrant already stands on — enrolled
        // students, classes 6–10, who have at least opened the material.
        // Everything here is genuinely on a school syllabus (the physics
        // block is class 9–10 NCERT); everything the quiz itself tests is
        // taught below, not assumed. This list is the output of
        // course-gaps: each id was a reported gap, judged school-level.
        assumes: [
            // the sky a schoolchild already has
            "day-night",
            "seasons",
            "moon-phases",
            "moon-observation",
            "light-shadow",
            "earth-sphere",
            "spin-axis",
            "pole-star",
            "stars-vary",
            "diurnal-motion",
            "heliocentric-model",
            "planets-wanderers",
            "solar-system-inventory",
            "sun-energy",
            // school geography & skills
            "latitude-longitude",
            "maps-scale",
            "angles-protractor",
            "big-numbers",
            "model-thinking",
            // school physics & chemistry (classes 8–10)
            "gravity-basics",
            "free-fall",
            "newtons-second-law",
            "energy-conservation",
            "speed-distance-time",
            "spectrum-color",
            "lenses-mirrors",
            "temperature-heat",
            "heat-transfer",
            "waves-basics",
            "air-atmosphere",
            "atomic-nucleus"
        ],

        sessions: [
            {
                title: "Week 1 — The Sun, our reference star",
                mode: "theory",
                duration: 120,
                concepts: [
                    "sun-as-star",
                    "solar-structure",
                    "stellar-fusion",
                    "solar-activity",
                    "solar-wind",
                    "space-weather",
                    "light-travel",
                    "em-spectrum"
                ],
                equipment: ["projector", "stationery"],
                notes: "Study_Material_1 opens at 'main sequence G2 dwarf' with no ramp — this session IS the ramp. Drill the layer order (core → radiative zone → convective zone → photosphere → chromosphere → corona) both directions; the quiz loves ordering questions. Numbers to own: 5800 K photosphere, the 11-year sunspot cycle, 8 minutes for sunlight to reach us — which is why light-travel is taught here, not in the stars weeks. The corona shows up in X-ray images and the chromosphere in H-alpha, which is all the excuse needed to lay out the electromagnetic spectrum once, properly; three later sessions stand on it. Keep flares and CMEs distinct — one is light, one is stuff — and hang the aurora off the solar wind while you are there."
            },
            {
                title: "Week 2 — The celestial sphere and the constellations",
                mode: "lab",
                duration: 120,
                concepts: [
                    "angular-measure",
                    "celestial-sphere",
                    "constellations",
                    "asterisms",
                    "star-names",
                    "star-charts",
                    "latitude-sky",
                    "milky-way-band"
                ],
                equipment: ["star-chart", "projector", "stationery"],
                notes: "Charts on every desk — Study_Material_2's opening, pulled forward because the ecliptic next week stands on it. Fist at arm's length = 10°, then make them measure chart distances with it. The plants for the quiz: 88 constellations fixed by the IAU in 1930 (memorise the number and the date); the Big Dipper is an ASTERISM, not a constellation — the classic trap; Bayer's alpha-beta lettering on the charts in front of them; Canopus never rises above 37°N, and circumpolar stars never set — both are the same latitude argument, run it once each way. The Milky Way band gets ten honest minutes: most of the room has never seen it, and Week 11 builds the Galaxy out of it."
            },
            {
                title: "Week 3 — The ecliptic, the nodes, and why eclipses skip months",
                mode: "lab",
                duration: 120,
                concepts: [
                    "seasonal-skies",
                    "ecliptic-zodiac",
                    "precession",
                    "moon-orbit",
                    "solar-eclipse",
                    "lunar-eclipse",
                    "eclipse-seasons",
                    "rahu-ketu"
                ],
                equipment: ["projector", "stationery"],
                notes: "One argument, start to finish: the constellations parade with the seasons because the Sun walks the ecliptic; the Moon's orbit is tilted 5.1° to that line; so shadows usually miss, and only at the nodes do they land. Two hoops tilted 5.1° apart settle in one minute what no diagram settles in ten. Rahu and Ketu ARE the two nodes — the material and the quiz both pair the Indian framing with the geometry, so teach them as one thing. The 400×/400× size coincidence is angular measure from last week earning its keep. Precession rides along on the zodiac: Vega was the pole star 12,000 years ago and will be again — a certain quiz fact. Kill the classic confusion out loud: phases are geometry we see every month, eclipses are shadows we mostly don't."
            },
            {
                title: "Week 4 — What is a planet?",
                mode: "theory",
                duration: 90,
                concepts: [
                    "planet-definition-iau",
                    "dwarf-planets",
                    "terrestrial-vs-jovian",
                    "scale-of-solar-system"
                ],
                equipment: ["projector", "stationery"],
                notes: "The material quotes IAU Resolution 5A's three tests verbatim and so will the quiz — have them recite it: orbits the Sun, round under its own gravity, has cleared its neighbourhood. Pluto fails the third; that is the whole story, tell it without the outrage. The planet statistics table is pure memorisation — set it as homework and quiz it cold next week. Terrestrial versus jovian is the reasoning half, and scale is the shock half: shrink the Sun to a football and walk the classroom to Neptune. Saturn's rings get their sentence here (all four giants have rings; Saturn's are just the ones you can see) — the quiz asks 'which planets have rings' and accepts only 'all four'."
            },
            {
                title: "Week 5 — Orbits and gravity",
                mode: "theory",
                duration: 120,
                concepts: [
                    "keplers-laws",
                    "gravitation",
                    "newtons-law-gravitation",
                    "newtons-third-law",
                    "escape-velocity",
                    "planetary-configurations",
                    "solar-system-formation"
                ],
                equipment: ["projector", "stationery"],
                notes: "Kepler qualitatively — ellipse, equal areas, farther-is-slower — then Newton as the why, and the third law banked deliberately: Week 13's rockets are nothing else. Escape velocity is the planet table's most quiz-mined column (11.2 km/s for Earth) and the road to black holes in Week 10 — say so now. Opposition, conjunction, elongation: the material covers the configurations but NEVER explains retrograde looping — a known hole in the PDFs, close it with three students walking concentric circles. Formation closes the loop on last week: the frost line is WHY the terrestrial/jovian table looks the way it does. One line for Mercury's precessing perihelion needing Einstein; the material name-drops it."
            },
            {
                title: "Week 6 — The Moon, tides, and everyone else's moons",
                mode: "theory",
                duration: 120,
                concepts: [
                    "lunar-geology",
                    "moon-formation",
                    "tides",
                    "tidal-locking",
                    "moons-solar-system",
                    "galilean-moons"
                ],
                equipment: ["projector", "stationery"],
                notes: "Maria, highlands and craters first — you cannot tell the giant-impact story to someone who has never looked at what it built. Tides as the material argues them: an imbalance across the Earth's width, hence TWO bulges, hence two tides a day — the commonest wrong answer in this section is 'the water is pulled toward the Moon, so one bulge'. The ledger closes it: Earth's spin slows, the Moon recedes 3.8 cm a year, angular momentum balances the books. Tidal locking explains the far side — which is NOT a dark side, say it. The Galilean four are memorisation (order from Jupiter: Io, Europa, Ganymede, Callisto), with Io–Europa–Ganymede's 4:2:1 clockwork as the showpiece fact."
            },
            {
                title: "Week 7 — Small bodies: asteroids, comets, meteors",
                mode: "theory",
                duration: 90,
                concepts: [
                    "asteroids-kuiper",
                    "impact-craters",
                    "near-earth-objects",
                    "comets",
                    "oort-cloud",
                    "meteor-showers"
                ],
                equipment: ["projector", "stationery"],
                notes: "The terminology trap is the guaranteed question: meteoroid in space, meteor in the air, meteorite on the ground — drill it until it bores them. Comet tails point AWAY from the Sun, not behind the motion; the quiz has asked. Geography to place, in order outward: main belt, Kuiper belt, Oort cloud. The material's proper nouns are fair game — Toutatis at six lunar distances, Shoemaker-Levy 9 into Jupiter, the Leonids from Tempel-Tuttle and what a radiant is, Vesta and Flora as named families. Craters tie last week's lunar face to this week's impactors — same story, two witnesses."
            },
            {
                title: "Week 8 — Magnitudes, parallax, and the ten brightest stars",
                mode: "lab",
                duration: 120,
                concepts: [
                    "apparent-magnitude",
                    "inverse-square",
                    "stellar-parallax",
                    "luminosity-absmag",
                    "star-colors-temp",
                    "spectroscopy",
                    "spectral-classes",
                    "lightyear-scale"
                ],
                equipment: ["projector", "stationery"],
                notes: "Magnitude arithmetic on paper until it is reflex: Hipparchus's scale runs BACKWARDS (lower is brighter, negatives brightest of all), 5 magnitudes = 100×. The Sun's pair is a certain question: −26.7 apparent, +4.8 absolute at 10 parsecs — and absolute magnitude only makes sense once the inverse-square law and parallax are on the table, so they are taught here, not assumed. The ten-brightest table is this course's biggest memorisation ask — name, constellation, magnitude, distance, colour — hand it out as a fortnight's drill, not a night's. The stories carry it: Bessel weighing Sirius by its wobble, Sirius B the first white dwarf, Betelgeuse lettered Alpha though Rigel outshines it — because it varies. OBAFGKM with the mnemonic of their choosing, and the Sun filed as G2 closes the circle to Week 1."
            },
            {
                title: "Week 9 — How stars live",
                mode: "theory",
                duration: 120,
                concepts: [
                    "blackbody-radiation",
                    "hr-diagram",
                    "mass-luminosity-relation",
                    "stellar-lifetimes",
                    "nebulae-clusters",
                    "star-formation",
                    "stellar-evolution"
                ],
                equipment: ["projector", "stationery"],
                notes: "Study_Material_3's best chapter, and it reasons rather than lists — teach it that way. L ∝ M⁴ and t ∝ M⁻³: don't hand the exponents over, walk the argument (more mass → more weight to hold → hotter core → furiously faster burning; the material's hydrostatic-balance picture in one breath) so 'massive stars die YOUNG' lands as an inference — the quiz sets exactly that inversion as a trap. The red-giant paradox is the showpiece: cool AND bright is impossible for a point, so a red giant must be enormous — black-body reasoning doing real work. Plot Week 8's ten brightest on the HR diagram by hand. Birth bookends it: nebulae and clusters as the nurseries, and below the fusion floor, the brown dwarfs — 'failed star' is a phrase the quiz likes."
            },
            {
                title: "Week 10 — How stars die",
                mode: "theory",
                duration: 120,
                concepts: [
                    "planetary-nebulae",
                    "chandrasekhar-limit",
                    "supernovae-compact",
                    "supernova-types",
                    "pulsars",
                    "black-holes",
                    "nucleosynthesis"
                ],
                equipment: ["projector", "stationery"],
                notes: "One flowchart, sorted by mass, and every ending hangs off it. The two thresholds are the quiz's favourite numbers in this section: 1.4 solar masses (Chandrasekhar — an Indian name on an Indian quiz, expect it) and ~3 for the neutron-star ceiling. A planetary nebula has nothing to do with planets — say it before a student says it wrongly in the hall. Nova versus supernova are genuinely different events and the material is explicit: a surface flash on a white dwarf versus the star destroyed; Type Ia versus Type II by mechanism. The material's marble-Earth argument kills the vacuum-cleaner misconception: collapse the Earth to a marble and the Moon's orbit doesn't change — a black hole pulls no harder than the star it was. End on nucleosynthesis: every atom past helium was cooked in a star — true, testable, and the line they will remember."
            },
            {
                title: "Week 11 — Deep sky: the Galaxy, other galaxies, and Messier's list",
                mode: "theory",
                duration: 120,
                concepts: [
                    "milky-way-structure",
                    "galaxies",
                    "supermassive-black-holes",
                    "stellar-populations",
                    "nebula-types",
                    "catalogs-messier"
                ],
                equipment: ["projector", "stationery"],
                notes: "Week 2's band across the sky becomes a barred spiral seen from inside: Orion Arm for our address, Sgr A* at the centre — a black hole of last week's kind, four million Suns of it, which is why this session waits until now. Hubble's tuning fork: spiral, barred, elliptical, irregular. The Sagittarius Dwarf is colliding with us right now — one sentence, high quiz value. Nebula types by how they shine: emission, reflection, dark, planetary; open versus globular clusters alongside. Population I vs II is the reasoning bit — only Pop I, born from supernova-enriched gas, can have rocky planets; the quiz asks WHY, not which. The Messier table is pure memorisation and the quiz mines it: drill the celebrities cold — M1 Crab, M31 Andromeda, M42 Orion, M45 Pleiades."
            },
            {
                title: "Week 12 — Cosmology: the Big Bang and the expanding universe",
                mode: "theory",
                duration: 90,
                concepts: [
                    "doppler-shift",
                    "hubble-expansion",
                    "bigbang-cosmology",
                    "big-bang-nucleosynthesis",
                    "cosmic-microwave-background",
                    "dark-matter-energy"
                ],
                equipment: ["projector", "stationery"],
                notes: "WARNING THE TRAINER MUST CARRY: Study_Material_3 dates the universe at 12.5 billion years. That is WRONG — the accepted figure is 13.8 billion. Teach 13.8, tell the students the PDF errs, and tell them to write 13.8. The hour itself: Doppler first (the siren, then starlight), because Hubble's law is nothing but redshift plus distances. Expansion is space stretching, not an explosion INTO anything — the balloon surface, every raisin sees every other recede. Evidence in order: the redshifts, the CMB as the flash gone cold to 2.7 K, and the first three minutes leaving three-quarters hydrogen, one-quarter helium. Dark matter and dark energy honestly: names for measured ignorance, ~95% of the budget. Inflation gets one glossary-faithful sentence, no more."
            },
            {
                title: "Week 13 — India in space",
                mode: "theory",
                duration: 120,
                concepts: [
                    "space-missions-india",
                    "orbits-satellites",
                    "launch-vehicles",
                    "satellite-navigation",
                    "lagrange-points"
                ],
                equipment: ["projector", "laptop", "stationery"],
                notes: "The ISRO milestone table (1962 INCOSPAR through the Jan 2026 PSLV-C62 failure) is chronology — pure memorisation, and the densest question mine in the whole syllabus, so it went out as flashcards last week and gets tested today. The table is honest about failures (GSLV-D3, GSLV-F06, PSLV-C61) and quizmasters love failure questions precisely because students skip them. Physics before roll-call: an orbit is falling and missing, and a rocket is Week 5's third law with a fuel bill; then PSLV vs GSLV vs LVM3 by what each lifts. NavIC: seven satellites, regional, India's own. Aditya-L1's halo orbit is the Lagrange-point hook — L1 sees the Sun forever — and AstroSat gets its sentence as India's space telescope."
            },
            {
                title: "Week 14 — Telescopes, observatories, and the mock paper",
                mode: "lab",
                duration: 120,
                concepts: [
                    "telescope-designs",
                    "aperture",
                    "radio-astronomy",
                    "seeing-transparency",
                    "observatory-sites"
                ],
                equipment: ["projector", "laptop", "stationery"],
                notes: "Aperture is everything; magnification is nothing — if one idea survives this session, that one (resolution and light grasp both scale with the mirror, and the material's tables are sorted by it). Refractor vs reflector vs catadioptric by light path, then the material's mirror menagerie: segmented, single, honeycomb, liquid. Seeing explains why observatories flee upward, which is the whole logic of the two memorisation tables (Largest Telescopes, High Altitude Observatories) — India's Hanle IAO at 4,500 m sits in BOTH; flag it, it is the likeliest question in the section. Radio astronomy earns GMRT its mention; adaptive optics and interferometry get a sentence each, no more. Spend the back half on a timed mock paper drawn evenly from all fourteen weeks, marked in the room — the written round is a paper, so the course ends as one."
            }
        ],

        status: "draft",
        sources: [
            "concepts/coverage/aryabhat-astronomy-quiz.md",
            "Study_Material_1.pdf",
            "Study_Material_2.pdf",
            "Study_Material_3.pdf",
            "Glossary.pdf"
        ]
    }

);
