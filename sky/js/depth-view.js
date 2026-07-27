/* depth-view.js — a constellation with its depth put back.
 *
 * A constellation looks like a shape because we see it from one place. This
 * draws the figure twice over the same stars — flat on the sky as the chart
 * shows it, and again from one side with every star standing at its real
 * distance — and tweens between the two.
 *
 * The side view is a real projection, not a diagram. See sideLayout below.
 *
 * Needs js/sky-charts.js (colours, radii, star names) loaded first, and
 * constellation data whose figure stars carry a `pc` distance.
 *
 * Used by constellations.html, where it is the second view of a chart.
 */
(function () {
    'use strict';

    var SC = window.SkyCharts;
    var SVGNS = 'http://www.w3.org/2000/svg';
    var LY_PER_PARSEC = 3.261563;
    var DEG = Math.PI / 180;
    var VIEW_W = 1000, VIEW_H = 640;
    var DURATION = 1400;

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
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

    // -------------------------------------------------------------------
    // Geometry
    // -------------------------------------------------------------------

    function direction(raDeg, decDeg) {
        var ra = raDeg * DEG, dec = decDeg * DEG;
        return [Math.cos(dec) * Math.cos(ra), Math.cos(dec) * Math.sin(ra), Math.sin(dec)];
    }

    function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }

    function cross(a, b) {
        return [a[1] * b[2] - a[2] * b[1],
                a[2] * b[0] - a[0] * b[2],
                a[0] * b[1] - a[1] * b[0]];
    }

    function normalise3(v) {
        var n = Math.sqrt(dot(v, v));
        return n < 1e-9 ? null : [v[0] / n, v[1] / n, v[2] / n];
    }

    /* Put every star in real space, then look at the group from one side.
     *
     * w points from Earth to the middle of the figure — the line we normally
     * look along. u and v are across it, east and north. Turning the camera
     * onto u leaves depth running left-right and the north-south spread
     * running up-down; the east-west spread is what we are now looking
     * along, so it projects away. Earth sits at the origin, which is why it
     * lands at the right-hand end.
     */
    function sideLayout(con, stars, width, height) {
        var w = direction(con.ra, con.dec);
        // Near the celestial pole the sky's east is ill-defined; any
        // perpendicular will do to look along.
        var u = normalise3(cross([0, 0, 1], w)) || normalise3(cross([1, 0, 0], w));
        var v = cross(w, u);

        var points = stars.map(function (s) {
            var ly = s.pc * LY_PER_PARSEC;
            var d = direction(s.ra, s.dec);
            var p = [d[0] * ly, d[1] * ly, d[2] * ly];
            return { star: s, depth: dot(p, w), across: dot(p, v), ly: ly };
        });

        // Earth is at the origin and has to fit in frame with the stars.
        var maxDepth = Math.max.apply(null, points.map(function (p) { return p.depth; }));
        var minAcross = Math.min.apply(null, points.map(function (p) { return p.across; }));
        var maxAcross = Math.max.apply(null, points.map(function (p) { return p.across; }));
        minAcross = Math.min(minAcross, 0);
        maxAcross = Math.max(maxAcross, 0);

        var padX = width * 0.10, padY = height * 0.12;
        // One scale for both axes: distances stay honest against each other.
        var scale = Math.min(
            (width - padX * 2) / Math.max(maxDepth, 1e-6),
            (height - padY * 2) / Math.max(maxAcross - minAcross, 1e-6)
        );

        var earthX = width - padX;
        var midAcross = (minAcross + maxAcross) / 2;
        var earthY = height / 2 + midAcross * scale;

        points.forEach(function (p) {
            p.x = earthX - p.depth * scale;
            p.y = earthY - p.across * scale;
        });

        return {
            points: points, scale: scale,
            earth: { x: earthX, y: earthY },
            maxLy: Math.max.apply(null, points.map(function (p) { return p.ly; }))
        };
    }

    /* Round distances to draw as guide rings around Earth. */
    function ringDistances(maxLy) {
        var steps = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000];
        var chosen = [];
        for (var i = 0; i < steps.length; i++) {
            if (steps[i] < maxLy * 1.05) chosen.push(steps[i]);
        }
        return chosen.slice(-4);
    }

    function formatLy(ly) {
        if (ly < 100) return Math.round(ly * 10) / 10 + ' ly';
        if (ly < 1000) return Math.round(ly) + ' ly';
        return Math.round(ly / 10) * 10 + ' ly';
    }

    function lerp(a, b, k) { return a + (b - a) * k; }

    function easeInOut(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    /* Can this figure be lifted into space at all? Two placed stars is the
     * minimum for the comparison to say anything. */
    function placeable(con) {
        return con.stars.filter(function (s) { return s.fig && s.pc; }).length >= 2;
    }

    // -------------------------------------------------------------------
    // The view
    // -------------------------------------------------------------------

    /* opts: { stage, note, payoff, caveat, onViewChange } — the four
     * elements this fills in, and a callback when the target view flips. */
    function create(opts) {
        var stage = opts.stage;
        var reducedMotion = window.matchMedia
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        var current = null;   // the constellation being shown
        var scene = null;     // its built nodes and layouts
        var t = 0;            // 0 = from Earth, 1 = from the side
        var target = 0;
        var animFrom = 0, animStart = null;
        var frame = null;     // the pending animation frame, if any

        /* The stage is drawn in its own 1000-unit space and scaled to fit the
           screen, so on a phone a 21-unit label lands at about 8 real pixels.
           Text and label spacing grow to compensate, and fewer stars are
           named so the bigger labels still have room. */
        function narrow() { return window.innerWidth < 700; }
        function textScale() { return narrow() ? 1.9 : 1; }
        function labelH() { return 26 * textScale(); }
        function labelW() { return 210 * textScale(); }

        function build(con) {
            var stars = con.stars.filter(function (s) { return s.fig && s.pc; });
            var byHip = {};
            stars.forEach(function (s) { byHip[s.hip] = s; });

            // The chart's own coordinates, re-fitted into this frame so the
            // Earth view matches the chart on the other tab.
            var xs = stars.map(function (s) { return s.x; });
            var ys = stars.map(function (s) { return s.y; });
            var minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
            var minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
            var pad = 90;
            var fit = Math.min((VIEW_W - pad * 2) / Math.max(maxX - minX, 1),
                               (VIEW_H - pad * 2) / Math.max(maxY - minY, 1));
            var offX = (VIEW_W - (maxX - minX) * fit) / 2 - minX * fit;
            var offY = (VIEW_H - (maxY - minY) * fit) / 2 - minY * fit;

            var side = sideLayout(con, stars, VIEW_W, VIEW_H);
            var sideByHip = {};
            side.points.forEach(function (p) { sideByHip[p.star.hip] = p; });

            var svg = svgEl('svg', {
                viewBox: '0 0 ' + VIEW_W + ' ' + VIEW_H,
                role: 'img',
                'aria-label': con.latin + ', from Earth and from the side'
            });

            var defs = svgEl('defs', {});
            var sky = svgEl('radialGradient', { id: 'cd-sky', cx: '50%', cy: '45%', r: '75%' });
            sky.appendChild(svgEl('stop', { offset: '0%', 'stop-color': '#151e3f' }));
            sky.appendChild(svgEl('stop', { offset: '100%', 'stop-color': '#070a16' }));
            defs.appendChild(sky);

            // The figure lines blur as the view swings: the shape is a trick
            // of perspective, so it should stop looking solid.
            var filter = svgEl('filter', {
                id: 'cd-blur', x: '-20%', y: '-20%', width: '140%', height: '140%'
            });
            var blur = svgEl('feGaussianBlur', { stdDeviation: '0' });
            filter.appendChild(blur);
            defs.appendChild(filter);

            var glowIds = {};
            stars.forEach(function (s) {
                var glow = SC.starColors(s.sp)[1];
                if (glowIds[glow]) return;
                var id = 'cd-g' + Object.keys(glowIds).length;
                glowIds[glow] = id;
                var grad = svgEl('radialGradient', { id: id });
                grad.appendChild(svgEl('stop', { offset: '0%', 'stop-color': glow, 'stop-opacity': '0.85' }));
                grad.appendChild(svgEl('stop', { offset: '45%', 'stop-color': glow, 'stop-opacity': '0.25' }));
                grad.appendChild(svgEl('stop', { offset: '100%', 'stop-color': glow, 'stop-opacity': '0' }));
                defs.appendChild(grad);
            });
            svg.appendChild(defs);
            svg.appendChild(svgEl('rect', {
                width: VIEW_W, height: VIEW_H, fill: 'url(#cd-sky)'
            }));

            // --- guide rings around Earth, only in the side view ---
            var ringGroup = svgEl('g', { opacity: '0' });
            // Rings whose labels would sit on top of each other are dropped —
            // the near ones bunch up, and the gap needed grows with the text.
            var minGap = 80 * textScale();
            var lastRingX = Infinity;
            ringDistances(side.maxLy).filter(function (ly) {
                var x = side.earth.x - ly * side.scale;
                if (lastRingX - x < minGap) return false;
                lastRingX = x;
                return true;
            }).forEach(function (ly) {
                var r = ly * side.scale;
                ringGroup.appendChild(svgEl('circle', {
                    cx: side.earth.x, cy: side.earth.y, r: r, fill: 'none',
                    stroke: '#4a6a94', 'stroke-opacity': '0.5', 'stroke-dasharray': '6 10'
                }));
                // Along the foot of the frame, clear of the stars themselves.
                var label = svgEl('text', {
                    x: side.earth.x - r, y: VIEW_H - 16,
                    'text-anchor': 'middle', 'font-family': 'Outfit, sans-serif',
                    'font-size': (20 * textScale()).toFixed(0), fill: '#7d97b8',
                    'paint-order': 'stroke', stroke: '#070a16', 'stroke-width': '4',
                    'stroke-linejoin': 'round'
                });
                label.textContent = formatLy(ly);
                ringGroup.appendChild(label);
            });
            svg.appendChild(ringGroup);

            // --- lines of sight from Earth, only in the side view ---
            // Fixed geometry; they fade in rather than move.
            var sightGroup = svgEl('g', { opacity: '0' });
            side.points.forEach(function (p) {
                sightGroup.appendChild(svgEl('line', {
                    x1: side.earth.x, y1: side.earth.y, x2: p.x, y2: p.y,
                    stroke: '#8fb4e8', 'stroke-opacity': '0.28', 'stroke-width': '2'
                }));
            });
            svg.appendChild(sightGroup);

            // --- the figure ---
            var lineGroup = svgEl('g', {
                fill: 'none', stroke: '#9dbcff', 'stroke-opacity': '0.7', 'stroke-width': '4',
                'stroke-linecap': 'round', 'stroke-dasharray': '0.1 15',
                filter: 'url(#cd-blur)'
            });
            var polylines = [];
            con.segments.forEach(function (seg) {
                var members = seg.filter(function (hip) { return byHip[hip]; });
                if (members.length < 2) return;
                var node = svgEl('polyline', { points: '' });
                lineGroup.appendChild(node);
                polylines.push({ node: node, hips: members });
            });
            svg.appendChild(lineGroup);

            // --- Earth ---
            var earthGroup = svgEl('g', { opacity: '0' });
            earthGroup.appendChild(svgEl('circle', {
                cx: side.earth.x, cy: side.earth.y, r: 26,
                fill: '#1EAEDB', 'fill-opacity': '0.18'
            }));
            earthGroup.appendChild(svgEl('circle', {
                cx: side.earth.x, cy: side.earth.y, r: 8, fill: '#4fc3e8'
            }));
            var earthLabel = svgEl('text', {
                x: side.earth.x, y: side.earth.y + 58, 'text-anchor': 'middle',
                'font-family': 'Outfit, sans-serif', 'font-size': (22 * textScale()).toFixed(0),
                fill: '#8fd8f0', 'font-weight': '600', 'paint-order': 'stroke',
                stroke: '#070a16', 'stroke-width': '5', 'stroke-linejoin': 'round'
            });
            earthLabel.textContent = 'Earth';
            earthGroup.appendChild(earthLabel);
            svg.appendChild(earthGroup);

            // --- stars ---
            var starGroup = svgEl('g', {});
            var nodes = stars.map(function (s) {
                var colors = SC.starColors(s.sp);
                var r = SC.starRadius(s.mag) * 0.9;
                var g = svgEl('g', {});
                var halo = svgEl('circle', {
                    r: (r * 3.2).toFixed(2), fill: 'url(#' + glowIds[colors[1]] + ')'
                });
                var core = svgEl('circle', { r: r.toFixed(2), fill: colors[0] });
                g.appendChild(halo);
                g.appendChild(core);
                starGroup.appendChild(g);
                return {
                    star: s, group: g, halo: halo, core: core,
                    from: { x: s.x * fit + offX, y: s.y * fit + offY },
                    to: { x: sideByHip[s.hip].x, y: sideByHip[s.hip].y },
                    ly: sideByHip[s.hip].ly
                };
            });
            svg.appendChild(starGroup);

            // --- labels: the ones worth naming, plus nearest and farthest ---
            var sorted = nodes.slice().sort(function (a, b) { return a.ly - b.ly; });
            var nearest = sorted[0], farthest = sorted[sorted.length - 1];
            var nameLimit = narrow() ? 2.0 : 2.5;
            var labelled = nodes.filter(function (n) {
                return (n.star.name && n.star.mag <= nameLimit) || n === nearest || n === farthest;
            });
            var labelGroup = svgEl('g', {});
            labelled.forEach(function (n) {
                n.leader = svgEl('line', {
                    stroke: '#7d97b8', 'stroke-width': '1.5', opacity: '0'
                });
                labelGroup.appendChild(n.leader);
            });
            labelled.forEach(function (n) {
                var text = svgEl('text', {
                    'font-family': 'Outfit, sans-serif',
                    'font-size': (21 * textScale()).toFixed(0),
                    fill: '#dbe6f5', 'paint-order': 'stroke',
                    stroke: '#070a16', 'stroke-width': '5', 'stroke-linejoin': 'round'
                });
                labelGroup.appendChild(text);
                n.label = text;
            });
            svg.appendChild(labelGroup);

            stage.textContent = '';
            stage.appendChild(svg);

            return {
                svg: svg, nodes: nodes, polylines: polylines, blur: blur,
                lineGroup: lineGroup, ringGroup: ringGroup, sightGroup: sightGroup,
                earthGroup: earthGroup, side: side,
                nearest: nearest, farthest: farthest,
                dropped: con.stars.filter(function (s) { return s.fig && !s.pc; })
            };
        }

        /* Orion's belt puts three labelled stars within a few pixels of each
         * other. Walk the labels top to bottom and push any that would sit on
         * the one above it far enough down to clear, then commit the result.
         * A leader line keeps a nudged label attached to its star.
         */
        function declutter() {
            var labels = scene.nodes.filter(function (n) { return n.label; });
            var order = labels.slice();
            // Once Earth is on screen its label holds its ground and the star
            // labels move around it, not over it.
            if (t > 0.5) {
                order.push({
                    labelX: scene.side.earth.x, labelY: scene.side.earth.y + 58, fixed: true
                });
            }
            order.sort(function (a, b) { return a.labelY - b.labelY; });
            for (var i = 1; i < order.length; i++) {
                if (order[i].fixed) continue;
                for (var j = 0; j < i; j++) {
                    var a = order[j], b = order[i];
                    if (Math.abs(a.labelX - b.labelX) < labelW()
                        && b.labelY - a.labelY < labelH()) {
                        b.labelY = a.labelY + labelH();
                    }
                }
            }
            labels.forEach(function (n) {
                n.label.setAttribute('x', n.labelX.toFixed(2));
                n.label.setAttribute('y', n.labelY.toFixed(2));
                // Only draw a leader once the label has been pushed clear.
                var moved = n.labelY - (n.pos.y - 14);
                if (moved > 6) {
                    n.leader.setAttribute('x1', n.pos.x.toFixed(2));
                    n.leader.setAttribute('y1', n.pos.y.toFixed(2));
                    n.leader.setAttribute('x2', n.labelX.toFixed(2));
                    n.leader.setAttribute('y2', (n.labelY - 6).toFixed(2));
                    n.leader.setAttribute('opacity', '0.35');
                } else {
                    n.leader.setAttribute('opacity', '0');
                }
            });
        }

        function draw() {
            if (!scene) return;
            var k = t;

            scene.nodes.forEach(function (n) {
                var x = lerp(n.from.x, n.to.x, k);
                var y = lerp(n.from.y, n.to.y, k);
                n.pos = { x: x, y: y };
                n.halo.setAttribute('cx', x.toFixed(2));
                n.halo.setAttribute('cy', y.toFixed(2));
                n.core.setAttribute('cx', x.toFixed(2));
                n.core.setAttribute('cy', y.toFixed(2));
                if (n.label) {
                    var name = SC.starLabel(n.star);
                    n.label.textContent = k > 0.55 ? name + ' · ' + formatLy(n.ly) : name;
                    // Near the right edge a label has to run leftwards or it
                    // falls off the frame — and it is wider on a phone.
                    var toRight = x < VIEW_W - 220 * textScale();
                    n.labelX = toRight ? x + 16 : x - 16;
                    n.labelY = y - 14;
                    n.label.setAttribute('text-anchor', toRight ? 'start' : 'end');
                }
            });

            declutter();

            var pos = {};
            scene.nodes.forEach(function (n) { pos[n.star.hip] = n.pos; });
            scene.polylines.forEach(function (p) {
                p.node.setAttribute('points', p.hips.map(function (hip) {
                    return pos[hip].x.toFixed(1) + ',' + pos[hip].y.toFixed(1);
                }).join(' '));
            });

            // The figure softens as it stops being a real shape. The chart
            // draws it as dots — a zero-length dash with a round cap — and a
            // row of dots simply disappears under a blur, so the gaps close as
            // the blur comes up and what is left is a soft ghost of the line.
            scene.blur.setAttribute('stdDeviation', (k * 5).toFixed(2));
            scene.lineGroup.setAttribute('stroke-dasharray',
                lerp(0.1, 5, k).toFixed(2) + ' ' + lerp(15, 1, k).toFixed(2));
            scene.lineGroup.setAttribute('stroke-opacity', (0.7 - 0.2 * k).toFixed(2));

            var fade = Math.max(0, (k - 0.25) / 0.75);
            scene.ringGroup.setAttribute('opacity', fade.toFixed(3));
            scene.sightGroup.setAttribute('opacity', fade.toFixed(3));
            scene.earthGroup.setAttribute('opacity', fade.toFixed(3));
        }

        function step(now) {
            frame = null;
            if (animStart === null) animStart = now;
            var p = Math.min(1, (now - animStart) / DURATION);
            t = animFrom + (target - animFrom) * easeInOut(p);
            draw();
            if (p < 1) {
                frame = window.requestAnimationFrame(step);
            } else {
                t = target;
                draw();
                updateNote();
            }
        }

        function stopFrame() {
            if (frame !== null) {
                window.cancelAnimationFrame(frame);
                frame = null;
            }
        }

        /* Pressing the button mid-swing retargets from wherever the view has
         * got to, rather than being ignored — and a tab that sleeps through
         * its own animation picks it up again on return.
         *
         * The pending frame is cancelled and re-requested rather than being
         * tracked with a busy flag: a flag can only be cleared from inside a
         * frame, so one frame that never arrives would wedge the view for
         * good. */
        function setView(value, animate) {
            var changed = target !== value;
            target = value;
            if (changed && opts.onViewChange) opts.onViewChange(target > 0.5);
            stopFrame();
            if (!animate || reducedMotion) {
                t = value;
                animStart = null;
                draw();
                updateNote();
                return;
            }
            animFrom = t;
            animStart = null;
            frame = window.requestAnimationFrame(step);
        }

        function updateNote() {
            if (!scene || !opts.note) return;
            opts.note.textContent = t > 0.5
                ? 'Seen from one side. Earth is the blue dot on the right, the dashed rings '
                  + 'mark distance from it, and each faint line is one line of sight — the '
                  + 'direction you look to see that star.'
                : 'The view from Earth: the figure as it appears on the sky, every star '
                  + 'flattened onto the same dome.';
        }

        function describe(con) {
            if (opts.payoff) {
                var near = scene.nearest, far = scene.farthest;
                var ratio = far.ly / near.ly;
                opts.payoff.textContent = '';
                var line = document.createDocumentFragment();
                line.appendChild(document.createTextNode('In ' + con.latin + ', '));
                line.appendChild(el('strong', null, SC.starLabel(near.star)));
                line.appendChild(document.createTextNode(' is the nearest of the figure at '));
                line.appendChild(el('strong', null, formatLy(near.ly)));
                line.appendChild(document.createTextNode(', and '));
                line.appendChild(el('strong', null, SC.starLabel(far.star)));
                line.appendChild(document.createTextNode(' the farthest at '));
                line.appendChild(el('strong', null, formatLy(far.ly)));
                line.appendChild(document.createTextNode(' — '
                    + (ratio >= 10 ? Math.round(ratio) : Math.round(ratio * 10) / 10)
                    + ' times farther away. From Earth they sit side by side in the '
                    + 'same figure.'));
                opts.payoff.appendChild(line);
            }

            if (opts.caveat) {
                var notes = ['Both axes of the side view are to the same scale, so the'
                    + ' distances are comparable; the east-west spread is the direction'
                    + ' being looked along, so it does not appear.'];
                if (scene.dropped.length) {
                    notes.push(scene.dropped.length + ' star'
                        + (scene.dropped.length === 1 ? '' : 's') + ' of the figure ('
                        + scene.dropped.map(function (s) { return SC.starLabel(s); }).join(', ')
                        + ') ' + (scene.dropped.length === 1 ? 'has' : 'have')
                        + ' no parallax distance in this catalogue, and so cannot be'
                        + ' placed here.');
                }
                opts.caveat.textContent = notes.join(' ');
            }
        }

        /* Snap back to the sky and swing round again.
         *
         * The stage used to be a two-state toggle, which left the page with
         * two different "back"s — one that returned to the chart and changed
         * the URL, and one that only wound the stage back and did not. The
         * stage has one resting state now, the side view, so the address bar
         * always describes what is on screen. This is the replay. */
        function replay() {
            if (!scene) return;
            setView(0, false);
            setView(1, true);
        }

        /* Draw `con`. `keep` holds whichever view we are already in, so
         * stepping through several constellations from the side doesn't
         * snap back to the sky each time. */
        function show(con, keep) {
            current = con;
            scene = build(con);
            if (!keep) { t = 0; target = 0; }
            draw();
            updateNote();
            describe(con);
        }

        // Label sizing depends on how wide the screen is, so crossing the
        // phone/desktop line rebuilds the scene at the new size.
        var wasNarrow = narrow();
        function relayout() {
            if (!current || narrow() === wasNarrow) return;
            wasNarrow = narrow();
            var keepT = t, keepTarget = target;
            scene = build(current);
            t = keepT;
            target = keepTarget;
            draw();
            updateNote();
        }

        return {
            show: show,
            setView: setView,
            replay: replay,
            relayout: relayout,
            isSide: function () { return target > 0.5; },
            shownFor: function () { return current; }
        };
    }

    window.DepthView = {
        create: create,
        placeable: placeable,
        formatLy: formatLy,
        VIEW_W: VIEW_W,
        VIEW_H: VIEW_H
    };
})();
