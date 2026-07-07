// ============================================================
// Aryabhat Concept Graph — a DAG of astronomy concepts.
//
// Each concept is kept as small as possible. `prereqs` point to
// concept ids that should be understood first (edges of the DAG).
//
//   id      : stable slug (never change once published)
//   name    : short display name
//   desc    : 1–2 sentence explanation, teaching-oriented
//   domain  : one of CONCEPT_DOMAINS keys
//   level   : 1..5, see CONCEPT_LEVELS
//   tracks  : use-case subsets this concept belongs to
//   prereqs : ids of prerequisite concepts
//   tools   : suggested tools/activities; k = tool kind (see TOOL_KINDS)
// ============================================================

window.CONCEPT_DOMAINS = {
    found:  { name: "Science & Geography Basics", color: "#d4a373" },
    sky:    { name: "Naked-Eye Sky",             color: "#ffcc33" },
    sphere: { name: "Celestial Sphere & Motion", color: "#38bdf8" },
    time:   { name: "Time & Calendars",          color: "#a78bfa" },
    solar:  { name: "Solar System",              color: "#f87171" },
    light:  { name: "Light & Optics",            color: "#34d399" },
    scope:  { name: "Telescopes & Observing",    color: "#f472b6" },
    stars:  { name: "Stars, Galaxies & Cosmos",  color: "#818cf8" },
    astro:  { name: "Astrophotography",          color: "#cbd5e1" },
    indic:  { name: "Indian Astronomy",          color: "#ff9933" }
};

window.CONCEPT_LEVELS = {
    1: { name: "Spark",       hint: "First wonder — pure naked-eye noticing" },
    2: { name: "Explorer",    hint: "Patterns and simple models" },
    3: { name: "Observer",    hint: "Working knowledge — charts, optics, coordinates" },
    4: { name: "Practitioner", hint: "Quantitative models and instruments" },
    5: { name: "Specialist",  hint: "Advanced technique and frontier ideas" }
};

window.CONCEPT_TRACKS = {
    "school-primary": { name: "School: Primary (3–5)" },
    "school-middle":  { name: "School: Middle (6–8)" },
    "school-high":    { name: "School: High (9–12)" },
    "club":           { name: "Amateur Astronomy Club" },
    "photo":          { name: "Astrophotography Group" },
    "indic":          { name: "Indian Traditional Astronomy" }
};

// Tool kinds. A tool entry may carry its own `url`, which overrides
// the kind-level url. This page is standalone (not part of the
// aryabhat.org portal), so links out are absolute URLs.
window.TOOL_KINDS = {
    gol:       { name: "Gol (Astro Lab)",           url: "https://gol.kaalshodh.com" },
    sky:       { name: "Sky Map",                   url: "https://aryabhat.org/sky.html" },
    whatsup:   { name: "What's Up",                 url: "https://aryabhat.org/whatsup.html" },
    kaal:      { name: "Web tool · kaalshodh.com",  url: "https://kaalshodh.com/app.html" },
    web:       { name: "Web tool · alokm.com",      url: null },
    android:   { name: "Android app",               url: null },
    activity:  { name: "Hands-on activity",         url: null },
    app:       { name: "App / software",            url: null }
};

window.CONCEPTS = [

    // ============================== NAKED-EYE SKY ==============================
    {
        id: "day-night", name: "Day & Night", domain: "sky", level: 1,
        desc: "Earth spins once in about 24 hours, so the Sun appears to rise in the east and set in the west. Day and night are a matter of which side of Earth faces the Sun.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: ["spin-axis"],
        tools: [{ k: "gol", label: "Rotating Earth animation" }, { k: "activity", label: "Globe + torch: spin the globe, watch a sticker city pass through day and night" }, { k: "android", label: "Live Day Night — interactive day/night view of Earth", url: "https://play.google.com/store/apps/details?id=com.alokm.livedaynight" }]
    },
    {
        id: "cardinal-directions", name: "Cardinal Directions", domain: "sky", level: 1,
        desc: "Finding north, south, east and west from the Sun and shadows. Sunrise and sunset directions drift through the year — due east/west only near the equinoxes.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: [],
        tools: [{ k: "activity", label: "Shadow-stick compass: mark shadow tips through a day" }]
    },
    {
        id: "sky-dome", name: "The Sky Dome", domain: "sky", level: 1,
        desc: "The sky looks like a dome overhead: the horizon is its rim, the zenith its top. Everything we observe is a direction on this dome, not a distance.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: [],
        tools: [{ k: "activity", label: "Umbrella planetarium: draw stars inside an umbrella and rotate it" }]
    },
    {
        id: "sun-daily-arc", name: "Sun's Daily Arc", domain: "sky", level: 1,
        desc: "The Sun climbs from the eastern horizon, peaks toward the south (from India), and sinks west. Shadow lengths and directions trace this arc.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: ["day-night", "sky-dome", "cardinal-directions"],
        tools: [{ k: "gol", label: "Sun path across seasons" , url: "https://gol.kaalshodh.com/app#sunpath"}, { k: "activity", label: "Chart shadow length every hour on the school ground" }, { k: "android", label: "Sunrise Sunset — timings & visualizations for any location", url: "https://play.google.com/store/apps/details?id=com.alokmandavgane.sunrisesunset" }]
    },
    {
        id: "moon-observation", name: "Observing the Moon", domain: "sky", level: 1,
        desc: "The Moon is visible in the day as often as at night, rises about 50 minutes later each day, and shows changing shapes. Just watching it for a month is a complete experiment.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: ["sky-dome"],
        tools: [{ k: "activity", label: "Moon diary: sketch the Moon and note time/direction for 30 days" }, { k: "whatsup", label: "Moonrise & moonset times" }]
    },
    {
        id: "stars-vary", name: "Stars Differ", domain: "sky", level: 1,
        desc: "Stars are not identical dots: they differ in brightness and in colour — steely blue Vega, golden Arcturus, red Betelgeuse. These differences are real physics, visible to the naked eye.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: ["sky-dome"],
        tools: [{ k: "activity", label: "Colour hunt: find one blue, one yellow, one red star" }]
    },
    {
        id: "constellations", name: "Constellations", domain: "sky", level: 1,
        desc: "Star patterns used as sky landmarks — 88 official constellations today, with older patterns in every culture. They are direction labels, not physical groups.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: ["stars-vary"],
        tools: [{ k: "sky", label: "Identify tonight's constellations" }, { k: "gol", label: "Gol Planetarium scene — identify constellations on the live sky", url: "https://gol.kaalshodh.com/app#planetarium" }]
    },
    {
        id: "moon-phases", name: "Phases of the Moon", domain: "sky", level: 2,
        desc: "The Moon is always half-lit by the Sun; the phase is how much of that lit half faces us, cycling in about 29.5 days. Phase, rise time and Sun–Moon angle all lock together.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["moon-observation", "day-night"],
        tools: [{ k: "gol", label: "Moon phase geometry animation" }, { k: "activity", label: "Lamp + ball around your head: see all phases in one minute" }, { k: "kaal", label: "Mandala orrery — watch phases emerge from the geometry", url: "https://mandal.kaalshodh.com" }, { k: "kaal", label: "Astro Events — full & new moons by year", url: "https://kaalshodh.com/events.html" }]
    },
    {
        id: "diurnal-motion", name: "Diurnal Motion", domain: "sky", level: 2,
        desc: "The whole starry sky wheels westward through the night, circling a fixed point — the celestial pole. This is Earth's rotation seen from the inside.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "photo", "indic"],
        prereqs: ["day-night", "constellations"],
        tools: [{ k: "gol", label: "Time-lapse rotating sky" , url: "https://gol.kaalshodh.com/app#planetarium"}, { k: "activity", label: "Watch Orion or the Big Dipper shift over 2 hours" }]
    },
    {
        id: "pole-star", name: "The Pole Star", domain: "sky", level: 2,
        desc: "Polaris (Dhruva) sits nearly at the north celestial pole, so it barely moves and always marks north. Its altitude above the horizon equals your latitude.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "photo", "indic"],
        prereqs: ["diurnal-motion", "cardinal-directions", "latitude-longitude"],
        tools: [{ k: "sky", label: "Find Polaris from the Big Dipper / Saptarshi" }, { k: "activity", label: "Measure Polaris altitude with a fist-and-thumb protractor" }]
    },
    {
        id: "planets-wanderers", name: "Planets: the Wanderers", domain: "sky", level: 2,
        desc: "A few bright 'stars' drift against the fixed constellations from week to week — the planets. They shine steadily while true stars twinkle.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["constellations"],
        tools: [{ k: "whatsup", label: "Which planets are up tonight" }, { k: "activity", label: "Plot a planet's position against stars weekly for a month" }, { k: "gol", label: "Gol Planets scene — track the wanderers against the stars", url: "https://gol.kaalshodh.com/app#planets" }]
    },
    {
        id: "seasons", name: "Seasons", domain: "sky", level: 2,
        desc: "Earth's axis is tilted 23.4°, so through the year each hemisphere leans toward or away from the Sun — changing day length and the Sun's height. Distance from the Sun is not the cause.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["sun-daily-arc"],
        tools: [{ k: "gol", label: "Tilted Earth orbiting the Sun" }, { k: "activity", label: "Torch at a slant vs straight-on: same light, bigger patch" }, { k: "web", label: "Sun Rays Orientation — how sunlight lands on Earth through the year", url: "https://alokm.com/astro/year_v2.html" }]
    },
    {
        id: "seasonal-skies", name: "Seasonal Skies", domain: "sky", level: 2,
        desc: "The night sky changes with the calendar — Orion rules winter evenings, Scorpius the monsoon sky — because Earth's orbit points our nights toward different stars each season.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["constellations", "seasons"],
        tools: [{ k: "sky", label: "Compare the sky in January vs June" }, { k: "gol", label: "Orbit-driven sky change animation" , url: "https://gol.kaalshodh.com/app#planetarium"}]
    },
    {
        id: "ecliptic-zodiac", name: "Ecliptic & Zodiac", domain: "sky", level: 2,
        desc: "The Sun's yearly path against the stars is the ecliptic; the belt of constellations it crosses is the zodiac. The Moon and planets always keep near this line.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["seasonal-skies", "planets-wanderers"],
        tools: [{ k: "sky", label: "Trace the ecliptic line across tonight's sky" }, { k: "gol", label: "Sun's motion through the zodiac" }, { k: "web", label: "Solar & Ecliptic playground — play with the Sun on the ecliptic", url: "https://alokm.com/astro/solar.html" }]
    },
    {
        id: "angular-measure", name: "Angles on the Sky", domain: "sky", level: 2,
        desc: "Sky positions and sizes are measured in angles: your fist at arm's length spans about 10°, the Moon half a degree. Degrees, arcminutes and arcseconds are the astronomer's ruler.",
        tracks: ["school-middle", "school-high", "club", "photo", "indic"],
        prereqs: ["sky-dome", "angles-protractor"],
        tools: [{ k: "activity", label: "Calibrate your hand: fist ≈ 10°, spread hand ≈ 20°" }, { k: "android", label: "Altaz — measure altitude & azimuth by pointing your phone", url: "https://play.google.com/store/apps/details?id=com.alokm.altaz" }]
    },
    {
        id: "milky-way-band", name: "The Milky Way Band", domain: "sky", level: 2,
        desc: "From a dark site a faint luminous band arches across the sky — the combined light of billions of stars in our galaxy's disc, seen from inside it.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["stars-vary"],
        tools: [{ k: "activity", label: "Dark-sky trip: map the band against constellations" }, { k: "gol", label: "Gol Milky Way scene — the galactic band across the dome", url: "https://gol.kaalshodh.com/app#milkyway" }]
    },
    {
        id: "light-pollution", name: "Light Pollution", domain: "sky", level: 2,
        desc: "Artificial skyglow erases faint stars; the Bortle scale grades sky darkness from 1 (pristine) to 9 (inner city). Shielded, warm, dimmed lighting brings stars back.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["stars-vary"],
        tools: [{ k: "activity", label: "Count stars in the Little Dipper / around Orion to grade your sky" }]
    },
    {
        id: "satellite-spotting", name: "Spotting Satellites", domain: "sky", level: 2,
        desc: "Steady 'stars' gliding across twilight skies are sunlit spacecraft — the ISS outshines everything but the Moon and Venus. They fade when they enter Earth's shadow.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: ["diurnal-motion"],
        tools: [{ k: "whatsup", label: "ISS and bright satellite passes" }]
    },

    // ===================== CELESTIAL SPHERE & MOTION =====================
    {
        id: "celestial-sphere", name: "Celestial Sphere", domain: "sphere", level: 3,
        desc: "A model sphere of infinite radius carrying the stars, with celestial poles and a celestial equator projected from Earth's own. It turns star positions into geometry we can compute.",
        tracks: ["school-middle", "school-high", "club", "photo", "indic"],
        prereqs: ["diurnal-motion", "angular-measure", "model-thinking"],
        tools: [{ k: "gol", label: "3D celestial sphere you can spin" , url: "https://gol.kaalshodh.com/astrolabe"}]
    },
    {
        id: "altaz-coords", name: "Altitude–Azimuth Coordinates", domain: "sphere", level: 3,
        desc: "The local way to point: azimuth around the horizon from north, altitude up from the horizon. Simple and intuitive — but every star's alt-az changes by the minute.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["celestial-sphere", "cardinal-directions"],
        tools: [{ k: "sky", label: "Read alt-az of any object right now" }, { k: "android", label: "Altaz — 3D compass reading altitude/azimuth of anything you point at", url: "https://play.google.com/store/apps/details?id=com.alokm.altaz" }]
    },
    {
        id: "equatorial-coords", name: "Right Ascension & Declination", domain: "sphere", level: 3,
        desc: "Sky coordinates that rotate with the stars: declination is celestial latitude, right ascension the sky's longitude measured in hours. A star's RA/Dec is (almost) permanent — this is how catalogues work.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["celestial-sphere"],
        tools: [{ k: "sky", label: "Look up RA/Dec of bright stars" }, { k: "gol", label: "Gol — coordinate systems on the celestial sphere" }]
    },
    {
        id: "circumpolar-stars", name: "Circumpolar Stars", domain: "sphere", level: 3,
        desc: "Stars close enough to the celestial pole never set for your latitude — they circle it all night, all year. Which stars are circumpolar depends only on where you stand.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["pole-star", "celestial-sphere"],
        tools: [{ k: "gol", label: "Circumpolar zone vs latitude animation" }]
    },
    {
        id: "meridian-transit", name: "Meridian & Transit", domain: "sphere", level: 3,
        desc: "The meridian is the north–south line through your zenith; objects are highest — and best observed — when they cross (transit) it. Transit timing is the backbone of classical positional astronomy.",
        tracks: ["school-high", "club", "photo", "indic"],
        prereqs: ["altaz-coords"],
        tools: [{ k: "whatsup", label: "Transit times of tonight's objects" }, { k: "web", label: "Jantar Mantar Dashboard — hour angle & local noon in real time", url: "https://alokm.com/jantarmantar/" }]
    },
    {
        id: "sidereal-day", name: "Sidereal vs Solar Day", domain: "sphere", level: 3,
        desc: "Earth turns once relative to the stars in 23h 56m — 4 minutes shorter than the solar day, because we also orbit the Sun. That 4 minutes is why the constellations drift with the seasons.",
        tracks: ["school-high", "club", "photo", "indic"],
        prereqs: ["equatorial-coords", "seasonal-skies"],
        tools: [{ k: "gol", label: "Sidereal vs solar day animation" }]
    },
    {
        id: "precession", name: "Precession of the Equinoxes", domain: "sphere", level: 4,
        desc: "Earth's axis slowly cones like a spinning top, once in about 25,800 years. Pole stars change (Thuban → Polaris → Vega) and the equinox point slides westward through the zodiac.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["pole-star", "ecliptic-zodiac", "celestial-sphere", "spin-axis"],
        tools: [{ k: "gol", label: "Precessing axis and shifting pole stars" }]
    },
    {
        id: "star-charts", name: "Star Charts & Planetarium Apps", domain: "sphere", level: 2,
        desc: "Reading a sky map: orientation, scale, magnitudes, and matching chart to sky. A planisphere or app turns the catalogue sky into 'what's above me right now'.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["constellations", "angular-measure", "star-names", "maps-scale"],
        tools: [{ k: "sky", label: "Interactive chart for your location" }, { k: "activity", label: "Make a paper planisphere" }, { k: "web", label: "Bhagol,  the Celestial Map — planets,  constellations & zodiac with time control", url: "https://alokm.com/khagol/bhagol.html" }]
    },

    // ============================ TIME & CALENDARS ============================
    {
        id: "shadow-clock", name: "Gnomon & Local Noon", domain: "time", level: 2,
        desc: "A vertical stick tells time: its shadow is shortest at local noon, pointing exactly north–south. The gnomon (shanku) is astronomy's oldest instrument.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["sun-daily-arc", "light-shadow"],
        tools: [{ k: "activity", label: "Find local noon with a plumb stick; compare with clock noon" }, { k: "web", label: "Shanku Yantra generator — the gnomon as a date-teller", url: "https://alokm.com/astro/shanku.html" }, { k: "gol", label: "Gol Shanku Yantra scene — the gnomon's shadow through the day", url: "https://gol.kaalshodh.com/app#shanku" }]
    },
    {
        id: "solar-time-zones", name: "Solar Time & Time Zones", domain: "time", level: 3,
        desc: "Local solar time differs at every longitude, so clocks are grouped into zones — IST is the solar time near 82.5°E. Your sundial and your watch honestly disagree.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["shadow-clock", "latitude-longitude"],
        tools: [{ k: "activity", label: "Compute your longitude correction to IST from local noon" }, { k: "web", label: "Local Noon — local noon time for any place,  any date", url: "https://alokm.com/astro/localnoon.html" }, { k: "web", label: "Sunrise Isophotes — globe lines of equal sunrise/sunset time", url: "https://alokm.com/astro/isophotes.html" }]
    },
    {
        id: "equation-of-time", name: "Equation of Time & Analemma", domain: "time", level: 4,
        desc: "Sundial time runs up to 16 minutes fast or slow through the year, because Earth's orbit is elliptical and tilted. Photograph the noon Sun weekly and it traces a figure-8 — the analemma.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["solar-time-zones", "keplers-laws"],
        tools: [{ k: "gol", label: "Analemma build-up animation" }, { k: "activity", label: "Year-long fixed-camera analemma project" }, { k: "web", label: "One Year Around the Sun — orbit,  analemma & equation of time", url: "https://alokm.com/astro/year.html" }, { k: "web", label: "Analemma Generator — change orbital parameters,  reshape the analemma", url: "https://alokm.com/astro/analemmagenerator.html" }]
    },
    {
        id: "lunar-months", name: "Synodic & Sidereal Month", domain: "time", level: 3,
        desc: "The Moon laps the stars in 27.3 days (sidereal) but takes 29.5 days between new moons (synodic), because the Sun moves too. Two different 'months' from one orbit.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["moon-phases"],
        tools: [{ k: "gol", label: "Sidereal vs synodic month animation" }]
    },
    {
        id: "calendar-systems", name: "Calendar Systems", domain: "time", level: 3,
        desc: "Solar calendars track the seasons, lunar calendars the Moon, and lunisolar calendars juggle both with leap arrangements. Every calendar is an astronomy problem frozen into culture.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["lunar-months", "seasons"],
        tools: [{ k: "activity", label: "Compare today's date across Gregorian, Islamic, and Vikram calendars" }, { k: "web", label: "Bodhi Samvatsara — a Buddhist-tradition calendar system", url: "https://alokm.com/bodhi/" }]
    },
    {
        id: "equinox-solstice", name: "Equinoxes & Solstices", domain: "time", level: 2,
        desc: "Four turning points of the year: two equinoxes when day equals night, two solstices when the Sun's arc is highest or lowest. They anchor seasons and calendars worldwide.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["seasons", "sun-daily-arc"],
        tools: [{ k: "gol", label: "Sunrise point drifting along the horizon through the year" }, { k: "activity", label: "Mark sunrise direction on the horizon each month" }, { k: "web", label: "True Equinox — the day when day and night are actually equal", url: "https://alokm.com/astro/equinox.html" }, { k: "kaal", label: "Astro Events — solstices & equinoxes by year", url: "https://kaalshodh.com/events.html" }]
    },

    // ============================== SOLAR SYSTEM ==============================
    {
        id: "earth-sphere", name: "Earth is a Sphere", domain: "solar", level: 2,
        desc: "Ships sinking hull-first, new stars rising as you travel south, and Earth's always-round shadow on the eclipsed Moon — classical proofs, no spacecraft needed.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["sky-dome", "earth-globe", "gravity-basics"],
        tools: [{ k: "activity", label: "List and debate the classical evidences" }]
    },
    {
        id: "eratosthenes", name: "Measuring the Earth", domain: "solar", level: 3,
        desc: "Eratosthenes sized the Earth around 240 BCE with two sticks and a noon shadow angle. Two schools at different latitudes can repeat it today over WhatsApp.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["earth-sphere", "shadow-clock", "angular-measure", "latitude-longitude"],
        tools: [{ k: "activity", label: "Partner-school Eratosthenes measurement at local noon" }]
    },
    {
        id: "moon-orbit", name: "Moon Orbits Earth", domain: "solar", level: 2,
        desc: "The Moon circles Earth roughly monthly at about 384,000 km — around 30 Earth-diameters away. Its orbital motion is what drives the phase cycle and its nightly 13° eastward drift.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["moon-phases"],
        tools: [{ k: "activity", label: "Scale model: football Earth, tennis-ball Moon 7 m apart" }, { k: "kaal", label: "Mandala orrery — the Sun-Earth-Moon system in motion", url: "https://mandal.kaalshodh.com" }, { k: "kaal", label: "Lunapedia — distance, ecliptic latitude & cultural moon names", url: "https://kaalshodh.com/lunapedia.html" }]
    },
    {
        id: "tidal-locking", name: "Tidal Locking", domain: "solar", level: 3,
        desc: "The Moon rotates exactly once per orbit, so one face is forever turned to Earth. Tidal friction braked it into this lock — the fate of most large moons.",
        tracks: ["school-high", "club"],
        prereqs: ["moon-orbit"],
        tools: [{ k: "gol", label: "Locked vs unlocked rotation animation" }, { k: "activity", label: "Walk around a chair while always facing it" }]
    },
    {
        id: "lunar-eclipse", name: "Lunar Eclipses", domain: "solar", level: 2,
        desc: "At full moon, the Moon can pass through Earth's shadow and turn copper-red — sunset light bent through our atmosphere. Safe to watch, visible from the whole night side.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["moon-orbit", "earth-sphere", "light-shadow"],
        tools: [{ k: "gol", label: "Shadow-cone geometry animation" }, { k: "whatsup", label: "Upcoming eclipses" }]
    },
    {
        id: "solar-eclipse", name: "Solar Eclipses", domain: "solar", level: 2,
        desc: "At new moon, the Moon's small shadow can sweep across Earth, briefly hiding the Sun. Totality happens because the Moon and Sun span the same half-degree — a cosmic coincidence.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["moon-orbit", "angular-measure", "light-shadow"],
        tools: [{ k: "gol", label: "Umbra track across Earth animation" }, { k: "activity", label: "Pinhole projection of the Sun" }, { k: "android", label: "Solar Eclipse — visualize eclipses across 5000 years", url: "https://play.google.com/store/apps/details?id=com.alokm.solareclipse" }]
    },
    {
        id: "eclipse-seasons", name: "Eclipse Seasons & Nodes", domain: "solar", level: 4,
        desc: "The Moon's orbit is tilted 5°, so eclipses happen only when full/new moon falls near the orbit's crossing points (nodes) — twice a year. The 18-year Saros cycle repeats the pattern.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["lunar-eclipse", "solar-eclipse", "ecliptic-zodiac"],
        tools: [{ k: "gol", label: "Tilted lunar orbit and node crossings" }, { k: "android", label: "Solar Eclipse — explore eclipse patterns over 5000 years", url: "https://play.google.com/store/apps/details?id=com.alokm.solareclipse" }, { k: "kaal", label: "Parva timeline — moons, eclipses & node events across ages", url: "https://kaalshodh.com/parva.html" }]
    },
    {
        id: "retrograde-motion", name: "Retrograde Motion", domain: "solar", level: 3,
        desc: "Planets occasionally loop backward against the stars for weeks. It puzzled astronomers for two millennia — it's a simple overtaking effect between orbiting worlds.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["planets-wanderers", "ecliptic-zodiac"],
        tools: [{ k: "gol", label: "Overtaking-orbits retrograde animation" }, { k: "web", label: "Chakra,  the Celestial Wheel — planetary motion patterns over time", url: "https://alokm.com/khagol/chakra.html" }, { k: "kaal", label: "Parva timeline — every retrograde period, past & future", url: "https://kaalshodh.com/parva.html" }]
    },
    {
        id: "heliocentric-model", name: "The Heliocentric Model", domain: "solar", level: 3,
        desc: "From Aristarchus and Aryabhata's rotating Earth to Copernicus and Galileo: putting the Sun at the centre explains retrograde loops and Venus's phases with one clean idea.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["retrograde-motion", "model-thinking"],
        tools: [{ k: "gol", label: "Geocentric vs heliocentric side-by-side" }, { k: "web", label: "Chakra,  the Celestial Wheel — geocentric vs heliocentric models", url: "https://alokm.com/khagol/chakra.html" }, { k: "kaal", label: "Mandala orrery — geocentric vs heliocentric Sun-Earth-Moon", url: "https://mandal.kaalshodh.com" }]
    },
    {
        id: "keplers-laws", name: "Kepler's Laws", domain: "solar", level: 4,
        desc: "Orbits are ellipses with the Sun at a focus; planets sweep equal areas in equal times; period squared tracks distance cubed. Three rules that turned astronomy quantitative.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["heliocentric-model"],
        tools: [{ k: "gol", label: "Equal-areas sweep animation" }, { k: "activity", label: "Draw an ellipse with two pins and a loop of string" }]
    },
    {
        id: "gravitation", name: "Universal Gravitation", domain: "solar", level: 4,
        desc: "Newton showed one inverse-square force explains falling apples, the Moon's orbit and Kepler's laws together. Gravity is the engine of everything astronomy studies.",
        tracks: ["school-high", "club"],
        prereqs: ["keplers-laws", "gravity-basics"],
        tools: [{ k: "gol", label: "Newton's cannonball thought experiment" }]
    },
    {
        id: "orbits-satellites", name: "Orbits & Artificial Satellites", domain: "solar", level: 4,
        desc: "An orbit is perpetual falling that keeps missing the ground. Speed and altitude set the orbit: ISS circles in 92 minutes, geostationary satellites hover over one longitude.",
        tracks: ["school-high", "club"],
        prereqs: ["gravitation"],
        tools: [{ k: "gol", label: "Orbital speed vs altitude sandbox" }, { k: "whatsup", label: "Track real satellites overhead" }]
    },
    {
        id: "tides", name: "Tides", domain: "solar", level: 3,
        desc: "The Moon pulls Earth's near side harder than its far side, raising two water bulges — hence two tides a day. Sun-Moon alignment makes spring tides; right angles make neaps.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["moon-orbit", "gravity-basics"],
        tools: [{ k: "gol", label: "Tidal bulge animation with Moon phases" }]
    },
    {
        id: "planetary-configurations", name: "Planetary Configurations", domain: "solar", level: 3,
        desc: "Opposition, conjunction, greatest elongation: the geometry words that say where a planet is relative to the Sun — and therefore when it rises and how bright it looks.",
        tracks: ["school-high", "club", "photo", "indic"],
        prereqs: ["heliocentric-model", "planets-wanderers"],
        tools: [{ k: "whatsup", label: "Current configurations and elongations" }, { k: "gol", label: "Configuration geometry animation" , url: "https://gol.kaalshodh.com/app#planets"}, { k: "web", label: "Chakra,  the Celestial Wheel — configurations as orbital geometry", url: "https://alokm.com/khagol/chakra.html" }, { k: "kaal", label: "Astro Events — transits, retrogrades & combustions by year", url: "https://kaalshodh.com/events.html" }]
    },
    {
        id: "phases-of-venus", name: "Phases of Venus", domain: "solar", level: 3,
        desc: "Venus shows Moon-like phases tied to its size: a small full disc far away, a large thin crescent nearby. Galileo's telescope made this the killer evidence for heliocentrism.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["planetary-configurations", "moon-phases"],
        tools: [{ k: "gol", label: "Venus phase-and-size cycle" }]
    },
    {
        id: "solar-system-inventory", name: "The Solar System Family", domain: "solar", level: 2,
        desc: "Eight planets, their moons, dwarf planets, asteroid belt and Kuiper belt — who's who, their order, and their wildly different sizes and characters.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: ["planets-wanderers"],
        tools: [{ k: "web", label: "Planet Days — rotation periods of all planets compared", url: "https://alokm.com/astro/planetdays.html" }]
    },
    {
        id: "scale-of-solar-system", name: "Scale of the Solar System", domain: "solar", level: 3,
        desc: "With Earth as a peppercorn, the Sun is a football 25 m away and Neptune is 750 m down the road. The emptiness is the real lesson; the AU is the ruler.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["heliocentric-model", "solar-system-inventory", "big-numbers", "maps-scale"],
        tools: [{ k: "activity", label: "Peppercorn solar-system walk across the school ground" }]
    },
    {
        id: "galilean-moons", name: "Galilean Moons", domain: "solar", level: 3,
        desc: "Jupiter's four big moons shuffle visibly from night to night — a miniature solar system in any small telescope, and Galileo's proof that not everything orbits Earth.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["solar-system-inventory"],
        tools: [{ k: "whatsup", label: "Tonight's Galilean moon positions" }, { k: "web", label: "Jovian Spiral — Galilean moon motion for the next 48 hours", url: "https://alokm.com/astro/jovian.html" }]
    },
    {
        id: "comets", name: "Comets", domain: "solar", level: 2,
        desc: "Dirty snowballs on long elliptical orbits that grow tails — always pointing away from the Sun — when sunlight boils their ices. Halley returns every 76 years.",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: ["solar-system-inventory"],
        tools: [{ k: "activity", label: "Follow a currently-visible comet: sketch its position and tail over several nights" }]
    },
    {
        id: "meteor-showers", name: "Meteors & Meteor Showers", domain: "solar", level: 2,
        desc: "Shooting stars are dust grains burning up 80–100 km overhead. When Earth crosses a comet's debris trail we get an annual shower, radiating from one point among the stars.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "photo"],
        prereqs: ["comets", "air-atmosphere"],
        tools: [{ k: "whatsup", label: "Next meteor shower dates" }, { k: "activity", label: "Group meteor count on a shower peak night" }]
    },
    {
        id: "asteroids-kuiper", name: "Asteroids & the Kuiper Belt", domain: "solar", level: 2,
        desc: "Rocky leftovers between Mars and Jupiter, icy ones beyond Neptune (Pluto's realm). Small-body surveys are one field where amateurs still make discoveries.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["solar-system-inventory"],
        tools: [{ k: "sky", label: "Find and track a bright asteroid (e.g. Vesta) against the stars over a week" }]
    },

    // ============================ LIGHT & OPTICS ============================
    {
        id: "light-travel", name: "Light & Lookback Time", domain: "light", level: 2,
        desc: "Light is fast but finite — 8 minutes from the Sun, 4 years from the nearest star. Every telescope is a time machine: we see objects as they were, not as they are.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["speed-distance-time"],
        tools: [{ k: "activity", label: "Light-delay role play: 'messages' walking across a scale solar system" }]
    },
    {
        id: "spectrum-color", name: "Spectrum & Colour", domain: "light", level: 3,
        desc: "White light is a mixture; a prism fans it into the spectrum, red to violet, each colour a different wavelength. Colour is the first physical measurement of starlight.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["light-travel", "rainbow-colors"],
        tools: [{ k: "activity", label: "Prism or CD-fragment spectroscope build" }]
    },
    {
        id: "em-spectrum", name: "Beyond Visible Light", domain: "light", level: 4,
        desc: "Radio, infrared, ultraviolet, X-ray, gamma — visible light is one octave of a vast keyboard. Each band needs its own telescope and reveals a different universe.",
        tracks: ["school-high", "club"],
        prereqs: ["spectrum-color"],
        tools: [{ k: "activity", label: "Compare an object's radio/IR/visible/X-ray images" }]
    },
    {
        id: "reflection-refraction", name: "Reflection & Refraction", domain: "light", level: 3,
        desc: "Mirrors bounce light by a fixed rule; glass bends it as it slows down. These two behaviours are the entire toolkit from which every telescope is built.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["light-travel"],
        tools: [{ k: "activity", label: "Laser + water tank refraction demo" }]
    },
    {
        id: "lenses-mirrors", name: "Lenses, Mirrors & Focal Length", domain: "light", level: 3,
        desc: "A curved lens or mirror gathers parallel starlight to a focus; the focal length sets image scale. Real images on a screen — this is where 'optics' becomes 'instrument'.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["reflection-refraction"],
        tools: [{ k: "activity", label: "Project the Sun or a window with a magnifier; measure focal length" }]
    },
    {
        id: "spectroscopy", name: "Spectroscopy", domain: "light", level: 4,
        desc: "Elements imprint fingerprint lines on a spectrum. From those lines alone we read a star's composition, temperature and motion — how we know what stars are made of.",
        tracks: ["school-high", "club"],
        prereqs: ["spectrum-color"],
        tools: [{ k: "activity", label: "View street-lamp and CFL spectra through a diffraction grating" }]
    },
    {
        id: "doppler-shift", name: "Doppler & Redshift", domain: "light", level: 4,
        desc: "Motion stretches or squeezes light waves: approaching sources shift blue, receding ones red. Measured in spectral lines, it gives speeds of stars and galaxies to high precision.",
        tracks: ["school-high", "club"],
        prereqs: ["spectroscopy", "waves-basics"],
        tools: [{ k: "activity", label: "Ambulance-siren analogy + real galaxy spectra" }]
    },

    // ======================= TELESCOPES & OBSERVING =======================
    {
        id: "dark-adaptation", name: "Dark Adaptation & Averted Vision", domain: "scope", level: 2,
        desc: "Eyes take 20–30 minutes to reach full night sensitivity, and one white-light glance resets them. Looking slightly beside a faint object uses your more sensitive off-centre retina.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["eye-at-night"],
        tools: [{ k: "activity", label: "Red-torch discipline on a star party; averted-vision test on a faint cluster" }]
    },
    {
        id: "binoculars", name: "Binocular Astronomy", domain: "scope", level: 2,
        desc: "A 7×50 binocular — 7× magnification, 50 mm objectives — shows Moon craters, Jupiter's moons and hundreds of clusters. The best first instrument, and many observers' favourite forever.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["constellations"],
        tools: [{ k: "activity", label: "Binocular tour: Moon, Pleiades, a Milky Way sweep" }]
    },
    {
        id: "telescope-designs", name: "Refractors & Reflectors", domain: "scope", level: 3,
        desc: "Refractors use a lens, reflectors a mirror, catadioptrics both. Each design trades cost, size, and image quality differently — there is no single 'best telescope'.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["lenses-mirrors"],
        tools: [{ k: "activity", label: "Strip-down demo of a Newtonian: follow the light path" }]
    },
    {
        id: "aperture", name: "Aperture & Light Grasp", domain: "scope", level: 3,
        desc: "Aperture is the diameter of the main lens or mirror — it decides how faint you can see and how fine you can resolve. Aperture, not magnification, is a telescope's true power.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["telescope-designs"],
        tools: [{ k: "activity", label: "Same object through 60 mm vs 200 mm scopes" }]
    },
    {
        id: "magnification-eyepieces", name: "Magnification & Eyepieces", domain: "scope", level: 3,
        desc: "Magnification = telescope focal length ÷ eyepiece focal length; swap eyepieces to change power. More is rarely better — the atmosphere and aperture set a useful ceiling.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["telescope-designs"],
        tools: [{ k: "activity", label: "Compute and verify powers for your eyepiece set" }]
    },
    {
        id: "focal-ratio", name: "Focal Ratio & Field of View", domain: "scope", level: 3,
        desc: "f-ratio (focal length ÷ aperture) sets how 'fast' the optics are and how wide a field you get. Slow scopes suit planets; fast ones frame star fields and nebulae.",
        tracks: ["club", "photo"],
        prereqs: ["aperture", "magnification-eyepieces"],
        tools: [{ k: "activity", label: "Compare Moon framing in an f/5 vs f/10 scope" }]
    },
    {
        id: "resolution-limit", name: "Resolution & the Airy Disc", domain: "scope", level: 4,
        desc: "Diffraction blurs every star into a tiny Airy disc; aperture sets the smallest detail resolvable (Dawes' limit). Why splitting close double stars needs inches, not power.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["aperture", "spectrum-color"],
        tools: [{ k: "activity", label: "Split test doubles of decreasing separation" }]
    },
    {
        id: "optical-aberrations", name: "Optical Aberrations", domain: "scope", level: 4,
        desc: "Chromatic fringes, coma's comet-shaped edge stars, field curvature — the systematic imperfections of real optics. Recognising them tells you what a scope (or photo) needs.",
        tracks: ["club", "photo"],
        prereqs: ["lenses-mirrors", "telescope-designs"],
        tools: [{ k: "activity", label: "Aberration spotting on a defocused bright star" }]
    },
    {
        id: "telescope-mounts", name: "Telescope Mounts", domain: "scope", level: 3,
        desc: "Alt-azimuth mounts move up/down and around — simple and intuitive. Equatorial mounts tilt one axis to the celestial pole so a single slow motion tracks the turning sky.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["telescope-designs", "diurnal-motion"],
        tools: [{ k: "activity", label: "Track the Moon on both mount types; feel the difference" }]
    },
    {
        id: "polar-alignment", name: "Polar Alignment", domain: "scope", level: 3,
        desc: "Pointing an equatorial mount's axis at the celestial pole, so one motor cancels Earth's spin. Rough alignment serves visual observing; imaging demands precision.",
        tracks: ["club", "photo"],
        prereqs: ["telescope-mounts", "pole-star", "compass-magnetism"],
        tools: [{ k: "activity", label: "Polar-scope alignment drill; drift check on a star" }]
    },
    {
        id: "collimation", name: "Collimation", domain: "scope", level: 4,
        desc: "Aligning a telescope's mirrors so all optical surfaces share one axis. A ten-minute tweak that separates a mediocre Newtonian from a sharp one.",
        tracks: ["club", "photo"],
        prereqs: ["telescope-designs"],
        tools: [{ k: "activity", label: "Collimate with a cap/laser, verify on a defocused star" }]
    },
    {
        id: "seeing-transparency", name: "Seeing & Transparency", domain: "scope", level: 3,
        desc: "Seeing is atmospheric steadiness (how much stars boil); transparency is clarity (how faint you can go). A hazy still night can beat a crisp windy one for planets.",
        tracks: ["club", "photo"],
        prereqs: ["stars-vary", "air-atmosphere"],
        tools: [{ k: "activity", label: "Log seeing (1–5) and limiting magnitude every session" }]
    },
    {
        id: "star-hopping", name: "Star Hopping", domain: "scope", level: 3,
        desc: "Navigating from a bright star to a faint target through chart-matched patterns, hop by hop. The craft skill that turns a chart reader into an observer.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["star-charts", "binoculars"],
        tools: [{ k: "sky", label: "Plan hops to tonight's targets" }, { k: "activity", label: "Hop from Vega to M57 or Saptarshi to M51" }]
    },
    {
        id: "catalogs-messier", name: "Messier & NGC Catalogues", domain: "scope", level: 3,
        desc: "Messier's 110 'not-comets' are the sky's greatest-hits list; the NGC adds 7,840 more. Catalogue numbers are the shared language of deep-sky observing.",
        tracks: ["club", "photo"],
        prereqs: ["star-charts"],
        tools: [{ k: "sky", label: "Which Messier objects are up tonight" }, { k: "activity", label: "Start a Messier logbook; attempt a spring Messier marathon" }]
    },
    {
        id: "lunar-observing", name: "Lunar Observing", domain: "scope", level: 2,
        desc: "Craters, maria, mountain shadows — the Moon is best along the terminator, where low sunlight throws relief into drama. Full moon is actually the flattest, worst time.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "photo"],
        prereqs: ["moon-phases", "binoculars"],
        tools: [{ k: "activity", label: "Sketch one crater on three nights as shadows move" }]
    },
    {
        id: "planetary-observing", name: "Planetary Observing", domain: "scope", level: 3,
        desc: "Jupiter's belts, Saturn's rings, Mars at opposition: small, bright targets that reward high power, steady seeing and a patient eye at the eyepiece.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["planets-wanderers", "magnification-eyepieces", "seeing-transparency"],
        tools: [{ k: "whatsup", label: "Best planet visibility windows" }]
    },
    {
        id: "deepsky-observing", name: "Deep-Sky Observing", domain: "scope", level: 3,
        desc: "Hunting clusters, nebulae and galaxies — faint, extended targets that want aperture, dark skies, low power and dark-adapted eyes. The 'faint fuzzies' that hooked every amateur.",
        tracks: ["club", "photo"],
        prereqs: ["catalogs-messier", "star-hopping", "aperture", "dark-adaptation"],
        tools: [{ k: "sky", label: "Tonight's deep-sky picks" }]
    },
    {
        id: "double-variable-stars", name: "Double & Variable Stars", domain: "scope", level: 4,
        desc: "Coloured double stars test optics and delight the eye; variable stars change brightness on the clock. Both offer structured observing programmes with real scientific value.",
        tracks: ["club"],
        prereqs: ["star-hopping", "apparent-magnitude"],
        tools: [{ k: "activity", label: "Estimate a Mira-type variable against comparison stars" }]
    },
    {
        id: "solar-observing", name: "Solar Observing (Safely)", domain: "scope", level: 3,
        desc: "NEVER look at the Sun without certified filters — projection and proper solar film show sunspots safely; hydrogen-alpha scopes reveal prominences. Safety protocol is the first lesson.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["telescope-designs", "sun-as-star"],
        tools: [{ k: "activity", label: "Eyepiece-projection sunspot count" }]
    },
    {
        id: "observing-log", name: "Observing Logs & Sketching", domain: "scope", level: 2,
        desc: "Date, time, sky conditions, instrument, and what you actually saw — a log turns stray sessions into a record of growth, and sketching trains the eye to see more.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["star-charts"],
        tools: [{ k: "activity", label: "Design a club log sheet; log every session for a month" }]
    },
    {
        id: "citizen-science", name: "Citizen Science", domain: "scope", level: 3,
        desc: "Variable-star estimates (AAVSO), occultation timings, meteor counts, comet hunting: organised programmes where amateur measurements feed real research.",
        tracks: ["club"],
        prereqs: ["observing-log"],
        tools: [{ k: "activity", label: "Submit one AAVSO estimate or occultation timing as a club" }]
    },

    // ===================== STARS, GALAXIES & COSMOS =====================
    {
        id: "sun-as-star", name: "The Sun is a Star", domain: "stars", level: 2,
        desc: "Our Sun is an ordinary star seen close-up — a million-km fusion furnace. Every night-sky star is a sun; many have their own planets.",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: ["stars-vary", "sun-energy"],
        tools: [{ k: "activity", label: "Scale comparison: Sun vs Betelgeuse vs Earth" }]
    },
    {
        id: "solar-activity", name: "Sunspots & Solar Activity", domain: "stars", level: 3,
        desc: "The Sun's magnetic weather: spots, flares and mass ejections rising and falling on an 11-year cycle. It drives aurorae and can rattle satellites and power grids.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["sun-as-star"],
        tools: [{ k: "activity", label: "Track a sunspot group across the disc for a week" }]
    },
    {
        id: "apparent-magnitude", name: "The Magnitude Scale", domain: "stars", level: 3,
        desc: "Astronomy's upside-down brightness scale: smaller numbers are brighter, and 5 magnitudes means 100×. Vega ≈ 0, faintest naked-eye stars ≈ +6, the Sun −26.7.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["stars-vary", "angular-measure"],
        tools: [{ k: "sky", label: "Compare catalogue magnitudes of stars you can see" }]
    },
    {
        id: "star-colors-temp", name: "Star Colours & Temperature", domain: "stars", level: 3,
        desc: "A star's colour is a thermometer reading: red ~3,000 K, yellow ~6,000 K, blue-white 10,000 K+. Hotter objects glow bluer — physics you can check with your own eyes.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["stars-vary", "spectrum-color", "temperature-heat"],
        tools: [{ k: "activity", label: "Rank Betelgeuse, Capella, Sirius, Rigel by temperature by eye" }]
    },
    {
        id: "stellar-parallax", name: "Stellar Parallax", domain: "stars", level: 4,
        desc: "Nearby stars shift minutely against the background as Earth orbits — the parallax that defines the parsec and anchors every distance in astronomy.",
        tracks: ["school-high", "club"],
        prereqs: ["angular-measure", "heliocentric-model"],
        tools: [{ k: "activity", label: "Thumb-blink parallax demo, then scale to real star shifts" }]
    },
    {
        id: "luminosity-absmag", name: "Luminosity & Absolute Magnitude", domain: "stars", level: 4,
        desc: "Apparent brightness mixes true output with distance; absolute magnitude removes distance (all stars imagined at 32.6 ly). Only then can stars be honestly compared.",
        tracks: ["school-high", "club"],
        prereqs: ["apparent-magnitude", "stellar-parallax", "inverse-square"],
        tools: [{ k: "activity", label: "Torch at 1 m vs 10 m: inverse-square in the classroom" }]
    },
    {
        id: "hr-diagram", name: "The H-R Diagram", domain: "stars", level: 4,
        desc: "Plot luminosity against temperature and stars fall into families: the main sequence, giants, white dwarfs. One scatter plot that encodes how stars live and die.",
        tracks: ["school-high", "club"],
        prereqs: ["luminosity-absmag", "star-colors-temp"],
        tools: [{ k: "activity", label: "Plot 30 bright stars from catalogue data" }]
    },
    {
        id: "nebulae-clusters", name: "Nebulae & Star Clusters", domain: "stars", level: 3,
        desc: "Glowing gas clouds where stars are born; open clusters of young siblings; ancient globular swarms of hundreds of thousands. The Milky Way's visible ecology.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["milky-way-band"],
        tools: [{ k: "sky", label: "Locate Orion Nebula, Pleiades, and a globular" }]
    },
    {
        id: "star-formation", name: "Star Birth", domain: "stars", level: 4,
        desc: "Cold gas clouds collapse under gravity, heat up, and ignite fusion. The Orion Nebula is a stellar nursery in action, visible in binoculars.",
        tracks: ["school-high", "club"],
        prereqs: ["nebulae-clusters", "gravitation"],
        tools: [{ k: "activity", label: "Infrared vs visible views of the same nursery" }]
    },
    {
        id: "stellar-evolution", name: "Lives of Stars", domain: "stars", level: 4,
        desc: "Stars balance gravity against fusion for millions to trillions of years, then swell to giants and die — gently as white dwarfs or violently as supernovae. Mass decides everything.",
        tracks: ["school-high", "club"],
        prereqs: ["hr-diagram", "star-formation"],
        tools: [{ k: "activity", label: "Sort star cards into an evolutionary sequence by mass" }]
    },
    {
        id: "supernovae-compact", name: "Supernovae, Neutron Stars & Black Holes", domain: "stars", level: 4,
        desc: "Massive stars end in explosions that briefly outshine galaxies, forging heavy elements and leaving city-sized neutron stars or black holes. Your iron came from one.",
        tracks: ["school-high", "club"],
        prereqs: ["stellar-evolution"],
        tools: [{ k: "activity", label: "Crab Nebula: match the 1054 CE record to today's remnant" }]
    },
    {
        id: "exoplanets", name: "Exoplanets", domain: "stars", level: 4,
        desc: "Thousands of planets found around other stars — mostly by transit dips and Doppler wobbles. Amateur photometry can detect hot-Jupiter transits from a backyard.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["keplers-laws", "doppler-shift"],
        tools: [{ k: "activity", label: "Analyse a real transit light curve" }]
    },
    {
        id: "lightyear-scale", name: "Light Years & Cosmic Scale", domain: "stars", level: 3,
        desc: "The nearest star is 4.2 light years away — 7,000× farther than Neptune. Grasping the jump from solar-system scale to interstellar scale is a rite of passage.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["light-travel", "scale-of-solar-system", "big-numbers"],
        tools: [{ k: "activity", label: "If the Sun were in Bhopal, where is Alpha Centauri?" }]
    },
    {
        id: "milky-way-structure", name: "Structure of the Milky Way", domain: "stars", level: 4,
        desc: "A barred spiral of 100–400 billion stars, 100,000 ly across, with us in a quiet arm 27,000 ly out. The naked-eye band is our inside view of the disc.",
        tracks: ["school-high", "club"],
        prereqs: ["milky-way-band", "nebulae-clusters", "lightyear-scale"],
        tools: [{ k: "activity", label: "Map naked-eye band features onto a galaxy diagram" }]
    },
    {
        id: "galaxies", name: "Galaxies", domain: "stars", level: 4,
        desc: "Islands of billions of stars — spirals, ellipticals, irregulars — separated by millions of light years. Andromeda, our giant neighbour, is faintly visible to the naked eye.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["milky-way-structure"],
        tools: [{ k: "sky", label: "Find M31 by naked eye or binoculars" }]
    },
    {
        id: "hubble-expansion", name: "The Expanding Universe", domain: "stars", level: 5,
        desc: "Nearly every galaxy's light is redshifted, and farther means faster — space itself is stretching. Run the film backward and the universe had a beginning.",
        tracks: ["school-high", "club"],
        prereqs: ["galaxies", "doppler-shift"],
        tools: [{ k: "activity", label: "Inflate a dotted balloon: every dot recedes from every other" }]
    },
    {
        id: "bigbang-cosmology", name: "Big Bang & Cosmic History", domain: "stars", level: 5,
        desc: "13.8 billion years from a hot dense start: relic microwave glow, primordial hydrogen and helium, and the growth of galaxies all tell one consistent story.",
        tracks: ["school-high", "club"],
        prereqs: ["hubble-expansion"],
        tools: [{ k: "activity", label: "Cosmic history on a 1-year calendar (Sagan style)" }]
    },
    {
        id: "distance-ladder", name: "The Cosmic Distance Ladder", domain: "stars", level: 5,
        desc: "Parallax calibrates nearby stars, Cepheid pulsators reach nearby galaxies, supernovae reach across the universe — each rung standing on the one below.",
        tracks: ["club"],
        prereqs: ["stellar-parallax", "hr-diagram", "galaxies", "variable-stars"],
        tools: [{ k: "activity", label: "Build the ladder as a chain of scaling arguments" }]
    },

    // ============================ ASTROPHOTOGRAPHY ============================
    {
        id: "exposure-triangle", name: "Exposure: Aperture, Shutter, ISO", domain: "astro", level: 3,
        desc: "Three controls set how much light a camera records and how noisy it looks. At night you run all three near their limits — astrophotography is exposure at the extreme.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["lenses-mirrors"],
        tools: [{ k: "activity", label: "Same night scene at 5 exposure settings; compare" }]
    },
    {
        id: "histogram-reading", name: "Reading the Histogram", domain: "astro", level: 3,
        desc: "The histogram is the only honest exposure meter at night — the LCD preview lies. Expose so the sky peak sits clear of the left wall without clipping stars.",
        tracks: ["club", "photo"],
        prereqs: ["exposure-triangle"],
        tools: [{ k: "activity", label: "Deliberately under/over-expose; read the damage in histograms" }]
    },
    {
        id: "camera-sensors", name: "How Sensors Work", domain: "astro", level: 4,
        desc: "Pixels convert photons to electrons; quantum efficiency, pixel size, full-well depth and read noise decide astro performance. Why cooled mono cameras exist.",
        tracks: ["photo", "club"],
        prereqs: ["exposure-triangle"],
        tools: [{ k: "activity", label: "Compare spec sheets: DSLR vs dedicated astro camera" }]
    },
    {
        id: "image-scale", name: "Image Scale & Sampling", domain: "astro", level: 4,
        desc: "Arcseconds per pixel = 206 × pixel size (µm) ÷ focal length (mm). Match sampling to seeing: oversample and you waste light, undersample and stars turn to squares.",
        tracks: ["photo"],
        prereqs: ["camera-sensors", "angular-measure", "focal-ratio"],
        tools: [{ k: "activity", label: "Compute image scale for every camera+scope combo you own" }]
    },
    {
        id: "phone-astrophotography", name: "Smartphone Astrophotography", domain: "astro", level: 2,
        desc: "A phone held (or bracketed) at the eyepiece captures the Moon and planets; night modes catch constellations and even the Milky Way. The zero-cost gateway to imaging.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["lunar-observing"],
        tools: [{ k: "activity", label: "Phone-at-eyepiece Moon shot on a club night" }]
    },
    {
        id: "nightscapes", name: "Nightscape Photography", domain: "astro", level: 3,
        desc: "Wide-angle sky-over-landscape shots from a fixed tripod. The NPF/500 rule caps exposure before stars trail — beyond it, you need tracking.",
        tracks: ["club", "photo"],
        prereqs: ["exposure-triangle", "diurnal-motion"],
        tools: [{ k: "activity", label: "Milky Way nightscape: 20 s, f/2.8, ISO 3200 starting point" }]
    },
    {
        id: "star-trail-imaging", name: "Star Trail Photography", domain: "astro", level: 3,
        desc: "Stack hundreds of fixed-tripod frames and stars draw arcs around the celestial pole — diurnal motion made visible and beautiful in one image.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["nightscapes", "pole-star"],
        tools: [{ k: "activity", label: "2-hour trail stack centred on Polaris" }]
    },
    {
        id: "tracking-imaging", name: "Tracked Imaging", domain: "astro", level: 4,
        desc: "A motorised equatorial mount turns at sidereal rate, holding stars still through minutes-long exposures. Polar alignment quality now directly limits exposure length.",
        tracks: ["photo", "club"],
        prereqs: ["polar-alignment", "nightscapes", "sidereal-day"],
        tools: [{ k: "activity", label: "Untracked vs 2-minute tracked frame of the same field" }]
    },
    {
        id: "snr-noise", name: "Signal, Noise & SNR", domain: "astro", level: 4,
        desc: "Shot noise, read noise, thermal noise versus faint signal: every astro-imaging decision — exposure length, ISO, cooling, stacking — is an SNR calculation in disguise.",
        tracks: ["photo"],
        prereqs: ["camera-sensors"],
        tools: [{ k: "activity", label: "Single frame vs 16-frame stack: measure the noise drop" }]
    },
    {
        id: "calibration-frames", name: "Darks, Flats & Bias", domain: "astro", level: 4,
        desc: "Dark frames map thermal signal, flats map dust and vignetting, bias maps readout offset. Calibration subtracts the camera's own fingerprints from your data.",
        tracks: ["photo"],
        prereqs: ["snr-noise"],
        tools: [{ k: "activity", label: "Shoot a calibration library; compare calibrated vs raw stacks" }]
    },
    {
        id: "stacking", name: "Image Stacking", domain: "astro", level: 4,
        desc: "Averaging N aligned frames cuts noise by √N while signal stays put — the single most powerful trick in astrophotography. Software: DeepSkyStacker, Siril, AutoStakkert.",
        tracks: ["photo", "club"],
        prereqs: ["snr-noise", "histogram-reading"],
        tools: [{ k: "app", label: "Siril / DeepSkyStacker stacking session" }]
    },
    {
        id: "planetary-imaging", name: "Planetary & Lunar Imaging", domain: "astro", level: 4,
        desc: "Shoot thousands of video frames, keep the sharpest fraction, stack and sharpen — 'lucky imaging' freezes moments of steady air and beats the seeing.",
        tracks: ["photo", "club"],
        prereqs: ["planetary-observing", "stacking", "seeing-transparency"],
        tools: [{ k: "app", label: "AutoStakkert + wavelet sharpening on Jupiter video" }]
    },
    {
        id: "dso-imaging", name: "Deep-Sky Imaging", domain: "astro", level: 5,
        desc: "Hours of tracked, calibrated sub-exposures on nebulae and galaxies. The full pipeline: acquire, calibrate, register, integrate — where all imaging threads converge.",
        tracks: ["photo"],
        prereqs: ["tracking-imaging", "stacking", "calibration-frames", "deepsky-observing"],
        tools: [{ k: "app", label: "First DSO project: Orion Nebula, 30×2 min" }]
    },
    {
        id: "autoguiding", name: "Autoguiding", domain: "astro", level: 5,
        desc: "A small second camera watches a star and nudges the mount every few seconds, correcting drive errors. It stretches exposures from one minute to as long as you like.",
        tracks: ["photo"],
        prereqs: ["tracking-imaging"],
        tools: [{ k: "app", label: "PHD2 guiding setup and calibration" }]
    },
    {
        id: "narrowband-filters", name: "Filters & Narrowband", domain: "astro", level: 5,
        desc: "Nebulae emit at specific wavelengths (Hα, OIII, SII); narrowband filters pass only those slices, defeating light pollution and even moonlight. The Hubble palette is three such channels.",
        tracks: ["photo"],
        prereqs: ["dso-imaging", "spectroscopy"],
        tools: [{ k: "activity", label: "Broadband vs Hα of the same nebula from town" }]
    },
    {
        id: "post-processing", name: "Post-Processing", domain: "astro", level: 5,
        desc: "Stretching, gradient removal, colour calibration, noise control — developing the stacked data into a finished image. Half the craft happens after the telescope is packed.",
        tracks: ["photo"],
        prereqs: ["stacking"],
        tools: [{ k: "app", label: "Siril/GIMP or PixInsight stretch-and-finish workflow" }]
    },

    // =========================== INDIAN ASTRONOMY ===========================
    {
        id: "indian-star-names", name: "Indian Star & Constellation Names", domain: "indic", level: 2,
        desc: "Dhruva (Polaris), Saptarshi (the Big Dipper), Arundhati–Vasishtha (the Mizar–Alcor pair), Rohini (Aldebaran), Chitra (Spica): the Indian sky map atop the same stars.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: ["constellations", "pole-star"],
        tools: [{ k: "sky", label: "Match Indian names to IAU constellations tonight" }, { k: "android", label: "Indian Sky Map — planetarium with Indian constellations", url: "https://play.google.com/store/apps/details?id=com.alokm.android.stardroid" }, { k: "kaal", label: "Lunapedia — cultural names of the Moon and its path", url: "https://kaalshodh.com/lunapedia.html" }]
    },
    {
        id: "nakshatra", name: "The 27 Nakshatras", domain: "indic", level: 3,
        desc: "The ecliptic divided into 27 lunar mansions of 13°20′ each — one for each day of the Moon's sidereal circuit, each anchored to a marker star (yogatara).",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["ecliptic-zodiac", "moon-orbit"],
        tools: [{ k: "sky", label: "Find today's nakshatra and its yogatara" }, { k: "gol", label: "Moon stepping through nakshatras" , url: "https://gol.kaalshodh.com/app#panchang"}, { k: "android", label: "Indian Sky Map — nakshatra divisions on the live sky", url: "https://play.google.com/store/apps/details?id=com.alokm.android.stardroid" }]
    },
    {
        id: "tithi", name: "Tithi: the Lunar Day", domain: "indic", level: 3,
        desc: "A tithi is the time the Moon gains 12° on the Sun — 30 tithis from new moon to new moon. Being angle-based, tithis stretch and shrink; a date can even skip one.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["moon-phases"],
        tools: [{ k: "gol", label: "Tithi as Sun–Moon angle animation" , url: "https://gol.kaalshodh.com/app#panchang"}, { k: "activity", label: "Compute tonight's tithi from Sun–Moon positions" }, { k: "android", label: "Hindu Calendar — daily tithi and lunar month", url: "https://play.google.com/store/apps/details?id=com.alokmandavgane.hinducalendar" }]
    },
    {
        id: "panchanga", name: "Panchanga: Five Limbs", domain: "indic", level: 3,
        desc: "The traditional almanac's five daily elements — vara (weekday), tithi, nakshatra, yoga, karana — each a different function of Sun and Moon longitudes. An ephemeris in cultural form.",
        tracks: ["club", "indic"],
        prereqs: ["tithi", "nakshatra"],
        tools: [{ k: "activity", label: "Decode today's panchanga entry element by element" }, { k: "android", label: "Hindu Calendar — full panchang with muhurtas & kundali", url: "https://play.google.com/store/apps/details?id=com.alokmandavgane.hinducalendar" }, { k: "web", label: "hinducalendar.app — simplified online panchang (Ujjain)", url: "https://hinducalendar.app" }, { k: "gol", label: "Gol Panchang scene — the five limbs from live Sun & Moon", url: "https://gol.kaalshodh.com/app#panchang" }, { k: "kaal", label: "Kalganana — how the Panchang is computed from Sun & Moon", url: "https://kaalshodh.com/kaalganana.html" }]
    },
    {
        id: "rashi", name: "The 12 Rashis", domain: "indic", level: 3,
        desc: "The ecliptic cut into twelve 30° signs — Mesha through Meena — paralleling the Greek zodiac. In Indian usage the rashis stay fixed to the stars (sidereal), not the seasons.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["ecliptic-zodiac"],
        tools: [{ k: "sky", label: "Which rashi is the Sun actually in today?" }, { k: "web", label: "Bhagol,  the Celestial Map — zodiac signs on the live sky", url: "https://alokm.com/khagol/bhagol.html" }, { k: "web", label: "Lagna — ascendant rashi & midheaven vs latitude", url: "https://alokm.com/astro/lagna.html" }, { k: "gol", label: "Gol Lagna Rashi scene — the rising sign on the live sky", url: "https://gol.kaalshodh.com/app#lagna-rashi" }, { k: "kaal", label: "Lagna Rashi Map — world map of places sharing a rising sign", url: "https://kaalshodh.com/lagna-map.html" }, { k: "kaal", label: "Kumbh Mela — periods from Surya-Guru rashi alignment", url: "https://kaalshodh.com/kumbhmela.html" }]
    },
    {
        id: "sankranti-ritu", name: "Sankranti, Ayana & the Six Ritus", domain: "indic", level: 3,
        desc: "Sankranti marks the Sun entering a new rashi; Uttarayana and Dakshinayana are its northward and southward half-year journeys; six ritus divide the Indian seasonal year.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["equinox-solstice", "rashi"],
        tools: [{ k: "activity", label: "Map festivals (Makar Sankranti, Pongal) to solar events" }, { k: "kaal", label: "Parva timeline — sankrantis & solar events across millennia", url: "https://kaalshodh.com/parva.html" }]
    },
    {
        id: "indian-calendar", name: "Indian Lunisolar Calendars", domain: "indic", level: 4,
        desc: "Vikram and Shaka calendars run lunar months within a solar year, inserting an adhika masa (extra month) roughly every 32.5 months to stay season-true — astronomy as living law.",
        tracks: ["club", "indic"],
        prereqs: ["panchanga", "calendar-systems", "sankranti-ritu"],
        tools: [{ k: "activity", label: "Find the last adhika masa and explain why it fell there" }, { k: "android", label: "Hindu Calendar — Vikram/Shaka dates & adhika masa", url: "https://play.google.com/store/apps/details?id=com.alokmandavgane.hinducalendar" }, { k: "kaal", label: "Adhik & Kshay Maas — extra and lost months across millennia", url: "https://kaalshodh.com/adhikmaas.html" }]
    },
    {
        id: "ayanamsa", name: "Ayanamsa: Sidereal vs Tropical", domain: "indic", level: 4,
        desc: "Precession has slid the seasonal (tropical) zodiac ~24° from the fixed-star (sidereal) zodiac since they aligned. That offset — the ayanamsa — is why Makar Sankranti is no longer on the solstice.",
        tracks: ["club", "indic"],
        prereqs: ["precession", "rashi", "sankranti-ritu"],
        tools: [{ k: "gol", label: "Two zodiacs drifting apart over centuries" }, { k: "kaal", label: "Sayan vs Nirayan — tropical vs sidereal month names compared", url: "https://kaalshodh.com/sayannirayan.html" }]
    },
    {
        id: "rahu-ketu", name: "Rahu & Ketu: the Nodes", domain: "indic", level: 4,
        desc: "The 'shadow planets' of Indian astronomy are the Moon's ascending and descending nodes — precisely where eclipses occur. Myth and orbital mechanics describing the same two points.",
        tracks: ["club", "indic"],
        prereqs: ["eclipse-seasons"],
        tools: [{ k: "gol", label: "Node positions vs eclipse dates" }]
    },
    {
        id: "ghati-muhurta", name: "Ghati, Muhurta & Indian Timekeeping", domain: "indic", level: 3,
        desc: "The day divided into 60 ghatis (24 min) and 30 muhurtas (48 min), measured by water clocks and gnomons. A complete sexagesimal time system predating hours and minutes here.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["shadow-clock"],
        tools: [{ k: "activity", label: "Build a ghati-yantra (sinking-bowl water clock)" }, { k: "web", label: "Hindu Time — live ishta kaal clock in ghati-pal-vipal", url: "https://hinducalendar.app/time" }]
    },
    {
        id: "aryabhata-work", name: "Aryabhata's Astronomy", domain: "indic", level: 3,
        desc: "In 499 CE Aryabhata taught that Earth rotates, gave π to four decimals, built sine tables, and explained eclipses by shadows — not demons. The namesake of this foundation.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["diurnal-motion", "lunar-eclipse"],
        tools: [{ k: "activity", label: "Read and unpack two verses of the Aryabhatiya" }, { k: "web", label: "Aryabhatiya Number System — Devanagari numeral encoding", url: "https://alokm.com/khagol/aryabhat/aryabhatns.html" }, { k: "web", label: "Dashagitika — chapter 1 of the Aryabhatiya,  verse by verse", url: "https://alokm.com/khagol/aryabhat/dashgitika.html" }, { k: "web", label: "Golapada — chapter 4: spherical astronomy & eclipses", url: "https://alokm.com/khagol/aryabhat/golapada.html" }]
    },
    {
        id: "siddhantic-astronomy", name: "Siddhantic Astronomy", domain: "indic", level: 4,
        desc: "The Surya Siddhanta and its successors: epicycle models, planetary mean motions and eclipse computation refined over a millennium by Varahamihira, Brahmagupta and Bhaskara.",
        tracks: ["club", "indic"],
        prereqs: ["aryabhata-work", "panchanga"],
        tools: [{ k: "activity", label: "Compare a Siddhanta planetary period with the modern value" }, { k: "web", label: "Dashagitika — fundamental astronomical parameters in 13 verses", url: "https://alokm.com/khagol/aryabhat/dashgitika.html" }, { k: "kaal", label: "Siddhantic Comparison — Surya Siddhanta, Aryabhatiya & Siddhanta Shiromani vs JPL", url: "https://kaalshodh.com/siddhantic.html" }]
    },
    {
        id: "indian-instruments", name: "Traditional Instruments", domain: "indic", level: 3,
        desc: "Shanku (gnomon), ghati yantra (water clock), chakra yantra (graduated ring) and the astrolabe: pre-telescopic instruments that measured time and angle to surprising precision.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["shadow-clock", "angular-measure"],
        tools: [{ k: "activity", label: "Build a shanku and derive latitude from noon shadow" }, { k: "web", label: "Shanku Yantra generator — a shanku for any place", url: "https://alokm.com/astro/shanku.html" }, { k: "web", label: "Sashtamsa Yantra — day of year,  declination & zenith distance", url: "https://alokm.com/astro/sashthamsa.html" }, { k: "gol", label: "Gol Astrolabe — the celestial sphere flattened to a brass disk", url: "https://gol.kaalshodh.com/astrolabe" }]
    },
    {
        id: "jantar-mantar", name: "Jantar Mantar Observatories", domain: "indic", level: 3,
        desc: "Jai Singh II's giant masonry instruments (1720s) — the Samrat Yantra sundial reads time to 2 seconds. Architecture-scale astronomy you can still walk through in Jaipur and Delhi.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["indian-instruments", "meridian-transit"],
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
        tools: [{ k: "activity", label: "Compare a star and a planet low vs high in the sky on one night" }]
    },
    {
        id: "atmospheric-refraction", name: "Atmospheric Refraction", domain: "sky", level: 3,
        desc: "Air bends light downward, lifting objects near the horizon by half a degree — the setting Sun you watch has geometrically already set, and its disc squashes into an oval.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["sun-daily-arc", "reflection-refraction", "air-atmosphere"],
        tools: [{ k: "activity", label: "Photograph the flattened setting Sun; measure the squash" }, { k: "web", label: "True Equinox — why equal day-night misses the equinox date", url: "https://alokm.com/astro/equinox.html" }]
    },
    {
        id: "moon-illusion", name: "The Moon Illusion", domain: "sky", level: 2,
        desc: "The horizon Moon looks huge but measures exactly the same half-degree as the overhead Moon — the enlargement happens in your brain, not in the sky. A camera proves it.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: ["moon-observation", "angular-measure"],
        tools: [{ k: "activity", label: "Measure the rising and overhead Moon with the same coin at arm's length" }]
    },
    {
        id: "earthshine", name: "Earthshine", domain: "sky", level: 2,
        desc: "The ghostly glow filling the dark part of a crescent Moon is sunlight reflected off Earth — 'the old Moon in the new Moon's arms'. You are seeing our planet light another world.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["moon-phases"],
        tools: [{ k: "activity", label: "Spot and photograph earthshine on a 2–3 day old crescent" }]
    },
    {
        id: "halos-coronae", name: "Halos & Coronae", domain: "sky", level: 2,
        desc: "A big 22° ring around the Moon or Sun is a halo from ice crystals; a small rainbow-fringed disc hugging the Moon is a corona from water droplets. Free atmospheric optics, often before rain.",
        tracks: ["school-primary", "school-middle", "club", "photo"],
        prereqs: ["moon-observation"],
        tools: [{ k: "activity", label: "Halo watch: verify the ring's radius with an outstretched hand" }]
    },
    {
        id: "zodiacal-light", name: "Zodiacal Light", domain: "sky", level: 3,
        desc: "A faint cone of light along the ecliptic after dusk or before dawn — sunlight scattered by interplanetary dust. A genuine dark-sky trophy for naked-eye observers.",
        tracks: ["club", "photo"],
        prereqs: ["ecliptic-zodiac", "light-pollution"],
        tools: [{ k: "activity", label: "Hunt the zodiacal light from a Bortle 1–3 site in Feb–Mar evenings" }]
    },
    {
        id: "aurora", name: "Aurorae", domain: "sky", level: 3,
        desc: "Solar-wind particles funnelled down Earth's magnetic field make the upper air glow in curtains of green and red. Strong storms have pushed aurorae as far south as Ladakh.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["solar-activity"],
        tools: [{ k: "activity", label: "Track a solar storm's Kp index and aurora alerts in real time" }]
    },
    {
        id: "twilight-phases", name: "The Three Twilights", domain: "sky", level: 2,
        desc: "Civil, nautical and astronomical twilight mark the Sun 6°, 12° and 18° below the horizon. Real darkness — and deep-sky observing — begins only after astronomical twilight ends.",
        tracks: ["school-middle", "club", "photo"],
        prereqs: ["sun-daily-arc"],
        tools: [{ k: "whatsup", label: "Tonight's twilight end and start times" }, { k: "android", label: "Sunrise Sunset — twilight timings for your location", url: "https://play.google.com/store/apps/details?id=com.alokmandavgane.sunrisesunset" }]
    },
    {
        id: "asterisms", name: "Asterisms", domain: "sky", level: 1,
        desc: "Popular star patterns that aren't official constellations — the Big Dipper is part of Ursa Major, the Summer Triangle spans three constellations. The sky's informal landmarks.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: ["constellations"],
        tools: [{ k: "sky", label: "Find the Big Dipper, Summer Triangle, and Orion's Belt" }]
    },
    {
        id: "star-names", name: "Star Names & Bayer Letters", domain: "sky", level: 2,
        desc: "Bright stars carry ancient proper names (many Arabic: Aldebaran, Deneb); astronomers label stars α, β, γ by brightness within each constellation. Two naming systems, one sky.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["constellations"],
        tools: [{ k: "sky", label: "Decode α Orionis, β Persei and other Bayer names on the chart" }]
    },
    {
        id: "morning-evening-star", name: "Morning & Evening Stars", domain: "sky", level: 2,
        desc: "Venus and Mercury never stray far from the Sun, appearing only near dawn or dusk — the same Venus is 'evening star' for months, then switches to the morning sky.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: ["planets-wanderers"],
        tools: [{ k: "whatsup", label: "Where is Venus this month — morning or evening?" }]
    },
    {
        id: "heliacal-rising", name: "Heliacal Rising", domain: "sky", level: 3,
        desc: "The first dawn on which a star reappears from the Sun's glare after weeks of invisibility. Ancient calendars worldwide — Egyptian, Vedic, Tamil — ran on such risings.",
        tracks: ["club", "indic"],
        prereqs: ["seasonal-skies"],
        tools: [{ k: "activity", label: "Catch the heliacal rising of Krittika (Pleiades) or Agastya (Canopus)" }]
    },

    // ---------------- Sphere & motion: position, navigation, slow drifts ----------------
    {
        id: "latitude-sky", name: "Sky from Different Latitudes", domain: "sphere", level: 3,
        desc: "At the equator every star rises and sets vertically; at the poles nothing rises or sets at all. Your latitude completely decides which sky you own — Canopus for Chennai, none for London.",
        tracks: ["school-high", "club"],
        prereqs: ["pole-star", "celestial-sphere", "latitude-longitude"],
        tools: [{ k: "gol", label: "Drag latitude and watch the sky's tilt change" }, { k: "web", label: "iso Rise Set — every place where an object rises or sets together", url: "https://alokm.com/astro/isoriseset.html" }]
    },
    {
        id: "celestial-navigation", name: "Celestial Navigation", domain: "sphere", level: 3,
        desc: "Polaris's altitude gives latitude; a star's measured height and exact time give a position line. How sailors crossed oceans for centuries with a sextant and an almanac.",
        tracks: ["school-high", "club"],
        prereqs: ["pole-star", "angular-measure"],
        tools: [{ k: "activity", label: "Build a quadrant from a protractor and find your latitude tonight" }]
    },
    {
        id: "proper-motion", name: "Proper Motion", domain: "sphere", level: 4,
        desc: "Stars really do move — Barnard's Star crosses a Moon-width in 180 years, and in 50,000 years the Big Dipper will be bent. 'Fixed stars' is only true on human timescales.",
        tracks: ["school-high", "club"],
        prereqs: ["equatorial-coords"],
        tools: [{ k: "activity", label: "Morph the Big Dipper from 100,000 BCE to 100,000 CE with real data" }]
    },
    {
        id: "lunar-libration", name: "Lunar Libration", domain: "scope", level: 4,
        desc: "The Moon rocks gently side-to-side and up-and-down as it orbits, letting us peek around its edges — 59% of the surface is visible over time, not just 50%.",
        tracks: ["club", "photo"],
        prereqs: ["tidal-locking", "lunar-observing"],
        tools: [{ k: "activity", label: "Photograph Mare Crisium's distance from the limb across a month" }]
    },

    // ---------------- Time: applied & historical ----------------
    {
        id: "sundial-design", name: "Building Sundials", domain: "time", level: 3,
        desc: "A sundial's gnomon must parallel Earth's axis — tilted at your latitude, aimed at the pole. Get that right and horizontal, vertical or equatorial dials all read true.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["shadow-clock", "seasons"],
        tools: [{ k: "activity", label: "Build a cardboard equatorial sundial for your latitude" }, { k: "web", label: "Human Sundial — analemmatic sundial template for any location", url: "https://alokm.com/astro/human_sundial.html" }]
    },
    {
        id: "leap-years", name: "Leap Years & Calendar Reform", domain: "time", level: 3,
        desc: "The year is 365.2422 days — the awkward .2422 forced leap days, the skipped centuries rule, and the 1582 Gregorian reform that deleted ten days from October.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["calendar-systems"],
        tools: [{ k: "activity", label: "Work out why 1900 wasn't a leap year but 2000 was" }]
    },
    {
        id: "seven-day-week", name: "Vara & the 7-Day Week", domain: "time", level: 3,
        desc: "The week comes from the seven classical 'planets' ruling hours in rotation — Ravivar/Sunday to Shanivar/Saturday match across India, Rome and Babylon. Astronomy fossilised in every calendar.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["planets-wanderers"],
        tools: [{ k: "activity", label: "Derive the weekday order from the planetary-hours rule" }]
    },
    {
        id: "julian-day", name: "The Julian Day Count", domain: "time", level: 4,
        desc: "Astronomers number days continuously from 4713 BCE — no months, no leap confusion. Variable-star observers and eclipse computers live on JD arithmetic.",
        tracks: ["club", "photo"],
        prereqs: ["calendar-systems"],
        tools: [{ k: "activity", label: "Compute today's JD by hand, verify with an ephemeris" }, { k: "kaal", label: "Ahargana — the Indian continuous day-count from Kaliyuga", url: "https://kaalshodh.com/ahargana.html" }]
    },
    {
        id: "almanac-reading", name: "Reading an Ephemeris", domain: "time", level: 3,
        desc: "An ephemeris tabulates where everything is, when: RA/Dec of planets, rise/set times, phases, events. Learning to read one turns forecasts into plans.",
        tracks: ["club", "indic"],
        prereqs: ["equatorial-coords"],
        tools: [{ k: "whatsup", label: "Cross-check tonight's planet positions against an almanac" }, { k: "kaal", label: "Ephemeris — rise/set, phases & sidereal Navagraha longitudes", url: "https://kaalshodh.com/ephemeris.html" }]
    },

    // ---------------- Solar system: surfaces, events, spacecraft ----------------
    {
        id: "lunar-geology", name: "Craters & Maria", domain: "solar", level: 2,
        desc: "The Moon's dark 'seas' are ancient lava plains; its craters are asteroid scars, preserved for billions of years with no air or water to erase them. The face of the Moon is a history book.",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: ["moon-observation"],
        tools: [{ k: "activity", label: "Crater experiment: drop stones into flour + cocoa at different speeds" }]
    },
    {
        id: "impact-craters", name: "Impacts on Earth", domain: "solar", level: 3,
        desc: "Earth gets hit too — Lonar Lake in Maharashtra is a 50,000-year-old impact crater, and the dinosaurs met a 10-km asteroid. Erosion, not luck, hides our scars.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["asteroids-kuiper", "lunar-geology"],
        tools: [{ k: "activity", label: "Case study: Lonar crater — map, rock evidence, age" }]
    },
    {
        id: "occultations", name: "Occultations", domain: "scope", level: 4,
        desc: "The Moon or an asteroid slides in front of a star, switching it off like a lamp. Timing these disappearances measures positions, shapes of asteroids, even discovers rings.",
        tracks: ["club"],
        prereqs: ["moon-orbit", "star-hopping"],
        tools: [{ k: "whatsup", label: "Upcoming lunar occultations of bright stars" }, { k: "activity", label: "Time a disappearance at the Moon's dark limb to 0.1 s" }, { k: "android", label: "Sat Timer — precise satellite time for occultation timing", url: "https://play.google.com/store/apps/details?id=com.alokm.sattimer" }]
    },
    {
        id: "planetary-transits", name: "Transits of Mercury & Venus", domain: "solar", level: 4,
        desc: "Rarely, an inner planet crosses the Sun's face as a crawling black dot. Venus transits (last: 2012, next: 2117) once gave humanity its first measure of the solar system's true size.",
        tracks: ["school-high", "club"],
        prereqs: ["planetary-configurations", "solar-observing"],
        tools: [{ k: "activity", label: "How the 1761/69 Venus transits measured the AU — re-run the geometry" }]
    },
    {
        id: "saturn-rings", name: "Rings of Saturn", domain: "solar", level: 3,
        desc: "A sheet of ice chunks thinner, in proportion, than paper — spanning 280,000 km. The rings tilt through a 29-year cycle and vanish edge-on, as they did for Galileo.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "photo"],
        prereqs: ["solar-system-inventory"],
        tools: [{ k: "whatsup", label: "Current ring tilt and best viewing months" }]
    },
    {
        id: "meteorites", name: "Meteorites", domain: "solar", level: 3,
        desc: "Space rocks that survive the fall: stony chondrites older than Earth, iron cores of shattered planetesimals. Each is a free sample from the solar system's construction site.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["meteor-showers"],
        tools: [{ k: "activity", label: "Test a candidate rock: magnet, density, fusion crust checklist" }]
    },
    {
        id: "lagrange-points", name: "Lagrange Points", domain: "solar", level: 5,
        desc: "Five gravitational parking spots where a small body can hold station with two big ones. India's Aditya-L1 watches the Sun from L1; JWST observes from L2.",
        tracks: ["school-high", "club"],
        prereqs: ["orbits-satellites"],
        tools: [{ k: "activity", label: "Map the five points for the Sun–Earth system; place real missions" }]
    },
    {
        id: "space-missions-india", name: "India in Space", domain: "solar", level: 2,
        desc: "Chandrayaan-3 landed at the lunar south pole, Mangalyaan orbited Mars on a first attempt, Aditya-L1 stares at the Sun, AstroSat scans the X-ray sky — and Gaganyaan comes next.",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: ["solar-system-inventory"],
        tools: [{ k: "activity", label: "Mission timeline wall: plot every ISRO science mission" }]
    },

    // ---------------- Light & instruments: finer physics ----------------
    {
        id: "inverse-square", name: "The Inverse-Square Law", domain: "light", level: 3,
        desc: "Double the distance, quarter the light — brightness falls as 1/d². This single rule connects a star's true power, its distance, and how bright it looks to us.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["light-travel"],
        tools: [{ k: "activity", label: "Lux-meter (phone app) vs distance from a bulb: plot 1/d²" }]
    },
    {
        id: "atmospheric-extinction", name: "Airmass & Extinction", domain: "light", level: 4,
        desc: "Light through more atmosphere gets dimmed and reddened — why the horizon Sun is orange and why photometry corrects for 'airmass'. Observe high, image high.",
        tracks: ["club", "photo"],
        prereqs: ["apparent-magnitude"],
        tools: [{ k: "activity", label: "Estimate a star's magnitude at 20° and at 70° altitude; compare" }]
    },
    {
        id: "eye-at-night", name: "The Eye as a Detector", domain: "light", level: 2,
        desc: "Cone cells see colour but need light; rod cells see faint things only in grey. That's why nebulae look ghostly-grey in the eyepiece yet glow red and blue in photographs.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["stars-vary", "eyes-vision"],
        tools: [{ k: "activity", label: "Colour-vanishing test: watch colours die as light dims" }]
    },

    // ---------------- Observing craft: practical additions ----------------
    {
        id: "telescope-operation", name: "First Light: Using a Telescope", domain: "scope", level: 2,
        desc: "Align the finder in daylight, start with the lowest power, centre on something bright, focus slowly. Ten minutes of drill separates a magical first night from a frustrating one.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "photo"],
        prereqs: ["binoculars"],
        tools: [{ k: "activity", label: "Finder-alignment and focus drill on a distant treetop, then the Moon" }]
    },
    {
        id: "exit-pupil", name: "Exit Pupil & Eye Relief", domain: "scope", level: 4,
        desc: "The beam leaving the eyepiece should match your night-opened pupil (~7 mm young, ~5 mm older) — the physics behind why 7×50s suit youngsters and 8×32s suit elders.",
        tracks: ["club"],
        prereqs: ["magnification-eyepieces", "eye-at-night"],
        tools: [{ k: "activity", label: "Compute exit pupils for every binocular and eyepiece you own" }]
    },
    {
        id: "goto-platesolving", name: "GoTo & Plate Solving", domain: "scope", level: 4,
        desc: "GoTo mounts point from a star-alignment; plate solving goes further — photograph anywhere, match the star pattern, know exactly where you point. Modern pointing is software.",
        tracks: ["club", "photo"],
        prereqs: ["equatorial-coords", "telescope-mounts"],
        tools: [{ k: "app", label: "Plate-solve one of your own photos with astrometry.net" }]
    },
    {
        id: "visual-filters", name: "Visual Nebula Filters", domain: "scope", level: 4,
        desc: "UHC and OIII filters pass only the wavelengths nebulae emit, dumping skyglow — the Veil Nebula appears from nothing. They help emission nebulae only; galaxies get no rescue.",
        tracks: ["club"],
        prereqs: ["deepsky-observing", "spectrum-color"],
        tools: [{ k: "activity", label: "Blink the Veil or Rosette in and out with an OIII filter" }]
    },

    // ---------------- Stars & cosmos: physics and frontiers ----------------
    {
        id: "stellar-fusion", name: "How Stars Shine", domain: "stars", level: 3,
        desc: "Stars fuse hydrogen into helium; the missing mass becomes energy by E = mc². The Sun converts four million tonnes of matter to light every second — and has fuel for five billion years more.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["sun-as-star"],
        tools: [{ k: "activity", label: "Compute the Sun's mass-loss per second from its power output" }]
    },
    {
        id: "spectral-classes", name: "Spectral Classes: OBAFGKM", domain: "stars", level: 4,
        desc: "Stars sort into temperature classes O (blue, 40,000 K) through M (red, 3,000 K); the Sun is a G2. One letter compresses a star's spectrum, colour and temperature.",
        tracks: ["school-high", "club"],
        prereqs: ["star-colors-temp", "spectroscopy"],
        tools: [{ k: "activity", label: "Classify real spectra strips into OBAFGKM order" }]
    },
    {
        id: "binary-stars", name: "Binary Stars & Stellar Masses", domain: "stars", level: 4,
        desc: "Half the stars are pairs, orbiting each other under Kepler's laws — the only direct way to weigh a star. Every stellar mass in the textbooks traces back to a binary.",
        tracks: ["school-high", "club"],
        prereqs: ["keplers-laws", "double-variable-stars"],
        tools: [{ k: "activity", label: "Derive the Sirius A+B mass from its 50-year orbit data" }]
    },
    {
        id: "variable-stars", name: "Variable Stars & Cepheids", domain: "stars", level: 4,
        desc: "Some stars pulse on a clock, and Cepheids pulse with a period that reveals their true brightness — Henrietta Leavitt's discovery that turned variable stars into cosmic distance markers.",
        tracks: ["school-high", "club"],
        prereqs: ["apparent-magnitude"],
        tools: [{ k: "activity", label: "Plot Delta Cephei's light curve from nightly estimates" }]
    },
    {
        id: "planetary-nebulae", name: "Planetary Nebulae & White Dwarfs", domain: "stars", level: 4,
        desc: "A dying Sun-like star exhales its outer layers into a glowing shell around a white-hot ember. The Ring Nebula is the Sun's own future, visible in a small telescope.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["stellar-evolution"],
        tools: [{ k: "sky", label: "Find M57, the Ring Nebula, in Lyra" }]
    },
    {
        id: "radio-astronomy", name: "Radio Astronomy & the GMRT", domain: "stars", level: 4,
        desc: "The sky broadcasts: pulsars tick, hydrogen clouds hum at 21 cm, galaxies roar. Near Pune stands the GMRT, one of the world's largest radio telescope arrays — and it's Indian.",
        tracks: ["school-high", "club"],
        prereqs: ["em-spectrum"],
        tools: [{ k: "activity", label: "Visit/virtual-tour the GMRT; map what 21 cm hydrogen reveals" }]
    },
    {
        id: "space-telescopes", name: "Space Telescopes", domain: "stars", level: 4,
        desc: "Above the blur and the blocked wavelengths: Hubble in visible, JWST in infrared, Chandra in X-rays — and India's AstroSat watching in ultraviolet and X-ray at once.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["em-spectrum", "telescope-designs"],
        tools: [{ k: "activity", label: "Same nebula through Hubble, JWST and AstroSat eyes — compare" }]
    },
    {
        id: "gravitational-waves", name: "Gravitational Waves", domain: "stars", level: 5,
        desc: "Colliding black holes shake spacetime itself; LIGO's detectors feel the tremor as a length change smaller than a proton. LIGO-India in Maharashtra will join the network.",
        tracks: ["school-high", "club"],
        prereqs: ["supernovae-compact"],
        tools: [{ k: "activity", label: "Listen to the GW150914 'chirp'; decode what its pitch tells" }]
    },
    {
        id: "dark-matter-energy", name: "Dark Matter & Dark Energy", domain: "stars", level: 5,
        desc: "Galaxies spin too fast for their visible mass, and the expansion is speeding up. Some 95% of the universe is stuff we can't yet see — astronomy's biggest open question.",
        tracks: ["school-high", "club"],
        prereqs: ["galaxies", "hubble-expansion"],
        tools: [{ k: "activity", label: "Plot a real galaxy rotation curve; find the missing mass" }, { k: "web", label: "Gravitational Lensing — distortion by a large mass,  interactive", url: "https://alokm.com/astro/lensing.html" }]
    },
    {
        id: "cosmic-microwave-background", name: "The Cosmic Microwave Background", domain: "stars", level: 5,
        desc: "The universe's baby photo: light from 380,000 years after the Big Bang, stretched to microwaves, arriving from every direction. Old TVs even picked up a whisper of it as static.",
        tracks: ["school-high", "club"],
        prereqs: ["bigbang-cosmology", "em-spectrum"],
        tools: [{ k: "activity", label: "Read the Planck all-sky map: what do the speckles mean?" }]
    },
    {
        id: "astrobiology", name: "Life in the Universe", domain: "stars", level: 4,
        desc: "Habitable zones, water worlds, biosignature gases, and the Drake equation's honest unknowns. The first question every school child asks — now a real measurement programme.",
        tracks: ["school-middle", "school-high", "club"],
        prereqs: ["exoplanets"],
        tools: [{ k: "activity", label: "Debate: which solar-system world would you search first, and why?" }]
    },

    // ---------------- Astrophotography: craft details ----------------
    {
        id: "raw-format", name: "RAW Files & Bit Depth", domain: "astro", level: 3,
        desc: "JPEG throws away the faint data astrophotography lives on. RAW keeps every bit the sensor recorded — mandatory before any stacking or stretching.",
        tracks: ["photo", "club"],
        prereqs: ["exposure-triangle"],
        tools: [{ k: "activity", label: "Stretch a RAW and a JPEG of the same frame; watch the JPEG fall apart" }]
    },
    {
        id: "night-focusing", name: "Focusing in the Dark", domain: "astro", level: 3,
        desc: "Autofocus is useless on stars. Live-view at 10× on a bright star, or a Bahtinov mask's diffraction spikes, gets focus exact — the single most common beginner failure.",
        tracks: ["photo", "club"],
        prereqs: ["exposure-triangle"],
        tools: [{ k: "activity", label: "Cut a cardboard Bahtinov mask; nail focus on Sirius" }]
    },
    {
        id: "sky-timelapse", name: "Sky Timelapse", domain: "astro", level: 3,
        desc: "Hundreds of frames, seconds apart, compressed into video: the sky wheels, the Milky Way rises, satellites streak. Diurnal motion becomes something you can show, not tell.",
        tracks: ["school-high", "club", "photo"],
        prereqs: ["nightscapes"],
        tools: [{ k: "activity", label: "Shoot a 300-frame moonrise timelapse with an intervalometer" }]
    },
    {
        id: "eclipse-imaging", name: "Eclipse & Event Imaging", domain: "astro", level: 4,
        desc: "Eclipses demand planning: solar filters until totality, bracketed exposures for the corona, and a rehearsed timeline — the event won't wait while you fix settings.",
        tracks: ["photo", "club"],
        prereqs: ["solar-eclipse", "solar-observing", "exposure-triangle"],
        tools: [{ k: "activity", label: "Write and rehearse a minute-by-minute eclipse shooting script" }]
    },
    {
        id: "barlow-reducer", name: "Barlows & Focal Reducers", domain: "astro", level: 4,
        desc: "A Barlow multiplies focal length for planetary close-ups; a reducer shrinks it for wider, faster deep-sky fields. Both re-tune your image scale without changing telescopes.",
        tracks: ["photo"],
        prereqs: ["image-scale"],
        tools: [{ k: "activity", label: "Measure your true image scale with and without a 2× Barlow" }]
    },
    {
        id: "mono-osc", name: "Mono vs One-Shot Colour", domain: "astro", level: 5,
        desc: "Colour cameras capture everything at once; mono cameras shoot through filters one channel at a time — slower, but sharper and unbeatable for narrowband. The great imaging fork.",
        tracks: ["photo"],
        prereqs: ["camera-sensors"],
        tools: [{ k: "activity", label: "Compare a mono+filters and OSC image of the same target" }]
    },
    {
        id: "dithering", name: "Dithering", domain: "astro", level: 5,
        desc: "Nudging the mount a few pixels between exposures so hot pixels and pattern noise land in different places and average away in the stack. Small habit, dramatic cleanup.",
        tracks: ["photo"],
        prereqs: ["autoguiding", "calibration-frames"],
        tools: [{ k: "app", label: "Enable dither-between-frames in PHD2/NINA; compare stacks" }]
    },
    {
        id: "live-stacking", name: "EAA & Smart Telescopes", domain: "astro", level: 3,
        desc: "Electronically-assisted astronomy stacks exposures live on screen — faint galaxies bloom in minutes at a public outreach table. Smart telescopes automate the whole chain.",
        tracks: ["school-middle", "school-high", "club", "photo"],
        prereqs: ["telescope-operation", "exposure-triangle"],
        tools: [{ k: "app", label: "Live-stack the Orion Nebula for a school audience" }]
    },

    // ---------------- Indian astronomy: history, texts, ideas ----------------
    {
        id: "navagraha", name: "The Navagrahas", domain: "indic", level: 2,
        desc: "The nine 'grahas': Sun, Moon, five visible planets, plus Rahu and Ketu — not nine planets, but the nine movers of the sky as ancient India catalogued them.",
        tracks: ["school-primary", "school-middle", "club", "indic"],
        prereqs: ["planets-wanderers"],
        tools: [{ k: "activity", label: "Match each graha to what it really is; spot all seven visible ones in a year" }, { k: "kaal", label: "Ephemeris — daily sidereal longitude of the nine grahas", url: "https://kaalshodh.com/ephemeris.html" }]
    },
    {
        id: "vedanga-jyotisha", name: "Vedanga Jyotisha", domain: "indic", level: 4,
        desc: "India's oldest astronomy text (~1200 BCE): a five-year lunisolar cycle for fixing ritual dates by nakshatra and tithi arithmetic — calendar science before telescopes by two millennia.",
        tracks: ["club", "indic"],
        prereqs: ["nakshatra", "calendar-systems"],
        tools: [{ k: "activity", label: "Run one 5-year yuga of the Vedanga Jyotisha scheme on paper" }, { k: "kaal", label: "Vedang Jyotish Yuga — the 5-year 60-solar / 62-lunar cycle", url: "https://kaalshodh.com/vedang-jyotish.html" }]
    },
    {
        id: "yugas-deep-time", name: "Yugas & Deep Time", domain: "indic", level: 3,
        desc: "Indian cosmology counts in mahayugas of 4.32 million years and kalpas of 4.32 billion — Aryabhata specified planetary revolutions per kalpa. A culture comfortable with astronomical time.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["aryabhata-work", "calendar-systems"],
        tools: [{ k: "activity", label: "Compare a kalpa with the scientific age of Earth and Sun" }, { k: "web", label: "Hindu Cosmological Time Scale — yugas to kalpas,  visualized", url: "https://alokm.com/khagol/hindutime.html" }, { k: "kaal", label: "Ahargana — civil-day count from Kaliyuga, three siddhantas", url: "https://kaalshodh.com/ahargana.html" }]
    },
    {
        id: "kerala-school", name: "The Kerala School", domain: "indic", level: 4,
        desc: "Madhava of Sangamagrama (c. 1400) found infinite series for π and sine two centuries before Europe; Nilakantha refined planetary models. India's forgotten mathematical revolution.",
        tracks: ["club", "indic"],
        prereqs: ["siddhantic-astronomy"],
        tools: [{ k: "activity", label: "Sum Madhava's π series and watch it converge" }]
    },
    {
        id: "puranic-siddhantic", name: "Two Indian Cosmologies", domain: "indic", level: 3,
        desc: "Puranic texts describe a flat disc around Mount Meru; the Siddhantas compute for a spherical Earth in space. Indian astronomers like Aryabhata openly argued for the sphere — a homegrown lesson in evidence over authority.",
        tracks: ["school-high", "club", "indic"],
        prereqs: ["earth-sphere", "aryabhata-work"],
        tools: [{ k: "activity", label: "Debate both models against the classical evidences for a round Earth" }, { k: "web", label: "Golapada — Aryabhata on the rotating spherical Earth", url: "https://alokm.com/khagol/aryabhat/golapada.html" }, { k: "kaal", label: "Siddhantic Comparison — classical models against modern ephemeris", url: "https://kaalshodh.com/siddhantic.html" }]
    },
    {
        id: "astronomy-vs-astrology", name: "Astronomy vs Astrology", domain: "indic", level: 3,
        desc: "Same sky, different claims: astronomy predicts where planets are; astrology claims what they mean. One invites testing, the other resists it — a respectful, evidence-first discussion every Indian classroom deserves.",
        tracks: ["school-middle", "school-high", "club", "indic"],
        prereqs: ["navagraha", "rashi", "model-thinking"],
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
        tools: [{ k: "activity", label: "Torch + toys: predict each shadow's shape and direction before switching on" }]
    },
    {
        id: "eyes-vision", name: "How We See", domain: "found", level: 1,
        desc: "We see things only when light from them enters our eyes — the eye receives light, it doesn't send anything out. No light, no seeing; more light gathered, fainter things seen.",
        tracks: ["school-primary", "school-middle"],
        prereqs: ["light-shadow"],
        tools: [{ k: "activity", label: "Blackout-box experiment: can you see the object with zero light?" }]
    },
    {
        id: "rainbow-colors", name: "Rainbows & Colours", domain: "found", level: 1,
        desc: "White sunlight is a mixture of all colours — raindrops or a prism fan it out into a rainbow. Colour is a property of the light itself, not paint added to it.",
        tracks: ["school-primary", "school-middle"],
        prereqs: ["light-shadow"],
        tools: [{ k: "activity", label: "Make a rainbow with a water tray, mirror and sunlight" }, { k: "android", label: "Rainbow Roulette — a tour through all the colours", url: "https://play.google.com/store/apps/details?id=com.alokm.rainbowroulette" }]
    },
    {
        id: "gravity-basics", name: "Gravity: Things Fall", domain: "found", level: 1,
        desc: "Everything is pulled toward the Earth — that pull is gravity, and 'down' means toward Earth's centre. People in Australia aren't upside-down; their 'down' points to the same centre.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        tools: [{ k: "activity", label: "Globe + toy figures: stick them all around, draw each one's 'down' arrow" }]
    },
    {
        id: "spin-axis", name: "Spin & Axis", domain: "found", level: 1,
        desc: "A spinning top turns around an invisible line — its axis — and the axis itself stays steady while everything else whirls. Earth is a giant top; its axis points at the pole star.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        tools: [{ k: "activity", label: "Spin tops and a bicycle wheel: find each one's axis; watch a tilted top wobble" }, { k: "web", label: "Planet Days — every planet spins,  each at its own pace", url: "https://alokm.com/astro/planetdays.html" }]
    },
    {
        id: "temperature-heat", name: "Hot & Cold: Temperature", domain: "found", level: 1,
        desc: "Temperature measures how hot something is, on scales like Celsius. Hotter things glow — first dull red, then orange, then white — which is exactly how astronomers read a star's heat from its colour.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        tools: [{ k: "activity", label: "Watch a heating filament / incense coal change colour as it heats and cools" }]
    },
    {
        id: "speed-distance-time", name: "Speed, Distance & Time", domain: "found", level: 2,
        desc: "Speed = distance ÷ time: know two, find the third. Thunder after lightning gives the storm's distance — the same trick, scaled up, turns light's travel time into cosmic distances.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        tools: [{ k: "activity", label: "Count seconds between lightning and thunder; compute the storm's distance" }]
    },
    {
        id: "angles-protractor", name: "Angles & the Protractor", domain: "found", level: 1,
        desc: "Angles measure turn and separation in degrees — 90° for a corner, 360° for a full circle. Astronomy is applied angle-measuring: heights above the horizon, gaps between stars.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        tools: [{ k: "activity", label: "Protractor scavenger hunt: measure angles all over the classroom" }]
    },
    {
        id: "big-numbers", name: "Big Numbers & Powers of Ten", domain: "found", level: 2,
        desc: "A lakh, a crore, a billion, 10⁸ — big numbers need both names and notation. Astronomy runs on powers of ten; without them, its distances are just meaningless words.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        tools: [{ k: "activity", label: "Powers-of-ten zoom: classroom → city → Earth → Sun in ×10 jumps" }]
    },
    {
        id: "maps-scale", name: "Maps & Scale Models", domain: "found", level: 1,
        desc: "A map shrinks the real world by a fixed scale — 1 cm standing for 1 km — keeping shapes and directions honest. Star charts, globes and solar-system walks are all the same idea.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        tools: [{ k: "activity", label: "Draw the classroom to scale; then the school grounds" }]
    },
    {
        id: "model-thinking", name: "Models in Science", domain: "found", level: 2,
        desc: "A globe, a map, a diagram of the Sun — none are the real thing; all are models that answer some questions well and others not at all. Science improves by testing models against observation.",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: [],
        tools: [{ k: "activity", label: "For one model (globe/orrery), list: what it gets right, what it gets wrong" }]
    },
    {
        id: "earth-globe", name: "Reading the Globe", domain: "found", level: 1,
        desc: "The globe is Earth's honest model: a tilted ball with poles, continents and oceans. Finding India, the poles and the tilt on a globe comes before any talk of rotation or seasons.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        tools: [{ k: "activity", label: "Globe treasure hunt: find India, both poles, the equator, and the tilt" }]
    },
    {
        id: "latitude-longitude", name: "Latitude & Longitude", domain: "found", level: 2,
        desc: "An address grid for the whole planet: latitude counts degrees from the equator, longitude from Greenwich. Bhopal sits near 23°N, 77°E — and your latitude is written in your sky.",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: ["earth-globe"],
        tools: [{ k: "activity", label: "Locate five cities from coordinates alone; read your town's off a map app" }]
    },
    {
        id: "compass-magnetism", name: "The Compass & Magnetic Earth", domain: "found", level: 2,
        desc: "Earth is a weak magnet, and a compass needle swings along it to point roughly north — roughly, because magnetic north and true north differ by a small, mapped angle.",
        tracks: ["school-primary", "school-middle", "club"],
        prereqs: ["cardinal-directions"],
        tools: [{ k: "activity", label: "Magnetise a needle, float it on water; compare with the shadow-stick north" }]
    },
    {
        id: "weather-vs-sky", name: "Weather vs the Sky", domain: "found", level: 1,
        desc: "Clouds, rain and haze live a few kilometres up; the Moon, planets and stars lie far beyond. Weather hides the sky but never touches it — astronomy begins where weather ends.",
        tracks: ["school-primary", "school-middle"],
        prereqs: ["sky-dome"],
        tools: [{ k: "activity", label: "Height ladder: kite, cloud, plane, ISS, Moon — order them by distance" }]
    },
    {
        id: "air-atmosphere", name: "The Ocean of Air", domain: "found", level: 2,
        desc: "We live at the bottom of a thin skin of air that thins with height and fades into space around 100 km up. It burns meteors, blurs stars, bends light — and keeps us alive.",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: ["weather-vs-sky"],
        tools: [{ k: "activity", label: "Scale drawing: on a 30 cm Earth, how thick is the atmosphere? (a pencil line)" }]
    },
    {
        id: "waves-basics", name: "Waves", domain: "found", level: 2,
        desc: "Ripples on water and sound in air both carry energy as waves, with a wavelength and a pitch. Light is a wave too — its 'pitch' is colour, and motion can stretch or squeeze it.",
        tracks: ["school-middle", "school-high"],
        prereqs: [],
        tools: [{ k: "activity", label: "Rope and slinky waves: change frequency, see wavelength answer" }, { k: "android", label: "Sound Generator — waveforms of different frequencies", url: "https://play.google.com/store/apps/details?id=com.alokm.soundgenerator" }]
    },
    {
        id: "sun-energy", name: "The Sun Powers Earth", domain: "found", level: 1,
        desc: "Sunlight drives nearly everything here: plants, winds, rain, and the warmth of the day. Grasping the Sun as Earth's engine is the first reason to care where it is in the sky.",
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        tools: [{ k: "activity", label: "Trace your lunch's energy back to the Sun, step by step" }]
    },
    {
        id: "tropics-circles", name: "Tropics & Polar Circles", domain: "found", level: 2,
        desc: "The Tropic of Cancer — which crosses India through MP and Gujarat — marks where the noon Sun can stand exactly overhead. These lines are the axial tilt drawn onto the map.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["seasons", "latitude-longitude"],
        tools: [{ k: "activity", label: "Trace the Tropic of Cancer across an India map — which towns does it touch?" }, { k: "web", label: "Variation in Tropic of Cancer — its drift over millennia", url: "https://alokm.com/tropicofcancer.html" }]
    },
    {
        id: "zero-shadow-day", name: "Zero Shadow Day", domain: "found", level: 2,
        desc: "Twice a year, everywhere between the tropics, the noon Sun stands exactly overhead and shadows vanish for a moment. India's favourite mass astronomy experiment — date depends on your latitude.",
        tracks: ["school-primary", "school-middle", "school-high", "club", "indic"],
        prereqs: ["tropics-circles", "shadow-clock"],
        tools: [{ k: "activity", label: "Find your town's zero-shadow dates; photograph a bottle at true noon" }, { k: "gol", label: "Overhead-Sun geometry vs latitude animation" , url: "https://gol.kaalshodh.com/app#shanku"}, { k: "android", label: "Zero Shadow Day — ZSD dates,  local noon,  interactive 3D Sun motion", url: "https://play.google.com/store/apps/details?id=com.alokm.zsd" }, { k: "web", label: "Zero Shadow Day map — find ZSD dates & times anywhere", url: "https://alokm.com/zsd.html" }, { k: "web", label: "Zero Shadow Moment — spiral of the sub-solar point over Earth", url: "https://alokm.com/astro/zsm.html" }]
    },
    {
        id: "climate-zones", name: "Climate Zones & Sun Angle", domain: "found", level: 2,
        desc: "Torrid, temperate and frigid zones follow from one fact: how steeply sunlight lands. Geography's climate map is astronomy's Sun-angle diagram wearing different clothes.",
        tracks: ["school-primary", "school-middle"],
        prereqs: ["tropics-circles"],
        tools: [{ k: "activity", label: "Torch on a globe: compare the light patch at equator, India, and poles" }, { k: "web", label: "Sun Rays Orientation — sun angle by latitude through the year", url: "https://alokm.com/astro/year_v2.html" }]
    }
];
