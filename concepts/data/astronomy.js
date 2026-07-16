// ============================================================
// ASTRONOMY concepts.
//
// Requires data/_schema.js to have run first (it creates
// window.CONCEPTS and the taxonomy tables).
//
// These ids are published permalinks (#c=<id>) — never rename one.
// Domains: found, sky, sphere, time, solar, light, scope, stars,
// astro, indic.
//
// NOTE ON OVERLAP: school optics lives in physics under `p-light`.
// The `light` domain here is the astronomy-specific remainder
// (magnitude, spectra, filters). Check ConceptDB.match() before
// adding an optics concept so the two do not duplicate.
// ============================================================

window.CONCEPTS.push(
    // ============================== NAKED-EYE SKY ==============================
    {
        id: "day-night", name: "Day & Night", domain: "sky", level: 1,
        desc: "Earth spins once in about 24 hours, so the Sun appears to rise in the east and set in the west. Day and night are a matter of which side of Earth faces the Sun.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: ["spin-axis"],
        misconceptions: ["Thinking the Sun physically travels around a stationary Earth from east to west — it is the Earth turning eastward under a Sun that stays put", "Believing night falls because something gets in front of the Sun — clouds, the Moon, or Earth's shadow — when it is just the half of Earth turned away", "Confusing the spin with the orbit, so that one day is one trip around the Sun — the spin gives day and night, the orbit gives the year"],
        grades: [3, 4, 5, 6],
        aliases: ["day and night", "why we have day and night", "rotation of the earth causing day and night", "day and night cycle"],
        keywords: ["sunrise", "sunset", "24 hours", "rotation", "axis", "daylight", "spinning earth"],
        tools: [{ k: "gol", label: "Rotating Earth animation" }, { k: "activity", label: "Globe + torch: spin the globe, watch a sticker city pass through day and night" }, { k: "android", label: "Live Day Night — interactive day/night view of Earth", url: "https://play.google.com/store/apps/details?id=com.alokm.livedaynight" }]
    },
    {
        id: "cardinal-directions", name: "Cardinal Directions", domain: "sky", level: 1,
        desc: "Finding north, south, east and west from the Sun and shadows. Sunrise and sunset directions drift through the year — due east/west only near the equinoxes.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: [],
        misconceptions: ["Thinking the Sun rises due east and sets due west every day — it only does that at the two equinoxes; the rest of the year sunrise drifts north or south of east", "Assuming a magnetic compass points to true north — it points to the magnetic pole, which is somewhere else entirely, so it needs correcting", "Treating north as whichever way you happen to be facing, or as the top of the page — the directions are pinned to the Earth, not to you"],
        grades: [3, 4, 5, 6],
        aliases: ["cardinal directions", "the four directions", "north south east west", "finding directions from the sun", "cardinal points"],
        keywords: ["compass", "shadow direction", "sunrise direction", "magnetic compass", "intermediate directions", "north-east", "due east"],
        tools: [{ k: "activity", label: "Shadow-stick compass: mark shadow tips through a day" }]
    },
    {
        id: "sky-dome", name: "The Sky Dome", domain: "sky", level: 1,
        desc: "The sky looks like a dome overhead: the horizon is its rim, the zenith its top. Everything we observe is a direction on this dome, not a distance.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: [],
        misconceptions: ["Thinking the stars really are stuck on one dome at the same distance — the dome is a model for recording directions, not a ceiling; the stars behind it lie at wildly different distances", "Believing a star low near the horizon is genuinely further away than one overhead — the dome carries direction only, and never distance", "Thinking the horizon is the edge of the sky rather than the edge of your view — half the dome is simply under your feet"],
        grades: [3, 4, 5],
        aliases: ["the sky dome", "celestial dome", "the dome of the sky", "horizon and zenith"],
        keywords: ["horizon", "zenith", "nadir", "overhead", "apparent dome", "direction not distance"],
        tools: [{ k: "activity", label: "Umbrella planetarium: draw stars inside an umbrella and rotate it" }]
    },
    {
        id: "sun-daily-arc", name: "Sun's Daily Arc", domain: "sky", level: 1,
        desc: "The Sun climbs from the eastern horizon, peaks toward the south (from India), and sinks west. Shadow lengths and directions trace this arc.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: ["day-night", "sky-dome", "cardinal-directions"],
        misconceptions: ["Thinking the Sun stands directly overhead at noon — outside the tropics it never does; from Delhi the midday Sun is always somewhat south of the zenith, even in June", "Believing the Sun traces the same arc every day — it rides high and long in summer, low and short in winter, and the shadow tracing shows it", "Assuming the noon Sun is toward the south for everybody — south of the Tropic of Capricorn it peaks in the north instead"],
        grades: [3, 4, 5, 6],
        aliases: ["the sun's daily path", "apparent path of the sun", "sun's daily arc", "path of the sun across the sky"],
        keywords: ["shadow length", "midday sun", "east to west", "altitude of the sun", "noon", "shadow tracing", "sun's height"],
        tools: [{ k: "gol", label: "Sun path across seasons" , url: "https://gol.kaalshodh.com/app#sunpath"}, { k: "activity", label: "Chart shadow length every hour on the school ground" }, { k: "android", label: "Sunrise Sunset — timings & visualizations for any location", url: "https://play.google.com/store/apps/details?id=com.alokmandavgane.sunrisesunset" }]
    },
    {
        id: "moon-observation", name: "Observing the Moon", domain: "sky", level: 1,
        desc: "The Moon is visible in the day as often as at night, rises about 50 minutes later each day, and shows changing shapes. Just watching it for a month is a complete experiment.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: ["sky-dome"],
        misconceptions: ["Thinking the Moon only comes out at night — it is above the horizon in daylight about as often, and a first-quarter Moon is easy to spot high in the afternoon", "Expecting the Moon to rise at sunset every day — moonrise slips about 50 minutes later each day, which is why it turns up at a different time every evening", "Believing the Moon has gone away on the nights you cannot find it — near new moon it is up in the daytime, lost in the glare close to the Sun"],
        grades: [3, 4, 5, 6],
        aliases: ["observing the moon", "watching the moon", "moon observation diary", "moon in the daytime"],
        keywords: ["moonrise", "50 minutes later", "daytime moon", "naked eye", "month-long observation", "moon log"],
        tools: [{ k: "activity", label: "Moon diary: sketch the Moon and note time/direction for 30 days" }, { k: "whatsup", label: "Moonrise & moonset times" }]
    },
    {
        id: "stars-vary", name: "Stars Differ", domain: "sky", level: 1,
        desc: "Stars are not identical dots: they differ in brightness and in colour — steely blue Vega, golden Arcturus, red Betelgeuse. These differences are real physics, visible to the naked eye.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: ["sky-dome"],
        misconceptions: ["Thinking all stars are really identical and only look different because some are further off — colour is a direct read-out of surface temperature, and blue Vega is genuinely hotter than red Betelgeuse", "Believing the brightest stars must be the nearest — brightness mixes true output with distance; Betelgeuse blazes from over 500 light years away", "Borrowing the hot-tap habit that red is hot and blue is cold — on stars it is the other way round"],
        grades: [5, 8],
        aliases: ["stars differ in brightness and colour", "brightness and colour of stars", "colours of stars", "how bright are stars"],
        keywords: ["magnitude", "Vega", "Betelgeuse", "Arcturus", "blue star", "red star", "apparent brightness", "Sirius"],
        tools: [{ k: "activity", label: "Colour hunt: find one blue, one yellow, one red star" }]
    },
    {
        id: "constellations", name: "Constellations", domain: "sky", level: 1,
        desc: "Star patterns used as sky landmarks — 88 official constellations today, with older patterns in every culture. They are direction labels, not physical groups.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: ["stars-vary"],
        misconceptions: ["Thinking the stars of a constellation are neighbours in space — they are a line-of-sight accident, often hundreds of light years apart from one another", "Believing a constellation is the joined-up picture — since 1930 each of the 88 is a bounded region of sky, so a star is 'in Orion' by its coordinates, not by the dots", "Thinking the patterns are obvious and universal — the same seven stars are a Bear to the Greeks, the Saptarishi in India and a plough in England"],
        grades: [5, 8],
        aliases: ["constellations", "88 constellations", "constellation names", "star patterns in the sky"],
        keywords: ["Ursa Major", "Orion", "Saptarishi", "Cassiopeia", "IAU boundaries", "Great Bear", "sky landmark", "Leo"],
        tools: [{ k: "sky", label: "Identify tonight's constellations" }, { k: "gol", label: "Gol Planetarium scene — identify constellations on the live sky", url: "https://gol.kaalshodh.com/app#planetarium" }]
    },
    {
        id: "moon-phases", name: "Phases of the Moon", domain: "sky", level: 2,
        desc: "The Moon is always half-lit by the Sun; the phase is how much of that lit half faces us, cycling in about 29.5 days. Phase, rise time and Sun–Moon angle all lock together.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["moon-observation", "day-night"],
        misconceptions: ["Thinking the phases are Earth's shadow falling on the Moon — that is a lunar eclipse, and it would then have to happen at every single full moon", "Believing the Moon is a night-time object — it is up in daylight half the time, and a first-quarter Moon rides high in the afternoon sky", "Thinking the Moon itself changes shape, or that a piece of it goes missing — the Sun lights exactly half of it always; only how much of that half faces us changes"],
        grades: [5, 6, 8],
        aliases: ["phases of the moon", "lunar phases", "moon phase cycle", "changing shapes of the moon"],
        keywords: ["crescent", "gibbous", "waxing", "waning", "full moon", "new moon", "29.5 days", "amavasya", "purnima", "half moon"],
        tools: [{ k: "gol", label: "Moon phase geometry animation" }, { k: "activity", label: "Lamp + ball around your head: see all phases in one minute" }, { k: "kaal", label: "Mandala orrery — watch phases emerge from the geometry", url: "https://mandal.kaalshodh.com" }, { k: "kaal", label: "Astro Events — full & new moons by year", url: "https://kaalshodh.com/events.html" }]
    },
    {
        id: "diurnal-motion", name: "Diurnal Motion", domain: "sky", level: 2,
        desc: "The whole starry sky wheels westward through the night, circling a fixed point — the celestial pole. This is Earth's rotation seen from the inside.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "photo", "indic"],
        prereqs: ["day-night", "constellations"],
        misconceptions: ["Thinking the stars themselves sail westward across the sky — they are effectively fixed; it is the Earth turning eastward beneath them", "Believing star trails in a long exposure record the stars moving during the night — they record the camera turning with the Earth", "Assuming everything rises and sets, so nothing can be seen all night — stars near the celestial pole circle it and never touch the horizon"],
        grades: [6, 8],
        aliases: ["diurnal motion", "apparent motion of the stars", "nightly motion of the sky", "stars appear to move across the sky"],
        keywords: ["star trails", "celestial pole", "westward", "rotation of the earth", "long exposure", "sky wheels", "all night"],
        tools: [{ k: "gol", label: "Time-lapse rotating sky" , url: "https://gol.kaalshodh.com/app#planetarium"}, { k: "activity", label: "Watch Orion or the Big Dipper shift over 2 hours" }]
    },
    {
        id: "pole-star", name: "The Pole Star", domain: "sky", level: 2,
        desc: "Polaris (Dhruva) sits nearly at the north celestial pole, so it barely moves and always marks north. Its altitude above the horizon equals your latitude.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "photo", "indic"],
        prereqs: ["diurnal-motion", "cardinal-directions", "latitude-longitude"],
        misconceptions: ["Thinking Polaris is the brightest star in the sky — it is roughly 48th; Sirius far outshines it, which is why you find it with the Pointers of Ursa Major", "Believing the pole star hangs overhead — its altitude equals your latitude, so from Bhopal it is only 23° up and from the equator it sits on the horizon", "Thinking Polaris has always been the pole star — precession moves the celestial pole; Thuban held the post 4,700 years ago and Vega will later"],
        grades: [6, 8],
        aliases: ["the pole star", "polaris", "dhruva tara", "north star"],
        keywords: ["north celestial pole", "Ursa Major pointers", "latitude equals altitude", "Dhruva", "does not move", "finding north"],
        tools: [{ k: "sky", label: "Find Polaris from the Big Dipper / Saptarshi" }, { k: "activity", label: "Measure Polaris altitude with a fist-and-thumb protractor" }]
    },
    {
        id: "planets-wanderers", name: "Planets: the Wanderers", domain: "sky", level: 2,
        desc: "A few bright 'stars' drift against the fixed constellations from week to week — the planets. They shine steadily while true stars twinkle.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["constellations"],
        grades: [6, 8],
        aliases: ["planets in the night sky", "wandering stars", "how to tell a planet from a star", "naked-eye planets"],
        keywords: ["Jupiter", "Venus", "Mars", "Saturn", "steady light", "no twinkle", "drift against stars", "wanderer"],
        tools: [{ k: "whatsup", label: "Which planets are up tonight" }, { k: "activity", label: "Plot a planet's position against stars weekly for a month" }, { k: "gol", label: "Gol Planets scene — track the wanderers against the stars", url: "https://gol.kaalshodh.com/app#planets" }]
    },
    {
        id: "seasons", name: "Seasons", domain: "sky", level: 2,
        desc: "Earth's axis is tilted 23.4°, so through the year each hemisphere leans toward or away from the Sun — changing day length and the Sun's height. Distance from the Sun is not the cause.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["sun-daily-arc"],
        misconceptions: ["Thinking seasons come from Earth being closer to the Sun in summer — that would give both hemispheres summer at once, yet India's summer is Australia's winter", "Believing the tilt tips the whole Earth toward the Sun in summer — one hemisphere leans in exactly as much as the other leans away, which is why the seasons are opposite", "Thinking summer is warm only because the days are longer — steeper midday sunlight is spread over less ground, and that concentration matters at least as much"],
        grades: [5, 6, 11],
        aliases: ["cause of seasons", "why we have seasons", "tilt of the earth's axis and seasons", "revolution of the earth and seasons"],
        keywords: ["23.5 degrees", "axial tilt", "summer", "winter", "hemisphere", "day length", "revolution", "leaning toward the sun"],
        tools: [{ k: "gol", label: "Tilted Earth orbiting the Sun" }, { k: "activity", label: "Torch at a slant vs straight-on: same light, bigger patch" }, { k: "web", label: "Sun Rays Orientation — how sunlight lands on Earth through the year", url: "https://alokm.com/astro/year_v2.html" }]
    },
    {
        id: "seasonal-skies", name: "Seasonal Skies", domain: "sky", level: 2,
        desc: "The night sky changes with the calendar — Orion rules winter evenings, Scorpius the monsoon sky — because Earth's orbit points our nights toward different stars each season.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["constellations", "seasons"],
        grades: [8],
        aliases: ["seasonal constellations", "night sky changes with the seasons", "winter sky and summer sky", "which constellations are visible in each season"],
        keywords: ["Orion in winter", "Scorpius", "seasonal star map", "evening sky", "annual drift", "same time each month"],
        tools: [{ k: "sky", label: "Compare the sky in January vs June" }, { k: "gol", label: "Orbit-driven sky change animation" , url: "https://gol.kaalshodh.com/app#planetarium"}]
    },
    {
        id: "ecliptic-zodiac", name: "Ecliptic & Zodiac", domain: "sky", level: 2,
        desc: "The Sun's yearly path against the stars is the ecliptic; the belt of constellations it crosses is the zodiac. The Moon and planets always keep near this line.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["seasonal-skies", "planets-wanderers"],
        grades: [8, 11],
        aliases: ["ecliptic", "the zodiac", "zodiac belt", "the sun's yearly path among the stars", "zodiacal constellations"],
        keywords: ["12 zodiac signs", "rashi", "obliquity", "Aries", "Taurus", "band of constellations", "planets keep near this line"],
        tools: [{ k: "sky", label: "Trace the ecliptic line across tonight's sky" }, { k: "gol", label: "Sun's motion through the zodiac" }, { k: "web", label: "Solar & Ecliptic playground — play with the Sun on the ecliptic", url: "https://alokm.com/astro/solar.html" }]
    },
    {
        id: "angular-measure", name: "Angles on the Sky", domain: "sky", level: 2,
        desc: "Sky positions and sizes are measured in angles: your fist at arm's length spans about 10°, the Moon half a degree. Degrees, arcminutes and arcseconds are the astronomer's ruler.",
        tracks: ["school-middle", "school-high", "club", "photo", "indic"],
        prereqs: ["sky-dome", "angles-protractor"],
        misconceptions: ["Thinking angular size tells you real size — the Sun and Moon both span about half a degree, yet the Sun is 400 times wider; it is also 400 times further away", "Believing the full Moon is huge on the sky, a fist or a coin at arm's length — it is half a degree, comfortably covered by a little fingernail", "Thinking two stars that look close together are close in space — angular separation is a difference of direction and nothing more"],
        grades: [8, 11],
        aliases: ["angular measurement in the sky", "angular size", "measuring angles on the sky", "angular diameter"],
        keywords: ["degrees", "arcminutes", "arcseconds", "half a degree", "fist at arm's length", "10 degrees", "angular separation", "1920 arcseconds"],
        tools: [{ k: "activity", label: "Calibrate your hand: fist ≈ 10°, spread hand ≈ 20°" }, { k: "android", label: "Altaz — measure altitude & azimuth by pointing your phone", url: "https://play.google.com/store/apps/details?id=com.alokm.altaz" }]
    },
    {
        id: "milky-way-band", name: "The Milky Way Band", domain: "sky", level: 2,
        desc: "From a dark site a faint luminous band arches across the sky — the combined light of billions of stars in our galaxy's disc, seen from inside it.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["stars-vary"],
        misconceptions: ["Thinking those sweeping spiral pictures of the Milky Way are photographs — nobody has ever been outside it; every one is an artist's impression or a picture of some other galaxy", "Believing the band is a cloud or a smear of gas — binoculars break it straight into countless stars, too faint and too crowded for the eye to separate", "Thinking the Milky Way is a separate object off in the sky — we are inside it, so every naked-eye star belongs to it; the band is simply the crowded direction along the disc"],
        grades: [8],
        aliases: ["the milky way", "akash ganga", "milky way band", "our galaxy seen from inside"],
        keywords: ["galactic disc", "Sagittarius", "faint luminous band", "billions of stars", "galactic centre", "Mandakini", "dark site"],
        tools: [{ k: "activity", label: "Dark-sky trip: map the band against constellations" }, { k: "gol", label: "Gol Milky Way scene — the galactic band across the dome", url: "https://gol.kaalshodh.com/app#milkyway" }]
    },
    {
        id: "light-pollution", name: "Light Pollution", domain: "sky", level: 2,
        desc: "Artificial skyglow erases faint stars; the Bortle scale grades sky darkness from 1 (pristine) to 9 (inner city). Shielded, warm, dimmed lighting brings stars back.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["stars-vary"],
        misconceptions: ["Thinking light pollution is only an astronomer's complaint — the same wasted upward light disrupts nesting birds and insects, spoils sleep, and is paid for on somebody's electricity bill", "Believing a bright city sky is simply how cities are — most skyglow comes from unshielded fixtures throwing light sideways and upward, where nobody needed it in the first place", "Assuming a light-pollution filter fixes a Bortle 8 sky — it rejects a few streetlamp wavelengths and does nothing at all for broad-spectrum targets like galaxies"],
        grades: [8],
        aliases: ["light pollution", "skyglow", "artificial night lighting", "dark sky preservation"],
        keywords: ["Bortle scale", "shielded lighting", "urban sky", "limiting magnitude", "dark sky site", "glare", "sky brightness"],
        tools: [{ k: "activity", label: "Count stars in the Little Dipper / around Orion to grade your sky" }]
    },
    {
        id: "satellite-spotting", name: "Spotting Satellites", domain: "sky", level: 2,
        desc: "Steady 'stars' gliding across twilight skies are sunlit spacecraft — the ISS outshines everything but the Moon and Venus. They fade when they enter Earth's shadow.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: ["diurnal-motion"],
        grades: [8],
        aliases: ["spotting satellites", "artificial satellites in the night sky", "seeing the ISS", "satellite passes"],
        keywords: ["International Space Station", "twilight pass", "earth's shadow", "steady moving light", "Starlink", "low earth orbit", "sunlit spacecraft"],
        tools: [{ k: "whatsup", label: "ISS and bright satellite passes" }]
    },

    // ===================== CELESTIAL SPHERE & MOTION =====================
    {
        id: "celestial-sphere", name: "Celestial Sphere", domain: "sphere", level: 3,
        desc: "A model sphere of infinite radius carrying the stars, with celestial poles and a celestial equator projected from Earth's own. It turns star positions into geometry we can compute.",
        tracks: ["school-middle", "school-high", "club", "photo", "indic"],
        prereqs: ["diurnal-motion", "angular-measure", "model-thinking"],
        misconceptions: ["Taking the celestial sphere literally, as if the stars really were stuck to one shell at one distance — it is a bookkeeping model that turns directions into geometry, nothing more", "Thinking the celestial equator and poles are features of the sky rather than Earth's own equator and axis projected outward — they are ours, borrowed and thrown onto the stars"],
        grades: [11],
        aliases: ["celestial sphere", "celestial equator and poles", "the imaginary sphere of the sky"],
        keywords: ["celestial equator", "celestial poles", "infinite radius", "projection of the earth", "sphere of stars", "vernal equinox point"],
        tools: [{ k: "gol", label: "3D celestial sphere you can spin" , url: "https://gol.kaalshodh.com/astrolabe"}]
    },
    {
        id: "altaz-coords", name: "Altitude–Azimuth Coordinates", domain: "sphere", level: 3,
        desc: "The local way to point: azimuth around the horizon from north, altitude up from the horizon. Simple and intuitive — but every star's alt-az changes by the minute.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["celestial-sphere", "cardinal-directions"],
        misconceptions: ["Writing an object's altitude and azimuth down as though it were a fixed address — unlike RA and Dec, alt-az changes minute by minute and means nothing without the time and your location", "Measuring azimuth from whatever way you happen to be facing — it runs clockwise from due north, so a sloppy north throws every pointing off by the same angle"],
        aliases: ["altitude and azimuth", "horizontal coordinate system", "alt-az coordinates", "altazimuth coordinates"],
        keywords: ["azimuth from north", "altitude above horizon", "zenith distance", "local coordinates", "degrees clockwise", "alt-az mount"],
        tools: [{ k: "sky", label: "Read alt-az of any object right now" }, { k: "android", label: "Altaz — 3D compass reading altitude/azimuth of anything you point at", url: "https://play.google.com/store/apps/details?id=com.alokm.altaz" }]
    },
    {
        id: "equatorial-coords", name: "Right Ascension & Declination", domain: "sphere", level: 3,
        desc: "Sky coordinates that rotate with the stars: declination is celestial latitude, right ascension the sky's longitude measured in hours. A star's RA/Dec is (almost) permanent — this is how catalogues work.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["celestial-sphere"],
        aliases: ["right ascension and declination", "equatorial coordinate system", "RA and Dec"],
        keywords: ["right ascension", "declination", "celestial latitude", "celestial equator", "star catalogue", "hour angle", "J2000", "measured in hours"],
        tools: [{ k: "sky", label: "Look up RA/Dec of bright stars" }, { k: "gol", label: "Gol — coordinate systems on the celestial sphere" }]
    },
    {
        id: "circumpolar-stars", name: "Circumpolar Stars", domain: "sphere", level: 3,
        desc: "Stars close enough to the celestial pole never set for your latitude — they circle it all night, all year. Which stars are circumpolar depends only on where you stand.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["pole-star", "celestial-sphere"],
        misconceptions: ["Thinking every star rises and sets — stars within your latitude's angle of the pole just circle it all night and never touch the horizon", "Assuming the same stars are circumpolar for everybody — it depends entirely on where you stand: from the equator none are, from the pole every visible star is"],
        grades: [8],
        aliases: ["circumpolar stars", "stars that never set", "circumpolar constellations"],
        keywords: ["never set", "latitude", "celestial pole", "circle the pole", "always above the horizon", "Ursa Major circumpolar"],
        tools: [{ k: "gol", label: "Circumpolar zone vs latitude animation" }]
    },
    {
        id: "meridian-transit", name: "Meridian & Transit", domain: "sphere", level: 3,
        desc: "The meridian is the north–south line through your zenith; objects are highest — and best observed — when they cross (transit) it. Transit timing is the backbone of classical positional astronomy.",
        tracks: ["school-high", "club", "photo", "indic"],
        prereqs: ["altaz-coords"],
        misconceptions: ["Thinking an object is equally worth observing whenever it happens to be up — it is highest, and seen through the least air, only as it transits your meridian; low in the east it is mush", "Treating the meridian as a line printed on a chart, or muddling it with the celestial equator — it is your own north-south line through your zenith, and it moves when you do"],
        grades: [11],
        aliases: ["meridian transit", "the celestial meridian", "culmination", "transit across the meridian", "upper culmination"],
        keywords: ["highest point", "local noon", "north-south line", "transit instrument", "meridian circle", "best time to observe", "positional astronomy"],
        tools: [{ k: "whatsup", label: "Transit times of tonight's objects" }, { k: "web", label: "Jantar Mantar Dashboard — hour angle & local noon in real time", url: "https://alokm.com/jantarmantar/" }]
    },
    {
        id: "sidereal-day", name: "Sidereal vs Solar Day", domain: "sphere", level: 3,
        desc: "Earth turns once relative to the stars in 23h 56m — 4 minutes shorter than the solar day, because we also orbit the Sun. That 4 minutes is why the constellations drift with the seasons.",
        tracks: ["school-high", "club", "photo", "indic"],
        prereqs: ["equatorial-coords", "seasonal-skies"],
        grades: [11],
        aliases: ["sidereal day", "sidereal and solar day", "solar day versus sidereal day", "length of the day relative to the stars"],
        keywords: ["23 hours 56 minutes", "4 minutes shorter", "solar day", "sidereal time", "star drift", "seasonal drift of constellations"],
        tools: [{ k: "gol", label: "Sidereal vs solar day animation" }]
    },
    {
        id: "precession", name: "Precession of the Equinoxes", domain: "sphere", level: 4,
        desc: "Earth's axis slowly cones like a spinning top, once in about 25,800 years. Pole stars change (Thuban → Polaris → Vega) and the equinox point slides westward through the zodiac.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["pole-star", "ecliptic-zodiac", "celestial-sphere", "spin-axis"],
        grades: [11],
        aliases: ["precession of the equinoxes", "axial precession", "wobble of the earth's axis", "ayanamsa"],
        keywords: ["25800 years", "26000 years", "Thuban", "Vega", "spinning top", "changing pole star", "equinox point slides", "ayanamsha"],
        tools: [{ k: "gol", label: "Precessing axis and shifting pole stars" }]
    },
    {
        id: "star-charts", name: "Star Charts & Planetarium Apps", domain: "sphere", level: 2,
        desc: "Reading a sky map: orientation, scale, magnitudes, and matching chart to sky. A planisphere or app turns the catalogue sky into 'what's above me right now'.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["constellations", "angular-measure", "star-names", "maps-scale"],
        misconceptions: ["Expecting the chart to match the eyepiece — a diagonal flips it left for right and a Newtonian turns it round, so beginners hop confidently in exactly the wrong direction", "Holding a chart or planisphere fixed like a road map — a sky map only reads correctly when you turn it to face the direction you are looking, horizon edge down", "Assuming a planetarium app makes charts unnecessary — its white screen wrecks your dark adaptation, and zoomed in it hides the very patterns you navigate by"],
        grades: [8],
        aliases: ["star charts", "sky map", "planisphere", "planetarium app", "star atlas"],
        keywords: ["Stellarium", "magnitude scale", "chart orientation", "rotating star wheel", "SkySafari", "matching chart to sky", "sky map reading"],
        tools: [{ k: "sky", label: "Interactive chart for your location" }, { k: "activity", label: "Make a paper planisphere" }, { k: "web", label: "Bhagol,  the Celestial Map — planets,  constellations & zodiac with time control", url: "https://alokm.com/khagol/bhagol.html" }]
    },

    // ============================ TIME & CALENDARS ============================
    {
        id: "shadow-clock", name: "Gnomon & Local Noon", domain: "time", level: 2,
        desc: "A vertical stick tells time: its shadow is shortest at local noon, pointing exactly north–south. The gnomon (shanku) is astronomy's oldest instrument.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["sun-daily-arc", "light-shadow"],
        misconceptions: ["Expecting the shadow to be shortest when the clock reads 12:00 — local noon depends on your longitude, and IST is fixed to 82.5°E, so the Sun peaks nearly half an hour late in Mumbai", "Thinking the noon shadow disappears because the Sun is overhead — outside the tropics it never is; the shadow only reaches its shortest, pointing due north or south", "Believing the noon shadow is the same length all year — its length changes day by day with the Sun's height, which is exactly what makes the gnomon useful"],
        grades: [4, 5, 6],
        aliases: ["gnomon", "local noon", "shadow stick", "shanku", "shadow clock"],
        keywords: ["shortest shadow", "vertical stick", "north-south line", "midday", "shadow length measurement", "shanku yantra", "oldest instrument"],
        tools: [{ k: "activity", label: "Find local noon with a plumb stick; compare with clock noon" }, { k: "web", label: "Shanku Yantra generator — the gnomon as a date-teller", url: "https://alokm.com/astro/shanku.html" }, { k: "gol", label: "Gol Shanku Yantra scene — the gnomon's shadow through the day", url: "https://gol.kaalshodh.com/app#shanku" }]
    },
    {
        id: "solar-time-zones", name: "Solar Time & Time Zones", domain: "time", level: 3,
        desc: "Local solar time differs at every longitude, so clocks are grouped into zones — IST is the solar time near 82.5°E. Your sundial and your watch honestly disagree.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["shadow-clock", "latitude-longitude"],
        grades: [6, 9, 11],
        aliases: ["time zones", "local solar time", "standard time and local time", "indian standard time"],
        keywords: ["IST", "82.5 degrees east", "longitude", "prime meridian", "GMT", "UTC", "15 degrees per hour", "standard meridian"],
        tools: [{ k: "activity", label: "Compute your longitude correction to IST from local noon" }, { k: "web", label: "Local Noon — local noon time for any place,  any date", url: "https://alokm.com/astro/localnoon.html" }, { k: "web", label: "Sunrise Isophotes — globe lines of equal sunrise/sunset time", url: "https://alokm.com/astro/isophotes.html" }]
    },
    {
        id: "equation-of-time", name: "Equation of Time & Analemma", domain: "time", level: 4,
        desc: "Sundial time runs up to 16 minutes fast or slow through the year, because Earth's orbit is elliptical and tilted. Photograph the noon Sun weekly and it traces a figure-8 — the analemma.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["solar-time-zones", "keplers-laws"],
        aliases: ["equation of time", "the analemma", "sundial time versus clock time", "figure of eight traced by the sun"],
        keywords: ["16 minutes", "figure-8", "elliptical orbit", "obliquity", "noon sun photograph", "sundial correction", "fast or slow"],
        tools: [{ k: "gol", label: "Analemma build-up animation" }, { k: "activity", label: "Year-long fixed-camera analemma project" }, { k: "web", label: "One Year Around the Sun — orbit,  analemma & equation of time", url: "https://alokm.com/astro/year.html" }, { k: "web", label: "Analemma Generator — change orbital parameters,  reshape the analemma", url: "https://alokm.com/astro/analemmagenerator.html" }]
    },
    {
        id: "lunar-months", name: "Synodic & Sidereal Month", domain: "time", level: 3,
        desc: "The Moon laps the stars in 27.3 days (sidereal) but takes 29.5 days between new moons (synodic), because the Sun moves too. Two different 'months' from one orbit.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["moon-phases"],
        grades: [8],
        aliases: ["synodic month", "sidereal month", "synodic and sidereal month", "lunar month"],
        keywords: ["29.5 days", "27.3 days", "new moon to new moon", "moon's orbital period", "lunation", "masa", "two kinds of month"],
        tools: [{ k: "gol", label: "Sidereal vs synodic month animation" }]
    },
    {
        id: "calendar-systems", name: "Calendar Systems", domain: "time", level: 3,
        desc: "Solar calendars track the seasons, lunar calendars the Moon, and lunisolar calendars juggle both with leap arrangements. Every calendar is an astronomy problem frozen into culture.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["lunar-months", "seasons"],
        grades: [6],
        aliases: ["calendar systems", "lunar and solar calendars", "lunisolar calendar", "types of calendars"],
        keywords: ["Vikram Samvat", "Saka calendar", "Hijri", "intercalary month", "adhik maas", "Gregorian", "panchang", "leap month"],
        tools: [{ k: "activity", label: "Compare today's date across Gregorian, Islamic, and Vikram calendars" }, { k: "web", label: "Bodhi Samvatsara — a Buddhist-tradition calendar system", url: "https://alokm.com/bodhi/" }]
    },
    {
        id: "equinox-solstice", name: "Equinoxes & Solstices", domain: "time", level: 2,
        desc: "Four turning points of the year: two equinoxes when day equals night, two solstices when the Sun's arc is highest or lowest. They anchor seasons and calendars worldwide.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["seasons", "sun-daily-arc"],
        misconceptions: ["Thinking day and night are exactly 12 hours at the equinox — refraction and the Sun's own disc stretch daylight by several minutes, so truly equal day and night falls a few days off", "Believing the longest day must be the hottest — land and sea take weeks to warm, so the heat of summer lags well behind the June solstice", "Thinking the solstice is a day when the Sun stops or the season switches on — it is just the turning point of a smooth, continuous swing in the Sun's height"],
        grades: [6, 11],
        aliases: ["equinoxes and solstices", "summer solstice and winter solstice", "equinox", "solstice", "vernal equinox and autumnal equinox"],
        keywords: ["21 June", "22 December", "21 March", "23 September", "longest day", "equal day and night", "uttarayana", "dakshinayana", "makar sankranti"],
        tools: [{ k: "gol", label: "Sunrise point drifting along the horizon through the year" }, { k: "activity", label: "Mark sunrise direction on the horizon each month" }, { k: "web", label: "True Equinox — the day when day and night are actually equal", url: "https://alokm.com/astro/equinox.html" }, { k: "kaal", label: "Astro Events — solstices & equinoxes by year", url: "https://kaalshodh.com/events.html" }]
    },

    // ============================== SOLAR SYSTEM ==============================
    {
        id: "earth-sphere", name: "Earth is a Sphere", domain: "solar", level: 2,
        desc: "Ships sinking hull-first, new stars rising as you travel south, and Earth's always-round shadow on the eclipsed Moon — classical proofs, no spacecraft needed.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["sky-dome", "earth-globe", "gravity-basics"],
        misconceptions: ["Thinking everyone believed in a flat Earth until Columbus sailed — the sphere was standard among educated Greeks by 350 BCE, and had already been measured", "Believing you need a spacecraft or a photo from orbit to know — ships vanishing hull-first and Earth's always-round shadow on the eclipsed Moon settle it from the ground", "Objecting that people on a round Earth would fall off the bottom — down means toward the centre everywhere, so nobody is upside down"],
        grades: [3, 6],
        aliases: ["earth is a sphere", "shape of the earth", "spherical earth", "proofs that the earth is round"],
        keywords: ["curved horizon", "ships hull first", "circular shadow", "Aristotle", "pole star altitude", "sailing south", "new stars rise", "no spacecraft needed"],
        tools: [{ k: "activity", label: "List and debate the classical evidences" }]
    },
    {
        id: "eratosthenes", name: "Measuring the Earth", domain: "solar", level: 3,
        desc: "Eratosthenes sized the Earth around 240 BCE with two sticks and a noon shadow angle. Two schools at different latitudes can repeat it today over WhatsApp.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["earth-sphere", "shadow-clock", "angular-measure", "latitude-longitude"],
        misconceptions: ["Thinking he got a good answer by luck, or that it was only a rough guess — the geometry is exact; the uncertainty is in the stadion's length and the Syene-Alexandria distance", "Believing you must travel around the world, or leave it, to measure it — two sticks, two towns and one noon shadow angle are enough", "Thinking the shadow angle gave him Earth's diameter — it gives the circumference, about 40,000 km, and he landed within a few per cent"],
        grades: [6, 8],
        aliases: ["eratosthenes experiment", "measuring the earth's circumference", "circumference of the earth", "eratosthenes' measurement"],
        keywords: ["Syene", "Alexandria", "7.2 degrees", "stadia", "noon shadow", "gnomon", "40, 000 km", "240 BCE", "two sticks"],
        tools: [{ k: "activity", label: "Partner-school Eratosthenes measurement at local noon" }]
    },
    {
        id: "moon-orbit", name: "Moon Orbits Earth", domain: "solar", level: 2,
        desc: "The Moon circles Earth roughly monthly at about 384,000 km — around 30 Earth-diameters away. Its orbital motion is what drives the phase cycle and its nightly 13° eastward drift.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["moon-phases"],
        misconceptions: ["Calling the far side the 'dark side' — it gets exactly as much sunlight as the near side, and is fully lit at new moon; it is unseen, not unlit", "Reading the textbook diagram literally, as a long ellipse round a static Earth — the orbit is nearly circular, and the whole pair is being carried around the Sun as it goes", "Thinking the same face stays turned to us because the Moon does not rotate — it rotates exactly once per orbit, which is precisely why it does"],
        grades: [5, 6],
        aliases: ["moon's orbit around the earth", "revolution of the moon", "moon revolves around the earth", "lunar orbit"],
        keywords: ["384, 000 km", "sidereal month", "27.3 days", "synodic month", "29.5 days", "eastward drift", "13 degrees per day", "natural satellite"],
        tools: [{ k: "activity", label: "Scale model: football Earth, tennis-ball Moon 7 m apart" }, { k: "kaal", label: "Mandala orrery — the Sun-Earth-Moon system in motion", url: "https://mandal.kaalshodh.com" }, { k: "kaal", label: "Lunapedia — distance, ecliptic latitude & cultural moon names", url: "https://kaalshodh.com/lunapedia.html" }]
    },
    {
        id: "tidal-locking", name: "Tidal Locking", domain: "solar", level: 3,
        desc: "The Moon rotates exactly once per orbit, so one face is forever turned to Earth. Tidal friction braked it into this lock — the fate of most large moons.",
        tracks: ["school-high", "club"],
        prereqs: ["moon-orbit"],
        grades: [6],
        aliases: ["tidal locking", "synchronous rotation", "far side of the moon", "same face of the moon"],
        keywords: ["near side", "tidal friction", "libration", "captured rotation", "one spin per orbit", "27.3 days", "dark side of the moon"],
        tools: [{ k: "gol", label: "Locked vs unlocked rotation animation" }, { k: "activity", label: "Walk around a chair while always facing it" }]
    },
    {
        id: "lunar-eclipse", name: "Lunar Eclipses", domain: "solar", level: 2,
        desc: "At full moon, the Moon can pass through Earth's shadow and turn copper-red — sunset light bent through our atmosphere. Safe to watch, visible from the whole night side.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["moon-orbit", "earth-sphere", "light-shadow"],
        misconceptions: ["Expecting a lunar eclipse at every full moon — the Moon's orbit is tilted about 5°, so most months it passes above or below Earth's shadow", "Thinking Earth's shadow makes the phases too, and an eclipse is just a bigger helping of the same — the phases involve no shadow at all", "Believing the eclipsed Moon should go black — sunlight bent through Earth's atmosphere still reaches it, so it glows copper with every sunrise and sunset on Earth at once"],
        grades: [6, 8],
        aliases: ["lunar eclipse", "eclipse of the moon", "chandra grahan", "blood moon"],
        keywords: ["earth's shadow", "full moon", "copper red", "reddish moon", "umbra", "penumbra", "penumbral eclipse", "safe to watch", "totality"],
        tools: [{ k: "gol", label: "Shadow-cone geometry animation" }, { k: "whatsup", label: "Upcoming eclipses" }]
    },
    {
        id: "solar-eclipse", name: "Solar Eclipses", domain: "solar", level: 2,
        desc: "At new moon, the Moon's small shadow can sweep across Earth, briefly hiding the Sun. Totality happens because the Moon and Sun span the same half-degree — a cosmic coincidence.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["moon-orbit", "angular-measure", "light-shadow"],
        misconceptions: ["Expecting a solar eclipse at every new moon — the 5° tilt of the Moon's orbit means its small shadow usually misses Earth altogether", "Thinking a total solar eclipse is seen from half the planet the way a lunar one is — the shadow spot is a couple of hundred km wide and races along a narrow track", "Believing it is safe to look once the Sun is mostly covered, or through sunglasses, smoked glass or an X-ray film — only totality itself, inside that narrow track, is safe for the naked eye"],
        grades: [6, 8],
        aliases: ["solar eclipse", "eclipse of the sun", "surya grahan", "total solar eclipse", "annular eclipse"],
        keywords: ["path of totality", "new moon", "moon's shadow", "corona", "diamond ring", "Baily's beads", "annularity", "ring of fire", "half a degree", "solar filter"],
        tools: [{ k: "gol", label: "Umbra track across Earth animation" }, { k: "activity", label: "Pinhole projection of the Sun" }, { k: "android", label: "Solar Eclipse — visualize eclipses across 5000 years", url: "https://play.google.com/store/apps/details?id=com.alokm.solareclipse" }]
    },
    {
        id: "eclipse-seasons", name: "Eclipse Seasons & Nodes", domain: "solar", level: 4,
        desc: "The Moon's orbit is tilted 5°, so eclipses happen only when full/new moon falls near the orbit's crossing points (nodes) — twice a year. The 18-year Saros cycle repeats the pattern.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["lunar-eclipse", "solar-eclipse", "ecliptic-zodiac"],
        aliases: ["eclipse seasons", "lunar nodes", "saros cycle", "why eclipses do not happen every month"],
        keywords: ["5 degree tilt", "ascending node", "descending node", "Rahu", "Ketu", "draconic month", "18 years 11 days", "eclipse limit", "node crossing"],
        tools: [{ k: "gol", label: "Tilted lunar orbit and node crossings" }, { k: "android", label: "Solar Eclipse — explore eclipse patterns over 5000 years", url: "https://play.google.com/store/apps/details?id=com.alokm.solareclipse" }, { k: "kaal", label: "Parva timeline — moons, eclipses & node events across ages", url: "https://kaalshodh.com/parva.html" }]
    },
    {
        id: "retrograde-motion", name: "Retrograde Motion", domain: "solar", level: 3,
        desc: "Planets occasionally loop backward against the stars for weeks. It puzzled astronomers for two millennia — it's a simple overtaking effect between orbiting worlds.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["planets-wanderers", "ecliptic-zodiac"],
        aliases: ["retrograde motion", "apparent retrograde motion", "retrograde loop", "vakri gati"],
        keywords: ["epicycle", "Ptolemy", "prograde", "direct motion", "Mars loop", "overtaking", "opposition", "backward loop against the stars"],
        tools: [{ k: "gol", label: "Overtaking-orbits retrograde animation" }, { k: "web", label: "Chakra,  the Celestial Wheel — planetary motion patterns over time", url: "https://alokm.com/khagol/chakra.html" }, { k: "kaal", label: "Parva timeline — every retrograde period, past & future", url: "https://kaalshodh.com/parva.html" }]
    },
    {
        id: "heliocentric-model", name: "The Heliocentric Model", domain: "solar", level: 3,
        desc: "From Aristarchus and Aryabhata's rotating Earth to Copernicus and Galileo: putting the Sun at the centre explains retrograde loops and Venus's phases with one clean idea.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["retrograde-motion", "model-thinking"],
        grades: [11],
        aliases: ["heliocentric model", "sun centred model", "copernican model", "heliocentrism", "geocentric and heliocentric models"],
        keywords: ["Copernicus", "Galileo", "Aristarchus", "Aryabhata", "Ptolemaic system", "geocentric", "De Revolutionibus", "epicycles", "earth rotates"],
        tools: [{ k: "gol", label: "Geocentric vs heliocentric side-by-side" }, { k: "web", label: "Chakra,  the Celestial Wheel — geocentric vs heliocentric models", url: "https://alokm.com/khagol/chakra.html" }, { k: "kaal", label: "Mandala orrery — geocentric vs heliocentric Sun-Earth-Moon", url: "https://mandal.kaalshodh.com" }]
    },
    {
        id: "keplers-laws", name: "Kepler's Laws", domain: "solar", level: 4,
        desc: "Orbits are ellipses with the Sun at a focus; planets sweep equal areas in equal times; period squared tracks distance cubed. Three rules that turned astronomy quantitative.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["heliocentric-model"],
        grades: [11],
        aliases: ["kepler's laws", "kepler's laws of planetary motion", "law of periods", "law of areas", "law of orbits"],
        keywords: ["ellipse", "focus", "semi-major axis", "equal areas in equal times", "T squared", "eccentricity", "perihelion", "aphelion", "Tycho Brahe", "areal velocity"],
        tools: [{ k: "gol", label: "Equal-areas sweep animation" }, { k: "activity", label: "Draw an ellipse with two pins and a loop of string" }]
    },
    {
        id: "gravitation", name: "Universal Gravitation", domain: "solar", level: 4,
        desc: "Newton showed one inverse-square force explains falling apples, the Moon's orbit and Kepler's laws together. Gravity is the engine of everything astronomy studies.",
        tracks: ["school-high", "club"],
        prereqs: ["keplers-laws", "gravity-basics"],
        grades: [9, 11],
        aliases: ["universal law of gravitation", "newton's law of gravitation", "law of universal gravitation", "universal gravitation"],
        keywords: ["inverse square", "gravitational constant", "6.67", "Cavendish", "acceleration due to gravity", "9.8", "falling apple", "point mass", "Newton", "gravitational force"],
        tools: [{ k: "gol", label: "Newton's cannonball thought experiment" }]
    },
    {
        id: "orbits-satellites", name: "Orbits & Artificial Satellites", domain: "solar", level: 4,
        desc: "An orbit is perpetual falling that keeps missing the ground. Speed and altitude set the orbit: ISS circles in 92 minutes, geostationary satellites hover over one longitude.",
        tracks: ["school-high", "club"],
        prereqs: ["gravitation"],
        grades: [9, 11],
        aliases: ["artificial satellites", "satellite orbits", "geostationary satellite", "orbital motion of satellites"],
        keywords: ["ISS", "escape velocity", "orbital velocity", "11.2 km/s", "geostationary", "36, 000 km", "low earth orbit", "polar orbit", "INSAT", "92 minutes"],
        tools: [{ k: "gol", label: "Orbital speed vs altitude sandbox" }, { k: "whatsup", label: "Track real satellites overhead" }]
    },
    {
        id: "tides", name: "Tides", domain: "solar", level: 3,
        desc: "The Moon pulls Earth's near side harder than its far side, raising two water bulges — hence two tides a day. Sun-Moon alignment makes spring tides; right angles make neaps.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["moon-orbit", "gravity-basics"],
        grades: [7, 11],
        aliases: ["ocean tides", "high tide and low tide", "spring tides and neap tides", "tides in the sea"],
        keywords: ["tidal bulge", "spring tide", "neap tide", "tidal range", "twice a day", "flood tide", "ebb tide", "Gulf of Khambhat", "moon's pull on water"],
        tools: [{ k: "gol", label: "Tidal bulge animation with Moon phases" }]
    },
    {
        id: "planetary-configurations", name: "Planetary Configurations", domain: "solar", level: 3,
        desc: "Opposition, conjunction, greatest elongation: the geometry words that say where a planet is relative to the Sun — and therefore when it rises and how bright it looks.",
        tracks: ["school-high", "club", "photo", "indic"],
        prereqs: ["heliocentric-model", "planets-wanderers"],
        aliases: ["planetary configurations", "opposition and conjunction", "greatest elongation", "elongation of a planet"],
        keywords: ["opposition", "conjunction", "quadrature", "inferior conjunction", "superior conjunction", "evening star", "morning star", "syzygy"],
        tools: [{ k: "whatsup", label: "Current configurations and elongations" }, { k: "gol", label: "Configuration geometry animation" , url: "https://gol.kaalshodh.com/app#planets"}, { k: "web", label: "Chakra,  the Celestial Wheel — configurations as orbital geometry", url: "https://alokm.com/khagol/chakra.html" }, { k: "kaal", label: "Astro Events — transits, retrogrades & combustions by year", url: "https://kaalshodh.com/events.html" }]
    },
    {
        id: "phases-of-venus", name: "Phases of Venus", domain: "solar", level: 3,
        desc: "Venus shows Moon-like phases tied to its size: a small full disc far away, a large thin crescent nearby. Galileo's telescope made this the killer evidence for heliocentrism.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["planetary-configurations", "moon-phases"],
        aliases: ["phases of venus", "venus shows phases", "galileo's observations of venus"],
        keywords: ["crescent Venus", "gibbous Venus", "inferior conjunction", "angular size", "Galileo", "evidence for heliocentrism", "Ptolemaic prediction", "changing disc size"],
        tools: [{ k: "gol", label: "Venus phase-and-size cycle" }]
    },
    {
        id: "solar-system-inventory", name: "The Solar System Family", domain: "solar", level: 2,
        desc: "Eight planets, their moons, dwarf planets, asteroid belt and Kuiper belt — who's who, their order, and their wildly different sizes and characters.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: ["planets-wanderers"],
        grades: [5, 6],
        aliases: ["members of the solar system", "planets of the solar system", "the solar system family", "eight planets"],
        keywords: ["Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "dwarf planet", "inner planets", "gas giants"],
        tools: [{ k: "web", label: "Planet Days — rotation periods of all planets compared", url: "https://alokm.com/astro/planetdays.html" }]
    },
    {
        id: "scale-of-solar-system", name: "Scale of the Solar System", domain: "solar", level: 3,
        desc: "With Earth as a peppercorn, the Sun is a football 25 m away and Neptune is 750 m down the road. The emptiness is the real lesson; the AU is the ruler.",
        tracks: ["school-middle", "school-high", "club"],
        // heliocentric-model was a prereq here, but that contradicted the
        // grades: the walk is a class-6 activity and the Copernican argument
        // is class 11. The layout (inventory) suffices; the argument is related.
        prereqs: ["solar-system-inventory", "big-numbers", "maps-scale"],
        related: ["heliocentric-model"],
        grades: [6, 11],
        aliases: ["scale of the solar system", "distances in the solar system", "astronomical unit", "scale model of the solar system"],
        keywords: ["1 AU", "150 million km", "light minutes", "peppercorn", "30 AU", "8 light minutes", "solar system walk", "emptiness", "orders of magnitude"],
        tools: [{ k: "activity", label: "Peppercorn solar-system walk across the school ground" }]
    },
    {
        id: "galilean-moons", name: "Galilean Moons", domain: "solar", level: 3,
        desc: "Jupiter's four big moons shuffle visibly from night to night — a miniature solar system in any small telescope, and Galileo's proof that not everything orbits Earth.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["solar-system-inventory"],
        aliases: ["galilean moons", "moons of jupiter", "galilean satellites", "jupiter's four moons"],
        keywords: ["Io", "Europa", "Ganymede", "Callisto", "1610", "Galileo", "Jovian system", "shadow transit", "miniature solar system"],
        tools: [{ k: "whatsup", label: "Tonight's Galilean moon positions" }, { k: "web", label: "Jovian Spiral — Galilean moon motion for the next 48 hours", url: "https://alokm.com/astro/jovian.html" }]
    },
    {
        id: "comets", name: "Comets", domain: "solar", level: 2,
        desc: "Dirty snowballs on long elliptical orbits that grow tails — always pointing away from the Sun — when sunlight boils their ices. Halley returns every 76 years.",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: ["solar-system-inventory"],
        grades: [6],
        aliases: ["comets", "comet tails", "halley's comet", "dhoomketu"],
        keywords: ["coma", "nucleus", "ion tail", "dust tail", "Halley", "76 years", "Oort cloud", "dirty snowball", "NEOWISE", "tail points away from the sun"],
        tools: [{ k: "activity", label: "Follow a currently-visible comet: sketch its position and tail over several nights" }]
    },
    {
        id: "meteor-showers", name: "Meteors & Meteor Showers", domain: "solar", level: 2,
        desc: "Shooting stars are dust grains burning up 80–100 km overhead. When Earth crosses a comet's debris trail we get an annual shower, radiating from one point among the stars.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "photo"],
        prereqs: ["comets", "air-atmosphere"],
        grades: [6],
        aliases: ["meteor shower", "shooting stars", "meteors", "falling stars"],
        keywords: ["radiant", "Perseids", "Geminids", "Leonids", "meteoroid", "80 km", "fireball", "ZHR", "comet debris trail", "burning up in the atmosphere"],
        tools: [{ k: "whatsup", label: "Next meteor shower dates" }, { k: "activity", label: "Group meteor count on a shower peak night" }]
    },
    {
        id: "asteroids-kuiper", name: "Asteroids & the Kuiper Belt", domain: "solar", level: 2,
        desc: "Rocky leftovers between Mars and Jupiter, icy ones beyond Neptune (Pluto's realm). Small-body surveys are one field where amateurs still make discoveries.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["solar-system-inventory"],
        grades: [6],
        aliases: ["asteroid belt", "asteroids", "kuiper belt", "minor planets"],
        keywords: ["Ceres", "Vesta", "Pluto", "Eris", "trans-Neptunian", "trojan", "between Mars and Jupiter", "beyond Neptune", "small bodies", "planetoid"],
        tools: [{ k: "sky", label: "Find and track a bright asteroid (e.g. Vesta) against the stars over a week" }]
    },

    // ============================ LIGHT & OPTICS ============================
    {
        id: "light-travel", name: "Light & Lookback Time", domain: "light", level: 2,
        desc: "Light is fast but finite — 8 minutes from the Sun, 4 years from the nearest star. Every telescope is a time machine: we see objects as they were, not as they are.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["speed-distance-time"],
        grades: [8, 10],
        aliases: ["lookback time", "light travel time", "finite speed of light", "light minutes from the sun", "telescope as a time machine"],
        keywords: ["300, 000 km per second", "3 x 10^8 m/s", "8 minutes 20 seconds", "4.2 light years", "proxima centauri", "roemer", "we see the past", "signal delay"],
        tools: [{ k: "activity", label: "Light-delay role play: 'messages' walking across a scale solar system" }]
    },
    {
        id: "spectrum-color", name: "Spectrum & Colour", domain: "light", level: 3,
        desc: "White light is a mixture; a prism fans it into the spectrum, red to violet, each colour a different wavelength. Colour is the first physical measurement of starlight.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["light-travel", "rainbow-colors"],
        grades: [8, 10, 12],
        aliases: ["dispersion of white light", "prism dispersion", "splitting of white light", "vibgyor", "visible spectrum colours"],
        keywords: ["prism", "newton", "violet bends most", "rainbow formation", "recombination of spectrum", "wavelength in nanometres", "700 nm", "400 nm"],
        tools: [{ k: "activity", label: "Prism or CD-fragment spectroscope build" }]
    },
    {
        id: "em-spectrum", name: "Beyond Visible Light", domain: "light", level: 4,
        desc: "Radio, infrared, ultraviolet, X-ray, gamma — visible light is one octave of a vast keyboard. Each band needs its own telescope and reveals a different universe.",
        tracks: ["school-high", "club"],
        prereqs: ["spectrum-color"],
        grades: [12],
        aliases: ["electromagnetic spectrum", "electromagnetic waves and their uses", "beyond visible light", "multiwavelength astronomy", "non-visible wavelengths"],
        keywords: ["radio waves", "microwaves", "infrared", "ultraviolet", "x-rays", "gamma rays", "frequency in hertz", "atmospheric window"],
        tools: [{ k: "activity", label: "Compare an object's radio/IR/visible/X-ray images" }]
    },
    {
        id: "reflection-refraction", name: "Reflection & Refraction", domain: "light", level: 3,
        desc: "Mirrors bounce light by a fixed rule; glass bends it as it slows down. These two behaviours are the entire toolkit from which every telescope is built.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["light-travel"],
        grades: [7, 8, 10, 12],
        aliases: ["laws of reflection", "refraction of light", "reflection and refraction", "snell's law", "bending of light in glass"],
        keywords: ["angle of incidence", "angle of reflection", "the normal", "refractive index", "total internal reflection", "denser medium", "plane mirror", "critical angle"],
        tools: [{ k: "activity", label: "Laser + water tank refraction demo" }]
    },
    {
        id: "lenses-mirrors", name: "Lenses, Mirrors & Focal Length", domain: "light", level: 3,
        desc: "A curved lens or mirror gathers parallel starlight to a focus; the focal length sets image scale. Real images on a screen — this is where 'optics' becomes 'instrument'.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["reflection-refraction"],
        grades: [8, 10, 12],
        aliases: ["focal length", "spherical mirrors and lenses", "convex lens image formation", "concave mirror", "mirror formula and lens formula"],
        keywords: ["principal axis", "principal focus", "magnification", "real image", "1/v - 1/u = 1/f", "dioptre", "objective and eyepiece", "centre of curvature"],
        tools: [{ k: "activity", label: "Project the Sun or a window with a magnifier; measure focal length" }]
    },
    {
        id: "spectroscopy", name: "Spectroscopy", domain: "light", level: 4,
        desc: "Elements imprint fingerprint lines on a spectrum. From those lines alone we read a star's composition, temperature and motion — how we know what stars are made of.",
        tracks: ["school-high", "club"],
        prereqs: ["spectrum-color"],
        grades: [11, 12],
        aliases: ["spectral lines", "absorption lines", "fraunhofer lines", "line spectra of elements", "reading starlight composition"],
        keywords: ["balmer series", "sodium d lines", "kirchhoff's laws", "spectrograph", "diffraction grating", "discovery of helium in the sun", "emission line", "chemical fingerprint"],
        tools: [{ k: "activity", label: "View street-lamp and CFL spectra through a diffraction grating" }]
    },
    {
        id: "doppler-shift", name: "Doppler & Redshift", domain: "light", level: 4,
        desc: "Motion stretches or squeezes light waves: approaching sources shift blue, receding ones red. Measured in spectral lines, it gives speeds of stars and galaxies to high precision.",
        tracks: ["school-high", "club"],
        prereqs: ["spectroscopy", "waves-basics"],
        grades: [11, 12],
        aliases: ["doppler effect", "redshift", "blueshift", "doppler shift of spectral lines", "radial velocity measurement"],
        keywords: ["receding source", "approaching source", "wavelength stretched", "shift in km/s", "siren pitch analogy", "line of sight velocity", "relativistic doppler"],
        tools: [{ k: "activity", label: "Ambulance-siren analogy + real galaxy spectra" }]
    },

    // ======================= TELESCOPES & OBSERVING =======================
    {
        id: "dark-adaptation", name: "Dark Adaptation & Averted Vision", domain: "scope", level: 2,
        desc: "Eyes take 20–30 minutes to reach full night sensitivity, and one white-light glance resets them. Looking slightly beside a faint object uses your more sensitive off-centre retina.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["eye-at-night"],
        misconceptions: ["Thinking dark adaptation is a matter of a minute or two outside — rhodopsin takes 20 to 30 minutes to rebuild, and most beginners give up on a faint target before their eyes have even started", "Assuming one quick look at a white phone screen is harmless — it bleaches the rods and hands back the twenty minutes you just spent standing in the cold, which is why torches are red", "Treating averted vision as a mind trick rather than plain retinal anatomy — the off-centre retina is packed with rods, so looking beside a target genuinely collects more photons"],
        aliases: ["averted vision", "night vision adaptation", "dark adapted eyes", "getting your eyes dark adapted"],
        keywords: ["rhodopsin", "red torch", "red flashlight", "rods and cones", "peripheral retina", "scotopic vision", "20 to 30 minutes", "white light ruins"],
        tools: [{ k: "activity", label: "Red-torch discipline on a star party; averted-vision test on a faint cluster" }]
    },
    {
        id: "binoculars", name: "Binocular Astronomy", domain: "scope", level: 2,
        desc: "A 7×50 binocular — 7× magnification, 50 mm objectives — shows Moon craters, Jupiter's moons and hundreds of clusters. The best first instrument, and many observers' favourite forever.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["constellations"],
        misconceptions: ["Dismissing binoculars as a toy to outgrow once a real telescope arrives — a 7x50 shows Jupiter's moons, the Pleiades and hundreds of clusters in a field no telescope can match", "Reading 7x50 as 50x magnification — the second number is the objective diameter in millimetres, and that is what decides how faint you can go", "Thinking handheld is good enough at 15x or 20x — past about 10x your own pulse shakes the view, and a tripod adapter reveals stars the same glass could not hold still"],
        aliases: ["binocular astronomy", "observing with binoculars", "astronomy binoculars", "first instrument binoculars"],
        keywords: ["7x50", "10x50", "porro prism", "roof prism", "objective lens diameter", "binocular tripod adapter", "image stabilised", "handheld sweep"],
        tools: [{ k: "activity", label: "Binocular tour: Moon, Pleiades, a Milky Way sweep" }]
    },
    {
        id: "telescope-designs", name: "Refractors & Reflectors", domain: "scope", level: 3,
        desc: "Refractors use a lens, reflectors a mirror, catadioptrics both. Each design trades cost, size, and image quality differently — there is no single 'best telescope'.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["lenses-mirrors"],
        misconceptions: ["Believing a reflector's secondary mirror and spider block the middle of the image and punch a hole in it — they cost a little light and contrast; every part of the target still reaches every part of the mirror", "Assuming the expensive design must be the better telescope — a plain Dobsonian of twice the aperture will show more, for less money, than a boutique apochromat", "Hunting for the one best design — refractor, reflector and catadioptric each trade cost, size and image quality, and the best is the one you will actually carry outside"],
        grades: [10, 12],
        aliases: ["refractor vs reflector", "newtonian telescope", "cassegrain telescope", "catadioptric telescope", "telescope optical design"],
        keywords: ["dobsonian", "schmidt cassegrain", "maksutov", "achromat", "apochromat", "primary mirror", "objective lens", "secondary mirror", "SCT", "tube assembly"],
        tools: [{ k: "activity", label: "Strip-down demo of a Newtonian: follow the light path" }]
    },
    {
        id: "aperture", name: "Aperture & Light Grasp", domain: "scope", level: 3,
        desc: "Aperture is the diameter of the main lens or mirror — it decides how faint you can see and how fine you can resolve. Aperture, not magnification, is a telescope's true power.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["telescope-designs"],
        misconceptions: ["Believing magnification decides how much you can see — aperture sets both the faintest star and the finest detail; power only enlarges what the aperture already delivered", "Thinking a bigger telescope mainly makes things bigger — it makes them brighter and finer, because light grasp climbs as the square of the diameter", "Assuming a small scope will show a faint galaxy if you just find a dark enough site — below some aperture the photons are simply not there to be collected"],
        grades: [12],
        aliases: ["light grasp", "light gathering power", "telescope aperture", "objective diameter"],
        keywords: ["8 inch", "150mm", "200mm", "limiting magnitude", "aperture fever", "square of the diameter", "faintest star visible", "aperture rules"],
        tools: [{ k: "activity", label: "Same object through 60 mm vs 200 mm scopes" }]
    },
    {
        id: "magnification-eyepieces", name: "Magnification & Eyepieces", domain: "scope", level: 3,
        desc: "Magnification = telescope focal length ÷ eyepiece focal length; swap eyepieces to change power. More is rarely better — the atmosphere and aperture set a useful ceiling.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["telescope-designs"],
        misconceptions: ["Buying the telescope whose box shouts '600x!' — magnification is the least important spec printed on it, and at 600x a small scope shows a dim, shaking, useless blur", "Assuming more power always means more detail — past roughly 50x per inch of aperture you get empty magnification: a bigger, blurrier image carrying no new information", "Treating the eyepiece as a minor accessory — it and the telescope's focal length together ARE the magnification, so swapping eyepieces is the only way to change power"],
        grades: [10, 12],
        aliases: ["telescope magnification", "eyepiece focal length", "changing eyepieces", "power of a telescope", "choosing an eyepiece"],
        keywords: ["25mm eyepiece", "10mm eyepiece", "plossl", "1.25 inch barrel", "2 inch eyepiece", "apparent field of view", "maximum useful magnification", "50x per inch", "empty magnification"],
        tools: [{ k: "activity", label: "Compute and verify powers for your eyepiece set" }]
    },
    {
        id: "focal-ratio", name: "Focal Ratio & Field of View", domain: "scope", level: 3,
        desc: "f-ratio (focal length ÷ aperture) sets how 'fast' the optics are and how wide a field you get. Slow scopes suit planets; fast ones frame star fields and nebulae.",
        tracks: ["club", "photo"],
        prereqs: ["aperture", "magnification-eyepieces"],
        misconceptions: ["Carrying camera intuition across and assuming an f/5 scope shows stars brighter than an f/10 — visually, aperture and magnification set the brightness; the f-ratio merely follows from them", "Thinking a fast f-ratio simply makes a telescope better — it buys a wide field for nebulae at the price of fussier collimation and demanding eyepieces; slow optics suit planets"],
        aliases: ["f-ratio", "focal ratio of a telescope", "fast and slow optics", "true field of view"],
        keywords: ["f/5", "f/10", "f/4", "f/6.3", "focal length divided by aperture", "wide field scope", "fast optics", "planetary long focus"],
        tools: [{ k: "activity", label: "Compare Moon framing in an f/5 vs f/10 scope" }]
    },
    {
        id: "resolution-limit", name: "Resolution & the Airy Disc", domain: "scope", level: 4,
        desc: "Diffraction blurs every star into a tiny Airy disc; aperture sets the smallest detail resolvable (Dawes' limit). Why splitting close double stars needs inches, not power.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["aperture", "spectrum-color"],
        misconceptions: ["Believing enough magnification will eventually reveal more detail — diffraction sets a hard floor at Dawes' limit; past it you only enlarge the Airy disc and its rings", "Thinking the tiny disc and rings around a bright star are a flaw in the optics — a perfect telescope still turns every point source into an Airy disc; the aperture decides how small", "Assuming a longer focal length resolves finer than a short one of the same aperture — resolution is set by the diameter alone"],
        grades: [12],
        aliases: ["airy disc", "dawes limit", "rayleigh criterion", "resolving power of a telescope", "diffraction limit"],
        keywords: ["arcseconds", "116/D", "4.56 divided by inches", "double star separation", "diffraction rings", "point spread function", "1.22 lambda over D"],
        tools: [{ k: "activity", label: "Split test doubles of decreasing separation" }]
    },
    {
        id: "optical-aberrations", name: "Optical Aberrations", domain: "scope", level: 4,
        desc: "Chromatic fringes, coma's comet-shaped edge stars, field curvature — the systematic imperfections of real optics. Recognising them tells you what a scope (or photo) needs.",
        tracks: ["club", "photo"],
        prereqs: ["lenses-mirrors", "telescope-designs"],
        aliases: ["chromatic aberration", "coma in telescopes", "field curvature", "spherical aberration", "optical defects of a telescope"],
        keywords: ["purple fringing", "coma corrector", "field flattener", "astigmatism", "seagull stars at the edge", "achromatic doublet", "star test", "pinched optics"],
        tools: [{ k: "activity", label: "Aberration spotting on a defocused bright star" }]
    },
    {
        id: "telescope-mounts", name: "Telescope Mounts", domain: "scope", level: 3,
        desc: "Alt-azimuth mounts move up/down and around — simple and intuitive. Equatorial mounts tilt one axis to the celestial pole so a single slow motion tracks the turning sky.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["telescope-designs", "diurnal-motion"],
        aliases: ["alt-azimuth mount", "equatorial mount", "german equatorial mount", "mount and tripod"],
        keywords: ["GEM", "EQ5", "EQ6", "fork mount", "counterweight", "payload capacity", "slow motion controls", "altaz", "wedge", "vibration damping"],
        tools: [{ k: "activity", label: "Track the Moon on both mount types; feel the difference" }]
    },
    {
        id: "polar-alignment", name: "Polar Alignment", domain: "scope", level: 3,
        desc: "Pointing an equatorial mount's axis at the celestial pole, so one motor cancels Earth's spin. Rough alignment serves visual observing; imaging demands precision.",
        tracks: ["club", "photo"],
        prereqs: ["telescope-mounts", "pole-star", "compass-magnetism"],
        aliases: ["polar aligning the mount", "drift alignment", "aligning to the celestial pole", "polar scope alignment"],
        keywords: ["polaris", "polar scope", "reticle", "drift method", "latitude bolt", "RA axis to the pole", "azimuth adjustment knobs", "SharpCap polar align", "sigma octantis"],
        tools: [{ k: "activity", label: "Polar-scope alignment drill; drift check on a star" }]
    },
    {
        id: "collimation", name: "Collimation", domain: "scope", level: 4,
        desc: "Aligning a telescope's mirrors so all optical surfaces share one axis. A ten-minute tweak that separates a mediocre Newtonian from a sharp one.",
        tracks: ["club", "photo"],
        prereqs: ["telescope-designs"],
        aliases: ["collimating a newtonian", "mirror alignment", "aligning telescope optics", "laser collimation"],
        keywords: ["cheshire eyepiece", "laser collimator", "secondary mirror tilt", "primary mirror screws", "defocused star test", "centre spot", "collimation cap", "concentric rings"],
        tools: [{ k: "activity", label: "Collimate with a cap/laser, verify on a defocused star" }]
    },
    {
        id: "seeing-transparency", name: "Seeing & Transparency", domain: "scope", level: 3,
        desc: "Seeing is atmospheric steadiness (how much stars boil); transparency is clarity (how faint you can go). A hazy still night can beat a crisp windy one for planets.",
        tracks: ["club", "photo"],
        prereqs: ["stars-vary", "air-atmosphere"],
        misconceptions: ["Confusing seeing with transparency — the crisp, sparkling, freshly-scrubbed night after a front is usually the worst for planets, because that same brisk air is boiling the image", "Blaming the telescope when Jupiter shimmers into mush — the atmosphere overhead sets the ceiling, and no optics can out-resolve the air they are looking through", "Thinking the scope is ready the moment it is carried outside — a warm mirror makes its own tube currents and wrecks the view as thoroughly as bad seeing does"],
        aliases: ["atmospheric seeing", "sky transparency", "seeing conditions", "antoniadi scale", "steadiness of the air"],
        keywords: ["pickering scale", "arcsecond seeing", "jet stream", "boiling image", "twinkling", "thermal equilibrium", "tube currents", "haze and murk", "seeing forecast"],
        tools: [{ k: "activity", label: "Log seeing (1–5) and limiting magnitude every session" }]
    },
    {
        id: "star-hopping", name: "Star Hopping", domain: "scope", level: 3,
        desc: "Navigating from a bright star to a faint target through chart-matched patterns, hop by hop. The craft skill that turns a chart reader into an observer.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["star-charts", "binoculars"],
        misconceptions: ["Thinking GoTo makes star-hopping obsolete — the handset still wants a correct alignment on named stars, and an observer who cannot find Cygnus cannot rescue an alignment that has gone wrong", "Expecting the eyepiece view to match the chart — a diagonal mirror-reverses it and a Newtonian turns it round, so the hop that should have worked goes the wrong way", "Starting the hop at the faint target — you start at a bright naked-eye anchor and walk the patterns down to it, one finder field at a time"],
        aliases: ["star hop", "hopping to a faint target", "finding objects with a chart", "manual chart navigation"],
        keywords: ["telrad", "right angle finder", "sky atlas", "asterism pattern", "field of view circle", "pocket sky atlas", "guide star chain", "6x30 finder"],
        tools: [{ k: "sky", label: "Plan hops to tonight's targets" }, { k: "activity", label: "Hop from Vega to M57 or Saptarshi to M51" }]
    },
    {
        id: "catalogs-messier", name: "Messier & NGC Catalogues", domain: "scope", level: 3,
        desc: "Messier's 110 'not-comets' are the sky's greatest-hits list; the NGC adds 7,840 more. Catalogue numbers are the shared language of deep-sky observing.",
        tracks: ["club", "photo"],
        prereqs: ["star-charts"],
        aliases: ["messier catalogue", "NGC catalogue", "messier objects", "new general catalogue", "caldwell catalogue"],
        keywords: ["M31", "M42", "M13", "110 objects", "IC catalogue", "messier marathon", "NGC 7000", "charles messier", "catalogue designation"],
        tools: [{ k: "sky", label: "Which Messier objects are up tonight" }, { k: "activity", label: "Start a Messier logbook; attempt a spring Messier marathon" }]
    },
    {
        id: "lunar-observing", name: "Lunar Observing", domain: "scope", level: 2,
        desc: "Craters, maria, mountain shadows — the Moon is best along the terminator, where low sunlight throws relief into drama. Full moon is actually the flattest, worst time.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "photo"],
        prereqs: ["moon-phases", "binoculars"],
        misconceptions: ["Thinking full moon is the best time to look at the Moon — it is the worst: sunlight straight down casts no shadows and flattens every crater into a bland white glare", "Hunting craters in the bright middle of the disc instead of along the terminator, where low sunlight throws mountain shadows and relief into drama", "Assuming a Moon filter is what reveals detail — it only tames the glare for comfort; the terminator does the actual work"],
        grades: [8],
        aliases: ["observing the moon", "moon craters through a telescope", "lunar terminator observing", "moon watching session"],
        keywords: ["terminator", "maria", "mare tranquillitatis", "copernicus crater", "tycho rays", "rilles", "crescent phase", "moon filter", "clavius", "apennines"],
        tools: [{ k: "activity", label: "Sketch one crater on three nights as shadows move" }]
    },
    {
        id: "planetary-observing", name: "Planetary Observing", domain: "scope", level: 3,
        desc: "Jupiter's belts, Saturn's rings, Mars at opposition: small, bright targets that reward high power, steady seeing and a patient eye at the eyepiece.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["planets-wanderers", "magnification-eyepieces", "seeing-transparency"],
        misconceptions: ["Expecting the Voyager postcard — Jupiter at the eyepiece is a small bright disc with two grey belts, and the detail only surfaces after your eye has spent ten patient minutes on it", "Reaching for the highest power the moment Saturn is centred — seeing sets the ceiling, and on a boiling night 120x shows far more than 300x ever will", "Giving a planet one glance and moving on — planetary detail arrives in brief moments of steady air, and you have to be watching when they come"],
        grades: [8],
        aliases: ["observing the planets", "jupiter through a telescope", "saturn's rings at the eyepiece", "visual planetary observation"],
        keywords: ["opposition", "great red spot", "cassini division", "galilean moons", "belts and zones", "martian polar cap", "phases of venus", "high power at the eyepiece", "shadow transit"],
        tools: [{ k: "whatsup", label: "Best planet visibility windows" }]
    },
    {
        id: "deepsky-observing", name: "Deep-Sky Observing", domain: "scope", level: 3,
        desc: "Hunting clusters, nebulae and galaxies — faint, extended targets that want aperture, dark skies, low power and dark-adapted eyes. The 'faint fuzzies' that hooked every amateur.",
        tracks: ["club", "photo"],
        prereqs: ["catalogs-messier", "star-hopping", "aperture", "dark-adaptation"],
        misconceptions: ["Expecting the Hubble photograph at the eyepiece — visually these are faint grey smudges; a sensor integrates photons for hours, and the eye cannot integrate over time at all", "Cranking the power up to see a faint fuzzy better — magnification spreads the same light over more area, so an extended object only gets dimmer", "Blaming the telescope for a disappointing galaxy when the sky is at fault — deep-sky work wants aperture and darkness, and no eyepiece rescues a Bortle 8 backyard"],
        aliases: ["deep sky observing", "faint fuzzies", "visual deep sky", "observing nebulae and galaxies visually", "hunting deep sky objects"],
        keywords: ["surface brightness", "bortle scale", "dark sky site", "globular cluster at the eyepiece", "open cluster", "low power wide field", "sweeping the milky way", "naked eye limiting magnitude"],
        tools: [{ k: "sky", label: "Tonight's deep-sky picks" }]
    },
    {
        id: "double-variable-stars", name: "Double & Variable Stars", domain: "scope", level: 4,
        desc: "Coloured double stars test optics and delight the eye; variable stars change brightness on the clock. Both offer structured observing programmes with real scientific value.",
        tracks: ["club"],
        prereqs: ["star-hopping", "apparent-magnitude"],
        misconceptions: ["Assuming every double star is a pair in orbit — many are optical doubles: two stars at wildly different distances that merely happen to line up from here", "Thinking splitting a tight double is about magnification — aperture sets the resolving limit, and power only enlarges a blur the aperture could not separate", "Believing a variable star's changes need instruments — Algol drops by more than a magnitude every 2.87 days, and eyeball estimates against comparison stars are the standard method"],
        aliases: ["double stars", "variable star observing", "coloured double stars", "binary star pairs", "splitting doubles"],
        keywords: ["albireo", "mizar and alcor", "algol", "mira", "position angle", "separation in arcsec", "light curve", "magnitude estimate", "comparison stars", "epsilon lyrae"],
        tools: [{ k: "activity", label: "Estimate a Mira-type variable against comparison stars" }]
    },
    {
        id: "solar-observing", name: "Solar Observing (Safely)", domain: "scope", level: 3,
        desc: "NEVER look at the Sun without certified filters — projection and proper solar film show sunspots safely; hydrogen-alpha scopes reveal prominences. Safety protocol is the first lesson.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["telescope-designs", "sun-as-star"],
        misconceptions: ["Believing an eyepiece-end solar filter is safe — the telescope focuses the Sun's whole heat onto that scrap of glass and it can crack without warning, with your eye right behind it. Filters go over the front, always", "Thinking sunglasses, exposed film, smoked glass or welding glass below shade 14 will do — they cut the visible glare while letting infrared straight through, and burn the retina permanently", "Assuming a quick glance cannot hurt — the retina has no pain nerves, so the damage arrives with no sensation at all; and an uncapped finder scope will blind you just as fast as the main tube"],
        aliases: ["observing the sun safely", "solar filter safety", "white light solar observing", "hydrogen alpha solar viewing", "sunspot observing"],
        keywords: ["baader solar film", "ND5", "prominences", "sunspots", "eyepiece projection", "never look at the sun", "Coronado PST", "certified solar filter", "granulation", "filaments"],
        tools: [{ k: "activity", label: "Eyepiece-projection sunspot count" }]
    },
    {
        id: "observing-log", name: "Observing Logs & Sketching", domain: "scope", level: 2,
        desc: "Date, time, sky conditions, instrument, and what you actually saw — a log turns stray sessions into a record of growth, and sketching trains the eye to see more.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["star-charts"],
        misconceptions: ["Treating a log as bureaucracy for serious people — it is the thing that makes you a better observer, because an object you wrote up is one you actually looked at rather than glanced at", "Believing a sketch needs artistic skill — a crude pencil smudge with the date, seeing and eyepiece noted trains the eye more than an hour of pretty views you never recorded", "Logging only the triumphs — the nights of murk and the objects you failed to find are what make the record worth anything later"],
        aliases: ["observing log", "observing notebook", "astronomical sketching", "eyepiece sketching", "session notes"],
        keywords: ["seeing estimate", "date and time in UT", "sketch pad", "blending stump", "logbook entry", "NELM", "instrument and eyepiece noted", "white on black sketch"],
        tools: [{ k: "activity", label: "Design a club log sheet; log every session for a month" }]
    },
    {
        id: "citizen-science", name: "Citizen Science", domain: "scope", level: 3,
        desc: "Variable-star estimates (AAVSO), occultation timings, meteor counts, comet hunting: organised programmes where amateur measurements feed real research.",
        tracks: ["club", "photo"],
        prereqs: ["observing-log"],
        misconceptions: ["Assuming amateur measurements are a hobbyist exercise nobody really uses — AAVSO light curves, occultation timings and meteor counts feed straight into professional papers", "Believing you need expensive kit to contribute — a naked-eye meteor count, a binocular magnitude estimate, or an evening classifying galaxies on Zooniverse are all real data", "Thinking one observer's numbers hardly matter — these programmes work precisely by pooling many modest observations into coverage no professional telescope could afford"],
        aliases: ["citizen science projects", "amateur contributions to research", "pro-am collaboration", "amateur observing programmes"],
        keywords: ["AAVSO", "zooniverse", "galaxy zoo", "meteor count reports", "comet discovery", "supernova search", "IMO", "data submission", "pro-am"],
        tools: [{ k: "activity", label: "Submit one AAVSO estimate or occultation timing as a club" }]
    },

    // ===================== STARS, GALAXIES & COSMOS =====================
    {
        id: "sun-as-star", name: "The Sun is a Star", domain: "stars", level: 2,
        desc: "Our Sun is an ordinary star seen close-up — a million-km fusion furnace. Every night-sky star is a sun; many have their own planets.",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: ["stars-vary", "sun-energy"],
        grades: [8],
        aliases: ["the sun is a star", "sun as an ordinary star", "our nearest star", "the sun a typical star"],
        keywords: ["G2 dwarf", "photosphere", "150 million km", "5800 kelvin", "average star", "one of billions", "solar radius", "yellow dwarf"],
        tools: [{ k: "activity", label: "Scale comparison: Sun vs Betelgeuse vs Earth" }]
    },
    {
        id: "solar-activity", name: "Sunspots & Solar Activity", domain: "stars", level: 3,
        desc: "The Sun's magnetic weather: spots, flares and mass ejections rising and falling on an 11-year cycle. It drives aurorae and can rattle satellites and power grids.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["sun-as-star"],
        misconceptions: ["Thinking sunspots are holes in the Sun, or cold in any absolute sense — a spot is around 4,000 K, cool only beside the 5,800 K photosphere; lifted out alone it would blaze", "Picturing a flare as a beam the Sun aims at Earth — flares and CMEs blast out wherever the magnetic field snaps, and only the ones that happen to point our way ever arrive", "Assuming solar activity is a remote curiosity — the 11-year cycle drives the aurorae and can rattle satellites, GPS and power grids on the ground"],
        aliases: ["sunspots", "solar flares", "coronal mass ejection", "solar cycle", "solar magnetic activity"],
        keywords: ["11-year cycle", "aurora", "space weather", "prominence", "solar corona", "geomagnetic storm", "aditya-l1", "maunder minimum", "carrington event"],
        tools: [{ k: "activity", label: "Track a sunspot group across the disc for a week" }]
    },
    {
        id: "apparent-magnitude", name: "The Magnitude Scale", domain: "stars", level: 3,
        desc: "Astronomy's upside-down brightness scale: smaller numbers are brighter, and 5 magnitudes means 100×. Vega ≈ 0, faintest naked-eye stars ≈ +6, the Sun −26.7.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["stars-vary", "angular-measure"],
        aliases: ["apparent magnitude", "the magnitude scale", "stellar brightness scale", "hipparchus brightness scale", "visual magnitude"],
        keywords: ["vega zero point", "first magnitude star", "sixth magnitude", "naked eye limit +6", "minus 26.7", "pogson ratio", "2.512", "brighter means smaller number"],
        tools: [{ k: "sky", label: "Compare catalogue magnitudes of stars you can see" }]
    },
    {
        id: "star-colors-temp", name: "Star Colours & Temperature", domain: "stars", level: 3,
        desc: "A star's colour is a thermometer reading: red ~3,000 K, yellow ~6,000 K, blue-white 10,000 K+. Hotter objects glow bluer — physics you can check with your own eyes.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["stars-vary", "spectrum-color", "temperature-heat"],
        misconceptions: ["Thinking red means hot and blue means cool — the red-hot intuition from stove rings is exactly backwards for stars: red is about 3,000 K, blue-white is above 10,000 K", "Believing a star's colour tells you what it is made of — colour reads temperature; composition takes the absorption lines in the spectrum", "Expecting stars to look as vividly coloured as photographs show — at naked-eye brightness the eye's colour cells barely fire, so only the brightest, like Betelgeuse, show a tint"],
        aliases: ["colour of stars", "star colours and temperature", "stellar temperature from colour", "colour index", "why stars have different colours"],
        keywords: ["betelgeuse red", "rigel blue-white", "3000 K", "10000 K", "wien's displacement law", "black body radiation", "b minus v", "hotter is bluer"],
        tools: [{ k: "activity", label: "Rank Betelgeuse, Capella, Sirius, Rigel by temperature by eye" }]
    },
    {
        id: "stellar-parallax", name: "Stellar Parallax", domain: "stars", level: 4,
        desc: "Nearby stars shift minutely against the background as Earth orbits — the parallax that defines the parsec and anchors every distance in astronomy.",
        tracks: ["school-high", "club"],
        prereqs: ["angular-measure", "heliocentric-model"],
        misconceptions: ["Thinking parallax is a theory or an inference — it is direct geometry: measure the angle, know the 2 AU baseline, get the distance, assuming nothing about the star itself", "Believing parallax works for any star — the shift shrinks with distance, so past a few thousand light years even Gaia runs out and the distance ladder has to take over", "Expecting the shift to be something you could see — the largest stellar parallax is under one arcsecond, which is why the Greeks read its absence as proof Earth does not move"],
        grades: [11],
        aliases: ["stellar parallax", "parallax method", "trigonometric parallax", "annual parallax", "parallax of stars"],
        keywords: ["parsec", "arcsecond", "61 cygni", "bessel", "gaia mission", "hipparcos", "baseline of 2 au", "d = 1/p", "apparent shift against background"],
        tools: [{ k: "activity", label: "Thumb-blink parallax demo, then scale to real star shifts" }]
    },
    {
        id: "luminosity-absmag", name: "Luminosity & Absolute Magnitude", domain: "stars", level: 4,
        desc: "Apparent brightness mixes true output with distance; absolute magnitude removes distance (all stars imagined at 32.6 ly). Only then can stars be honestly compared.",
        tracks: ["school-high", "club"],
        prereqs: ["apparent-magnitude", "stellar-parallax", "inverse-square"],
        misconceptions: ["Thinking the brightest-looking star is the most powerful one — apparent magnitude mixes true output with distance; Sirius outshines Rigel only because it is far closer, not brighter", "Reading the magnitude scale the intuitive way — bigger numbers are fainter, and the scale is logarithmic, so a 1st-magnitude star is 100 times brighter than a 6th", "Believing absolute magnitude is something you measure — it is a calculation that needs the distance first, which is exactly why parallax has to come before it"],
        aliases: ["absolute magnitude", "luminosity of a star", "intrinsic brightness", "distance modulus"],
        keywords: ["10 parsecs", "32.6 light years", "solar luminosity", "energy output in watts", "m minus M", "bolometric magnitude", "true power of a star"],
        tools: [{ k: "activity", label: "Torch at 1 m vs 10 m: inverse-square in the classroom" }]
    },
    {
        id: "hr-diagram", name: "The H-R Diagram", domain: "stars", level: 4,
        desc: "Plot luminosity against temperature and stars fall into families: the main sequence, giants, white dwarfs. One scatter plot that encodes how stars live and die.",
        tracks: ["school-high", "club"],
        prereqs: ["luminosity-absmag", "star-colors-temp"],
        aliases: ["hertzsprung-russell diagram", "hr diagram", "h-r diagram", "colour magnitude diagram"],
        keywords: ["main sequence", "red giant branch", "white dwarf region", "supergiant", "luminosity class", "turn-off point", "instability strip", "scatter plot of stars"],
        tools: [{ k: "activity", label: "Plot 30 bright stars from catalogue data" }]
    },
    {
        id: "nebulae-clusters", name: "Nebulae & Star Clusters", domain: "stars", level: 3,
        desc: "Glowing gas clouds where stars are born; open clusters of young siblings; ancient globular swarms of hundreds of thousands. The Milky Way's visible ecology.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["milky-way-band"],
        aliases: ["star clusters", "open cluster", "globular cluster", "emission nebula", "nebulae and star clusters"],
        keywords: ["pleiades", "m45", "m13", "messier catalogue", "dark nebula", "hydrogen alpha glow", "ngc", "reflection nebula", "hundreds of thousands of stars"],
        tools: [{ k: "sky", label: "Locate Orion Nebula, Pleiades, and a globular" }]
    },
    {
        id: "star-formation", name: "Star Birth", domain: "stars", level: 4,
        desc: "Cold gas clouds collapse under gravity, heat up, and ignite fusion. The Orion Nebula is a stellar nursery in action, visible in binoculars.",
        tracks: ["school-high", "club"],
        prereqs: ["nebulae-clusters", "gravitation"],
        aliases: ["star birth", "star formation", "stellar nursery", "protostar", "collapse of a gas cloud"],
        keywords: ["giant molecular cloud", "orion nebula", "jeans mass", "accretion disc", "t tauri star", "eagle nebula", "pillars of creation", "ignition of fusion"],
        tools: [{ k: "activity", label: "Infrared vs visible views of the same nursery" }]
    },
    {
        id: "stellar-evolution", name: "Lives of Stars", domain: "stars", level: 4,
        desc: "Stars balance gravity against fusion for millions to trillions of years, then swell to giants and die — gently as white dwarfs or violently as supernovae. Mass decides everything.",
        tracks: ["school-high", "club"],
        prereqs: ["hr-diagram", "star-formation"],
        aliases: ["life cycle of a star", "stellar evolution", "lives of stars", "birth and death of stars", "how stars die"],
        keywords: ["red giant phase", "main sequence lifetime", "hydrostatic equilibrium", "mass decides the fate", "helium flash", "shell burning", "billions of years", "fusion versus gravity"],
        tools: [{ k: "activity", label: "Sort star cards into an evolutionary sequence by mass" }]
    },
    {
        id: "supernovae-compact", name: "Supernovae, Neutron Stars & Black Holes", domain: "stars", level: 4,
        desc: "Massive stars end in explosions that briefly outshine galaxies, forging heavy elements and leaving city-sized neutron stars or black holes. Your iron came from one.",
        tracks: ["school-high", "club"],
        prereqs: ["stellar-evolution"],
        aliases: ["supernova", "neutron star", "black hole", "stellar remnants", "core collapse explosion"],
        keywords: ["chandrasekhar limit", "1.4 solar masses", "pulsar", "event horizon", "type ia", "crab nebula", "sn 1987a", "heavy element nucleosynthesis", "schwarzschild radius", "degenerate core"],
        tools: [{ k: "activity", label: "Crab Nebula: match the 1054 CE record to today's remnant" }]
    },
    {
        id: "exoplanets", name: "Exoplanets", domain: "stars", level: 4,
        desc: "Thousands of planets found around other stars — mostly by transit dips and Doppler wobbles. Amateur photometry can detect hot-Jupiter transits from a backyard.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["keplers-laws", "doppler-shift"],
        aliases: ["exoplanet", "extrasolar planet", "planets around other stars", "transit method", "hot jupiter"],
        keywords: ["kepler mission", "tess", "radial velocity wobble", "51 pegasi b", "transit light curve", "trappist-1", "transit depth", "photometry of dips"],
        tools: [{ k: "activity", label: "Analyse a real transit light curve" }]
    },
    {
        id: "lightyear-scale", name: "Light Years & Cosmic Scale", domain: "stars", level: 3,
        desc: "The nearest star is 4.2 light years away — 7,000× farther than Neptune. Grasping the jump from solar-system scale to interstellar scale is a rite of passage.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["light-travel", "scale-of-solar-system", "big-numbers"],
        misconceptions: ["Thinking a light year is a length of time — the name is to blame; it is a distance, the 9.46 trillion km that light covers in a year", "Assuming interstellar space is just the solar system scaled up a little — Proxima is about 7,000 times farther than Neptune, a jump no single diagram survives", "Believing 4.2 light years is nearly within reach — Voyager, at 17 km per second, would need roughly 75,000 years to cross that gap"],
        grades: [8, 11],
        aliases: ["light year", "light years away", "cosmic distance scale", "interstellar distances"],
        keywords: ["9.46 trillion km", "proxima centauri", "4.2 light years", "alpha centauri", "scale model of distances", "unit of distance not time", "astronomical unit comparison"],
        tools: [{ k: "activity", label: "If the Sun were in Bhopal, where is Alpha Centauri?" }]
    },
    {
        id: "milky-way-structure", name: "Structure of the Milky Way", domain: "stars", level: 4,
        desc: "A barred spiral of 100–400 billion stars, 100,000 ly across, with us in a quiet arm 27,000 ly out. The naked-eye band is our inside view of the disc.",
        tracks: ["school-high", "club"],
        prereqs: ["milky-way-band", "nebulae-clusters", "lightyear-scale"],
        grades: [8],
        aliases: ["milky way galaxy", "structure of the milky way", "akash ganga", "barred spiral milky way", "our home galaxy"],
        keywords: ["galactic centre", "sagittarius a*", "spiral arm", "100, 000 light years across", "galactic disc", "orion arm", "27, 000 light years", "galactic halo", "band of light across the sky"],
        tools: [{ k: "activity", label: "Map naked-eye band features onto a galaxy diagram" }]
    },
    {
        id: "galaxies", name: "Galaxies", domain: "stars", level: 4,
        desc: "Islands of billions of stars — spirals, ellipticals, irregulars — separated by millions of light years. Andromeda, our giant neighbour, is faintly visible to the naked eye.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["milky-way-structure"],
        grades: [8],
        aliases: ["galaxy types", "spiral galaxy", "elliptical galaxy", "andromeda galaxy", "hubble tuning fork"],
        keywords: ["m31", "irregular galaxy", "local group", "galaxy cluster", "megaparsec", "magellanic clouds", "island universe", "billions of stars each"],
        tools: [{ k: "sky", label: "Find M31 by naked eye or binoculars" }]
    },
    {
        id: "hubble-expansion", name: "The Expanding Universe", domain: "stars", level: 5,
        desc: "Nearly every galaxy's light is redshifted, and farther means faster — space itself is stretching. Run the film backward and the universe had a beginning.",
        tracks: ["school-high", "club"],
        prereqs: ["galaxies", "doppler-shift"],
        aliases: ["hubble's law", "expanding universe", "expansion of the universe", "recession of galaxies", "hubble constant"],
        keywords: ["70 km/s/Mpc", "edwin hubble", "raisin bread analogy", "velocity proportional to distance", "scale factor", "hubble tension", "space itself stretching"],
        tools: [{ k: "activity", label: "Inflate a dotted balloon: every dot recedes from every other" }]
    },
    {
        id: "bigbang-cosmology", name: "Big Bang & Cosmic History", domain: "stars", level: 5,
        desc: "13.8 billion years from a hot dense start: relic microwave glow, primordial hydrogen and helium, and the growth of galaxies all tell one consistent story.",
        tracks: ["school-high", "club"],
        prereqs: ["hubble-expansion"],
        aliases: ["big bang theory", "big bang model", "origin of the universe", "cosmic history"],
        keywords: ["13.8 billion years", "primordial nucleosynthesis", "hydrogen and helium abundance", "lemaitre", "hot dense state", "recombination era", "cosmic inflation", "age of the universe"],
        tools: [{ k: "activity", label: "Cosmic history on a 1-year calendar (Sagan style)" }]
    },
    {
        id: "distance-ladder", name: "The Cosmic Distance Ladder", domain: "stars", level: 5,
        desc: "Parallax calibrates nearby stars, Cepheid pulsators reach nearby galaxies, supernovae reach across the universe — each rung standing on the one below.",
        tracks: ["club"],
        prereqs: ["stellar-parallax", "hr-diagram", "galaxies", "variable-stars"],
        aliases: ["cosmic distance ladder", "distance ladder", "standard candles", "measuring cosmic distances"],
        keywords: ["cepheid rung", "type ia supernova", "parallax calibration", "tully-fisher relation", "rr lyrae", "each rung calibrates the next", "megaparsec scale"],
        tools: [{ k: "activity", label: "Build the ladder as a chain of scaling arguments" }]
    },

    // ============================ ASTROPHOTOGRAPHY ============================
    {
        id: "exposure-triangle", name: "Exposure: Aperture, Shutter, ISO", domain: "astro", level: 3,
        desc: "Three controls set how much light a camera records and how noisy it looks. At night you run all three near their limits — astrophotography is exposure at the extreme.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["lenses-mirrors"],
        misconceptions: ["Thinking ISO makes the sensor more sensitive to light — it only amplifies the signal after capture, so raising it brightens the noise right along with the stars", "Believing a wider aperture is always better — wide open costs star sharpness and smears the corners into coma, which is why many nightscapes are shot a stop down", "Assuming a longer shutter always means more light — past the trailing limit on a fixed tripod the extra seconds only smear each star into a streak"],
        grades: [12],
        aliases: ["exposure triangle", "shutter speed and ISO", "aperture shutter and ISO", "camera exposure settings at night"],
        keywords: ["f/2.8", "ISO 1600", "ISO 3200", "stops of light", "wide open lens", "manual mode", "30 seconds", "ISO invariance", "bulb mode"],
        tools: [{ k: "activity", label: "Same night scene at 5 exposure settings; compare" }]
    },
    {
        id: "histogram-reading", name: "Reading the Histogram", domain: "astro", level: 3,
        desc: "The histogram is the only honest exposure meter at night — the LCD preview lies. Expose so the sky peak sits clear of the left wall without clipping stars.",
        tracks: ["club", "photo"],
        prereqs: ["exposure-triangle"],
        misconceptions: ["Thinking a histogram should always be centred like a daylight shot — the night sky is mostly dark, so a correct peak sits about a third from the left wall, not the middle", "Trusting the rear screen to show clipping — the preview is a JPEG rendered from the RAW, so it can look blown out or perfectly fine while the actual data says otherwise", "Believing any star touching the right wall has ruined the frame — a few clipped star cores are unavoidable; it is the sky peak jammed against the left wall that costs real data"],
        aliases: ["reading the histogram", "camera histogram", "expose to the right", "histogram exposure check"],
        keywords: ["ETTR", "left wall", "clipping highlights", "sky background level", "RGB histogram", "blinkies", "black point", "peak a third from the left", "LCD preview lies"],
        tools: [{ k: "activity", label: "Deliberately under/over-expose; read the damage in histograms" }]
    },
    {
        id: "camera-sensors", name: "How Sensors Work", domain: "astro", level: 4,
        desc: "Pixels convert photons to electrons; quantum efficiency, pixel size, full-well depth and read noise decide astro performance. Why cooled mono cameras exist.",
        tracks: ["photo", "club"],
        prereqs: ["exposure-triangle"],
        misconceptions: ["Thinking more megapixels means a better astro image — smaller pixels each catch fewer photons; quantum efficiency, full-well depth and read noise are what decide the result", "Believing a cooled camera is about protecting the electronics or the observer's comfort — the cooling exists to cut dark current, which roughly doubles every 6 C", "Assuming a colour sensor records colour directly — a one-shot-colour chip is a mono sensor under a Bayer filter, throwing away most photons at every pixel"],
        grades: [12],
        aliases: ["CMOS sensor", "how camera sensors work", "CCD vs CMOS", "cooled astronomy camera", "sensor performance"],
        keywords: ["quantum efficiency", "full well capacity", "read noise in electrons", "pixel size in microns", "gain and offset", "IMX571", "ADU", "dark current", "amp glow", "photons to electrons"],
        tools: [{ k: "activity", label: "Compare spec sheets: DSLR vs dedicated astro camera" }]
    },
    {
        id: "image-scale", name: "Image Scale & Sampling", domain: "astro", level: 4,
        desc: "Arcseconds per pixel = 206 × pixel size (µm) ÷ focal length (mm). Match sampling to seeing: oversample and you waste light, undersample and stars turn to squares.",
        tracks: ["photo"],
        prereqs: ["camera-sensors", "angular-measure", "focal-ratio"],
        aliases: ["image scale", "arcseconds per pixel", "pixel scale and sampling", "oversampling and undersampling"],
        keywords: ["206 divided by", "arcsec per pixel", "nyquist sampling", "2 arcsec seeing", "binning", "square stars", "focal length in mm", "microns per pixel", "matched sampling"],
        tools: [{ k: "activity", label: "Compute image scale for every camera+scope combo you own" }]
    },
    {
        id: "phone-astrophotography", name: "Smartphone Astrophotography", domain: "astro", level: 2,
        desc: "A phone held (or bracketed) at the eyepiece captures the Moon and planets; night modes catch constellations and even the Milky Way. The zero-cost gateway to imaging.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["lunar-observing"],
        misconceptions: ["Thinking a phone cannot do real astrophotography — a modern night mode stacks several seconds handheld and genuinely records constellations, and the Milky Way from a dark site", "Believing the phone's zoom will reach a galaxy — a phone gets the Moon, the bright planets and wide star fields; anything fainter needs a telescope in front of it", "Assuming a steady hand is enough at the eyepiece — the phone lens has to sit at the eyepiece's exit pupil, and a bracket is what holds it there, not patience"],
        aliases: ["smartphone astrophotography", "afocal photography with a phone", "phone at the eyepiece", "mobile night mode sky shots"],
        keywords: ["afocal", "phone adapter bracket", "night mode", "NightCap", "pro mode", "digiscoping", "moon shot with phone", "handheld at the eyepiece"],
        tools: [{ k: "activity", label: "Phone-at-eyepiece Moon shot on a club night" }]
    },
    {
        id: "nightscapes", name: "Nightscape Photography", domain: "astro", level: 3,
        desc: "Wide-angle sky-over-landscape shots from a fixed tripod. The NPF/500 rule caps exposure before stars trail — beyond it, you need tracking.",
        tracks: ["club", "photo"],
        prereqs: ["exposure-triangle", "diurnal-motion"],
        misconceptions: ["Treating the 500 rule as exact — it is a rough film-era guide; on a modern high-resolution sensor stars trail at half that time, which is exactly why the NPF rule exists", "Thinking a fixed tripod can expose longer if you just drop the ISO — the trailing limit is set by Earth's rotation, not by exposure level; past it you need tracking", "Expecting stars to trail at the same rate across the frame — stars near the celestial equator smear fastest, those near the pole barely move in the same 20 seconds"],
        aliases: ["nightscape photography", "milky way landscape photography", "wide field sky and landscape", "500 rule", "NPF rule"],
        keywords: ["14mm lens", "untracked tripod shot", "star trailing threshold", "foreground blending", "light painting", "milky way core", "20 second exposure", "rule of 500", "blue hour foreground"],
        tools: [{ k: "activity", label: "Milky Way nightscape: 20 s, f/2.8, ISO 3200 starting point" }]
    },
    {
        id: "star-trail-imaging", name: "Star Trail Photography", domain: "astro", level: 3,
        desc: "Stack hundreds of fixed-tripod frames and stars draw arcs around the celestial pole — diurnal motion made visible and beautiful in one image.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["nightscapes", "pole-star"],
        misconceptions: ["Thinking star trails need one enormous exposure — a two-hour frame just fogs on skyglow; hundreds of 30-second subs blended in lighten mode draw the same arcs, cleanly", "Believing the arcs show the stars actually moving — the trails are Earth turning under a fixed camera, which is why they all curve around the celestial pole", "Expecting concentric circles wherever you point — only a frame centred near Polaris gives rings; aim east or west and the same stars draw near-straight streaks"],
        aliases: ["star trail photography", "star trails", "circumpolar trails", "stacking star trails"],
        keywords: ["StarStaX", "lighten blend mode", "intervalometer", "concentric arcs", "polaris at the centre", "30 second subs", "gap filling", "two hour sequence", "comet mode"],
        tools: [{ k: "activity", label: "2-hour trail stack centred on Polaris" }]
    },
    {
        id: "tracking-imaging", name: "Tracked Imaging", domain: "astro", level: 4,
        desc: "A motorised equatorial mount turns at sidereal rate, holding stars still through minutes-long exposures. Polar alignment quality now directly limits exposure length.",
        tracks: ["photo", "club"],
        prereqs: ["polar-alignment", "nightscapes", "sidereal-day"],
        aliases: ["tracked astrophotography", "star tracker imaging", "sidereal tracking for photos", "riding the mount for long exposures"],
        keywords: ["Star Adventurer", "sidereal rate", "unguided subs", "periodic error", "SkyGuider Pro", "two minute exposures", "ball head payload", "drive motor", "tracker payload limit"],
        tools: [{ k: "activity", label: "Untracked vs 2-minute tracked frame of the same field" }]
    },
    {
        id: "snr-noise", name: "Signal, Noise & SNR", domain: "astro", level: 4,
        desc: "Shot noise, read noise, thermal noise versus faint signal: every astro-imaging decision — exposure length, ISO, cooling, stacking — is an SNR calculation in disguise.",
        tracks: ["photo"],
        prereqs: ["camera-sensors"],
        misconceptions: ["Thinking noise is a defect of a cheap camera — most of it is shot noise from the photons themselves, obeying Poisson statistics, which is why the fix is more total exposure, not a better body", "Believing sixty 1-minute subs are interchangeable with one 60-minute exposure — the long frame pays read noise only once, but it clips stars, cannot reject a satellite, and loses the whole hour to one gust", "Assuming a high ISO adds noise — it amplifies signal and noise together and can even lower read noise; what actually makes an image noisy is collecting too few photons"],
        aliases: ["signal to noise ratio", "SNR in astrophotography", "shot noise and read noise", "noise sources in imaging"],
        keywords: ["shot noise", "poisson statistics", "read noise", "thermal noise", "square root of N", "swamping the read noise", "sub exposure length", "total integration hours", "sky limited"],
        tools: [{ k: "activity", label: "Single frame vs 16-frame stack: measure the noise drop" }]
    },
    {
        id: "calibration-frames", name: "Darks, Flats & Bias", domain: "astro", level: 4,
        desc: "Dark frames map thermal signal, flats map dust and vignetting, bias maps readout offset. Calibration subtracts the camera's own fingerprints from your data.",
        tracks: ["photo"],
        prereqs: ["snr-noise"],
        misconceptions: ["Treating darks and flats as optional polish for perfectionists — they subtract the camera's own fingerprints, and no amount of stretching separates a dust mote from a galaxy afterwards", "Thinking a flat corrects for a dirty sensor later — a flat maps the dust and vignetting that were there during that session; it fixes nothing you shoot after cleaning the optics", "Believing one set of flats can be reused all year — change focus, rotate the camera or swap a filter and the shadows move, so the old flats now add artefacts instead of removing them"],
        aliases: ["darks flats and bias", "calibration frames", "dark frames", "flat frames", "bias frames"],
        keywords: ["master dark", "master flat", "flat panel", "dust motes", "vignetting", "matched temperature darks", "dark flats", "EL panel", "sky flats", "offset frames"],
        tools: [{ k: "activity", label: "Shoot a calibration library; compare calibrated vs raw stacks" }]
    },
    {
        id: "stacking", name: "Image Stacking", domain: "astro", level: 4,
        desc: "Averaging N aligned frames cuts noise by √N while signal stays put — the single most powerful trick in astrophotography. Software: DeepSkyStacker, Siril, AutoStakkert.",
        tracks: ["photo", "club"],
        prereqs: ["snr-noise", "histogram-reading"],
        misconceptions: ["Thinking stacking adds detail that was not there — it averages noise down by root N while the signal stays put; it reveals what the frames already recorded, it never invents signal", "Believing more frames keep paying at the same rate — the gain goes as the square root, so 16 subs to 64 only halves the noise again while quadrupling the night", "Assuming a bad frame can be left in because averaging will absorb it — a passing cloud or a trailed sub drags the whole stack down unless it is rejected outright"],
        aliases: ["image stacking", "frame stacking", "integrating subframes", "averaging sub exposures"],
        keywords: ["DeepSkyStacker", "Siril", "sigma clipping", "registration", "subframes", "kappa sigma rejection", "total integration time", "root N improvement", "aligning frames"],
        tools: [{ k: "app", label: "Siril / DeepSkyStacker stacking session" }]
    },
    {
        id: "planetary-imaging", name: "Planetary & Lunar Imaging", domain: "astro", level: 4,
        desc: "Shoot thousands of video frames, keep the sharpest fraction, stack and sharpen — 'lucky imaging' freezes moments of steady air and beats the seeing.",
        tracks: ["photo", "club"],
        prereqs: ["planetary-observing", "stacking", "seeing-transparency"],
        aliases: ["lucky imaging", "planetary video capture", "lunar and planetary imaging", "webcam planetary photography"],
        keywords: ["AutoStakkert", "FireCapture", "RegiStax", "SER file", "wavelets", "region of interest", "best 10 percent", "atmospheric dispersion corrector", "WinJUPOS derotation", "high frame rate"],
        tools: [{ k: "app", label: "AutoStakkert + wavelet sharpening on Jupiter video" }]
    },
    {
        id: "dso-imaging", name: "Deep-Sky Imaging", domain: "astro", level: 5,
        desc: "Hours of tracked, calibrated sub-exposures on nebulae and galaxies. The full pipeline: acquire, calibrate, register, integrate — where all imaging threads converge.",
        tracks: ["photo"],
        prereqs: ["tracking-imaging", "stacking", "calibration-frames", "deepsky-observing"],
        aliases: ["deep sky astrophotography", "imaging nebulae and galaxies", "long exposure deep sky imaging", "deep sky imaging pipeline"],
        keywords: ["sub exposures", "hours of integration", "acquire calibrate register integrate", "NINA", "Sequence Generator Pro", "Ekos KStars", "field rotation", "10 hours of data", "meridian flip"],
        tools: [{ k: "app", label: "First DSO project: Orion Nebula, 30×2 min" }]
    },
    {
        id: "autoguiding", name: "Autoguiding", domain: "astro", level: 5,
        desc: "A small second camera watches a star and nudges the mount every few seconds, correcting drive errors. It stretches exposures from one minute to as long as you like.",
        tracks: ["photo"],
        prereqs: ["tracking-imaging"],
        aliases: ["autoguiding", "guide camera and guide scope", "PHD2 guiding", "guiding the mount on a star"],
        keywords: ["PHD2", "ST-4", "guide star", "RMS error in arcsec", "off axis guider", "OAG", "pulse guiding", "backlash", "0.5 arcsec RMS", "guiding calibration"],
        tools: [{ k: "app", label: "PHD2 guiding setup and calibration" }]
    },
    {
        id: "narrowband-filters", name: "Filters & Narrowband", domain: "astro", level: 5,
        desc: "Nebulae emit at specific wavelengths (Hα, OIII, SII); narrowband filters pass only those slices, defeating light pollution and even moonlight. The Hubble palette is three such channels.",
        tracks: ["photo"],
        prereqs: ["dso-imaging", "spectroscopy"],
        aliases: ["narrowband imaging", "hydrogen alpha filter", "hubble palette", "SHO imaging", "emission line filters"],
        keywords: ["Ha OIII SII", "3nm", "7nm", "SHO", "HOO", "dual band filter", "L-eXtreme", "656nm", "500.7nm", "imaging under moonlight"],
        tools: [{ k: "activity", label: "Broadband vs Hα of the same nebula from town" }]
    },
    {
        id: "post-processing", name: "Post-Processing", domain: "astro", level: 5,
        desc: "Stretching, gradient removal, colour calibration, noise control — developing the stacked data into a finished image. Half the craft happens after the telescope is packed.",
        tracks: ["photo"],
        prereqs: ["stacking"],
        misconceptions: ["Thinking a stretch is cheating — the sensor records linearly and the eye does not; unstretched, the data is a near-black frame and the nebula that is genuinely there stays invisible", "Believing more stretch and more saturation is always better — push past what the data holds and you get clipped cores, magenta stars, and the noise floor promoted to texture", "Assuming processing can rescue data that was never collected — no curve recovers a signal that never rose above the noise; that fix belongs in the exposure, not the software"],
        aliases: ["image post processing", "stretching the data", "gradient removal", "processing astro images", "colour calibration"],
        keywords: ["PixInsight", "histogram stretch", "arcsinh stretch", "DBE", "photometric colour calibration", "StarNet", "curves adjustment", "noise reduction", "linear to nonlinear", "GraXpert"],
        tools: [{ k: "app", label: "Siril/GIMP or PixInsight stretch-and-finish workflow" }]
    },

    // =========================== INDIAN ASTRONOMY ===========================
    {
        id: "indian-star-names", name: "Indian Star & Constellation Names", domain: "indic", level: 2,
        desc: "Dhruva (Polaris), Saptarshi (the Big Dipper), Arundhati–Vasishtha (the Mizar–Alcor pair), Rohini (Aldebaran), Chitra (Spica): the Indian sky map atop the same stars.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: ["constellations", "pole-star"],
        misconceptions: ["Thinking Saptarshi and the Big Dipper are different star patterns — they are the same seven stars, and only the names and the stories differ", "Believing Dhruva is some pole star other than Polaris — Dhruva IS Polaris, the one star the whole sky visibly turns around", "Assuming Indian star names are translations of Greek ones — the naming is independent and often older; Arundhati-Vasishtha marks the Mizar-Alcor pair as a couple, which Greek astronomy never did"],
        aliases: ["indian star names", "dhruva tara", "saptarshi", "arundhati vasishtha", "indian constellation names"],
        keywords: ["dhruva", "polaris", "rohini", "aldebaran", "chitra", "spica", "mizar and alcor", "big dipper", "vyadha", "agastya"],
        tools: [{ k: "sky", label: "Match Indian names to IAU constellations tonight" }, { k: "android", label: "Indian Sky Map — planetarium with Indian constellations", url: "https://play.google.com/store/apps/details?id=com.alokm.android.stardroid" }, { k: "kaal", label: "Lunapedia — cultural names of the Moon and its path", url: "https://kaalshodh.com/lunapedia.html" }]
    },
    {
        id: "nakshatra", name: "The 27 Nakshatras", domain: "indic", level: 3,
        desc: "The ecliptic divided into 27 lunar mansions of 13°20′ each — one for each day of the Moon's sidereal circuit, each anchored to a marker star (yogatara).",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["ecliptic-zodiac", "moon-orbit"],
        misconceptions: ["Thinking the 27 nakshatras are the 12 rashis renamed — they are a different division of the same ecliptic, 13 degrees 20 minutes each, cut to the Moon's daily step, not the Sun's monthly one", "Believing a nakshatra is a constellation — it is a fixed 13 degree 20 minute segment of the ecliptic; the yogatara is only the marker star the segment is named for", "Assuming 27 is just a tidy number — the Moon completes its circuit against the stars in about 27.3 days, so one nakshatra is roughly one night's travel"],
        aliases: ["nakshatra", "nakshatras", "27 nakshatras", "lunar mansions", "naksatra"],
        keywords: ["yogatara", "ashwini", "bharani", "krittika", "rohini", "13 degrees 20 minutes", "pada", "abhijit", "sidereal month", "नक्षत्र"],
        tools: [{ k: "sky", label: "Find today's nakshatra and its yogatara" }, { k: "gol", label: "Moon stepping through nakshatras" , url: "https://gol.kaalshodh.com/app#panchang"}, { k: "android", label: "Indian Sky Map — nakshatra divisions on the live sky", url: "https://play.google.com/store/apps/details?id=com.alokm.android.stardroid" }]
    },
    {
        id: "tithi", name: "Tithi: the Lunar Day", domain: "indic", level: 3,
        desc: "A tithi is the time the Moon gains 12° on the Sun — 30 tithis from new moon to new moon. Being angle-based, tithis stretch and shrink; a date can even skip one.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["moon-phases"],
        misconceptions: ["Thinking a tithi is simply the Indian word for a day — it is the time the Moon takes to gain 12 degrees on the Sun, and that runs anywhere from about 19 to 26 hours", "Assuming each date carries exactly one tithi — because tithis vary in length, one can begin and end inside a single day (kshaya) or span two sunrises (adhika)", "Believing 30 tithis make a 30-day month — 30 tithis is one new moon to the next, about 29.5 days, which is why tithi and civil date steadily drift apart"],
        aliases: ["tithi", "tithis", "lunar day", "chandra dina"],
        keywords: ["12 degrees elongation", "shukla paksha", "krishna paksha", "amavasya", "purnima", "kshaya tithi", "adhika tithi", "30 tithis", "तिथि"],
        tools: [{ k: "gol", label: "Tithi as Sun–Moon angle animation" , url: "https://gol.kaalshodh.com/app#panchang"}, { k: "activity", label: "Compute tonight's tithi from Sun–Moon positions" }, { k: "android", label: "Hindu Calendar — daily tithi and lunar month", url: "https://play.google.com/store/apps/details?id=com.alokmandavgane.hinducalendar" }]
    },
    {
        id: "panchanga", name: "Panchanga: Five Limbs", domain: "indic", level: 3,
        desc: "The traditional almanac's five daily elements — vara (weekday), tithi, nakshatra, yoga, karana — each a different function of Sun and Moon longitudes. An ephemeris in cultural form.",
        tracks: ["club", "indic"],
        prereqs: ["tithi", "nakshatra"],
        misconceptions: ["Thinking the panchanga is astrology — it is a computed almanac of five quantities read off Sun and Moon longitudes; the astrological reading is one use of the table, not the table itself", "Assuming the five limbs are five unrelated traditions bundled together — vara, tithi, nakshatra, yoga and karana are all functions of the same two longitudes", "Believing a panchanga is copied forward from old books — a drik panchanga is recomputed from actual positions each year, and openly disagrees with the older approximations"],
        aliases: ["panchanga", "panchang", "pañcāṅga", "panchangam", "five limbs of the almanac"],
        keywords: ["vara", "yoga", "karana", "almanac", "drik panchang", "sun and moon longitudes", "पंचांग", "daily astronomical table", "ephemeris"],
        tools: [{ k: "activity", label: "Decode today's panchanga entry element by element" }, { k: "android", label: "Hindu Calendar — full panchang with muhurtas & kundali", url: "https://play.google.com/store/apps/details?id=com.alokmandavgane.hinducalendar" }, { k: "web", label: "hinducalendar.app — simplified online panchang (Ujjain)", url: "https://hinducalendar.app" }, { k: "gol", label: "Gol Panchang scene — the five limbs from live Sun & Moon", url: "https://gol.kaalshodh.com/app#panchang" }, { k: "kaal", label: "Kalganana — how the Panchang is computed from Sun & Moon", url: "https://kaalshodh.com/kaalganana.html" }]
    },
    {
        id: "rashi", name: "The 12 Rashis", domain: "indic", level: 3,
        desc: "The ecliptic cut into twelve 30° signs — Mesha through Meena — paralleling the Greek zodiac. In Indian usage the rashis stay fixed to the stars (sidereal), not the seasons.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["ecliptic-zodiac"],
        aliases: ["rashi", "rasi", "12 rashis", "sidereal zodiac signs", "राशि"],
        keywords: ["mesha", "vrishabha", "mithuna", "meena", "30 degrees each", "nirayana signs", "chandra rashi", "surya rashi", "fixed to the stars"],
        tools: [{ k: "sky", label: "Which rashi is the Sun actually in today?" }, { k: "web", label: "Bhagol,  the Celestial Map — zodiac signs on the live sky", url: "https://alokm.com/khagol/bhagol.html" }, { k: "web", label: "Lagna — ascendant rashi & midheaven vs latitude", url: "https://alokm.com/astro/lagna.html" }, { k: "gol", label: "Gol Lagna Rashi scene — the rising sign on the live sky", url: "https://gol.kaalshodh.com/app#lagna-rashi" }, { k: "kaal", label: "Lagna Rashi Map — world map of places sharing a rising sign", url: "https://kaalshodh.com/lagna-map.html" }, { k: "kaal", label: "Kumbh Mela — periods from Surya-Guru rashi alignment", url: "https://kaalshodh.com/kumbhmela.html" }]
    },
    {
        id: "sankranti-ritu", name: "Sankranti, Ayana & the Six Ritus", domain: "indic", level: 3,
        desc: "Sankranti marks the Sun entering a new rashi; Uttarayana and Dakshinayana are its northward and southward half-year journeys; six ritus divide the Indian seasonal year.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["equinox-solstice", "rashi"],
        aliases: ["sankranti", "makar sankranti", "uttarayana", "dakshinayana", "six ritus"],
        keywords: ["ritu", "vasanta", "grishma", "varsha", "sharad", "hemanta", "shishira", "ayana", "sun enters a new rashi", "seasonal year"],
        tools: [{ k: "activity", label: "Map festivals (Makar Sankranti, Pongal) to solar events" }, { k: "kaal", label: "Parva timeline — sankrantis & solar events across millennia", url: "https://kaalshodh.com/parva.html" }]
    },
    {
        id: "indian-calendar", name: "Indian Lunisolar Calendars", domain: "indic", level: 4,
        desc: "Vikram and Shaka calendars run lunar months within a solar year, inserting an adhika masa (extra month) roughly every 32.5 months to stay season-true — astronomy as living law.",
        tracks: ["club", "indic"],
        prereqs: ["panchanga", "calendar-systems", "sankranti-ritu"],
        aliases: ["indian lunisolar calendar", "vikram samvat", "shaka samvat", "hindu calendar", "adhika masa"],
        keywords: ["purnimanta", "amanta", "chaitra", "extra month", "malamasa", "saka era", "lunar month", "intercalation", "national calendar of india", "32.5 months"],
        tools: [{ k: "activity", label: "Find the last adhika masa and explain why it fell there" }, { k: "android", label: "Hindu Calendar — Vikram/Shaka dates & adhika masa", url: "https://play.google.com/store/apps/details?id=com.alokmandavgane.hinducalendar" }, { k: "kaal", label: "Adhik & Kshay Maas — extra and lost months across millennia", url: "https://kaalshodh.com/adhikmaas.html" }]
    },
    {
        id: "ayanamsa", name: "Ayanamsa: Sidereal vs Tropical", domain: "indic", level: 4,
        desc: "Precession has slid the seasonal (tropical) zodiac ~24° from the fixed-star (sidereal) zodiac since they aligned. That offset — the ayanamsa — is why Makar Sankranti is no longer on the solstice.",
        tracks: ["club", "indic"],
        prereqs: ["precession", "rashi", "sankranti-ritu"],
        aliases: ["ayanamsa", "ayanamsha", "lahiri ayanamsa", "sidereal versus tropical zodiac", "ayanamsha correction"],
        keywords: ["precession of the equinoxes", "about 24 degrees", "chitra paksha", "nirayana", "sayana", "285 CE coincidence", "offset from fixed stars", "makar sankranti drift"],
        tools: [{ k: "gol", label: "Two zodiacs drifting apart over centuries" }, { k: "kaal", label: "Sayan vs Nirayan — tropical vs sidereal month names compared", url: "https://kaalshodh.com/sayannirayan.html" }]
    },
    {
        id: "rahu-ketu", name: "Rahu & Ketu: the Nodes", domain: "indic", level: 4,
        desc: "The 'shadow planets' of Indian astronomy are the Moon's ascending and descending nodes — precisely where eclipses occur. Myth and orbital mechanics describing the same two points.",
        tracks: ["club", "indic"],
        prereqs: ["eclipse-seasons"],
        aliases: ["rahu and ketu", "rahu ketu", "lunar nodes", "shadow planets", "ascending and descending nodes"],
        keywords: ["ascending node", "descending node", "eclipse points", "18.6 year cycle", "nodal regression", "chhaya graha", "राहु", "केतु", "eclipse myth"],
        tools: [{ k: "gol", label: "Node positions vs eclipse dates" }]
    },
    {
        id: "ghati-muhurta", name: "Ghati, Muhurta & Indian Timekeeping", domain: "indic", level: 3,
        desc: "The day divided into 60 ghatis (24 min) and 30 muhurtas (48 min), measured by water clocks and gnomons. A complete sexagesimal time system predating hours and minutes here.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["shadow-clock"],
        aliases: ["ghati", "ghatika", "muhurta", "nadika", "indian units of time"],
        keywords: ["24 minutes", "48 minutes", "60 ghatis in a day", "30 muhurtas", "vighati", "pala", "water clock", "prahar", "brahma muhurta", "sexagesimal time"],
        tools: [{ k: "activity", label: "Build a ghati-yantra (sinking-bowl water clock)" }, { k: "web", label: "Hindu Time — live ishta kaal clock in ghati-pal-vipal", url: "https://hinducalendar.app/time" }]
    },
    {
        id: "aryabhata-work", name: "Aryabhata's Astronomy", domain: "indic", level: 3,
        desc: "In 499 CE Aryabhata taught that Earth rotates, gave π to four decimals, built sine tables, and explained eclipses by shadows — not demons. The namesake of this foundation.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["diurnal-motion", "lunar-eclipse"],
        grades: [6],
        aliases: ["aryabhata", "aryabhatiya", "aryabhata i", "aryabhata's astronomy"],
        keywords: ["499 CE", "kusumapura", "rotation of the earth", "value of pi", "3.1416", "sine table", "jya", "gitikapada", "golapada", "eclipse by shadow not demons"],
        tools: [{ k: "activity", label: "Read and unpack two verses of the Aryabhatiya" }, { k: "web", label: "Aryabhatiya Number System — Devanagari numeral encoding", url: "https://alokm.com/khagol/aryabhat/aryabhatns.html" }, { k: "web", label: "Dashagitika — chapter 1 of the Aryabhatiya,  verse by verse", url: "https://alokm.com/khagol/aryabhat/dashgitika.html" }, { k: "web", label: "Golapada — chapter 4: spherical astronomy & eclipses", url: "https://alokm.com/khagol/aryabhat/golapada.html" }]
    },
    {
        id: "siddhantic-astronomy", name: "Siddhantic Astronomy", domain: "indic", level: 4,
        desc: "The Surya Siddhanta and its successors: epicycle models, planetary mean motions and eclipse computation refined over a millennium by Varahamihira, Brahmagupta and Bhaskara.",
        tracks: ["club", "indic"],
        prereqs: ["aryabhata-work", "panchanga"],
        aliases: ["surya siddhanta", "siddhantic astronomy", "siddhanta tradition", "indian mathematical astronomy"],
        keywords: ["varahamihira", "brahmagupta", "bhaskara ii", "panchasiddhantika", "brahmasphutasiddhanta", "siddhanta shiromani", "manda epicycle", "mean motion", "revolutions per yuga"],
        tools: [{ k: "activity", label: "Compare a Siddhanta planetary period with the modern value" }, { k: "web", label: "Dashagitika — fundamental astronomical parameters in 13 verses", url: "https://alokm.com/khagol/aryabhat/dashgitika.html" }, { k: "kaal", label: "Siddhantic Comparison — Surya Siddhanta, Aryabhatiya & Siddhanta Shiromani vs JPL", url: "https://kaalshodh.com/siddhantic.html" }]
    },
    {
        id: "indian-instruments", name: "Traditional Instruments", domain: "indic", level: 3,
        desc: "Shanku (gnomon), ghati yantra (water clock), chakra yantra (graduated ring) and the astrolabe: pre-telescopic instruments that measured time and angle to surprising precision.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["shadow-clock", "angular-measure"],
        aliases: ["shanku yantra", "ghati yantra", "chakra yantra", "traditional indian instruments", "gnomon shanku"],
        keywords: ["gnomon", "shadow length", "water clock", "astrolabe", "yasti yantra", "dhanur yantra", "graduated ring", "armillary sphere", "pre-telescopic measurement"],
        tools: [{ k: "activity", label: "Build a shanku and derive latitude from noon shadow" }, { k: "web", label: "Shanku Yantra generator — a shanku for any place", url: "https://alokm.com/astro/shanku.html" }, { k: "web", label: "Sashtamsa Yantra — day of year,  declination & zenith distance", url: "https://alokm.com/astro/sashthamsa.html" }, { k: "gol", label: "Gol Astrolabe — the celestial sphere flattened to a brass disk", url: "https://gol.kaalshodh.com/astrolabe" }]
    },
    {
        id: "jantar-mantar", name: "Jantar Mantar Observatories", domain: "indic", level: 3,
        desc: "Jai Singh II's giant masonry instruments (1720s) — the Samrat Yantra sundial reads time to 2 seconds. Architecture-scale astronomy you can still walk through in Jaipur and Delhi.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["indian-instruments", "meridian-transit"],
        aliases: ["jantar mantar", "samrat yantra", "jai singh observatory", "jaipur observatory"],
        keywords: ["sawai jai singh ii", "misra yantra", "jai prakash yantra", "ram yantra", "rashivalaya", "1720s", "masonry instruments", "delhi observatory", "unesco world heritage", "sundial accurate to 2 seconds"],
        tools: [{ k: "activity", label: "Field trip / virtual tour: read time off the Samrat Yantra" }, { k: "web", label: "Jantar Mantar Dashboard — live Jaipur observatory readings", url: "https://alokm.com/jantarmantar/" }, { k: "web", label: "Sashtamsa Yantra — the geometry behind the instrument", url: "https://alokm.com/astro/sashthamsa.html" }]
    },

    // ############################################################
    // EXPANSION SET — finer sub-concepts and wider coverage
    // ############################################################

    // ---------------- Naked-eye sky: atmospheric & subtle phenomena ----------------
    {
        id: "star-twinkling", name: "Why Stars Twinkle", domain: "sky", level: 2,
        desc: "Turbulent air bends starlight randomly, making point-like stars dance and shimmer. Planets are tiny discs, not points, so their light averages out — they shine steady.",
        tracks: ["school-primary", "school-middle", "club", "photo"],
        prereqs: ["stars-vary", "air-atmosphere"],
        grades: [10],
        aliases: ["twinkling of stars", "why stars twinkle", "stellar scintillation", "planets do not twinkle"],
        keywords: ["scintillation", "atmospheric turbulence", "point source", "seeing", "refraction of starlight", "steady planets", "shimmer"],
        tools: [{ k: "activity", label: "Compare a star and a planet low vs high in the sky on one night" }]
    },
    {
        id: "atmospheric-refraction", name: "Atmospheric Refraction", domain: "sky", level: 3,
        desc: "Air bends light downward, lifting objects near the horizon by half a degree — the setting Sun you watch has geometrically already set, and its disc squashes into an oval.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["sun-daily-arc", "reflection-refraction", "air-atmosphere"],
        grades: [10],
        aliases: ["atmospheric refraction", "advance sunrise and delayed sunset", "refraction of light by the atmosphere", "apparent position of the sun near the horizon"],
        keywords: ["oval sun", "flattened sun", "half a degree lift", "denser air", "bending of light", "apparent sunrise", "already set"],
        tools: [{ k: "activity", label: "Photograph the flattened setting Sun; measure the squash" }, { k: "web", label: "True Equinox — why equal day-night misses the equinox date", url: "https://alokm.com/astro/equinox.html" }]
    },
    {
        id: "moon-illusion", name: "The Moon Illusion", domain: "sky", level: 2,
        desc: "The horizon Moon looks huge but measures exactly the same half-degree as the overhead Moon — the enlargement happens in your brain, not in the sky. A camera proves it.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: ["moon-observation", "angular-measure"],
        aliases: ["the moon illusion", "why the moon looks bigger near the horizon", "horizon moon illusion"],
        keywords: ["same angular size", "half a degree", "optical illusion", "perception", "camera test", "rising moon looks huge"],
        tools: [{ k: "activity", label: "Measure the rising and overhead Moon with the same coin at arm's length" }]
    },
    {
        id: "earthshine", name: "Earthshine", domain: "sky", level: 2,
        desc: "The ghostly glow filling the dark part of a crescent Moon is sunlight reflected off Earth — 'the old Moon in the new Moon's arms'. You are seeing our planet light another world.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["moon-phases"],
        aliases: ["earthshine", "old moon in the new moon's arms", "ashen light of the moon", "da vinci glow"],
        keywords: ["thin crescent", "dark limb", "reflected earthlight", "albedo", "ghostly glow", "earth lighting the moon"],
        tools: [{ k: "activity", label: "Spot and photograph earthshine on a 2–3 day old crescent" }]
    },
    {
        id: "halos-coronae", name: "Halos & Coronae", domain: "sky", level: 2,
        desc: "A big 22° ring around the Moon or Sun is a halo from ice crystals; a small rainbow-fringed disc hugging the Moon is a corona from water droplets. Free atmospheric optics, often before rain.",
        tracks: ["school-primary", "school-middle", "club", "photo"],
        prereqs: ["moon-observation"],
        aliases: ["halos and coronae", "22 degree halo", "ring around the moon", "lunar corona", "solar halo"],
        keywords: ["ice crystals", "cirrus clouds", "water droplets", "diffraction", "22 degrees", "sun dog", "iridescence", "rainbow fringe"],
        tools: [{ k: "activity", label: "Halo watch: verify the ring's radius with an outstretched hand" }]
    },
    {
        id: "zodiacal-light", name: "Zodiacal Light", domain: "sky", level: 3,
        desc: "A faint cone of light along the ecliptic after dusk or before dawn — sunlight scattered by interplanetary dust. A genuine dark-sky trophy for naked-eye observers.",
        tracks: ["club", "photo"],
        prereqs: ["ecliptic-zodiac", "light-pollution"],
        aliases: ["zodiacal light", "false dawn", "cone of light along the ecliptic", "interplanetary dust glow"],
        keywords: ["interplanetary dust", "gegenschein", "after dusk", "before dawn", "scattered sunlight", "dark sky trophy"],
        tools: [{ k: "activity", label: "Hunt the zodiacal light from a Bortle 1–3 site in Feb–Mar evenings" }]
    },
    {
        id: "aurora", name: "Aurorae", domain: "sky", level: 3,
        desc: "Solar-wind particles funnelled down Earth's magnetic field make the upper air glow in curtains of green and red. Strong storms have pushed aurorae as far south as Ladakh.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["solar-activity"],
        aliases: ["aurora", "northern lights", "aurora borealis", "polar lights", "southern lights"],
        keywords: ["solar wind", "geomagnetic storm", "magnetosphere", "green curtains", "Ladakh", "oxygen emission", "Kp index", "aurora australis"],
        tools: [{ k: "activity", label: "Track a solar storm's Kp index and aurora alerts in real time" }]
    },
    {
        id: "twilight-phases", name: "The Three Twilights", domain: "sky", level: 2,
        desc: "Civil, nautical and astronomical twilight mark the Sun 6°, 12° and 18° below the horizon. Real darkness — and deep-sky observing — begins only after astronomical twilight ends.",
        tracks: ["school-middle", "club", "photo"],
        prereqs: ["sun-daily-arc"],
        aliases: ["civil nautical and astronomical twilight", "types of twilight", "astronomical twilight", "twilight"],
        keywords: ["6 degrees below horizon", "12 degrees", "18 degrees", "dusk", "dawn", "blue hour", "sun below the horizon", "true darkness"],
        tools: [{ k: "whatsup", label: "Tonight's twilight end and start times" }, { k: "android", label: "Sunrise Sunset — twilight timings for your location", url: "https://play.google.com/store/apps/details?id=com.alokmandavgane.sunrisesunset" }]
    },
    {
        id: "asterisms", name: "Asterisms", domain: "sky", level: 1,
        desc: "Popular star patterns that aren't official constellations — the Big Dipper is part of Ursa Major, the Summer Triangle spans three constellations. The sky's informal landmarks.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: ["constellations"],
        misconceptions: ["Thinking the Big Dipper or the Saptarishi is a constellation — it is only the bright core of Ursa Major, a far larger patch of sky", "Believing the stars of an asterism belong together — the Summer Triangle's three lie in three different constellations, at three very different distances", "Treating asterisms as second-rate because they are unofficial — they are what observers actually use to find their way around the sky"],
        grades: [8],
        aliases: ["asterism", "big dipper", "summer triangle", "unofficial star patterns", "saptarishi"],
        keywords: ["Plough", "Winter Hexagon", "Great Square of Pegasus", "Ursa Major", "not an official constellation", "informal pattern", "sky landmark"],
        tools: [{ k: "sky", label: "Find the Big Dipper, Summer Triangle, and Orion's Belt" }]
    },
    {
        id: "star-names", name: "Star Names & Bayer Letters", domain: "sky", level: 2,
        desc: "Bright stars carry ancient proper names (many Arabic: Aldebaran, Deneb); astronomers label stars α, β, γ by brightness within each constellation. Two naming systems, one sky.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["constellations"],
        misconceptions: ["Believing you can buy a star and have your name officially attached — only the IAU names stars, and the certificates those registries sell appear in no catalogue any astronomer uses", "Thinking alpha is always the brightest star of its constellation — Bayer's lettering is rough and sometimes simply wrong: Betelgeuse is alpha Orionis, but Rigel outshines it", "Assuming a star has one true name — Aldebaran, alpha Tauri and a catalogue number are the same star under naming systems built for different purposes"],
        grades: [8],
        aliases: ["star names", "bayer designations", "greek letters for stars", "proper names of stars", "bayer letters"],
        keywords: ["Aldebaran", "Deneb", "Rigel", "Arabic star names", "Greek alphabet labels", "Bayer designation", "brightest star in a constellation"],
        tools: [{ k: "sky", label: "Decode α Orionis, β Persei and other Bayer names on the chart" }]
    },
    {
        id: "morning-evening-star", name: "Morning & Evening Stars", domain: "sky", level: 2,
        desc: "Venus and Mercury never stray far from the Sun, appearing only near dawn or dusk — the same Venus is 'evening star' for months, then switches to the morning sky.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: ["planets-wanderers"],
        grades: [6, 8],
        aliases: ["morning star and evening star", "evening star", "morning star", "venus as the morning star"],
        keywords: ["Venus", "Mercury", "elongation", "dawn sky", "dusk sky", "Shukra", "inferior planet", "never far from the sun"],
        tools: [{ k: "whatsup", label: "Where is Venus this month — morning or evening?" }]
    },
    {
        id: "heliacal-rising", name: "Heliacal Rising", domain: "sky", level: 3,
        desc: "The first dawn on which a star reappears from the Sun's glare after weeks of invisibility. Ancient calendars worldwide — Egyptian, Vedic, Tamil — ran on such risings.",
        tracks: ["club", "indic"],
        prereqs: ["seasonal-skies"],
        aliases: ["heliacal rising", "heliacal rising and setting", "first dawn reappearance of a star"],
        keywords: ["Sirius", "Sothic rising", "Nile flood", "solar glare", "Krittika", "ancient calendar marker", "reappears at dawn"],
        tools: [{ k: "activity", label: "Catch the heliacal rising of Krittika (Pleiades) or Agastya (Canopus)" }]
    },

    // ---------------- Sphere & motion: position, navigation, slow drifts ----------------
    {
        id: "latitude-sky", name: "Sky from Different Latitudes", domain: "sphere", level: 3,
        desc: "At the equator every star rises and sets vertically; at the poles nothing rises or sets at all. Your latitude completely decides which sky you own — Canopus for Chennai, none for London.",
        tracks: ["school-high", "club"],
        prereqs: ["pole-star", "celestial-sphere", "latitude-longitude"],
        misconceptions: ["Thinking everyone on Earth sees the same stars — Canopus is a routine sight from Chennai and never once rises for London", "Expecting stars to climb the sky the same way everywhere — they rise vertically at the equator, slant at mid-latitudes, and at the poles circle round without rising or setting at all"],
        aliases: ["sky from different latitudes", "how the sky changes with latitude", "latitude and the visible sky", "observer's latitude and star paths"],
        keywords: ["Canopus", "equator", "poles", "star paths tilt", "which stars are visible", "altitude of the pole star", "southern sky"],
        tools: [{ k: "gol", label: "Drag latitude and watch the sky's tilt change" }, { k: "web", label: "iso Rise Set — every place where an object rises or sets together", url: "https://alokm.com/astro/isoriseset.html" }]
    },
    {
        id: "celestial-navigation", name: "Celestial Navigation", domain: "sphere", level: 3,
        desc: "Polaris's altitude gives latitude; a star's measured height and exact time give a position line. How sailors crossed oceans for centuries with a sextant and an almanac.",
        tracks: ["school-high", "club"],
        prereqs: ["pole-star", "angular-measure"],
        grades: [8],
        aliases: ["celestial navigation", "navigation by the stars", "finding latitude from the pole star", "astronavigation"],
        keywords: ["sextant", "almanac", "position line", "sailors", "chronometer", "latitude at sea", "measured altitude and exact time"],
        tools: [{ k: "activity", label: "Build a quadrant from a protractor and find your latitude tonight" }]
    },
    {
        id: "proper-motion", name: "Proper Motion", domain: "sphere", level: 4,
        desc: "Stars really do move — Barnard's Star crosses a Moon-width in 180 years, and in 50,000 years the Big Dipper will be bent. 'Fixed stars' is only true on human timescales.",
        tracks: ["school-high", "club"],
        prereqs: ["equatorial-coords"],
        aliases: ["proper motion", "proper motion of stars", "real motion of stars across the sky", "changing shape of constellations over time"],
        keywords: ["Barnard's Star", "arcseconds per year", "50000 years", "fixed stars", "Big Dipper will bend", "Gaia", "milliarcseconds"],
        tools: [{ k: "activity", label: "Morph the Big Dipper from 100,000 BCE to 100,000 CE with real data" }]
    },
    {
        id: "lunar-libration", name: "Lunar Libration", domain: "scope", level: 4,
        desc: "The Moon rocks gently side-to-side and up-and-down as it orbits, letting us peek around its edges — 59% of the surface is visible over time, not just 50%.",
        tracks: ["club", "photo"],
        prereqs: ["tidal-locking", "lunar-observing"],
        misconceptions: ["Thinking we see exactly half the Moon and the rest never — libration rocks it side to side and nods it up and down, letting us peek round the limbs at about 59% over time", "Picturing libration as a random wobble — it is predictable geometry from an elliptical orbit and a tilted axis, and a libration chart tells you which limb is tipped toward you tonight", "Calling the unseen 41% the 'dark side' — it takes just as much sunlight as the near side; it is the far side, the part that never turns toward us"],
        aliases: ["libration of the moon", "lunar libration zones", "the moon's rocking motion"],
        keywords: ["59 percent of the surface", "libration in longitude", "libration in latitude", "mare orientale", "limb regions", "diurnal libration", "peeking round the edge", "libration chart"],
        tools: [{ k: "activity", label: "Photograph Mare Crisium's distance from the limb across a month" }]
    },

    // ---------------- Time: applied & historical ----------------
    {
        id: "sundial-design", name: "Building Sundials", domain: "time", level: 3,
        desc: "A sundial's gnomon must parallel Earth's axis — tilted at your latitude, aimed at the pole. Get that right and horizontal, vertical or equatorial dials all read true.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["shadow-clock", "seasons"],
        aliases: ["building a sundial", "sundial design", "how to make a sundial", "equatorial sundial", "horizontal sundial"],
        keywords: ["gnomon angle", "style", "hour lines", "latitude tilt", "Jantar Mantar", "Samrat Yantra", "dial plate", "vertical dial", "parallel to earth's axis"],
        tools: [{ k: "activity", label: "Build a cardboard equatorial sundial for your latitude" }, { k: "web", label: "Human Sundial — analemmatic sundial template for any location", url: "https://alokm.com/astro/human_sundial.html" }]
    },
    {
        id: "leap-years", name: "Leap Years & Calendar Reform", domain: "time", level: 3,
        desc: "The year is 365.2422 days — the awkward .2422 forced leap days, the skipped centuries rule, and the 1582 Gregorian reform that deleted ten days from October.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["calendar-systems"],
        grades: [6],
        aliases: ["leap year", "leap years and calendar reform", "gregorian calendar reform", "why we have leap years"],
        keywords: ["365.2422 days", "February 29", "1582", "Julian calendar", "century rule", "400 years", "ten days deleted"],
        tools: [{ k: "activity", label: "Work out why 1900 wasn't a leap year but 2000 was" }]
    },
    {
        id: "seven-day-week", name: "Vara & the 7-Day Week", domain: "time", level: 3,
        desc: "The week comes from the seven classical 'planets' ruling hours in rotation — Ravivar/Sunday to Shanivar/Saturday match across India, Rome and Babylon. Astronomy fossilised in every calendar.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["planets-wanderers"],
        aliases: ["seven day week", "why the week has seven days", "origin of the days of the week", "vara", "planetary hours"],
        keywords: ["Ravivar", "Shanivar", "Somvar", "planetary rulers", "Babylon", "classical planets", "seven planets", "weekday names"],
        tools: [{ k: "activity", label: "Derive the weekday order from the planetary-hours rule" }]
    },
    {
        id: "julian-day", name: "The Julian Day Count", domain: "time", level: 4,
        desc: "Astronomers number days continuously from 4713 BCE — no months, no leap confusion. Variable-star observers and eclipse computers live on JD arithmetic.",
        tracks: ["club", "photo"],
        prereqs: ["calendar-systems"],
        aliases: ["julian day number", "julian date", "julian day count"],
        keywords: ["4713 BCE", "2451545", "J2000", "continuous day count", "variable star observers", "epoch", "fractional day"],
        tools: [{ k: "activity", label: "Compute today's JD by hand, verify with an ephemeris" }, { k: "kaal", label: "Ahargana — the Indian continuous day-count from Kaliyuga", url: "https://kaalshodh.com/ahargana.html" }]
    },
    {
        id: "almanac-reading", name: "Reading an Ephemeris", domain: "time", level: 3,
        desc: "An ephemeris tabulates where everything is, when: RA/Dec of planets, rise/set times, phases, events. Learning to read one turns forecasts into plans.",
        tracks: ["club", "indic"],
        prereqs: ["equatorial-coords"],
        aliases: ["reading an ephemeris", "ephemeris", "astronomical almanac", "panchanga"],
        keywords: ["rise and set times", "tabulated positions", "tithi", "nakshatra", "planetary positions", "event predictions", "yearbook"],
        tools: [{ k: "whatsup", label: "Cross-check tonight's planet positions against an almanac" }, { k: "kaal", label: "Ephemeris — rise/set, phases & sidereal Navagraha longitudes", url: "https://kaalshodh.com/ephemeris.html" }]
    },

    // ---------------- Solar system: surfaces, events, spacecraft ----------------
    {
        id: "lunar-geology", name: "Craters & Maria", domain: "solar", level: 2,
        desc: "The Moon's dark 'seas' are ancient lava plains; its craters are asteroid scars, preserved for billions of years with no air or water to erase them. The face of the Moon is a history book.",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: ["moon-observation"],
        misconceptions: ["Thinking the maria are seas, or once held water — they are ancient basalt lava plains; the name is a 17th-century guess that stuck", "Believing the craters are volcanoes — almost all are impact scars, which is why they come out round no matter what direction the impactor arrived from", "Expecting the Moon's surface to wear smooth like Earth's — with no air and no water there is nothing to erase a crater, so they sit there for billions of years"],
        aliases: ["craters and maria", "lunar maria", "craters on the moon", "seas of the moon"],
        keywords: ["mare", "Tycho", "regolith", "lunar highlands", "terminator", "Sea of Tranquility", "impact basin", "ray system", "lava plains"],
        tools: [{ k: "activity", label: "Crater experiment: drop stones into flour + cocoa at different speeds" }]
    },
    {
        id: "impact-craters", name: "Impacts on Earth", domain: "solar", level: 3,
        desc: "Earth gets hit too — Lonar Lake in Maharashtra is a 50,000-year-old impact crater, and the dinosaurs met a 10-km asteroid. Erosion, not luck, hides our scars.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["asteroids-kuiper", "lunar-geology"],
        aliases: ["impact craters on earth", "meteorite impact crater", "lonar crater", "asteroid impact on earth"],
        keywords: ["Lonar Lake", "Maharashtra", "Chicxulub", "Barringer", "dinosaur extinction", "Ramgarh", "shatter cones", "shocked quartz", "50, 000 years"],
        tools: [{ k: "activity", label: "Case study: Lonar crater — map, rock evidence, age" }]
    },
    {
        id: "occultations", name: "Occultations", domain: "scope", level: 4,
        desc: "The Moon or an asteroid slides in front of a star, switching it off like a lamp. Timing these disappearances measures positions, shapes of asteroids, even discovers rings.",
        tracks: ["club"],
        prereqs: ["moon-orbit", "star-hopping"],
        aliases: ["lunar occultation", "asteroid occultation", "occultation timing", "grazing occultation", "star hidden by the moon"],
        keywords: ["IOTA", "chord timing", "reappearance", "graze line", "video time insertion", "GPS timestamp", "asteroid shape profile", "chariklo rings", "disappearance event", "prediction path"],
        tools: [{ k: "whatsup", label: "Upcoming lunar occultations of bright stars" }, { k: "activity", label: "Time a disappearance at the Moon's dark limb to 0.1 s" }, { k: "android", label: "Sat Timer — precise satellite time for occultation timing", url: "https://play.google.com/store/apps/details?id=com.alokm.sattimer" }]
    },
    {
        id: "planetary-transits", name: "Transits of Mercury & Venus", domain: "solar", level: 4,
        desc: "Rarely, an inner planet crosses the Sun's face as a crawling black dot. Venus transits (last: 2012, next: 2117) once gave humanity its first measure of the solar system's true size.",
        tracks: ["school-high", "club"],
        prereqs: ["planetary-configurations", "solar-observing"],
        aliases: ["transit of venus", "transit of mercury", "planetary transit"],
        keywords: ["2012", "2117", "black drop effect", "solar parallax", "Horrocks", "silhouette on the sun", "1761", "1874", "measuring the AU"],
        tools: [{ k: "activity", label: "How the 1761/69 Venus transits measured the AU — re-run the geometry" }]
    },
    {
        id: "saturn-rings", name: "Rings of Saturn", domain: "solar", level: 3,
        desc: "A sheet of ice chunks thinner, in proportion, than paper — spanning 280,000 km. The rings tilt through a 29-year cycle and vanish edge-on, as they did for Galileo.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "photo"],
        prereqs: ["solar-system-inventory"],
        aliases: ["rings of saturn", "saturn's rings", "ring system of saturn"],
        keywords: ["Cassini division", "ring plane crossing", "29 years", "ice particles", "Huygens", "shepherd moons", "A ring", "B ring", "280, 000 km", "edge on"],
        tools: [{ k: "whatsup", label: "Current ring tilt and best viewing months" }]
    },
    {
        id: "meteorites", name: "Meteorites", domain: "solar", level: 3,
        desc: "Space rocks that survive the fall: stony chondrites older than Earth, iron cores of shattered planetesimals. Each is a free sample from the solar system's construction site.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["meteor-showers"],
        grades: [6],
        aliases: ["meteorites", "meteorite fall", "space rocks that reach the ground"],
        keywords: ["chondrite", "iron meteorite", "stony meteorite", "fusion crust", "Widmanstatten pattern", "achondrite", "planetesimal", "Allende", "older than the earth"],
        tools: [{ k: "activity", label: "Test a candidate rock: magnet, density, fusion crust checklist" }]
    },
    {
        id: "lagrange-points", name: "Lagrange Points", domain: "solar", level: 5,
        desc: "Five gravitational parking spots where a small body can hold station with two big ones. India's Aditya-L1 watches the Sun from L1; JWST observes from L2.",
        tracks: ["school-high", "club"],
        prereqs: ["orbits-satellites"],
        aliases: ["lagrange points", "L1 point", "L2 point", "libration points"],
        keywords: ["Aditya-L1", "JWST", "halo orbit", "L4", "L5", "three body problem", "1.5 million km", "Lagrange", "gravitational parking"],
        tools: [{ k: "activity", label: "Map the five points for the Sun–Earth system; place real missions" }]
    },
    {
        id: "space-missions-india", name: "India in Space", domain: "solar", level: 2,
        desc: "Chandrayaan-3 landed at the lunar south pole, Mangalyaan orbited Mars on a first attempt, Aditya-L1 stares at the Sun, AstroSat scans the X-ray sky — and Gaganyaan comes next.",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: ["solar-system-inventory"],
        aliases: ["indian space missions", "isro missions", "chandrayaan", "mangalyaan", "india in space"],
        keywords: ["Chandrayaan-3", "Vikram lander", "Pragyan", "Mars Orbiter Mission", "Aditya-L1", "AstroSat", "Gaganyaan", "ISRO", "PSLV", "lunar south pole"],
        tools: [{ k: "activity", label: "Mission timeline wall: plot every ISRO science mission" }]
    },

    // ---------------- Light & instruments: finer physics ----------------
    {
        id: "inverse-square", name: "The Inverse-Square Law", domain: "light", level: 3,
        desc: "Double the distance, quarter the light — brightness falls as 1/d². This single rule connects a star's true power, its distance, and how bright it looks to us.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["light-travel"],
        misconceptions: ["Thinking brightness halves when the distance doubles — it quarters, because the same light is spread over four times the area", "Applying 1/d squared to anything that glows — the law is for point sources; a long tube light or a nearby extended object does not follow it until you are far enough away"],
        aliases: ["inverse square law of light", "inverse-square law", "brightness falls as one over distance squared", "flux and distance relation"],
        keywords: ["1/d squared", "quarter the brightness", "flux", "point source", "illuminance", "photometry", "luminosity and distance", "double the distance"],
        tools: [{ k: "activity", label: "Lux-meter (phone app) vs distance from a bulb: plot 1/d²" }]
    },
    {
        id: "atmospheric-extinction", name: "Airmass & Extinction", domain: "light", level: 4,
        desc: "Light through more atmosphere gets dimmed and reddened — why the horizon Sun is orange and why photometry corrects for 'airmass'. Observe high, image high.",
        tracks: ["club", "photo"],
        prereqs: ["apparent-magnitude"],
        misconceptions: ["Thinking a star's brightness is fixed wherever it sits in the sky — the same star measures visibly fainter near the horizon, because its light crosses several times more atmosphere", "Believing the setting Sun is orange because it has cooled or moved farther away — it is the same Sun; the long slant path has scattered the blue out before it reaches you", "Treating a clear night as extinction-free — even straight overhead the air costs a few tenths of a magnitude; 'clear' is not the same as transparent"],
        grades: [10],
        aliases: ["atmospheric extinction", "airmass", "air mass correction", "atmospheric reddening"],
        keywords: ["zenith distance", "secant z", "scattering", "reddening at the horizon", "orange setting sun", "magnitudes per airmass", "photometric correction", "observe high in the sky"],
        tools: [{ k: "activity", label: "Estimate a star's magnitude at 20° and at 70° altitude; compare" }]
    },
    {
        id: "eye-at-night", name: "The Eye as a Detector", domain: "light", level: 2,
        desc: "Cone cells see colour but need light; rod cells see faint things only in grey. That's why nebulae look ghostly-grey in the eyepiece yet glow red and blue in photographs.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["stars-vary", "eyes-vision"],
        misconceptions: ["Blaming the telescope when a nebula looks grey — at that light level only your colour-blind rods are firing; the camera that shows red and blue stacked photons for an hour", "Thinking the eye works in the dark exactly as in daylight, only dimmer — the cones simply stop reporting, so colour is the first thing to go and grey is all the rods can offer", "Assuming staring straight at a faint object is the best way to see it — the centre of your retina is nearly all cones, the worst possible detector for something that faint"],
        grades: [8, 10],
        aliases: ["rods and cones", "dark adaptation", "night vision of the eye", "the eye as a detector", "scotopic vision"],
        keywords: ["rod cells", "cone cells", "retina", "photopic vision", "averted vision", "20 minutes to adapt", "red torch", "grey nebulae in the eyepiece", "colour needs light"],
        tools: [{ k: "activity", label: "Colour-vanishing test: watch colours die as light dims" }]
    },

    // ---------------- Observing craft: practical additions ----------------
    {
        id: "telescope-operation", name: "First Light: Using a Telescope", domain: "scope", level: 2,
        desc: "Align the finder in daylight, start with the lowest power, centre on something bright, focus slowly. Ten minutes of drill separates a magical first night from a frustrating one.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "photo"],
        prereqs: ["binoculars"],
        misconceptions: ["Expecting a telescope to just show you things — without a finder aligned in daylight, a cooled tube and some idea where to point, the first night is an hour of hunting empty black sky", "Starting with the highest-power eyepiece in the box — the field is then tiny, dim and drifting fast, and a beginner can hunt all night without landing on anything", "Assuming a fuzzy view means bad optics when the focuser has simply not been crept through slowly — focus comes and goes over a hair's width of travel"],
        aliases: ["first light with a telescope", "setting up a telescope", "using a telescope for the first time", "telescope setup basics"],
        keywords: ["finder alignment", "lowest power eyepiece", "focuser", "star diagonal", "daylight alignment", "dew cap", "cool down time", "centre on something bright", "focus slowly"],
        tools: [{ k: "activity", label: "Finder-alignment and focus drill on a distant treetop, then the Moon" }]
    },
    {
        id: "exit-pupil", name: "Exit Pupil & Eye Relief", domain: "scope", level: 4,
        desc: "The beam leaving the eyepiece should match your night-opened pupil (~7 mm young, ~5 mm older) — the physics behind why 7×50s suit youngsters and 8×32s suit elders.",
        tracks: ["club"],
        prereqs: ["magnification-eyepieces", "eye-at-night"],
        misconceptions: ["Assuming a bigger exit pupil is always better — past what your night pupil can open to (about 7 mm young, 5 mm older) the extra light lands on your iris and is simply thrown away", "Thinking eye relief is only about comfort — with 8 mm of it a spectacle wearer physically cannot take in the whole field, however fine the eyepiece is", "Blaming the eyepiece for blackouts and kidney-beaning when your eye is just parked at the wrong distance from a long-eye-relief design"],
        aliases: ["exit pupil", "eye relief", "eye relief for spectacle wearers", "matching the eye's pupil"],
        keywords: ["7mm exit pupil", "aperture divided by magnification", "20mm eye relief", "5mm pupil", "8x32", "kidney beaning", "dilated pupil at night", "blackout"],
        tools: [{ k: "activity", label: "Compute exit pupils for every binocular and eyepiece you own" }]
    },
    {
        id: "goto-platesolving", name: "GoTo & Plate Solving", domain: "scope", level: 4,
        desc: "GoTo mounts point from a star-alignment; plate solving goes further — photograph anywhere, match the star pattern, know exactly where you point. Modern pointing is software.",
        tracks: ["club", "photo"],
        prereqs: ["equatorial-coords", "telescope-mounts"],
        aliases: ["GoTo mount", "plate solving", "computerised telescope pointing", "two star alignment", "astrometric solving"],
        keywords: ["astrometry.net", "ASTAP", "SynScan", "NexStar", "hand controller", "sync on a star", "blind solve", "ASCOM", "PlateSolve2", "pointing model"],
        tools: [{ k: "app", label: "Plate-solve one of your own photos with astrometry.net" }]
    },
    {
        id: "visual-filters", name: "Visual Nebula Filters", domain: "scope", level: 4,
        desc: "UHC and OIII filters pass only the wavelengths nebulae emit, dumping skyglow — the Veil Nebula appears from nothing. They help emission nebulae only; galaxies get no rescue.",
        tracks: ["club"],
        prereqs: ["deepsky-observing", "spectrum-color"],
        misconceptions: ["Expecting a nebula filter to rescue a galaxy — UHC and OIII pass only the narrow lines an emission nebula radiates, and a galaxy's broad starlight gets blocked along with the skyglow", "Thinking a filter adds light — it subtracts, dumping skyglow so the nebula stands out; everything in the field, nebula included, actually looks dimmer through it", "Treating a broadband light-pollution filter as a substitute for a dark sky — it trims a couple of lamp wavelengths, not the drive out of town"],
        aliases: ["UHC filter", "nebula filter for the eyepiece", "OIII visual filter", "light pollution reduction filter"],
        keywords: ["veil nebula", "swan band", "emission nebula only", "1.25 inch filter thread", "skyglow rejection", "H-beta filter", "no help for galaxies", "broadband LPR"],
        tools: [{ k: "activity", label: "Blink the Veil or Rosette in and out with an OIII filter" }]
    },

    // ---------------- Stars & cosmos: physics and frontiers ----------------
    {
        id: "stellar-fusion", name: "How Stars Shine", domain: "stars", level: 3,
        desc: "Stars fuse hydrogen into helium; the missing mass becomes energy by E = mc². The Sun converts four million tonnes of matter to light every second — and has fuel for five billion years more.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["sun-as-star"],
        grades: [12],
        aliases: ["nuclear fusion in stars", "how stars shine", "hydrogen fusion", "proton-proton chain", "thermonuclear fusion in the sun"],
        keywords: ["E = mc2", "mass defect", "binding energy", "helium-4", "cno cycle", "four million tonnes per second", "15 million kelvin core", "energy source of the sun"],
        tools: [{ k: "activity", label: "Compute the Sun's mass-loss per second from its power output" }]
    },
    {
        id: "spectral-classes", name: "Spectral Classes: OBAFGKM", domain: "stars", level: 4,
        desc: "Stars sort into temperature classes O (blue, 40,000 K) through M (red, 3,000 K); the Sun is a G2. One letter compresses a star's spectrum, colour and temperature.",
        tracks: ["school-high", "club"],
        prereqs: ["star-colors-temp", "spectroscopy"],
        aliases: ["spectral classification", "obafgkm", "spectral type", "harvard spectral classes", "o b a f g k m"],
        keywords: ["g2v", "annie jump cannon", "morgan keenan system", "m dwarf", "40, 000 K", "oh be a fine girl kiss me", "the sun is a g2", "temperature sequence of letters"],
        tools: [{ k: "activity", label: "Classify real spectra strips into OBAFGKM order" }]
    },
    {
        id: "binary-stars", name: "Binary Stars & Stellar Masses", domain: "stars", level: 4,
        desc: "Half the stars are pairs, orbiting each other under Kepler's laws — the only direct way to weigh a star. Every stellar mass in the textbooks traces back to a binary.",
        tracks: ["school-high", "club"],
        prereqs: ["keplers-laws", "double-variable-stars"],
        aliases: ["binary star", "double star", "binary system", "eclipsing binary", "weighing stars with binaries"],
        keywords: ["mizar", "albireo", "spectroscopic binary", "algol", "mass ratio", "kepler's third law", "orbital period", "visual binary", "centre of mass", "half of all stars are pairs"],
        tools: [{ k: "activity", label: "Derive the Sirius A+B mass from its 50-year orbit data" }]
    },
    {
        id: "variable-stars", name: "Variable Stars & Cepheids", domain: "stars", level: 4,
        desc: "Some stars pulse on a clock, and Cepheids pulse with a period that reveals their true brightness — Henrietta Leavitt's discovery that turned variable stars into cosmic distance markers.",
        tracks: ["school-high", "club"],
        prereqs: ["apparent-magnitude"],
        aliases: ["variable star", "cepheid variable", "cepheids", "period-luminosity relation", "pulsating stars"],
        keywords: ["henrietta leavitt", "delta cephei", "rr lyrae", "mira", "light curve", "aavso", "period in days", "pulsation", "standard candle from period"],
        tools: [{ k: "activity", label: "Plot Delta Cephei's light curve from nightly estimates" }]
    },
    {
        id: "planetary-nebulae", name: "Planetary Nebulae & White Dwarfs", domain: "stars", level: 4,
        desc: "A dying Sun-like star exhales its outer layers into a glowing shell around a white-hot ember. The Ring Nebula is the Sun's own future, visible in a small telescope.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["stellar-evolution"],
        aliases: ["planetary nebula", "white dwarf", "ring nebula", "planetary nebulae and white dwarfs"],
        keywords: ["m57", "helix nebula", "dumbbell nebula", "electron degeneracy pressure", "the sun's future", "0.6 solar masses", "shed outer layers", "glowing shell", "sirius b"],
        tools: [{ k: "sky", label: "Find M57, the Ring Nebula, in Lyra" }]
    },
    {
        id: "radio-astronomy", name: "Radio Astronomy & the GMRT", domain: "stars", level: 4,
        desc: "The sky broadcasts: pulsars tick, hydrogen clouds hum at 21 cm, galaxies roar. Near Pune stands the GMRT, one of the world's largest radio telescope arrays — and it's Indian.",
        tracks: ["school-high", "club"],
        prereqs: ["em-spectrum"],
        aliases: ["radio astronomy", "radio telescope", "gmrt", "giant metrewave radio telescope", "21 cm line"],
        keywords: ["khodad near pune", "pulsar", "karl jansky", "interferometry", "ncra", "neutral hydrogen", "dish array", "ooty radio telescope", "very large array", "radio sky"],
        tools: [{ k: "activity", label: "Visit/virtual-tour the GMRT; map what 21 cm hydrogen reveals" }]
    },
    {
        id: "space-telescopes", name: "Space Telescopes", domain: "stars", level: 4,
        desc: "Above the blur and the blocked wavelengths: Hubble in visible, JWST in infrared, Chandra in X-rays — and India's AstroSat watching in ultraviolet and X-ray at once.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["em-spectrum", "telescope-designs"],
        aliases: ["space telescope", "hubble space telescope", "james webb space telescope", "astrosat", "orbiting observatory"],
        keywords: ["jwst", "chandra x-ray observatory", "hst", "lagrange point l2", "above the atmosphere", "uvit", "spitzer", "isro astrosat", "no atmospheric blur"],
        tools: [{ k: "activity", label: "Same nebula through Hubble, JWST and AstroSat eyes — compare" }]
    },
    {
        id: "gravitational-waves", name: "Gravitational Waves", domain: "stars", level: 5,
        desc: "Colliding black holes shake spacetime itself; LIGO's detectors feel the tremor as a length change smaller than a proton. LIGO-India in Maharashtra will join the network.",
        tracks: ["school-high", "club"],
        prereqs: ["supernovae-compact"],
        aliases: ["gravitational waves", "ligo", "ligo-india", "ripples in spacetime", "binary black hole merger"],
        keywords: ["gw150914", "laser interferometer", "hingoli maharashtra", "virgo detector", "chirp signal", "strain smaller than a proton", "general relativity prediction", "2017 nobel prize", "neutron star merger"],
        tools: [{ k: "activity", label: "Listen to the GW150914 'chirp'; decode what its pitch tells" }]
    },
    {
        id: "dark-matter-energy", name: "Dark Matter & Dark Energy", domain: "stars", level: 5,
        desc: "Galaxies spin too fast for their visible mass, and the expansion is speeding up. Some 95% of the universe is stuff we can't yet see — astronomy's biggest open question.",
        tracks: ["school-high", "club"],
        prereqs: ["galaxies", "hubble-expansion"],
        aliases: ["dark matter", "dark energy", "galaxy rotation curves", "missing mass problem", "accelerating expansion"],
        keywords: ["vera rubin", "wimp", "gravitational lensing", "95 percent of the universe", "cosmological constant", "lambda cdm", "bullet cluster", "flat rotation curve", "spin too fast"],
        tools: [{ k: "activity", label: "Plot a real galaxy rotation curve; find the missing mass" }, { k: "web", label: "Gravitational Lensing — distortion by a large mass,  interactive", url: "https://alokm.com/astro/lensing.html" }]
    },
    {
        id: "cosmic-microwave-background", name: "The Cosmic Microwave Background", domain: "stars", level: 5,
        desc: "The universe's baby photo: light from 380,000 years after the Big Bang, stretched to microwaves, arriving from every direction. Old TVs even picked up a whisper of it as static.",
        tracks: ["school-high", "club"],
        prereqs: ["bigbang-cosmology", "em-spectrum"],
        aliases: ["cosmic microwave background", "cmb", "cmbr", "relic radiation", "microwave background radiation"],
        keywords: ["2.7 kelvin", "penzias and wilson", "wmap", "planck satellite", "380, 000 years after", "anisotropy", "surface of last scattering", "cobe", "tv static"],
        tools: [{ k: "activity", label: "Read the Planck all-sky map: what do the speckles mean?" }]
    },
    {
        id: "astrobiology", name: "Life in the Universe", domain: "stars", level: 4,
        desc: "Habitable zones, water worlds, biosignature gases, and the Drake equation's honest unknowns. The first question every school child asks — now a real measurement programme.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["exoplanets"],
        aliases: ["astrobiology", "life in the universe", "drake equation", "habitable zone", "search for extraterrestrial life"],
        keywords: ["goldilocks zone", "biosignature", "seti", "extremophile", "fermi paradox", "liquid water", "europa", "methane in the atmosphere", "are we alone"],
        tools: [{ k: "activity", label: "Debate: which solar-system world would you search first, and why?" }]
    },

    // ---------------- Astrophotography: craft details ----------------
    {
        id: "raw-format", name: "RAW Files & Bit Depth", domain: "astro", level: 3,
        desc: "JPEG throws away the faint data astrophotography lives on. RAW keeps every bit the sensor recorded — mandatory before any stacking or stretching.",
        tracks: ["photo", "club"],
        prereqs: ["exposure-triangle"],
        misconceptions: ["Thinking RAW is just a bigger, better JPEG — it is unrendered sensor data, and the JPEG has already thrown away the faint tones a stretch depends on", "Believing a RAW file is unprocessed truth — it is a linear record still needing demosaicing, white balance and a stretch before it means anything to the eye", "Assuming 12-bit versus 14-bit hardly matters when the screen is 8-bit — the extra levels live in the shadows, and stacking and stretching is exactly where they get spent"],
        aliases: ["RAW files", "shooting in RAW", "RAW vs JPEG", "bit depth of raw files"],
        keywords: ["CR2", "NEF", "ARW", "DNG", "12 bit", "14 bit", "FITS", "lossless data", "jpeg discards data", "linear data"],
        tools: [{ k: "activity", label: "Stretch a RAW and a JPEG of the same frame; watch the JPEG fall apart" }]
    },
    {
        id: "night-focusing", name: "Focusing in the Dark", domain: "astro", level: 3,
        desc: "Autofocus is useless on stars. Live-view at 10× on a bright star, or a Bahtinov mask's diffraction spikes, gets focus exact — the single most common beginner failure.",
        tracks: ["photo", "club"],
        prereqs: ["exposure-triangle"],
        misconceptions: ["Thinking autofocus will lock onto a star — there is nothing for it to hunt on, so it racks back and forth and gives up; 10x live view on a bright star is the actual method", "Believing the infinity mark on the lens barrel is infinity — modern lenses focus past it by design, and the true point shifts as the barrel cools through the night", "Assuming focus set at dusk holds until dawn — a ten-degree temperature drop moves the focal point enough to bloat every star, so it needs rechecking through the session"],
        aliases: ["focusing in the dark", "bahtinov mask", "live view focusing on a star", "getting sharp focus on stars"],
        keywords: ["diffraction spikes", "10x live view", "manual focus", "infinity mark unreliable", "HFR", "FWHM", "autofocus fails on stars", "focus drift with temperature", "electronic autofocuser"],
        tools: [{ k: "activity", label: "Cut a cardboard Bahtinov mask; nail focus on Sirius" }]
    },
    {
        id: "sky-timelapse", name: "Sky Timelapse", domain: "astro", level: 3,
        desc: "Hundreds of frames, seconds apart, compressed into video: the sky wheels, the Milky Way rises, satellites streak. Diurnal motion becomes something you can show, not tell.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["nightscapes"],
        misconceptions: ["Thinking a timelapse is video shot slowly — it is hundreds of separate stills; the camera never records motion, the sequence assembled afterwards does", "Underestimating how many frames a few seconds needs — ten seconds at 24 fps is 240 exposures, which at a 30-second interval means two hours of standing in the dark", "Assuming exposure can be left on auto — the camera re-meters every frame and the result flickers; fixed manual settings, or deliberate ramping, is what makes it smooth"],
        aliases: ["night sky timelapse", "astro timelapse", "time lapse of the wheeling sky", "holy grail timelapse"],
        keywords: ["LRTimelapse", "24 fps", "300 frames", "exposure ramping", "deflicker", "motion control slider", "shooting interval", "frames to seconds of video"],
        tools: [{ k: "activity", label: "Shoot a 300-frame moonrise timelapse with an intervalometer" }]
    },
    {
        id: "eclipse-imaging", name: "Eclipse & Event Imaging", domain: "astro", level: 4,
        desc: "Eclipses demand planning: solar filters until totality, bracketed exposures for the corona, and a rehearsed timeline — the event won't wait while you fix settings.",
        tracks: ["photo", "club"],
        prereqs: ["solar-eclipse", "solar-observing", "exposure-triangle"],
        aliases: ["eclipse photography", "solar eclipse imaging", "imaging totality", "photographing the corona", "transit imaging"],
        keywords: ["diamond ring", "baily's beads", "bracketed exposures", "HDR corona", "filter off at totality", "C2 and C3 contacts", "rehearsed timeline", "partial phases", "chromosphere flash"],
        tools: [{ k: "activity", label: "Write and rehearse a minute-by-minute eclipse shooting script" }]
    },
    {
        id: "barlow-reducer", name: "Barlows & Focal Reducers", domain: "astro", level: 4,
        desc: "A Barlow multiplies focal length for planetary close-ups; a reducer shrinks it for wider, faster deep-sky fields. Both re-tune your image scale without changing telescopes.",
        tracks: ["photo"],
        prereqs: ["image-scale"],
        aliases: ["barlow lens", "focal reducer", "focal extender", "reducer flattener"],
        keywords: ["2x barlow", "3x", "0.63x", "0.8x reducer", "effective focal length", "back focus distance", "telecentric powermate", "55mm spacing", "amplification factor"],
        tools: [{ k: "activity", label: "Measure your true image scale with and without a 2× Barlow" }]
    },
    {
        id: "mono-osc", name: "Mono vs One-Shot Colour", domain: "astro", level: 5,
        desc: "Colour cameras capture everything at once; mono cameras shoot through filters one channel at a time — slower, but sharper and unbeatable for narrowband. The great imaging fork.",
        tracks: ["photo"],
        prereqs: ["camera-sensors"],
        aliases: ["mono versus colour camera", "one shot colour camera", "OSC camera", "monochrome imaging with filters"],
        keywords: ["bayer matrix", "debayer", "LRGB", "filter wheel", "mono sensor", "luminance channel", "three times the time", "IMX533", "colour cross talk", "EFW"],
        tools: [{ k: "activity", label: "Compare a mono+filters and OSC image of the same target" }]
    },
    {
        id: "dithering", name: "Dithering", domain: "astro", level: 5,
        desc: "Nudging the mount a few pixels between exposures so hot pixels and pattern noise land in different places and average away in the stack. Small habit, dramatic cleanup.",
        tracks: ["photo"],
        prereqs: ["autoguiding", "calibration-frames"],
        aliases: ["dithering between exposures", "dither the mount", "random offsets between subs"],
        keywords: ["hot pixels", "walking noise", "fixed pattern noise", "3 pixel dither", "settle time", "PHD2 dither", "rejection in the stack", "noise averages away"],
        tools: [{ k: "app", label: "Enable dither-between-frames in PHD2/NINA; compare stacks" }]
    },
    {
        id: "live-stacking", name: "EAA & Smart Telescopes", domain: "astro", level: 3,
        desc: "Electronically-assisted astronomy stacks exposures live on screen — faint galaxies bloom in minutes at a public outreach table. Smart telescopes automate the whole chain.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["telescope-operation", "exposure-triangle"],
        aliases: ["electronically assisted astronomy", "EAA", "smart telescope", "live stacking on screen", "video astronomy"],
        keywords: ["SharpCap live stack", "Seestar S50", "Dwarf II", "eVscope", "Unistellar", "outreach table", "ASIAIR", "10 second subs", "near real time image"],
        tools: [{ k: "app", label: "Live-stack the Orion Nebula for a school audience" }]
    },

    // ---------------- Indian astronomy: history, texts, ideas ----------------
    {
        id: "navagraha", name: "The Navagrahas", domain: "indic", level: 2,
        desc: "The nine 'grahas': Sun, Moon, five visible planets, plus Rahu and Ketu — not nine planets, but the nine movers of the sky as ancient India catalogued them.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: ["planets-wanderers"],
        aliases: ["navagraha", "navagrahas", "nine grahas", "the nine movers of the sky"],
        keywords: ["surya", "chandra", "mangala", "budha", "guru", "shukra", "shani", "rahu", "ketu", "नवग्रह"],
        tools: [{ k: "activity", label: "Match each graha to what it really is; spot all seven visible ones in a year" }, { k: "kaal", label: "Ephemeris — daily sidereal longitude of the nine grahas", url: "https://kaalshodh.com/ephemeris.html" }]
    },
    {
        id: "vedanga-jyotisha", name: "Vedanga Jyotisha", domain: "indic", level: 4,
        desc: "India's oldest astronomy text (~1200 BCE): a five-year lunisolar cycle for fixing ritual dates by nakshatra and tithi arithmetic — calendar science before telescopes by two millennia.",
        tracks: ["club", "indic"],
        prereqs: ["nakshatra", "calendar-systems"],
        aliases: ["vedanga jyotisha", "vedanga jyotisa", "jyotisha vedanga", "vedanga jyotisham"],
        keywords: ["lagadha", "five year yuga", "1200 BCE", "ritual calendar", "rigveda recension", "yajurveda recension", "adhimasa", "oldest indian astronomy text", "tithi arithmetic"],
        tools: [{ k: "activity", label: "Run one 5-year yuga of the Vedanga Jyotisha scheme on paper" }, { k: "kaal", label: "Vedang Jyotish Yuga — the 5-year 60-solar / 62-lunar cycle", url: "https://kaalshodh.com/vedang-jyotish.html" }]
    },
    {
        id: "yugas-deep-time", name: "Yugas & Deep Time", domain: "indic", level: 3,
        desc: "Indian cosmology counts in mahayugas of 4.32 million years and kalpas of 4.32 billion — Aryabhata specified planetary revolutions per kalpa. A culture comfortable with astronomical time.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["aryabhata-work", "calendar-systems"],
        aliases: ["yuga", "mahayuga", "chaturyuga", "kalpa", "yugas and deep time"],
        keywords: ["4.32 million years", "4.32 billion years", "kaliyuga", "satya yuga", "treta yuga", "dvapara yuga", "manvantara", "3102 BCE epoch", "revolutions per kalpa"],
        tools: [{ k: "activity", label: "Compare a kalpa with the scientific age of Earth and Sun" }, { k: "web", label: "Hindu Cosmological Time Scale — yugas to kalpas,  visualized", url: "https://alokm.com/khagol/hindutime.html" }, { k: "kaal", label: "Ahargana — civil-day count from Kaliyuga, three siddhantas", url: "https://kaalshodh.com/ahargana.html" }]
    },
    {
        id: "kerala-school", name: "The Kerala School", domain: "indic", level: 4,
        desc: "Madhava of Sangamagrama (c. 1400) found infinite series for π and sine two centuries before Europe; Nilakantha refined planetary models. India's forgotten mathematical revolution.",
        tracks: ["club", "indic"],
        prereqs: ["siddhantic-astronomy"],
        aliases: ["kerala school of mathematics", "kerala school of astronomy", "madhava of sangamagrama", "nilakantha somayaji"],
        keywords: ["tantrasangraha", "yuktibhasa", "madhava series", "infinite series for pi", "jyeshtadeva", "parameshvara", "leibniz series", "sine series", "c. 1400", "aryabhatiya bhashya"],
        tools: [{ k: "activity", label: "Sum Madhava's π series and watch it converge" }]
    },
    {
        id: "puranic-siddhantic", name: "Two Indian Cosmologies", domain: "indic", level: 3,
        desc: "Puranic texts describe a flat disc around Mount Meru; the Siddhantas compute for a spherical Earth in space. Indian astronomers like Aryabhata openly argued for the sphere — a homegrown lesson in evidence over authority.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["earth-sphere", "aryabhata-work"],
        aliases: ["puranic cosmology", "mount meru cosmology", "jambudvipa", "two indian cosmologies", "flat disc versus spherical earth"],
        keywords: ["meru", "bhugola", "spherical earth", "the puranas", "siddhanta versus purana", "aryabhata argued for the sphere", "cosmography", "evidence over authority"],
        tools: [{ k: "activity", label: "Debate both models against the classical evidences for a round Earth" }, { k: "web", label: "Golapada — Aryabhata on the rotating spherical Earth", url: "https://alokm.com/khagol/aryabhat/golapada.html" }, { k: "kaal", label: "Siddhantic Comparison — classical models against modern ephemeris", url: "https://kaalshodh.com/siddhantic.html" }]
    },
    {
        id: "astronomy-vs-astrology", name: "Astronomy vs Astrology", domain: "indic", level: 3,
        desc: "Same sky, different claims: astronomy predicts where planets are; astrology claims what they mean. One invites testing, the other resists it — a respectful, evidence-first discussion every Indian classroom deserves.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["navagraha", "rashi", "model-thinking"],
        aliases: ["astronomy versus astrology", "difference between astronomy and astrology", "jyotisha and astronomy", "is astrology a science"],
        keywords: ["horoscope", "kundli", "birth chart", "falsifiable prediction", "scientific method", "barnum effect", "double blind test", "testable claims", "shawn carlson"],
        tools: [{ k: "activity", label: "Design a fair test for an astrological claim; discuss what results would mean" }]
    },

    // ############################################################
    // FOUNDATIONS — basic science & geography scaffolding.
    // The very first rungs: school science and geography concepts
    // astronomy quietly assumes. Kept explicit so curriculum
    // designers can see where base-level content is needed.
    // ############################################################

    {
        id: "light-shadow", name: "Light & Shadow", domain: "found", level: 1,
        desc: "Light travels in straight lines, so an object blocks it and casts a shadow shaped like itself. Shadow direction and length depend on where the light is — the key to sundials and eclipses.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: [],
        misconceptions: ["Thinking a shadow is something the object gives off or is made of, rather than simply the region the object stops light from reaching", "Thinking the shadow sits under the object, or is always the same size as it — direction and length are set entirely by where the light source is", "Believing a shadow carries the object's colour or detail — because light goes in straight lines, all it can record is an outline"],
        grades: [4, 6],
        aliases: ["light and shadow", "formation of shadows", "rectilinear propagation of light", "light travels in a straight line"],
        keywords: ["opaque", "transparent", "translucent", "pinhole camera", "shadow length", "sundial", "light source", "screen", "umbra"],
        tools: [{ k: "activity", label: "Torch + toys: predict each shadow's shape and direction before switching on" }]
    },
    {
        id: "eyes-vision", name: "How We See", domain: "found", level: 1,
        desc: "We see things only when light from them enters our eyes — the eye receives light, it doesn't send anything out. No light, no seeing; more light gathered, fainter things seen.",
        tracks: ["school-primary", "school-middle"],
        prereqs: ["light-shadow"],
        grades: [6, 8],
        aliases: ["how we see objects", "light entering the eye", "we see only when light enters our eyes", "vision and the eye"],
        keywords: ["retina", "pupil", "cornea", "reflected light", "luminous", "non-luminous", "dark room", "blind spot", "no light no seeing"],
        tools: [{ k: "activity", label: "Blackout-box experiment: can you see the object with zero light?" }]
    },
    {
        id: "rainbow-colors", name: "Rainbows & Colours", domain: "found", level: 1,
        desc: "White sunlight is a mixture of all colours — raindrops or a prism fan it out into a rainbow. Colour is a property of the light itself, not paint added to it.",
        tracks: ["school-primary", "school-middle"],
        prereqs: ["light-shadow"],
        grades: [7, 10],
        aliases: ["rainbow", "dispersion of light", "colours of the rainbow", "white light is a mixture of colours", "sunlight white or coloured"],
        keywords: ["VIBGYOR", "prism", "Newton's disc", "raindrops", "spectrum", "violet", "seven colours", "refraction", "splitting of light"],
        tools: [{ k: "activity", label: "Make a rainbow with a water tray, mirror and sunlight" }, { k: "android", label: "Rainbow Roulette — a tour through all the colours", url: "https://play.google.com/store/apps/details?id=com.alokm.rainbowroulette" }]
    },
    {
        id: "gravity-basics", name: "Gravity: Things Fall", domain: "found", level: 1,
        desc: "Everything is pulled toward the Earth — that pull is gravity, and 'down' means toward Earth's centre. People in Australia aren't upside-down; their 'down' points to the same centre.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        grades: [3, 5],
        aliases: ["why things fall", "things fall down", "earth's pull", "pull towards the earth"],
        keywords: ["falling objects", "earth's centre", "upside down", "Australia", "drops to the ground", "downward", "weight", "dropped ball"],
        tools: [{ k: "activity", label: "Globe + toy figures: stick them all around, draw each one's 'down' arrow" }]
    },
    {
        id: "spin-axis", name: "Spin & Axis", domain: "found", level: 1,
        desc: "A spinning top turns around an invisible line — its axis — and the axis itself stays steady while everything else whirls. Earth is a giant top; its axis points at the pole star.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        misconceptions: ["Thinking the axis is a real rod running through the Earth, like the wire through a classroom globe — it is an imaginary line, and there is nothing there", "Believing the axis wobbles with the seasons, leaning toward the Sun in summer and away in winter — it keeps pointing the same way all year, at the pole star", "Thinking a spinning body needs something to hold its axis steady — the spin itself is what keeps the axis pointing where it points"],
        grades: [5, 6],
        aliases: ["spin and axis", "axis of rotation", "spinning top", "earth's axis"],
        keywords: ["lattu", "wobble", "steady axis", "pole star", "tilted axis", "23.5 degrees", "imaginary line", "whirling"],
        tools: [{ k: "activity", label: "Spin tops and a bicycle wheel: find each one's axis; watch a tilted top wobble" }, { k: "web", label: "Planet Days — every planet spins,  each at its own pace", url: "https://alokm.com/astro/planetdays.html" }]
    },
    {
        id: "temperature-heat", name: "Hot & Cold: Temperature", domain: "found", level: 1,
        desc: "Temperature measures how hot something is, on scales like Celsius. Hotter things glow — first dull red, then orange, then white — which is exactly how astronomers read a star's heat from its colour.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        grades: [4, 7],
        aliases: ["hot and cold", "measuring temperature", "temperature and heat", "thermometer and temperature"],
        keywords: ["Celsius", "thermometer", "Kelvin", "clinical thermometer", "37 degrees", "red hot", "white hot", "boiling point", "degree"],
        tools: [{ k: "activity", label: "Watch a heating filament / incense coal change colour as it heats and cools" }]
    },
    {
        id: "speed-distance-time", name: "Speed, Distance & Time", domain: "found", level: 2,
        desc: "Speed = distance ÷ time: know two, find the third. Thunder after lightning gives the storm's distance — the same trick, scaled up, turns light's travel time into cosmic distances.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        grades: [7, 9],
        aliases: ["speed distance and time", "speed equals distance divided by time", "calculating speed", "motion and time"],
        keywords: ["km/h", "m/s", "average speed", "thunder and lightning", "distance time graph", "odometer", "light minutes", "uniform speed"],
        tools: [{ k: "activity", label: "Count seconds between lightning and thunder; compute the storm's distance" }]
    },
    {
        id: "angles-protractor", name: "Angles & the Protractor", domain: "found", level: 1,
        desc: "Angles measure turn and separation in degrees — 90° for a corner, 360° for a full circle. Astronomy is applied angle-measuring: heights above the horizon, gaps between stars.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        grades: [5, 6],
        aliases: ["measuring angles", "angles and the protractor", "using a protractor", "measurement of angles"],
        keywords: ["protractor", "right angle", "90 degrees", "360 degrees", "acute angle", "obtuse angle", "vertex", "arc", "angular separation"],
        tools: [{ k: "activity", label: "Protractor scavenger hunt: measure angles all over the classroom" }]
    },
    {
        id: "big-numbers", name: "Big Numbers & Powers of Ten", domain: "found", level: 2,
        desc: "A lakh, a crore, a billion, 10⁸ — big numbers need both names and notation. Astronomy runs on powers of ten; without them, its distances are just meaningless words.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        grades: [6, 8],
        aliases: ["powers of ten", "large numbers", "exponents and powers", "scientific notation"],
        keywords: ["lakh", "crore", "billion", "exponent", "order of magnitude", "place value", "10 to the power", "trillion", "knowing our numbers"],
        tools: [{ k: "activity", label: "Powers-of-ten zoom: classroom → city → Earth → Sun in ×10 jumps" }]
    },
    {
        id: "maps-scale", name: "Maps & Scale Models", domain: "found", level: 1,
        desc: "A map shrinks the real world by a fixed scale — 1 cm standing for 1 km — keeping shapes and directions honest. Star charts, globes and solar-system walks are all the same idea.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        misconceptions: ["Thinking the solar-system pictures in textbooks are to scale — no page can hold planet sizes and planet spacings at the same scale, so every one of them quietly cheats on one or the other", "Believing a large-scale map shows a larger area — 1 cm = 100 m covers far less ground than 1 cm = 10 km, in far more detail", "Treating the scale bar as decoration rather than a fixed ratio applied to every distance on the sheet, so shapes and directions stay honest"],
        grades: [4, 6],
        aliases: ["scale of a map", "maps and scale", "scale drawing", "scale model"],
        keywords: ["1 cm = 1 km", "cartography", "legend", "map key", "representative fraction", "sketch and plan", "atlas", "star chart", "shrinking the world"],
        tools: [{ k: "activity", label: "Draw the classroom to scale; then the school grounds" }]
    },
    {
        id: "model-thinking", name: "Models in Science", domain: "found", level: 2,
        desc: "A globe, a map, a diagram of the Sun — none are the real thing; all are models that answer some questions well and others not at all. Science improves by testing models against observation.",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: [],
        misconceptions: ["Thinking a model that leaves something out is broken — leaving things out is what a model IS; the only question is whether it still answers the question you asked it", "Hearing 'it is only a model' as 'it is only a guess' — models are tested against observation and thrown out when they fail", "Treating models as true or false, so a better one makes the old one a lie — a flat map, a globe and an orbit diagram each earn their keep on different questions"],
        aliases: ["models in science", "scientific model", "using models to explain"],
        keywords: ["globe", "hypothesis", "simplification", "prediction", "testing against observation", "analogy", "approximation", "not the real thing"],
        tools: [{ k: "activity", label: "For one model (globe/orrery), list: what it gets right, what it gets wrong" }]
    },
    {
        id: "earth-globe", name: "Reading the Globe", domain: "found", level: 1,
        desc: "The globe is Earth's honest model: a tilted ball with poles, continents and oceans. Finding India, the poles and the tilt on a globe comes before any talk of rotation or seasons.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        misconceptions: ["Thinking the globe is tilted on its stand for convenience, or so it spins nicely — the 23.4° lean is a real fact about Earth in space, and the whole of seasons hangs on it", "Believing north is 'up' in space — up on the globe is a mapmaking habit; a globe with Australia on top would be just as correct", "Thinking the equator, the poles and the grid are marked on the actual Earth — they are lines we drew on the model, not paint on the planet"],
        grades: [4, 6],
        aliases: ["the globe", "globe model of the earth", "reading the globe", "features of a globe"],
        keywords: ["continents and oceans", "north pole", "south pole", "equator", "hemisphere", "tilted ball", "India on the globe", "globe stand", "axis"],
        tools: [{ k: "activity", label: "Globe treasure hunt: find India, both poles, the equator, and the tilt" }]
    },
    {
        id: "latitude-longitude", name: "Latitude & Longitude", domain: "found", level: 2,
        desc: "An address grid for the whole planet: latitude counts degrees from the equator, longitude from Greenwich. Bhopal sits near 23°N, 77°E — and your latitude is written in your sky.",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: ["earth-globe"],
        misconceptions: ["Mixing the two up — latitude lines run east-west around the globe but measure how far north or south you are; longitude does exactly the opposite", "Thinking the meridians of longitude are parallel like the latitudes — they all converge and meet at the poles, so a degree of longitude shrinks to nothing there", "Believing Greenwich is a natural starting line the way the equator is — the equator is fixed by Earth's spin; the prime meridian was fixed by a committee"],
        grades: [6],
        aliases: ["latitude and longitude", "lines of latitude", "meridians of longitude", "parallels of latitude", "the global grid"],
        keywords: ["prime meridian", "Greenwich", "degrees north", "degrees east", "23 N 77 E", "IST", "82.5 E", "grid reference", "equator", "co-ordinates"],
        tools: [{ k: "activity", label: "Locate five cities from coordinates alone; read your town's off a map app" }]
    },
    {
        id: "compass-magnetism", name: "The Compass & Magnetic Earth", domain: "found", level: 2,
        desc: "Earth is a weak magnet, and a compass needle swings along it to point roughly north — roughly, because magnetic north and true north differ by a small, mapped angle.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: ["cardinal-directions"],
        grades: [6],
        aliases: ["magnetic compass", "earth's magnetism", "compass needle", "magnetic north"],
        keywords: ["declination", "bar magnet", "true north", "lodestone", "magnetite", "magnetic field", "geographic north", "fun with magnets", "needle points north"],
        tools: [{ k: "activity", label: "Magnetise a needle, float it on water; compare with the shadow-stick north" }]
    },
    {
        id: "weather-vs-sky", name: "Weather vs the Sky", domain: "found", level: 1,
        desc: "Clouds, rain and haze live a few kilometres up; the Moon, planets and stars lie far beyond. Weather hides the sky but never touches it — astronomy begins where weather ends.",
        tracks: ["school-primary", "school-middle"],
        prereqs: ["sky-dome"],
        keywords: ["cloud cover", "troposphere", "haze", "overcast sky", "monsoon", "clear night", "seeing conditions", "a few kilometres up"],
        tools: [{ k: "activity", label: "Height ladder: kite, cloud, plane, ISS, Moon — order them by distance" }]
    },
    {
        id: "air-atmosphere", name: "The Ocean of Air", domain: "found", level: 2,
        desc: "We live at the bottom of a thin skin of air that thins with height and fades into space around 100 km up. It burns meteors, blurs stars, bends light — and keeps us alive.",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: ["weather-vs-sky"],
        grades: [6, 7],
        aliases: ["the atmosphere", "layers of the atmosphere", "air around us", "composition of air", "ocean of air"],
        keywords: ["troposphere", "stratosphere", "mesosphere", "ionosphere", "100 km", "Karman line", "nitrogen", "oxygen", "air pressure", "twinkling"],
        tools: [{ k: "activity", label: "Scale drawing: on a 30 cm Earth, how thick is the atmosphere? (a pencil line)" }]
    },
    {
        id: "waves-basics", name: "Waves", domain: "found", level: 2,
        desc: "Ripples on water and sound in air both carry energy as waves, with a wavelength and a pitch. Light is a wave too — its 'pitch' is colour, and motion can stretch or squeeze it.",
        tracks: ["school-middle", "school-high"],
        prereqs: [],
        grades: [8, 11],
        aliases: ["wave motion", "wavelength and frequency", "properties of waves", "sound waves"],
        keywords: ["wavelength", "frequency", "amplitude", "crest", "trough", "hertz", "pitch", "ripple", "oscillation", "energy without matter"],
        tools: [{ k: "activity", label: "Rope and slinky waves: change frequency, see wavelength answer" }, { k: "android", label: "Sound Generator — waveforms of different frequencies", url: "https://play.google.com/store/apps/details?id=com.alokm.soundgenerator" }]
    },
    {
        id: "sun-energy", name: "The Sun Powers Earth", domain: "found", level: 1,
        desc: "Sunlight drives nearly everything here: plants, winds, rain, and the warmth of the day. Grasping the Sun as Earth's engine is the first reason to care where it is in the sky.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        grades: [4, 7],
        aliases: ["the sun as a source of energy", "energy from the sun", "sun is the source of energy on earth", "solar energy"],
        keywords: ["photosynthesis", "water cycle", "winds", "evaporation", "warmth of the day", "solar constant", "food chain", "renewable"],
        tools: [{ k: "activity", label: "Trace your lunch's energy back to the Sun, step by step" }]
    },
    {
        id: "tropics-circles", name: "Tropics & Polar Circles", domain: "found", level: 2,
        desc: "The Tropic of Cancer — which crosses India through MP and Gujarat — marks where the noon Sun can stand exactly overhead. These lines are the axial tilt drawn onto the map.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["seasons", "latitude-longitude"],
        misconceptions: ["Thinking the tropics are just 'the hot places' — the Tropic of Cancer is a precise line at 23.4°N marking the furthest north the noon Sun can ever stand overhead", "Believing the Sun is overhead every day inside the tropics — right on the Tropic of Cancer it happens on exactly one day a year, the June solstice", "Thinking geographers chose these lines — they are the axial tilt printed onto the map, and they creep as the tilt slowly changes"],
        grades: [6],
        aliases: ["tropic of cancer", "tropic of capricorn", "arctic circle", "tropics and polar circles", "antarctic circle"],
        keywords: ["23.5 N", "23.5 S", "66.5 degrees", "overhead sun", "axial tilt", "Madhya Pradesh", "Gujarat", "important parallels", "Ujjain"],
        tools: [{ k: "activity", label: "Trace the Tropic of Cancer across an India map — which towns does it touch?" }, { k: "web", label: "Variation in Tropic of Cancer — its drift over millennia", url: "https://alokm.com/tropicofcancer.html" }]
    },
    {
        id: "zero-shadow-day", name: "Zero Shadow Day", domain: "found", level: 2,
        desc: "Twice a year, everywhere between the tropics, the noon Sun stands exactly overhead and shadows vanish for a moment. India's favourite mass astronomy experiment — date depends on your latitude.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["tropics-circles", "shadow-clock"],
        aliases: ["zero shadow day", "no shadow day", "sun directly overhead at noon", "zenith passage of the sun"],
        keywords: ["zenith", "subsolar point", "noon shadow vanishes", "solar declination", "Bengaluru", "gnomon", "twice a year", "between the tropics", "latitude dependent"],
        tools: [{ k: "activity", label: "Find your town's zero-shadow dates; photograph a bottle at true noon" }, { k: "gol", label: "Overhead-Sun geometry vs latitude animation" , url: "https://gol.kaalshodh.com/app#shanku"}, { k: "android", label: "Zero Shadow Day — ZSD dates,  local noon,  interactive 3D Sun motion", url: "https://play.google.com/store/apps/details?id=com.alokm.zsd" }, { k: "web", label: "Zero Shadow Day map — find ZSD dates & times anywhere", url: "https://alokm.com/zsd.html" }, { k: "web", label: "Zero Shadow Moment — spiral of the sub-solar point over Earth", url: "https://alokm.com/astro/zsm.html" }]
    },
    {
        id: "climate-zones", name: "Climate Zones & Sun Angle", domain: "found", level: 2,
        desc: "Torrid, temperate and frigid zones follow from one fact: how steeply sunlight lands. Geography's climate map is astronomy's Sun-angle diagram wearing different clothes.",
        tracks: ["school-primary", "school-middle"],
        prereqs: ["tropics-circles"],
        misconceptions: ["Thinking the tropics are hot because they are nearer the Sun — Earth's bulge is a few thousand km against 150 million; it is the steepness of the rays that does it", "Believing the zone boundaries were drawn from weather records — they are astronomy: 23.4° where the Sun can reach the zenith, 66.6° where it can stay up all day", "Thinking every place in the torrid zone must be hot — altitude, oceans and winds rewrite the Sun angle locally, which is why Shimla and Quito are not"],
        grades: [6],
        aliases: ["heat zones of the earth", "torrid temperate and frigid zones", "climate zones", "temperature zones of the earth"],
        keywords: ["torrid zone", "temperate zone", "frigid zone", "slanting rays", "vertical rays", "sun angle", "insolation", "poles receive less heat"],
        tools: [{ k: "activity", label: "Torch on a globe: compare the light patch at equator, India, and poles" }, { k: "web", label: "Sun Rays Orientation — sun angle by latitude through the year", url: "https://alokm.com/astro/year_v2.html" }]
    },
    {
        id: "supermassive-black-holes", name: "Supermassive Black Holes", domain: "stars", level: 4,
        desc: "Millions to billions of solar masses packed into a galaxy's heart — one is thought to sit at the centre of every galaxy. Ours, Sagittarius A*, was pinpointed because globular clusters crowd toward Sagittarius.",
        tracks: ["club", "olympiad"],
        prereqs: ["black-holes", "milky-way-structure"],
        related: ["nebulae-clusters"],
        aliases: ["supermassive black hole", "sagittarius a star", "central black hole of a galaxy", "galactic nucleus"],
        keywords: ["Sagittarius A*", "2 billion solar masses", "M87", "Virgo A", "galactic centre", "globular cluster concentration", "seed black hole", "millions or billions of solar masses"],
        misconceptions: ["Taking it as settled that galaxies formed around a black hole seeded at the Big Bang — the sources that suggest it call it a pure guess so far", "Thinking the central black hole is steadily swallowing its whole galaxy — the Sun orbits it as safely as it orbits anything"],
        tools: [{ k: "activity", label: "Plot catalogued globular clusters on a sky map: their centre lands in Sagittarius" }],
        status: "draft",
        sources: ["Study_Material_2.pdf", "Study_Material_3.pdf", "Glossary.pdf"]
    },
    {
        id: "quasars-agn", name: "Quasars & Active Galactic Nuclei", domain: "stars", level: 5,
        desc: "The highly energetic core of a young galaxy, bright enough to be seen clear across the universe. The light comes from the accretion disk spiralling in — not from the black hole itself.",
        tracks: ["club", "olympiad"],
        prereqs: ["supermassive-black-holes", "galaxies"],
        related: ["radio-astronomy"],
        aliases: ["quasar", "active galactic nucleus", "agn", "quasi-stellar object", "blazar"],
        keywords: ["accretion disk", "relativistic jet", "blazar", "Seyfert galaxy", "radio galaxy", "type II quasar", "jets luminous for years", "near the speed of light", "quasi-stellar object"],
        misconceptions: ["Thinking the black hole itself emits a quasar's light — nothing escapes it; the glow is from the accretion disk outside", "Assuming every galaxy with a central black hole is a quasar — an AGN needs something to feed on"],
        tools: [{ k: "activity", label: "Rank a quasar, a Seyfert and a radio galaxy by distance and violence — what makes a blazar different?" }],
        status: "draft",
        sources: ["Study_Material_2.pdf", "Glossary.pdf"]
    },
    {
        id: "galaxy-interactions", name: "Colliding Galaxies", domain: "stars", level: 4,
        desc: "The Sagittarius Dwarf is ploughing into the Milky Way right now. The smaller galaxy loses stars to the larger; too close and it is swallowed, a grazing pass leaves it tattered and irregular — likely the story of the Magellanic Clouds.",
        tracks: ["club", "olympiad"],
        prereqs: ["galaxies"],
        related: ["star-formation"],
        aliases: ["interacting galaxies", "galactic merger", "galaxy collision", "starburst galaxy"],
        keywords: ["Sagittarius Dwarf", "Magellanic Clouds", "starburst", "tattered irregular galaxy", "spiral becomes elliptical", "repeated mergers", "gas compression", "stars essentially never hit"],
        misconceptions: ["Picturing stars smashing into one another when galaxies collide — galaxies are so empty that individual stars essentially never hit", "Thinking a collision destroys both galaxies, rather than the larger one absorbing the smaller"],
        tools: [{ k: "activity", label: "Scale it: if stars were grains of sand kilometres apart, how likely is a hit?" }],
        status: "draft",
        sources: ["Study_Material_2.pdf", "Study_Material_3.pdf", "Glossary.pdf"]
    },
    {
        id: "galaxy-clusters", name: "Clusters, Superclusters & Voids", domain: "stars", level: 4,
        desc: "Galaxies gather. Our Local Group of about 35 — Milky Way and Andromeda dominant — sits in the Local Supercluster, 100 million light-years across and ruled by the Virgo Cluster's ~2,500 galaxies. Between superclusters lie the voids.",
        tracks: ["club", "olympiad"],
        prereqs: ["galaxies"],
        related: ["dark-matter-energy"],
        aliases: ["local group", "local supercluster", "virgo cluster", "supercluster", "cosmic voids"],
        keywords: ["35 galaxies", "2, 500 galaxies", "100 million light-years", "Realm of the Galaxies", "Coma Berenices", "Leo", "voids", "large-scale structure", "north galactic pole"],
        misconceptions: ["Thinking galaxies are sprinkled evenly through space — they clump into clusters and superclusters with near-empty voids between"],
        tools: [{ k: "activity", label: "Sweep the Realm of the Galaxies across Virgo, Coma Berenices and Leo — more galaxies there than naked-eye stars" }],
        status: "draft",
        sources: ["Study_Material_2.pdf", "Glossary.pdf"]
    },
    {
        id: "big-bang-nucleosynthesis", name: "The First Elements", domain: "stars", level: 5,
        desc: "For thousands of years the young universe was too hot for matter to condense out of energy — all of it fierce gamma radiation. As it cooled, that radiation formed neutrons, protons and electrons: about 91% hydrogen, 8% helium, under 1% lithium, with traces of deuterium and helium-3 — and essentially nothing heavier.",
        tracks: ["club", "olympiad"],
        prereqs: ["bigbang-cosmology", "atomic-nucleus"],
        related: ["nucleosynthesis", "stellar-populations"],
        aliases: ["primordial nucleosynthesis", "big bang nucleosynthesis", "primordial abundances", "the first elements"],
        keywords: ["91 percent hydrogen", "8 percent helium", "lithium", "deuterium", "helium-3", "gamma radiation", "13.8 billion years", "matter condensing from energy", "primordial black holes"],
        misconceptions: ["Thinking the Big Bang made all the elements — it made hydrogen, helium and a trace of lithium; every heavier element had to wait for stars", "Thinking hydrogen and helium were forged from something simpler already lying about, rather than condensing out of raw radiation"],
        tools: [{ k: "activity", label: "Pie-chart the primordial universe, then the Earth: where did every other element come from?" }],
        status: "draft",
        sources: ["Study_Material_3.pdf", "Glossary.pdf"]
    },
    {
        id: "cosmic-inflation", name: "Cosmic Inflation", domain: "stars", level: 5,
        desc: "A brief, extraordinarily rapid expansion a fraction of a second after the Big Bang. It explains why the universe looks so uniform and so flat in every direction — and its imprint is hunted in the polarisation of the microwave background.",
        tracks: ["club", "olympiad"],
        prereqs: ["bigbang-cosmology", "cosmic-microwave-background"],
        related: ["interferometry"],
        aliases: ["inflation", "inflationary epoch", "inflationary universe"],
        keywords: ["fraction of a second", "horizon problem", "flatness problem", "CMB polarization", "DASI", "degree angular scale interferometer", "South Pole", "uniform in every direction"],
        misconceptions: ["Thinking the Big Bang was an explosion at a point in pre-existing space — space itself expanded, everywhere at once", "Thinking inflation means galaxies flew apart faster than light through space, rather than space itself stretching"],
        tools: [{ k: "activity", label: "Why is the CMB the same temperature on opposite horizons? Argue it out, then let inflation answer" }],
        status: "draft",
        sources: ["Glossary.pdf"]
    },

    // ---------------- Beating the atmosphere: modern telescope technique ----------------
    {
        id: "adaptive-optics", name: "Adaptive & Active Optics", domain: "scope", level: 5,
        desc: "Adaptive optics reads the atmosphere off a guide star and reshapes a small deformable mirror hundreds of times a second to undo the blurring; active optics slowly nudges a huge primary back into figure as gravity and heat bend it. Together they are how ground-based giants beat the air and rival space telescopes.",
        tracks: ["club"],
        prereqs: ["seeing-transparency", "resolution-limit"],
        related: ["interferometry", "observatory-sites"],
        aliases: ["adaptive optics", "active optics", "deformable mirror", "laser guide star"],
        keywords: ["wavefront sensor", "guide star", "sodium laser", "actuators", "mirror figure", "gravity sag", "temperature distortion", "diffraction-limited from the ground", "Keck", "VLT", "segmented mirror"],
        misconceptions: ["Thinking adaptive and active optics are the same thing — adaptive optics fights the atmosphere in real time, active optics corrects the mirror's own sag as the telescope moves", "Thinking a bigger mirror by itself gives sharper images, when it is the atmosphere and not the aperture that limits ground-based resolution"],
        tools: [{ k: "activity", label: "Watch a star boil at high power, then look through a candle's heat plume: that is what AO undoes" }],
        status: "draft",
        sources: ["Glossary.pdf", "Study_Material_3.pdf"]
    },
    {
        id: "interferometry", name: "Interferometry", domain: "scope", level: 5,
        desc: "Combine the waves from two or more separated telescopes and you resolve detail as finely as a single dish as wide as the gap between them — that gap is the baseline. Radio pioneered the trick: the VLBA works this way, and India's GMRT near Pune is the home-grown example.",
        tracks: ["club"],
        prereqs: ["resolution-limit", "radio-astronomy"],
        related: ["adaptive-optics", "observatory-sites", "gravitational-waves"],
        aliases: ["interferometer", "very long baseline interferometry", "aperture synthesis", "vlbi"],
        keywords: ["baseline", "interference fringes", "correlator", "VLBA", "Mauna Kea", "GMRT", "resolving power", "milliarcsecond", "Event Horizon Telescope", "array of dishes"],
        misconceptions: ["Thinking an interferometer collects as much light as one giant telescope of the same width — it buys resolution only, never light-gathering power, which still comes from the individual dishes"],
        tools: [{ k: "activity", label: "Two slits and a lamp: watch fringes appear, then widen the gap and watch them narrow" }],
        status: "draft",
        sources: ["Glossary.pdf", "Study_Material_3.pdf"]
    },
    {
        id: "observatory-sites", name: "Choosing an Observatory Site", domain: "scope", level: 3,
        desc: "Great observatories go high, dry and dark: altitude cuts the airmass and the water vapour that swallows infrared and submillimetre light, the Atacama is the driest place on Earth, and remoteness buys black skies. Mauna Kea sits at 4,190 m, Chile's TAO at 5,640 m, and India's own Indian Astronomical Observatory at Hanle in Ladakh at 4,500 m.",
        tracks: ["club"],
        prereqs: ["seeing-transparency"],
        related: ["adaptive-optics", "light-pollution", "atmospheric-extinction"],
        aliases: ["observatory site selection", "site testing", "high altitude observatories", "why observatories are on mountains"],
        keywords: ["Mauna Kea 4190 m", "Atacama Desert", "TAO 5640 m", "Hanle Ladakh 4500 m", "Indian Astronomical Observatory", "water vapour", "submillimetre", "airmass", "dark skies", "Chacaltaya", "Yangbajing", "HAWC", "cosmic ray observatory"],
        misconceptions: ["Thinking observatories sit on mountains to be nearer the stars, rather than to get above most of the atmosphere's blur, haze and water vapour", "Thinking one site suits every observatory, when the best site depends on wavelength — submillimetre wants dry air, cosmic-ray and gamma-ray detectors want altitude for the air shower itself"],
        tools: [{ k: "activity", label: "Score your own town against high, dry and dark — then find India's nearest good site on a map" }],
        status: "draft",
        sources: ["Study_Material_3.pdf", "Glossary.pdf"]
    },

    // ---------------- Getting to orbit, and using it ----------------
    {
        id: "launch-vehicles", name: "Rockets & Launch Vehicles", domain: "solar", level: 3,
        desc: "A rocket throws mass backwards to be pushed forwards, and sheds stages as they empty so it never hauls dead tanks to orbit. India's ladder runs SLV-3 (Rohini, 1980, the first Indian orbital launch), ASLV, the PSLV workhorse, GSLV with its indigenous cryogenic upper stage, LVM3 which sent up Chandrayaan-3, and the small-satellite SSLV.",
        tracks: ["school-high", "club"],
        prereqs: ["space-missions-india", "newtons-third-law"],
        grades: [9],
        related: ["orbits-satellites", "satellite-navigation", "escape-velocity"],
        aliases: ["launch vehicles", "indian launch vehicles", "rocket staging", "pslv", "gslv", "lvm3"],
        keywords: ["SLV-3", "Rohini 1980", "ASLV", "PSLV-C37 104 satellites in one flight", "cryogenic upper stage", "LVM3", "GSLV-MkIII", "SSLV", "RLV-TD", "Sriharikota", "staging", "GSLV-D3", "GSLV-F06", "PSLV-C61 EOS-09", "PSLV-C62 Anvesha"],
        misconceptions: ["Thinking a rocket reaches orbit by flying high enough — orbit is about sideways speed, and the climb is mostly to get out of the thick air first", "Thinking a rocket pushes against the air to move, so it could not work in vacuum — it pushes against its own exhaust", "Thinking launches are routine and safe: GSLV-D3, GSLV-F06, PSLV-C61/EOS-09 in 2025 and PSLV-C62/Anvesha in 2026 all failed"],
        tools: [{ k: "activity", label: "Balloon on a string across the room, then a two-stage balloon: feel why staging wins" }],
        status: "draft",
        sources: ["Study_Material_3.pdf"]
    },
    {
        id: "satellite-navigation", name: "Satellite Navigation & NavIC", domain: "solar", level: 4,
        desc: "Each navigation satellite endlessly broadcasts the time by an atomic clock; your receiver hears several at once and finds the one spot on Earth where all those travel times agree — trilateration by clock, which is why the clocks must be extraordinary. India's NavIC (IRNSS-1A to 1I, now the NVS second generation) gives the region its own fix, independent of GPS.",
        tracks: ["school-high", "club"],
        prereqs: ["orbits-satellites"],
        related: ["launch-vehicles", "space-missions-india"],
        aliases: ["navic", "irnss", "satellite navigation", "gps", "global positioning system"],
        keywords: ["trilateration", "atomic clock", "signal travel time", "IRNSS-1A to 1I", "NVS-01", "NVS-02", "GSLV-F12", "GSLV-F15", "geosynchronous transfer orbit", "regional navigation", "position fix", "constellation"],
        misconceptions: ["Thinking the satellites track your phone and send it its position — they only broadcast time, and the receiver does all the working out, which is why it never has to transmit", "Thinking a receiver needs only one or two satellites, when a fix in three dimensions plus the clock error needs four"],
        tools: [{ k: "activity", label: "Trilaterate on paper: three circles drawn from three known towns, one crossing point" }],
        status: "draft",
        sources: ["Study_Material_3.pdf", "Glossary.pdf"]
    },

    // ---------------- The sky in stone: the global counterpart of the Indic strand ----------------
    {
        id: "archaeoastronomy", name: "Archaeoastronomy", domain: "indic", level: 3,
        desc: "Cultures the world over built the sky into stone: passages that catch the solstice sunrise, horizon markers that time the planting, stone circles set on the Sun's turning points. Archaeoastronomy reads those surviving alignments to recover how people of the past observed, recorded and used the sky.",
        tracks: ["club", "indic"],
        prereqs: ["constellations", "equinox-solstice"],
        related: ["jantar-mantar", "indian-instruments", "vedanga-jyotisha"],
        aliases: ["archaeoastronomy", "multicultural astronomy", "cultural astronomy", "ancient astronomical alignments", "astronomy of ancient cultures"],
        keywords: ["solstice sunrise alignment", "horizon calendar", "megalith", "stone circle", "sightline", "gnomon", "Stonehenge", "Newgrange", "Nabta Playa", "Chichen Itza", "naked-eye observation", "generations of records"],
        misconceptions: ["Thinking a precise ancient alignment proves lost advanced technology or outside help — patient naked-eye watching from one fixed spot over generations is enough, and is the more remarkable achievement", "Thinking every old wall that happens to face east was built as an observatory: an alignment is evidence only when the culture's own records and repeated sites back it up"],
        tools: [{ k: "activity", label: "Mark sunrise on your horizon from one fixed spot each week for a term — you have built a horizon calendar" }],
        status: "draft",
        sources: ["Glossary.pdf"]
    },

    // ---------------- How stars live and die: the quantitative layer under stellar-evolution ----------------
    {
        id: "mass-luminosity-relation", name: "Mass–Luminosity Relation", domain: "stars", level: 4,
        desc: "A main-sequence star's luminosity goes as the fourth power of its mass: three times the mass, eighty-one times the light — and eighty-one times the rate of burning fuel. One exponent explains why heavy stars are both dazzling and doomed.",
        tracks: ["club", "olympiad"],
        prereqs: ["hr-diagram"],
        related: ["luminosity-absmag", "binary-stars"],
        aliases: ["mass-luminosity relation", "mass luminosity law", "luminosity mass relation", "L proportional to M^4"],
        keywords: ["L ∝ M⁴", "fourth power of mass", "81 times as bright", "fuel consumption rate", "main sequence only", "solar masses", "Sirius 23 luminosities", "Vega 54 luminosities"],
        misconceptions: ["Assuming twice the mass means twice the brightness — the fourth power makes it sixteen times", "Applying L ∝ M⁴ to giants and supergiants, which have left the main sequence and broken the relation"],
        tools: [{ k: "activity", label: "Tabulate mass and luminosity for Sirius, Vega, Rigel and the Sun; plot log L against log M and read off the slope" }],
        status: "draft",
        sources: ["Study_Material_3.pdf"]
    },
    {
        id: "stellar-lifetimes", name: "Stellar Lifetimes", domain: "stars", level: 4,
        desc: "Time on the main sequence falls as the inverse cube of mass — fuel goes as M but burning goes as M⁴, leaving M⁻³. A 100-solar-mass star lasts about 10,000 years, the Sun 10 billion, a 0.08-solar-mass red dwarf 19.5 trillion.",
        tracks: ["club", "olympiad"],
        prereqs: ["mass-luminosity-relation"],
        related: ["stellar-evolution", "hr-diagram"],
        aliases: ["stellar lifetimes", "main sequence lifetime", "lifetime of a star", "how long a star lives"],
        keywords: ["t ∝ M⁻³", "inverse cube of mass", "M/M⁴", "10,000 years", "10 billion years", "19.5 trillion years", "100 solar masses", "0.08 solar masses", "red dwarf outlives the universe"],
        misconceptions: ["Assuming a more massive star lives longer because it starts with more fuel — it burns that fuel so much faster that it dies spectacularly sooner", "Thinking every star has roughly the Sun's lifespan"],
        tools: [{ k: "activity", label: "Compute M⁻³ lifetimes for 100, 15, 1 and 0.08 solar-mass stars; mark them against the 13.8-billion-year age of the Universe" }],
        status: "draft",
        sources: ["Study_Material_3.pdf"]
    },
    {
        id: "hydrostatic-equilibrium", name: "Hydrostatic Equilibrium", domain: "stars", level: 4,
        desc: "A star is a standoff: outward pressure from the heat of fusion exactly balancing the inward crush of its own gravity. Hold the balance and you are a main-sequence star; lose it and you pulsate, swell or fall in.",
        tracks: ["club", "olympiad"],
        prereqs: ["stellar-fusion", "pressure"],
        related: ["solar-structure", "double-variable-stars", "star-formation"],
        aliases: ["hydrostatic equilibrium", "hydrostatic balance", "pressure balance in a star", "gravity versus pressure balance"],
        keywords: ["radiation pressure", "gravitational compression", "main sequence balance", "T-Tauri stars", "Herbig-Haro", "Cepheid pulsation", "expand when hottest", "stellar wind", "bipolar jets"],
        misconceptions: ["Thinking a star is held up by the strength of its material, like a rock, rather than by the pressure of its own fusion", "Assuming a young protostar is already in balance — T-Tauri stars are still driving off ten times the material that will end up in the finished star"],
        tools: [{ k: "activity", label: "Squeeze a balloon: the harder you press, the harder it pushes back. Now let the air out — that is fusion stopping" }],
        status: "draft",
        sources: ["Study_Material_3.pdf"]
    },
    {
        id: "brown-dwarfs", name: "Brown Dwarfs", domain: "stars", level: 4,
        desc: "Between 0.01 and 0.08 solar masses sits an object that is neither star nor planet: glowing in the infrared mostly from its own gravitational contraction, never hot enough to sustain hydrogen fusion. Jupiter would need about fifteen times its mass to join the club.",
        tracks: ["club", "olympiad"],
        prereqs: ["stellar-fusion", "hydrostatic-equilibrium"],
        related: ["exoplanets"],
        aliases: ["brown dwarf", "brown dwarfs", "failed star", "substellar object"],
        keywords: ["0.01 to 0.08 solar masses", "infrared", "gravitational contraction", "deuterium", "lithium", "beryllium", "15 million degrees", "15 Jupiter masses", "fusion shuts itself down"],
        misconceptions: ["Calling a brown dwarf a star because it glows — most of its warmth is gravitational contraction, not sustained hydrogen fusion", "Assuming nothing at all fuses in one: deuterium, lithium and beryllium ignite millions of degrees cooler than hydrogen, but there are too few of them to keep it going"],
        tools: [{ k: "activity", label: "Count Jupiters: how many make a brown dwarf, and how many make a real star? (about 15 and about 80)" }],
        status: "draft",
        sources: ["Study_Material_3.pdf", "Glossary.pdf"]
    },
    {
        id: "novae", name: "Novae", domain: "stars", level: 4,
        desc: "A white dwarf or neutron star in a close orbit strips hydrogen off its main-sequence companion until enough piles up to detonate like a hydrogen bomb. The flare recurs — and the star survives it, which is exactly what a supernova does not.",
        tracks: ["club", "olympiad"],
        prereqs: ["binary-stars", "planetary-nebulae"],
        related: ["supernova-types"],
        aliases: ["nova", "novae", "classical nova", "recurrent nova", "cataclysmic variable"],
        keywords: ["accretion", "close binary", "hydrogen shell detonation", "burnt-out star", "recurring outburst", "star left intact", "brightens several hundredfold", "surface explosion"],
        misconceptions: ["Thinking a nova and a supernova are differing degrees of the same explosion — a nova is a recurring surface flash that leaves its star intact, a supernova rips the star apart", "Assuming it is the companion star exploding, rather than stolen hydrogen igniting on the burnt-out one"],
        tools: [{ k: "activity", label: "Two-column table — nova vs supernova: what explodes, what survives, how often, how bright" }],
        status: "draft",
        sources: ["Study_Material_3.pdf", "Glossary.pdf"]
    },
    {
        id: "chandrasekhar-limit", name: "The Chandrasekhar Limit", domain: "stars", level: 5,
        desc: "1.4 solar masses is the most a leftover core can weigh and still be propped up by electron degeneracy pressure as an Earth-sized white dwarf. Push past it and the electrons are forced into the protons to make neutrons; past about 3 solar masses, nothing holds at all.",
        tracks: ["club", "olympiad"],
        prereqs: ["planetary-nebulae", "stellar-evolution"],
        related: ["black-holes", "pulsars"],
        aliases: ["chandrasekhar limit", "1.4 solar masses", "maximum mass of a white dwarf", "electron degeneracy pressure"],
        keywords: ["1.4 solar masses", "3 solar masses", "degenerate electrons", "Earth-sized white dwarf", "electrons squeezed into protons", "neutrons", "10 miles across", "sugar cube weighs more than Everest", "Chandrasekhar"],
        misconceptions: ["Applying the 1.4-solar-mass limit to the star's original mass rather than to the mass of the core it leaves behind", "Thinking a white dwarf is held up by ongoing fusion — fusion has stopped; it is electron pressure alone"],
        tools: [{ k: "activity", label: "Density ladder: pack one solar mass into an Earth-sized ball, then into a 10-mile ball — work out the density each time" }],
        status: "draft",
        sources: ["Study_Material_3.pdf", "Glossary.pdf"]
    },
    {
        id: "supernova-types", name: "Type Ia & Type II Supernovae", domain: "stars", level: 5,
        desc: "Two very different ways to blow up a star: a white dwarf accreting past the Chandrasekhar limit (Type Ia), or a massive star's core collapsing when the fuel runs out (Type II). Both can outshine an entire galaxy for weeks and forge every element past the light ones — and a Ia's uniform brightness makes it a rung on the distance ladder.",
        tracks: ["club", "olympiad"],
        prereqs: ["supernovae-compact", "chandrasekhar-limit"],
        related: ["distance-ladder", "nucleosynthesis"],
        aliases: ["types of supernova", "type ia supernova", "type ii supernova", "core-collapse supernova", "thermonuclear supernova"],
        keywords: ["Type Ia", "Type II", "standard candle", "uniform peak brightness", "accreting white dwarf", "core collapse", "10 solar masses", "outshines a galaxy", "leaves a neutron star or black hole", "Crab Nebula"],
        misconceptions: ["Thinking every supernova is a massive star collapsing — a Type Ia is a white dwarf pushed past the Chandrasekhar limit by a companion", "Assuming the explosion leaves nothing: a compressed core survives as a white dwarf, a neutron star or a black hole"],
        tools: [{ k: "activity", label: "Storyboard both routes side by side: the stolen-mass white dwarf and the out-of-fuel giant — and note what each leaves behind" }],
        status: "draft",
        sources: ["Study_Material_3.pdf", "Glossary.pdf"]
    },
    {
        id: "pulsars", name: "Pulsars", domain: "stars", level: 4,
        desc: "A neutron star about 10 miles across, spinning hundreds to thousands of times a second with its surface near light speed, beams charged particles from its poles. If the beam sweeps our way we see clockwork flashes — regular enough that the first detection was half-seriously credited to aliens.",
        tracks: ["club", "olympiad"],
        prereqs: ["supernovae-compact"],
        related: ["radio-astronomy", "angular-momentum"],
        aliases: ["pulsar", "pulsars", "millisecond pulsar", "radio pulsar", "rotating neutron star"],
        keywords: ["10 miles across", "hundreds of rotations per second", "magnetic poles", "beamed charged particles", "radio pulses", "LGM-1", "lighthouse beam", "accretion from a companion", "surface near light speed"],
        misconceptions: ["Thinking a pulsar physically blinks on and off — the beam shines steadily and simply sweeps past us, like a lighthouse", "Assuming a pulsar is a special kind of star, rather than an ordinary neutron star whose beam happens to point at Earth"],
        tools: [{ k: "activity", label: "Spin a torch on a rotating stool and time the flashes from across the room — a lighthouse, not a blinking bulb" }],
        status: "draft",
        sources: ["Study_Material_3.pdf", "Glossary.pdf"]
    },
    {
        id: "black-holes", name: "Black Holes", domain: "stars", level: 4,
        desc: "Squeeze a core past about 3 solar masses and gravity wins outright: escape velocity exceeds light speed, so nothing gets out past the event horizon. Not a cosmic vacuum cleaner — at a given distance its pull is exactly the pull that mass always had.",
        tracks: ["club", "olympiad"],
        prereqs: ["supernovae-compact", "escape-velocity"],
        related: ["general-relativity", "supermassive-black-holes"],
        aliases: ["event horizon", "singularity", "stellar-mass black hole", "hawking radiation"],
        keywords: ["escape velocity above light speed", "3 solar masses", "event horizon", "singularity", "Hawking radiation", "tidal forces", "stretched infalling astronaut", "Earth as a marble", "6,400 km still 1 g"],
        misconceptions: ["Believing black holes are all-powerful vacuums that slurp everything into their maw — squeeze the Earth into a marble-sized event horizon and at our present 6,400 km you would still feel exactly 1 g", "Thinking light is merely too slow to climb out — past the event horizon it would have to exceed the speed of light, which nothing can"],
        tools: [{ k: "activity", label: "Marble Earth: compute g at 6,400 km before and after the squeeze — the answer is 1 g both times" }],
        status: "draft",
        sources: ["Study_Material_3.pdf", "Glossary.pdf"]
    },
    {
        id: "nucleosynthesis", name: "Where the Elements Came From", domain: "stars", level: 4,
        desc: "Ordinary stars build elements only up to iron and return them on stellar winds and shed shells; everything heavier needs a supernova. The iron in your blood and the calcium in your bones were forged in a star that died — and the same debris is what makes rocky planets possible at all.",
        tracks: ["club", "olympiad"],
        prereqs: ["stellar-fusion", "supernovae-compact"],
        related: ["big-bang-nucleosynthesis", "stellar-populations"],
        aliases: ["stellar nucleosynthesis", "origin of the elements", "where the elements came from", "heavy element formation", "we are made of star stuff"],
        keywords: ["up to iron in normal stars", "heavier than iron needs a supernova", "stellar winds", "red giant shells", "carbon", "oxygen", "silicon", "transmutation", "rocky planets need metals", "Crab Nebula"],
        misconceptions: ["Assuming gold, uranium and the other heavy elements were made in the Big Bang along with the hydrogen and helium", "Thinking a star can fuse its way up the whole periodic table — an ordinary star gets no further than iron"],
        tools: [{ k: "activity", label: "Read the periodic table as a birth certificate: mark which elements in your body a star could make, and which needed a supernova" }],
        status: "draft",
        sources: ["Study_Material_3.pdf", "Glossary.pdf"]
    },
    {
        id: "stellar-populations", name: "Population I & II Stars", domain: "stars", level: 5,
        desc: "Astronomers call every element past helium a 'metal'. Population I stars like the Sun are metal-rich, young, and in the galactic disk — the ones that can have rocky planets; Population II are metal-poor first-generation stars in the halo and the globular clusters, formed before supernovae had enriched the gas.",
        tracks: ["club", "olympiad"],
        prereqs: ["nucleosynthesis", "nebulae-clusters"],
        related: ["milky-way-structure"],
        aliases: ["stellar populations", "population i stars", "population ii stars", "metal-rich stars", "metal-poor stars"],
        keywords: ["metals means past helium", "galactic disk", "galactic halo", "globular clusters", "first-generation stars", "enriched by supernovae", "rocky worlds need metals", "7 percent heavy elements"],
        misconceptions: ["Reading 'Population I' as the first stars — it is the other way round: Population II came first, and Population I formed later, out of gas already enriched by supernovae", "Taking 'metal' in the chemist's sense; to an astronomer carbon, oxygen and nitrogen are all metals"],
        tools: [{ k: "activity", label: "Compare photographs of a globular cluster and an open cluster: which could host rocky planets, and why" }],
        status: "draft",
        sources: ["Study_Material_2.pdf", "Study_Material_3.pdf"]
    },
    {
        id: "nebula-types", name: "Types of Nebula", domain: "stars", level: 3,
        desc: "Four kinds of cloud: emission, gas fluorescing under ultraviolet from hot young stars (M42 — the physics of a neon lamp); dark, dust blotting out what lies behind (the Horsehead, the Coal Sack); reflection, dust scattering a nearby star's light; and planetary, a shell shed by a dying low-mass star. The Horsehead manages all of them at once.",
        tracks: ["club"],
        prereqs: ["nebulae-clusters"],
        related: ["planetary-nebulae", "star-formation"],
        aliases: ["types of nebula", "kinds of nebula", "dark nebula", "absorption nebula", "reflection nebula"],
        keywords: ["M42", "Trapezium", "Horsehead", "Coal Sack", "fluorescence", "neon lamp", "hydrogen beta line", "ultraviolet excitation", "dust scattering", "M57", "shed shell"],
        misconceptions: ["Assuming a planetary nebula has something to do with planets", "Thinking a dark nebula is a hole or an empty lane in the Milky Way, rather than dust dense enough to blot out the light behind it", "Expecting every nebula to shine by its own light — a reflection nebula only scatters a neighbour's"],
        tools: [{ k: "activity", label: "Sort M42, the Horsehead, the Pleiades' haze and M57 into emission, dark, reflection and planetary" }],
        status: "draft",
        sources: ["Study_Material_2.pdf", "Glossary.pdf"]
    },

    // ============ SOLAR SYSTEM & THE SUN — mapped from the Astronomy Quiz study material ============
    {
        id: "solar-structure", name: "Anatomy of the Sun", domain: "stars", level: 3,
        desc: "Outwards from a 15-million-kelvin fusion core: a radiation zone, a boiling convection zone, then the photosphere we call the surface — mottled like a pot of cooking oatmeal — the thin chromosphere, and the corona. The corona is the puzzle: at millions of degrees it is hundreds of times hotter than the surface beneath it, and nobody has fully explained why.",
        tracks: ["club", "olympiad"],
        prereqs: ["sun-as-star"],
        related: ["stellar-fusion", "solar-activity", "solar-eclipse"],
        aliases: ["structure of the sun", "anatomy of the sun", "layers of the sun", "the sun's interior"],
        keywords: ["core", "15 million kelvin", "radiation zone", "convective zone", "photosphere", "granulation", "chromosphere", "corona", "coronal heating problem", "plasma", "absorption lines"],
        misconceptions: ["Thinking the Sun has a solid surface — the photosphere is just the depth at which the gas stops being opaque", "Assuming the Sun cools steadily outwards, when the corona is far hotter than the photosphere below it"],
        tools: [{ k: "activity", label: "Draw the Sun in layers on a 30 cm circle to scale — the photosphere comes out thinner than the pencil line" }],
        status: "draft",
        sources: ["Study_Material_1.pdf", "Glossary.pdf"]
    },
    {
        id: "solar-wind", name: "Solar Wind & the Heliosphere", domain: "stars", level: 3,
        desc: "A thin stream of charged particles is driven off the Sun's surface by light pressure, electric charge and magnetic flux, and can be detected right across the solar system. The bubble it inflates against interstellar space — the heliosphere — is the real edge of the Sun's domain.",
        tracks: ["club", "olympiad"],
        prereqs: ["solar-structure"],
        related: ["aurora", "comets", "plasma"],
        aliases: ["solar wind", "the heliosphere", "stellar wind", "particles streaming from the sun"],
        keywords: ["charged particles", "radiation pressure", "magnetic flux", "heliosphere", "comet ion tail", "interplanetary space", "plasma", "detected throughout the solar system"],
        misconceptions: ["Thinking the solar wind is wind in the ordinary sense — moving air — rather than a thin stream of charged particles through near-vacuum"],
        tools: [{ k: "activity", label: "Work out why a comet's ion tail points away from the Sun whichever way the comet is travelling" }],
        status: "draft",
        sources: ["Study_Material_1.pdf", "Glossary.pdf"]
    },
    {
        id: "space-weather", name: "Space Weather", domain: "stars", level: 3,
        desc: "When the Sun belches a coronal mass ejection at Earth, the result is a geomagnetic storm: power lines damaged on the ground, long-range communications disrupted, astronauts retreating to the deepest part of their spacecraft — and aurorae bright enough to make it all look worth it.",
        tracks: ["club", "olympiad"],
        prereqs: ["solar-wind", "solar-activity"],
        related: ["aurora", "magnetosphere"],
        aliases: ["space weather", "geomagnetic storm", "solar storm", "effects of solar storms on earth"],
        keywords: ["coronal mass ejection", "CME", "Van Allen belts", "power lines damaged", "long-range communications disrupted", "astronauts seek shelter", "x-class flare", "prominence", "aurorae", "sunspot cycle"],
        misconceptions: ["Thinking space weather stays in space and cannot touch us — geomagnetic storms have burnt out power lines and shut down long-range radio on the ground"],
        tools: [{ k: "activity", label: "Follow one real CME from flare to aurora forecast over the two or three days it takes to arrive" }],
        status: "draft",
        sources: ["Study_Material_1.pdf", "Glossary.pdf"]
    },
    {
        id: "magnetosphere", name: "Planetary Magnetospheres", domain: "solar", level: 4,
        desc: "A planet's magnetic field carves a cavity in the solar wind and traps charged particles inside it. Jupiter's core of metallic hydrogen carries current and drives a dynamo so vast that, if we could see the lines of force, its magnetosphere would look bigger in our sky than the Moon or the Sun.",
        tracks: ["club", "olympiad"],
        prereqs: ["solar-wind", "compass-magnetism"],
        related: ["aurora", "space-weather"],
        aliases: ["magnetosphere", "planetary magnetic field", "magnetopause", "earth's magnetic shield"],
        keywords: ["metallic hydrogen", "dynamo", "Van Allen belts", "magnetopause", "Jupiter", "trapped charged particles", "buffer against the solar wind", "larger in our sky than the Moon", "the Moon has none"],
        misconceptions: ["Thinking a planet's magnetic field comes from a bar magnet buried inside it, rather than from electric currents in a conducting fluid", "Assuming every world has a magnetosphere — the Moon has essentially none, which is one clue that it lacks a metal core"],
        tools: [{ k: "activity", label: "Map a bar magnet's field with a compass, then sketch how a stream blowing in from one side would squash it" }],
        status: "draft",
        sources: ["Study_Material_1.pdf", "Glossary.pdf"]
    },
    {
        id: "orbital-elements", name: "Orbital Elements", domain: "solar", level: 4,
        desc: "A handful of numbers pins an orbit down: the semi-major axis sets its size, the eccentricity how far it departs from a circle, the inclination its tilt against the ecliptic. From those you get the period, and the names for the ends — perihelion and aphelion round the Sun, perigee and apogee round the Earth.",
        tracks: ["club", "olympiad"],
        prereqs: ["keplers-laws"],
        related: ["orbits-satellites"],
        aliases: ["orbital elements", "elements of an orbit", "proper orbital elements", "describing an orbit"],
        keywords: ["semi-major axis", "eccentricity", "inclination", "perihelion", "aphelion", "perigee", "apogee", "orbital period", "ecliptic plane", "eccentric orbit"],
        misconceptions: ["Thinking eccentricity measures how tilted an orbit is, when it measures how far the orbit is from a circle", "Mixing up perihelion and aphelion (about the Sun) with perigee and apogee (about the Earth)"],
        tools: [{ k: "activity", label: "Two pins and a loop of string: draw ellipses of eccentricity 0, 0.2 and 0.9, and mark perihelion on each" }],
        status: "draft",
        sources: ["Study_Material_1.pdf", "Glossary.pdf"]
    },
    {
        id: "planet-definition-iau", name: "What Counts as a Planet", domain: "solar", level: 3,
        desc: "In 2006 more than 2500 astronomers at the IAU's 26th General Assembly passed Resolution 5A and set three tests: it must move in a definite orbit around the Sun, its own gravity must have pulled it into a nearly round hydrostatic shape, and it must have cleared the neighbourhood of its orbit. Pluto passes the first two — which is how nine planets became eight.",
        tracks: ["club", "olympiad"],
        prereqs: ["solar-system-inventory"],
        related: ["exoplanets"],
        aliases: ["IAU definition of a planet", "resolution 5A", "what is a planet", "why pluto is not a planet"],
        keywords: ["2006", "26th General Assembly", "International Astronomical Union", "hydrostatic equilibrium", "cleared the neighbourhood", "small solar-system bodies", "eight planets", "Pluto reclassified", "self-gravity overcomes rigid body forces"],
        misconceptions: ["Thinking Pluto was demoted for being too small — it was reclassified because it still shares its orbital neighbourhood, not because of its size", "Assuming the definition covers planets around other stars; Resolution 5A says 'around the Sun' and is silent on exoplanets"],
        tools: [{ k: "activity", label: "Run Earth, Ceres, Pluto and Eris through the three tests and note exactly which one each fails" }],
        status: "draft",
        sources: ["Study_Material_1.pdf", "Glossary.pdf"]
    },
    {
        id: "dwarf-planets", name: "Dwarf Planets", domain: "solar", level: 3,
        desc: "A dwarf planet passes every test but one: round, orbiting the Sun, not anybody's satellite — but it has not cleared its orbital neighbourhood. Ceres works the asteroid belt at 413 million km; Pluto, Haumea, Makemake and Eris lie out beyond Neptune, Eris the farthest at some 14,410 million km.",
        tracks: ["club", "olympiad"],
        prereqs: ["planet-definition-iau"],
        related: ["asteroids-kuiper"],
        aliases: ["dwarf planet", "dwarf planets", "ceres pluto haumea makemake eris"],
        keywords: ["Ceres", "Pluto", "Haumea", "Makemake", "Eris", "413 million km", "5900 million km", "14410 million km", "Charon", "has not cleared its neighbourhood", "is not a satellite", "trans-Neptunian object"],
        misconceptions: ["Thinking a dwarf planet is a kind of planet, the way a dwarf star is a kind of star — the IAU made it a separate category", "Assuming all dwarf planets lie beyond Neptune, when Ceres orbits inside the asteroid belt"],
        tools: [{ k: "activity", label: "Plot the five dwarf planets' distances on a log scale — Ceres and Eris sit a factor of 35 apart" }],
        status: "draft",
        sources: ["Study_Material_1.pdf", "Glossary.pdf"]
    },
    {
        id: "terrestrial-vs-jovian", name: "Terrestrial & Jovian Planets", domain: "solar", level: 3,
        desc: "The inner four share a build — dense core, rocky mantle, thin crust — because the newly ignited Sun lashed them with a titanic solar wind that stripped their hydrogen and helium away. Farther out the wind abated, the growing planetesimals kept their gas, and hoarded so much hydrogen that it compressed into metallic forms.",
        tracks: ["club", "olympiad"],
        prereqs: ["solar-system-inventory"],
        related: ["solar-system-formation", "scale-of-solar-system"],
        aliases: ["terrestrial planets", "jovian planets", "inner and outer planets", "rocky planets and gas giants"],
        keywords: ["rocky mantle", "thin crust", "iron nickel core", "metallic hydrogen", "hydrogen and helium", "solar wind stripped the inner planetesimals", "gas giant", "Jupiter outweighs the rest", "density"],
        misconceptions: ["Thinking a gas giant is gas all the way down — Jupiter's hydrogen is compressed into liquid and metallic forms", "Assuming the inner planets never had hydrogen atmospheres; they could not hold on to them against the young Sun's wind"],
        tools: [{ k: "activity", label: "Tabulate the eight planets by diameter and density — the two families fall straight out of the numbers" }],
        status: "draft",
        sources: ["Study_Material_1.pdf", "Glossary.pdf"]
    },
    {
        id: "solar-system-formation", name: "How the Solar System Formed", domain: "solar", level: 4,
        desc: "Roughly 4.5 billion years ago a disk of gas and dust spun around the proto-Sun; whirls in it grew into planetesimals, heavy elements sank to their centres, and the large ones swept up the small until only big bodies on near-circular orbits were left. The crossfire it took to settle is still written on every old surface as craters.",
        tracks: ["club", "olympiad"],
        prereqs: ["solar-system-inventory", "gravitation"],
        related: ["star-formation", "impact-craters", "meteorites"],
        aliases: ["formation of the solar system", "how the solar system formed", "nebular hypothesis", "protoplanetary disk", "accretion of planetesimals"],
        keywords: ["proto-sun", "protoplanetary disk", "planetesimal", "4.5 billion years", "late heavy bombardment", "accretion", "nuclear fusion ignites", "cris-crossing orbits", "proto-planet"],
        misconceptions: ["Thinking the planets formed one by one in the orbits they occupy now, rather than growing together out of a single disk", "Thinking the Sun formed first and the planets came along later — they condensed from the same collapsing cloud"],
        tools: [{ k: "activity", label: "Spin a bowl of water with pepper sprinkled on it — why a collapsing cloud flattens into a disk" }],
        status: "draft",
        sources: ["Study_Material_1.pdf", "Glossary.pdf"]
    },
    {
        id: "moon-formation", name: "How the Moon Formed", domain: "solar", level: 3,
        desc: "Only one story survives rigorous modelling: early Earth took a glancing blow from a proto-planet about the size of Mars, and the debris — largely Earth's own mantle — gathered into a dense ring and coalesced. The Moon itself is the evidence: mantle rock much like ours, but moonquake seismometry and the missing magnetic field both say there is no metal core.",
        tracks: ["club", "olympiad"],
        prereqs: ["moon-orbit", "lunar-geology"],
        related: ["tidal-locking", "moons-solar-system"],
        aliases: ["giant impact hypothesis", "how the moon formed", "origin of the moon", "formation of the moon"],
        keywords: ["Mars-sized proto-planet", "glancing blow", "Earth's mantle", "no metal core", "moonquakes", "seismometer", "lack of a magnetic field", "dense ring", "coalesced", "co-planet"],
        misconceptions: ["Thinking Earth simply captured a passing Moon, or spun one off while rotating fast — neither survives the computational modelling", "Thinking the Moon is a small copy of the Earth; it has Earth's mantle composition but almost none of Earth's iron"],
        tools: [{ k: "activity", label: "Drop a marble into a tray of flour at a glancing angle — see which way the ejecta flies, and how much of it came from the tray rather than the marble" }],
        status: "draft",
        sources: ["Study_Material_1.pdf"]
    },
    {
        id: "moons-solar-system", name: "Moons of the Solar System", domain: "solar", level: 3,
        desc: "The tally is lopsided and still climbing: as on 30 June 2026, Saturn 285, Jupiter 115, Uranus 28, Neptune 16, Mars 2, Earth 1, and nothing at all for Mercury or Venus. Titan is the only satellite with a substantial atmosphere; Europa's cracked ice appears to float on a worldwide ocean.",
        tracks: ["club", "olympiad"],
        prereqs: ["solar-system-inventory", "galilean-moons"],
        related: ["tidal-locking", "astrobiology"],
        aliases: ["moons of the solar system", "natural satellites", "satellite count", "satellites of the planets"],
        keywords: ["285 moons of Saturn", "115 moons of Jupiter", "30 June 2026", "Titan", "methane atmosphere", "Europa", "subsurface ocean", "Ganymede", "Callisto", "Io", "captured irregular moons", "slingshot capture"],
        misconceptions: ["Thinking every moon formed alongside its planet — many outer moons are captured asteroids, which first need something to shed their excess speed", "Thinking our Moon is a typical satellite, when it is unusually large compared with its planet"],
        tools: [{ k: "activity", label: "Rank the biggest moons against Mercury and Pluto by diameter — several beat Pluto outright" }],
        status: "draft",
        sources: ["Study_Material_1.pdf", "Glossary.pdf"]
    },
    {
        id: "oort-cloud", name: "The Oort Cloud", domain: "solar", level: 4,
        desc: "The outermost layer of the solar system is a spherical shell of cometary nuclei about 50,000 AU out — some 8/10 of a light-year, far enough that the Sun's grip is feeble and a passing star can tug comets loose. It is the source of the long-period comets; the Kuiper Belt, by contrast, is a flat disc just outside Neptune.",
        tracks: ["club", "olympiad"],
        prereqs: ["comets", "asteroids-kuiper"],
        related: ["scale-of-solar-system"],
        aliases: ["oort cloud", "the cometary cloud", "reservoir of long-period comets"],
        keywords: ["50,000 AU", "0.8 light-year", "spherical", "long-period comet", "passing stars", "perturbation", "cometary nuclei", "Kuiper Belt is a disc", "trans-Neptunian object", "the cemetery of the solar system"],
        misconceptions: ["Thinking the Oort Cloud is a disc like the Kuiper Belt — it is a sphere wrapped around the whole solar system", "Mixing up the two reservoirs: short-period comets come from the Kuiper Belt, long-period ones from the Oort Cloud"],
        tools: [{ k: "activity", label: "Scale it: if Neptune's orbital radius is 1 m, the Oort Cloud is about 1.7 km away" }],
        status: "draft",
        sources: ["Study_Material_1.pdf", "Glossary.pdf"]
    },
    {
        id: "near-earth-objects", name: "Near-Earth Objects & Planetary Defence", domain: "solar", level: 3,
        desc: "Some asteroids cross Earth's orbit — Toutatis came within 6 Moon distances in 2004 — and the one that finished the dinosaurs was only mountain-sized, not planet-sized. That is the whole case for surveying: unlike a long-period comet, which we may not see until it is too late, an Earth-crossing asteroid can be catalogued decades early and nudged.",
        tracks: ["club", "olympiad"],
        prereqs: ["asteroids-kuiper", "impact-craters"],
        related: ["meteorites", "comets"],
        aliases: ["near-earth objects", "earth-crossing asteroids", "planetary defence", "potentially hazardous asteroids"],
        keywords: ["Toutatis", "6 Moon distances", "2004", "Yucatan Peninsula", "65 million years ago", "mountain-sized impactor", "Shoemaker-Levy 9", "deflection", "apollo asteroid", "ejecta blots out the Sun", "ten-mile diameter"],
        misconceptions: ["Thinking only a near planet-sized body could end a civilisation — the dinosaur-killer was on the order of the size of a mountain", "Thinking an impact is only dangerous near the impact site, when the ejecta and the years of darkness reach everywhere"],
        tools: [{ k: "activity", label: "Convert Toutatis's 2004 miss distance from 6 lunar distances into km, and compare it with the Moon's own orbit" }],
        status: "draft",
        sources: ["Study_Material_1.pdf", "Glossary.pdf"]
    },
    {
        id: "asteroid-families", name: "Asteroid Families", domain: "solar", level: 5,
        desc: "Sort the asteroids by their proper orbital elements — semi-major axis, eccentricity, inclination — and they clump into families whose members are thought to be fragments of the same past collision. A dedicated 2015 study organised 122 notable families holding roughly 100,000 asteroids; the Vesta family (15,252 members) and the Flora family (13,786) are the largest.",
        tracks: ["olympiad"],
        prereqs: ["asteroids-kuiper", "orbital-elements"],
        related: ["albedo", "meteorites"],
        aliases: ["asteroid family", "asteroid families", "families of asteroids", "asteroid group"],
        keywords: ["proper orbital elements", "semi-major axis", "eccentricity", "orbital inclination", "122 families", "100,000 members", "Vesta family", "Flora family", "Koronis family", "Themis family", "Hungaria family", "mean albedo", "collisional fragments", "2015 study"],
        misconceptions: ["Confusing a family with a group — a group merely shares broad orbital characteristics, while a family's members really are debris from one collision", "Thinking family members travel together in a clump in space; what they share is an orbit's shape, not a location"],
        tools: [{ k: "activity", label: "Plot a family table as semi-major axis against inclination — the clusters are the families" }],
        status: "draft",
        sources: ["Study_Material_1.pdf"]
    },
    {
        id: "roche-limit", name: "The Roche Limit", domain: "solar", level: 5,
        desc: "Tidal force — the difference in pull across a body — climbs steeply as you close on a massive planet. Inside the Roche limit it beats the would-be satellite's own self-gravity, so a fluid body cannot hold itself together: moons that venture too close become rings. Astronomers knew Saturn's rings had to be countless separate particles long before any spacecraft went to look.",
        tracks: ["olympiad"],
        prereqs: ["tides", "saturn-rings"],
        related: ["tidal-locking", "supernovae-compact"],
        aliases: ["roche limit", "roche's limit", "tidal disruption limit"],
        keywords: ["tidal force exceeds self-gravity", "fluid body", "would-be satellites become rings", "no rigid ring could survive", "Shoemaker-Levy 9", "white dwarf", "neutron star", "black hole", "torn apart"],
        misconceptions: ["Thinking the Roche limit is where a body gets crushed by gravity, when it is where it gets pulled apart by the difference in gravity across it", "Thinking anything inside the Roche limit must break up — a small, rigid body held together by its own material strength can survive; the limit is about self-gravity"],
        tools: [{ k: "activity", label: "Plot Saturn's rings and its moons against distance — the split lands right about where the Roche limit does" }],
        status: "draft",
        sources: ["Study_Material_1.pdf"]
    },
    {
        id: "orbital-resonance", name: "Orbital Resonance", domain: "solar", level: 5,
        desc: "When two orbital periods settle into a simple whole-number ratio, the repeated nudges add up instead of averaging away — and the arrangement can lock itself in. Pluto survives a Neptune-crossing orbit only because its 2:3 resonance always keeps the two at least a third of Neptune's orbit apart.",
        tracks: ["olympiad"],
        prereqs: ["orbital-elements"],
        related: ["tidal-locking", "galilean-moons", "lagrange-points"],
        aliases: ["orbital resonance", "mean-motion resonance", "resonant orbits", "synchronous orbits"],
        keywords: ["2:3 resonance", "Pluto and Neptune", "Io Europa Ganymede", "Epimetheus and Janus", "moons swapping orbits", "Cruithne", "horseshoe orbit", "0.9999 AU", "about 4 centuries", "slingshot"],
        misconceptions: ["Thinking two bodies on crossing orbits must eventually collide, when a resonance can guarantee they never meet", "Thinking Cruithne is a second moon of Earth — it orbits the Sun, and only traces a horseshoe when you draw it relative to us"],
        tools: [{ k: "activity", label: "Two runners lapping a track with periods of 2 and 3 minutes: where do they always meet, and where never?" }],
        status: "draft",
        sources: ["Study_Material_1.pdf"]
    },
    {
        id: "barycentre", name: "Barycentre", domain: "solar", level: 4,
        desc: "Two bodies both swing about their common centre of gravity. Earth is 81 times the Moon's mass, so the barycentre sits 4740 km from Earth's centre — inside the Earth, but well off-centre; Pluto is only about 8 times Charon's mass, so theirs lies out in open space. It is why Earth shifts a third of its own diameter side to side every 29.5 days — and how an astronomer on Mars could deduce our Moon without ever seeing it.",
        tracks: ["club", "olympiad"],
        prereqs: ["moon-orbit", "gravitation"],
        related: ["exoplanets", "tides"],
        aliases: ["barycentre", "barycenter", "common centre of gravity", "centre of mass of two bodies"],
        keywords: ["4740 km", "81 times as massive", "Pluto and Charon", "1/8 the distance", "co-planet", "binary system", "wobble", "1/3 of Earth's diameter", "29.5 days", "Ganymede", "12,817 times"],
        misconceptions: ["Thinking the Moon orbits a stationary Earth — both swing about the barycentre, and Earth's share of that motion is a third of its own diameter every 29.5 days", "Thinking that because the Earth–Moon barycentre lies inside the Earth, it must sit at Earth's centre"],
        tools: [{ k: "activity", label: "Balance a heavy and a light ball on a rod: find the pivot at 81:1 (Earth–Moon) and at 8:1 (Pluto–Charon)" }],
        status: "draft",
        sources: ["Study_Material_1.pdf"]
    },
    {
        id: "albedo", name: "Albedo", domain: "solar", level: 3,
        desc: "Albedo is simply the fraction of light a surface throws back — and it spans an order of magnitude even among asteroids, from about 0.03 for the sootiest families to 0.35 for the brightest. It is why cloud-wrapped Venus outshines everything but the Sun and Moon, and why the dark asteroids are the hard ones to find.",
        tracks: ["club", "olympiad"],
        prereqs: ["light-shadow"],
        related: ["phases-of-venus", "earthshine", "apparent-magnitude"],
        aliases: ["albedo", "reflectivity", "percentage of light reflected", "mean albedo"],
        keywords: ["0.03", "0.35", "reflected sunlight", "dark asteroid", "Hungaria family", "Misa family", "brilliance of Venus", "cloud deck", "polar ice caps", "high contrast planet"],
        misconceptions: ["Thinking a bright object must be a big one — brightness is size, albedo and distance together, so a small shiny asteroid can outshine a large dark one", "Thinking albedo is how much light an object gives off, when it is how much of the light falling on it comes back"],
        tools: [{ k: "activity", label: "Torch and a light meter on white paper, a grey card and black cloth — measure three albedos and rank them" }],
        status: "draft",
        sources: ["Study_Material_1.pdf", "Glossary.pdf"]
    }
);
