/* sky-nav.js — what the Sky Atlas section consists of, in one list.
 *
 * The section used to be four pages that each ended with a hand-written row
 * of links to the other three, in a different order every time, with no
 * indication of where you already were. This file is the single answer to
 * "what is in this section" and every page asks it the same question:
 *
 *   - the sub-nav strip at the top of each page (injected here)
 *   - the hub cards on the section's landing page (SkySection.others)
 *
 * Adding a page to the section means adding one entry below. Nothing else
 * needs to know.
 */
(function () {
    'use strict';

    var PAGES = [
        {
            key: 'sky',
            href: 'index.html',
            label: 'Sky map',
            icon: '🌌',
            title: 'The sky on any night',
            blurb: 'Plan an evening and see what is up: which planets, deep-sky objects and ' +
                'bright stars are visible that night and until when, plus a map of the ' +
                'whole sky as it will look from where you are once night falls.',
            cta: 'Open the sky map →'
        },
        {
            // Place and date ride on the link itself — see decorate() below.
            key: 'whatsup',
            href: 'whatsup.html',
            // One name throughout — the page brands itself "What's Up" on its
            // cover, in its share text and in its OG tags, so the nav, the card
            // and the button say that too rather than inventing two more.
            label: "What's Up",
            icon: '🔭',
            title: "What's Up",
            blurb: 'A guided walk through what an audience will actually see on the ' +
                'evening you pick — the Moon, the planets and the bright stars, in the ' +
                'order they appear, one card at a time.',
            cta: "Open What's Up →"
        },
        {
            key: 'constellations',
            href: 'constellations.html',
            label: 'Constellations',
            icon: '✨',
            title: 'Constellation atlas',
            blurb: 'All 88 constellations as the IAU draws them. Tap any star for its ' +
                'name, its brightness, and its Sanskrit name where it has one.',
            cta: 'Browse all 88 →'
        },
        {
            key: 'stars',
            href: 'stars.html',
            label: 'Bright stars',
            icon: '⭐',
            title: 'The brightest stars',
            blurb: 'The stars you can pick out from a city, one page each: how far away ' +
                'it is, what colour it burns, and its Sanskrit name.',
            cta: 'Open the star list →'
        }
    ];

    // The file a page entry lives at, ignoring any query string.
    function fileOf(page) {
        return page.file || page.href.split('?')[0];
    }

    /* Every link inside the section carries the chosen place and night, so
       walking from the map to the atlas does not silently drop you back in
       Central India tonight. js/sky-night.js owns those two; if a page has
       not loaded it, links stay plain and each page falls back to its own
       defaults. */
    function decorate(href) {
        return window.SkyNight ? window.SkyNight.href(href) : href;
    }

    /* The same for links written straight into a page's markup — a "back to
       the sky map", a star's "its constellation". They are ordinary <a>s, so
       without this a middle-click or open-in-new-tab drops the context that
       an ordinary click would have kept. Idempotent: re-running it just
       rewrites the same two parameters. */
    function decorateLinks(root) {
        if (!window.SkyNight) return;
        var files = {};
        PAGES.forEach(function (page) { files[fileOf(page)] = true; });

        var links = (root || document).querySelectorAll('a[href]');
        Array.prototype.forEach.call(links, function (link) {
            var href = link.getAttribute('href');
            // Relative, in-section links only: leave anchors, absolute URLs
            // and links out to the rest of the site alone.
            if (!href || href.charAt(0) === '#' || href.indexOf(':') !== -1 ||
                href.charAt(0) === '/') return;
            if (!files[href.split('#')[0].split('?')[0]]) return;
            link.href = decorate(href);
        });
    }

    // The section landing page answers to both /sky/ and /sky/index.html.
    function currentFile() {
        return window.location.pathname.split('/').pop() || 'index.html';
    }

    function isCurrent(page) {
        return fileOf(page) === currentFile();
    }

    /* Fill every <nav class="sky-subnav"> on the page. */
    function render() {
        var bars = document.querySelectorAll('.sky-subnav');
        if (!bars.length) return;

        Array.prototype.forEach.call(bars, function (bar) {
            bar.textContent = '';
            PAGES.forEach(function (page) {
                var here = isCurrent(page);
                var link = document.createElement('a');
                link.className = 'subnav-link' + (here ? ' active' : '');
                link.href = decorate(page.href);
                if (here) link.setAttribute('aria-current', 'page');

                var icon = document.createElement('span');
                icon.className = 'subnav-icon';
                icon.setAttribute('aria-hidden', 'true');
                icon.textContent = page.icon;
                link.appendChild(icon);
                link.appendChild(document.createTextNode(page.label));

                bar.appendChild(link);
            });
        });

        decorateLinks();
    }

    window.SkySection = {
        pages: PAGES,
        fileOf: fileOf,
        isCurrent: isCurrent,
        decorate: decorate,
        decorateLinks: decorateLinks,
        // Re-point every injected link at the current place and night.
        refresh: render,
        // Everything in the section except the page asking — what the hub
        // cards on the landing page list.
        others: function () {
            return PAGES.filter(function (p) { return !isCurrent(p); });
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }

    // Moving the place or the night re-points the links that carry them.
    if (window.SkyNight) window.SkyNight.on(render);
})();
