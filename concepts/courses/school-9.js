// ============================================================
// Sky & Space: Class 9 — the astrophysics year.
//
// Class 8 taught them to READ the sky; class 9 teaches them to
// MEASURE it, and then to reason from the measurements. The year is
// one long argument:
//
//   coordinates (a star has an address) → the heliocentric case
//   (retrograde + phases of Venus, the actual evidence) → Kepler →
//   gravitation → orbits, and India's rockets that use them → the Sun
//   as a workbench star → magnitudes, parallax, and the H-R diagram
//   plotted by hand → stellar lives → Doppler, Hubble, and the Big
//   Bang → and finally the Indic tradition, read with the year's
//   toolkit: nakshatra and rashi as coordinate systems, Jantar Mantar
//   as a naked-eye observatory, astrology examined as a model.
//
// It rides NCERT class 9 physics deliberately: gravitation and
// Newton's third law are literally their syllabus, so `gravity-basics`
// and `newtons-third-law` sit in `assumes` and this course spends its
// minutes on what physics class never gives them — Kepler first, so
// gravitation arrives as the EXPLANATION of an observed law, not a
// formula with no observation under it.
//
// Gaps the validator demanded, taught rather than dodged:
// `celestial-sphere`, `heliocentric-model`, `keplers-laws`,
// `meridian-transit` (Jantar Mantar stands on it), `telescope-designs`,
// `spectroscopy`, `stellar-parallax`, `doppler-shift`. All are honest
// class 9 material even where tagged for higher grades.
//
// Dropped as too heavy, per 'fix the course, not the graph':
// `lagrange-points` (L5, needs nothing else here), `dark-matter-energy`
// (L5 — the year already ends at the Big Bang), `equation-of-time`,
// `star-trail-imaging`/`sky-timelapse` (both drag in the DSLR exposure
// chain; the imaging night stays a phone night), `supernovae-compact`
// (cut for width — stellar-evolution carries the endpoints far enough
// for class 9).
//
// Scheduling: one solar session (moon-blind), one first-quarter
// observing night, and the imaging night the NEXT evening on the same
// first-quarter requirement — the terminator is the one target a
// phone through the eyepiece nails first try.
// ============================================================

window.COURSES.push(

    {
        id: "school-astro-9",
        name: "Sky & Space: Class 9",
        kind: "school-module",
        audience: "school-high",
        blurb: "A year of measurement and argument for class 9: coordinates, the evidence for heliocentrism, Kepler to gravitation to ISRO's orbits, the Sun as a star, a hand-plotted H-R diagram, the expanding universe — and the Indic tradition read with the same toolkit.",

        // The class 6–8 legacy plus the NCERT class 9 physics they are
        // taking concurrently. Sky-reading and optics come from class 8
        // (star charts, binoculars, the log, lenses, spectrum, light
        // years out to `galaxies`); the Earth–Sun–Moon machine from 6–7;
        // `gravity-basics` and `newtons-third-law` from physics class.
        // Closure pulls the rest in behind these.
        assumes: [
            "pole-star",
            "ecliptic-zodiac",
            "moon-orbit",
            "observing-log",
            "telescope-operation",
            "lunar-observing",
            "dark-adaptation",
            "lenses-mirrors",
            "spectrum-color",
            "waves-basics",
            "sun-as-star",
            "nebulae-clusters",
            "galaxies",
            "shadow-clock",
            "solar-system-inventory",
            "temperature-heat",
            "model-thinking",
            "navagraha",
            "gravity-basics",
            "newtons-third-law"
        ],

        sessions: [
            {
                title: "The celestial sphere: a sky you can point at",
                mode: "theory",
                duration: 80,
                concepts: ["celestial-sphere", "altaz-coords"],
                equipment: ["projector", "stationery"],
                notes: "Open with the year's thesis: class 8 taught you to find things, class 9 teaches you to measure them, and measurement needs an address system. The celestial sphere must be sold honestly — it is FALSE (they know the stars are at wildly different distances from class 8) and USEFUL, which makes it the best model-thinking specimen in the course; say both sentences in the same breath. Then alt-az: altitude and azimuth of the classroom clock, the water tank, yesterday's moon. Drill the fatal flaw live — measure something's alt-az, wait forty minutes, measure again. The address expired. That failure is session 2's motivation, so do not fix it today."
            },
            {
                title: "Addresses that don't expire",
                mode: "lab",
                duration: 80,
                concepts: ["equatorial-coords", "latitude-sky", "meridian-transit"],
                equipment: ["projector", "star-chart", "stationery"],
                notes: "Equatorial coordinates fix session 1's expiring address by bolting the grid to the turning sphere itself — latitude and longitude for the sky, with the celestial equator inherited from Earth's. The one diagram worth thirty minutes: pole star altitude = your latitude. Have them prove it with a drawing, not accept it — a Kanyakumari observer and a Srinagar observer see Dhruva at 8° and 34° and each can compute where the other stands. Meridian transit closes the session: every star crosses your north-south line once a night, at its highest, and crossing time = a clock. Plant the flag here: 'a wall that times transits is an instrument' — session 15 walks into Jantar Mantar over this exact bridge."
            },
            {
                title: "The case for the Sun: retrograde and the phases of Venus",
                mode: "theory",
                duration: 80,
                concepts: ["retrograde-motion", "heliocentric-model", "planetary-configurations", "phases-of-venus"],
                equipment: ["projector", "stationery"],
                notes: "Pay class 8's promised debt: why do planets loop backwards? Run it as a trial, not an announcement — geocentrism was not stupid, it fit the naked-eye data for two thousand years. Retrograde first, as the awkward fact; then the overtaking-on-the-highway demonstration in the school ground (inner students walk faster; watch your neighbour drift backward against the far fence) — Mars's loop with zero epicycles. Configurations give the vocabulary (opposition, conjunction, elongation — why Venus never strays far from the Sun). Then the executioner: Galileo's Venus showing a FULL phase, impossible in Ptolemy's model where Venus is always sunward of us. Let a student explain why it is impossible; that is the argument won by evidence, not authority — the sentence the whole year is built on."
            },
            {
                title: "Kepler's laws, then Newton's why",
                mode: "theory",
                duration: 80,
                concepts: ["keplers-laws", "gravitation"],
                equipment: ["projector", "stationery", "measuring-tape"],
                notes: "Order matters more here than anywhere in the course: Kepler FIRST, as pure observed pattern — ellipses, equal areas, T² ∝ a³ — mined from Tycho's data with no idea why. Have them verify the third law themselves with a table of real planet periods and distances; the moment T²/a³ comes out constant eight times running is the moment they believe laws can hide in numbers. Draw ellipses with two pins and a loop of string, always. THEN Newton, as the answer to 'why these patterns?' — one inverse-square attraction explains all three at a stroke, plus the falling apple, plus the Moon. They are doing gravitation in physics class this very term; your job is the part physics class skips — that the law was worth finding because Kepler had found something needing explanation."
            },
            {
                title: "Orbits: falling forever, and India's rockets",
                mode: "theory",
                duration: 80,
                concepts: ["orbits-satellites", "space-missions-india", "launch-vehicles"],
                equipment: ["projector"],
                notes: "Newton's cannonball kills the year's stubbornest misconception — that astronauts float because there is no gravity up there. Fire the cannon faster and faster until the fall misses the Earth forever; gravity up there is nearly full strength, and an orbit IS falling. Insist on the phrase 'falling around the Earth' until the class uses it unprompted. Then the payoff nobody expects to be local: ISRO flies on exactly this physics. Aryabhata to Chandrayaan-3's south-pole landing to Aditya-L1 staring at the Sun; PSLV as the reliable workhorse and why a rocket is Newton's third law with the reaction mass thrown downward. Launch eastward from Sriharikota and the Earth's spin is free velocity — let them work out why east. Careers land harder here than in any assembly talk."
            },
            {
                title: "The Sun through a filtered telescope",
                mode: "solar",
                day: 45,
                duration: 80,
                concepts: ["telescope-designs", "solar-observing", "solar-activity"],
                equipment: ["refractor", "solar-filter", "tripod", "stationery"],
                sky: { moon: "any", targets: ["sun"] },
                notes: "Safety is the lesson, not the preamble: NOTHING about this session happens until every student has repeated the rule — no eye to any unfiltered optic pointed sunward, ever; a telescope is a magnifying glass and their retina has no pain nerves. Check the front-aperture filter for pinholes in front of the class, deliberately, so they see checking is normal. Teach the designs comparison on the hardware itself first (refractor bends, reflector bounces — open the dob's tube end and show the mirror) while pairs sketch. Then the Sun: sunspots as magnetic storms larger than Earth — draw today's spots, and if you can manage a second look days later, the rotation of the Sun falls out of two sketches. Log it like any observation; the Sun is the one star they will ever see as a disc, which is precisely what sessions 7–10 exploit."
            },
            {
                title: "How bright, how far: magnitudes and parallax",
                mode: "theory",
                duration: 80,
                concepts: ["apparent-magnitude", "inverse-square", "stellar-parallax"],
                equipment: ["projector", "stationery"],
                notes: "The magnitude scale is historical debris — backwards (bigger = fainter) and logarithmic — so teach it as Hipparchus's fault and move on; five steps = 100×, Vega ≈ 0, faintest naked eye ≈ 6, done. Inverse-square is the physics under everything stellar: same torch, twice the distance, quarter the light — do it with a phone torch and a lux-meter app on the lab bench, four data points. Then the year's most elegant measurement: hold up a thumb, blink alternate eyes, watch it jump against the far wall. Baseline = eye spacing. Now let the baseline be the Earth's orbit and the thumb be a star: parallax, the ONLY rung of the distance ladder that is pure geometry, no assumptions. Be honest that the angles are fractions of an arcsecond — which is why the light year had to wait for telescopes, and why class 8's Alpha Centauri number was hard-won."
            },
            {
                title: "Starlight decoded: colour, temperature, spectra",
                mode: "theory",
                duration: 80,
                concepts: ["star-colors-temp", "spectroscopy"],
                equipment: ["projector", "stationery"],
                notes: "Start by breaking the childhood colour code: in a flame or a filament, BLUE is hotter than red — the iron-in-the-forge sequence runs dull red, orange, yellow, white, blue-white. So Betelgeuse (red) is cool and Rigel (blue) is fierce, and star colour is a thermometer read across light years. Then the deeper trick: a slit of light through a grating (a CD sliver taped to card works; build one per pair from stationery) shows lines — barcodes, one pattern per element, the same in the lab and in a star. Someone should gasp at the implication and if nobody does, say it plainly: we know what stars are MADE OF without going. Kill the 19th-century philosopher Comte's famous 'we shall never know the composition of stars' as the best wrong prediction in science. Both threads — temperature and identity — braid into session 9's diagram."
            },
            {
                title: "The H-R diagram, plotted by hand",
                mode: "lab",
                duration: 80,
                concepts: ["luminosity-absmag", "hr-diagram"],
                equipment: ["stationery", "projector"],
                notes: "First close the brightness loophole: apparent magnitude confounds 'truly bright' with 'merely close', so park every star at the same standard distance (10 parsecs — via session 7's parallax and inverse-square) and compare honestly; that is absolute magnitude, and the Sun's humiliating drop from −27 to +4.8 is the number to dwell on. Then the year's centrepiece, and it must be done by HAND: give pairs a table of ~30 real stars (colour/temperature vs absolute magnitude), graph paper, forty minutes. Do not pre-draw the axes' meaning — let them discover the diagonal band themselves. The main sequence emerging out of their own plotted dots is the closest a classroom gets to the 1911 moment: stars are not scattered at random, and a scatter plot just became the map of stellar physics. Name the corners (giants, dwarfs) only after every pair has found the band."
            },
            {
                title: "The lives of stars",
                mode: "theory",
                duration: 80,
                concepts: ["star-formation", "stellar-evolution"],
                equipment: ["projector"],
                notes: "Yesterday's map becomes today's story. Birth first: a cold cloud like class 8's Orion Nebula, gravity (session 4's, same law) pulling it together until the core lights — the main sequence band they plotted is not a road stars travel but where stars SIT while fusing hydrogen, the single most common misconception at this level; attack it explicitly with the 'photograph of a crowd' analogy — babies, adults, elders all in one frame, and the H-R diagram is that photograph. Mass is destiny: heavier stars burn brighter and die younger, profligately. Walk the Sun's own future — swelling to a red giant (the class 8 'Sun is a star' pivot now runs in reverse), shedding, ending as a white dwarf — with the honest timescale of five billion years, which is also the reassurance. End at the fact that makes teenagers sit up: the calcium in their bones was cooked inside a star that died before the Sun was born."
            },
            {
                title: "The expanding universe",
                mode: "theory",
                duration: 80,
                concepts: ["doppler-shift", "hubble-expansion", "bigbang-cosmology"],
                equipment: ["projector", "stationery"],
                notes: "Three ideas, one crescendo, and each stands on something the class already owns. Doppler: they have HEARD it (every passing bike horn drops in pitch); light does it too, and session 8's spectral barcodes are the ruler — lines shifted redward mean recession, and the shift is a speedometer. Hubble: nearly every galaxy's barcode is redshifted, and the farther, the faster. Run the balloon with sticker-galaxies and let every sticker be 'home' — everyone sees everyone else receding, no centre, which defuses 'where did it bang?' before anyone asks. Then run the film backwards to a hot dense beginning ~13.8 billion years ago. Be scrupulous about what Big Bang cosmology is — an extrapolation from measured expansion, model-thinking at full stretch — and end the physics year on the scale joke the course has earned: class 8 ended at Andromeda; class 9 ends at everything."
            },
            {
                title: "Observing night: star-hopping the first-quarter sky",
                mode: "observing",
                day: 100,
                duration: 80,
                concepts: ["star-hopping"],
                equipment: ["binoculars", "dobsonian", "eyepieces", "star-chart", "red-torch"],
                sky: { moon: "first-quarter", targets: ["moon", "constellations", "bright-stars", "double-stars", "open-cluster"] },
                notes: "One skill tonight, practised until it is theirs: navigating chart-to-sky in hops — anchor on a bright star, walk a pattern of steps each smaller than the binocular field, arrive at something invisible to the naked eye. Choose two hop routes for the season in advance and dry-run them yourself the night before; a teacher lost mid-hop teaches the wrong lesson. This is the year's coordinates made physical — the chart is in equatorial coordinates and their fist is still 10°. The first-quarter moon is deliberate, not a compromise: craters along the terminator are at their best through the dob for the queue, and the moon sets by midnight. Students who finish a hop early get the meridian question: which of tonight's targets is transiting right now, and how do you know? Log everything at the eyepiece."
            },
            {
                title: "Imaging night: the moon on their phones",
                mode: "imaging",
                day: 101,
                duration: 80,
                concepts: ["phone-astrophotography"],
                equipment: ["dobsonian", "eyepieces", "phone", "phone-adapter", "red-torch"],
                sky: { moon: "first-quarter", targets: ["moon"] },
                notes: "The very next evening, same moon, one goal: every student leaves with a moon photograph THEY took, on THEIR phone. The terminator craters are the one astrophotography target that succeeds on the first attempt, which is why this night exists — success breeds astronomers, and a phone photo travels to the whole family by bedtime, which is your outreach programme running itself. Technique is three rules: adapter (or two-handed brace) against the eyepiece, tap-and-hold to lock focus and drag exposure DOWN — every phone will try to brighten the moon into a white blob — and let a timer or volume-button shutter fire the shot, never a screen jab. Have them shoot ten and keep one; culling is the real lesson. Print the best three for the classroom wall with the photographers' names."
            },
            {
                title: "Nakshatra, rashi, and the astrology question",
                mode: "theory",
                duration: 80,
                concepts: ["nakshatra", "rashi", "astronomy-vs-astrology"],
                equipment: ["projector", "star-chart"],
                notes: "Teach the Indic sky as what it technically is — coordinate systems centuries old. The 27 nakshatras divide the moon's monthly path (13°20' each, one per night of the sidereal month: the moon 'staying in a different lodge' nightly is an OBSERVATION their grandparents' calendar encodes); the 12 rashis divide the Sun's yearly path — the same ecliptic from class 8, sliced two ways for two clocks. Find the class's janma nakshatras on the chart; engagement is instant and personal. Then the question every class 9 room is silently asking, treated with respect and the year's own toolkit: astrology is a MODEL, so test it the way session 3 tested geocentrism — what does it predict, and do the predictions hold when checked blind? Present the evidence and let the model fail on its own terms. Never mock — half the room's families consult panchangs — but be exact: the failure of astrology as prediction and the brilliance of the astronomy underneath it are BOTH true, and the second is the inheritance."
            },
            {
                title: "Jantar Mantar: the observatory with no lens",
                mode: "lab",
                duration: 80,
                concepts: ["indian-instruments", "jantar-mantar"],
                equipment: ["gnomon", "measuring-tape", "stationery", "projector"],
                notes: "End the year in the school ground, closing the oldest loop in the course. Start from the humble gnomon they have used since class 6, and scale it in imagination: what if the stick were 27 metres tall? The shadow edge moves a measurable millimetre every few seconds — sheer SIZE buys precision, which is the entire engineering idea of Jai Singh's 1720s observatories. Tour the instruments as solved problems, not monuments: the Samrat Yantra is a sundial big enough to read to two seconds; the meridian instruments do exactly what session 2 promised a transit-timing wall could do. Then the closing exercise, pairs, on paper: design a naked-eye instrument to measure one thing — a star's altitude, local noon, the Sun's solstice extremes — using only masonry and geometry. Judge the designs against Jai Singh's. Some student's wall-with-a-slit will essentially reinvent one of his instruments, and that is the note to end the year on: the toolkit they now carry was always the whole game."
            }
        ],

        status: "draft",
        sources: []
    }

);
