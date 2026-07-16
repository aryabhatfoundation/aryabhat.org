// ============================================================
// Sky & Space: Class 8 — the naked-eye sky year.
//
// Class 6–7 built the Earth–Sun–Moon machine: day and night, phases,
// seasons, the solar system inventory. Class 8 turns the students
// around to face the other 99.99% of the sky — the stars — and gives
// them the working skills of a naked-eye astronomer: pattern
// recognition, angular measure, a star chart they can actually read,
// and a log they keep all year.
//
// The spine has three turns:
//   1. Read the sky (patterns → angles → charts → its motions)
//   2. Understand the light (travel time → spectrum → lenses → the eye)
//   3. Follow the light out (Sun as a star → light years → the Galaxy
//      → other galaxies)
// The single observing night sits at the hinge: everything before it
// is preparation, everything after it is asking what the things they
// saw actually are. Ending at `galaxies` is deliberate — a class 8
// student who leaves knowing the smudge in Andromeda is another Milky
// Way has a permanently bigger universe.
//
// Deliberately NOT here: eclipses (class 6 owns them), retrograde
// motion and the heliocentric argument (class 9 owns them, where
// Kepler is waiting), and `circumpolar-stars` — the graph correctly
// demands `celestial-sphere` beneath it, which is class 9's opening
// move, so class 8 settles for watching the Saptarshi wheel without
// naming the sphere.
//
// One solar noon session (moon-blind) and ONE crescent evening. A
// crescent, not first quarter: earthshine is the hook, the moon sets
// early, and the Milky Way gets the end of the night.
// ============================================================

window.COURSES.push(

    {
        id: "school-astro-8",
        name: "Sky & Space: Class 8",
        kind: "school-module",
        audience: "school-middle",
        blurb: "A year of naked-eye astronomy for class 8: read the night sky with charts and handspans, understand light and the instruments that catch it, then follow that light out past the Sun to the Milky Way and the galaxies beyond.",

        // The class 6–7 legacy. Everything the sky-reading spine stands on:
        // the Earth–Sun–Moon machine (moon-phases, seasons, shadow-clock,
        // earth-sphere with Eratosthenes' ingredients), the class 7 light
        // unit (reflection-refraction and the rainbow), and the class 6
        // solar-system scale model. Closure pulls day-night, sun-daily-arc,
        // light-shadow and the rest in behind these.
        assumes: [
            "moon-phases",
            "seasons",
            "shadow-clock",
            "earth-sphere",
            "tropics-circles",
            "latitude-longitude",
            "angles-protractor",
            "solar-system-inventory",
            "scale-of-solar-system",
            "big-numbers",
            "speed-distance-time",
            "reflection-refraction",
            "rainbow-colors",
            "eyes-vision",
            "sun-energy"
        ],

        sessions: [
            {
                title: "Stars are not all the same",
                mode: "theory",
                duration: 80,
                concepts: ["stars-vary", "constellations", "star-names"],
                equipment: ["projector", "star-chart"],
                notes: "Open the year by asking who has actually looked at the night sky for ten unbroken minutes — in a city class, almost nobody. Show a long-exposure sky photo and ask what differs star to star: brightness, colour, and nothing else the eye can get. Constellations must land as human inventions, not physical objects — draw Orion's stars, then reveal their wildly different distances. Star names are the hook for homework: send them out tonight to find one named star and report back. That homework is the course.'"
            },
            {
                title: "Handspans and star charts",
                mode: "lab",
                duration: 80,
                concepts: ["angular-measure", "star-charts", "observing-log"],
                equipment: ["star-chart", "stationery"],
                notes: "Calibrate every student's own hand: fist ≈ 10°, span ≈ 20°, against a wall chart they measure with a protractor first. Then hand out the planisphere and make them fail at it before you explain it — set the wrong date, find the 'error', fix it. Start the observing log HERE, this week, with a naked-eye entry (moon position against their fist-measured landmark). A log started in week 2 gets kept; a log started before the observing night does not."
            },
            {
                title: "The wheeling sky and the star that stands still",
                mode: "theory",
                duration: 80,
                concepts: ["diurnal-motion", "pole-star", "indian-star-names"],
                equipment: ["projector", "star-chart"],
                notes: "Play a star-trail time-lapse before any diagram: the sky visibly turns around one point. Every class contains the misconception that the pole star is the brightest star — put it to a vote, then show Dhruva sitting at magnitude 2, forty-eighth in line. The Dhruva–Saptarshi story is not decoration: 'the seven rishis walk around the fixed prince' IS diurnal motion, taught by grandmothers for centuries. Show how the Saptarshi pointer stars find Dhruva; that trick gets tested on the observing night."
            },
            {
                title: "Wanderers and the road they keep",
                mode: "theory",
                duration: 80,
                concepts: ["planets-wanderers", "seasonal-skies", "ecliptic-zodiac"],
                equipment: ["projector", "stationery"],
                notes: "'Planet' must stop meaning 'a ball in a diagram' and start meaning 'a bright star that cheats' — show the same constellation photographed months apart with a planet moved. Seasonal skies answer a question someone will have asked by now: why can't we see Orion in May? Walk the classroom model: lamp Sun in the centre, zodiac posters on the walls, students as Earth — night side faces different walls in different months. The ecliptic then falls out for free: the wanderers keep to the same twelve posters. Do NOT explain retrograde loops if asked — write the question on the board and promise it to class 9. A kept promise there is worth more than a rushed answer here."
            },
            {
                title: "Noon: measuring the Earth with a stick",
                mode: "solar",
                day: 30,
                duration: 80,
                concepts: ["eratosthenes", "zero-shadow-day"],
                equipment: ["gnomon", "measuring-tape", "stationery"],
                sky: { moon: "any", targets: ["sun"] },
                notes: "The flagship. A vertical stick at local noon gives the sun's altitude; a partner school a few hundred km north or south (arrange this in week 1, not week 9) gives a second angle and the class computes the circumference of the Earth to within a few percent. Let them do the arithmetic — the wrong answers matter. Zero-shadow day is the local payoff: compute your town's date from its latitude, then check whether your latitude even gets one. If it falls in term time, schedule the five-minute stand-in-the-yard moment; a shadowless student is a photograph they keep."
            },
            {
                title: "Light: the only messenger",
                mode: "theory",
                duration: 80,
                concepts: ["light-travel", "spectrum-color", "waves-basics"],
                equipment: ["projector", "stationery"],
                notes: "Everything astronomy knows arrives as light, so spend a period on the messenger itself. Light having a speed is the shock: 1.3 seconds from the Moon, 8 minutes from the Sun — so the Sun you see is 8 minutes old, and someone will ask the right next question about the stars; hold that thread, session 11 pays it. A prism or a water-tray rainbow splits sunlight live — they met the rainbow in class 7, but now frame the spectrum as information carried by the light, not just decoration. Waves are the vocabulary for that: wavelength = colour is the one fact to nail down."
            },
            {
                title: "Bending light, and the eye at night",
                mode: "lab",
                duration: 80,
                concepts: ["lenses-mirrors", "eye-at-night", "dark-adaptation"],
                equipment: ["stationery", "projector"],
                notes: "Every pair of hands gets a lens: magnifier + sunlit window = an image of the world upside down on paper. They know refraction from class 7; the new idea is that a curve ORGANISES the bending into an image — that is the whole secret of every telescope they will ever meet. Then the instrument they already own: the eye, with its iris-aperture and its slow chemical night mode. Run the lights-off drill — blackout the lab for ten minutes and have them time how long before they can read a dim card. That number (and why one flash of white light resets it) is the discipline the observing night runs on. Introduce the red torch here and make its logic explicit."
            },
            {
                title: "Binoculars, telescopes, and what Galileo saw",
                mode: "lab",
                duration: 80,
                concepts: ["binoculars", "telescope-operation", "galilean-moons"],
                equipment: ["binoculars", "dobsonian", "eyepieces"],
                notes: "Daytime handling drill, no sky needed: focus binoculars on a distant signboard, learn to brace elbows or rest on a wall — hand-shake is the beginner-killer and it is fixable in one afternoon. Then the dobsonian: name the parts, find, centre and focus on a terrestrial target, and rehearse the queue discipline (don't touch the tube, ask for the focuser). End with Galileo's 1610 notebook pages: four dots that moved night after night, and what that did to the idea that everything orbits Earth. The class will re-perform that observation with their own eyes on the observing night if Jupiter is up — check whatsup.html before promising."
            },
            {
                title: "Evening under the crescent",
                mode: "observing",
                day: 60,
                duration: 80,
                concepts: ["lunar-observing", "earthshine", "milky-way-band", "light-pollution"],
                equipment: ["binoculars", "dobsonian", "eyepieces", "star-chart", "red-torch"],
                sky: { moon: "crescent", targets: ["moon", "constellations", "bright-stars", "milky-way"] },
                notes: "The night the year points at. A crescent is the right moon three times over: the terminator throws crater shadows a full moon flattens, earthshine is visible ('the old moon in the new moon's arms' — make them explain whose light that is, it is the best viva question of the year), and it sets early enough to leave real darkness. Run the moon first through the dobsonian while twilight fades and eyes adapt. Then charts out, red torches only: find Dhruva by the Saptarshi pointers, log two constellations. If the site is dark enough for the Milky Way band, end there; if it is not, THAT is the light-pollution lesson, taught by the sky itself — count stars in the Saptarshi bowl and compare with a dark-site photo. Every student leaves with a log entry written at the eyepiece, not at home from memory."
            },
            {
                title: "The Sun is a star",
                mode: "theory",
                duration: 40,
                concepts: ["sun-as-star"],
                equipment: ["projector"],
                notes: "One idea, one period, and it is the pivot of the whole course: the Sun is a star seen close up, and every star is a sun seen from very far away. Run the thought experiment in both directions — drag the Sun away until it is a dot (how far until it looks like Sirius?), drag Sirius in until it is a disc. If the class believes this one sentence, the remaining two sessions are consequences; if they don't, the galaxy is just vocabulary. Take the full forty minutes and take objections seriously."
            },
            {
                title: "Light years: putting a ruler on the stars",
                mode: "theory",
                duration: 80,
                concepts: ["lightyear-scale", "nebulae-clusters"],
                equipment: ["projector", "stationery", "measuring-tape"],
                notes: "Cash in session 6's IOU: light from Alpha Centauri left 4.3 years ago, so a light year is a RULER, not a duration — the most common class 8 error is filing it under time, and the name is to blame; say so. Scale model in the corridor: Sun a marble at one end, Earth 2.5 cm away, and the nearest star… 700 km away, another town. Let them compute that last number themselves; disbelief is the correct reaction. Then what the darkness between holds: run the Pleiades (which they can find with binoculars) and the Orion Nebula as the two live examples — star cluster and star nursery, both logged targets for their own next dark evening."
            },
            {
                title: "Our galaxy, and the others",
                mode: "theory",
                duration: 80,
                concepts: ["milky-way-structure", "galaxies"],
                equipment: ["projector"],
                notes: "Close the loop with the observing night: that faint band was our own galaxy viewed from inside — a disc seen edge-on from a seat two-thirds of the way out. The hard cognitive step is being inside the thing being described; the classroom-as-disc walkthrough (look along the rows = many heads = the band, look up = few) does more than any artist's impression, every one of which should be labelled 'not a photograph — nobody has ever left to take one'. Then the kicker: the Andromeda smudge, visible to their naked eye on a dark night, is another entire Milky Way — the farthest thing an unaided human eye can see, and light 2.5 million years old landing on their retina. End the year there, with the size of everything, and hand the observing logs back with a comment each."
            }
        ],

        status: "draft",
        sources: []
    }

);
