// ============================================================
// Sky & Space: Class 7 — the second year, and a change of key.
//
// Class 6 built the Earth–Sun–Moon system with a stick and a lamp;
// class 7 gets physical. The year's question shifts from "where am
// I?" to "how does it work, and what does it do to things?" —
// light that travels and bends, the Sun as an engine, the Moon as
// a force (tides) and as a battlefield (craters), and finally
// glass: the year the class earns a telescope. The `assumes` list
// is class 6's maximal taught set, closed under prereqs — this
// module leans on it constantly and re-teaches none of it.
//
// The structure is one long build-up to instruments. Light travels
// (session 1) → light bends and bounces (session 3) → therefore
// lenses and mirrors → therefore telescopes, first at the Sun by
// projection (session 4, the daytime outing) and finally at the
// night sky (session 9, the one evening — crescent moon at the
// eyepiece, phone photos through it, and the Milky Way once the
// moon sets). The observing-prep lab (session 8) exists because a
// telescope night wasted on undilated eyes and unread charts is
// the most common failure of school astronomy.
//
// Deliberately NOT here: retrograde-motion (stands on the ecliptic
// and seasonal skies — a class-8 mapping job), jantar-mantar
// (stands on meridian transits and alt-az coordinates, firmly
// high-school), space-telescopes (EM spectrum), astrobiology
// (exoplanets, Kepler), and astronomy-vs-astrology (stands on
// rashi; we teach navagraha and let the confrontation wait for
// the year they can follow the argument). Dropped, not diluted.
// ============================================================

window.COURSES.push(

    {
        id: "school-astro-7",
        name: "Sky & Space: Class 7",
        kind: "school-module",
        audience: "school-middle",
        blurb: "The second year for classes that did Sky & Space 6: light, the Sun as an engine, tides and craters, and the year the class earns a telescope — ending at the eyepiece.",

        // Class 6's maximal taught concepts — the closure pulls in
        // the whole first year (day-night, moon-phases, shadow
        // work, constellations, the solar system family) plus the
        // school-maths assumptions class 6 itself made.
        assumes: [
            "eratosthenes",
            "zero-shadow-day",
            "equinox-solstice",
            "solar-eclipse",
            "aryabhata-work",
            "indian-star-names",
            "space-missions-india",
            "eyes-vision",
            "maps-scale"
        ],

        sessions: [
            {
                title: "Light is a traveller",
                mode: "theory",
                day: 5,
                duration: 80,
                concepts: [
                    "speed-distance-time",
                    "light-travel",
                    "reflection-refraction",
                    "rainbow-colors"
                ],
                equipment: ["projector", "stationery"],
                notes: "Open with the eight minutes: the sunshine on their desk left the Sun before the period started. Speed-distance-time is maths class made real — have them compute the Moon's 1.3 seconds themselves before you reveal it. Then a mirror, a glass of water with a pencil in it, and a prism at the window: bounce, bend, split. Do not name lenses or telescopes yet, but know that this entire year rests on this one period — every instrument they will touch is these three tricks in a tube."
            },
            {
                title: "The Sun is an engine",
                mode: "theory",
                day: 12,
                duration: 40,
                concepts: [
                    "sun-energy",
                    "inverse-square"
                ],
                equipment: ["projector", "stationery"],
                notes: "Every joule in the room — the food, the fan, the child — is rerouted sunshine; trace one chain (sun → grass → roti → cricket shot) on the board and let them build two more. Then inverse-square with a torch and a grid drawn on card: double the distance, a quarter the brightness, measured not preached. Land the punchline on the solar system they already know: this is WHY Venus bakes and Neptune freezes, and they can now say by how much."
            },
            {
                title: "Glass: lenses, mirrors, and the telescope",
                mode: "lab",
                day: 26,
                duration: 80,
                concepts: [
                    "lenses-mirrors",
                    "telescope-designs",
                    "binoculars",
                    "telescope-operation"
                ],
                equipment: ["binoculars", "dobsonian", "eyepieces", "stationery"],
                notes: "A magnifier focusing the window onto a sheet of paper — a real, upside-down, full-colour image of the world on a page — is the moment optics stops being a diagram. Build from it: two lenses make a refractor, a curved mirror makes their Dobsonian. Then hands on the actual instruments, in daylight, at a distant building: finding, focusing, and the discipline of not touching glass. Every child moves the Dobsonian and focuses the binoculars TODAY; the sky night is not the place to learn where the focuser is. Say out loud that magnification is the least important number — they will meet the 500x marketing lie at home."
            },
            {
                title: "Our star, up close and safely",
                mode: "solar",
                day: 33,
                duration: 80,
                concepts: [
                    "sun-as-star",
                    "solar-activity",
                    "solar-observing"
                ],
                equipment: ["dobsonian", "solar-filter", "stationery"],
                sky: { moon: "any", targets: ["sun"] },
                notes: "The Sun is a star; the stars are suns — say it once at the start and once at the end, because it reorders the whole sky in their heads. Projection first: the whole class around one projected disc, hunting sunspots, before anyone queues at the filtered eyepiece. Safety is theatre and must be theatrical: inspect the front-aperture filter in front of them, cap the finder in front of them, and tell them about the eyepiece-filter cracks of old. Sunspots bigger than the Earth, counted by children — and if the disc is blank that day, teach them that the quiet Sun is a real observation too. Log the count; the aurora session will want it."
            },
            {
                title: "Lights the atmosphere makes",
                mode: "theory",
                day: 47,
                duration: 40,
                concepts: [
                    "weather-vs-sky",
                    "air-atmosphere",
                    "halos-coronae",
                    "aurora"
                ],
                equipment: ["projector", "stationery"],
                notes: "The sorting lesson: clouds, rain and rainbows live in the bottom few kilometres; the Moon and stars live behind all of it — most children file 'sky' as one drawer and this period gives them two. Halos are the payoff: a ring round the Moon is ice crystals in OUR air, not something the Moon does, and once told, children start reporting them within the fortnight — put a halo-report corner on the classroom wall. Close with aurora as the two drawers connecting: the Sun's tantrums (their own sunspot log) lighting the top of the air. Be honest that they will likely never see one from India; honest scarcity beats false promise."
            },
            {
                title: "The Moon pulls, the Moon remembers",
                mode: "lab",
                day: 68,
                duration: 80,
                concepts: [
                    "tides",
                    "lunar-geology",
                    "asteroids-kuiper",
                    "impact-craters"
                ],
                equipment: ["projector", "stationery", "measuring-tape"],
                notes: "Two faces of the same neighbour. First the pull: the Moon's gravity stretches the ocean, and the trap to disarm is 'one bulge' — there are two, and a child holding the diagram will ask why; have the answer ready (the far side is left behind, not pushed). Then the scars: flour tray, cocoa dusting, and marbles dropped from different heights — every crater is round regardless of impact angle, which is the question someone always asks. Their craters against Chandrayaan photographs, then the sting: the Moon keeps every scar for four billion years because it has none of the air and weather we sorted out in the last session. Earth got hit just as hard and healed."
            },
            {
                title: "Other moons, and the rings",
                mode: "theory",
                day: 82,
                duration: 40,
                concepts: [
                    "galilean-moons",
                    "saturn-rings"
                ],
                equipment: ["projector", "stationery"],
                notes: "Galileo pointed a telescope worse than the school's binoculars at Jupiter and watched four dots change sides night after night — show his actual notebook sketches and let the class decode them before you explain. The point is seismic: things orbit something other than the Earth, and a class-7 child can re-collect the evidence themselves. Saturn's rings: ice rubble, shepherded, and thinner in proportion than a sheet of paper — a rubble ring around a football-sized Saturn would be tissue-thin. Promise Jupiter's moons at the sky night only if a planet is actually up; check whatsup.html before you promise."
            },
            {
                title: "Learning to see in the dark",
                mode: "lab",
                day: 96,
                duration: 80,
                concepts: [
                    "eye-at-night",
                    "dark-adaptation",
                    "star-names",
                    "star-charts",
                    "observing-log"
                ],
                equipment: ["star-chart", "red-torch", "stationery"],
                notes: "The unglamorous session that decides whether the sky night succeeds. Blackout the lab and spend real minutes in the dark: let them experience faint things surfacing as their eyes adapt, then ruin it with one white torch flash — now the red torch needs no policing, they have felt why. Planisphere drill as a game: set the date and hour, race to name what is up tonight. Star names give the chart its handles; the observing log is the year's closer — rule the first page together and make the sky night its first entry. A log they keep is the difference between an outing and an astronomer."
            },
            {
                title: "Night at the eyepiece",
                mode: "observing",
                day: 103,
                duration: 80,
                concepts: [
                    "lunar-observing",
                    "earthshine",
                    "phone-astrophotography",
                    "milky-way-band",
                    "nebulae-clusters"
                ],
                equipment: ["dobsonian", "binoculars", "eyepieces", "star-chart", "red-torch", "phone", "phone-adapter", "tripod"],
                sky: { moon: "crescent", targets: ["moon", "milky-way", "open-cluster", "constellations"] },
                notes: "The year's summit, and the crescent is chosen, not luck: a terminator full of shadowed craters early, earthshine to explain while they queue ('the ghost light is Earth shining on the Moon's night'), and it sets in time to leave the sky dark for the faint stuff. Run the Moon at the Dobsonian first and let every child take one phone photo through the eyepiece — the adapter beats hand-holding, and that photo does more for the subject at home than any circular. Then binoculars up the Milky Way band to a bright cluster: teach them it is grainy with stars, a thing no screen conveys. Everyone writes their log entry ON SITE, red torch, before the bus — memory edits, logs do not. Cloud date agreed with the school in advance."
            },
            {
                title: "Build a sundial, own the week",
                mode: "workshop",
                day: 124,
                duration: 80,
                concepts: [
                    "sundial-design",
                    "seven-day-week",
                    "navagraha"
                ],
                equipment: ["gnomon", "stationery", "measuring-tape", "projector"],
                notes: "The closing workshop ties this year's optics-and-instruments spirit back to class 6's shadow stick: the gnomon must now be TILTED to the pole star's height — their latitude, which they measured last year — and suddenly one dial-plate works all year. Each pair builds and calibrates a card sundial against the school's true-north line at noon. Then the aha that hides in the calendar: Sunday, Monday, Saturday — the week is the seven moving lights of the navagraha, sitting in their pocket diary all along. Teach Rahu and Ketu as the eclipse points, the old astronomers' bookkeeping for a real geometry. Present it as heritage of observation; the astrology argument gets its own airing in a later year, when they can follow it."
            }
        ],

        status: "draft",
        sources: []
    }

);
