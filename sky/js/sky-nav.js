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
            blurb: 'Pick a date and see what is up: which planets, deep-sky objects and ' +
                'bright stars are visible that evening and until when, plus a map of the ' +
                'whole sky as it will look from Central India once night falls.',
            cta: 'Open the sky map →'
        },
        {
            // The city is what the story opens on; the sky map is Central India throughout.
            key: 'whatsup',
            href: 'whatsup.html?city=Bhopal',
            file: 'whatsup.html',
            label: "What's up",
            icon: '🔭',
            title: "What's up tonight",
            blurb: 'A story-style walk through what an audience will actually see on the ' +
                'evening you pick — the Moon, the planets and the bright stars, in the ' +
                'order they appear.',
            cta: 'Open the evening show →'
        },
        {
            key: 'constellations',
            href: 'constellations.html',
            label: 'Constellations',
            icon: '✨',
            title: 'Constellation atlas',
            blurb: 'All 88 constellations as the IAU draws them. Tap any star for its ' +
                'name and brightness, and — where our own texts named it — its ' +
                'Sanskrit identification.',
            cta: 'Browse all 88 →'
        },
        {
            key: 'stars',
            href: 'stars.html',
            label: 'Bright stars',
            icon: '⭐',
            title: 'The brightest stars',
            blurb: 'The stars you can pick out from a city, one page each: how far away ' +
                'it is, what colour it burns, and the name our own texts give it.',
            cta: 'Open the star list →'
        }
    ];

    // The file a page entry lives at, ignoring any query string.
    function fileOf(page) {
        return page.file || page.href.split('?')[0];
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
                link.href = page.href;
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
    }

    window.SkySection = {
        pages: PAGES,
        fileOf: fileOf,
        isCurrent: isCurrent,
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
})();
