/* sky-evening.js — the shape of one evening from one place.
 *
 * When the Sun sets, when the sky is properly dark, when it lightens again,
 * what the Moon does in between, and how much true dark is left once both
 * are accounted for. The old landing page worked all of this out inline for
 * its night panel, its calendar and its map; those are three pages now — the
 * hub, the planner and the chart — and this is the one copy they share.
 *
 *   SkyEvening.of(place, date)    → { sunset, sunUp, darkStart, darkEnd,
 *                                     darkMs, moon, phase, fraction,
 *                                     chartStart, night }
 *   SkyEvening.cells(evening)     → the four numbers a night turns on
 *   SkyEvening.renderCells(el, evening)
 *   SkyEvening.moonIcon(phase) / moonPhaseName(phase) / nightMark(phase)
 *   SkyEvening.fmtTime(d) / fmtDuration(ms) / isTime(d)
 *
 * A date here means "the evening of" (js/sky-night.js pins it to local
 * noon); the night runs from that day's sunset into the next morning.
 * Needs js/vendor/suncalc.min.js.
 */
window.SkyEvening = (function () {
    'use strict';

    var DAY_MS = 24 * 60 * 60 * 1000;

    function isTime(d) { return d instanceof Date && !isNaN(d.getTime()); }

    function fmtTime(d) {
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function fmtDuration(ms) {
        var mins = Math.round(ms / 60000);
        var h = Math.floor(mins / 60), m = mins % 60;
        if (!h) return m + 'm';
        return h + 'h' + (m ? ' ' + m + 'm' : '');
    }

    function midnightOf(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    }

    /* Is the Sun above the horizon at midday here? What tells midnight sun
       apart from polar night when SunCalc reports neither a sunrise nor a
       sunset and every twilight comes back invalid. */
    function sunUpAtNoon(place, date) {
        var noon = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
        return SunCalc.getPosition(noon, place.lat, place.lng).altitude > 0;
    }

    /* When the sky is properly dark. Astronomical dusk where there is one;
       nautical, then a flat 80 minutes after sunset where there is not — a
       northern summer night genuinely never reaches −18°, and the place
       list covers 145 countries, so this cannot assume. Returns null under
       midnight sun, and the whole day under polar night, where "dusk" is
       not a moment the day contains. */
    function darkStart(place, date, times) {
        if (isTime(times.night)) return times.night;
        if (isTime(times.nauticalDusk)) return times.nauticalDusk;
        if (isTime(times.sunset)) return new Date(times.sunset.getTime() + 80 * 60000);
        return sunUpAtNoon(place, date) ? null : midnightOf(date);
    }

    function darkEnd(place, date) {
        var next = new Date(date.getTime() + DAY_MS);
        var t = SunCalc.getTimes(next, place.lat, place.lng);
        if (isTime(t.nightEnd)) return t.nightEnd;
        if (isTime(t.nauticalDawn)) return t.nauticalDawn;
        if (isTime(t.sunrise)) return new Date(t.sunrise.getTime() - 80 * 60000);
        return sunUpAtNoon(place, next) ? null : midnightOf(next);
    }

    /* Hours of true dark: Sun below −18° and Moon below the horizon at the
       same time. Sampled in five-minute steps rather than solved, because
       the Moon can rise once, set once, do both or do neither inside one
       night, and the closed form for how much of one window overlaps the
       other is longer than the loop. */
    function darkHours(place, from, to) {
        if (!isTime(from) || !isTime(to) || to <= from) return null;
        var step = 5 * 60000, dark = 0;
        for (var ms = from.getTime(); ms <= to.getTime(); ms += step) {
            if (SunCalc.getMoonPosition(new Date(ms), place.lat, place.lng).altitude < 0) dark += step;
        }
        return dark;
    }

    /* The Moon event that matters for this evening: when it clears out if
       it is already up at nightfall, when it arrives if it is not. Both
       days are checked, because either event can fall past midnight. */
    function moonEvent(place, from) {
        var up = SunCalc.getMoonPosition(from, place.lat, place.lng).altitude > 0;
        for (var d = 0; d <= 1; d++) {
            var mt = SunCalc.getMoonTimes(new Date(from.getTime() + d * DAY_MS), place.lat, place.lng);
            var when = up ? mt.set : mt.rise;
            if (isTime(when) && when > from) {
                return { label: up ? 'Moon sets' : 'Moon rises', when: when, value: fmtTime(when) };
            }
        }
        return { label: 'Moon', when: null, value: up ? 'up all night' : 'down all night' };
    }

    /* The evening of `date`, seen from `place`. */
    function of(place, date) {
        var times = SunCalc.getTimes(date, place.lat, place.lng);
        var from = darkStart(place, date, times);
        var to = darkEnd(place, date);
        var illum = SunCalc.getMoonIllumination(date);
        return {
            place: place,
            date: date,
            times: times,
            // null where the Sun does not set that day
            sunset: isTime(times.sunset) ? times.sunset : null,
            // midnight sun: the Sun is up at noon and never sets
            sunUp: sunUpAtNoon(place, date),
            darkStart: from,
            darkEnd: to,
            // milliseconds of Sun-down, Moon-down dark; null with no full dark
            darkMs: darkHours(place, from, to),
            moon: moonEvent(place, isTime(from) ? from : date),
            phase: illum.phase,
            fraction: illum.fraction,
            // Where the chart's evening begins, and the moment it first shows:
            // full dark, or local midnight where there is no nightfall.
            chartStart: isTime(times.sunset) ? times.sunset
                : new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0),
            night: from || midnightOf(date)
        };
    }

    /* The four numbers a camp actually turns on. Dark hours leads because
       it is the one that decides whether the night is worth the drive. */
    function cells(ev) {
        return [
            {
                label: 'Sunset',
                value: ev.sunset ? fmtTime(ev.sunset) : (ev.sunUp ? 'stays up' : 'stays down')
            },
            { label: 'Full dark', value: isTime(ev.darkStart) ? fmtTime(ev.darkStart) : '—' },
            { label: ev.moon.label, value: ev.moon.value },
            {
                label: 'Dark sky', lead: true,
                value: ev.darkMs === null ? 'no full dark'
                    : ev.darkMs < 60000 ? 'none — Moon up' : fmtDuration(ev.darkMs)
            }
        ];
    }

    function renderCells(el, ev) {
        el.innerHTML = cells(ev).map(function (c) {
            return '<div class="ntime' + (c.lead ? ' lead' : '') + '">'
                + '<span class="ntime-label">' + c.label + '</span>'
                + '<span class="ntime-value">' + c.value + '</span></div>';
        }).join('');
    }

    // phase is 0 to 1: 0 new, 0.25 first quarter, 0.5 full, 0.75 last quarter.
    function moonIcon(phase) {
        if (phase < 0.03 || phase > 0.97) return '🌑';
        if (phase < 0.22) return '🌒';
        if (phase < 0.28) return '🌓';
        if (phase < 0.47) return '🌔';
        if (phase < 0.53) return '🌕';
        if (phase < 0.72) return '🌖';
        if (phase < 0.78) return '🌗';
        return '🌘';
    }

    function moonPhaseName(phase) {
        if (phase < 0.03 || phase > 0.97) return 'New Moon';
        if (phase < 0.22) return 'Waxing Crescent';
        if (phase < 0.28) return 'First Quarter';
        if (phase < 0.47) return 'Waxing Gibbous';
        if (phase < 0.53) return 'Full Moon';
        if (phase < 0.72) return 'Waning Gibbous';
        if (phase < 0.78) return 'Last Quarter';
        return 'Waning Crescent';
    }

    /* Two different kinds of good night, which one ✅ used to conflate.
     *
     * 🌑 is for the darkest skies: within about three nights of new moon,
     * when nothing washes out the faint clusters, the galaxies or the
     * Milky Way. They are the best the month offers.
     *
     * 🔭 is for running a camp, which is not the same thing. A crescent
     * to first-quarter Moon is the finest object there is to put a
     * beginner behind a telescope for, and it still sets early enough to
     * leave real dark afterwards. A first-quarter Moon is half lit and up
     * until midnight, so the range stops there. */
    function nightMark(phase) {
        if (phase < 0.10 || phase > 0.90) {
            return { icon: '🌑', cls: 'darkest', label: 'darkest skies' };
        }
        if (phase <= 0.25) {
            return { icon: '🔭', cls: 'best-viewing', label: 'good for a camp' };
        }
        return null;
    }

    return {
        of: of,
        cells: cells,
        renderCells: renderCells,
        moonIcon: moonIcon,
        moonPhaseName: moonPhaseName,
        nightMark: nightMark,
        fmtTime: fmtTime,
        fmtDuration: fmtDuration,
        isTime: isTime,
        DAY_MS: DAY_MS
    };
})();
