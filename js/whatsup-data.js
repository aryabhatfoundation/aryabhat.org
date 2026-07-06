/*
 * whatsup — content catalogues + city list (data only)
 * =====================================================
 * Split out of whatsup.html so content can be edited without touching the
 * engine. whatsup.html reads these via window.WHATSUP_DATA. Extend freely.
 */
window.WHATSUP_DATA = (function () {

        var CITIES = [
            { name: 'Agra', lat: 27.1767, lng: 78.0081 },
            { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
            { name: 'Ajmer', lat: 26.4499, lng: 74.6399 },
            { name: 'Akola', lat: 20.7002, lng: 77.0082 },
            { name: 'Aligarh', lat: 27.8974, lng: 78.088 },
            { name: 'Amravati', lat: 20.9374, lng: 77.7796 },
            { name: 'Amritsar', lat: 31.634, lng: 74.8723 },
            { name: 'Asansol', lat: 23.6739, lng: 86.9524 },
            { name: 'Aurangabad', lat: 19.8762, lng: 75.3433 },
            { name: 'Bareilly', lat: 28.367, lng: 79.4304 },
            { name: 'Belagavi', lat: 15.8497, lng: 74.4977 },
            { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
            { name: 'Bhavnagar', lat: 21.7645, lng: 72.1519 },
            { name: 'Bhilai', lat: 21.209, lng: 81.4285 },
            { name: 'Bhiwandi', lat: 19.2967, lng: 73.0631 },
            { name: 'Bhopal', lat: 23.2599, lng: 77.4126 },
            { name: 'Bhubaneswar', lat: 20.2961, lng: 85.8245 },
            { name: 'Bikaner', lat: 28.0229, lng: 73.3119 },
            { name: 'Bilaspur', lat: 22.0797, lng: 82.1409 },
            { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
            { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
            { name: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
            { name: 'Cuttack', lat: 20.4625, lng: 85.883 },
            { name: 'Davanagere', lat: 14.4644, lng: 75.9218 },
            { name: 'Dehradun', lat: 30.3165, lng: 78.0322 },
            { name: 'Delhi', lat: 28.6139, lng: 77.209 },
            { name: 'Dhanbad', lat: 23.7957, lng: 86.4304 },
            { name: 'Durgapur', lat: 23.5204, lng: 87.3119 },
            { name: 'Erode', lat: 11.341, lng: 77.7172 },
            { name: 'Faridabad', lat: 28.4089, lng: 77.3178 },
            { name: 'Firozabad', lat: 27.1591, lng: 78.3958 },
            { name: 'Gaya', lat: 24.7969, lng: 85.0002 },
            { name: 'Ghaziabad', lat: 28.6692, lng: 77.4538 },
            { name: 'Gorakhpur', lat: 26.7606, lng: 83.3732 },
            { name: 'Guntur', lat: 16.3067, lng: 80.4365 },
            { name: 'Gurugram', lat: 28.4595, lng: 77.0266 },
            { name: 'Guwahati', lat: 26.1445, lng: 91.7362 },
            { name: 'Gwalior', lat: 26.2183, lng: 78.1828 },
            { name: 'Howrah', lat: 22.5958, lng: 88.2636 },
            { name: 'Hubballi-Dharwad', lat: 15.3647, lng: 75.124 },
            { name: 'Hyderabad', lat: 17.385, lng: 78.4867 },
            { name: 'Indore', lat: 22.7196, lng: 75.8577 },
            { name: 'Jabalpur', lat: 23.1815, lng: 79.9864 },
            { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
            { name: 'Jalandhar', lat: 31.326, lng: 75.5762 },
            { name: 'Jalgaon', lat: 21.0077, lng: 75.5626 },
            { name: 'Jammu', lat: 32.7266, lng: 74.857 },
            { name: 'Jamnagar', lat: 22.4707, lng: 70.0577 },
            { name: 'Jamshedpur', lat: 22.8046, lng: 86.2029 },
            { name: 'Jhansi', lat: 25.4484, lng: 78.5685 },
            { name: 'Jodhpur', lat: 26.2389, lng: 73.0243 },
            { name: 'Kalaburagi', lat: 17.3297, lng: 76.8343 },
            { name: 'Kalyan-Dombivli', lat: 19.2403, lng: 73.1305 },
            { name: 'Kanpur', lat: 26.4499, lng: 80.3319 },
            { name: 'Kochi', lat: 9.9312, lng: 76.2673 },
            { name: 'Kolhapur', lat: 16.705, lng: 74.2433 },
            { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
            { name: 'Kota', lat: 25.2138, lng: 75.8648 },
            { name: 'Kozhikode', lat: 11.2588, lng: 75.7804 },
            { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
            { name: 'Ludhiana', lat: 30.901, lng: 75.8573 },
            { name: 'Madurai', lat: 9.9252, lng: 78.1198 },
            { name: 'Mangaluru', lat: 12.9141, lng: 74.856 },
            { name: 'Meerut', lat: 28.9845, lng: 77.7064 },
            { name: 'Moradabad', lat: 28.8386, lng: 78.7733 },
            { name: 'Mumbai', lat: 19.076, lng: 72.8777 },
            { name: 'Mysuru', lat: 12.2958, lng: 76.6394 },
            { name: 'Nagpur', lat: 21.1458, lng: 79.0882 },
            { name: 'Nanded', lat: 19.1383, lng: 77.321 },
            { name: 'Nashik', lat: 19.9975, lng: 73.7898 },
            { name: 'Navi Mumbai', lat: 19.033, lng: 73.0297 },
            { name: 'Nellore', lat: 14.4426, lng: 79.9865 },
            { name: 'Noida', lat: 28.5355, lng: 77.391 },
            { name: 'Panaji', lat: 15.4909, lng: 73.8278 },
            { name: 'Patna', lat: 25.5941, lng: 85.1376 },
            { name: 'Prayagraj', lat: 25.4358, lng: 81.8463 },
            { name: 'Pune', lat: 18.5204, lng: 73.8567 },
            { name: 'Raipur', lat: 21.2514, lng: 81.6296 },
            { name: 'Rajkot', lat: 22.3039, lng: 70.8022 },
            { name: 'Ranchi', lat: 23.3441, lng: 85.3096 },
            { name: 'Rewa', lat: 24.5362, lng: 81.3037 },
            { name: 'Rourkela', lat: 22.2604, lng: 84.8536 },
            { name: 'Sagar', lat: 23.8388, lng: 78.7378 },
            { name: 'Saharanpur', lat: 29.968, lng: 77.546 },
            { name: 'Salem', lat: 11.6643, lng: 78.146 },
            { name: 'Sangli', lat: 16.8524, lng: 74.5815 },
            { name: 'Satna', lat: 24.6005, lng: 80.8322 },
            { name: 'Shimla', lat: 31.1048, lng: 77.1734 },
            { name: 'Siliguri', lat: 26.7271, lng: 88.3953 },
            { name: 'Solapur', lat: 17.6599, lng: 75.9064 },
            { name: 'Srinagar', lat: 34.0837, lng: 74.7973 },
            { name: 'Surat', lat: 21.1702, lng: 72.8311 },
            { name: 'Thane', lat: 19.2183, lng: 72.9781 },
            { name: 'Thiruvananthapuram', lat: 8.5241, lng: 76.9366 },
            { name: 'Tiruchirappalli', lat: 10.7905, lng: 78.7047 },
            { name: 'Tirunelveli', lat: 8.7139, lng: 77.7567 },
            { name: 'Tirupati', lat: 13.6288, lng: 79.4192 },
            { name: 'Udaipur', lat: 24.5854, lng: 73.7125 },
            { name: 'Ujjain', lat: 23.1765, lng: 75.7885 },
            { name: 'Vadodara', lat: 22.3072, lng: 73.1812 },
            { name: 'Varanasi', lat: 25.3176, lng: 82.9739 },
            { name: 'Vasai-Virar', lat: 19.4259, lng: 72.8225 },
            { name: 'Vidisha', lat: 23.5251, lng: 77.8081 },
            { name: 'Vijayawada', lat: 16.5062, lng: 80.648 },
            { name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185 },
            { name: 'Warangal', lat: 17.9689, lng: 79.5941 },

            // ── Dark-sky sites & astronomy observatories ──────────────────
            // Smaller places, but the ones that matter most for stargazing:
            // high-altitude Ladakh/Himalaya, observatory towns, and India's
            // best-known dark-sky destinations. (The list is sorted below, so
            // new entries can be dropped in here in any order.)
            { name: 'Leh', lat: 34.1642, lng: 77.5848 },
            { name: 'Hanle', lat: 32.7794, lng: 78.9642 },              // Indian Astronomical Observatory; Hanle Dark Sky Reserve
            { name: 'Kargil', lat: 34.5539, lng: 76.1349 },
            { name: 'Diskit (Nubra)', lat: 34.5462, lng: 77.5540 },
            { name: 'Pangong Tso', lat: 33.7500, lng: 78.6600 },
            { name: 'Tso Moriri', lat: 32.9083, lng: 78.3200 },
            { name: 'Kaza (Spiti)', lat: 32.2257, lng: 78.0716 },
            { name: 'Gulmarg', lat: 34.0484, lng: 74.3805 },
            { name: 'Chopta', lat: 30.4922, lng: 79.0212 },
            { name: 'Nainital', lat: 29.3919, lng: 79.4542 },           // ARIES
            { name: 'Devasthal', lat: 29.3614, lng: 79.6839 },          // ARIES 3.6m optical telescope
            { name: 'Mount Abu', lat: 24.5926, lng: 72.7156 },          // PRL infrared observatory (Gurushikhar)
            { name: 'Kavalur', lat: 12.5765, lng: 78.8253 },            // Vainu Bappu Observatory
            { name: 'Kodaikanal', lat: 10.2381, lng: 77.4892 },         // solar observatory
            { name: 'Gauribidanur', lat: 13.6086, lng: 77.4344 },       // radio observatory
            { name: 'Ooty', lat: 11.4102, lng: 76.6950 },               // Ooty Radio Telescope
            { name: 'Jaisalmer', lat: 26.9157, lng: 70.9083 },          // Thar desert skies
            { name: 'Rann of Kutch', lat: 23.9060, lng: 69.6710 },
            { name: 'Coorg (Madikeri)', lat: 12.4208, lng: 75.7397 },
            { name: 'Munnar', lat: 10.0889, lng: 77.0595 },
            { name: 'Mahabaleshwar', lat: 17.9307, lng: 73.6477 },
            { name: 'Savandurga', lat: 12.9190, lng: 77.2900 },
            { name: 'Pench (Dark Sky Park)', lat: 21.7167, lng: 79.2833 } // India's first Dark Sky Park
        ];
        // Keep the picker alphabetical no matter the insertion order above.
        CITIES.sort(function (a, b) { return a.name.localeCompare(b.name); });

        var PLANETS = [
            {
                id: 'venus', body: 'Venus', name: 'Venus', dev: 'शुक्र', translit: 'Shukra',
                kicker: 'The evening star', minAlt: 4,
                body_text: 'The brightest point of light in the sky after the Moon — so bright people mistake it for a plane or a drone. It never strays far from the Sun, so we only ever catch it low in the west after sunset or low in the east before dawn.',
                telescope: 'Through the telescope Venus is not a full dot but a tiny lit phase — a crescent or half — exactly like a miniature Moon. Galileo saw this 400 years ago and it helped prove the Earth goes around the Sun.',
                facts: ['<b>Hottest planet</b> — 465°C under thick cloud', '<b>Same size</b> as Earth', 'A day is <b>longer</b> than its year']
            },
            {
                id: 'jupiter', body: 'Jupiter', name: 'Jupiter', dev: 'बृहस्पति', translit: 'Brihaspati',
                kicker: "The night's big prize", minAlt: 4, scope: true,
                body_text: 'The biggest planet — you could pour 1,300 Earths into it. To the eye it is a steady, cream-coloured "star" that does not twinkle. To a telescope it is a whole miniature solar system.',
                telescope: 'Even a small telescope shows its dark cloud belts, and its four largest moons strung out in a line beside it — Io, Europa, Ganymede and Callisto. Their positions shift every single night. Galileo found them in 1610; you can see them in steady binoculars.',
                facts: ['<b>4 bright moons</b> discovered by Galileo', 'A storm — the <b>Great Red Spot</b> — bigger than Earth', '<b>11×</b> Earth\'s width']
            },
            {
                id: 'saturn', body: 'Saturn', name: 'Saturn', dev: 'शनि', translit: 'Shani',
                kicker: 'The one with rings', minAlt: 4, scope: true,
                body_text: 'The object that makes first-time visitors gasp. To the naked eye Saturn is a modest yellow "star", easy to walk past. Put it in a telescope and the rings snap into view — and nobody quite believes they are real.',
                telescope: 'A backyard telescope is enough to see the rings as a distinct band around the planet. Its giant moon Titan shows up as a bright dot nearby. The rings are made of countless chunks of ice, yet are only about ten metres thick.',
                facts: ['<b>Rings of ice</b> 2,80,000 km wide', 'Would <b>float</b> in water', '<b>140+ moons</b>, incl. cloudy Titan']
            },
            {
                id: 'mars', body: 'Mars', name: 'Mars', dev: 'मंगल', translit: 'Mangal',
                kicker: 'The red planet', minAlt: 4,
                body_text: 'Unmistakably orange-red — the colour of rust, which is literally what tints its soil. It shines with a steady light rather than twinkling, and its brightness changes a lot through the year as Earth catches up to it and pulls ahead.',
                telescope: 'When Mars is near us, a telescope can show a small ochre disk with a white polar cap and faint dark markings. When it is far, even big telescopes show only a tiny dot — so a close year is a treat.',
                facts: ['Home to <b>Olympus Mons</b>, the tallest volcano', 'A day lasts <b>24h 37m</b>', '<b>Two</b> tiny potato-shaped moons']
            },
            {
                id: 'mercury', body: 'Mercury', name: 'Mercury', dev: 'बुध', translit: 'Budha',
                kicker: 'The shy one', minAlt: 3,
                body_text: 'The hardest of the naked-eye planets to catch. Mercury hugs the horizon in the glow of dusk or dawn and is gone within the hour. Spotting it at all is a small victory — many lifelong sky-watchers rarely have.',
                telescope: 'So low that the air smears it, Mercury shows little more than a tiny phase in a telescope. The real prize is simply catching the closest planet to the Sun with your own eyes.',
                facts: ['<b>Closest</b> planet to the Sun', 'Smallest planet — barely bigger than the Moon', 'A year is just <b>88 days</b>']
            }
        ];

        // Constellations. `ra`/`dec` = a bright anchor star, for visibility.
        // `aster` = normalised star pattern (0–100 wide viewbox), else `glyph`.
        var CONSTELLATIONS = [
            {
                id: 'orion', name: 'Orion', dev: 'मृग · कालपुरुष', translit: 'Mriga / Kalapurusha',
                ra: 5.60, dec: 0.0, minAlt: 12,
                body_text: 'The easiest pattern in the whole sky to find: three bright stars in a short, straight row — Orion\'s Belt. Above hangs red Betelgeuse (his shoulder), below sits blue-white Rigel (his foot). In India the same stars are seen as मृग, the deer.',
                find: 'Look for the three-in-a-row belt. From the belt, a fainter line of stars hangs down — that is his sword, and the middle "star" is the glowing Orion Nebula.',
                facts: ['<b>Betelgeuse</b> — a red giant near the end of its life', '<b>Rigel</b> — a blue supergiant, far brighter than the Sun', 'The belt points to <b>Sirius</b>, the brightest star'],
                fig: { s: [[5.919, 7.407], [5.418, 6.350], [5.679, -1.943], [5.604, -1.202], [5.533, -0.299], [5.796, -9.670], [5.242, -8.202]], b: [0, 6], l: [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [5, 6]] }
            },
            {
                id: 'ursa', name: 'The Big Dipper', dev: 'सप्तर्षि', translit: 'Saptarshi',
                ra: 13.398, dec: 54.926, minAlt: 12,
                body_text: 'Seven bright stars shaped like a ladle or a question-mark. To Indian eyes these are the सप्तर्षि — the seven great sages. They wheel around the Pole Star through the night and never fully set from our latitude in the right season.',
                find: 'The two stars at the front of the bowl are the "Pointers" — draw a line through them and it lands on Polaris, the North Star. The middle star of the handle, Mizar, has a faint companion Alcor — in tradition, Vashishtha and his wife Arundhati.',
                facts: ['The <b>Pointers</b> find the North Star', '<b>Mizar &amp; Alcor</b> — the classic eyesight test', 'Part of the Great Bear, <b>Ursa Major</b>'],
                fig: { s: [[11.062, 61.751], [11.031, 56.383], [11.897, 53.695], [12.257, 57.033], [12.900, 55.960], [13.399, 54.925], [13.792, 49.313]], b: [], l: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]] }
            },
            {
                id: 'cassiopeia', name: 'Cassiopeia', dev: '', translit: 'The Queen',
                ra: 0.675, dec: 56.537, minAlt: 12,
                body_text: 'A bright, lopsided "W" (or "M", depending on the hour) of five stars, sitting in a rich part of the Milky Way. It circles the Pole Star opposite the Big Dipper, so when one is low, the other rides high.',
                find: 'Find the North Star, then look to the side away from the Dipper for a zig-zag of five stars. On a dark night the Milky Way runs right through it.',
                facts: ['Circles the pole — <b>never sets</b> from here', 'Sits in the <b>Milky Way</b>', 'Opposite the <b>Big Dipper</b>'],
                fig: { s: [[0.153, 59.150], [0.675, 56.537], [0.945, 60.717], [1.430, 60.235], [1.907, 63.670]], b: [], l: [[0, 1], [1, 2], [2, 3], [3, 4]] }
            },
            {
                id: 'taurus', name: 'Taurus', dev: 'वृषभ', translit: 'Vrishabha',
                ra: 4.599, dec: 16.509, minAlt: 12,
                body_text: 'The bull, marked by a "V" of stars forming his face, with the orange eye Aldebaran (रोहिणी) glaring out. Riding on his shoulder is the tiny, glittering knot of the Pleiades — one of the loveliest sights in binoculars.',
                find: 'From Orion\'s Belt, follow the line up and to the right to reach orange Aldebaran and the V-shaped face. Keep going to find the little dipper-shaped Pleiades cluster.',
                facts: ['<b>Aldebaran</b> = रोहिणी, the bull\'s eye', 'Carries the <b>Pleiades</b> star cluster', 'The <b>V</b> is the Hyades cluster'],
                fig: { s: [[5.438, 28.608], [5.627, 21.142], [4.599, 16.509], [4.329, 15.628], [4.382, 17.542], [4.477, 19.180]], b: [2], l: [[3, 2], [3, 4], [4, 5], [5, 0], [2, 1]] }
            },
            {
                id: 'gemini', name: 'Gemini', dev: 'मिथुन', translit: 'Mithuna',
                ra: 7.755, dec: 28.026, minAlt: 12,
                body_text: 'The twins — two roughly equal bright stars, Castor and Pollux, sitting side by side like a pair of eyes, with two long parallel lines of fainter stars forming their bodies.',
                find: 'Look up and to the left of Orion for two bright stars close together. Pollux is the slightly brighter, more golden one; Castor is white.',
                facts: ['<b>Castor</b> is really six stars in one', '<b>Pollux</b> has a known planet', 'High overhead on <b>winter</b> evenings'],
                fig: { s: [[7.577, 31.888], [7.755, 28.026], [6.732, 25.131], [6.383, 22.514], [6.629, 16.399], [7.335, 21.982]], b: [0, 1], l: [[0, 1], [0, 2], [2, 3], [1, 5], [5, 4]] }
            },
            {
                id: 'leo', name: 'Leo', dev: 'सिंह', translit: 'Simha',
                ra: 10.139, dec: 11.967, minAlt: 12,
                body_text: 'One of the few constellations that genuinely looks like its animal — a crouching lion. A backward question-mark of stars (the "Sickle") forms his mane and head, with a triangle behind for his hindquarters.',
                find: 'Look for the backward question-mark; the bright star at its base, Regulus (मघा), is the lion\'s heart. A rides-high spring constellation.',
                facts: ['<b>Regulus</b> = मघा, "the little king"', 'The <b>Sickle</b> is his head and mane', 'Host to the <b>Leonid</b> meteors in November'],
                fig: { s: [[10.139, 11.967], [10.122, 16.763], [10.333, 19.842], [10.278, 23.417], [9.879, 26.007], [9.764, 23.774], [11.235, 20.524], [11.237, 15.430], [11.818, 14.572]], b: [0], l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [6, 8], [8, 7], [7, 0], [6, 7]] }
            },
            {
                id: 'bootes', name: 'Boötes', dev: '', translit: 'The Herdsman',
                ra: 14.261, dec: 19.182, minAlt: 12,
                body_text: 'A large kite- or ice-cream-cone-shaped figure, anchored by Arcturus (स्वाति) — a brilliant orange star, the brightest in the northern half of the sky.',
                find: 'Follow the curve of the Big Dipper\'s handle away from the bowl — "arc to Arcturus" — and you land on the bright orange star at the base of the kite.',
                facts: ['<b>Arcturus</b> = स्वाति, 4th-brightest star', 'Its light left the star <b>37 years</b> ago', '"Arc to Arcturus" from the <b>Dipper</b>'],
                fig: { s: [[14.261, 19.182], [14.749, 27.074], [15.258, 33.315], [15.032, 40.390], [14.534, 38.308], [14.532, 30.371], [13.912, 18.398]], b: [0], l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6]] }
            },
            {
                id: 'scorpius', name: 'Scorpius', dev: 'वृश्चिक', translit: 'Vrishchika',
                ra: 16.490, dec: -26.432, minAlt: 10,
                body_text: 'Another that truly looks the part: a long curving line of stars with a hooked tail — a scorpion. At its heart burns red Antares (ज्येष्ठा), a supergiant so large it would swallow the orbit of Mars.',
                find: 'Low in the south on summer evenings. Find the bright red star (Antares) with two stars flanking it, then trace the body curving down to the stinger.',
                facts: ['<b>Antares</b> = ज्येष्ठा, "rival of Mars"', 'Sits toward the <b>galactic centre</b>', 'Rich in <b>star clusters</b> for binoculars'],
                fig: { s: [[16.090, -19.805], [16.005, -22.622], [15.981, -26.114], [16.490, -26.432], [16.598, -28.216], [16.836, -34.293], [16.864, -38.017], [16.911, -42.362], [17.203, -43.239], [17.622, -42.998], [17.708, -39.030], [17.560, -37.104]], b: [3], l: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11]] }
            },
            {
                id: 'sagittarius', name: 'Sagittarius', dev: 'धनु', translit: 'Dhanu',
                ra: 18.921, dec: -26.297, minAlt: 10,
                body_text: 'Classically an archer, but almost everyone sees the "Teapot" — eight stars in the perfect shape of a kettle with a handle and spout. Its spout points straight at the centre of our own Milky Way galaxy.',
                find: 'Low in the south in summer, just left of Scorpius. On a dark night the Milky Way rises like "steam" out of the teapot\'s spout.',
                facts: ['Its spout aims at the <b>galaxy\'s core</b>', 'Densest <b>Milky Way</b> star clouds', 'Packed with <b>nebulae and clusters</b>'],
                fig: { s: [[18.097, -30.424], [18.350, -29.828], [18.403, -34.385], [18.466, -25.421], [18.762, -26.991], [18.921, -26.297], [19.115, -27.670], [19.044, -29.880]], b: [5], l: [[0, 1], [0, 2], [1, 2], [2, 7], [7, 4], [4, 1], [3, 1], [3, 4], [4, 5], [5, 6], [6, 7]] }
            },
            {
                id: 'cygnus', name: 'Cygnus', dev: 'हंस', translit: 'Hamsa',
                ra: 20.690, dec: 45.280, minAlt: 12,
                body_text: 'A large, clear cross of bright stars flying down the Milky Way — the swan, with wings spread and neck outstretched. It is also called the Northern Cross. Bright Deneb marks the tail.',
                find: 'High overhead on summer and autumn evenings. Deneb, Vega and Altair form the big "Summer Triangle"; Cygnus flies inside it, right along the Milky Way.',
                facts: ['<b>Deneb</b> — one of the most luminous stars known', 'Flies along the <b>Milky Way</b>', 'Anchors the <b>Summer Triangle</b>'],
                fig: { s: [[20.690, 45.280], [20.371, 40.257], [19.512, 27.960], [19.749, 45.131], [20.770, 33.970]], b: [0], l: [[0, 1], [1, 2], [3, 1], [1, 4]] }
            },
            {
                id: 'lyra', name: 'Lyra', dev: '', translit: 'The Lyre',
                ra: 18.615, dec: 38.784, minAlt: 12,
                body_text: 'Small but easy, thanks to Vega — a brilliant blue-white star that is often the first to appear after sunset in summer. A little parallelogram of fainter stars hangs below it: the harp.',
                find: 'Find the very bright bluish star high overhead in summer — that is Vega, the top corner of the Summer Triangle.',
                facts: ['<b>Vega</b> — was the pole star 12,000 yrs ago', 'Holds the <b>Ring Nebula</b> (M57)', 'A corner of the <b>Summer Triangle</b>'],
                fig: { s: [[18.615, 38.784], [18.740, 39.612], [18.746, 37.605], [18.908, 36.899], [18.982, 32.690], [18.834, 33.363]], b: [0], l: [[0, 1], [0, 2], [1, 2], [2, 5], [5, 4], [4, 3], [3, 2]] }
            },
            {
                id: 'canis', name: 'Canis Major', dev: '', translit: 'The Great Dog',
                ra: 6.752, dec: -16.716, minAlt: 10,
                body_text: 'Orion\'s hunting dog, and home to Sirius — the brightest star in the entire night sky. Sirius blazes white and, being low, often flashes red-green-blue as our air splits its light.',
                find: 'Follow Orion\'s Belt down and to the left; it points straight at brilliant Sirius. Below it, a rough triangle of stars forms the dog\'s body.',
                facts: ['<b>Sirius</b> — the brightest night-time star', 'Only <b>8.6 light-years</b> away', 'Its twinkling colours are our <b>atmosphere</b>'],
                fig: { s: [[6.752, -16.716], [6.378, -17.956], [7.140, -26.393], [6.977, -28.972], [7.402, -29.303], [6.338, -30.063]], b: [0], l: [[1, 0], [0, 2], [2, 3], [2, 4], [3, 5]] }
            },
            {
                id: 'auriga', name: 'Auriga', dev: '', translit: 'The Charioteer',
                ra: 5.278, dec: 45.998, minAlt: 12,
                body_text: 'A big, bright pentagon riding high overhead in winter, crowned by the golden star Capella — the sixth-brightest star in the sky and one of the first you\'ll notice on a cold evening.',
                find: 'Look nearly straight up on winter nights for a large ring of bright stars; the brightest, Capella, is a warm yellow.',
                facts: ['<b>Capella</b> — actually four stars', 'Rides <b>high overhead</b> in winter', 'Strung with <b>star clusters</b>'],
                fig: { s: [[5.278, 45.998], [5.992, 44.947], [5.995, 37.213], [5.438, 28.608], [4.950, 33.166]], b: [0], l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]] }
            },
            {
                id: 'pegasus', name: 'Pegasus & Andromeda', dev: '', translit: 'The Winged Horse',
                ra: 0.139, dec: 29.09, minAlt: 12,
                body_text: 'A huge, near-perfect square of four stars — the Great Square of Pegasus — dominates autumn evenings. From one corner, a chain of stars leads off to Andromeda, and to the farthest thing your eye can see.',
                find: 'Spot the big empty square high in the east/overhead in autumn. Follow the two stars trailing from its top-left corner to reach the faint smudge of the Andromeda Galaxy.',
                facts: ['The <b>Great Square</b> is a giant signpost', 'Points to the <b>Andromeda Galaxy</b>', 'An <b>autumn</b> landmark'],
                fig: { s: [[23.079, 15.205], [23.063, 28.083], [0.140, 29.091], [0.220, 15.184], [1.162, 35.621], [2.065, 42.330]], b: [], l: [[0, 1], [1, 2], [2, 3], [3, 0], [2, 4], [4, 5]] }
            }
        ];

        // Deep-sky objects. Registered as stars in astronomy-engine for rise/set.
        var DSOS = [
            {
                id: 'm45', star: 'DSO_m45', ra: 3.791, dec: 24.11, dist: 444, minAlt: 12,
                name: 'The Pleiades', dev: 'कृत्तिका', translit: 'Krittika', glyph: '✨',
                body_text: 'A tight little knot of blue stars, sometimes called the Seven Sisters. Most people see six with the naked eye; binoculars explode it into dozens of sparkling gems. In India it is कृत्तिका, the nakshatra that gave Kartikeya his name.',
                telescope: 'Best in binoculars or a low-power telescope — a full telescope zooms in too far. These are hot young stars, only about 100 million years old, still drifting together through a wisp of gas.',
                facts: ['Young stars, <b>~100 million yrs</b> old', 'The <b>Subaru</b> logo is these stars', '<b>444 light-years</b> away']
            },
            {
                id: 'm42', star: 'DSO_m42', ra: 5.588, dec: -5.39, dist: 1344, minAlt: 15,
                name: 'The Orion Nebula', dev: '', translit: 'M42', glyph: '☁️',
                body_text: 'A glowing cloud of gas hanging from Orion\'s sword, where new stars and solar systems are being born right now. Faintly visible to the naked eye as a "fuzzy star", it is a genuine cosmic nursery.',
                telescope: 'One of the finest sights for a small telescope: a ghostly green-grey cloud wrapped around a tight cluster of four newborn stars called the Trapezium.',
                facts: ['A <b>stellar nursery</b> forming new suns', 'Wider than <b>20 light-years</b>', 'The nearest big <b>star factory</b>']
            },
            {
                id: 'm31', star: 'DSO_m31', ra: 0.712, dec: 41.27, dist: 2537000, minAlt: 18,
                name: 'The Andromeda Galaxy', dev: '', translit: 'M31', glyph: '🌌',
                body_text: 'The farthest object a human eye can see without any aid — a whole separate galaxy of a trillion stars. Its light set out 25 lakh years ago, before our species existed, and only now reaches your eye.',
                telescope: 'To the eye and in binoculars it is a soft, elongated smudge under a dark sky. Its size fools people — it spans several full-Moon widths, but only the bright core is easy to see.',
                facts: ['<b>25 lakh light-years</b> away', 'Holds <b>~1 trillion</b> stars', 'Heading toward us — a <b>merger</b> in 4 billion yrs']
            },
            {
                id: 'm13', star: 'DSO_m13', ra: 16.695, dec: 36.46, dist: 22200, minAlt: 15,
                name: 'The Hercules Cluster', dev: '', translit: 'M13', glyph: '⚪',
                body_text: 'A globular cluster — a dense, ancient ball of several hundred thousand stars, all packed into a sphere and bound together since the early days of the galaxy.',
                telescope: 'A faint round glow to the eye; a telescope begins to resolve its edge into a sugar-sprinkle of individual stars. A summer showpiece.',
                facts: ['<b>Several lakh stars</b> in one ball', 'Around <b>11.5 billion yrs</b> old', 'A famous <b>globular cluster</b>']
            },
            {
                id: 'm44', star: 'DSO_m44', ra: 8.673, dec: 19.67, dist: 577, minAlt: 15,
                name: 'The Beehive Cluster', dev: '', translit: 'M44 · Praesepe', glyph: '🐝',
                body_text: 'A loose swarm of stars in the faint constellation Cancer. Under a dark sky it shows as a hazy patch; the ancient Greeks used it as a weather sign — when it vanished, rain was coming.',
                telescope: 'A binocular and low-power favourite: dozens of stars scattered like a swarm of bees. Too big and close for high magnification.',
                facts: ['Best in <b>binoculars</b>', 'About <b>1,000 stars</b>', 'Known since <b>ancient times</b>']
            },
            {
                id: 'dbl', star: 'DSO_dbl', ra: 2.333, dec: 57.13, dist: 7500, minAlt: 15,
                name: 'The Double Cluster', dev: '', translit: 'in Perseus', glyph: '✨',
                body_text: 'Two rich clusters of young stars sitting side by side in the same view, in the Milky Way between Perseus and Cassiopeia. A rare treat — two open clusters for the price of one.',
                telescope: 'Beautiful in binoculars and small telescopes at low power: two glittering piles of stars almost touching. High in the north-east on autumn evenings.',
                facts: ['<b>Two clusters</b> in one glance', 'Both are <b>young and hot</b>', 'Set in the <b>Milky Way</b>']
            },
            {
                id: 'm22', star: 'DSO_m22', ra: 18.607, dec: -23.90, dist: 10400, minAlt: 12,
                name: 'The Sagittarius Cluster', dev: '', translit: 'M22', glyph: '⚪',
                body_text: 'One of the brightest globular clusters in the whole sky, near the "lid" of the Sagittarius teapot and the crowded heart of the Milky Way.',
                telescope: 'A fine round glow that a telescope starts to break into stars. Sits low in the south in summer, so a clear southern horizon helps.',
                facts: ['One of the <b>brightest globulars</b>', 'Near the <b>galactic centre</b>', '<b>~10,000 light-years</b> away']
            }
        ];

        // Zodiac (rashi) — 12 constellations of the ecliptic, ordered by RA.
        var ZODIAC = [
            { dev: 'मेष', en: 'Aries', ra: 2.7, dec: 20 },
            { dev: 'वृषभ', en: 'Taurus', ra: 4.5, dec: 18 },
            { dev: 'मिथुन', en: 'Gemini', ra: 7.0, dec: 22 },
            { dev: 'कर्क', en: 'Cancer', ra: 8.7, dec: 20 },
            { dev: 'सिंह', en: 'Leo', ra: 10.5, dec: 15 },
            { dev: 'कन्या', en: 'Virgo', ra: 13.3, dec: -2 },
            { dev: 'तुला', en: 'Libra', ra: 15.2, dec: -15 },
            { dev: 'वृश्चिक', en: 'Scorpius', ra: 16.9, dec: -30 },
            { dev: 'धनु', en: 'Sagittarius', ra: 19.0, dec: -28 },
            { dev: 'मकर', en: 'Capricornus', ra: 21.0, dec: -18 },
            { dev: 'कुम्भ', en: 'Aquarius', ra: 22.8, dec: -10 },
            { dev: 'मीन', en: 'Pisces', ra: 0.7, dec: 12 }
        ];

        // Nakshatra — 27 lunar mansions, RA/Dec of the traditional yogatara star.
        var NAKSHATRA = [
            { dev: 'अश्विनी', en: 'Ashwini', ra: 1.911, dec: 20.81 },
            { dev: 'भरणी', en: 'Bharani', ra: 2.833, dec: 27.26 },
            { dev: 'कृत्तिका', en: 'Krittika', ra: 3.791, dec: 24.11 },
            { dev: 'रोहिणी', en: 'Rohini', ra: 4.599, dec: 16.51 },
            { dev: 'मृगशिरा', en: 'Mrigashira', ra: 5.585, dec: 9.93 },
            { dev: 'आर्द्रा', en: 'Ardra', ra: 5.919, dec: 7.41 },
            { dev: 'पुनर्वसु', en: 'Punarvasu', ra: 7.755, dec: 28.03 },
            { dev: 'पुष्य', en: 'Pushya', ra: 8.745, dec: 18.15 },
            { dev: 'आश्लेषा', en: 'Ashlesha', ra: 8.720, dec: 5.95 },
            { dev: 'मघा', en: 'Magha', ra: 10.139, dec: 11.97 },
            { dev: 'पूर्व फाल्गुनी', en: 'P. Phalguni', ra: 11.235, dec: 20.52 },
            { dev: 'उत्तर फाल्गुनी', en: 'U. Phalguni', ra: 11.818, dec: 14.57 },
            { dev: 'हस्त', en: 'Hasta', ra: 12.497, dec: -16.52 },
            { dev: 'चित्रा', en: 'Chitra', ra: 13.420, dec: -11.16 },
            { dev: 'स्वाति', en: 'Swati', ra: 14.261, dec: 19.18 },
            { dev: 'विशाखा', en: 'Vishakha', ra: 14.848, dec: -16.04 },
            { dev: 'अनुराधा', en: 'Anuradha', ra: 16.005, dec: -22.62 },
            { dev: 'ज्येष्ठा', en: 'Jyeshtha', ra: 16.490, dec: -26.43 },
            { dev: 'मूल', en: 'Mula', ra: 17.560, dec: -37.10 },
            { dev: 'पूर्वाषाढ़ा', en: 'P. Ashadha', ra: 18.350, dec: -29.83 },
            { dev: 'उत्तराषाढ़ा', en: 'U. Ashadha', ra: 18.921, dec: -26.30 },
            { dev: 'श्रवण', en: 'Shravana', ra: 19.846, dec: 8.87 },
            { dev: 'धनिष्ठा', en: 'Dhanishtha', ra: 20.626, dec: 14.60 },
            { dev: 'शतभिषा', en: 'Shatabhisha', ra: 22.877, dec: -7.58 },
            { dev: 'पूर्व भाद्रपद', en: 'P. Bhadrapada', ra: 23.079, dec: 15.21 },
            { dev: 'उत्तर भाद्रपद', en: 'U. Bhadrapada', ra: 0.220, dec: 15.18 },
            { dev: 'रेवती', en: 'Revati', ra: 1.219, dec: 7.59 }
        ];

        // Major annual meteor showers. peak/active are [month, day]; ra is
        // the radiant in hours, dec in degrees; zhr = meteors/hour at peak
        // under a dark sky with the radiant overhead. Fully offline data.
        var METEOR_SHOWERS = [
            { name: 'Quadrantids', peak: [1, 4], active: [[12, 28], [1, 12]], zhr: 110, ra: 15.33, dec: 49.7, parent: 'asteroid 2003 EH₁', blurb: 'A short, sharp burst of the new year — the peak lasts only a few hours, but can rival the best showers.' },
            { name: 'Lyrids', peak: [4, 22], active: [[4, 16], [4, 25]], zhr: 18, ra: 18.14, dec: 33.4, parent: 'Comet Thatcher', blurb: 'A modest but reliable spring shower, occasionally throwing bright fireballs.' },
            { name: 'Eta Aquariids', peak: [5, 6], active: [[4, 19], [5, 28]], zhr: 50, ra: 22.47, dec: -1.0, parent: "Halley's Comet", blurb: 'Fast, glancing meteors — dust shed by Halley itself. Best seen in the hours before dawn.' },
            { name: 'Southern Delta Aquariids', peak: [7, 30], active: [[7, 12], [8, 23]], zhr: 25, ra: 22.66, dec: -16.4, parent: 'Comet 96P/Machholz', blurb: 'A steady stream of faint meteors low in the south through late July.' },
            { name: 'Perseids', peak: [8, 12], active: [[7, 17], [8, 24]], zhr: 100, ra: 3.13, dec: 58.0, parent: 'Comet Swift–Tuttle', blurb: 'The most-watched shower of the year — warm August nights and a rich, steady rate of bright meteors.' },
            { name: 'Orionids', peak: [10, 21], active: [[10, 2], [11, 7]], zhr: 20, ra: 6.35, dec: 15.6, parent: "Halley's Comet", blurb: 'Swift meteors radiating near Orion — the second helping of Halley dust each year.' },
            { name: 'Leonids', peak: [11, 17], active: [[11, 6], [11, 30]], zhr: 15, ra: 10.13, dec: 21.6, parent: 'Comet Tempel–Tuttle', blurb: 'Usually gentle, but the parent comet occasionally brings spectacular meteor storms.' },
            { name: 'Geminids', peak: [12, 14], active: [[12, 4], [12, 20]], zhr: 150, ra: 7.47, dec: 32.4, parent: 'asteroid 3200 Phaethon', blurb: 'The richest shower of the year — slow, bright, multicoloured meteors, and the radiant is up all evening.' },
            { name: 'Ursids', peak: [12, 22], active: [[12, 17], [12, 26]], zhr: 10, ra: 14.48, dec: 75.3, parent: 'Comet 8P/Tuttle', blurb: 'A quiet shower near the winter solstice, circling close to the Pole Star.' }
        ];

    return {
        CITIES: CITIES, PLANETS: PLANETS, CONSTELLATIONS: CONSTELLATIONS,
        DSOS: DSOS, ZODIAC: ZODIAC, NAKSHATRA: NAKSHATRA, METEOR_SHOWERS: METEOR_SHOWERS
    };
})();
