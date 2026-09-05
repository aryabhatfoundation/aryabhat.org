/* sw.js — the Sky section, with no signal.
 *
 * The section promises it "works on a phone, in the dark, with cold hands",
 * and a camp site is where the signal is worst. js/vendor/ moved the
 * libraries and catalogues onto this domain so a page no longer waits on a
 * stranger's server; this takes the next step and keeps a copy of the whole
 * section in the browser. A page you have never opened still opens with no
 * signal at all, and one you have opens without asking.
 *
 * What it does:
 *   - on install, stores every page of the section and everything they
 *     load — about 2.5 MB, most of it the star catalogues
 *   - pages: network first, so a change ships the moment you are online,
 *     and the stored copy after a few seconds of silence or when offline
 *   - everything else the section loads (under /sky/, /js/, /css/,
 *     /favicon/, /images/): the stored copy, and the network only for what
 *     is not stored yet
 *   - Google Fonts: the stored copy, refreshed behind the scenes
 *   - anything else — analytics, the live satellite elements — goes
 *     straight to the network, untouched
 *
 * VERSION names the store. Bump it, together with the ?v= stamp the pages
 * carry, when a listed file changes; the old store is dropped once the new
 * one is ready. Registered by js/sky-nav.js with scope /sky/.
 */
'use strict';

var VERSION = '20260905b';
var CACHE = 'sky-' + VERSION;
var STAMP = '?v=' + VERSION;
var PAGE_TIMEOUT = 4000;

// The section's pages. Both spellings of the hub, because both are linked.
var PAGES = [
    '/sky/',
    '/sky/index.html',
    '/sky/planner.html',
    '/sky/chart.html',
    '/sky/whatsup.html',
    '/sky/constellations.html',
    '/sky/stars.html',
    '/sky/constellation-depth.html'
];

// Everything those pages load, at the URLs they load it from.
var ASSETS = [
    // the section's own code and style — stamped ones exactly as referenced
    '/sky/css/sky.css' + STAMP,
    '/sky/js/sky-night.js' + STAMP,
    '/sky/js/sky-nav.js' + STAMP,
    '/sky/js/sky-evening.js' + STAMP,
    '/js/layout.js' + STAMP,
    '/sky/js/sky-places.js',
    '/sky/js/sky-charts.js',
    '/sky/js/sky-browse.js',
    '/sky/js/constellation-data.js',
    '/sky/js/star-data.js',
    '/sky/js/depth-lab.js',
    '/sky/js/depth-view.js',
    '/sky/js/whatsup-data.js',
    '/sky/js/whatsup-figures.js',
    '/sky/js/satellite.min.js',
    '/sky/js/satellites-tle.js',
    // the libraries (see js/vendor/README.md)
    '/sky/js/vendor/d3.min.js',
    '/sky/js/vendor/d3.geo.projection.min.js',
    '/sky/js/vendor/celestial.min.js',
    '/sky/js/vendor/suncalc.min.js',
    '/sky/js/vendor/astronomy.browser.min.js',
    '/sky/js/vendor/html2canvas.min.js',
    // the catalogues the chart draws from, and the place list
    '/sky/data/celestial/constellations.json',
    '/sky/data/celestial/constellations.lines.json',
    '/sky/data/celestial/constellations.borders.json',
    '/sky/data/celestial/stars.6.json',
    '/sky/data/celestial/starnames.json',
    '/sky/data/celestial/planets.json',
    '/sky/data/celestial/mw.json',
    '/sky/data/celestial/dsos.bright.json',
    '/sky/data/celestial/dsonames.json',
    '/sky/data/cities.csv',
    // what the section borrows from the rest of the site
    '/css/style.css',
    '/css/renfrew-webfont.woff2',
    '/css/renfrew-webfont.woff',
    '/js/cosmos-bg.js',
    '/js/analytics.js',
    '/images/aryabhat.svg',
    '/favicon/android-chrome-192x192.png',
    '/favicon/android-chrome-512x512.png',
    '/favicon/apple-touch-icon.png',
    '/favicon/favicon-32x32.png',
    '/favicon/favicon-16x16.png',
    '/sky/icons/sky-maskable-192.png',
    '/sky/icons/sky-maskable-512.png',
    '/sky/sky.webmanifest'
];

// What is served from the store when it is there.
var OWN = ['/sky/', '/js/', '/css/', '/favicon/', '/images/'];
var FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(CACHE).then(function (cache) {
        // One by one, and a file that will not fetch does not stop the rest:
        // whatever is missing is picked up the first time a page asks for it.
        return Promise.all(PAGES.concat(ASSETS).map(function (url) {
            return cache.add(url).catch(function () { /* left for runtime */ });
        }));
    }).then(function () {
        return self.skipWaiting();
    }));
});

self.addEventListener('activate', function (event) {
    event.waitUntil(caches.keys().then(function (names) {
        return Promise.all(names.map(function (name) {
            if (name.indexOf('sky-') === 0 && name !== CACHE) return caches.delete(name);
        }));
    }).then(function () {
        return self.clients.claim();
    }));
});

function timeout(promise, ms) {
    return new Promise(function (resolve, reject) {
        var timer = setTimeout(function () { reject(new Error('timeout')); }, ms);
        promise.then(function (v) { clearTimeout(timer); resolve(v); },
            function (e) { clearTimeout(timer); reject(e); });
    });
}

// A page is stored under its path alone: a link that carries a place and
// a night is the same page, and must not become another copy of it.
function pageKey(request) {
    var url = new URL(request.url);
    return url.origin + url.pathname;
}

/* Pages: the network, then the store. A fresh copy is kept whenever the
   network answers, so what is stored is never older than the last visit. */
function pageFirst(request) {
    return timeout(fetch(request), PAGE_TIMEOUT).then(function (response) {
        if (response && response.ok) {
            var copy = response.clone();
            caches.open(CACHE).then(function (cache) { cache.put(pageKey(request), copy); });
        }
        return response;
    }).catch(function () {
        return caches.match(pageKey(request)).then(function (hit) {
            return hit || caches.match('/sky/');
        });
    });
}

/* Everything the section loads: the store, then the network — and what
   the network gives is kept for next time. Stamped URLs are stored as
   they are, so a new stamp is simply a new file. */
function cacheFirst(request) {
    return caches.match(request).then(function (hit) {
        if (hit) return hit;
        return fetch(request).then(function (response) {
            if (response && response.ok) {
                var copy = response.clone();
                caches.open(CACHE).then(function (cache) { cache.put(request, copy); });
            }
            return response;
        });
    });
}

/* Fonts: the store answers at once, and the network refreshes it. */
function staleWhileRevalidate(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (hit) {
            var refresh = fetch(request).then(function (response) {
                if (response && response.ok) cache.put(request, response.clone());
                return response;
            }).catch(function () { return hit; });
            return hit || refresh;
        });
    });
}

self.addEventListener('fetch', function (event) {
    var request = event.request;
    if (request.method !== 'GET') return;
    var url = new URL(request.url);

    if (request.mode === 'navigate') {
        event.respondWith(pageFirst(request));
        return;
    }
    if (url.origin === self.location.origin) {
        for (var i = 0; i < OWN.length; i++) {
            if (url.pathname.indexOf(OWN[i]) === 0) {
                event.respondWith(cacheFirst(request));
                return;
            }
        }
        return;
    }
    if (FONT_HOSTS.indexOf(url.hostname) !== -1) {
        event.respondWith(staleWhileRevalidate(request));
    }
});
