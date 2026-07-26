/* sky-browse.js — the browse-then-open pattern the atlas pages share.
 *
 * constellations.html and stars.html do the same thing to different data:
 * a searchable, filterable grid of cards; tap one and the grid is replaced
 * in place by a detail view with a chart, arrows to the neighbours, a swipe
 * gesture that does the same, a shareable #hash, and a back link that
 * returns to the grid where you left it.
 *
 * All of that used to be written out twice, once per page, and had already
 * drifted — the back link was fixed on one page months before the other.
 * It lives here now. Each page supplies its data and its rendering; this
 * file owns the behaviour.
 *
 * Needs js/sky-charts.js (for normalise) loaded first.
 *
 * The hash is "#slug" or "#slug/sub". What "sub" means is the page's
 * business: a star on the chart, or which view of the figure to show.
 */
(function () {
    'use strict';

    var normalise = window.SkyCharts.normalise;

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    /* Sideways swipes on `element`, reported as -1 (left-to-right, meaning
     * "previous") or +1. Deliberately conservative: a short travel is a tap
     * on a star, a steeper angle is the page being scrolled, a second finger
     * is a pinch, and a swipe that starts hard against the screen edge
     * belongs to the browser's own back gesture — taking that one too would
     * move two steps at once.
     */
    function swipe(element, onSwipe) {
        var MIN = 60, RATIO = 1.8, EDGE = 28;
        var startX = 0, startY = 0, live = false;

        element.addEventListener('touchstart', function (e) {
            live = e.touches.length === 1;
            if (!live) return;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            if (startX < EDGE || startX > window.innerWidth - EDGE) live = false;
        }, { passive: true });

        element.addEventListener('touchmove', function (e) {
            if (e.touches.length !== 1) live = false;
        }, { passive: true });

        element.addEventListener('touchcancel', function () {
            live = false;
        }, { passive: true });

        element.addEventListener('touchend', function (e) {
            if (!live) return;
            live = false;
            var touch = e.changedTouches[0];
            var dx = touch.clientX - startX;
            var dy = touch.clientY - startY;
            if (Math.abs(dx) < MIN) return;
            if (Math.abs(dx) < Math.abs(dy) * RATIO) return;
            onSwipe(dx < 0 ? 1 : -1);
        }, { passive: true });
    }

    function isTouch() {
        return !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    }

    /* config:
     *   items       array; each is given an .index
     *   slug        item -> the canonical slug used in the hash
     *   slugs       item -> every slug a URL may use for it
     *   label       item -> short name for the prev/next arrows
     *   keys        item -> normalised text the search matches against
     *   filter      (item, activeFilter) -> boolean
     *   card        item -> an element for the grid
     *   count       (shown, total) -> the result-count line
     *   title       item -> document.title for its detail view
     *   listTitle   document.title for the grid
     *   open        (item, sub) -> render the detail view
     *   onSub       (item, sub) -> the same item, a different sub
     *   carrySub    sub -> what to keep when stepping to a neighbour
     *   onList      called when the grid comes back
     *   onResize    called, debounced, on window resize
     *   animate     -> the element that should play the swipe-entry animation
     *   copyLabel   resting text of the copy-link button
     *   els         { listView detailView grid search filters emptyNote
     *                 resultCount backLink prevLink nextLink copyLink }
     */
    function create(config) {
        var els = config.els;
        var items = config.items;
        var total = items.length;

        var bySlug = {};
        items.forEach(function (item, i) {
            item.index = i;
            config.slugs(item).forEach(function (s) {
                if (s && !bySlug[s]) bySlug[s] = item;
            });
        });

        var activeFilter = 'all';
        var current = null;
        var currentSub = null;
        var listScroll = 0;
        var enterFrom = 0;

        // Two views in one document, so the page owns scrolling outright
        // rather than letting the browser guess where to put us.
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // -----------------------------------------------------------------
        // The grid
        // -----------------------------------------------------------------

        function render() {
            var query = normalise(els.search.value);
            var shown = items.filter(function (item) {
                return config.filter(item, activeFilter)
                    && (!query || config.keys(item).indexOf(query) !== -1);
            });

            els.grid.textContent = '';
            shown.forEach(function (item) {
                els.grid.appendChild(config.card(item));
            });

            els.emptyNote.classList.toggle('hidden', shown.length > 0);
            els.resultCount.textContent = config.count(shown.length, total);
        }

        els.search.addEventListener('input', render);

        els.filters.addEventListener('click', function (e) {
            var chip = e.target.closest('.chip');
            if (!chip) return;
            activeFilter = chip.getAttribute('data-filter');
            Array.prototype.forEach.call(this.querySelectorAll('.chip'), function (c) {
                c.classList.toggle('active', c === chip);
            });
            render();
        });

        // -----------------------------------------------------------------
        // The detail view
        // -----------------------------------------------------------------

        /* Where the arrows point. Whatever go() would do, so that copying
         * the link address gives the same page the arrow would open —
         * including which view you are in. */
        function neighbourHash(step) {
            if (!current) return '#';
            var target = items[(current.index + step + total) % total];
            var sub = config.carrySub ? config.carrySub(currentSub) : null;
            return '#' + config.slug(target) + (sub ? '/' + sub : '');
        }

        function refreshArrows() {
            els.prevLink.href = neighbourHash(-1);
            els.nextLink.href = neighbourHash(1);
        }

        function showDetail(item, sub) {
            // Remember where the reader was in the grid, so coming back
            // doesn't dump them at the top of it.
            if (!els.listView.classList.contains('hidden')) listScroll = window.scrollY;
            current = item;
            currentSub = sub || null;

            els.listView.classList.add('hidden');
            els.detailView.classList.remove('hidden');

            config.open(item, currentSub);

            var prev = items[(item.index - 1 + total) % total];
            var next = items[(item.index + 1) % total];
            els.prevLink.textContent = '← ' + config.label(prev);
            els.nextLink.textContent = config.label(next) + ' →';
            refreshArrows();

            document.title = config.title(item);

            // Replay the entry animation only when a swipe or an arrow asked
            // for a neighbour; a fresh deep link just appears.
            var target = config.animate && config.animate();
            if (target) {
                target.classList.remove('from-left', 'from-right');
                if (enterFrom) {
                    void target.offsetWidth;
                    target.classList.add(enterFrom > 0 ? 'from-right' : 'from-left');
                }
            }
            enterFrom = 0;
        }

        function showList() {
            current = null;
            currentSub = null;
            els.detailView.classList.add('hidden');
            els.listView.classList.remove('hidden');
            document.title = config.listTitle;
            if (config.onList) config.onList();
            window.scrollTo(0, listScroll);
        }

        // -----------------------------------------------------------------
        // Routing
        // -----------------------------------------------------------------

        function route() {
            var raw = window.location.hash.replace(/^#/, '');
            if (!raw) { showList(); return; }

            var parts = decodeURIComponent(raw).split('/');
            var item = bySlug[normalise(parts[0])];
            if (!item) { showList(); return; }

            var sub = parts[1] || null;
            if (item !== current) {
                showDetail(item, sub);
                window.scrollTo(0, 0);
            } else if (sub !== currentSub) {
                currentSub = sub;
                if (config.onSub) config.onSub(item, sub);
            }
        }

        /* Change the sub-part of the hash without a history entry, so Back
         * still returns to the grid rather than stepping through every star
         * the reader tapped. */
        function setSub(sub) {
            currentSub = sub || null;
            if (!current) return;
            var hash = '#' + config.slug(current) + (currentSub ? '/' + currentSub : '');
            if (window.history.replaceState) {
                window.history.replaceState(null, '', hash);
            } else {
                window.location.hash = hash;
            }
            // Switching view may change what the arrows should carry.
            refreshArrows();
        }

        // step: +1 for the next item, -1 for the previous one.
        function go(step) {
            if (!current) return;
            var target = items[(current.index + step + total) % total];
            enterFrom = step;
            var sub = config.carrySub ? config.carrySub(currentSub) : null;
            window.location.hash = '#' + config.slug(target) + (sub ? '/' + sub : '');
        }

        swipe(els.detailView, go);

        /* The arrows are the swipe with a mouse, so they go through the same
         * call — which is what carries the current view across. They stay
         * real links, so a modified click still opens a new tab. */
        function arrow(link, step) {
            link.addEventListener('click', function (e) {
                if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                go(step);
            });
        }
        arrow(els.prevLink, -1);
        arrow(els.nextLink, 1);

        els.backLink.addEventListener('click', function (e) {
            e.preventDefault();
            // Always land on the grid. history.back() only steps to whatever
            // came before, which is the previous item as soon as the reader
            // has swiped or used the arrows.
            if (window.history.pushState) {
                window.history.pushState(null, '',
                    window.location.pathname + window.location.search);
                showList();
            } else {
                window.location.hash = '';
            }
        });

        if (els.copyLink) {
            els.copyLink.addEventListener('click', function () {
                var button = this;
                var url = window.location.href;
                var done = function () {
                    button.textContent = '✓ Link copied';
                    setTimeout(function () {
                        button.textContent = config.copyLabel;
                    }, 2200);
                };
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(url).then(done, function () {
                        window.prompt('Copy this link:', url);
                    });
                } else {
                    window.prompt('Copy this link:', url);
                }
            });
        }

        window.addEventListener('hashchange', route);

        if (config.onResize) {
            var resizeTimer;
            window.addEventListener('resize', function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(config.onResize, 200);
            });
        }

        return {
            /* Draw the grid and honour the opening hash. Deliberately not
             * done inside create(): routing calls straight back into the
             * page's open(), which will want to call setSub() on the
             * controller — which does not exist until create() has returned.
             * Call this once, on the line after create(). */
            start: function () {
                render();
                route();
            },
            render: render,
            route: route,
            setSub: setSub,
            go: go,
            current: function () { return current; },
            sub: function () { return currentSub; }
        };
    }

    window.SkyBrowse = {
        el: el,
        swipe: swipe,
        isTouch: isTouch,
        create: create
    };
})();
