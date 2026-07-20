// ============================================================
// Practical Astronomy Intensive — ENTRY CHECK.
//
// These students were selected from the Aryabhat Astronomy Quiz and
// have read the study material, so the camp is built on the premise
// that they arrive with the book astronomy already in hand. This paper
// tests whether that premise is true of THIS cohort. It is sat before
// Day 1, and it asks about nothing the camp teaches — only what the
// camp assumes. A paper that examined the syllabus would measure
// clairvoyance; QuizDB's scope check keeps us honest about that.
//
// THE ONE DESIGN RULE HERE: no distractor is filler. Every wrong
// option is a wrong model somebody actually holds — phases as Earth's
// shadow, seasons as distance, magnitude 5 as the bright one, Orion's
// stars as neighbours in space. Where the concept record documents the
// misconception, the distractor is that documented idea made pickable
// and `diagnoses` names it. Where it does not, the distractor is one
// we have watched selected students fall for, and `diagnoses` is us
// writing it down for the first time.
//
// So a marked paper does not say "the cohort averaged 62%". It says
// "eleven of them hold the shadow model of phases and nine think a
// magnitude 5 star is bright" — which is a Day 1 plan, not a number.
// ============================================================

window.QUESTIONS.push(

    // ---------- getting oriented on a real Earth ----------

    {
        id: "q-cardinal-directions-01",
        concept: "cardinal-directions",
        kind: "mcq",
        difficulty: 2,
        stem: "You are setting up in the field and want to mark due east on the ground. Someone says 'easy — just note where the Sun came up this morning.' When is that actually correct?",
        options: [
            { text: "Only near the two equinoxes; the rest of the year sunrise drifts north or south of due east", correct: true },
            { text: "Every day of the year — the Sun always rises due east and sets due west", diagnoses: "Sunrise fixed at due east — true only at the equinoxes" },
            { text: "Any day, provided you are in the northern hemisphere", diagnoses: "Sunrise-due-east treated as a hemisphere effect rather than a date effect" },
            { text: "Never — the Sun's rising point is random from day to day", diagnoses: "Solar rising point believed unpredictable; misses that the drift is a smooth yearly cycle" }
        ],
        explain: "The rising point swings north and south of east through the year with the tilt, crossing due east only at the equinoxes. A field team that marks east from a June sunrise is several degrees off.",
        status: "draft"
    },

    {
        id: "q-earth-sphere-01",
        concept: "earth-sphere",
        kind: "mcq",
        difficulty: 2,
        stem: "Without any spacecraft, photograph or modern instrument, which single observation most directly shows that the Earth is a sphere rather than a disc?",
        options: [
            { text: "Earth's shadow on the eclipsed Moon is always a circular arc, from every eclipse and every angle", correct: true },
            { text: "Photographs taken from orbit — you genuinely cannot establish it from the ground", diagnoses: "Believes the sphere needs a spacecraft; unaware the Greeks measured it from the ground by 240 BCE" },
            { text: "Nobody knew until Columbus sailed and failed to fall off the edge", diagnoses: "The flat-Earth-until-Columbus myth; the sphere was standard among educated Greeks by 350 BCE" },
            { text: "The fact that people in the southern hemisphere do not fall off", diagnoses: "Treats 'falling off' as a real objection; misses that down means toward the centre everywhere" }
        ],
        explain: "A disc would cast an oval or line-shaped shadow at most orientations. Only a sphere casts a round shadow every single time — Aristotle's argument, and still the cleanest one.",
        status: "draft"
    },

    {
        id: "q-latitude-longitude-01",
        concept: "latitude-longitude",
        kind: "mcq",
        difficulty: 2,
        stem: "The camp site is given as 23°N, 77°E. Which statement about that pair of numbers is correct?",
        options: [
            { text: "23°N is measured north from the equator, which Earth's spin fixes; 77°E is measured from a prime meridian that people agreed on", correct: true },
            { text: "23°N is measured along a line running north–south, and 77°E along a line running east–west", diagnoses: "Latitude and longitude swapped — the lines run one way and measure the other" },
            { text: "Both the parallels of latitude and the meridians of longitude are parallel lines that never meet", diagnoses: "Meridians thought parallel; they converge and meet at the poles" },
            { text: "Greenwich is the natural zero for longitude in the same way the equator is the natural zero for latitude", diagnoses: "Prime meridian treated as physically fixed rather than chosen by committee" }
        ],
        explain: "The equator is handed to us by the rotation axis; the prime meridian is a convention. Latitude lines circle east–west but report north–south position, and vice versa.",
        status: "draft"
    },

    // ---------- reading the naked-eye sky ----------

    {
        id: "q-planets-wanderers-01",
        concept: "planets-wanderers",
        kind: "mcq",
        difficulty: 1,
        stem: "You are outside with no chart and want to tell whether a bright point of light is a planet or a star. What is the most reliable naked-eye clue?",
        options: [
            { text: "It shines with a steady light while nearby stars twinkle, and over weeks it drifts against the constellation pattern", correct: true },
            { text: "Planets are always the brightest objects in the sky, so brightness alone settles it", diagnoses: "Brightness used as the planet test — Sirius outshines Saturn" },
            { text: "Planets are always visible somewhere in the sky on any given night", diagnoses: "Assumes all planets are always up; misses that they can be daylight objects or below the horizon" },
            { text: "Planets appear as small discs to the naked eye, while stars appear as points", diagnoses: "Expects a naked-eye disc; the discs need a telescope" }
        ],
        explain: "Steadiness plus drift is the classic pair. A planet is an extended disc, too small to see but big enough that the atmosphere cannot make it flicker the way it does a true point source.",
        status: "draft"
    },

    {
        id: "q-constellations-01",
        concept: "constellations",
        kind: "mcq",
        difficulty: 2,
        stem: "Are the seven bright stars that make up the figure of Orion close to one another in space?",
        options: [
            { text: "No — they lie at wildly different distances and only line up as a pattern from our particular viewpoint", correct: true },
            { text: "Yes — a constellation is a group of stars that formed together and travel together", diagnoses: "Constellation as a physical group — they are a line-of-sight accident, often hundreds of light years apart" },
            { text: "Yes — a constellation is exactly the joined-up figure, so anything in it belongs to it", diagnoses: "Constellation as the stick figure; since 1930 each of the 88 is a bounded region of sky" },
            { text: "Yes, and that is why every culture independently drew the same figures", diagnoses: "Patterns believed obvious and universal — the same stars are a Bear, a Saptarishi and a plough" }
        ],
        explain: "Orion's stars run from roughly 250 to over 1,000 light years away. The figure is a projection effect; step sideways a few hundred light years and it dissolves.",
        status: "draft"
    },

    {
        id: "q-ecliptic-zodiac-01",
        concept: "ecliptic-zodiac",
        kind: "mcq",
        difficulty: 1,
        stem: "What is the ecliptic?",
        options: [
            { text: "The Sun's yearly path against the background stars — the line the Moon and planets also stay close to", correct: true },
            { text: "The daily path the Sun traces across the sky from rising to setting", diagnoses: "Ecliptic confused with the diurnal arc — a daily path, not a yearly one against the stars" },
            { text: "The circle on the sky where eclipses are visible from Earth", diagnoses: "Ecliptic read as 'where eclipses happen' from the name alone" },
            { text: "The plane of the Moon's orbit around the Earth", diagnoses: "Ecliptic confused with the lunar orbital plane, which is tilted about 5° from it" }
        ],
        explain: "The ecliptic is the Sun's annual track through the zodiac constellations. Because the planets orbit near the same plane, they are always found within a few degrees of it — which is why it is the first line to learn on a chart.",
        status: "draft"
    },

    // ---------- the Moon ----------

    {
        id: "q-moon-phases-01",
        concept: "moon-phases",
        kind: "mcq",
        difficulty: 2,
        stem: "What makes the Moon a crescent one week and a gibbous the next?",
        options: [
            { text: "The Sun always lights exactly half the Moon; the phase is how much of that lit half is turned toward us as the Moon goes round", correct: true },
            { text: "The Earth's shadow falls across the Moon and covers part of it", diagnoses: "Phases as Earth's shadow — that is an eclipse, and it would then have to happen every single full moon" },
            { text: "The Moon genuinely changes shape, thinning and fattening through the month", diagnoses: "Moon believed to change shape, or a piece of it to go missing" },
            { text: "Clouds and the thickness of the atmosphere hide part of the Moon from us", diagnoses: "Phases attributed to Earth's atmosphere rather than to geometry" }
        ],
        explain: "Half the Moon is lit at all times, no exceptions. The phase is a viewing-angle fact about how much of that lit half faces Earth — no shadow is involved anywhere in the cycle.",
        status: "draft"
    },

    {
        id: "q-moon-phases-02",
        concept: "moon-phases",
        kind: "mcq",
        difficulty: 2,
        stem: "A student says 'we cannot schedule Moon work before sunset, the Moon is a night-time object.' Is that right?",
        options: [
            { text: "No — the Moon is above the horizon in daylight about half the time; a first-quarter Moon is already high in the afternoon", correct: true },
            { text: "Yes — the Moon only rises once the Sun has set", diagnoses: "Moon as a night-time object — it is up in daylight half the time" },
            { text: "Yes — the Moon is far too faint to be seen while the Sun is up, at any phase", diagnoses: "Assumes the daylight sky always drowns the Moon; a gibbous Moon is easy in the afternoon" },
            { text: "No — but only because a full Moon can occasionally be caught just before sunset", diagnoses: "Concedes the daytime Moon only as a rare edge case, still tying the Moon to the night" }
        ],
        explain: "Phase and rise time lock together: a first-quarter Moon rises around noon and sets around midnight, so its best hours are the afternoon. The camp's lunar session depends on this being understood.",
        status: "draft"
    },

    {
        id: "q-moon-orbit-01",
        concept: "moon-orbit",
        kind: "mcq",
        difficulty: 2,
        stem: "The face of the Moon we never see from Earth is often called the 'dark side'. What is wrong with that name?",
        options: [
            { text: "Nothing about it is dark — it gets exactly as much sunlight as the near side, and is fully lit at new moon. It is unseen, not unlit", correct: true },
            { text: "Nothing is wrong; it never receives sunlight, which is precisely why it is called dark", diagnoses: "Far side believed permanently unlit — the 'dark side' name taken literally" },
            { text: "The name is fine — the whole Moon is dark, since it makes no light of its own", diagnoses: "Dodges the question by redefining 'dark'; misses that the far side is sunlit half the month" },
            { text: "It is wrong because there is no fixed far side at all — the Moon turns and we see all of it over a month", diagnoses: "Overcorrects into denying synchronous rotation; the same face really does stay turned to us" }
        ],
        explain: "Sunlight falls on the whole Moon in turn, and at new moon the far side is the fully lit one. 'Far side' is the accurate name; 'dark side' just means we cannot see it from here.",
        status: "draft"
    },

    {
        id: "q-lunar-eclipse-01",
        concept: "lunar-eclipse",
        kind: "mcq",
        difficulty: 2,
        stem: "A totally eclipsed Moon, deep inside Earth's umbra, glows a dull copper red rather than going black. Why?",
        options: [
            { text: "Sunlight bent through Earth's atmosphere still reaches it — the red is every sunrise and sunset on Earth at once", correct: true },
            { text: "It should go black; any red is just the eye tiring or the camera adding colour", diagnoses: "Expects a black eclipsed Moon; unaware of the refracted sunlight that reaches the umbra" },
            { text: "The Moon's own iron-rich rock glows red once the sunlight is cut off", diagnoses: "Colour attributed to the lunar surface rather than to Earth's atmosphere" },
            { text: "The Earth's shadow is itself reddish, and it tints whatever it falls on", diagnoses: "Shadow imagined as a coloured thing rather than an absence of direct light" }
        ],
        explain: "Earth's atmosphere refracts sunlight into the umbra and scatters the blue out of it on the way, so what arrives is red. That colour is a measurement of our own atmosphere, made 384,000 km away.",
        status: "draft"
    },

    {
        id: "q-solar-eclipse-01",
        concept: "solar-eclipse",
        kind: "mcq",
        difficulty: 3,
        stem: "The Moon passes between Earth and Sun every month at new moon, and through Earth's shadow line every month at full moon. So why don't we get a solar eclipse and a lunar eclipse every single month?",
        options: [
            { text: "The Moon's orbit is tilted about 5° to the ecliptic, so most months it passes above or below the line and the shadows miss", correct: true },
            { text: "We do get one of each every month — most are simply too small or too brief for anyone to notice", diagnoses: "Expects an eclipse at every new and full moon; missing the 5° tilt entirely" },
            { text: "The Moon's orbit is a long ellipse, so it is usually much too far away for its shadow to reach", diagnoses: "Textbook diagram read literally as a long ellipse; the orbit is very nearly circular" },
            { text: "Earth's rotation carries us out of the way before the shadow can arrive", diagnoses: "Eclipse geometry confused with the daily spin" }
        ],
        explain: "The 5° tilt is the whole answer, and it is why eclipses come in seasons rather than monthly. This is also why the camp's moon schedule can be computed a year ahead.",
        status: "draft"
    },

    // ---------- Earth, Sun, seasons ----------

    {
        id: "q-seasons-01",
        concept: "seasons",
        kind: "mcq",
        difficulty: 3,
        stem: "'It is summer in India because Earth is closer to the Sun in those months.' What single observation kills this explanation outright?",
        options: [
            { text: "Distance is shared by the whole planet, so it would make both hemispheres summer at once — yet India's summer is Australia's winter", correct: true },
            { text: "Nothing kills it; the distance explanation is essentially correct", diagnoses: "Holds the distance model of seasons" },
            { text: "Earth's orbit is a perfect circle, so its distance to the Sun never changes at all", diagnoses: "Rejects the distance model with a false fact — the orbit is slightly eccentric, it is just not the cause" },
            { text: "In summer the tilt leans the whole Earth toward the Sun, which is a different mechanism", diagnoses: "Whole Earth imagined tipping toward the Sun; one hemisphere leans in exactly as much as the other leans away" }
        ],
        explain: "The opposite seasons of the two hemispheres are fatal to any shared-distance cause. The tilt gives each hemisphere its own answer: longer days and steeper, more concentrated midday sunlight.",
        status: "draft"
    },

    {
        id: "q-sun-as-star-01",
        concept: "sun-as-star",
        kind: "mcq",
        difficulty: 1,
        stem: "How does the Sun compare with the stars visible on a clear night?",
        options: [
            { text: "It is an ordinary star — unremarkable in size and temperature — that looks utterly different only because it is so much nearer", correct: true },
            { text: "The Sun is a fundamentally different kind of object from a star; stars burn, the Sun shines", diagnoses: "Sun not recognised as a star at all — the oldest and most stubborn of these" },
            { text: "The Sun is by far the largest and hottest object of its type known", diagnoses: "Sun taken as exceptional; it is a middling G2 dwarf, outshone by most of the night's bright stars" },
            { text: "The Sun is a star, but a uniquely small and cool one — a runt among stars", diagnoses: "Overcorrects into the Sun as unusually feeble; it sits comfortably mid-range" }
        ],
        explain: "The Sun is a G2 main-sequence star, roughly 5,800 K, one of a few hundred billion in this galaxy. Every point of light out there is somebody's Sun.",
        status: "draft"
    },

    // ---------- light, optics, brightness ----------

    {
        id: "q-light-travel-01",
        concept: "light-travel",
        kind: "short",
        difficulty: 1,
        stem: "A student writes 'Proxima Centauri is 4.2 light-years away, so it takes 4.2 years to get there.' Two things are wrong with that sentence. Name them in one line.",
        answer: "A light-year is a DISTANCE, not a time — the distance light covers in a year. And 4.2 years is only the trip time for something moving at the speed of light; no spacecraft comes remotely close, so the real journey is tens of thousands of years. Accept any answer that names the unit as a distance AND flags that only light itself makes it in 4.2 years.",
        explain: "The unit's name has a time word in it, which is exactly why it is worth checking. Whoever thinks a light-year is a time will misread every distance in the Day 3 session.",
        status: "draft"
    },

    {
        id: "q-spectrum-color-01",
        concept: "spectrum-color",
        kind: "mcq",
        difficulty: 2,
        stem: "White sunlight goes into a prism and a band of colours comes out, red through violet. What has the prism done?",
        options: [
            { text: "Separated colours that were already present — each wavelength is bent by a different amount, violet the most", correct: true },
            { text: "Added colour to the light; the glass tints white light as it passes through", diagnoses: "Prism believed to manufacture colour rather than separate what is already mixed in" },
            { text: "Broken the white light into new colours that did not exist before it entered", diagnoses: "Dispersion read as creation, not separation — the pre-Newton view" },
            { text: "Reflected different colours off its faces at different angles", diagnoses: "Dispersion attributed to reflection rather than to wavelength-dependent refraction" }
        ],
        explain: "White is a mixture; the prism only sorts it by wavelength, and a second prism recombines the fan back into white. That reversal was Newton's decisive move.",
        status: "draft"
    },

    {
        id: "q-lenses-mirrors-01",
        concept: "lenses-mirrors",
        kind: "mcq",
        difficulty: 2,
        stem: "Two telescope objectives have the same focal length, but one mirror is twice the diameter of the other. What does the extra diameter buy you?",
        options: [
            { text: "Four times the light collected — the area scales with the square of the diameter — and a finer resolving limit", correct: true },
            { text: "Twice the magnification, since a bigger objective magnifies more", diagnoses: "Objective diameter confused with magnification; magnification comes from the focal length ratio, not the aperture" },
            { text: "Twice the light, since the light gathered scales with the diameter", diagnoses: "Light-gathering taken as linear in diameter rather than in area — misses the square" },
            { text: "A brighter image but a larger one too, since the image scale grows with the objective", diagnoses: "Image scale believed set by aperture; it is set by focal length, which is unchanged here" }
        ],
        explain: "The objective is a light bucket, and a bucket's catch goes as its area — double the diameter, quadruple the light. Focal length is untouched, so the image scale at the focus is identical.",
        status: "draft"
    },

    {
        id: "q-apparent-magnitude-01",
        concept: "apparent-magnitude",
        kind: "mcq",
        difficulty: 1,
        stem: "Star A has apparent magnitude 1. Star B has apparent magnitude 5. Which looks brighter in the sky?",
        options: [
            { text: "Star A — the scale runs backwards, and smaller numbers mean brighter", correct: true },
            { text: "Star B — 5 is a bigger number, so it is the brighter star", diagnoses: "Reads the magnitude scale forwards; has not registered that it is inverted" },
            { text: "Star B — 5 is five times brighter than 1", diagnoses: "Scale read forwards AND as linear; wrong on both counts at once" },
            { text: "Neither — apparent magnitude describes colour, not brightness", diagnoses: "Apparent magnitude confused with a colour or spectral index" }
        ],
        explain: "The scale is Hipparchus's, and he ranked the brightest stars 'first magnitude'. Smaller is brighter, all the way down to the Sun at −26.7. This single question separates the memorisers from the observers faster than any other on the paper.",
        status: "draft"
    },

    {
        id: "q-apparent-magnitude-02",
        concept: "apparent-magnitude",
        kind: "mcq",
        difficulty: 3,
        stem: "The faintest stars a good naked eye can catch from a dark site are about magnitude +6. Vega sits at about magnitude 0. How much more light reaches your eye from Vega?",
        options: [
            { text: "About 250 times more — 5 magnitudes is a factor of 100, and each further magnitude multiplies by about 2.5", correct: true },
            { text: "About 6 times more, since the difference is 6 magnitudes", diagnoses: "Magnitude difference treated as a brightness ratio — the scale read as linear, not logarithmic" },
            { text: "About 12 times more — each magnitude doubles the brightness", diagnoses: "Knows the scale is multiplicative but has the wrong step; the step is ~2.512, not 2" },
            { text: "About 100 times more — 6 magnitudes is defined as exactly 100×", diagnoses: "Remembers the 100× fact but attaches it to the wrong interval; 5 magnitudes is 100×, not 6" }
        ],
        explain: "Five magnitudes is defined as exactly 100×, so one magnitude is the fifth root of 100, about 2.512. Six magnitudes is 100 × 2.512 ≈ 250. A student who answers 6 has memorised the word 'magnitude' and nothing under it.",
        status: "draft"
    },

    // ---------- how anyone knows: models and scale ----------

    {
        id: "q-heliocentric-model-01",
        concept: "heliocentric-model",
        kind: "mcq",
        difficulty: 3,
        stem: "Putting the Sun at the centre instead of the Earth was accepted because it explained, cleanly, things the geocentric model could only patch. Which pair is the strongest evidence?",
        options: [
            { text: "Retrograde loops fall out for free as Earth overtakes an outer planet, and Venus shows a full cycle of phases including a small gibbous", correct: true },
            { text: "Only the heliocentric model can account for day and night, and for the seasons", diagnoses: "Thinks geocentrism failed on day/night and seasons; both models handle those, so this misses what was actually at stake" },
            { text: "The geocentric model was simply unable to predict where the planets would be, so its forecasts were useless", diagnoses: "Ptolemy imagined as predictively hopeless; his system worked well for centuries, which is why the argument was hard" },
            { text: "Telescopes revealed the Earth visibly moving against the background stars", diagnoses: "Invents direct observation of Earth's motion; stellar parallax was far too small to detect until 1838" }
        ],
        explain: "Retrograde motion becomes a parallax effect of our own overtaking, needing no epicycle; and Venus's gibbous phase is impossible if Venus never passes beyond the Sun. Those two, together, are what settled it.",
        status: "draft"
    },

    {
        id: "q-keplers-laws-01",
        concept: "keplers-laws",
        kind: "mcq",
        difficulty: 2,
        stem: "Kepler's second law says a planet sweeps out equal areas in equal times. What does that mean for the planet on the ground?",
        options: [
            { text: "It moves fastest at perihelion, closest to the Sun, and slowest at aphelion — its speed is not constant round the orbit", correct: true },
            { text: "It moves at a constant speed, which is what keeps the swept areas equal", diagnoses: "Equal areas read as equal speed; the law says exactly the opposite" },
            { text: "It covers equal distances along its path in equal times", diagnoses: "Equal AREAS confused with equal arc lengths — the substitution that empties the law of content" },
            { text: "Every planet sweeps out the same area per unit time as every other planet", diagnoses: "The law read across planets rather than within one orbit" }
        ],
        explain: "A thin, long triangle near aphelion needs a long arc to match the fat, short triangle near perihelion — so the planet must be quicker when close. It is angular momentum, discovered a lifetime before anyone could say so.",
        status: "draft"
    },

    {
        id: "q-scale-of-solar-system-01",
        concept: "scale-of-solar-system",
        kind: "short",
        difficulty: 3,
        stem: "Every textbook diagram of the solar system is a lie about one thing in particular. Say in one line what a to-scale diagram would look like instead, and why no book prints one.",
        answer: "It would be almost entirely empty: with Earth as a peppercorn the Sun is a football about 25 m away and Neptune is 750 m down the road — the planets would be invisible specks on a page mostly of blank space. No book prints one because sizes and distances cannot both be shown to scale on one page. Accept any answer that names the emptiness and the impossibility of holding both scales at once.",
        explain: "Textbook diagrams shrink the distances by hundreds of times more than the sizes, and students absorb a crowded solar system. The emptiness is the actual fact, and it is the fact the camp's scale walk exists to fix.",
        status: "draft"
    },

    // ---------- the deep sky they have read about ----------

    {
        id: "q-catalogs-messier-01",
        concept: "catalogs-messier",
        kind: "mcq",
        difficulty: 1,
        stem: "Why does Charles Messier's catalogue of 110 objects exist at all?",
        options: [
            { text: "He was a comet hunter, and it is a list of fuzzy things that are NOT comets — kept so he would stop being fooled by them", correct: true },
            { text: "It was intended from the start as a best-of list of the finest deep-sky objects for amateurs", diagnoses: "Messier's list read as curated for beauty; it is a comet hunter's list of nuisances, useful by accident" },
            { text: "It is a complete catalogue of every deep-sky object visible from Earth", diagnoses: "Believes the Messier list is complete; the NGC alone adds 7,840 more, and it covers only the northern sky" },
            { text: "The objects share a common physical nature, which is why they were grouped together", diagnoses: "Expects the catalogue to be a physical class; it mixes nebulae, clusters and galaxies with nothing in common but looking fuzzy" }
        ],
        explain: "M1 through M110 are Messier's annoyances, listed so he could ignore them. That they turned out to be the finest objects in the northern sky is one of astronomy's better accidents.",
        status: "draft"
    },

    {
        id: "q-milky-way-structure-01",
        concept: "milky-way-structure",
        kind: "mcq",
        difficulty: 2,
        stem: "Why does the Milky Way appear as a band across the sky rather than a patch, or a spiral, or an even glow?",
        options: [
            { text: "We sit inside a flat disc, so looking along the disc we see stars piled deep in a line, and looking out of it we see few", correct: true },
            { text: "It is a distant spiral galaxy that happens to be edge-on to us", diagnoses: "The Milky Way band mistaken for an external galaxy; it is our own, seen from inside" },
            { text: "It is a band of gas and dust in Earth's upper atmosphere lit by starlight", diagnoses: "The band placed in the atmosphere rather than in the galaxy" },
            { text: "We sit at the centre of the galaxy, and the band is the crowded core surrounding us", diagnoses: "Places us at the galactic centre; we are about 27,000 ly out in a quiet spiral arm" }
        ],
        explain: "A flat disc seen from inside projects to a line on the sky. The band is our own galaxy's cross-section — and the direction of Sagittarius is thick with stars because that is where the centre lies.",
        status: "draft"
    },

    {
        id: "q-galaxies-01",
        concept: "galaxies",
        kind: "mcq",
        difficulty: 2,
        stem: "M31, the Andromeda Galaxy, is naked-eye visible from a dark site. What are you actually looking at?",
        options: [
            { text: "A separate island of hundreds of billions of stars, about 2.5 million light years away and larger than our own galaxy", correct: true },
            { text: "A large cloud of gas within the Milky Way, a few thousand light years off", diagnoses: "Galaxies placed inside the Milky Way — the pre-1925 'spiral nebula' view, before Hubble settled it" },
            { text: "A dense cluster of stars orbiting the Milky Way, like a big globular", diagnoses: "M31 taken for a satellite cluster rather than a galaxy in its own right" },
            { text: "A single very bright and very distant star, blurred by the atmosphere", diagnoses: "The fuzzy patch mistaken for a point source; it spans several Moon-widths of sky" }
        ],
        explain: "Andromeda is the most distant thing the unaided eye can reach, and the light entering it left before humans existed. Expect it to look like a grey smudge; the number is what makes the smudge worth the walk.",
        status: "draft"
    },

    {
        id: "q-hr-diagram-01",
        concept: "hr-diagram",
        kind: "mcq",
        difficulty: 2,
        stem: "On an H-R diagram, about 90% of stars fall along a single diagonal band, the main sequence. What does a star's position along that band tell you?",
        options: [
            { text: "Chiefly its mass — the band runs from hot, luminous, massive stars at one end to cool, faint, low-mass ones at the other", correct: true },
            { text: "Its age — stars start at the bottom of the band and climb it as they grow older", diagnoses: "Main sequence read as an evolutionary track; stars sit at one spot on it for most of their lives" },
            { text: "Its distance from us — the diagram is essentially a distance plot", diagnoses: "Confuses the H-R diagram's luminosity axis with apparent brightness; it plots intrinsic luminosity" },
            { text: "Nothing in particular — the band is just where the common stars happen to land", diagnoses: "The main sequence dismissed as a coincidence of sampling rather than a mass sequence" }
        ],
        explain: "The main sequence is a mass sequence: fix the mass of a hydrogen-burning star and its luminosity and temperature follow. That is why one scatter plot encodes how stars live.",
        status: "draft"
    },

    {
        id: "q-stellar-evolution-01",
        concept: "stellar-evolution",
        kind: "short",
        difficulty: 3,
        stem: "A star of 20 solar masses starts with far more hydrogen fuel than the Sun. Does it therefore stay on the main sequence longer? Answer and justify in one line.",
        answer: "No — dramatically shorter: a few million years against the Sun's ten billion. It has more fuel but burns it enormously faster, because its far greater core pressure and temperature drive fusion at a rate that rises much faster than the mass does. Accept any answer that says SHORTER and gives 'burns it far faster than the extra fuel makes up for' as the reason.",
        explain: "The instinct is that a bigger tank runs longer; luminosity scales roughly as mass cubed or more, so lifetime falls with mass. Mass decides everything, and it decides against the giants.",
        status: "draft"
    }

);

window.QUIZZES.push({
    id: "practical-entry",
    name: "Practical Astronomy Intensive — Entry Check",
    purpose: "entry",
    course: "quiz-practical-intensive",
    blurb: "Sat before Day 1. Twenty-six questions on what the camp assumes you already read in the quiz study material — and nothing on what it will teach you. The distractors are all real wrong models, so the marked paper names the cohort's weakest assumption rather than just ranking the students.",
    duration: 40,
    questions: [
        "q-cardinal-directions-01",
        "q-earth-sphere-01",
        "q-latitude-longitude-01",
        "q-planets-wanderers-01",
        "q-constellations-01",
        "q-ecliptic-zodiac-01",
        "q-moon-phases-01",
        "q-moon-phases-02",
        "q-moon-orbit-01",
        "q-lunar-eclipse-01",
        "q-solar-eclipse-01",
        "q-seasons-01",
        "q-sun-as-star-01",
        "q-light-travel-01",
        "q-spectrum-color-01",
        "q-lenses-mirrors-01",
        "q-apparent-magnitude-01",
        "q-apparent-magnitude-02",
        "q-heliocentric-model-01",
        "q-keplers-laws-01",
        "q-scale-of-solar-system-01",
        "q-catalogs-messier-01",
        "q-milky-way-structure-01",
        "q-galaxies-01",
        "q-hr-diagram-01",
        "q-stellar-evolution-01"
    ],
    status: "draft"
});
