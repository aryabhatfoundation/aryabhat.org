/* sky-places.js — where the observer can stand.
 *
 * Two lists, deliberately.
 *
 * The CURATED list below is short and hand-kept: the cities most visitors
 * come from, plus the places that matter to this section specifically —
 * Hanle, Devasthal, Kavalur, Pench, the high Ladakh sites. It is what a
 * search shows first and what the picker offers before anyone types. A
 * dropdown of four thousand places would be a worse answer than a hundred
 * chosen ones.
 *
 * Behind it sits data/cities.csv — the whole bhagol catalogue, ~4,400 more
 * places worldwide. It is fetched only when someone types something the
 * curated list cannot answer, so the common case costs nothing. Build it
 * with tools/build-city-data.py.
 *
 * A place is { name, lat, lng, country, dark }. `country` is absent for the
 * Indian entries below (they are the default) and `dark` marks the sites
 * that are here for their skies rather than their population.
 */
window.SkyPlaces = (function () {
    'use strict';

    function p(name, lat, lng, dark) {
        return { name: name, lat: lat, lng: lng, dark: !!dark };
    }

    var CURATED = [
        p('Agra', 27.1767, 78.0081),
        p('Ahmedabad', 23.0225, 72.5714),
        p('Ajmer', 26.4499, 74.6399),
        p('Akola', 20.7002, 77.0082),
        p('Aligarh', 27.8974, 78.088),
        p('Amravati', 20.9374, 77.7796),
        p('Amritsar', 31.634, 74.8723),
        p('Asansol', 23.6739, 86.9524),
        p('Aurangabad', 19.8762, 75.3433),
        p('Bareilly', 28.367, 79.4304),
        p('Belagavi', 15.8497, 74.4977),
        p('Bengaluru', 12.9716, 77.5946),
        p('Bhavnagar', 21.7645, 72.1519),
        p('Bhilai', 21.209, 81.4285),
        p('Bhiwandi', 19.2967, 73.0631),
        p('Bhopal', 23.2599, 77.4126),
        p('Bhubaneswar', 20.2961, 85.8245),
        p('Bikaner', 28.0229, 73.3119),
        p('Bilaspur', 22.0797, 82.1409),
        p('Chandigarh', 30.7333, 76.7794),
        p('Chennai', 13.0827, 80.2707),
        p('Coimbatore', 11.0168, 76.9558),
        p('Cuttack', 20.4625, 85.883),
        p('Davanagere', 14.4644, 75.9218),
        p('Dehradun', 30.3165, 78.0322),
        p('Delhi', 28.6139, 77.209),
        p('Dhanbad', 23.7957, 86.4304),
        p('Durgapur', 23.5204, 87.3119),
        p('Erode', 11.341, 77.7172),
        p('Faridabad', 28.4089, 77.3178),
        p('Firozabad', 27.1591, 78.3958),
        p('Gaya', 24.7969, 85.0002),
        p('Ghaziabad', 28.6692, 77.4538),
        p('Gorakhpur', 26.7606, 83.3732),
        p('Guntur', 16.3067, 80.4365),
        p('Gurugram', 28.4595, 77.0266),
        p('Guwahati', 26.1445, 91.7362),
        p('Gwalior', 26.2183, 78.1828),
        p('Howrah', 22.5958, 88.2636),
        p('Hubballi-Dharwad', 15.3647, 75.124),
        p('Hyderabad', 17.385, 78.4867),
        p('Indore', 22.7196, 75.8577),
        p('Jabalpur', 23.1815, 79.9864),
        p('Jaipur', 26.9124, 75.7873),
        p('Jalandhar', 31.326, 75.5762),
        p('Jalgaon', 21.0077, 75.5626),
        p('Jammu', 32.7266, 74.857),
        p('Jamnagar', 22.4707, 70.0577),
        p('Jamshedpur', 22.8046, 86.2029),
        p('Jhansi', 25.4484, 78.5685),
        p('Jodhpur', 26.2389, 73.0243),
        p('Kalaburagi', 17.3297, 76.8343),
        p('Kalyan-Dombivli', 19.2403, 73.1305),
        p('Kanpur', 26.4499, 80.3319),
        p('Kochi', 9.9312, 76.2673),
        p('Kolhapur', 16.705, 74.2433),
        p('Kolkata', 22.5726, 88.3639),
        p('Kota', 25.2138, 75.8648),
        p('Kozhikode', 11.2588, 75.7804),
        p('Lucknow', 26.8467, 80.9462),
        p('Ludhiana', 30.901, 75.8573),
        p('Madurai', 9.9252, 78.1198),
        p('Mangaluru', 12.9141, 74.856),
        p('Meerut', 28.9845, 77.7064),
        p('Moradabad', 28.8386, 78.7733),
        p('Mumbai', 19.076, 72.8777),
        p('Mysuru', 12.2958, 76.6394),
        p('Nagpur', 21.1458, 79.0882),
        p('Nanded', 19.1383, 77.321),
        p('Nashik', 19.9975, 73.7898),
        p('Navi Mumbai', 19.033, 73.0297),
        p('Nellore', 14.4426, 79.9865),
        p('Noida', 28.5355, 77.391),
        p('Panaji', 15.4909, 73.8278),
        p('Patna', 25.5941, 85.1376),
        p('Prayagraj', 25.4358, 81.8463),
        p('Pune', 18.5204, 73.8567),
        p('Raipur', 21.2514, 81.6296),
        p('Rajkot', 22.3039, 70.8022),
        p('Ranchi', 23.3441, 85.3096),
        p('Rewa', 24.5362, 81.3037),
        p('Rourkela', 22.2604, 84.8536),
        p('Sagar', 23.8388, 78.7378),
        p('Saharanpur', 29.968, 77.546),
        p('Salem', 11.6643, 78.146),
        p('Sangli', 16.8524, 74.5815),
        p('Satna', 24.6005, 80.8322),
        p('Shimla', 31.1048, 77.1734),
        p('Siliguri', 26.7271, 88.3953),
        p('Solapur', 17.6599, 75.9064),
        p('Srinagar', 34.0837, 74.7973),
        p('Surat', 21.1702, 72.8311),
        p('Thane', 19.2183, 72.9781),
        p('Thiruvananthapuram', 8.5241, 76.9366),
        p('Tiruchirappalli', 10.7905, 78.7047),
        p('Tirunelveli', 8.7139, 77.7567),
        p('Tirupati', 13.6288, 79.4192),
        p('Udaipur', 24.5854, 73.7125),
        p('Ujjain', 23.1765, 75.7885),
        p('Vadodara', 22.3072, 73.1812),
        p('Varanasi', 25.3176, 82.9739),
        p('Vasai-Virar', 19.4259, 72.8225),
        p('Vidisha', 23.5251, 77.8081),
        p('Vijayawada', 16.5062, 80.648),
        p('Visakhapatnam', 17.6868, 83.2185),
        p('Warangal', 17.9689, 79.5941),

        // ── Dark-sky sites & astronomy observatories ──────────────────
        // Smaller places, but the ones that matter most for stargazing:
        // high-altitude Ladakh/Himalaya, observatory towns, and India's
        // best-known dark-sky destinations. (The list is sorted below, so
        // new entries can be dropped in here in any order.)
        p('Leh', 34.1642, 77.5848, true),
        p('Hanle', 32.7794, 78.9642, true),              // Indian Astronomical Observatory; Hanle Dark Sky Reserve
        p('Kargil', 34.5539, 76.1349, true),
        p('Diskit (Nubra)', 34.5462, 77.5540, true),
        p('Pangong Tso', 33.7500, 78.6600, true),
        p('Tso Moriri', 32.9083, 78.3200, true),
        p('Kaza (Spiti)', 32.2257, 78.0716, true),
        p('Gulmarg', 34.0484, 74.3805, true),
        p('Chopta', 30.4922, 79.0212, true),
        p('Nainital', 29.3919, 79.4542, true),           // ARIES
        p('Devasthal', 29.3614, 79.6839, true),          // ARIES 3.6m optical telescope
        p('Mount Abu', 24.5926, 72.7156, true),          // PRL infrared observatory (Gurushikhar)
        p('Kavalur', 12.5765, 78.8253, true),            // Vainu Bappu Observatory
        p('Kodaikanal', 10.2381, 77.4892, true),         // solar observatory
        p('Gauribidanur', 13.6086, 77.4344, true),       // radio observatory
        p('Ooty', 11.4102, 76.6950, true),               // Ooty Radio Telescope
        p('Jaisalmer', 26.9157, 70.9083, true),          // Thar desert skies
        p('Rann of Kutch', 23.9060, 69.6710, true),
        p('Coorg (Madikeri)', 12.4208, 75.7397, true),
        p('Munnar', 10.0889, 77.0595, true),
        p('Mahabaleshwar', 17.9307, 73.6477, true),
        p('Savandurga', 12.9190, 77.2900, true),
        p('Pench (Dark Sky Park)', 21.7167, 79.2833, true) // India's first Dark Sky Park
    ];
    // Keep the picker alphabetical no matter the insertion order above.
    CURATED.sort(function (a, b) { return a.name.localeCompare(b.name); });

    var DEFAULT = null;
    for (var i = 0; i < CURATED.length; i++) {
        if (CURATED[i].name === 'Bhopal') DEFAULT = CURATED[i];
    }

    // ── The long tail ────────────────────────────────────────────────
    // data/cities.csv, fetched at most once, on the first search the
    // curated list cannot satisfy.
    var all = null;          // parsed rows, or null until loaded
    var loading = null;      // the in-flight promise, so N keystrokes cost one fetch
    var failed = false;      // a fetch that failed is not retried on every keystroke

    /* One CSV line into fields, honouring "quoted, fields" — country names
       like "Korea, Republic of" carry a comma. */
    function parseCsvLine(line) {
        var out = [], field = '', quoted = false;
        for (var i = 0; i < line.length; i++) {
            var ch = line.charAt(i);
            if (quoted) {
                if (ch === '"') {
                    if (line.charAt(i + 1) === '"') { field += '"'; i++; }
                    else quoted = false;
                } else field += ch;
            } else if (ch === '"') {
                quoted = true;
            } else if (ch === ',') {
                out.push(field); field = '';
            } else field += ch;
        }
        out.push(field);
        return out;
    }

    function parseCities(text) {
        var places = [], lines = text.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var raw = lines[i];
            if (!raw || !raw.trim()) continue;
            var cols = parseCsvLine(raw);
            if (cols.length < 3) continue;
            var lat = parseFloat(cols[1]), lng = parseFloat(cols[2]);
            if (isNaN(lat) || isNaN(lng)) continue;   // one bad row costs one city
            places.push({
                name: cols[0].trim(),
                lat: lat,
                lng: lng,
                country: (cols[3] || '').trim(),
                dark: false
            });
        }
        return places;
    }

    /* Resolve the path to data/cities.csv relative to this script, so the
       section works the same at /sky/ and anywhere it is served from. */
    function dataUrl() {
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i--) {
            var src = scripts[i].src || '';
            if (src.indexOf('sky-places.js') !== -1) {
                return src.replace(/js\/sky-places\.js.*$/, 'data/cities.csv');
            }
        }
        return 'data/cities.csv';
    }

    function loadAll() {
        if (all) return Promise.resolve(all);
        if (failed) return Promise.reject(new Error('city data unavailable'));
        if (loading) return loading;
        loading = fetch(dataUrl())
            .then(function (r) {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.text();
            })
            .then(function (text) { all = parseCities(text); loading = null; return all; })
            .catch(function (err) {
                // The curated list still answers; the long tail simply stays shut.
                failed = true; loading = null;
                throw err;
            });
        return loading;
    }

    // ── Search ───────────────────────────────────────────────────────

    function normalise(s) {
        return String(s || '').trim().toLowerCase();
    }

    /* Rank one list against a query. A name that *starts* with the query
       outranks one that merely contains it, so "pun" offers Pune before
       Rawalpindi; a country match comes last, so "india" still offers
       cities rather than burying them. Within a rank the list's own order
       is kept — curated is alphabetical, the catalogue is by size, and
       size is the tie-break a person expects when two places share a name. */
    function rank(list, q, out, seen) {
        var starts = [], holds = [], tail = [];
        for (var i = 0; i < list.length; i++) {
            var place = list[i], name = normalise(place.name);
            var key = name + '|' + place.lat.toFixed(2);
            if (seen[key]) continue;
            if (name.indexOf(q) === 0) { starts.push(place); seen[key] = 1; }
            else if (name.indexOf(q) !== -1) { holds.push(place); seen[key] = 1; }
            else if (normalise(place.country).indexOf(q) === 0) { tail.push(place); seen[key] = 1; }
        }
        return out.concat(starts, holds, tail);
    }

    /* Matches for `query`, best first.
     *
     * Calls back at least once, synchronously, with whatever the curated
     * list gives — so typing never waits on a network round-trip. If that
     * is thin and the catalogue can help, it calls back a second time with
     * the merged list. `done` says whether a later call is still coming,
     * which is what lets a caller show "searching…" honestly.
     *
     * Every curated match outranks every catalogue match, including a
     * curated substring hit over a catalogue prefix hit — "ko" offers Akola
     * before Korba. That is deliberate: the curated list is the places
     * people here actually come from, and being on it is itself evidence
     * that a match is the one meant.
     */
    function search(query, limit, cb) {
        var q = normalise(query);
        if (!q) { cb([], true); return; }
        limit = limit || 12;

        var seen = {};
        var quick = rank(CURATED, q, [], seen);
        var enough = quick.length >= limit;

        // Nothing more to add: the curated list filled the list, or the
        // catalogue is already in memory (then merge now, in one call).
        if (all) { cb(rank(all, q, quick, seen).slice(0, limit), true); return; }
        if (failed) { cb(quick.slice(0, limit), true); return; }

        cb(quick.slice(0, limit), enough);
        if (enough) return;

        loadAll().then(function (rows) {
            cb(rank(rows, q, quick, seen).slice(0, limit), true);
        }, function () {
            cb(quick.slice(0, limit), true);   // offline: curated is still an answer
        });
    }

    /* Exact match by name — how a ?city= parameter or a stored preference
       becomes a place again. Curated wins, so the well-known "Udaipur" is
       the one the picker offered, not a smaller namesake in the tail. */
    function find(name) {
        var q = normalise(name);
        if (!q) return null;
        var i;
        for (i = 0; i < CURATED.length; i++) {
            if (normalise(CURATED[i].name) === q) return CURATED[i];
        }
        if (all) {
            for (i = 0; i < all.length; i++) {
                if (normalise(all[i].name) === q) return all[i];
            }
        }
        return null;
    }

    /* Same, but willing to wait for the catalogue — a ?city= link to a
       place outside the curated list should still resolve. */
    function findAsync(name) {
        var hit = find(name);
        if (hit || failed) return Promise.resolve(hit);
        return loadAll().then(function () { return find(name); }, function () { return null; });
    }

    /* The curated place nearest a coordinate — used to name where someone
       is, rather than showing them a bare latitude. Flat approximation,
       which is fine at this scale, with longitude squeezed by latitude so
       it doesn't over-reward east-west distance in the north. */
    function nearest(lat, lng, maxDeg) {
        var best = null, bestD = (maxDeg || 1.8) * (maxDeg || 1.8);
        var squeeze = Math.cos(lat * Math.PI / 180);
        for (var i = 0; i < CURATED.length; i++) {
            var c = CURATED[i];
            var dLat = c.lat - lat, dLng = (c.lng - lng) * squeeze;
            var d = dLat * dLat + dLng * dLng;
            if (d < bestD) { bestD = d; best = c; }
        }
        return best ? { place: best, deg: Math.sqrt(bestD) } : null;
    }

    /* How a place reads in a list: bare for India, qualified otherwise. */
    function label(place) {
        if (!place) return '';
        return place.country && place.country !== 'India'
            ? place.name + ', ' + place.country
            : place.name;
    }

    return {
        curated: CURATED,
        DEFAULT: DEFAULT,
        search: search,
        find: find,
        findAsync: findAsync,
        nearest: nearest,
        label: label,
        loadAll: loadAll
    };
})();
