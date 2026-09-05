/* sky-nav.js — what the Sky section consists of, in one list, and the shell
 * every page of it is drawn inside.
 *
 * The registry below is the single answer to "what is in this section", and
 * everything that describes the section reads it:
 *
 *   - the shell at the top of each page — the Aryabhat mark, the section's
 *     name, the row of tools, the menu for the rest of the site — and the
 *     night bar under it where a page has one (all rendered here)
 *   - the tiles on the hub, in their two groups (SkySection.group)
 *   - which pages work from the observer's place and night (`needs`), and
 *     so which links carry them and which pages keep them in the URL
 *
 * The section used to open with the site's two large logos and its navbar,
 * then a row of pills for the section, then the night bar — on every page,
 * most of a phone's screen before the page began. This is an app rather
 * than a page, used on a phone at night, so all of that is one slim bar now.
 *
 * Adding a page to the section means adding one entry below. Nothing else
 * needs to know.
 *
 * Load after js/sky-night.js (this file tells it whether the page keeps the
 * place and night in its address bar) and after /js/layout.js (whose list of
 * the site's sections fills the menu), and before any page script that calls
 * SkySection.
 */
(function () {
    'use strict';

    /* `needs` is what a page computes from. A page that lists 'place' or
       'date' gets the night bar under the shell, keeps both in its address
       bar, and is linked to with both, so walking from the map to What's Up
       does not drop you back in Central India tonight. A page that lists
       nothing is linked to plainly and keeps a clean URL: a constellation is
       the same constellation from anywhere, and a link to one should say
       only which one. */
    var PAGES = [
        {
            // The section's front door: what the "Sky" in the shell opens.
            // Not a tool, so no pill and no tile — but it shows tonight at a
            // glance and hands the place and night on to the tools, so it
            // keeps the night bar and carries both in its URL.
            key: 'hub',
            href: 'index.html',
            label: 'Sky',
            icon: '',
            tool: false,
            needs: ['place', 'date']
        },
        {
            key: 'whatsup',
            href: 'whatsup.html',
            // One name throughout — the page brands itself "What's Up" on its
            // cover, in its share text and in its OG tags, so the shell, the
            // tile and the button say that too rather than inventing two more.
            label: "What's Up",
            icon: '🔭',
            needs: ['place', 'date'],
            group: 'tonight',
            title: "What's Up",
            blurb: 'A guided walk through what an audience will actually see on the ' +
                'evening you pick — the Moon, the planets and the bright stars, in the ' +
                'order they appear, one card at a time.',
            cta: "Open What's Up →"
        },
        {
            key: 'planner',
            href: 'planner.html',
            label: 'Planner',
            icon: '📅',
            needs: ['place', 'date'],
            group: 'tonight',
            title: 'Evening planner',
            blurb: 'Sunset, full dark and what the Moon does; which planets, deep-sky ' +
                'objects and bright stars are up that evening and until when; and a ' +
                'calendar of the month\'s darkest nights and the ones worth a camp.',
            cta: 'Plan a night →'
        },
        {
            key: 'chart',
            href: 'chart.html',
            label: 'Sky chart',
            icon: '🌌',
            needs: ['place', 'date'],
            group: 'tonight',
            title: 'Sky chart',
            blurb: 'The whole sky as it will look from where you are on the evening ' +
                'you pick, hour by hour through the night — to hold up overhead, or ' +
                'to save and print before a camp.',
            cta: 'Open the chart →'
        },
        {
            key: 'constellations',
            href: 'constellations.html',
            label: 'Constellations',
            icon: '✨',
            needs: [],
            group: 'learn',
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
            needs: [],
            group: 'learn',
            title: 'The brightest stars',
            blurb: 'The stars you can pick out from a city, one page each: how far away ' +
                'it is, what colour it burns, and its Sanskrit name.',
            cta: 'Open the star list →'
        },
        {
            key: 'depth',
            href: 'constellation-depth.html',
            label: 'Depth lab',
            icon: '🧊',
            needs: [],
            group: 'learn',
            title: 'Constellation depth lab',
            blurb: 'Every constellation is a trick of perspective. See the stars of any figure at ' +
                'their real distances: move the view, wiggle it, or put on red-cyan glasses.',
            cta: 'Open the depth lab →'
        }
    ];

    // The tools — every page except the hub itself.
    function tools() {
        return PAGES.filter(function (p) { return p.tool !== false; });
    }

    // The tools in one of the hub's groups: 'tonight' or 'learn'.
    function group(name) {
        return tools().filter(function (p) { return p.group === name; });
    }

    // ── The registry ─────────────────────────────────────────────────

    // The file a page entry lives at, ignoring any query string.
    function fileOf(page) {
        return page.file || page.href.split('?')[0];
    }

    // The file part of a relative href: "stars.html?x#sirius" → "stars.html".
    function fileOfHref(href) {
        return String(href).split('#')[0].split('?')[0];
    }

    // The section landing page answers to both /sky/ and /sky/index.html.
    function currentFile() {
        return window.location.pathname.split('/').pop() || 'index.html';
    }

    function isCurrent(page) {
        return fileOf(page) === currentFile();
    }

    // This page's entry, or null for a page the registry does not know.
    function current() {
        for (var i = 0; i < PAGES.length; i++) {
            if (isCurrent(PAGES[i])) return PAGES[i];
        }
        return null;
    }

    // The entry a relative href points at, or null if it leaves the section.
    function pageFor(href) {
        var file = fileOfHref(href);
        for (var i = 0; i < PAGES.length; i++) {
            if (fileOf(PAGES[i]) === file) return PAGES[i];
        }
        return null;
    }

    function needsContext(page) {
        return !!(page && page.needs && page.needs.length);
    }

    /* `href` carrying the chosen place and night — when the page it points
       at works from them, and plain otherwise. js/sky-night.js owns those
       two; if a page has not loaded it, links stay plain and each page falls
       back to its own defaults. */
    function decorate(href) {
        if (!window.SkyNight || !needsContext(pageFor(href))) return href;
        return window.SkyNight.href(href);
    }

    /* The same for links written straight into a page's markup — a "back to
       the sky map", a star's "its constellation". They are ordinary <a>s, so
       without this a middle-click or open-in-new-tab drops the context that
       an ordinary click would have kept. Idempotent: re-running it just
       rewrites the same two parameters. */
    function decorateLinks(root) {
        if (!window.SkyNight) return;
        var links = (root || document).querySelectorAll('a[href]');
        Array.prototype.forEach.call(links, function (link) {
            var href = link.getAttribute('href');
            // Relative, in-section links only: leave anchors, absolute URLs
            // and links out to the rest of the site alone.
            if (!href || href.charAt(0) === '#' || href.indexOf(':') !== -1 ||
                href.charAt(0) === '/') return;
            if (!needsContext(pageFor(href))) return;
            link.href = decorate(href);
        });
    }

    // ── The shell ────────────────────────────────────────────────────

    function el(tag, cls, text) {
        var node = document.createElement(tag);
        if (cls) node.className = cls;
        if (text != null) node.textContent = text;
        return node;
    }

    /* Which of the site's sections this page is in, by the same rule
       /js/layout.js applies to the navbar it draws on the other pages. */
    function isSiteCurrent(item) {
        var path = window.location.pathname;
        if (path === '' || path === '/') path = '/index.html';
        if (item.prefix) return path.indexOf(item.prefix) === 0;
        return path === item.href || (item.also || []).indexOf(path) !== -1;
    }

    /* The rest of the site, behind one button: the same sections the navbar
       lists elsewhere, from the list /js/layout.js exports. */
    function buildSiteMenu() {
        var wrap = el('div', 'shell-site');

        var button = el('button', 'shell-menu');
        button.type = 'button';
        button.setAttribute('aria-haspopup', 'true');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'The rest of aryabhat.org');
        button.innerHTML = '<span class="shell-menu-icon" aria-hidden="true">☰</span>' +
            '<span class="shell-menu-text">Aryabhat</span>';

        var menu = el('div', 'shell-site-menu');
        menu.hidden = true;
        menu.appendChild(el('p', 'shell-site-caption', 'Aryabhat Foundation'));
        var links = (window.SiteNav && window.SiteNav.links) || [{ href: '/', text: 'Home' }];
        links.forEach(function (item) {
            var link = el('a', 'shell-site-link', item.text);
            link.href = item.href;
            if (isSiteCurrent(item)) {
                link.classList.add('current');
                link.setAttribute('aria-current', 'true');
            }
            menu.appendChild(link);
        });

        // Shown only once the browser has said it can install the section
        // (see "The app" below); most browsers never say so.
        installButton = el('button', 'shell-site-link shell-install', '📲 Install Sky as an app');
        installButton.type = 'button';
        installButton.hidden = !installPrompt;
        installButton.onclick = function () {
            if (!installPrompt) return;
            var prompt = installPrompt;
            installPrompt = null;
            installButton.hidden = true;
            prompt.prompt();
        };
        menu.appendChild(installButton);

        var open = false;
        function setOpen(next) {
            open = next;
            menu.hidden = !open;
            button.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
        button.onclick = function () { setOpen(!open); };
        // A click anywhere else closes it. The button's own click has
        // already toggled it by the time this runs, and is inside `wrap`.
        document.addEventListener('click', function (e) {
            if (open && !wrap.contains(e.target)) setOpen(false);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && open) {
                setOpen(false);
                button.focus();
            }
        });

        wrap.appendChild(button);
        wrap.appendChild(menu);
        return wrap;
    }

    /* On a phone the row of tools scrolls. Start it with the tool you are
       on in view, so the highlighted pill is not the one off the right edge. */
    function revealActive(tools) {
        var active = tools.querySelector('.active');
        if (!active || tools.scrollWidth <= tools.clientWidth) return;
        tools.scrollLeft = Math.max(0,
            active.offsetLeft - (tools.clientWidth - active.offsetWidth) / 2);
    }

    /* Fill the page's <header class="sky-shell">. */
    function build() {
        var shell = document.querySelector('.sky-shell');
        if (!shell) return;
        shell.textContent = '';

        var bar = el('div', 'shell-bar');

        // — the Foundation, as a mark: this is still aryabhat.org —
        var home = el('a', 'shell-home');
        home.href = '/';
        home.setAttribute('aria-label', 'Aryabhat Foundation home');
        var mark = document.createElement('img');
        mark.src = '/favicon/android-chrome-192x192.png';
        mark.alt = '';
        mark.width = 34;
        mark.height = 34;
        home.appendChild(mark);
        bar.appendChild(home);

        // — the section —
        var brand = el('a', 'shell-brand', 'Sky');
        brand.setAttribute('data-href', 'index.html');
        bar.appendChild(brand);

        // — its tools —
        var row = el('nav', 'shell-tools');
        row.setAttribute('aria-label', 'Sky tools');
        tools().forEach(function (page) {
            var here = isCurrent(page);
            var link = el('a', 'shell-tool' + (here ? ' active' : ''));
            link.setAttribute('data-href', page.href);
            if (here) link.setAttribute('aria-current', 'page');
            var icon = el('span', 'shell-tool-icon', page.icon);
            icon.setAttribute('aria-hidden', 'true');
            link.appendChild(icon);
            link.appendChild(document.createTextNode(page.label));
            row.appendChild(link);
        });
        bar.appendChild(row);

        // — the rest of the site —
        bar.appendChild(buildSiteMenu());
        shell.appendChild(bar);

        // — the night bar, on the pages that work from a place and a night —
        if (needsContext(current())) {
            var strip = el('div', 'shell-context');
            var night = el('div', 'sky-night-bar');
            night.setAttribute('role', 'group');
            strip.appendChild(night);
            shell.appendChild(strip);
        }

        refresh();
        revealActive(row);
        // The bar was not there when js/sky-night.js first looked for one.
        if (window.SkyNight) window.SkyNight.render();
    }

    /* Re-point every link the shell draws at the current place and night,
       and the ones in the page's own markup with them. */
    function refresh() {
        var shell = document.querySelector('.sky-shell');
        if (shell) {
            Array.prototype.forEach.call(shell.querySelectorAll('a[data-href]'), function (link) {
                link.href = decorate(link.getAttribute('data-href'));
            });
        }
        decorateLinks();
    }

    window.SkySection = {
        pages: PAGES,
        fileOf: fileOf,
        isCurrent: isCurrent,
        current: current,
        needsContext: needsContext,
        decorate: decorate,
        decorateLinks: decorateLinks,
        refresh: refresh,
        tools: tools,
        group: group,
        // Every tool except the page asking.
        others: function () {
            return tools().filter(function (p) { return !isCurrent(p); });
        }
    };

    // ── The app ─────────────────────────────────────────────────────
    //
    // Two things make the section an app rather than a set of pages. sw.js
    // keeps a copy of the whole section in the browser, so it opens at a
    // camp site with no signal (the notes at the top of that file say how).
    // And where the browser offers to install it — Android, desktop Chrome
    // — the site menu gains an entry that puts the Sky icon on the home
    // screen, opening at the hub with no browser around it; sky.webmanifest
    // describes that icon and that start.

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sky/sw.js', { scope: '/sky/' }).catch(function () {
                // A plain http:// preview, or a browser that refuses: the
                // section still works, it just is not kept.
            });
        });
    }

    var installPrompt = null;
    var installButton = null;
    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        installPrompt = e;
        if (installButton) installButton.hidden = false;
    });
    window.addEventListener('appinstalled', function () {
        installPrompt = null;
        if (installButton) installButton.hidden = true;
    });

    /* Tell the night module whether this page keeps the place and night in
       its address bar. A page the registry does not know is treated as one
       that does — what every page did before there was a registry. */
    if (window.SkyNight && window.SkyNight.configure) {
        var here = current();
        window.SkyNight.configure({ url: !here || needsContext(here) });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', build);
    } else {
        build();
    }

    // Moving the place or the night re-points the links that carry them.
    if (window.SkyNight) window.SkyNight.on(refresh);
})();
