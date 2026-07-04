/*
 * whatsup — bright-satellite orbital elements (TLE)
 * =================================================
 * Used by whatsup.html (with the vendored js/satellite.min.js, SGP4) to
 * predict visible passes in-browser.
 *
 * At runtime whatsup.html tries to fetch FRESH TLEs live from Celestrak
 * (a stable, CORS-enabled source) by the catnr below, and falls back to
 * the bundled l1/l2 here if that fetch fails (offline / blocked). Either
 * way, predictions are HIDDEN when the data is older than the chosen
 * evening by more than ~12 days, rather than shown unreliably.
 *
 * TO REFRESH THE FALLBACK (optional; the live fetch usually covers it):
 *   Paste the current TLE lines from
 *     https://celestrak.org/NORAD/elements/gp.php?CATNR=<catnr>&FORMAT=TLE
 *
 * Bundled fallback last updated: 2026-07-01
 */
window.WHATSUP_TLE = [
    {
        name: 'The Space Station (ISS)',
        short: 'ISS',
        catnr: 25544,
        note: 'The football-field-sized International Space Station — home to astronauts right now.',
        mag: -3.0,
        l1: '1 25544U 98067A   26182.50817465  .00006185  00000+0  11827-3 0  9996',
        l2: '2 25544  51.6311 229.1989 0004224 255.0896 104.9625 15.49503254573972'
    },
    {
        name: 'Tiangong (Chinese Space Station)',
        short: 'Tiangong',
        catnr: 48274,
        note: "China's crewed space station — the second-brightest crewed outpost in orbit.",
        mag: -1.0,
        l1: '1 48274U 21035A   26184.22810215  .00007882  00000+0  10678-3 0  9997',
        l2: '2 48274  41.4672 224.3616 0002880 262.1202  97.9309 15.57904594296214'
    }
];
