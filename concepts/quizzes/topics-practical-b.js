// ============================================================
// Practical Astronomy Intensive — end-of-session checks for the
// camp's back half: distances (S5), the Moon (S6), the Sun (S7),
// the Indian sky (S8) and the first frames (S9).
//
// Every distractor here is a wrong model somebody actually holds,
// lifted from the `misconceptions` on the concept records rather
// than invented to pad an option list. A marked paper should tell
// the trainer what to reteach before breakfast, not a percentage.
//
// Session 7 is the exception to every relaxed instinct in this
// file. The solar questions are written to be failed loudly. A
// student who picks the eyepiece filter, the smoked glass, or the
// quick-glance option does not get handed a telescope until they
// have been retaught and rechecked. That is the whole point of
// asking before the Sun is up.
// ============================================================

window.QUESTIONS.push(

    // ---------------- Session 5 — Distances ----------------

    {
        id: "q-stellar-parallax-01",
        concept: "stellar-parallax",
        kind: "mcq",
        difficulty: 1,
        stem: "You are told 61 Cygni lies 11.4 light years away, measured by parallax. What kind of claim is that?",
        options: [
            { text: "A direct geometric measurement: measure the angular shift, take the 2 AU baseline as the other side of the triangle, and the distance follows", correct: true },
            { text: "A theory about stellar distances that fits the observations but could be replaced by a better one", diagnoses: "Parallax as theory or inference rather than direct geometry" },
            { text: "An estimate obtained by assuming 61 Cygni is as luminous as the Sun and comparing brightness", diagnoses: "Parallax confused with brightness-based distance — it assumes nothing about the star" },
            { text: "A figure worked back from the star's colour and spectral type", diagnoses: "Parallax confused with spectroscopic distance; ignores the geometry entirely" }
        ],
        explain: "Parallax assumes nothing about the star itself — only that Earth's orbit is 2 AU across and that angles can be measured. It is the one rung of the distance ladder that is pure trigonometry, which is why everything above it is calibrated against it.",
        status: "draft"
    },
    {
        id: "q-stellar-parallax-02",
        concept: "stellar-parallax",
        kind: "mcq",
        difficulty: 3,
        stem: "The Greeks argued that if Earth orbited the Sun, the stars would visibly shift over the year — they saw no shift, so Earth must be still. Their observation was honest. Where did the argument fail?",
        options: [
            { text: "The stars are so far away that even the largest stellar parallax is under one arcsecond — far below what an unaided eye can detect", correct: true },
            { text: "The stars do not shift at all; parallax is an instrumental artefact of modern telescopes", diagnoses: "Parallax treated as an artefact rather than a real annual shift" },
            { text: "The shift is large but the Greeks had no way to record star positions accurately", diagnoses: "Expecting stellar parallax to be a visible shift — it is sub-arcsecond" },
            { text: "Parallax only appears for stars on the ecliptic, and the Greeks watched the wrong stars", diagnoses: "Believing parallax is limited to particular sky regions rather than shrinking with distance" }
        ],
        explain: "The logic was sound and the data were real; the missing piece was scale. Bessel needed 1838 and a heliometer to pull 0.3 arcseconds out of 61 Cygni. The absence of a naked-eye shift is exactly what enormous stellar distances predict.",
        status: "draft"
    },
    {
        id: "q-lightyear-scale-01",
        concept: "lightyear-scale",
        kind: "mcq",
        difficulty: 1,
        stem: "A student writes: \"Proxima Centauri is 4.2 light years away, so its light is 4.2 years old.\" The second half is right. What is a light year?",
        options: [
            { text: "A distance — the 9.46 trillion km light covers in one year", correct: true },
            { text: "A length of time — the year light takes to arrive from a star", diagnoses: "Light-year read as a unit of time" },
            { text: "The speed at which light travels over interstellar distances", diagnoses: "Light-year read as a speed" },
            { text: "The distance Earth travels along its orbit in one year", diagnoses: "Light-year confused with the AU / Earth's orbital path" }
        ],
        explain: "The name does the damage. It is a distance, and the fact that light takes a year to cross it is what defines the distance, not what the unit measures. Neptune sits about 4 light hours out; Proxima is roughly 7,000 times farther.",
        status: "draft"
    },
    {
        id: "q-lightyear-scale-02",
        concept: "lightyear-scale",
        kind: "mcq",
        difficulty: 2,
        stem: "Voyager 1 is leaving the solar system at about 17 km/s — the fastest thing we have ever launched. Roughly how long would it need to cover the 4.2 light years to Proxima Centauri?",
        options: [
            { text: "About 75,000 years", correct: true },
            { text: "About 4.2 years, since that is how long light takes and Voyager is fast", diagnoses: "Light-year read as a unit of time, applied to any traveller" },
            { text: "About 40 years — roughly ten times its journey to the edge of the solar system so far", diagnoses: "Interstellar space imagined as the solar system scaled up a little" },
            { text: "About 400 years, well within a few generations of a crewed mission", diagnoses: "4.2 light years believed to be nearly within reach" }
        ],
        explain: "Nine trillion km per light year, times 4.2, divided by 17 km/s, is roughly 75,000 years. The point is not the arithmetic but what it does to the word 'nearest': the closest star is a gap no spacecraft we can build meaningfully crosses.",
        status: "draft"
    },
    {
        id: "q-inverse-square-01",
        concept: "inverse-square",
        kind: "mcq",
        difficulty: 2,
        stem: "Two identical stars sit in the same field of view, but one is exactly twice as far away as the other. How much fainter does the far one look?",
        options: [
            { text: "Four times fainter — the same light is spread over four times the area", correct: true },
            { text: "Twice as faint — double the distance, half the brightness", diagnoses: "Brightness assumed to halve when distance doubles — the linear intuition" },
            { text: "It looks the same; distance changes the size of a star's disc, not its brightness", diagnoses: "Brightness thought to be independent of distance" },
            { text: "Eight times fainter — light spreads through a volume, so 1/d³", diagnoses: "Inverse-cube error: light spreads over a surface, not a volume" }
        ],
        explain: "Flux falls as 1/d². At twice the distance the star's light crosses a sphere with four times the area, so a quarter reaches you. The 'half' answer is the commonest wrong one, and it wrecks every distance calculation downstream.",
        status: "draft"
    },
    {
        id: "q-luminosity-absmag-01",
        concept: "luminosity-absmag",
        kind: "mcq",
        difficulty: 2,
        stem: "Sirius (apparent magnitude −1.5) looks far brighter than Rigel (apparent magnitude +0.1). Which star actually puts out more energy?",
        options: [
            { text: "Rigel, by an enormous margin — Sirius only wins the sky because it is about 8.6 ly away while Rigel is roughly 860 ly", correct: true },
            { text: "Sirius — it is the brightest star in the night sky, so it must be the most powerful", diagnoses: "Brightest-looking star assumed to be the most powerful — apparent magnitude read as true output" },
            { text: "They are equal; magnitude already accounts for distance", diagnoses: "Apparent magnitude confused with absolute magnitude" },
            { text: "Rigel, because its magnitude number is larger and larger numbers mean more power", diagnoses: "Magnitude scale read forwards — bigger numbers are fainter, not brighter" }
        ],
        explain: "Apparent magnitude mixes true output with distance and tells you neither on its own. Sirius is a modest A1 star next door; Rigel is a blue supergiant roughly 100 times farther out and tens of thousands of times more luminous.",
        status: "draft"
    },
    {
        id: "q-luminosity-absmag-02",
        concept: "luminosity-absmag",
        kind: "mcq",
        difficulty: 3,
        stem: "A student has a photometer reading for a star and wants its absolute magnitude tonight. What else does she need, and why?",
        options: [
            { text: "The distance — absolute magnitude is a calculation, the brightness the star would show at 10 parsecs, and you cannot get there without knowing how far away it is", correct: true },
            { text: "Nothing more; absolute magnitude is a direct measurement, just made with a better-calibrated instrument", diagnoses: "Absolute magnitude believed to be measurable rather than computed from distance" },
            { text: "The star's colour, which converts apparent magnitude to absolute magnitude", diagnoses: "Absolute magnitude thought to follow from colour rather than distance" },
            { text: "Nothing — she can subtract 5 from the apparent magnitude, since the scale is linear", diagnoses: "Magnitude scale treated as linear rather than logarithmic" }
        ],
        explain: "m − M is the distance modulus: absolute magnitude falls out only once distance is in hand. This is exactly why parallax has to be taught before magnitude — the geometry comes first, the comparison second. And the scale is logarithmic: five magnitudes is a factor of 100 in brightness, not five of anything.",
        status: "draft"
    },
    {
        id: "q-star-colors-temp-01",
        concept: "star-colors-temp",
        kind: "mcq",
        difficulty: 2,
        stem: "Betelgeuse is distinctly orange-red; Rigel is blue-white. Both are in Orion, both are visible tonight. What does that colour difference tell you?",
        options: [
            { text: "Rigel is much hotter — blue-white is above 10,000 K, red is around 3,000 K", correct: true },
            { text: "Betelgeuse is much hotter — red-hot is hotter than blue, as anyone who has seen a stove ring knows", diagnoses: "Red = hot, blue = cool — the stove-ring intuition, exactly backwards for stars" },
            { text: "They are made of different elements, and colour reveals composition", diagnoses: "Colour read as composition rather than temperature" },
            { text: "Betelgeuse is closer, and nearer stars look redder", diagnoses: "Colour confused with distance or reddening effects" }
        ],
        explain: "Colour is a thermometer: hotter blackbodies peak at shorter wavelengths, so hotter means bluer. Composition needs the absorption lines, not the tint. Worth adding at the eyepiece: the eye's colour cells barely fire at these brightnesses, so only the brightest stars show any tint at all.",
        status: "draft"
    },
    {
        id: "q-atmospheric-extinction-01",
        concept: "atmospheric-extinction",
        kind: "mcq",
        difficulty: 2,
        stem: "You measure the same star twice on one clear night: once near the horizon, once near the zenith. The horizon reading is several tenths of a magnitude fainter. What happened?",
        options: [
            { text: "Near the horizon its light crossed several times more atmosphere, which dimmed and reddened it — the star itself did nothing", correct: true },
            { text: "Nothing physical — a star's brightness is fixed wherever it sits, so one of the two readings must be a mistake", diagnoses: "Brightness assumed fixed regardless of altitude — airmass ignored" },
            { text: "The star was farther away when near the horizon, and light falls off with distance", diagnoses: "Horizon dimming attributed to distance — the same error that makes people think the setting Sun has moved away" },
            { text: "The night was clear, so extinction is zero; the difference must be instrument drift", diagnoses: "'Clear' treated as extinction-free — even the zenith costs a few tenths of a magnitude" }
        ],
        explain: "Airmass is roughly sec(z): at 60° from the zenith you are looking through twice the air, and near the horizon through several times more. It is the same physics that turns the setting Sun orange — the long slant path scatters the blue away. Observe high, image high.",
        status: "draft"
    },

    // ---------------- Session 6 — The Moon ----------------

    {
        id: "q-lunar-observing-01",
        concept: "lunar-observing",
        kind: "mcq",
        difficulty: 1,
        stem: "A visitor asks when to bring their new telescope for the best view of lunar craters. What do you tell them?",
        options: [
            { text: "Around first quarter or a crescent, and look along the terminator, where low sunlight throws long shadows off every crater rim", correct: true },
            { text: "At full moon — the whole disc is lit, so you see the most", diagnoses: "Full moon believed to be the best time — it is the flattest and worst" },
            { text: "At full moon, with a Moon filter fitted; the filter is what brings the craters out", diagnoses: "Moon filter credited with revealing detail — it only tames glare" },
            { text: "Any phase, but aimed at the bright middle of the disc where the light is strongest", diagnoses: "Craters hunted in the bright disc centre instead of at the terminator" }
        ],
        explain: "Full moon is sunlight straight down the line of sight: no shadows, no relief, a bland white glare. The terminator is where the Sun is rising or setting on the lunar surface, and a 1 km crater rim throws a shadow you cannot miss.",
        status: "draft"
    },
    {
        id: "q-lunar-observing-02",
        concept: "lunar-observing",
        kind: "practical",
        difficulty: 2,
        stem: "The Moon is up and the scope is yours. Find the terminator, put a crater group on it in the eyepiece, and sketch what you see in five minutes — then tell the instructor why you chose that spot on the disc.",
        answer: "Watch that the student drives the scope to the terminator rather than the bright limb or the disc centre, centres a crater group where shadows are visibly long, and sketches shadow direction rather than outlines. The verbal check matters as much as the sketch: they should say the terminator is where the Sun is low on the lunar surface, and should NOT credit a Moon filter with revealing the detail. Points for noticing the shadows shorten over the session as the Sun climbs on that ground.",
        explain: "A pencil forces a student to actually look. Anyone who has sketched shadows along the terminator has stopped believing full moon is the good night.",
        status: "draft"
    },
    {
        id: "q-lunar-geology-01",
        concept: "lunar-geology",
        kind: "mcq",
        difficulty: 2,
        stem: "Mare Tranquillitatis is a large dark patch, smoother than the bright surrounding highlands. What is it?",
        options: [
            { text: "An ancient basalt lava plain flooding an old impact basin — dark and smooth because the lava resurfaced it", correct: true },
            { text: "A sea, or the dry bed of one that has since evaporated", diagnoses: "Maria taken as seas or former water — the 17th-century name read literally" },
            { text: "A field of collapsed volcanic calderas, which is also what the craters are", diagnoses: "Craters believed volcanic rather than impact scars" },
            { text: "A young surface, smooth because lunar weather has worn the craters away", diagnoses: "Moon's surface expected to erode like Earth's — no air, no water, nothing to erase a crater" }
        ],
        explain: "Riccioli's 17th-century names stuck long after anyone believed in lunar seas. The maria are basalt; the craters around them are impact scars, which is why they come out round regardless of the impactor's approach angle — and why they are still there billions of years on.",
        status: "draft"
    },
    {
        id: "q-lunar-libration-01",
        concept: "lunar-libration",
        kind: "mcq",
        difficulty: 3,
        stem: "The Moon is tidally locked, keeping one face towards Earth. Over many months, how much of its surface can we actually see from Earth, and why?",
        options: [
            { text: "About 59% — libration rocks the Moon side to side and nods it up and down, letting us peek round each limb in turn", correct: true },
            { text: "Exactly 50% — tidal locking means the same half faces us and the rest never does", diagnoses: "Exactly half believed visible; libration ignored" },
            { text: "It varies unpredictably, because the Moon wobbles randomly on its axis", diagnoses: "Libration pictured as a random wobble rather than predictable orbital geometry" },
            { text: "50%, since the other 41% is the permanently dark side that never receives sunlight", diagnoses: "Far side called the 'dark side' — it gets as much sunlight as the near side" }
        ],
        explain: "Libration comes from an elliptical orbit (the Moon's spin is steady, its orbital speed is not) plus a tilted axis. It is predictable geometry — a libration chart tells you which limb is tipped toward you tonight, which is how anyone ever glimpses Mare Orientale. And the unseen 41% is the far side, not the dark side.",
        status: "draft"
    },
    {
        id: "q-phone-astrophotography-01",
        concept: "phone-astrophotography",
        kind: "mcq",
        difficulty: 2,
        stem: "A student has a good phone and tonight's crescent Moon in the eyepiece. Which is the honest account of what that phone can and cannot do?",
        options: [
            { text: "Held at the eyepiece on a bracket it will give a genuinely good Moon shot on the first try; with night mode on a tripod it records constellations and, from a dark site, the Milky Way — but it will not reach a galaxy without a telescope in front of it", correct: true },
            { text: "A phone cannot do real astrophotography; it is a toy until you buy a DSLR", diagnoses: "Phone dismissed as incapable of real astrophotography" },
            { text: "Zoom the phone in far enough and it will pull M31 out of the sky the same way it gets the Moon", diagnoses: "Phone zoom believed to reach faint deep-sky targets" },
            { text: "It will work at the eyepiece if you hold it steady enough; a bracket is for people with shaky hands", diagnoses: "Steady hand thought sufficient — the lens must sit at the exit pupil, which is what the bracket does" }
        ],
        explain: "The phone's limits are real but not where people think. Night mode stacks several seconds and genuinely records sky. The eyepiece problem is not shake but geometry: the phone lens has to sit at the exit pupil, and that is a bracket's job, not patience.",
        status: "draft"
    },
    {
        id: "q-phone-astrophotography-02",
        concept: "phone-astrophotography",
        kind: "practical",
        difficulty: 2,
        stem: "Fit the phone adapter to the eyepiece and bring back one focused shot of the crater terminator — sharp enough that individual crater shadows are visible.",
        answer: "Watch for: adapter clamped to the eyepiece and the phone lens brought onto the exit pupil (the frame goes from a dark tunnel with a bright circle to a full field — the student should recognise that transition and adjust rather than shove the phone closer); exposure or brightness pulled DOWN, since the Moon blows out on auto; tap-to-focus on the terminator, not the bright limb; a shot taken at the terminator with visible shadow relief. Reject a hand-held blur or a white featureless disc — send them back to re-seat the bracket and drop the exposure.",
        explain: "The Moon is the one target where a phone at the eyepiece gives a real photograph on the first attempt. Everyone should go home with this frame — it is the hook for the whole imaging session on the last night.",
        status: "draft"
    },

    // ---------------- Session 7 — The Sun, safely ----------------
    // Fail any of the first three and the student does not touch a
    // telescope in daylight until retaught and rechecked.

    {
        id: "q-solar-observing-01",
        concept: "solar-observing",
        kind: "mcq",
        difficulty: 1,
        stem: "Two solar filters are on the table: one screws into the eyepiece barrel, one caps the front of the tube. Which do you fit, and why?",
        options: [
            { text: "The front-aperture filter, always — it rejects the sunlight before the telescope concentrates it, so nothing downstream ever carries the heat", correct: true },
            { text: "The eyepiece filter — it sits closest to the eye, which is the last line of defence", diagnoses: "DANGER: eyepiece-end solar filter believed safe — the focused Sun cracks it with the eye right behind" },
            { text: "Either; both are sold as solar filters, so both are certified for the job", diagnoses: "DANGER: filter position treated as interchangeable — an eyepiece filter is not a safe substitute" },
            { text: "The eyepiece filter, with the front left open so you can still aim the scope", diagnoses: "DANGER: eyepiece filter plus unfiltered aperture — the worst configuration there is" }
        ],
        explain: "An eyepiece-end filter sits at the focus of the entire aperture: the telescope concentrates the Sun's full heat onto that scrap of glass, and it can crack without warning with the observer's eye directly behind it. This is a known killer of eyes, not a theoretical concern. Filters go over the front. Always. And the finder gets capped or filtered too — an uncapped finder will blind you just as fast as the main tube.",
        status: "draft"
    },
    {
        id: "q-solar-observing-02",
        concept: "solar-observing",
        kind: "mcq",
        difficulty: 2,
        stem: "Someone offers you these for looking at the Sun: dark sunglasses, a strip of exposed photographic film, a piece of smoked glass, and a welder's glass of shade 10. The Sun looks comfortably dim through every one. Which is safe?",
        options: [
            { text: "None of them — all four cut the visible glare while letting infrared through, and comfort is not the test. Only a certified solar filter (ND5 front-aperture film, or shade 14+ welding glass) is safe", correct: true },
            { text: "The exposed film and the smoked glass — these are the traditional methods and have been used for generations", diagnoses: "DANGER: film and smoked glass believed safe — they pass infrared and burn the retina" },
            { text: "The sunglasses, if you stack two pairs so the Sun looks properly dim", diagnoses: "DANGER: apparent dimness treated as the safety test — sunglasses pass infrared at any stacking" },
            { text: "The shade 10 welding glass — welders look at an arc through it all day", diagnoses: "DANGER: welding glass below shade 14 believed adequate for the Sun" }
        ],
        explain: "The whole trap is that all four LOOK fine. They dim the visible band, which is what your comfort responds to, and pass the infrared that does the burning. Worse, the retina has no pain nerves: the damage arrives with no sensation at all, and the blind spot shows up hours later, permanently. Comfort is not evidence of safety — certification is.",
        status: "draft"
    },
    {
        id: "q-solar-observing-03",
        concept: "solar-observing",
        kind: "practical",
        difficulty: 2,
        stem: "Set up the refractor for the Sun. Fit the front-aperture filter, deal with the finder, and hand the scope to the instructor for check — do not put your eye, or let anyone else put an eye, to the eyepiece until the instructor has personally passed it.",
        answer: "The instructor personally verifies, every time, before any eye goes near the eyepiece — this check is not delegated to another student and is not skipped for a student who has done it before. Watch for and require: (1) front-aperture filter seated square and FULLY covering the aperture, held so it cannot be lifted off by wind or a knock — set screws or tape, not friction alone; (2) filter film inspected against the sky first for pinholes, scratches or creases — any defect and the filter is rejected outright, not patched; (3) the finder capped or filtered — an uncapped finder blinds as fast as the main tube; (4) NO eyepiece-end solar filter present anywhere on the setup; (5) the scope aimed by shadow, not by sighting along the tube; (6) the student waits for the instructor's word before the first look, and does not step away leaving an aimed unattended scope. Any student who fitted an eyepiece filter, left the finder open, or looked before the check does not observe the Sun today. Reteach, recheck, and only then hand it back.",
        explain: "This is the one check in the camp that is pass/fail with no partial credit, and the reason it is a practical and not an MCQ is that a student can recite the rule and still leave the finder open. The instructor's eyes on the fitted filter, every single time, is the protocol.",
        status: "draft"
    },
    {
        id: "q-solar-activity-01",
        concept: "solar-activity",
        kind: "mcq",
        difficulty: 2,
        stem: "Through the filtered scope, a sunspot group shows as a dark blotch on the disc. What is a sunspot?",
        options: [
            { text: "A region where a strong magnetic field chokes convection, leaving the gas at around 4,000 K — cool only beside the 5,800 K photosphere around it; lifted out on its own it would blaze brighter than an arc lamp", correct: true },
            { text: "A hole in the Sun's surface, through which you are seeing down into a darker interior", diagnoses: "Sunspots believed to be holes in the Sun" },
            { text: "A genuinely cold, dark patch of the Sun — cold in the ordinary sense of the word", diagnoses: "Sunspots believed absolutely cold — a spot is ~4,000 K and would blaze if seen alone" },
            { text: "A shadow cast on the photosphere by a prominence looping above it", diagnoses: "Sunspots taken as shadows rather than cooler magnetic regions" }
        ],
        explain: "'Dark' here is purely relative — the spot is darker than its surroundings by contrast, and at 4,000 K it is still radiating fiercely. Nothing is missing from the Sun where a spot sits; the magnetic field is just holding the hot convection back.",
        status: "draft"
    },
    {
        id: "q-solar-activity-02",
        concept: "solar-activity",
        kind: "practical",
        difficulty: 2,
        stem: "With the checked filtered scope, find the sunspot groups on today's disc, sketch their positions on the blank disc template, and count the groups. Then say — out loud — whether today's count says anything about where we are in the solar cycle.",
        answer: "Watch for: a disc sketch with spots placed at plausible latitudes (spots cluster within ~30° of the equator, not at the poles); umbra and penumbra distinguished in at least one group; a group count stated as a count of GROUPS, not individual spots. On the verbal check they should recognise that one day's count says little on its own — the 11-year cycle shows up only in counts pooled over months, which is exactly what makes sunspot counting a citizen-science programme rather than a one-night observation. Push back if they describe the spots as holes or as cold, and if they say activity is a remote curiosity, ask what drives the aurorae and what a geomagnetic storm does to GPS.",
        explain: "Sunspot sketching is the oldest continuous dataset in astronomy and an amateur can still add to it. It also makes the relative-darkness point physically: the spot is obviously part of the same glowing surface, just dimmer.",
        status: "draft"
    },
    {
        id: "q-solar-structure-01",
        concept: "solar-structure",
        kind: "mcq",
        difficulty: 2,
        stem: "We call the photosphere the Sun's 'surface' and it looks like a crisp edge through the filter. What is it actually?",
        options: [
            { text: "Just the depth at which the gas stops being opaque and light finally escapes — there is no boundary there, only a change in transparency", correct: true },
            { text: "A solid or liquid surface, with the atmosphere sitting above it as on Earth", diagnoses: "Sun believed to have a solid surface" },
            { text: "The top of the fusion core, where the energy is actually generated", diagnoses: "Photosphere confused with the core — fusion happens at 15 million K, far below" },
            { text: "A shell of denser gas held up by the pressure of the corona pressing down from outside", diagnoses: "Sun's structure inverted — the corona is thin and hot, not a compressing lid" }
        ],
        explain: "The edge looks sharp because the transition from opaque to transparent happens over a few hundred km out of 700,000 — sharp on the eye, gradual in the physics. The mottled granulation you can see in it is the top of the convection zone boiling, like a pot of oatmeal.",
        status: "draft"
    },
    {
        id: "q-solar-structure-02",
        concept: "solar-structure",
        kind: "mcq",
        difficulty: 3,
        stem: "The core is 15 million K. The photosphere is 5,800 K. What does the temperature do in the corona above it, and why is that interesting?",
        options: [
            { text: "It jumps back up to millions of kelvin — hundreds of times hotter than the surface beneath it, which nobody has fully explained", correct: true },
            { text: "It keeps falling smoothly outwards, as you would expect moving away from the heat source", diagnoses: "Sun assumed to cool steadily outwards — the corona is far hotter than the photosphere below it" },
            { text: "It holds steady at photosphere temperature, since the corona is just thinner gas at the same heat", diagnoses: "Corona assumed thermally continuous with the photosphere" },
            { text: "It drops to near absolute zero — the corona is essentially vacuum", diagnoses: "Low density confused with low temperature" }
        ],
        explain: "The coronal heating problem is a live research question: the gas gets hotter as you move AWAY from the source of energy, which no simple thermal picture allows. Magnetic reconnection and wave heating are the leading candidates and neither fully closes it. Worth saying out loud — students should meet an unsolved problem in the middle of a settled subject.",
        status: "draft"
    },

    // ---------------- Session 8 — Indian sky ----------------

    {
        id: "q-indian-star-names-01",
        concept: "indian-star-names",
        kind: "mcq",
        difficulty: 1,
        stem: "On night one you found the Big Dipper and Polaris. Tonight someone mentions Saptarishi and Dhruva. What are they pointing at?",
        options: [
            { text: "The same two things — Saptarishi IS those seven stars, and Dhruva IS Polaris; only the names and the stories differ", correct: true },
            { text: "Two different patterns in another part of the sky, which you have not found yet", diagnoses: "Saptarishi and the Big Dipper believed to be different star patterns" },
            { text: "A different pole star from Polaris, used in the Indian system", diagnoses: "Dhruva believed to be some pole star other than Polaris" },
            { text: "The Sanskrit translations of the Greek names, coined after Greek astronomy reached India", diagnoses: "Indian star names assumed to be translations of Greek ones — the naming is independent and often older" }
        ],
        explain: "One sky, two map legends. The naming is independent, not derivative, and sometimes finer: Arundhati–Vasishtha marks the Mizar–Alcor pair as a couple — a naked-eye double you can still check tonight — which Greek astronomy never named as a pair at all.",
        status: "draft"
    },
    {
        id: "q-indian-star-names-02",
        concept: "indian-star-names",
        kind: "mcq",
        difficulty: 2,
        stem: "Arundhati–Vasishtha is the classic naked-eye test in the Indian sky. Which pair of stars is it, and where do you look?",
        options: [
            { text: "Mizar and Alcor — the middle star of the Big Dipper's handle, which resolves into two for anyone with good eyes and a dark sky", correct: true },
            { text: "Two stars of the Dipper's bowl, named as a pair only after telescopes revealed them", diagnoses: "Indian star names assumed to postdate telescopic astronomy" },
            { text: "Dhruva and its faint companion, near the celestial pole", diagnoses: "Arundhati–Vasishtha misplaced onto Polaris; the pair is in the Dipper's handle" },
            { text: "A pair in Orion, corresponding to the Greek naming of the belt", diagnoses: "Indian star names assumed to be translations of Greek ones, mapped onto Greek asterisms" }
        ],
        explain: "Mizar (ζ UMa) and Alcor, about 12 arcminutes apart, in the Dipper's handle. It doubles as an eyesight and transparency test, and it is a genuinely independent observation: the pair was named as a couple in the Indian tradition long before anyone put a lens on it.",
        status: "draft"
    },
    {
        id: "q-nakshatra-01",
        concept: "nakshatra",
        kind: "mcq",
        difficulty: 2,
        stem: "The ecliptic gets divided into 12 rashis and also into 27 nakshatras. What is a nakshatra, precisely?",
        options: [
            { text: "A fixed 13°20′ segment of the ecliptic — 360/27 — cut to the Moon's daily step of about 13° against the stars, and named for a marker star (yogatara) that lies in it", correct: true },
            { text: "The 12 rashis renamed in Sanskrit — the same divisions under different labels", diagnoses: "27 nakshatras believed to be the 12 rashis renamed — they are a different division entirely" },
            { text: "A constellation, whose boundaries follow the shape of the star pattern it is named for", diagnoses: "Nakshatra taken as a constellation rather than a fixed 13°20′ ecliptic segment" },
            { text: "One of 27 divisions chosen because 27 is a traditionally auspicious number", diagnoses: "27 assumed arbitrary rather than set by the Moon's 27.3-day sidereal circuit" }
        ],
        explain: "The arithmetic is the argument. The Moon returns to the same star in about 27.3 days, so it advances roughly 13° per night — divide 360° by 27 and each segment is one night's travel. The rashis divide the same ecliptic by 12, cut to the Sun's monthly step. Different divisor, different body, same circle.",
        status: "draft"
    },
    {
        id: "q-tithi-01",
        concept: "tithi",
        kind: "mcq",
        difficulty: 2,
        stem: "A tithi is often glossed in English as 'lunar day'. How long is one, and what sets its length?",
        options: [
            { text: "Anywhere from about 19 to 26 hours — a tithi ends when the Moon has gained 12° of elongation on the Sun, and the Moon's speed varies around its elliptical orbit", correct: true },
            { text: "Exactly 24 hours — tithi is simply the Indian word for a day", diagnoses: "Tithi taken as a synonym for a civil day rather than an angle-defined interval" },
            { text: "Exactly one thirtieth of 30 days, since 30 tithis make a month", diagnoses: "30 tithis assumed to make a 30-day month — they make one synodic month, about 29.5 days" },
            { text: "Exactly 12 hours, one for each degree of elongation gained", diagnoses: "Tithi length confused with the 12° definition itself" }
        ],
        explain: "This is the key structural point of the Indian calendar: a tithi is an ANGLE interval, not a time interval. 30 × 12° = 360°, one new moon to the next, about 29.5 days. Because the Moon's angular speed varies, the tithis fill that unevenly — hence the 19-to-26-hour spread.",
        status: "draft"
    },
    {
        id: "q-tithi-02",
        concept: "tithi",
        kind: "mcq",
        difficulty: 3,
        stem: "A panchanga shows a tithi that begins after sunrise and ends before the next sunrise, so no sunrise falls inside it — that date's tithi is skipped (kshaya). How is that possible?",
        options: [
            { text: "Tithis vary in length, so a short one (near 19 hours) can start and finish entirely between two sunrises, while a long one (near 26 hours) can span two sunrises and repeat (adhika)", correct: true },
            { text: "It is a computational error in that panchanga — a date always carries exactly one tithi", diagnoses: "Each date assumed to carry exactly one tithi — kshaya and adhika tithis are real" },
            { text: "The Moon was invisible that day, so the tithi could not be observed and was dropped", diagnoses: "Tithi treated as an observation rather than a computed angular interval" },
            { text: "Tithis are all 24 hours, so the skip must come from a leap-day adjustment in the civil calendar", diagnoses: "Tithi taken as a fixed 24-hour day, with the mismatch blamed on the civil calendar" }
        ],
        explain: "Kshaya and adhika tithis fall directly out of the definition and are computed, not fudged. If tithis were fixed-length they could not do this. This is what an angle-based calendar costs — and it is also the check that a student has actually understood the definition rather than memorised the word.",
        status: "draft"
    },
    {
        id: "q-panchanga-01",
        concept: "panchanga",
        kind: "mcq",
        difficulty: 2,
        stem: "A panchanga lists five quantities each day: vara, tithi, nakshatra, yoga, karana. What is the document?",
        options: [
            { text: "A computed almanac — all five limbs are functions of the Sun's and the Moon's longitudes on that day, which is to say an ephemeris in cultural form", correct: true },
            { text: "An astrological text, since that is what people consult it for", diagnoses: "Panchanga taken as astrology rather than a computed almanac; the astrological reading is one use of the table, not the table" },
            { text: "Five separate traditions bundled into one book over the centuries", diagnoses: "Five limbs assumed unrelated — all five come from the same two longitudes" },
            { text: "A table copied forward from classical texts, preserved unchanged for accuracy", diagnoses: "Panchanga assumed copied forward — a drik panchanga is recomputed from actual positions" }
        ],
        explain: "Take the Sun's longitude and the Moon's longitude: tithi is their difference in 12° steps, nakshatra is the Moon's longitude in 13°20′ steps, yoga is their sum in 13°20′ steps, karana is half a tithi, and vara is the weekday. Five outputs, two inputs. A drik ('observed') panchanga recomputes these from actual positions each year and openly disagrees with the older approximations — a data table that publishes its own corrections.",
        status: "draft"
    },
    {
        id: "q-citizen-science-01",
        concept: "citizen-science",
        kind: "mcq",
        difficulty: 1,
        stem: "The camp ends tomorrow. A student owns binoculars, no telescope, and lives under a suburban sky. What can she realistically contribute to actual research?",
        options: [
            { text: "A great deal — AAVSO variable-star estimates from binoculars, IMO meteor counts by naked eye, occultation timings, or Zooniverse classifications all feed straight into professional work", correct: true },
            { text: "Nothing yet — she needs a telescope and a CCD before her measurements would be worth submitting", diagnoses: "Expensive kit believed necessary to contribute — a naked-eye meteor count is real data" },
            { text: "She can observe for her own enjoyment, but amateur numbers are a hobbyist exercise nobody really uses", diagnoses: "Amateur measurements dismissed as unused — AAVSO light curves and occultation timings feed real papers" },
            { text: "Very little on her own — one observer's handful of estimates cannot matter against professional data", diagnoses: "One observer's contribution thought negligible — these programmes work by pooling many modest observations" }
        ],
        explain: "These programmes exist precisely because they buy what money cannot: coverage. No professional telescope gets time to watch one variable star every clear night for thirty years, and hundreds of amateurs do exactly that. The pooling is the method, not a consolation prize.",
        status: "draft"
    },

    // ---------------- Session 9 — First frames ----------------

    {
        id: "q-exposure-triangle-01",
        concept: "exposure-triangle",
        kind: "mcq",
        difficulty: 2,
        stem: "Your 20-second frame of the Milky Way is too dark. A friend says \"just push the ISO to 12800, that makes the sensor more sensitive.\" Is he right?",
        options: [
            { text: "No — ISO amplifies the signal after capture, so it brightens the noise right along with the stars; the sensor collected the same photons either way", correct: true },
            { text: "Yes — higher ISO makes the sensor physically more sensitive, so it catches more light", diagnoses: "ISO believed to make the sensor more sensitive — it amplifies after capture" },
            { text: "No — instead open the aperture as wide as it goes, which is always the better move", diagnoses: "Wider aperture assumed always better — wide open costs star sharpness and smears the corners into coma" },
            { text: "No — just leave the shutter open for two minutes instead, which collects genuinely more light", diagnoses: "Longer shutter assumed always to mean more light — past the trailing limit on a fixed tripod the stars only smear" }
        ],
        explain: "Only aperture and shutter change how many photons land. ISO is a gain knob applied afterwards, which is why a brighter high-ISO frame is not a better-exposed frame. And note the two wrong 'fixes' — both are real options with real costs: wide open smears the corners, longer than the trailing limit smears the stars.",
        status: "draft"
    },
    {
        id: "q-exposure-triangle-02",
        concept: "exposure-triangle",
        kind: "mcq",
        difficulty: 3,
        stem: "You are shooting a nightscape at 20mm on a fixed tripod and the frame is a stop underexposed. Aperture is already at f/2.8 (the lens opens to f/1.8), shutter is at the trailing limit, ISO is 1600. Which move costs you least?",
        options: [
            { text: "Raise the ISO a stop — it adds noise but keeps the stars round; the shutter is capped by Earth's rotation and opening to f/1.8 would smear the corner stars into coma", correct: true },
            { text: "Open up to f/1.8 — the lens's widest setting is always its best setting", diagnoses: "Wider aperture assumed always better — wide open costs sharpness and corner coma" },
            { text: "Double the shutter to 40 seconds — more time is always more light", diagnoses: "Longer shutter assumed always to mean more light — past the trailing limit the extra seconds only smear each star" },
            { text: "Raise the ISO a stop, since a more sensitive sensor gathers the missing photons cleanly", diagnoses: "ISO believed to make the sensor more sensitive rather than amplify after capture" }
        ],
        explain: "The right move and one wrong reason for it both appear here, on purpose — a student who picks the last option has the right hand on the dial and the wrong physics in mind. Every leg of the triangle is already at a hard limit except gain, so gain is where the stop comes from and noise is the price.",
        status: "draft"
    },
    {
        id: "q-nightscapes-01",
        concept: "nightscapes",
        kind: "mcq",
        difficulty: 2,
        stem: "The 500 rule says: max seconds before trailing = 500 / focal length. On a 20mm lens that gives 25 seconds. How should you treat that number tonight?",
        options: [
            { text: "As a rough film-era guide — on a modern high-resolution sensor stars trail at roughly half that, which is why the tighter NPF rule exists; shoot it and zoom in to check", correct: true },
            { text: "As exact — it is a rule, so 25 seconds is the precise threshold", diagnoses: "500 rule treated as exact rather than a rough film-era guide" },
            { text: "As a floor you can exceed by lowering the ISO, which keeps the stars from trailing", diagnoses: "Trailing believed to depend on exposure level — the limit is set by Earth's rotation, not brightness" },
            { text: "As applying equally everywhere in the frame, so if the centre is clean the corners are too", diagnoses: "Trailing rate assumed uniform across the sky — equatorial stars smear fastest, polar stars barely move" }
        ],
        explain: "The rule was calibrated to what looked sharp on a film print. Pixel-peep a 45 MP sensor and half that time already shows elongation. And trailing is set by Earth's rotation, so no exposure setting negotiates with it — past the limit you need tracking. Note too that a star near the pole barely moves in the same 20 seconds that smears one on the celestial equator.",
        status: "draft"
    },
    {
        id: "q-nightscapes-02",
        concept: "nightscapes",
        kind: "practical",
        difficulty: 2,
        stem: "Frame and shoot one 20-second nightscape — sky over a real foreground — then bring up its histogram and tell the instructor what it says.",
        answer: "Watch for: camera on the tripod and genuinely still (no hand on it at release — timer or remote); manual mode, focus set on a bright star at live-view magnification rather than left on autofocus or on the infinity mark; a deliberate foreground, not sky alone; exposure at or under the trailing limit for the focal length in use. On the histogram check, the student should read the peak's position — bunched hard against the left means underexposed and the shadows will fall apart when lifted; touching the right means blown highlights. The peak wants to sit off the left wall. Then have them zoom to 100% on a corner and on a star near the pole, and say whether the stars are round — and why the two corners differ. Push back if they propose fixing an underexposure by extending the shutter past the trailing limit.",
        explain: "The histogram is the only honest feedback on a night shoot: the rear screen looks gorgeous in the dark and lies about exposure every time. This is the frame everyone takes home.",
        status: "draft"
    },
    {
        id: "q-star-trail-imaging-01",
        concept: "star-trail-imaging",
        kind: "mcq",
        difficulty: 2,
        stem: "You want two hours of star trails. What do you actually shoot, and what will the frame show?",
        options: [
            { text: "Hundreds of 30-second frames back to back, blended later in lighten mode — one two-hour exposure just fogs on skyglow; and the arcs are Earth turning under a fixed camera, which is why they curve around the celestial pole", correct: true },
            { text: "One two-hour exposure in bulb mode — the trails need the shutter open the whole time to draw continuously", diagnoses: "Star trails believed to need one enormous exposure — a two-hour frame fogs on skyglow" },
            { text: "Hundreds of short frames stacked — and the arcs record the stars themselves slowly moving across the sky", diagnoses: "Trails believed to show the stars actually moving — it is Earth turning under the camera" },
            { text: "Hundreds of short frames stacked, aimed anywhere you like — the arcs come out as concentric rings whatever direction you point", diagnoses: "Concentric circles expected in any direction — only a frame centred near Polaris gives rings" }
        ],
        explain: "Three of these four get part of it. The technique is short subs blended in lighten mode (skyglow accumulates in a long exposure, the trails do not get brighter); the physics is Earth's rotation, not stellar motion; and the geometry means only a frame centred near Polaris gives rings — aim east or west and the same stars draw near-straight streaks.",
        status: "draft"
    },
    {
        id: "q-star-trail-imaging-02",
        concept: "star-trail-imaging",
        kind: "practical",
        difficulty: 3,
        stem: "Set up a star-trail sequence: find Polaris by eye, frame it with a foreground, and start an intervalometer run of 30-second subs. Before you walk away, tell the instructor what shape the trails will take and why.",
        answer: "Watch for: Polaris found by the student from the Dipper's pointers, not from a phone app; the camera composed so the pole sits in frame with a deliberate foreground; manual focus set on a star; intervalometer running with the gap between subs as short as the camera allows (long gaps break the arcs into dashes — ask why they chose their interval); exposure and ISO fixed manually so subs match. The verbal check is the real assessment: they should say the arcs will be concentric circles centred on the pole BECAUSE the camera is fixed and Earth is turning under it — not because the stars are moving — and should predict that a frame aimed east instead would give near-straight streaks. Bonus if they note the trails near the pole will be short arcs and those farther out long ones, in the same elapsed time.",
        explain: "This closes the camp's circle: the pole star they found by eye on night one is the point every arc turns around on the last night. If they can say why the rings are centred there, the whole week's diurnal-motion material has landed.",
        status: "draft"
    }

);

window.QUIZZES.push(

    {
        id: "practical-s5",
        name: "Session 5 — Distances, and how anyone knows",
        purpose: "session",
        course: "quiz-practical-intensive",
        session: 5,
        blurb: "They arrived knowing Sirius is 8.6 light years away. This checks whether the session turned that fact back into a measurement — parallax as geometry, the magnitude scale running backwards, and 1/d² quartering rather than halving.",
        duration: 15,
        questions: [
            "q-lightyear-scale-01",
            "q-stellar-parallax-01",
            "q-lightyear-scale-02",
            "q-inverse-square-01",
            "q-luminosity-absmag-01",
            "q-star-colors-temp-01",
            "q-atmospheric-extinction-01",
            "q-luminosity-absmag-02",
            "q-stellar-parallax-02"
        ],
        status: "draft"
    },

    {
        id: "practical-s6",
        name: "Session 6 — The Moon arrives",
        purpose: "session",
        course: "quiz-practical-intensive",
        session: 6,
        blurb: "Terminator over full moon, impacts over volcanoes, 59% over 50% — plus the two things they should be able to DO: drive the scope to the terminator and bring back a focused phone frame of it.",
        duration: 15,
        questions: [
            "q-lunar-observing-01",
            "q-lunar-geology-01",
            "q-lunar-libration-01",
            "q-phone-astrophotography-01",
            "q-lunar-observing-02",
            "q-phone-astrophotography-02"
        ],
        status: "draft"
    },

    {
        id: "practical-s7",
        name: "Session 7 — The Sun, safely",
        purpose: "session",
        course: "quiz-practical-intensive",
        session: 7,
        blurb: "SAFETY GATE, not a scored paper. The first three questions are pass/fail: a student who fits an eyepiece filter, trusts smoked glass, or thinks a quick glance is survivable does not touch a telescope in daylight until retaught and rechecked. Mark these before the Sun is up.",
        duration: 20,
        questions: [
            "q-solar-observing-01",
            "q-solar-observing-02",
            "q-solar-observing-03",
            "q-solar-activity-01",
            "q-solar-structure-01",
            "q-solar-activity-02",
            "q-solar-structure-02"
        ],
        status: "draft"
    },

    {
        id: "practical-s8",
        name: "Session 8 — Indian sky, and what to do next",
        purpose: "session",
        course: "quiz-practical-intensive",
        session: 8,
        blurb: "Positional astronomy, not folklore: 360/27 = 13°20′, 12° of elongation per tithi, five limbs from two longitudes. Plus the recognition that Saptarishi is the Dipper they already found — and that the camp has an afterwards.",
        duration: 15,
        questions: [
            "q-indian-star-names-01",
            "q-nakshatra-01",
            "q-tithi-01",
            "q-panchanga-01",
            "q-citizen-science-01",
            "q-indian-star-names-02",
            "q-tithi-02"
        ],
        status: "draft"
    },

    {
        id: "practical-s9",
        name: "Session 9 — Last night: first frames",
        purpose: "session",
        course: "quiz-practical-intensive",
        session: 9,
        blurb: "ISO as gain not sensitivity, the 500 rule as a guide not a law, and trails as Earth turning under a fixed camera. Two of these are shot on the night — the histogram and the intervalometer run are the honest checks.",
        duration: 20,
        questions: [
            "q-exposure-triangle-01",
            "q-nightscapes-01",
            "q-star-trail-imaging-01",
            "q-nightscapes-02",
            "q-exposure-triangle-02",
            "q-star-trail-imaging-02"
        ],
        status: "draft"
    }

);
