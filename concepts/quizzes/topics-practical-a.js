// ============================================================
// Practical Astronomy Intensive — session checks, Days 1 and 2.
//
// Four papers, one per session, for the first half of the camp:
// the celestial sphere indoors, the first eyes-only night, how a
// telescope actually works, and first light through to deep sky.
// Each is an end-of-session check — did tonight land? — not a
// ranking exercise.
//
// Every distractor here is a wrong model somebody actually holds,
// lifted from the `misconceptions` on the concept records and made
// pickable. `600x!` on the box, the Hubble photograph expected at
// the eyepiece, the crystal-clear night that ruins Jupiter, the one
// white phone screen that spends twenty minutes of somebody's cold
// standing: these students have read the book and none of the wrong
// ideas below are cured by reading. A marked paper should tell the
// trainer which model to kill before tomorrow night, not a score.
//
// The two observing sessions carry `practical` questions on purpose.
// You cannot check star-hopping by asking a student to write about
// star-hopping. You hand them a chart and watch.
// ============================================================

window.QUESTIONS.push(

    // ---------------------------------------------------------
    // Session 1 — Where things are: the celestial sphere
    // ---------------------------------------------------------

    {
        id: "q-angular-measure-01",
        concept: "angular-measure",
        kind: "mcq",
        difficulty: 1,
        stem: "You hold a clenched fist out at arm's length against the sky. Roughly what angle does it span, and how does the full Moon compare?",
        options: [
            { text: "About 10° — and the full Moon is far smaller, about half a degree, covered by a little fingernail at arm's length", correct: true },
            { text: "About 10° — and the full Moon is about the same, roughly a fist's width", diagnoses: "The full Moon as a fist-sized object on the sky" },
            { text: "About 1° — and the full Moon is a few times larger than that", diagnoses: "No calibrated hand-spans; degrees not attached to anything on the sky" },
            { text: "About 45° — and the full Moon is roughly a coin's width at arm's length", diagnoses: "The full Moon as a coin at arm's length; grossly oversized hand-spans" }
        ],
        explain: "Fist ≈ 10°, thumb-width ≈ 2°, little fingernail ≈ 1°, full Moon ≈ 0.5°. The Moon feels huge and is not; every student should measure it tonight rather than believe it.",
        status: "draft"
    },

    {
        id: "q-angular-measure-02",
        concept: "angular-measure",
        kind: "mcq",
        difficulty: 3,
        stem: "Mizar and Alcor sit about 12 arcminutes apart in the handle of the Big Dipper. A friend says 'so they must be practically touching out there.' What is wrong with that?",
        options: [
            { text: "Angular separation is a difference in direction only — it says nothing about how far apart the two stars actually are in space", correct: true },
            { text: "Nothing is wrong — 12 arcminutes is a tiny angle, so they must be close together in space", diagnoses: "Angular separation read as real separation — direction confused with distance" },
            { text: "It is wrong only because 12 arcminutes is actually a large angle, so they are far apart in space", diagnoses: "Angular separation read as real separation, with the arithmetic also mis-scaled" },
            { text: "The Sun and Moon both span half a degree, so angles are the same for every object and mean nothing", diagnoses: "Angular size dismissed as meaningless rather than understood as direction" }
        ],
        explain: "An angle on the sky is a difference of direction and nothing more. The Sun and Moon both span half a degree while the Sun is 400× wider — and 400× further. Two stars a few arcminutes apart may be hundreds of light-years apart along the line of sight.",
        status: "draft"
    },

    {
        id: "q-diurnal-motion-01",
        concept: "diurnal-motion",
        kind: "mcq",
        difficulty: 2,
        stem: "A long-exposure photograph shows the stars drawn out into concentric arcs around a single point. What has the photograph actually recorded?",
        options: [
            { text: "The camera, bolted to the Earth, turning eastward through the exposure — the arcs are the Earth's rotation drawn out", correct: true },
            { text: "The stars themselves sailing westward across the sky during the night", diagnoses: "Stars as the moving objects; Earth's rotation not internalised" },
            { text: "The stars orbiting the pole star, which sits at the centre of their motion", diagnoses: "Polaris as a physical centre the stars orbit, rather than an accident of alignment with Earth's axis" },
            { text: "Every star in the frame rising and setting, since everything visible rises and sets", diagnoses: "Everything rises and sets — circumpolar motion not recognised" }
        ],
        explain: "The sky is effectively fixed; the Earth turns eastward beneath it, so the whole sky appears to wheel westward around the celestial pole. Star trails are a picture of the photographer's own rotation.",
        status: "draft"
    },

    {
        id: "q-celestial-sphere-01",
        concept: "celestial-sphere",
        kind: "mcq",
        difficulty: 2,
        stem: "What is the celestial sphere, and where do its poles and equator come from?",
        options: [
            { text: "A bookkeeping model of infinite radius that turns directions into geometry — its poles and equator are Earth's own axis and equator projected outward", correct: true },
            { text: "A real shell at a great distance with the stars fixed on it, all at the same distance from us", diagnoses: "Celestial sphere taken literally — stars as objects on one physical shell" },
            { text: "A model sphere, but with its poles and equator being genuine features of the sky, independent of Earth", diagnoses: "Celestial poles/equator as properties of the sky rather than Earth's axis and equator projected out" },
            { text: "Another name for the sky dome — the visible half of the sky above your horizon", diagnoses: "Celestial sphere collapsed into the local horizon dome; the projection idea missing" }
        ],
        explain: "The sphere is not a claim about where stars are; it is a device for treating directions as points on a sphere so they can be computed. Its poles and equator are borrowed from Earth and thrown onto the stars.",
        status: "draft"
    },

    {
        id: "q-altaz-coords-01",
        concept: "altaz-coords",
        kind: "mcq",
        difficulty: 2,
        stem: "A student writes in her log: 'Jupiter — altitude 34°, azimuth 118°.' What must she add for that entry to be usable by anyone, including her?",
        options: [
            { text: "The date, time and her location — alt-az changes minute by minute and is meaningless without all three", correct: true },
            { text: "Nothing — altitude and azimuth are a fixed address for an object, like RA and Dec", diagnoses: "Alt-az treated as a fixed address; the local, time-dependent nature of the system missed" },
            { text: "Only the date — azimuth is fixed for an object and only the altitude drifts", diagnoses: "Azimuth believed fixed; only altitude thought to change with time" },
            { text: "The direction she was facing when she measured, since azimuth runs from there", diagnoses: "Azimuth measured from the observer's facing rather than clockwise from due north" }
        ],
        explain: "Alt-az is a local, instantaneous pointing: it depends on where you stand and what time it is. Azimuth runs clockwise from due north — a sloppy north biases every pointing by the same angle. RA/Dec is the fixed address; alt-az is not.",
        status: "draft"
    },

    {
        id: "q-pole-star-01",
        concept: "pole-star",
        kind: "mcq",
        difficulty: 2,
        stem: "You are standing in Bhopal (latitude 23° N) and want to show a group Polaris. Which statement is true, and is the most useful thing to tell them?",
        options: [
            { text: "It is a middling star, about 48th brightest — find it with the Pointers of Ursa Major, only about 23° above the northern horizon", correct: true },
            { text: "It is the brightest star in the sky — just look north and pick out the brightest thing there", diagnoses: "Polaris as the brightest star in the sky" },
            { text: "It sits almost directly overhead, so look up near the zenith", diagnoses: "Pole star believed to hang overhead — altitude = latitude not held" },
            { text: "It is the star nearest to Earth, which is why it barely moves in the sky", diagnoses: "Polaris's stillness attributed to proximity rather than alignment with the rotation axis" }
        ],
        explain: "Two things kill more pole-star hunts than anything else: expecting a blazing star (Sirius outshines Polaris by miles — hence the Pointers) and expecting it overhead. Its altitude equals your latitude: 23° from Bhopal, on the horizon from the equator. It barely moves because it lies near Earth's rotation axis, not because it is close.",
        status: "draft"
    },

    {
        id: "q-circumpolar-stars-01",
        concept: "circumpolar-stars",
        kind: "mcq",
        difficulty: 3,
        stem: "A student in Bhopal (23° N) finds that Ursa Major dips below his northern horizon in the evening. A friend in Srinagar (34° N) insists it never sets for her. Who is right?",
        options: [
            { text: "Both — which stars are circumpolar depends only on your latitude, and Srinagar's higher pole keeps more of Ursa Major above the horizon", correct: true },
            { text: "The Bhopal student — every star rises and sets, so nothing can truly be circumpolar", diagnoses: "Everything rises and sets — circumpolar stars not accepted at all" },
            { text: "The Srinagar student — Ursa Major is circumpolar, and that is a fixed property of the constellation for everybody", diagnoses: "Circumpolarity treated as a property of the star, the same for all observers" },
            { text: "Neither — circumpolarity depends on the season, and they simply observed at different times of year", diagnoses: "Circumpolarity attributed to season rather than latitude" }
        ],
        explain: "A star is circumpolar if it lies within your latitude's angle of the celestial pole. From the equator no star is circumpolar; from the pole every visible star is. It is a fact about where you stand, not about the star.",
        status: "draft"
    },

    {
        id: "q-meridian-transit-01",
        concept: "meridian-transit",
        kind: "mcq",
        difficulty: 2,
        stem: "Saturn is up all night. Why is it worth waiting for it to transit your meridian rather than observing it at 9 pm when it is low in the east?",
        options: [
            { text: "At transit it is at its highest, so you look through the least air — low in the east the same planet is a shimmering mush", correct: true },
            { text: "There is no real difference — an object is equally worth observing at any time it happens to be above the horizon", diagnoses: "Altitude treated as irrelevant to image quality; atmospheric path length ignored" },
            { text: "Because the meridian is a line printed on the star chart, and objects are only in the catalogue's position when they cross it", diagnoses: "Meridian as a line on a chart rather than the observer's own north–south line" },
            { text: "Because at transit the planet crosses the celestial equator, which is where the atmosphere is thinnest", diagnoses: "Meridian muddled with the celestial equator" }
        ],
        explain: "The meridian is your own north–south line through your zenith — it moves when you do, and it is not printed on any chart. An object is highest as it transits, so it is seen through the shortest path of atmosphere. Everything else is a compromise.",
        status: "draft"
    },

    {
        id: "q-latitude-sky-01",
        concept: "latitude-sky",
        kind: "mcq",
        difficulty: 3,
        stem: "An astronomer in London writes to a student in Chennai asking her to describe Canopus, the second-brightest star in the sky, since he has never seen it. Why has he never seen it?",
        options: [
            { text: "Canopus is far enough south that it never rises for London's latitude, while from Chennai it is a routine sight", correct: true },
            { text: "He must simply have been unlucky with weather or timing — everyone on Earth sees the same stars eventually", diagnoses: "Belief that all observers see the same sky given enough time" },
            { text: "Canopus is only visible from the southern hemisphere, and Chennai is in the southern hemisphere", diagnoses: "Visibility treated as a hemisphere switch rather than a continuous function of latitude" },
            { text: "London is too far north for stars to rise and set at all — everything there just circles the pole", diagnoses: "Mid-latitude star paths confused with polar ones; slant vs vertical vs circling not distinguished" }
        ],
        explain: "Your latitude decides which sky you own. Canopus (declination about −53°) never clears London's horizon and never will; Chennai (13° N) sees it every winter. Star paths also change shape with latitude: vertical at the equator, slanted at mid-latitudes, circling at the poles.",
        status: "draft"
    },

    // ---------------------------------------------------------
    // Session 2 — First night: eyes only
    // ---------------------------------------------------------

    {
        id: "q-stars-vary-01",
        concept: "stars-vary",
        kind: "mcq",
        difficulty: 2,
        stem: "Standing outside, you can see steely-blue Vega, golden Arcturus and red Betelgeuse without any instrument. What does a star's colour tell you?",
        options: [
            { text: "Its surface temperature, directly — blue Vega is genuinely hotter than red Betelgeuse", correct: true },
            { text: "Nothing real — all stars are alike, and colour is just an effect of how far away they are", diagnoses: "Stars believed identical, differences attributed to distance alone" },
            { text: "Its temperature, with red the hottest and blue the coolest", diagnoses: "Hot-tap habit imported to stars — red read as hot, blue as cold" },
            { text: "How near it is — the reddest stars are the closest, which is why their colour shows", diagnoses: "Colour or brightness read as a distance indicator" }
        ],
        explain: "Colour is a direct read-out of surface temperature, and the scale runs opposite to the bathroom tap: blue is hot, red is cool. Brightness is a different question again — it mixes true output with distance, which is why Betelgeuse blazes from over 500 light-years away.",
        status: "draft"
    },

    {
        id: "q-eye-at-night-01",
        concept: "eye-at-night",
        kind: "mcq",
        difficulty: 2,
        stem: "A student looks at the Orion Nebula and complains that it is grey, nothing like the red and blue photograph he has seen. What is the honest explanation?",
        options: [
            { text: "At that light level only his rods are firing, and rods are colour-blind — the photograph stacked photons for an hour, which no eye can do", correct: true },
            { text: "The telescope's optics are poor — a better instrument would show the colours", diagnoses: "Grey nebulae blamed on the telescope rather than on retinal physiology" },
            { text: "His eyes work in the dark just as in daylight, only dimmer, so he needs to look harder", diagnoses: "Night vision as a dimmed version of day vision; the cones' shutdown not understood" },
            { text: "He should stare directly at the nebula's centre, where his vision is sharpest, and the colour will emerge", diagnoses: "Direct vision believed best for faint objects — averted vision not understood" }
        ],
        explain: "Cones need light and report colour; rods work at low light and report grey. Colour is the first thing to go in the dark. The centre of the retina is nearly all cones — the worst possible detector for something faint, which is why averted vision works.",
        status: "draft"
    },

    {
        id: "q-dark-adaptation-01",
        concept: "dark-adaptation",
        kind: "mcq",
        difficulty: 2,
        stem: "Twenty-five minutes into the dark, a student pulls out his phone to check the time. The screen is white. What has he just done?",
        options: [
            { text: "Bleached his rods and handed back most of the twenty-five minutes — rhodopsin has to rebuild from scratch, which is exactly why torches are red", correct: true },
            { text: "Nothing much — one quick glance at a screen is harmless", diagnoses: "White light believed harmless in a single brief glance" },
            { text: "Lost a little sensitivity, which will come back within a minute or two outside", diagnoses: "Dark adaptation believed to take a minute or two rather than 20–30" },
            { text: "Nothing to his eyes — dark adaptation is about learning to concentrate, not about the retina", diagnoses: "Dark adaptation and averted vision treated as mental tricks rather than retinal chemistry and anatomy" }
        ],
        explain: "Rhodopsin takes 20–30 minutes to rebuild and a white screen bleaches it in a second. This is chemistry, not attitude — hence the red torch rule, which needs no further explanation once the group has watched it happen once.",
        status: "draft"
    },

    {
        id: "q-dark-adaptation-02",
        concept: "dark-adaptation",
        kind: "practical",
        difficulty: 2,
        stem: "You are shown a faint object (M33, or a dim cluster member the assessor names). Find it and demonstrate averted vision, describing aloud what changes.",
        answer: "Assessor watches for: student has been in the dark, red torch only, no white screens for the preceding 20+ minutes; does not immediately stare dead-on and give up; deliberately fixes their gaze 10–20° to one side of the target while attending to it; reports that the object brightens or appears when looked beside and fades when looked at directly. Credit the student who names the reason — the off-centre retina is packed with rods — rather than treating it as a trick. Do not credit a student who stares straight at it, declares nothing is there, and reaches for a brighter eyepiece.",
        explain: "Averted vision is plain retinal anatomy: the centre of the retina is nearly all cones, useless at this light level, and the off-centre retina is rod-rich. Watching a student actually do it is the only honest check — every one of them can already recite the definition.",
        status: "draft"
    },

    {
        id: "q-asterisms-01",
        concept: "asterisms",
        kind: "mcq",
        difficulty: 1,
        stem: "Someone points at the Big Dipper (Saptarishi) and calls it a constellation. What is the correct picture?",
        options: [
            { text: "It is an asterism — the bright core of Ursa Major, which is a far larger patch of sky — and asterisms are exactly what observers navigate by", correct: true },
            { text: "They are right — the Big Dipper is one of the 88 official constellations", diagnoses: "Big Dipper / Saptarishi believed to be a constellation rather than an asterism within Ursa Major" },
            { text: "It is an asterism, and since asterisms are unofficial they are of little real use for finding your way around", diagnoses: "Asterisms dismissed as second-rate because they are unofficial" },
            { text: "It is an asterism, meaning its seven stars are a genuine group close together in space", diagnoses: "Stars of an asterism believed to belong together physically" }
        ],
        explain: "Asterisms are informal patterns: the Big Dipper is the bright core of the much larger Ursa Major, and the Summer Triangle's three stars lie in three different constellations at three very different distances. Unofficial does not mean useless — they are the sky's working landmarks.",
        status: "draft"
    },

    {
        id: "q-star-names-01",
        concept: "star-names",
        kind: "mcq",
        difficulty: 1,
        stem: "A student's cousin has been given a certificate from a 'star registry' naming a star after her. What should you tell her?",
        options: [
            { text: "Only the IAU names stars — the certificate is a souvenir and that name appears in no catalogue any astronomer uses", correct: true },
            { text: "The name is official once registered, though it takes some years to appear in catalogues", diagnoses: "Belief that a star can be bought and officially named" },
            { text: "It is fine as long as the star was an alpha star, since alpha is always the brightest of its constellation and therefore properly catalogued", diagnoses: "Alpha assumed always to be the brightest star of its constellation" },
            { text: "It cannot be right, because each star has exactly one true name and that one is already taken", diagnoses: "Belief that a star has one single true name, rather than several designations from different systems" }
        ],
        explain: "Star naming is the IAU's, and the registries sell paper. Note also that Bayer's lettering is rough — Betelgeuse is alpha Orionis but Rigel outshines it — and one star legitimately carries several names at once: Aldebaran, alpha Tauri and a catalogue number are the same star under systems built for different purposes.",
        status: "draft"
    },

    {
        id: "q-star-charts-01",
        concept: "star-charts",
        kind: "mcq",
        difficulty: 3,
        stem: "A student holds his planisphere flat like a road map, facing south, and cannot make anything match. Later at the eyepiece he hops confidently in the wrong direction. What has gone wrong in each case?",
        options: [
            { text: "A sky map only reads correctly when turned to face the direction you are looking, horizon edge down — and at the eyepiece a diagonal flips the view left for right while a Newtonian turns it round", correct: true },
            { text: "Nothing is wrong with the chart handling — the chart's stars are simply plotted for a different date", diagnoses: "Chart orientation and eyepiece flip not recognised as the problem at all" },
            { text: "He should hold the chart fixed as he did; the eyepiece view matches the chart exactly, so the hop must have been mis-counted", diagnoses: "Chart held fixed like a road map; eyepiece view expected to match the chart's orientation" },
            { text: "Both problems disappear with a planetarium app, which orients itself and makes paper charts unnecessary", diagnoses: "Planetarium app assumed to replace charts — white screen and lost patterns ignored" }
        ],
        explain: "Two separate rotations bite beginners. A planisphere is turned to face your viewing direction with the horizon edge down. And the eyepiece image is not the chart image: a star diagonal mirror-reverses it, a Newtonian rotates it 180°. An app is not the cure — its white screen wrecks dark adaptation and zoomed in it hides the very patterns you navigate by.",
        status: "draft"
    },

    {
        id: "q-light-pollution-01",
        concept: "light-pollution",
        kind: "mcq",
        difficulty: 2,
        stem: "A student in a Bortle 8 city backyard wants to buy a light-pollution filter so she can see galaxies from home. What is the honest advice?",
        options: [
            { text: "It will not work for galaxies — a broadband filter rejects a few lamp wavelengths and does nothing for broad-spectrum targets; that money is better spent on the drive to a dark site", correct: true },
            { text: "Buy it — a light-pollution filter effectively restores a Bortle 8 sky for any target", diagnoses: "Light-pollution filter believed to fix a bright sky, galaxies included" },
            { text: "There is nothing to be done — a bright city sky is simply how cities are", diagnoses: "Skyglow accepted as inevitable rather than caused mostly by unshielded upward-throwing fixtures" },
            { text: "It is worth it, though light pollution is really only an inconvenience for astronomers anyway", diagnoses: "Light pollution framed as an astronomers-only complaint" }
        ],
        explain: "Filters reject narrow lines; a galaxy's light is broad starlight and gets blocked with the skyglow. Worth noting too that most skyglow comes from unshielded fixtures throwing light sideways and upward — it is fixable, it is on someone's electricity bill, and it disrupts nesting birds and human sleep as well as astronomy.",
        status: "draft"
    },

    {
        id: "q-milky-way-band-01",
        concept: "milky-way-band",
        kind: "practical",
        difficulty: 2,
        stem: "Trace the Milky Way band across the sky with your arm, name the constellation the brightest part runs through, then put binoculars on it and tell the group what you see.",
        answer: "Assessor watches for: student is dark-adapted before attempting this; traces the band as an arch across the whole sky rather than pointing at one patch; identifies the bright, crowded region toward Sagittarius (the galactic centre direction); on raising binoculars, reports that the 'cloud' breaks into countless individual stars. The claim to hear is that we are inside the disc and the band is simply the crowded direction along it. Probe once: 'so is the Milky Way that band over there?' — credit the student who answers that every naked-eye star, including the ones behind us, belongs to it.",
        explain: "Three wrong models die at once here: that the band is gas or cloud (binoculars resolve it into stars), that the Milky Way is an object off in the sky (we are inside it), and that those sweeping spiral pictures are photographs of it (nobody has ever been outside — every one is an artist's impression or another galaxy).",
        status: "draft"
    },

    // ---------------------------------------------------------
    // Session 3 — How a telescope actually works
    // ---------------------------------------------------------

    {
        id: "q-telescope-designs-01",
        concept: "telescope-designs",
        kind: "mcq",
        difficulty: 2,
        stem: "A student has ₹40,000 and asks which is the best telescope design. What is the right answer?",
        options: [
            { text: "There is no single best — refractor, reflector and catadioptric trade cost, size and image quality, and the best is the one you will actually carry outside", correct: true },
            { text: "The apochromatic refractor — it is the most expensive design, so it must be the better telescope", diagnoses: "Price taken as a proxy for capability; aperture-per-rupee ignored" },
            { text: "A refractor, because a reflector's secondary mirror and spider block the middle of the image and punch a hole in it", diagnoses: "Central obstruction believed to remove the middle of the image" },
            { text: "Any of them, because optical design is the one specification that decides what a telescope shows", diagnoses: "Design treated as the deciding spec, displacing aperture" }
        ],
        explain: "At that budget a plain Dobsonian of twice the aperture will show more than a boutique apochromat, for less money. The secondary mirror costs a little light and contrast — every part of the target still reaches every part of the primary; it does not punch a hole. And the design that gets used is the design that wins.",
        status: "draft"
    },

    {
        id: "q-aperture-01",
        concept: "aperture",
        kind: "mcq",
        difficulty: 2,
        stem: "Two telescopes, both at 100×: a 200 mm Dobsonian and a 100 mm refractor. What does the Dobsonian give you that the refractor cannot?",
        options: [
            { text: "Fainter stars and finer detail — four times the light grasp, since it climbs as the square of the diameter, and twice the resolving power", correct: true },
            { text: "Nothing, at the same magnification — the two are showing the same image, since magnification decides how much you can see", diagnoses: "Magnification believed to decide capability; aperture's role missed" },
            { text: "A bigger image — the larger telescope's job is mainly to make things larger", diagnoses: "Bigger aperture believed mainly to enlarge, rather than to brighten and resolve" },
            { text: "Nothing that a dark enough site would not give the 100 mm refractor as well", diagnoses: "Belief that dark skies substitute for aperture on faint targets" }
        ],
        explain: "Aperture sets both the faintest star and the finest detail; power only enlarges what the aperture already delivered. Light grasp goes as diameter squared, so 200 mm collects 4× what 100 mm does. And below some aperture the photons are simply not there to be collected, however dark the site.",
        status: "draft"
    },

    {
        id: "q-aperture-02",
        concept: "aperture",
        kind: "short",
        difficulty: 3,
        stem: "A 60 mm department-store refractor has '600× POWER!' printed in yellow across the box. In two or three sentences, explain to the shopper why that number is close to worthless — and say what number they should have looked at instead.",
        answer: "Must say that magnification is the least important spec on the box, and that aperture — 60 mm here — is what decides both how faint you can go and how fine you can resolve. Should note that useful magnification is capped at roughly 50× per inch of aperture (about 120× for a 60 mm scope), so 600× delivers empty magnification: a dim, shaking, blurry image carrying no more information than the smaller one. Credit any answer that reaches for aperture, or light grasp, as the specification that matters.",
        explain: "This is the single misconception the session exists to kill, and it is worth making them say it out loud. The box quotes the one number that is free to inflate. Aperture costs money, so it is printed small.",
        status: "draft"
    },

    {
        id: "q-magnification-eyepieces-01",
        concept: "magnification-eyepieces",
        kind: "mcq",
        difficulty: 2,
        stem: "Your Dobsonian has a focal length of 1200 mm. You fit a 6 mm eyepiece and then a 25 mm eyepiece. What powers do you get, and which will show more on Jupiter tonight?",
        options: [
            { text: "200× and 48× — and which shows more depends on the night, since past the aperture's useful ceiling and on unsteady air the higher power just serves up a bigger blur", correct: true },
            { text: "200× and 48× — the 6 mm always shows more detail, because more power always means more detail", diagnoses: "More power assumed always to mean more detail; empty magnification not understood" },
            { text: "7200× and 30000× — you multiply the two focal lengths", diagnoses: "Magnification formula not held: focal lengths multiplied rather than divided" },
            { text: "The powers cannot be worked out from this — magnification is a property of the telescope, and the eyepiece is a minor accessory", diagnoses: "Eyepiece treated as an accessory rather than half of the magnification" }
        ],
        explain: "Magnification = telescope focal length ÷ eyepiece focal length. The eyepiece is not an accessory — swapping eyepieces is the ONLY way to change power. Past roughly 50× per inch of aperture you get empty magnification, and on a boiling night the ceiling is set far lower still by the air.",
        status: "draft"
    },

    {
        id: "q-magnification-eyepieces-02",
        concept: "magnification-eyepieces",
        kind: "mcq",
        difficulty: 3,
        stem: "The 60 mm box scope from the shop really does come with an eyepiece that yields 600×. If you fit it and point at Saturn, what will you actually see?",
        options: [
            { text: "A dim, shaking, badly blurred smear — 600× is far past what 60 mm can usefully deliver, so it enlarges without adding any information", correct: true },
            { text: "Saturn much larger and with far more detail than at 60× — that is what the extra power is for", diagnoses: "The '600x!' box claim believed: magnification treated as the telescope's real power" },
            { text: "A large, sharp Saturn, though a dim one — magnification costs brightness but never detail", diagnoses: "Empty magnification not understood — power assumed to preserve detail while costing light" },
            { text: "Nothing at all — the eyepiece is the wrong size for the scope and will not come to focus", diagnoses: "Eyepiece treated as a compatibility accessory rather than as half of the magnification" }
        ],
        explain: "The eyepiece works exactly as advertised and gives 600×. That is the joke: 60 mm supports roughly 120× before the image goes empty, so the box's headline number is a promise the aperture cannot keep. Compute it, then look through it — that is what kills this one.",
        status: "draft"
    },

    {
        id: "q-focal-ratio-01",
        concept: "focal-ratio",
        kind: "mcq",
        difficulty: 3,
        stem: "A student who does daytime photography says 'an f/5 telescope is faster, so stars will look brighter through it than through an f/10.' Is she right?",
        options: [
            { text: "No — visually, aperture and magnification set the brightness, and the f-ratio just follows from them; her camera intuition does not carry across to the eyepiece", correct: true },
            { text: "Yes — a fast f-ratio gathers light more efficiently, so everything looks brighter through it", diagnoses: "Camera f-ratio intuition carried across to visual observing" },
            { text: "Yes, and more generally f/5 is simply the better telescope — fast optics are better optics", diagnoses: "Fast f-ratio treated as straightforwardly better, rather than as a trade" },
            { text: "No — the f/10 is brighter, since a longer focal length collects light over a longer path", diagnoses: "f-ratio inverted, with focal length mistaken for a light-collecting quantity" }
        ],
        explain: "f-ratio = focal length ÷ aperture. It is not a free variable: visually, brightness comes from aperture and the magnification you are using. What f-ratio does buy is field — a fast scope frames nebulae widely at the price of fussier collimation and more demanding eyepieces, while slow optics suit planets.",
        status: "draft"
    },

    {
        id: "q-exit-pupil-01",
        concept: "exit-pupil",
        kind: "mcq",
        difficulty: 3,
        stem: "A 200 mm Dobsonian at 20× gives an exit pupil of 10 mm. A student, aged 55, argues this is ideal because a bigger exit pupil always means more light into the eye. Where does the argument fail?",
        options: [
            { text: "His night pupil opens to about 5 mm, so half the beam lands on his iris and is thrown away — the extra aperture is wasted at that power", correct: true },
            { text: "It does not fail — a bigger exit pupil is always better, since more of the beam reaches the eye", diagnoses: "Bigger exit pupil assumed always better; the eye's pupil ceiling ignored" },
            { text: "It fails only because he has not accounted for eye relief, which is purely a comfort matter anyway", diagnoses: "Eye relief dismissed as comfort rather than a limit on seeing the full field" },
            { text: "It fails because a 10 mm exit pupil causes blackouts and kidney-beaning, which is a fault in the eyepiece design", diagnoses: "Blackouts and kidney-beaning blamed on the eyepiece rather than on eye placement" }
        ],
        explain: "Exit pupil = aperture ÷ magnification. Past what the night pupil can open to — about 7 mm young, 5 mm older — the surplus lands on the iris and is discarded. This is exactly why 7×50s (7 mm exit pupil) suit youngsters and 8×32s (4 mm) suit elders. Eye relief is a separate matter and not merely comfort: with 8 mm of it, a spectacle wearer physically cannot take in the whole field.",
        status: "draft"
    },

    {
        id: "q-resolution-limit-01",
        concept: "resolution-limit",
        kind: "mcq",
        difficulty: 3,
        stem: "A tight double star will not split in a 60 mm refractor. A student swaps to a shorter eyepiece, then adds a Barlow, and is baffled that the blur only gets larger. Why?",
        options: [
            { text: "Diffraction sets a hard floor — the Airy discs of 60 mm simply overlap at that separation, and power only enlarges the overlapping blur", correct: true },
            { text: "He has not gone far enough — with enough magnification any double will eventually split", diagnoses: "Belief that enough magnification eventually reveals more detail; the diffraction limit not accepted" },
            { text: "The tiny disc and rings around each star are a flaw in that cheap objective — a better 60 mm would resolve it", diagnoses: "Airy disc and rings mistaken for an optical defect rather than diffraction" },
            { text: "The refractor's focal length is too short — a longer 60 mm scope would resolve finer", diagnoses: "Resolution attributed to focal length rather than to aperture alone" }
        ],
        explain: "Every perfect telescope turns a point source into an Airy disc; the aperture alone decides how small (Dawes: about 116/D arcsec, D in mm). Below that separation there is nothing more to reveal, and magnification just enlarges the disc and its rings. Splitting tight doubles needs inches, not power.",
        status: "draft"
    },

    {
        id: "q-seeing-transparency-01",
        concept: "seeing-transparency",
        kind: "mcq",
        difficulty: 3,
        stem: "A cold front has just passed. The night is crystal-clear, sparkling, with the stars twinkling hard and a brisk wind. A student declares it perfect for Jupiter. What should you tell him?",
        options: [
            { text: "Transparency is excellent but the seeing is probably terrible — that hard twinkle is the same air boiling Jupiter's disc into mush; a hazy still night usually beats it for planets", correct: true },
            { text: "He is right — a clear night with no haze is by definition good for everything, planets included", diagnoses: "Seeing confused with transparency — clarity taken as the single measure of a good night" },
            { text: "He is right about the sky, and if Jupiter still shimmers into mush the telescope's optics are the problem", diagnoses: "Poor planetary image blamed on optics rather than on the atmosphere" },
            { text: "He is right, and he should carry the scope straight out and observe immediately to make the most of it", diagnoses: "Scope assumed ready the moment it goes outside — cool-down and tube currents ignored" }
        ],
        explain: "Two independent things. Transparency is how faint you can go; seeing is how steady the air is. The freshly-scrubbed post-front night is the classic case: superb for faint galaxies, dreadful for planets. No optics can out-resolve the air. And a warm mirror carried straight outside makes its own tube currents, wrecking the view just as thoroughly.",
        status: "draft"
    },

    // ---------------------------------------------------------
    // Session 4 — First light, then deep sky
    // ---------------------------------------------------------

    {
        id: "q-binoculars-01",
        concept: "binoculars",
        kind: "mcq",
        difficulty: 1,
        stem: "A pair of binoculars is marked 7×50. What do the two numbers mean, and what should you expect of them?",
        options: [
            { text: "7× magnification and 50 mm objectives — the 50 decides how faint you can go, and they will show Jupiter's moons, the Pleiades and hundreds of clusters in a field no telescope can match", correct: true },
            { text: "50× magnification in a 7-element optical design — a modest toy to be outgrown once a real telescope arrives", diagnoses: "'7x50' misread as 50x magnification; binoculars dismissed as a toy" },
            { text: "7× magnification and 50 mm objectives — useful for scenery, but they show nothing in the sky a telescope will not show better", diagnoses: "Binoculars dismissed as a toy to outgrow; their wide field not valued" },
            { text: "7× magnification and 50 mm objectives, and since 7× is low they can be pushed handheld to 15× or 20× with no loss of steadiness", diagnoses: "Handheld believed adequate past ~10x, where the observer's own pulse shakes the view" }
        ],
        explain: "The second number is the objective diameter in millimetres — the aperture, and therefore what decides how faint you can go. A 7×50 is the best first instrument and stays many observers' favourite forever. Past about 10× your own pulse shakes the view, and a tripod adapter reveals stars the same glass could not hold still.",
        status: "draft"
    },

    {
        id: "q-telescope-operation-01",
        concept: "telescope-operation",
        kind: "mcq",
        difficulty: 2,
        stem: "A student arrives at his first dark-sky night having taken his new Dobsonian out of the box that afternoon. He wants to start on M57. What is the order of business?",
        options: [
            { text: "Finder aligned in daylight, tube out early to cool, lowest-power eyepiece in, centre on something bright, then creep the focuser slowly — and only then go hunting", correct: true },
            { text: "Point it at Lyra and look — a telescope shows you things; that is what it is for", diagnoses: "Telescope expected to just show you things; finder alignment, cool-down and preparation not seen as necessary" },
            { text: "Fit the highest-power eyepiece in the box first, since M57 is small and needs the magnification to be found", diagnoses: "Beginner starting at highest power — tiny, dim, fast-drifting field" },
            { text: "Look through it once, and if the view is fuzzy return the scope — a fuzzy view means the optics are bad", diagnoses: "Fuzzy view blamed on optics when the focuser has not been crept through slowly" }
        ],
        explain: "Ten minutes of drill separates a magical first night from an hour of hunting empty black sky. Align the finder in daylight on a distant object; let the tube cool; start at lowest power for the widest field; centre something bright; and creep the focuser — focus comes and goes over a hair's width of travel.",
        status: "draft"
    },

    {
        id: "q-telescope-operation-02",
        concept: "telescope-operation",
        kind: "practical",
        difficulty: 2,
        stem: "Set up the Dobsonian from its case and get first light on a bright star of your choosing. Work unaided; narrate what you are doing.",
        answer: "Assessor watches for, in roughly this order: tube out and cooling before anything else; finder alignment checked (in daylight if the session allows, otherwise on a bright star at low power) and adjusted until finder and eyepiece agree; LOWEST-power eyepiece fitted first, not the shortest one in the case; scope swung onto a bright, easy, unambiguous target; focuser crept through slowly in both directions until the star snaps to a point, rather than racked back and forth in despair. Credit the student who notices a fuzzy star is a focus problem, not an optics problem. Do not credit a fast, confident setup that skips the finder and starts at 200x.",
        explain: "Every part of this is recitable and none of it is reliable until watched. The finder, the cool-down and the lowest-power start are the three things beginners skip, and skipping any one of them turns the night into an hour of empty black sky.",
        status: "draft"
    },

    {
        id: "q-star-hopping-01",
        concept: "star-hopping",
        kind: "practical",
        difficulty: 3,
        stem: "Using the chart and the finder only, star-hop to a Messier object the assessor names. No GoTo, no app, no help.",
        answer: "Assessor watches for: student STARTS at a bright naked-eye anchor star and walks the pattern down to the target one finder field at a time — not by sweeping blindly around where the faint target ought to be; chart turned to face the direction of view; and, critically, that they account for the eyepiece flip — a diagonal mirror-reverses, a Newtonian rotates 180° — rather than hopping confidently in the wrong direction and blaming the chart. Red torch only throughout. Success is landing the object; but credit a student who hops methodically, recognises a wrong turn from the pattern, and recovers, over one who stumbles onto it by luck.",
        explain: "This is the craft skill that turns a chart reader into an observer, and it cannot be examined on paper. Note that GoTo does not make it obsolete: the handset still wants a correct alignment on named stars, and an observer who cannot find Cygnus cannot rescue an alignment that has gone wrong.",
        status: "draft"
    },

    {
        id: "q-observing-log-01",
        concept: "observing-log",
        kind: "practical",
        difficulty: 2,
        stem: "Log the object you have just found, and sketch it. Hand the entry to the assessor before you move the telescope.",
        answer: "Assessor checks the entry carries: date and time, location, instrument and the eyepiece actually in use, seeing and transparency estimates, and — the point — what the student ACTUALLY SAW rather than what the Messier table says is there. The sketch may be a crude pencil smudge; artistic skill is not being marked and should not be mentioned. Credit the student who records the objects they failed to find and the nights of murk alongside the triumphs. Do not accept 'M13 — globular cluster, 25,000 ly' copied from the chart: that is a student who looked at a book, not through an eyepiece.",
        explain: "A log is not bureaucracy for serious people — it is what makes you a better observer, because an object you wrote up is one you actually looked at rather than glanced at. A pencil forces the eye to stay on the target; that is where the detail comes from.",
        status: "draft"
    },

    {
        id: "q-double-variable-stars-01",
        concept: "double-variable-stars",
        kind: "mcq",
        difficulty: 3,
        stem: "You split a pretty double in the eyepiece. A student says the two stars must be orbiting one another. Is that safe to assume?",
        options: [
            { text: "No — many are optical doubles: two stars at wildly different distances that merely happen to line up from where we sit", correct: true },
            { text: "Yes — if two stars appear that close together in the eyepiece they must be a bound pair", diagnoses: "Every double assumed to be a physically bound pair; optical doubles not known" },
            { text: "Yes, and any double that will not split just needs more magnification to reveal the pair", diagnoses: "Splitting doubles believed to be a magnification problem rather than an aperture one" },
            { text: "It cannot be settled by eye at all — questions like this, and variable-star work, need instruments rather than observers", diagnoses: "Belief that visual work has no scientific value; eyeball magnitude estimates dismissed" }
        ],
        explain: "An angular separation is a difference of direction and nothing more — an optical double is a line-of-sight coincidence. Two further points worth making here: splitting a tight pair is set by aperture (the resolving limit), not power; and visual work is genuinely useful — Algol drops over a magnitude every 2.87 days and eyeball estimates against comparison stars remain the standard method.",
        status: "draft"
    },

    {
        id: "q-planetary-observing-01",
        concept: "planetary-observing",
        kind: "mcq",
        difficulty: 2,
        stem: "Saturn is centred at 120× on a night of mediocre seeing. What gets you the most detail?",
        options: [
            { text: "Stay where you are and keep watching — planetary detail surfaces in brief moments of steady air, and you have to be at the eyepiece when they come", correct: true },
            { text: "Reach straight for 300× — Saturn is small and bright, so more power is always the way to more detail on it", diagnoses: "Highest power reached for on a night whose seeing sets a lower ceiling" },
            { text: "Take one good look, note it in the log, and move on to the next target while the sky is dark", diagnoses: "Planet given one glance; the patience the target demands not understood" },
            { text: "Expect the Voyager view at 120× and, if it is not there, conclude the scope is under-powered", diagnoses: "Voyager/spacecraft postcard expected at the eyepiece" }
        ],
        explain: "Seeing sets the ceiling, and on a boiling night 120× shows far more than 300× ever will. Jupiter at the eyepiece is a small bright disc with two grey belts — the belt structure and the Cassini division only surface after your eye has spent ten patient minutes on it, during the moments the air goes still.",
        status: "draft"
    },

    {
        id: "q-deepsky-observing-01",
        concept: "deepsky-observing",
        kind: "mcq",
        difficulty: 2,
        stem: "A student who has read the Messier table finds M31, looks, and says flatly: 'That's it? A grey smudge.' What is the honest answer?",
        options: [
            { text: "Yes — visually these are faint grey smudges, because a camera integrates photons for hours and the eye cannot integrate over time at all; the skill is learning to see what IS there", correct: true },
            { text: "The telescope is too small — a larger instrument would show the spiral arms and colour of the photograph", diagnoses: "Hubble photograph expected at the eyepiece; the eye's inability to integrate not understood" },
            { text: "Turn the power up until the smudge resolves into the photograph's detail", diagnoses: "Magnification cranked on an extended object, which only spreads the same light and dims it" },
            { text: "Nothing is wrong with the view — it is the same at any site, so this is simply what M31 looks like everywhere", diagnoses: "Sky darkness dismissed as a factor in deep-sky work" }
        ],
        explain: "This ruins more first nights than anything else, so say it before they look, not after. The photograph stacked hours of photons; the eye integrates over about a tenth of a second and cannot accumulate. Deep sky wants aperture, darkness, LOW power (magnification spreads the same light over more area, dimming an extended object) and dark-adapted eyes.",
        status: "draft"
    },

    {
        id: "q-visual-filters-01",
        concept: "visual-filters",
        kind: "mcq",
        difficulty: 3,
        stem: "An OIII filter makes the Veil Nebula appear out of nothing. A student immediately screws it in to look at M31. What happens, and why?",
        options: [
            { text: "M31 gets dimmer and no easier — a filter subtracts light, passing only the narrow lines an emission nebula radiates, and a galaxy's broad starlight is blocked along with the skyglow", correct: true },
            { text: "M31 gets brighter, as it did for the Veil — that is what a nebula filter does", diagnoses: "Filter believed to add light rather than subtract it" },
            { text: "M31 shows more contrast — the filter works on any faint fuzzy, galaxies included", diagnoses: "Nebula filter expected to rescue a galaxy; the emission-line mechanism not understood" },
            { text: "M31 improves enough that the filter is a fair substitute for driving out to a dark site", diagnoses: "Broadband light-pollution filter treated as a substitute for a dark sky" }
        ],
        explain: "A filter cannot brighten anything — it subtracts. Everything in the field, the nebula included, is dimmer through it; the nebula stands out because the skyglow around it was cut harder. That trick needs the target to radiate in narrow lines, which emission nebulae do and galaxies do not. And a broadband LPR filter trims a couple of lamp wavelengths, not the drive out of town.",
        status: "draft"
    }

);

window.QUIZZES.push(

    {
        id: "practical-s1",
        name: "Session 1 — Where things are: the celestial sphere",
        purpose: "session",
        course: "quiz-practical-intensive",
        session: 1,
        blurb: "Nine questions at the end of the first indoor session. They arrived able to define the celestial sphere and unable to point at the meridian; this checks whether the definitions have turned into something they could act on outside tonight. Angular measure is asked twice — everything later leans on it and nobody arrives with it.",
        duration: 15,
        questions: [
            "q-angular-measure-01",
            "q-angular-measure-02",
            "q-diurnal-motion-01",
            "q-celestial-sphere-01",
            "q-altaz-coords-01",
            "q-pole-star-01",
            "q-circumpolar-stars-01",
            "q-meridian-transit-01",
            "q-latitude-sky-01"
        ],
        status: "draft"
    },

    {
        id: "practical-s2",
        name: "Session 2 — First night: eyes only",
        purpose: "session",
        course: "quiz-practical-intensive",
        session: 2,
        blurb: "The first observing night, checked partly at the eyepiece-less sky itself: two of these are practical tasks, because averted vision and tracing the Milky Way are things you watch a student do, not things you read about their doing. Dark adaptation is asked twice — it is the night's discipline, and one white phone screen undoes it.",
        duration: 20,
        questions: [
            "q-stars-vary-01",
            "q-eye-at-night-01",
            "q-dark-adaptation-01",
            "q-dark-adaptation-02",
            "q-asterisms-01",
            "q-star-names-01",
            "q-star-charts-01",
            "q-light-pollution-01",
            "q-milky-way-band-01"
        ],
        status: "draft"
    },

    {
        id: "practical-s3",
        name: "Session 3 — How a telescope actually works",
        purpose: "session",
        course: "quiz-practical-intensive",
        session: 3,
        blurb: "Classroom check with the instruments still on the table. The '600x!' box claim is attacked from three sides — aperture, magnification and the diffraction limit — because it is the misconception this session exists to kill, and it does not die to a single question.",
        duration: 20,
        questions: [
            "q-telescope-designs-01",
            "q-aperture-01",
            "q-aperture-02",
            "q-magnification-eyepieces-01",
            "q-magnification-eyepieces-02",
            "q-focal-ratio-01",
            "q-exit-pupil-01",
            "q-resolution-limit-01",
            "q-seeing-transparency-01"
        ],
        status: "draft"
    },

    {
        id: "practical-s4",
        name: "Session 4 — First light, then deep sky",
        purpose: "session",
        course: "quiz-practical-intensive",
        session: 4,
        blurb: "Three of these nine are practical: setting a Dobsonian up, star-hopping to a Messier object with no GoTo, and handing in the log entry for it. The rest manage the expectations that wreck first nights — the Voyager postcard, the Hubble photograph, and the filter that is supposed to brighten a galaxy.",
        duration: 30,
        questions: [
            "q-binoculars-01",
            "q-telescope-operation-01",
            "q-telescope-operation-02",
            "q-star-hopping-01",
            "q-observing-log-01",
            "q-double-variable-stars-01",
            "q-planetary-observing-01",
            "q-deepsky-observing-01",
            "q-visual-filters-01"
        ],
        status: "draft"
    }

);
