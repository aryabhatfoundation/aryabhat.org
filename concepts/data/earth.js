// ============================================================
// EARTH & ENVIRONMENT concepts.
//
// Requires data/_schema.js to have run first (it creates
// window.CONCEPTS and the taxonomy tables).
//
// Domains: e-geo (Earth Structure & Geology), e-atmo (Atmosphere &
// Weather), e-water (Water & Oceans), e-env (Environment & Resources).
//
// SEED FILE. This is an anchor pass, not exhaustive coverage: one
// concept per major idea, with a prereq spine that later PDF-driven
// expansion can hang detail off. Every record is status:"review".
//
// NOTE ON OVERLAP:
//   · The LIVING side of ecology — food chains, trophic levels,
//     biodiversity, adaptation — belongs to biology under `b-eco`.
//     This file owns the physical environment only.
//   · Astronomy already owns earth-globe, earth-sphere,
//     latitude-longitude, tropics-circles, climate-zones, seasons,
//     air-atmosphere, weather-vs-sky, spin-axis and tides. Use them
//     as prereqs and bridge with `related` — never duplicate them.
//   · Pressure, waves and energy conversion get their quantitative
//     treatment in physics; what lives here is the planetary story.
// ============================================================

window.CONCEPTS.push(

    // ==================== EARTH STRUCTURE & GEOLOGY ====================
    {
        id: "earth-layers", name: "Inside the Earth", domain: "e-geo", level: 2,
        desc: "Under a crust thinner, proportionally, than an apple's skin lie the mantle, the liquid outer core and a solid iron inner core. Nobody has ever been below about 12 km — everything we know about the inside was read off earthquakes.",
        grades: [7, 11],
        syllabusRefs: ["ncert:7:geo:2"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["earth-globe"],
        related: ["earthquakes", "plate-tectonics", "compass-magnetism", "lunar-geology"],
        aliases: ["Earth's interior", "structure of the Earth", "inside our earth"],
        keywords: ["crust", "mantle", "outer core", "inner core", "lithosphere", "asthenosphere", "Moho", "SIAL", "SIMA", "NIFE"],
        misconceptions: ["Thinking the whole inside of the Earth is molten lava sloshing about, as if volcanoes were holes into a fireball"],
        tools: [{ k: "activity", label: "Cut a boiled egg in half: shell, white and yolk are crust, mantle and core — then work out the real scale" }]
    },
    {
        id: "continental-drift", name: "Continental Drift", domain: "e-geo", level: 2,
        desc: "South America's east coast fits Africa's west coast like a torn photograph — and the same fossils and rock belts run straight across the tear. Wegener said in 1912 that the continents had moved; he was right about the fact and wrong about the mechanism, and was laughed at for forty years.",
        grades: [7, 11],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["earth-globe", "earth-layers"],
        related: ["plate-tectonics", "fossils-geological-time", "peer-review"],
        aliases: ["Wegener's hypothesis", "drifting continents", "Pangaea"],
        keywords: ["Pangaea", "Panthalassa", "Gondwana", "Laurasia", "jigsaw fit", "Wegener", "Glossopteris"],
        misconceptions: ["Thinking continents are ploughing through the ocean floor like ships, rather than riding on plates that carry the seabed with them"],
        tools: [{ k: "activity", label: "Photocopy a world map, cut out the continents along the shelf edge, and reassemble Pangaea on the desk" }]
    },
    {
        id: "plate-tectonics", name: "Plate Tectonics", domain: "e-geo", level: 3,
        desc: "Earth's rigid shell is cracked into a dozen big plates that creep about as fast as your fingernails grow, driven by slow churning in the mantle. Nearly every mountain, trench, quake and volcano sits on a plate edge — India is still shoving into Asia, and the Himalaya is the crumple zone.",
        grades: [7, 11],
        syllabusRefs: ["ncert:7:geo:3"],
        status: "review",
        tracks: ["school-middle", "school-high", "olympiad"],
        prereqs: ["earth-layers", "continental-drift"],
        related: ["earthquakes", "volcanoes", "rock-cycle", "fossils-geological-time"],
        aliases: ["theory of plate tectonics", "lithospheric plates", "sea-floor spreading"],
        keywords: ["convergent", "divergent", "transform", "subduction", "mid-ocean ridge", "convection current", "Indian Plate", "Himalayan collision", "fault"],
        misconceptions: ["Believing plate boundaries follow the coastlines, so that each continent sits on its own plate"],
        tools: [{ k: "activity", label: "Two sheets of card on a tray of thick dal: push them together, pull them apart, slide them past — name the mountain, ridge and fault you just made" }]
    },
    {
        id: "earthquakes", name: "Earthquakes & Seismic Waves", domain: "e-geo", level: 3,
        desc: "Rock at a fault bends, locks, then snaps — and the stored energy leaves as seismic waves: fast squeezing P-waves, slower shaking S-waves, and surface waves that do the damage. Because S-waves cannot cross liquid, their shadow on the far side of the planet is how we discovered the outer core is molten.",
        grades: [7, 8, 11],
        syllabusRefs: ["ncert:7:geo:3"],
        status: "review",
        tracks: ["school-middle", "school-high", "olympiad"],
        prereqs: ["plate-tectonics", "waves-basics"],
        related: ["earth-layers", "volcanoes", "plate-tectonics"],
        aliases: ["seismicity", "seismic waves", "temblor"],
        keywords: ["focus", "hypocentre", "epicentre", "P-wave", "S-wave", "surface wave", "seismograph", "Richter scale", "moment magnitude", "shadow zone", "seismic zone", "Bhuj"],
        misconceptions: ["Thinking a magnitude 7 quake is merely 'a bit worse' than a magnitude 6, when the scale is logarithmic — about 32 times the energy per step"],
        tools: [{ k: "activity", label: "Slinky on the floor: push a pulse along it for a P-wave, flick it sideways for an S-wave, and time which arrives first" }, { k: "activity", label: "Find your district on India's seismic zone map and ask why Kachchh and the Northeast are red" }]
    },
    {
        id: "volcanoes", name: "Volcanoes", domain: "e-geo", level: 3,
        desc: "Where plates pull apart or dive under, mantle rock melts and rises as magma; whether it oozes out as runny basalt or blows the mountain apart depends mostly on how much silica and trapped gas it carries. The Deccan Traps are what happens when the runny kind keeps coming for hundreds of thousands of years.",
        grades: [7, 11],
        syllabusRefs: ["ncert:7:geo:3"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["plate-tectonics"],
        related: ["rock-cycle", "earthquakes", "soil-formation"],
        aliases: ["volcanic eruption", "volcanism", "vulcanicity"],
        keywords: ["magma", "lava", "vent", "crater", "caldera", "shield volcano", "composite cone", "hotspot", "Deccan Traps", "Barren Island", "pyroclastic flow"],
        misconceptions: ["Assuming magma comes straight up from the Earth's core, rather than from partial melting in the upper mantle a few tens of km down"],
        tools: [{ k: "activity", label: "Compare honey and water poured down a slope — that viscosity difference is why some volcanoes ooze and others explode" }]
    },
    {
        id: "rocks-minerals", name: "Minerals & Rocks", domain: "e-geo", level: 2,
        desc: "A mineral is a single natural substance with its own fixed recipe and crystal shape — quartz, mica, feldspar; a rock is a crowd of mineral grains cemented together. Learning to look at a pebble and name the grains is the first real geology anyone does.",
        grades: [7, 8, 11],
        syllabusRefs: ["ncert:7:geo:2"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["earth-layers"],
        related: ["rock-cycle", "weathering-erosion", "natural-resources", "meteorites"],
        aliases: ["rock types", "mineralogy", "igneous sedimentary metamorphic", "rocks and minerals"],
        keywords: ["igneous", "sedimentary", "metamorphic", "quartz", "feldspar", "mica", "granite", "basalt", "limestone", "sandstone", "marble", "slate", "ore", "crystal", "Mohs hardness"],
        misconceptions: ["Treating 'rock' and 'mineral' as the same word, so that granite and quartz sit in the same box"],
        tools: [{ k: "activity", label: "Scratch test: try each pebble against a fingernail, a coin and a steel nail, and rank your collection by hardness" }]
    },
    {
        id: "rock-cycle", name: "The Rock Cycle", domain: "e-geo", level: 3,
        desc: "Lava cools into igneous rock, weather grinds it into grains that settle and harden into sedimentary rock, heat and squeeze bake that into metamorphic rock — and deep enough, it melts and starts over. The marble in a temple floor was once mud on a sea bed; nothing on Earth is permanent, only slow.",
        grades: [7, 11],
        syllabusRefs: ["ncert:7:geo:2"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["rocks-minerals"],
        related: ["plate-tectonics", "volcanoes", "weathering-erosion", "fossils-geological-time"],
        aliases: ["rock formation cycle", "cycle of rock change"],
        keywords: ["igneous", "sedimentary", "metamorphic", "magma", "lithification", "recrystallisation", "sediment", "uplift", "burial"],
        misconceptions: ["Thinking rocks are permanent and unchanging on any timescale, because they do not visibly change on a human one"],
        tools: [{ k: "activity", label: "Sort a handful of local pebbles into the three rock families by texture, then argue each one's route around the cycle" }, { k: "activity", label: "Crayon shavings: press for sedimentary, press-and-warm in the hand for metamorphic, melt for igneous" }]
    },
    {
        id: "weathering-erosion", name: "Weathering & Erosion", domain: "e-geo", level: 3,
        desc: "Weathering breaks rock where it stands — frost prying open cracks, rain dissolving limestone, roots levering blocks apart; erosion is the removal, by river, wind, wave or ice. Keeping the two apart is the whole exam question, and the difference between a crumbling wall and a canyon.",
        grades: [7, 11],
        syllabusRefs: ["ncert:7:geo:3"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["rocks-minerals"],
        related: ["soil-formation", "rivers-drainage", "rock-cycle", "lunar-geology"],
        aliases: ["denudation", "physical and chemical weathering", "erosion and deposition"],
        keywords: ["mechanical weathering", "chemical weathering", "exfoliation", "frost wedging", "karst", "abrasion", "transport", "deposition", "gully", "meander", "sand dune", "glacier"],
        misconceptions: ["Using 'weathering' and 'erosion' as synonyms — weathering breaks rock in place, erosion carries the pieces away"],
        tools: [{ k: "activity", label: "Shake gravel in a bottle of water for five minutes and watch the sharp edges round off — that is a river's first hundred kilometres" }]
    },
    {
        id: "soil-formation", name: "Soil & Soil Erosion", domain: "e-geo", level: 3,
        desc: "Soil is weathered rock plus dead things plus air and water plus a whole living workforce — and it forms at roughly a centimetre a century, which is why losing topsoil in one monsoon is not a loss you make back. Dig a pit and the horizons read like a book: dark humus on top, then paler mineral soil, then broken parent rock.",
        grades: [7, 10, 11],
        syllabusRefs: ["ncert:10:geo:1"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["weathering-erosion"],
        related: ["natural-resources", "groundwater", "conservation-sustainability", "volcanoes"],
        aliases: ["soil profile", "pedogenesis", "soil formation", "soil conservation"],
        keywords: ["humus", "topsoil", "subsoil", "horizon", "parent rock", "alluvial soil", "black cotton soil", "regur", "laterite", "sheet erosion", "gully erosion", "contour ploughing", "shelter belt", "terrace farming"],
        misconceptions: ["Thinking soil is just 'dirt' — an inert powder — rather than a slowly built structure that is largely biological and effectively non-renewable"],
        tools: [{ k: "activity", label: "Shake a jar of local soil with water, let it settle overnight, and measure the sand, silt and clay bands" }, { k: "activity", label: "Two sloped trays, one bare and one turfed: pour the same water down both and compare the mud that runs off" }]
    },
    {
        id: "fossils-geological-time", name: "Fossils & Geological Time", domain: "e-geo", level: 3,
        desc: "Sedimentary layers stack oldest-at-the-bottom, and the fossils in them change from bottom to top — that is how a 4.6-billion-year history was worked out long before anyone could date a rock. Squeeze all of it into one year and the dinosaurs die on 26 December; written history is the last thirty seconds.",
        grades: [10, 11],
        status: "review",
        tracks: ["school-middle", "school-high", "olympiad"],
        prereqs: ["rocks-minerals", "big-numbers"],
        related: ["rock-cycle", "continental-drift", "orders-magnitude", "meteorites"],
        aliases: ["geologic time scale", "stratigraphy", "deep time", "fossil record"],
        keywords: ["strata", "superposition", "index fossil", "era", "period", "radiometric dating", "half-life", "Precambrian", "Cambrian", "Jurassic", "Cretaceous", "mass extinction", "Siwalik fossils"],
        misconceptions: ["Picturing early humans and dinosaurs sharing a landscape, when 65 million empty years lie between them", "Assuming fossils are the actual bones or wood, rather than mineral that has replaced them"],
        tools: [{ k: "activity", label: "Roll out 4.6 m of paper for 4.6 billion years, at 1 mm per million years — then try to mark where humans appear" }, { k: "activity", label: "Press a shell into clay, cast the mould in plaster, and separate the two kinds of fossil you just made" }]
    },

    // ==================== ATMOSPHERE & WEATHER ====================
    {
        id: "atmosphere-layers", name: "Layers of the Atmosphere", domain: "e-atmo", level: 3,
        desc: "Air is not one blanket but five, stacked and defined by whether temperature rises or falls with height: the troposphere where all weather lives, the stratosphere holding the ozone, then the mesosphere, thermosphere and exosphere fading into space. Ninety-nine per cent of the air is below 30 km — a fingernail's thickness on a school globe.",
        grades: [7, 11],
        syllabusRefs: ["ncert:7:geo:4"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["air-atmosphere"],
        related: ["ozone-depletion", "greenhouse-effect", "air-pressure", "aurora", "meteorites"],
        aliases: ["structure of the atmosphere", "atmospheric layers", "composition of the atmosphere"],
        keywords: ["troposphere", "tropopause", "stratosphere", "mesosphere", "thermosphere", "ionosphere", "exosphere", "lapse rate", "ozone layer", "nitrogen", "oxygen"],
        misconceptions: ["Imagining the atmosphere ends at a sharp edge, rather than thinning out smoothly until there is simply too little left to matter"],
        tools: [{ k: "activity", label: "Draw the layers to scale down a corridor wall at 1 cm = 1 km, and mark where a jet, Everest and the ISS sit" }]
    },
    {
        id: "air-pressure", name: "Air Pressure", domain: "e-atmo", level: 3,
        desc: "Air has weight, and the column above your head presses with about 10 tonnes on every square metre — you do not feel it only because it pushes equally from all sides. Pressure falls with height and changes with heating, and every wind on the planet is air sliding from a high to a low.",
        grades: [7, 8, 11],
        syllabusRefs: ["ncert:7:geo:4"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["air-atmosphere"],
        related: ["wind", "atmosphere-layers", "cyclones", "measurement-uncertainty"],
        aliases: ["atmospheric pressure", "barometric pressure", "air pressure and winds"],
        keywords: ["barometer", "millibar", "hectopascal", "isobar", "pressure belt", "high pressure", "low pressure", "doldrums", "horse latitudes", "aneroid"],
        misconceptions: ["Believing air is weightless because it feels like nothing", "Thinking a vacuum 'sucks' — it is always the outside air pressure doing the pushing"],
        tools: [{ k: "activity", label: "Balloon barometer: stretch a balloon over a jar, glue on a straw pointer, and log its drift against the daily forecast for a fortnight" }, { k: "activity", label: "Card over a full glass of water, invert it — the water stays up because 10 tonnes per square metre is holding it there" }]
    },
    {
        id: "wind", name: "Wind", domain: "e-atmo", level: 3,
        desc: "The Sun heats the ground unevenly, warm air rises and leaves a low behind it, and cooler air pours in — that is all wind is. Add Earth's spin, which bends every moving parcel right in the north and left in the south, and the same rule produces the sea breeze at Chennai and the jet stream over the Himalaya.",
        grades: [7, 9, 11],
        syllabusRefs: ["ncert:7:geo:4"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["air-pressure", "sun-energy"],
        related: ["monsoon", "cyclones", "ocean-currents", "spin-axis", "climate-zones"],
        aliases: ["winds", "air circulation", "atmospheric circulation", "planetary winds"],
        keywords: ["convection", "Coriolis effect", "trade winds", "westerlies", "jet stream", "land breeze", "sea breeze", "Hadley cell", "ITCZ", "anemometer", "loo"],
        misconceptions: ["Thinking wind is air being 'pushed out' by heat, rather than air flowing in to fill a low-pressure gap left by rising air"],
        tools: [{ k: "activity", label: "Hold a smoking incense stick at a doorway between a hot room and a cool one, top and bottom — the smoke maps the circulation" }, { k: "activity", label: "Build a cup anemometer from paper cups and a pencil, and log wind speed alongside the day's pressure reading" }]
    },
    {
        id: "humidity-clouds", name: "Humidity & Clouds", domain: "e-atmo", level: 3,
        desc: "Warm air holds more invisible water vapour than cold air; cool it to its dew point and the vapour must condense — onto dust, into droplets, as cloud. A cloud is not steam and not vapour: it is liquid water, which is exactly why you can see it while the humid air around you stays clear.",
        grades: [7, 9, 11],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["water-cycle", "air-pressure"],
        related: ["precipitation", "monsoon", "weather-climate", "weather-vs-sky"],
        aliases: ["humidity and condensation", "cloud formation", "water in the atmosphere", "dew point"],
        keywords: ["water vapour", "relative humidity", "absolute humidity", "dew point", "condensation nuclei", "saturation", "cumulus", "stratus", "cirrus", "nimbus", "cumulonimbus", "fog", "dew", "frost", "hygrometer"],
        misconceptions: ["Calling the white plume from a kettle 'steam' — real steam is invisible; what you see is already condensed droplets, the same as a cloud"],
        tools: [{ k: "activity", label: "Cloud in a bottle: warm water, a puff of smoke from a match, squeeze and release — the cloud appears on the release, when the air cools" }, { k: "activity", label: "Wet-and-dry-bulb hygrometer from two thermometers and a wet cloth; read relative humidity off a table before and after a rain shower" }]
    },
    {
        id: "precipitation", name: "Precipitation", domain: "e-atmo", level: 3,
        desc: "Cloud droplets are far too light to fall; they must collide and merge, or grow on ice crystals, until they are heavy enough to beat the updraft — then it rains. How the air was lifted in the first place names the rain: convectional over hot plains, orographic against the Western Ghats, frontal where air masses collide.",
        grades: [7, 9, 11],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["humidity-clouds"],
        related: ["monsoon", "water-cycle", "rivers-drainage", "cyclones"],
        aliases: ["rainfall", "types of rainfall", "rain snow hail"],
        keywords: ["coalescence", "convectional rainfall", "orographic rainfall", "relief rainfall", "frontal rainfall", "rain shadow", "hail", "sleet", "snow", "drizzle", "rain gauge", "Mawsynram", "Cherrapunji", "isohyet"],
        misconceptions: ["Assuming heavy cloud must mean rain — most clouds never precipitate, because the droplets never grow past the updraft"],
        tools: [{ k: "activity", label: "Rain gauge from a cut plastic bottle with the neck inverted as a funnel; log daily mm through a monsoon month and total it" }, { k: "activity", label: "On a map, put Mahabaleshwar and Pune 100 km apart and explain a fivefold rainfall difference with one word: orographic" }]
    },
    {
        id: "weather-climate", name: "Weather vs Climate", domain: "e-atmo", level: 2,
        desc: "Weather is what the sky is doing this afternoon; climate is what it usually does — the thirty-year average and spread of that same weather. Confusing the two is why 'it was freezing in Delhi last week' gets offered, wrongly, as an argument about a warming planet.",
        grades: [7, 9, 11],
        syllabusRefs: ["ncert:9:geo:4"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["weather-vs-sky"],
        related: ["climate-zones", "monsoon", "climate-change", "mean-median-mode", "graphs-as-models"],
        aliases: ["climate and weather", "elements of weather", "climatology"],
        keywords: ["temperature", "humidity", "rainfall", "wind speed", "cloud cover", "thirty-year normal", "climograph", "diurnal range", "annual range", "meteorology", "IMD"],
        misconceptions: ["Treating one unusual day — a cold snap, a freak hailstorm — as evidence about climate, when climate is the statistics of thousands of such days"],
        tools: [{ k: "activity", label: "Run a class weather station for a month — temperature, rain, cloud, wind — then compare your month's mean with the IMD's long-term normal for your town" }]
    },
    {
        id: "monsoon", name: "The Indian Monsoon", domain: "e-atmo", level: 3,
        desc: "By May the subcontinent is baking and the Arabian Sea is not: land heats far faster than water, a deep low forms over northwest India, the equatorial pressure belt shifts north, and moisture-drunk sea air comes charging in — the whole wind system reverses, twice a year. It is not simply 'the rainy season': about three-quarters of India's rain, the sowing calendar, the reservoirs and a good share of GDP hang on where its Kerala arrival date and its mid-season breaks fall.",
        grades: [6, 7, 9, 11],
        syllabusRefs: ["ncert:9:geo:4"],
        status: "review",
        tracks: ["school-middle", "school-high", "olympiad"],
        prereqs: ["wind", "weather-climate"],
        related: ["precipitation", "humidity-clouds", "climate-zones", "cyclones", "ocean-currents", "climate-change"],
        aliases: ["monsoon winds", "southwest monsoon", "retreating monsoon", "mausam", "Indian monsoon system"],
        keywords: ["southwest monsoon", "northeast monsoon", "onset", "burst of monsoon", "break in monsoon", "monsoon trough", "ITCZ", "Mascarene High", "Somali jet", "Tibetan Plateau heating", "El Nino", "Western Ghats", "Mawsynram", "rain shadow", "retreating monsoon", "kharif", "rabi"],
        misconceptions: ["Thinking the monsoon is a fixed date on the calendar — a season that simply starts on 1 June — rather than a wind system that can arrive late, break for three weeks, or largely fail", "Believing monsoon rain is Indian water evaporating from Indian rivers, when most of it is Indian Ocean water carried in on the wind"],
        tools: [{ k: "activity", label: "Two trays in the Sun, one of dry soil and one of water, with a thermometer in each: read them every ten minutes and you have just measured the engine of the monsoon" }, { k: "activity", label: "Trace the IMD onset line across India week by week on a wall map, and compare this year's dates with the long-period average" }]
    },
    {
        id: "cyclones", name: "Cyclones & Storms", domain: "e-atmo", level: 3,
        desc: "Give warm ocean water above about 27 °C, moist rising air and a spin from Earth's rotation, and a low deepens into a self-feeding engine — a tropical cyclone, spiralling anticlockwise in our hemisphere around a calm eye. The Bay of Bengal, shallow and hot, funnels storm surge onto Odisha and Andhra; the killer is usually the surge and not the wind.",
        grades: [7, 9, 11],
        syllabusRefs: ["ncert:9:geo:4"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["air-pressure", "wind"],
        related: ["monsoon", "precipitation", "ocean-currents", "climate-change"],
        aliases: ["tropical cyclone", "hurricane", "typhoon", "depression and storm", "cyclonic storm"],
        keywords: ["eye", "eye wall", "storm surge", "landfall", "anticyclone", "depression", "Coriolis effect", "Bay of Bengal", "Arabian Sea", "Fani", "Amphan", "thunderstorm", "tornado", "IMD warning"],
        misconceptions: ["Thinking the eye means the cyclone is over, when the far eye wall — with the wind reversed — is still to come", "Assuming a cyclone can form on the equator, where there is no Coriolis deflection to start the spin"],
        tools: [{ k: "activity", label: "Two-bottle vortex: swirl water through a joined pair and watch a low-pressure core organise a spiral — then find the eye" }, { k: "activity", label: "Plot the last five Bay of Bengal cyclone tracks on a map and mark which coasts keep getting hit, and why" }]
    },

    // ==================== WATER & OCEANS ====================
    {
        id: "water-cycle", name: "The Water Cycle", domain: "e-water", level: 2,
        desc: "The Sun lifts water off ocean and leaf as vapour, height cools it into cloud, gravity returns it as rain, and the land hands it back to the sea — a solar-powered pump that has been running for four billion years without a drop being added. The water in your glass has been through dinosaurs, glaciers and the Ganga; Earth never makes new water, it only moves the old.",
        grades: [6, 7, 9, 11],
        syllabusRefs: ["ncert:7:geo:5"],
        status: "review",
        tracks: ["school-primary", "school-middle", "school-high"],
        prereqs: ["sun-energy"],
        related: ["humidity-clouds", "precipitation", "groundwater", "rivers-drainage", "conservation-sustainability"],
        aliases: ["hydrological cycle", "water circulation", "evaporation condensation precipitation"],
        keywords: ["evaporation", "transpiration", "evapotranspiration", "condensation", "precipitation", "infiltration", "runoff", "percolation", "reservoir", "residence time"],
        misconceptions: ["Thinking the cycle is a simple ring of evaporation and rain, missing that most water sits parked for centuries in ice, ocean and ground", "Believing Earth can run out of water — the water is not lost, only made salty, dirty or hard to reach"],
        tools: [{ k: "activity", label: "Seal a little water in a bag taped to a sunny window and watch the whole cycle run for a week" }]
    },
    {
        id: "groundwater", name: "Groundwater", domain: "e-water", level: 3,
        desc: "Rain that soaks in fills the pores between grains of rock, and the top of that saturated zone is the water table — the level a borewell must reach. India pumps more groundwater than any country on Earth, and across Punjab, Haryana and Rajasthan the table is falling metres a year because the taking is faster than the recharge.",
        grades: [7, 10],
        syllabusRefs: ["ncert:10:geo:3"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["water-cycle"],
        related: ["soil-formation", "rivers-drainage", "water-pollution", "conservation-sustainability"],
        aliases: ["water table", "aquifer", "subsurface water", "underground water"],
        keywords: ["aquifer", "water table", "recharge", "infiltration", "percolation", "porosity", "permeability", "spring", "borewell", "tubewell", "over-extraction", "rainwater harvesting", "check dam", "baoli", "arsenic", "fluoride"],
        misconceptions: ["Picturing groundwater as underground rivers and lakes in caverns, rather than water filling the pore spaces of ordinary rock and sand", "Assuming a borewell taps a private supply, when neighbours share one aquifer and every pump lowers it for all"],
        tools: [{ k: "activity", label: "Pour a measured cup of water into a jar of gravel and one of sand: how much fits, and how fast it drains, is porosity versus permeability" }, { k: "activity", label: "Find your block's groundwater category — safe, semi-critical, critical, over-exploited — on the CGWB map and discuss what changed it" }]
    },
    {
        id: "rivers-drainage", name: "Rivers & Drainage", domain: "e-water", level: 3,
        desc: "Every drop that falls runs downhill into some river's basin, and the ridge between two basins is a watershed — so a map of rivers is really a map of slopes. India's Himalayan rivers are snow-fed and run all year, carving gorges and dumping the plains that feed half the country; its peninsular rivers are rain-fed, older and comparatively tame.",
        grades: [6, 7, 9, 11],
        syllabusRefs: ["ncert:9:geo:3"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["water-cycle", "weathering-erosion"],
        related: ["groundwater", "water-pollution", "precipitation", "soil-formation", "maps-scale"],
        aliases: ["drainage system", "river systems of India", "drainage basin", "river valley"],
        keywords: ["basin", "watershed", "divide", "tributary", "distributary", "confluence", "meander", "ox-bow lake", "floodplain", "delta", "estuary", "dendritic", "Himalayan rivers", "peninsular rivers", "Ganga", "Brahmaputra", "Godavari", "Sundarbans", "flood"],
        misconceptions: ["Thinking a river's water comes only from the rain falling directly into it, when most arrives via runoff and groundwater seepage across the whole basin"],
        tools: [{ k: "activity", label: "Crumple and part-unfold a sheet of paper, trace the ridges in marker, then mist it with water and watch your drainage basins appear" }, { k: "activity", label: "Trace your own town's river back up a map to its source, and name every basin it steals from" }]
    },
    {
        id: "ocean-currents", name: "Oceans & Ocean Currents", domain: "e-water", level: 3,
        desc: "Salt water covers seven-tenths of the planet, and it is not still: wind drags surface currents into great gyres, while differences in temperature and salinity drive a slow deep conveyor that takes a thousand years to go round. Currents are the planet's central heating — they move tropical heat poleward, and a wobble in the Pacific ones, El Niño, can dry out an Indian monsoon.",
        grades: [7, 11],
        syllabusRefs: ["ncert:7:geo:5"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["wind", "sun-energy"],
        related: ["monsoon", "climate-change", "tides", "cyclones", "climate-zones"],
        aliases: ["ocean circulation", "sea currents", "warm and cold currents", "oceans and seas"],
        keywords: ["salinity", "gyre", "warm current", "cold current", "upwelling", "thermohaline circulation", "conveyor belt", "Gulf Stream", "El Nino", "La Nina", "ENSO", "monsoon current", "continental shelf", "coral reef", "sea surface temperature"],
        misconceptions: ["Confusing currents with tides and waves — currents are steady rivers within the ocean, not the twice-daily rise and fall", "Thinking the ocean is uniformly salty, when rainfall, rivers and evaporation make the Bay of Bengal noticeably fresher than the Arabian Sea"],
        tools: [{ k: "activity", label: "Drop warm dyed water and chilled dyed water into a clear tank of room-temperature water and watch a thermohaline conveyor set itself up" }, { k: "activity", label: "Compare El Nino years with all-India monsoon rainfall for the last forty years — is the link as tight as the headlines claim?" }]
    },

    // ==================== ENVIRONMENT & RESOURCES ====================
    {
        id: "natural-resources", name: "Natural Resources", domain: "e-env", level: 2,
        desc: "Nothing is a resource until people have a use and a technology for it — uranium was a worthless yellow rock for most of history. The line that matters is renewable versus non-renewable, and the trap is that renewables stop being renewable the moment you take faster than they regrow.",
        grades: [8, 10],
        syllabusRefs: ["ncert:8:geo:1"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: [],
        related: ["fossil-fuels", "renewable-energy", "conservation-sustainability", "rocks-minerals", "soil-formation"],
        aliases: ["resources", "renewable and non-renewable resources", "types of resources", "resource classification"],
        keywords: ["renewable", "non-renewable", "biotic", "abiotic", "stock", "reserve", "potential resource", "developed resource", "ubiquitous", "localised", "resource depletion", "ore"],
        misconceptions: ["Thinking 'renewable' means inexhaustible, when a forest or an aquifer is only renewable at the rate it actually renews"],
        tools: [{ k: "activity", label: "Take one object off your desk and list every natural resource inside it, back to where each was dug, pumped or grown" }]
    },
    {
        id: "fossil-fuels", name: "Fossil Fuels", domain: "e-env", level: 3,
        desc: "Coal, oil and gas are buried sunlight: ancient plants and plankton, pressure-cooked underground for a few hundred million years. We are burning through that inheritance in a couple of centuries — which is both why they are non-renewable in any human sense and why the carbon they release is carbon the air had long ago put away.",
        grades: [8, 10],
        syllabusRefs: ["ncert:8:geo:3"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["natural-resources"],
        related: ["renewable-energy", "climate-change", "air-pollution", "greenhouse-effect", "rocks-minerals"],
        aliases: ["coal petroleum and natural gas", "conventional energy sources", "hydrocarbons", "power resources"],
        keywords: ["coal", "petroleum", "crude oil", "natural gas", "CNG", "LPG", "refining", "fractional distillation", "peat", "lignite", "anthracite", "thermal power", "Jharia", "Bombay High", "carbon dioxide", "non-renewable"],
        misconceptions: ["Believing petroleum comes from dead dinosaurs, when it is overwhelmingly marine plankton and algae", "Thinking oil sits in underground lakes, rather than soaked through porous rock like water in a sponge"],
        tools: [{ k: "activity", label: "Trace one day of your household's energy back to source — light, cooking, travel — and tag each step fossil or not" }]
    },
    {
        id: "renewable-energy", name: "Renewable Energy", domain: "e-env", level: 3,
        desc: "Sun, wind, falling water, tide, heat from the ground and biomass all refill on a human timescale — and all but two of those are sunlight wearing a disguise. The hard part was never the physics but the arithmetic: energy that is free, diffuse and intermittent has to be collected over area and stored for the night.",
        grades: [8, 10],
        syllabusRefs: ["ncert:8:geo:3"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["natural-resources", "sun-energy"],
        related: ["fossil-fuels", "climate-change", "conservation-sustainability", "wind", "tides"],
        aliases: ["non-conventional energy", "alternative energy sources", "clean energy", "solar and wind power"],
        keywords: ["solar", "photovoltaic", "solar cooker", "wind turbine", "hydroelectric", "biogas", "biomass", "geothermal", "tidal power", "nuclear", "grid", "storage", "intermittency", "capacity factor", "gaushala biogas", "Charanka", "Muppandal"],
        misconceptions: ["Assuming renewable automatically means harmless — big dams drown valleys and displace people, and panels and turbines still have to be mined and made"],
        tools: [{ k: "activity", label: "Solar cooker from a carton, foil and a glass sheet: log the temperature every ten minutes and work out the power it is actually catching" }, { k: "activity", label: "Estimate your roof's solar potential: area x about 1 kW per square metre x an honest efficiency — then compare with your electricity bill" }]
    },
    {
        id: "air-pollution", name: "Air Pollution", domain: "e-env", level: 3,
        desc: "Air pollution is stuff in the air that should not be there in that quantity — the worst of it PM2.5, particles small enough to slip past the nose and lodge in the lungs. Delhi's winter smog is not just more smoke: cold air sits in a lid-like inversion that traps a whole season's burning under it.",
        grades: [8, 10],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["air-atmosphere"],
        related: ["fossil-fuels", "climate-change", "ozone-depletion", "atmosphere-layers", "waste-recycling"],
        aliases: ["air quality", "smog", "atmospheric pollution", "pollution of air"],
        keywords: ["PM2.5", "PM10", "particulate matter", "AQI", "smog", "temperature inversion", "sulphur dioxide", "nitrogen oxides", "carbon monoxide", "ground-level ozone", "acid rain", "stubble burning", "indoor air pollution", "chulha", "Taj Mahal", "catalytic converter"],
        misconceptions: ["Thinking outdoor air is the whole problem, when smoke from indoor cooking fires kills on a comparable scale", "Judging air quality by how it looks — the deadliest particles are far too small to see or smell"],
        tools: [{ k: "activity", label: "Smear petroleum jelly on index cards, hang them at the kitchen, the roadside and a park for a week, then count the specks under a lens" }, { k: "activity", label: "Log your city's AQI daily for a month against wind and temperature — the bad days will have a pattern" }]
    },
    {
        id: "water-pollution", name: "Water Pollution", domain: "e-env", level: 3,
        desc: "Sewage, factory effluent, farm fertiliser and plastic all end up in the same river, and the damage is often invisible: organic waste feeds bacteria that strip the oxygen out until the fish suffocate. That is what BOD measures — not the poison, but the appetite of what you added.",
        grades: [7, 8, 10],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["water-cycle"],
        related: ["rivers-drainage", "groundwater", "waste-recycling", "conservation-sustainability"],
        aliases: ["pollution of water", "water quality", "contamination of water", "wastewater"],
        keywords: ["sewage", "effluent", "BOD", "dissolved oxygen", "eutrophication", "algal bloom", "coliform", "turbidity", "pH", "heavy metals", "arsenic", "fluoride", "microplastics", "thermal pollution", "sewage treatment plant", "Namami Gange", "potable water"],
        misconceptions: ["Thinking clear water is safe water — the cholera and the arsenic are invisible", "Believing a river 'cleans itself' however much you put in, when self-purification has a rate and a limit"],
        tools: [{ k: "activity", label: "Compare tap, pond and puddle water for turbidity and pH, and let three sealed jars sit a week — smell tells you which had the highest BOD" }, { k: "activity", label: "Build a filter of gravel, sand and charcoal in a bottle: it will clear muddy water and still not make it safe to drink — ask why" }]
    },
    {
        id: "waste-recycling", name: "Waste & Recycling", domain: "e-env", level: 3,
        desc: "There is no 'away': everything thrown out lands in a heap, a drain or a burner somewhere, and a landfill will hold a plastic bag roughly as long as the Taj Mahal has stood. Segregation at source is the entire game — wet waste composts happily, but mix it with dry and you have made both halves worthless.",
        grades: [6, 8, 10],
        status: "review",
        tracks: ["school-primary", "school-middle", "school-high"],
        prereqs: ["natural-resources"],
        related: ["water-pollution", "air-pollution", "conservation-sustainability", "soil-formation"],
        aliases: ["garbage management", "solid waste management", "land pollution", "waste disposal", "garbage in garbage out"],
        keywords: ["biodegradable", "non-biodegradable", "segregation", "wet waste", "dry waste", "compost", "vermicompost", "landfill", "leachate", "incineration", "e-waste", "microplastic", "single-use plastic", "reduce reuse recycle", "extended producer responsibility", "ragpicker", "Deonar", "Ghazipur"],
        misconceptions: ["Thinking recycling solves it, when reduce and reuse come first and most 'recycled' plastic is actually downcycled once and then dumped", "Assuming biodegradable means it will vanish anywhere — buried airless in a landfill, even a banana peel can last for years"],
        tools: [{ k: "activity", label: "Weigh and sort one week of household waste into wet, dry, sanitary and e-waste — the pie chart usually shocks the family" }, { k: "activity", label: "Bury paper, a banana peel, cloth and a plastic wrapper in labelled pots; dig them up after two months and photograph the survivors" }]
    },
    {
        id: "greenhouse-effect", name: "The Greenhouse Effect", domain: "e-env", level: 3,
        desc: "Sunlight passes through the air and warms the ground; the ground radiates the heat back as infrared, and CO2, methane and water vapour absorb that on the way out and re-radiate it downward. Without this, Earth's average would be about -18 °C and the oceans frozen — the effect is not the problem, the thickening of it is.",
        grades: [9, 11],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["atmosphere-layers", "sun-energy"],
        related: ["climate-change", "ozone-depletion", "fossil-fuels", "em-spectrum", "temperature-heat"],
        aliases: ["greenhouse gases", "natural greenhouse effect", "atmospheric warming"],
        keywords: ["carbon dioxide", "methane", "water vapour", "nitrous oxide", "CFC", "infrared", "long-wave radiation", "re-radiation", "radiative forcing", "energy balance", "albedo", "Venus"],
        misconceptions: ["Thinking the greenhouse effect and the ozone hole are the same problem, or that greenhouse gases work by 'letting heat in through the hole'", "Believing the greenhouse effect is inherently bad, when it is the reason the planet is habitable at all"],
        tools: [{ k: "activity", label: "Two jars with thermometers in the Sun, one lidded with cling film: the lid wins, and the difference is the whole idea" }, { k: "activity", label: "Argue why Venus, further from the Sun than Mercury, is hotter — the answer is 96 per cent CO2" }]
    },
    {
        id: "climate-change", name: "Climate Change", domain: "e-env", level: 4,
        desc: "Two centuries of burning coal, oil and gas have pushed atmospheric CO2 from about 280 to over 420 parts per million — higher than at any point in the last three million years — thickening the greenhouse blanket and warming Earth by roughly 1.2 °C. That mild-sounding average lands on India as a jumpier monsoon that delivers the same annual rain in fewer, fiercer bursts, Himalayan glaciers retreating above the rivers that feed the plains, heatwaves crossing the survivable wet-bulb line, and the sea rising under Mumbai and the Sundarbans. The physics has been understood since the 1850s; what is genuinely open is what we decide to do.",
        grades: [9, 10, 11],
        status: "review",
        tracks: ["school-middle", "school-high", "olympiad"],
        prereqs: ["greenhouse-effect", "weather-climate", "fossil-fuels"],
        related: ["monsoon", "ocean-currents", "renewable-energy", "conservation-sustainability", "cyclones", "correlation-causation", "graphs-as-models"],
        aliases: ["global warming", "anthropogenic climate change", "climate crisis", "global heating"],
        keywords: ["carbon dioxide", "ppm", "Keeling curve", "IPCC", "carbon footprint", "net zero", "mitigation", "adaptation", "sea level rise", "glacier retreat", "wet-bulb temperature", "heatwave", "extreme rainfall", "ice core", "Paris Agreement", "carbon sink", "feedback loop", "albedo", "Sundarbans", "Gangotri"],
        misconceptions: ["Taking a cold winter or a freak hailstorm as proof the planet is not warming — climate is the statistics of weather, and no single day votes", "Confusing climate change with the ozone hole, or thinking the warming comes from the Sun's heat leaking in through it", "Assuming a couple of degrees is trivial because a 2 °C day-to-day change is unnoticeable — the last ice age was only about 5 °C colder than now, with Canada under a kilometre of ice"],
        tools: [{ k: "activity", label: "Plot the Keeling curve and the global temperature record on the same time axis — then find the annual CO2 wiggle and explain why the Northern Hemisphere's summer breathes in" }, { k: "activity", label: "Compare your town's IMD rainfall records from the 1970s with the last decade: same total, different distribution?" }, { k: "activity", label: "Work out a household carbon footprint from electricity, cooking gas and travel, then rank which single change would cut the most" }]
    },
    {
        id: "ozone-depletion", name: "Ozone Depletion", domain: "e-env", level: 3,
        desc: "A thin haze of ozone in the stratosphere absorbs the ultraviolet that would otherwise wreck DNA — and CFCs from old fridges and sprays were quietly destroying it, one chlorine atom taking out thousands of ozone molecules. It is also the one big environmental problem the world actually fixed: the Montreal Protocol banned CFCs, and the hole is slowly closing.",
        grades: [9, 11],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["atmosphere-layers"],
        related: ["greenhouse-effect", "climate-change", "air-pollution", "em-spectrum"],
        aliases: ["ozone layer depletion", "ozone hole", "stratospheric ozone"],
        keywords: ["ozone", "O3", "CFC", "chlorofluorocarbon", "HCFC", "ultraviolet", "UV-B", "stratosphere", "Antarctic ozone hole", "Dobson unit", "Montreal Protocol", "catalytic destruction", "skin cancer"],
        misconceptions: ["Thinking the ozone hole causes global warming, or that it is a literal hole you could fall through", "Confusing the good ozone high up with the ground-level ozone in smog, which is a pollutant that harms lungs"],
        tools: [{ k: "activity", label: "UV beads in sunlight: shade them with glass, cloth and sunscreen and see what actually blocks UV — then imagine 30 per cent more of it" }]
    },
    {
        id: "conservation-sustainability", name: "Conservation & Sustainability", domain: "e-env", level: 3,
        desc: "Sustainable use means leaving the system able to keep giving — taking fish no faster than they breed, water no faster than it recharges, soil no faster than it forms. India's oldest answers are not new technology but old arrangements: sacred groves, johads and step-wells, and community forests that outlast the governments that manage them.",
        grades: [8, 10, 11],
        syllabusRefs: ["ncert:8:geo:1"],
        status: "review",
        tracks: ["school-middle", "school-high"],
        prereqs: ["natural-resources"],
        related: ["climate-change", "waste-recycling", "renewable-energy", "groundwater", "soil-formation", "water-cycle"],
        aliases: ["sustainable development", "resource conservation", "conservation of resources"],
        keywords: ["sustainable development", "carrying capacity", "tragedy of the commons", "3R", "reduce reuse recycle", "rainwater harvesting", "johad", "check dam", "watershed management", "sacred grove", "Chipko", "commons", "intergenerational equity", "Agenda 21", "SDG"],
        misconceptions: ["Thinking conservation means locking nature away and using nothing, rather than using it at a rate it can sustain", "Assuming individual habits alone will do it, or conversely that nothing an individual does matters — the real question is which choices scale"],
        tools: [{ k: "activity", label: "Fishing game: a bowl of beans, four players, and the stock doubles each round — see how many rounds the commons survives, then let the players make rules and replay" }, { k: "activity", label: "Audit the school's water: measure a leaking tap's drip rate for a minute and scale it to a year" }]
    }
);
