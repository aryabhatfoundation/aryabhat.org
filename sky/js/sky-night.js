/* sky-night.js — the one place and the one night the whole section works from.
 *
 * The Sky Atlas used to hold three separate opinions about where you are
 * standing and which evening you mean. The map page was hard-wired to
 * Bhopal and called it "Central India"; What's Up had a real picker but
 * the map page linked to it with ?city=Bhopal regardless; the atlas pages
 * said "From Central India" and quietly used today's month. Plan a camp at
 * Hanle in December, tap Constellations, and you were back in Central
 * India in July.
 *
 * This module is the single answer. It owns { place, date }, reads them
 * from the URL, remembers them, renders the one control that changes them,
 * and tells every page when they move. Pages ask it what to compute for;
 * nothing hard-codes a latitude again.
 *
 *   SkyNight.place        → { name, lat, lng, country, custom }
 *   SkyNight.date         → Date, local noon (see normalise below)
 *   SkyNight.setPlace(p)  /  setDate(d)  /  set({place, date})
 *   SkyNight.on(fn)       → fn({ place, date, changed: ['place'|'date'] })
 *   SkyNight.href(url)    → that url carrying the current place and date
 *   SkyNight.isTonight()  → is the chosen night actually tonight?
 *
 * Persistence splits the two deliberately. A place is a standing fact
 * about you and survives in localStorage. A date is not: coming back next
 * week should mean tonight, not the evening you were once planning. It
 * lives in sessionStorage, so it survives a reload and a walk across the
 * section, and resets when the visit does. A URL always wins over both —
 * that is what makes a shared link land where the sender meant.
 *
 * Requires js/sky-places.js. Renders into any <div class="sky-night-bar">.
 */
window.SkyNight = (function () {
    'use strict';

    var PLACE_KEY = 'sky.night.place';
    var DATE_KEY = 'sky.night.date';

    var listeners = [];
    var place = null;
    var date = null;

    // ── Dates ────────────────────────────────────────────────────────

    /* Every date in this section means "the evening of", never an instant.
       Pinning it to local noon keeps it that day on both sides of a DST
       shift and stops a UTC-parsed "2026-12-14" from landing on the 13th. */
    function normalise(d) {
        var out = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, 0);
        return out;
    }

    function today() {
        return normalise(new Date());
    }

    function ymd(d) {
        return d.getFullYear() + '-' +
            ('0' + (d.getMonth() + 1)).slice(-2) + '-' +
            ('0' + d.getDate()).slice(-2);
    }

    /* "2026-12-14" → that evening, or null. Parsed by hand rather than by
       new Date(str), which reads a bare date as UTC. */
    function parseYmd(str) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(str || '').trim());
        if (!m) return null;
        var d = new Date(+m[1], +m[2] - 1, +m[3], 12, 0, 0, 0);
        return isNaN(d.getTime()) ? null : d;
    }

    function sameDay(a, b) {
        return a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate();
    }

    function isTonight() {
        return sameDay(date, new Date());
    }

    /* How the night reads on the control: warm when it is actually tonight,
       plain and unambiguous otherwise. */
    function dateLabel() {
        var t = new Date();
        var tomorrow = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1, 12);
        if (sameDay(date, t)) return 'Tonight';
        if (sameDay(date, tomorrow)) return 'Tomorrow';
        var opts = { weekday: 'short', day: 'numeric', month: 'short' };
        if (date.getFullYear() !== t.getFullYear()) opts.year = 'numeric';
        return date.toLocaleDateString('en-IN', opts);
    }

    // ── Storage (never fatal: private browsing throws on access) ──────

    function store(area, key, value) {
        try { window[area].setItem(key, value); } catch (e) { /* not worth a page */ }
    }

    function recall(area, key) {
        try { return window[area].getItem(key); } catch (e) { return null; }
    }

    // ── Places ───────────────────────────────────────────────────────

    /* A place given as raw coordinates rather than chosen from the list —
       from ?lat=&lng= or from the browser's own geolocation. Named after
       the nearest place we know, so it reads like somewhere rather than
       like a number. */
    function customPlace(lat, lng, name) {
        var near = window.SkyPlaces.nearest(lat, lng, 0.8);
        return {
            name: name || (near ? 'Near ' + near.place.name : 'My location'),
            lat: lat,
            lng: lng,
            custom: true
        };
    }

    // ── Reading the starting state ───────────────────────────────────

    var params = new URLSearchParams(window.location.search);

    function initialPlace() {
        var qLat = parseFloat(params.get('lat')), qLng = parseFloat(params.get('lng'));
        if (!isNaN(qLat) && !isNaN(qLng)) {
            return customPlace(qLat, qLng, params.get('place'));
        }
        var named = window.SkyPlaces.find(params.get('city'));
        if (named) return named;

        var saved = recall('localStorage', PLACE_KEY);
        if (saved) {
            try {
                var s = JSON.parse(saved);
                if (s && typeof s.lat === 'number' && typeof s.lng === 'number') {
                    return window.SkyPlaces.find(s.name) || s;
                }
            } catch (e) { /* corrupt entry: fall through to the default */ }
        }
        return window.SkyPlaces.DEFAULT;
    }

    function initialDate() {
        return parseYmd(params.get('date')) ||
            parseYmd(recall('sessionStorage', DATE_KEY)) ||
            today();
    }

    place = initialPlace();
    date = initialDate();

    /* A ?city= naming somewhere outside the curated list still has to work.
       The catalogue can only answer once it has loaded, so if the parameter
       did not resolve above, try again behind the scenes and correct the
       page if it turns out to be a real place. */
    (function resolveDeferred() {
        var wanted = params.get('city');
        if (!wanted || window.SkyPlaces.find(wanted)) return;
        window.SkyPlaces.findAsync(wanted).then(function (hit) {
            if (hit) setPlace(hit);
        });
    })();

    // ── Changing it ──────────────────────────────────────────────────

    function emit(changed) {
        var detail = { place: place, date: date, changed: changed };
        listeners.forEach(function (fn) {
            // One page's broken listener must not stop the others updating.
            try { fn(detail); } catch (e) { console.error('SkyNight listener failed', e); }
        });
        render();
    }

    /* Keep the address bar honest, without stacking a history entry per
       keystroke — the back button should leave the section, not walk back
       through every date someone tried. */
    function syncUrl() {
        if (!window.history || !window.history.replaceState) return;
        var next = new URLSearchParams(window.location.search);
        next.delete('lat'); next.delete('lng'); next.delete('place'); next.delete('city');
        if (place.custom) {
            next.set('lat', place.lat.toFixed(4));
            next.set('lng', place.lng.toFixed(4));
            next.set('place', place.name);
        } else {
            next.set('city', place.name);
        }
        next.set('date', ymd(date));
        var qs = next.toString();
        window.history.replaceState(null, '',
            window.location.pathname + (qs ? '?' + qs : '') + window.location.hash);
    }

    function setPlace(next) {
        if (!next || (place && next.name === place.name &&
            next.lat === place.lat && next.lng === place.lng)) return;
        place = next;
        store('localStorage', PLACE_KEY, JSON.stringify({
            name: place.name, lat: place.lat, lng: place.lng,
            country: place.country || '', custom: !!place.custom
        }));
        syncUrl();
        emit(['place']);
    }

    function setDate(next) {
        if (!next) return;
        var d = normalise(next);
        if (sameDay(d, date)) return;
        date = d;
        store('sessionStorage', DATE_KEY, ymd(date));
        syncUrl();
        emit(['date']);
    }

    function set(next) {
        var changed = [];
        if (next.place && (next.place.name !== place.name ||
            next.place.lat !== place.lat || next.place.lng !== place.lng)) {
            place = next.place;
            store('localStorage', PLACE_KEY, JSON.stringify({
                name: place.name, lat: place.lat, lng: place.lng,
                country: place.country || '', custom: !!place.custom
            }));
            changed.push('place');
        }
        if (next.date) {
            var d = normalise(next.date);
            if (!sameDay(d, date)) {
                date = d;
                store('sessionStorage', DATE_KEY, ymd(date));
                changed.push('date');
            }
        }
        if (!changed.length) return;
        syncUrl();
        emit(changed);
    }

    function on(fn) {
        if (typeof fn === 'function') listeners.push(fn);
        return fn;
    }

    /* `url` carrying this place and night — how the section's own links
       keep the context instead of dropping it at every doorway. */
    function href(url) {
        var parts = String(url).split('#');
        var base = parts[0].split('?');
        var qs = new URLSearchParams(base[1] || '');
        if (place.custom) {
            qs.set('lat', place.lat.toFixed(4));
            qs.set('lng', place.lng.toFixed(4));
            qs.set('place', place.name);
        } else {
            qs.set('city', place.name);
        }
        qs.set('date', ymd(date));
        return base[0] + '?' + qs.toString() + (parts[1] ? '#' + parts[1] : '');
    }

    // ── The control ──────────────────────────────────────────────────
    // One bar, rendered into every <div class="sky-night-bar"> on the page.
    // Place opens a typeahead; date opens the platform's own date picker,
    // which is the one date UI every phone already knows how to drive.

    var openPanel = null;   // the place popover currently showing, if any

    function closePanel() {
        if (!openPanel) return;
        openPanel.panel.hidden = true;
        openPanel.button.setAttribute('aria-expanded', 'false');
        openPanel = null;
    }

    function el(tag, cls, text) {
        var node = document.createElement(tag);
        if (cls) node.className = cls;
        if (text != null) node.textContent = text;
        return node;
    }

    /* The place typeahead. Results arrive in up to two waves — the curated
       list immediately, the full catalogue once it has loaded — so the
       render has to be safe to run twice for one query, and must ignore a
       wave that belongs to a query the user has already typed past. */
    function buildPlacePanel(button) {
        var panel = el('div', 'night-panel');
        panel.hidden = true;

        var input = el('input', 'night-search');
        input.type = 'search';
        input.autocomplete = 'off';
        input.placeholder = 'Search a city or a dark-sky site…';
        // Part of the place control, so focus comes back to the place chip
        // once the bar has been rebuilt around a new choice.
        input.setAttribute('data-role', 'place');
        input.setAttribute('aria-label', 'Search for a place');
        input.setAttribute('role', 'combobox');
        input.setAttribute('aria-expanded', 'true');
        input.setAttribute('aria-autocomplete', 'list');

        var list = el('div', 'night-results');
        list.setAttribute('role', 'listbox');
        list.setAttribute('aria-label', 'Places');

        var here = el('button', 'night-here');
        here.type = 'button';
        here.innerHTML = '<span aria-hidden="true">📡</span> Use my location';

        panel.appendChild(input);
        panel.appendChild(list);
        panel.appendChild(here);

        var rows = [];        // the place behind each rendered row
        var active = -1;      // which row the keyboard is on
        var token = 0;        // guards against a slow wave for an old query

        function highlight(i) {
            var kids = list.children;
            for (var k = 0; k < kids.length; k++) {
                var isOn = k === i;
                kids[k].classList.toggle('on', isOn);
                kids[k].setAttribute('aria-selected', isOn ? 'true' : 'false');
            }
            active = i;
            if (i >= 0 && kids[i]) kids[i].scrollIntoView({ block: 'nearest' });
        }

        /* Close before setting: setPlace() re-renders the bar, which detaches
           this panel and this button, so anything done to them afterwards is
           done to nodes no longer on the page. render() restores focus. */
        function choose(i) {
            if (i < 0 || i >= rows.length) return;
            closePanel();
            setPlace(rows[i]);
        }

        function show(results, done) {
            rows = results;
            list.textContent = '';
            if (!results.length) {
                list.appendChild(el('p', 'night-empty',
                    done ? 'No place by that name.' : 'Searching…'));
                active = -1;
                return;
            }
            results.forEach(function (item, i) {
                var row = el('button', 'night-result');
                row.type = 'button';
                row.setAttribute('role', 'option');
                row.setAttribute('aria-selected', 'false');
                if (item.dark) {
                    row.appendChild(el('span', 'night-result-tag', '🌌'));
                }
                row.appendChild(el('span', 'night-result-name', window.SkyPlaces.label(item)));
                row.onclick = function () { choose(i); };
                row.onmousemove = function () { highlight(i); };
                list.appendChild(row);
            });
            highlight(0);
        }

        /* Nothing typed yet: offer the dark-sky sites rather than an empty
           box. They are the reason most people are choosing a place at all,
           and they are the ones nobody can spell from memory. */
        function showDefaults() {
            var dark = window.SkyPlaces.curated.filter(function (c) { return c.dark; });
            list.textContent = '';
            list.appendChild(el('p', 'night-hint', 'Dark-sky sites'));
            rows = dark;
            dark.forEach(function (item, i) {
                var row = el('button', 'night-result');
                row.type = 'button';
                row.setAttribute('role', 'option');
                row.setAttribute('aria-selected', 'false');
                row.appendChild(el('span', 'night-result-tag', '🌌'));
                row.appendChild(el('span', 'night-result-name', item.name));
                row.onclick = function () { choose(i); };
                row.onmousemove = function () { highlight(i); };
                list.appendChild(row);
            });
            active = -1;
        }

        input.oninput = function () {
            var q = input.value;
            var mine = ++token;
            if (!q.trim()) { showDefaults(); return; }
            window.SkyPlaces.search(q, 12, function (results, done) {
                if (mine !== token) return;    // a later keystroke owns the list now
                show(results, done);
            });
        };

        input.onkeydown = function (e) {
            if (e.key === 'ArrowDown') { e.preventDefault(); highlight(Math.min(active + 1, rows.length - 1)); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); highlight(Math.max(active - 1, 0)); }
            else if (e.key === 'Enter') { e.preventDefault(); choose(active >= 0 ? active : 0); }
            else if (e.key === 'Escape') { e.preventDefault(); closePanel(); button.focus(); }
        };

        here.onclick = function () {
            if (!navigator.geolocation) {
                here.textContent = 'This browser cannot locate you';
                return;
            }
            here.disabled = true;
            here.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(function (pos) {
                closePanel();
                setPlace(customPlace(pos.coords.latitude, pos.coords.longitude));
            }, function () {
                here.disabled = false;
                here.innerHTML = '<span aria-hidden="true">📡</span> Location not available';
            }, { timeout: 8000, maximumAge: 600000 });
        };

        panel._reset = function () {
            input.value = '';
            showDefaults();
            input.focus();
        };
        return panel;
    }

    function render() {
        var bars = document.querySelectorAll('.sky-night-bar');
        if (!bars.length) return;

        /* Rebuilding the bar detaches whatever had focus. Note which control
           held it so the same one can be handed it back — otherwise picking a
           place by keyboard drops you to the top of the document, which is
           exactly the moment a keyboard user least wants to be moved. */
        var wasFocused = document.activeElement;
        var refocus = wasFocused && wasFocused.closest ?
            (wasFocused.closest('.sky-night-bar') ? wasFocused.getAttribute('data-role') : null) : null;

        // Any popover belonged to the bar we are about to replace.
        openPanel = null;

        Array.prototype.forEach.call(bars, function (bar) {
            bar.textContent = '';
            bar.setAttribute('aria-label', 'Place and night');

            // — place —
            var placeBtn = el('button', 'night-chip');
            placeBtn.type = 'button';
            placeBtn.setAttribute('data-role', 'place');
            placeBtn.setAttribute('aria-expanded', 'false');
            placeBtn.setAttribute('aria-haspopup', 'dialog');
            placeBtn.innerHTML = '<span aria-hidden="true">📍</span> ' +
                '<span class="night-chip-value"></span> <span class="night-caret" aria-hidden="true">▾</span>';
            placeBtn.querySelector('.night-chip-value').textContent = window.SkyPlaces.label(place);
            placeBtn.setAttribute('aria-label', 'Observing from ' + window.SkyPlaces.label(place) + '. Change place');

            var panel = buildPlacePanel(placeBtn);
            placeBtn.onclick = function (e) {
                e.stopPropagation();
                var wasOpen = openPanel && openPanel.panel === panel;
                closePanel();
                if (wasOpen) return;
                panel.hidden = false;
                placeBtn.setAttribute('aria-expanded', 'true');
                openPanel = { panel: panel, button: placeBtn };
                panel._reset();
            };

            var placeWrap = el('span', 'night-slot');
            placeWrap.appendChild(placeBtn);
            placeWrap.appendChild(panel);
            bar.appendChild(placeWrap);

            bar.appendChild(el('span', 'night-sep', '·'));

            // — night —
            // A <label> wrapping a real date input: taps open the platform
            // picker, which beats anything we would draw ourselves.
            var dateBtn = el('label', 'night-chip');
            dateBtn.innerHTML = '<span aria-hidden="true">🌙</span> ' +
                '<span class="night-chip-value"></span> <span class="night-caret" aria-hidden="true">▾</span>';
            dateBtn.querySelector('.night-chip-value').textContent = dateLabel();

            var dateInput = el('input', 'night-date');
            dateInput.type = 'date';
            dateInput.value = ymd(date);
            dateInput.setAttribute('data-role', 'date');
            dateInput.setAttribute('aria-label', 'Choose the evening');
            dateInput.onchange = function () {
                var picked = parseYmd(dateInput.value);
                if (picked) setDate(picked);
            };
            /* A click on the transparent input opens the picker on a phone but
               not on desktop Chrome, where the field is a set of spinners and
               the calendar only drops on the little icon we have hidden. */
            dateBtn.onclick = function (e) {
                if (e.target === dateInput || !dateInput.showPicker) return;
                e.preventDefault();
                try { dateInput.showPicker(); } catch (err) { dateInput.focus(); }
            };
            dateBtn.appendChild(dateInput);
            bar.appendChild(dateBtn);

            // — back to tonight —
            // Only once there is something to come back from.
            if (!isTonight()) {
                var back = el('button', 'night-chip ghost');
                back.type = 'button';
                back.setAttribute('data-role', 'today');
                back.innerHTML = '<span aria-hidden="true">↺</span> Tonight';
                back.setAttribute('aria-label', 'Back to tonight');
                back.onclick = function () { setDate(new Date()); };
                bar.appendChild(back);
            }
        });

        // Hand focus back to the control that had it, or — when that control
        // was "back to tonight" and has just removed itself — to the date.
        if (refocus) {
            var target = document.querySelector('.sky-night-bar [data-role="' + refocus + '"]') ||
                document.querySelector('.sky-night-bar [data-role="date"]');
            if (target) target.focus();
        }
    }

    document.addEventListener('click', function (e) {
        if (openPanel && !openPanel.panel.contains(e.target)) closePanel();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && openPanel) {
            var btn = openPanel.button;
            closePanel();
            btn.focus();
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }

    return {
        get place() { return place; },
        get date() { return date; },
        setPlace: setPlace,
        setDate: setDate,
        set: set,
        on: on,
        href: href,
        render: render,
        isTonight: isTonight,
        ymd: ymd,
        parseYmd: parseYmd,
        label: function () { return window.SkyPlaces.label(place); }
    };
})();
