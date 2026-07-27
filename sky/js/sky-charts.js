/*
 * sky-charts.js — the star-chart vocabulary shared by constellations.html and
 * stars.html: how a star is coloured and sized, how a figure is drawn, and the
 * handful of sky calculations both pages quote.
 *
 * Reads window.CONSTELLATION_DATA for nothing itself — callers pass in the
 * constellation record they want drawn. Depends on nothing else.
 */
window.SkyCharts = (function () {
    'use strict';

    var SVGNS = 'http://www.w3.org/2000/svg';

    // Central India (Bhopal) — the observer sky.html uses, so every page on the
    // site answers "can I see it from here?" the same way.
    var LAT = 23.2599;

    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];

    // Spectral class -> [core, glow]. The same table the chart generator uses,
    // so these charts and the source SVGs agree. Real B-V colours are far more
    // washed out than this; these are chosen to stay legible on a dark chart.
    var SPECTRAL = {
        O: ['#cad7ff', '#7c9dff'],
        B: ['#dbe4ff', '#93b4ff'],
        A: ['#ffffff', '#c9d8ff'],
        F: ['#fff6ec', '#ffe2b8'],
        G: ['#fff2d0', '#ffd98a'],
        K: ['#ffe0b8', '#ffb765'],
        M: ['#ffc9b0', '#ff8f6b'],
        // Wolf-Rayet stars are hotter than O; carbon and S-types are cooler
        // than M. Rare, but a bright-star list reaches them (γ² Velorum).
        W: ['#cad7ff', '#7c9dff'],
        C: ['#ffc9b0', '#ff8f6b'],
        S: ['#ffc9b0', '#ff8f6b']
    };
    var DEFAULT_COLOR = ['#ffffff', '#c9d8ff'];

    // What a spectral class looks like to the eye, in words.
    var SPECTRAL_WORD = {
        O: 'blue', B: 'blue-white', A: 'white', F: 'yellow-white',
        G: 'yellow', K: 'orange', M: 'red',
        W: 'blue', C: 'deep red', S: 'deep red'
    };

    /* The spectral class a string actually asserts, or null if it asserts none.
     *
     * Two traps in the Hipparcos SpType field:
     *
     *  - Historical luminosity prefixes are lower case — d (dwarf), g (giant),
     *    sd (subdwarf) — so only lower case may be stripped. Stripping upper
     *    case too would eat the G of 'G2V' and leave every yellow star
     *    classless, and the S of an S-type.
     *  - A 'comp' marker means the type on the row describes the companion, not
     *    the star: Capella is recorded 'M1: comp' but is a yellow giant, and
     *    Dubhe 'F7V comp' but is orange. Those rows assert nothing about the
     *    star itself, so they get no colour rather than a wrong one.
     */
    function spectralClass(spectral) {
        if (!spectral) return null;
        if (/\bcomp\b/i.test(spectral)) return null;
        var head = spectral.replace(/^[dgs]+/, '');
        for (var i = 0; i < 2 && i < head.length; i++) {
            var c = head.charAt(i).toUpperCase();
            if (SPECTRAL[c]) return c;
        }
        return null;
    }

    /* True when the row's spectral type belongs to a companion, so the page can
       say why it is not naming a colour. */
    function spectralIsCompanion(spectral) {
        return !!spectral && /\bcomp\b/i.test(spectral);
    }

    function starColors(spectral) {
        var c = spectralClass(spectral);
        return c ? SPECTRAL[c] : DEFAULT_COLOR;
    }

    function colorWord(spectral) {
        var c = spectralClass(spectral);
        return c ? SPECTRAL_WORD[c] : null;
    }

    /* Drawn radius in chart units. Exponential in magnitude, so the spread
       between Sirius and a fifth-magnitude field star reads clearly without the
       bright end swallowing the chart. */
    function starRadius(mag) {
        return Math.max(3.2, Math.min(26.0, 13.0 * Math.exp(-0.22 * mag)));
    }

    function svgEl(tag, attrs) {
        var node = document.createElementNS(SVGNS, tag);
        for (var k in attrs) {
            if (Object.prototype.hasOwnProperty.call(attrs, k)) {
                node.setAttribute(k, attrs[k]);
            }
        }
        return node;
    }

    function starLabel(star) {
        return star.name || star.desig || ('HIP ' + star.hip);
    }

    // ----------------------------------------------------------------------
    // Sky arithmetic
    // ----------------------------------------------------------------------

    /* The month something stands highest at around 9pm: it crosses the meridian
       then when the Sun sits 9h of right ascension behind it, and the Sun's RA is
       0h at the March equinox and gains 24h a year. */
    function bestMonth(raDeg) {
        var raHours = raDeg / 15;
        var dayOfYear = 80 + ((raHours - 9 + 24) % 24) * (365.25 / 24);
        var d = new Date(2001, 0, 1);
        d.setDate(1 + Math.round(dayOfYear) % 365);
        return d.getMonth();
    }

    /* Highest it ever gets above the Central-India horizon. */
    function culmination(decDeg) {
        return 90 - Math.abs(LAT - decDeg);
    }

    function visibilityNote(decDeg) {
        var alt = culmination(decDeg);
        if (alt <= 0) return { text: 'Never rises here', sub: 'too far south for Central India' };
        if (decDeg > 90 - LAT) return { text: 'Circumpolar', sub: 'up every night of the year' };
        if (alt < 20) return {
            text: 'Low — ' + Math.round(alt) + '° up',
            sub: 'needs a clear southern horizon'
        };
        return {
            text: Math.round(alt) + '° above the horizon',
            sub: 'at its highest, from Central India'
        };
    }

    function formatRA(deg) {
        var hours = deg / 15;
        var h = Math.floor(hours);
        var m = Math.floor((hours - h) * 60);
        return h + 'h ' + (m < 10 ? '0' : '') + m + 'm';
    }

    function formatDec(deg) {
        var sign = deg < 0 ? '−' : '+';
        var a = Math.abs(deg);
        var d = Math.floor(a);
        var m = Math.round((a - d) * 60);
        if (m === 60) { d += 1; m = 0; }
        return sign + d + '° ' + (m < 10 ? '0' : '') + m + '′';
    }

    function brightnessNote(mag) {
        if (mag < 1.5) return 'one of the brightest stars in the sky';
        if (mag < 3) return 'easy to see from a town';
        if (mag < 4.5) return 'needs a reasonably dark sky';
        return 'faint — dark skies only';
    }

    /* Parsecs to light years, rounded the way the number deserves: a parallax
       gets less certain the farther the star, so the far end stays coarse. */
    function lightYears(parsecs) {
        var ly = parsecs * 3.261563;
        if (ly < 100) return Math.round(ly * 10) / 10;
        if (ly < 1000) return Math.round(ly);
        return Math.round(ly / 10) * 10;
    }

    /* Fold to a comparable key: drop IAST diacritics and punctuation so a search
       for "krttika" hits Kṛttikā, while Devanagari passes through untouched. */
    function normalise(text) {
        return (text || '').toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9ऀ-ॿ]/g, '');
    }

    // ----------------------------------------------------------------------
    // Charts
    // ----------------------------------------------------------------------

    function starsByHip(con) {
        var byHip = {};
        con.stars.forEach(function (s) { byHip[s.hip] = s; });
        return byHip;
    }

    function figureLines(con, attrs) {
        var byHip = starsByHip(con);
        var group = svgEl('g', attrs);
        con.segments.forEach(function (seg) {
            var pts = seg.filter(function (hip) { return byHip[hip]; })
                .map(function (hip) { return byHip[hip].x + ',' + byHip[hip].y; }).join(' ');
            if (pts) group.appendChild(svgEl('polyline', { points: pts }));
        });
        return group;
    }

    /* The full chart for one constellation.
     *
     * opts.interactive  stars become focusable buttons with a finger-sized hit
     *                   disc; the caller listens on the container.
     * opts.labels       Bayer letters on the figure's brighter stars.
     * opts.highlight    HIP of a star to ring in gold.
     * opts.idPrefix     prefix for gradient ids, so two charts can coexist.
     */
    function buildChart(con, opts) {
        opts = opts || {};
        var prefix = opts.idPrefix || 'sc';
        var svg = svgEl('svg', {
            viewBox: '0 0 ' + con.w + ' ' + con.h,
            role: 'img',
            'aria-label': con.latin + ' star figure'
        });

        var defs = svgEl('defs', {});
        var skyId = prefix + '-sky';
        var sky = svgEl('radialGradient', { id: skyId, cx: '50%', cy: '45%', r: '75%' });
        sky.appendChild(svgEl('stop', { offset: '0%', 'stop-color': '#151e3f' }));
        sky.appendChild(svgEl('stop', { offset: '100%', 'stop-color': '#070a16' }));
        defs.appendChild(sky);

        // One glow gradient per spectral colour actually on this chart.
        var glowIds = {};
        con.stars.forEach(function (s) {
            var glow = starColors(s.sp)[1];
            if (glowIds[glow]) return;
            var id = prefix + '-g' + Object.keys(glowIds).length;
            glowIds[glow] = id;
            var grad = svgEl('radialGradient', { id: id });
            grad.appendChild(svgEl('stop', { offset: '0%', 'stop-color': glow, 'stop-opacity': '0.85' }));
            grad.appendChild(svgEl('stop', { offset: '45%', 'stop-color': glow, 'stop-opacity': '0.25' }));
            grad.appendChild(svgEl('stop', { offset: '100%', 'stop-color': glow, 'stop-opacity': '0' }));
            defs.appendChild(grad);
        });
        svg.appendChild(defs);
        svg.appendChild(svgEl('rect', {
            width: con.w, height: con.h, fill: 'url(#' + skyId + ')'
        }));

        // Dotted figure lines: a zero-length dash with a round cap gives dots
        // rather than the dashes a plain dasharray would.
        svg.appendChild(figureLines(con, {
            fill: 'none', stroke: '#9dbcff', 'stroke-opacity': '0.7', 'stroke-width': '4',
            'stroke-linecap': 'round', 'stroke-dasharray': '0.1 15'
        }));

        // Field stars first so the figure's own stars sit on top of them.
        [false, true].forEach(function (isFigure) {
            var members = con.stars.filter(function (s) { return !!s.fig === isFigure; });
            if (!members.length) return;
            var group = svgEl('g', isFigure ? {} : { opacity: '0.72' });
            members.forEach(function (s) {
                group.appendChild(buildStarNode(s, glowIds, opts));
            });
            svg.appendChild(group);
        });

        if (opts.labels) {
            var labels = svgEl('g', {
                'font-family': 'Georgia, serif', 'font-size': '20',
                fill: '#c8d6ff', 'fill-opacity': '0.62', 'pointer-events': 'none'
            });
            con.stars.forEach(function (s) {
                if (!s.fig || !s.bayer || s.mag > 4.0) return;
                var r = starRadius(s.mag);
                var text = svgEl('text', { x: s.x + r + 7, y: s.y - r - 4 });
                text.textContent = s.bayer;
                labels.appendChild(text);
            });
            svg.appendChild(labels);
        }

        return svg;
    }

    function buildStarNode(star, glowIds, opts) {
        var colors = starColors(star.sp);
        var r = starRadius(star.mag);
        var highlighted = opts.highlight && star.hip === opts.highlight;

        var attrs = { 'class': 'cs-star' + (highlighted ? ' selected' : '') };
        if (opts.interactive) {
            attrs['data-hip'] = star.hip;
            attrs.tabindex = '0';
            attrs.role = 'button';
            attrs['aria-label'] = starLabel(star) + ', magnitude ' + star.mag;
        }
        var node = svgEl('g', attrs);

        node.appendChild(svgEl('circle', {
            cx: star.x, cy: star.y, r: (r * 3.4).toFixed(2),
            fill: 'url(#' + glowIds[colors[1]] + ')', 'pointer-events': 'none'
        }));
        node.appendChild(svgEl('circle', {
            cx: star.x, cy: star.y, r: r.toFixed(2), fill: colors[0], 'pointer-events': 'none'
        }));
        node.appendChild(svgEl('circle', {
            'class': 'cs-ring', cx: star.x, cy: star.y, r: (r + 12).toFixed(2),
            fill: 'none', stroke: 'transparent', 'stroke-width': '4', 'pointer-events': 'none'
        }));
        if (opts.interactive) {
            // A generous transparent disc so the star is tappable on a phone.
            node.appendChild(svgEl('circle', {
                cx: star.x, cy: star.y, r: Math.max(r * 3, 32).toFixed(2), fill: 'transparent'
            }));
        }
        return node;
    }

    /* A thumbnail of the figure alone — lines and the stars they join — cropped
     * to its own bounding box so small figures aren't lost in the frame, then
     * letterboxed to a fixed 4:3 so a grid of them stays even.
     *
     * opts.highlight rings one star, for "here is where this star sits".
     */
    function buildThumb(con, opts) {
        opts = opts || {};
        var figure = con.stars.filter(function (s) { return s.fig; });
        var stars = figure.length ? figure : con.stars;
        if (opts.highlight) {
            var extra = con.stars.filter(function (s) { return s.hip === opts.highlight; });
            if (extra.length && stars.indexOf(extra[0]) === -1) stars = stars.concat(extra);
        }

        var xs = stars.map(function (s) { return s.x; });
        var ys = stars.map(function (s) { return s.y; });
        var minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
        var minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
        var pad = 70;
        var w = Math.max(maxX - minX, 1) + pad * 2;
        var h = Math.max(maxY - minY, 1) + pad * 2;
        var target = 4 / 3;
        if (w / h < target) {
            var nw = h * target;
            minX -= (nw - w) / 2;
            w = nw;
        } else {
            var nh = w / target;
            minY -= (nh - h) / 2;
            h = nh;
        }

        var svg = svgEl('svg', {
            'class': 'thumb',
            viewBox: (minX - pad) + ' ' + (minY - pad) + ' ' + w + ' ' + h,
            'aria-hidden': 'true', focusable: 'false'
        });

        svg.appendChild(figureLines(con, {
            fill: 'none', stroke: '#9dbcff', 'stroke-opacity': '0.75',
            'stroke-width': '5', 'stroke-linecap': 'round'
        }));

        stars.forEach(function (s) {
            var colors = starColors(s.sp);
            var r = Math.max(6, starRadius(s.mag) * 0.85);
            svg.appendChild(svgEl('circle', {
                cx: s.x, cy: s.y, r: r * 2.6, fill: colors[1], 'fill-opacity': '0.20'
            }));
            svg.appendChild(svgEl('circle', { cx: s.x, cy: s.y, r: r, fill: colors[0] }));
            if (opts.highlight === s.hip) {
                svg.appendChild(svgEl('circle', {
                    cx: s.x, cy: s.y, r: r + 16, fill: 'none',
                    stroke: '#ffcc33', 'stroke-width': '5'
                }));
            }
        });
        return svg;
    }

    return {
        LAT: LAT,
        MONTHS: MONTHS,
        /* Which stars get a page of their own on stars.html: this bright, or
           named in the Sanskrit texts at any brightness. Kept in step with
           MAG_LIMIT in tools/build-star-data.py — that script decides the real
           list; this is how constellations.html knows whether to offer a link. */
        STAR_PAGE_MAG_LIMIT: 2.5,
        svgEl: svgEl,
        starColors: starColors,
        colorWord: colorWord,
        spectralIsCompanion: spectralIsCompanion,
        starRadius: starRadius,
        starLabel: starLabel,
        bestMonth: bestMonth,
        culmination: culmination,
        visibilityNote: visibilityNote,
        formatRA: formatRA,
        formatDec: formatDec,
        brightnessNote: brightnessNote,
        lightYears: lightYears,
        normalise: normalise,
        buildChart: buildChart,
        buildThumb: buildThumb
    };
})();
