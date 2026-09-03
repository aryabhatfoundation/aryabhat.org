/* depth-lab.js — a constellation in three dimensions, five ways.
 *
 * A constellation is a shape only because we see it from one place: the
 * stars of a figure can be a hundred times farther apart in depth than they
 * are across the sky. This puts every star of a figure at its real distance
 * and hands the viewer that depth in whichever way their eyes can take it —
 * a slow drift with distance fog, head-motion parallax from the mouse or the
 * phone's tilt, a wiggle, red–cyan anaglyph, or a cross-eyed stereo pair.
 *
 * Earth is the origin and one unit is one light-year. The camera is an eye a
 * little way from Earth, looking at the middle of the figure; what it sees is
 * drawn on a 2-D canvas by a stereographic projection of each star's
 * direction from that eye. That is the projection the atlas charts use, so a
 * figure looks as it does on its chart, and the widest ones (Hydra spans
 * 130°) still fit in frame where a pinhole camera could not hold them. It is
 * also why there is no scene library here: a page whose job is thirty dots
 * does not need half a megabyte of one, and the section promises to work on
 * a phone at a camp site on a weak signal.
 *
 * Needs js/sky-charts.js (colours, radii, star names) loaded first, and a
 * constellation record from js/constellation-data.js whose figure stars
 * carry a `pc` distance.
 *
 * Used by constellation-depth.html.
 */
(function () {
    'use strict';

    var SC = window.SkyCharts;
    var LY_PER_PARSEC = 3.261563;
    var DEG = Math.PI / 180;

    /* The ways of seeing depth, in the order the menu lists them. `cap` is
       the one-line instruction shown under the picker; it may hold <b>. */
    var MODES = [
        {
            id: 'orbit', label: 'Depth cues',
            cap: 'The eye drifts slowly around the figure while distance fades the far stars. ' +
                'Motion alone shows which stars are near.'
        },
        {
            id: 'parallax', label: 'Parallax',
            cap: '<b>Move your mouse</b> across the sky, or tilt your phone, and the near stars ' +
                'slide past the far ones.'
        },
        {
            id: 'wiggle', label: 'Wiggle',
            cap: 'The view rocks between two eye positions. Your brain reads the motion as depth.'
        },
        {
            id: 'anaglyph', label: 'Anaglyph — red-cyan glasses',
            cap: 'For <b>red-cyan glasses</b>, red lens over the left eye.'
        },
        {
            id: 'sbs', label: 'Stereo pair — cross-eyed',
            cap: '<b>Cross your eyes</b> until the two frames fuse into a third one in the middle.'
        }
    ];

    // -------------------------------------------------------------------
    // Vectors and colours
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

    function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }

    function scale(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }

    function length(a) { return Math.sqrt(dot(a, a)); }

    function normalise(v) {
        var n = length(v);
        return n < 1e-9 ? null : scale(v, 1 / n);
    }

    function clamp(x, lo, hi) { return x < lo ? lo : x > hi ? hi : x; }

    function hexToRgb(hex) {
        var h = hex.replace('#', '');
        if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
        var n = parseInt(h, 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    /* An anaglyph wants each eye in one channel. The reference way — masking
       the colour channels of a full-colour render — sends a blue star almost
       wholly to the right eye and an orange one to the left, which breaks the
       fusion. Working from the star's brightness instead keeps both eyes
       seeing the same star. */
    function tinted(rgb, tint) {
        if (!tint) return rgb;
        var l = Math.max(rgb[0], rgb[1], rgb[2]);
        return tint === 'left' ? [l, 0, 0] : [0, l, l];
    }

    function rgba(rgb, a) {
        return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + a.toFixed(3) + ')';
    }

    var INK = [230, 238, 247], GOLD = [255, 204, 51], LINE = [143, 163, 208];
    var DUST = [180, 195, 225], SKY_DARK = '#070a16';

    function formatLy(ly) {
        if (ly < 100) return Math.round(ly * 10) / 10 + ' ly';
        if (ly < 1000) return Math.round(ly) + ' ly';
        return (Math.round(ly / 10) * 10).toLocaleString() + ' ly';
    }

    /* Two placed stars is the least a figure needs before its depth means
       anything. */
    function placeable(con) {
        return con.stars.filter(function (s) { return s.fig && s.pc; }).length >= 2;
    }

    // -------------------------------------------------------------------
    // Projection
    // -------------------------------------------------------------------

    var POLE = [0, 0, 1], ARIES = [1, 0, 0];

    /* A camera at `eye` looking at `target`, north up. Right-handed so that,
       looking out from inside the sphere, east falls on the left — the way a
       chart of the sky is drawn. Near the celestial pole "north up" is
       ill-defined and any perpendicular will do. */
    function basisFor(eye, target) {
        var f = normalise(sub(target, eye));
        var r = normalise(cross(f, POLE)) || normalise(cross(f, ARIES));
        var u = cross(r, f);
        return { eye: eye, f: f, r: r, u: u };
    }

    /* A unit direction seen from the camera, as stereographic chart
       coordinates with unit focal length: x right, y up. Small angles come
       out the same as a pinhole camera would give; wide ones stay finite.
       Null for anything far enough behind the eye to be meaningless. */
    function projectDir(n, b) {
        var z = dot(n, b.f);
        if (z < -0.6) return null;
        var k = 2 / (1 + z);
        return [k * dot(n, b.r), k * dot(n, b.u)];
    }

    /* The faint background: a fixed scatter of points at infinity, seeded so
       it is the same sky every visit. Real field stars are drawn on top of
       it from the catalogue; this is only texture, so the frame does not
       read as black paper. */
    var dust = (function () {
        var seed = 0x5EED, pts = [];
        function rnd() {
            seed |= 0; seed = seed + 0x6D2B79F5 | 0;
            var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
        for (var i = 0; i < 2600; i++) {
            var u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, r = Math.sqrt(1 - u * u);
            pts.push({ dir: [r * Math.cos(th), r * Math.sin(th), u], a: 0.12 + rnd() * 0.35 });
        }
        return pts;
    })();

    // -------------------------------------------------------------------
    // The scene for one constellation
    // -------------------------------------------------------------------

    function build(con) {
        var byHip = {};
        var stars = con.stars.filter(function (s) { return s.fig && s.pc; }).map(function (s) {
            var ly = s.pc * LY_PER_PARSEC;
            var dir = direction(s.ra, s.dec);
            var colors = SC.starColors(s.sp);
            var node = {
                star: s, ly: ly, dir: dir, p: scale(dir, ly),
                core: hexToRgb(colors[0]), glow: hexToRgb(colors[1]),
                r: SC.starRadius(s.mag)
            };
            byHip[s.hip] = node;
            return node;
        });

        var sorted = stars.slice().sort(function (a, b) { return a.ly - b.ly; });
        var nearest = sorted[0].ly, farthest = sorted[sorted.length - 1].ly;

        /* The eye looks at a point along the chart's centre line, at the
           log-midpoint of the figure's depth. That plane is where the two
           eyes of a stereo pair agree, so the near stars stand out in front
           of it and the far ones sink behind. */
        var centre = direction(con.ra, con.dec);
        var target = scale(centre, Math.sqrt(nearest * farthest));
        var base = basisFor([0, 0, 0], target);

        // The figure's footprint as seen from Earth, so any viewport can be
        // fitted to it.
        var xs = [], ys = [];
        stars.forEach(function (n) {
            var q = projectDir(n.dir, base);
            xs.push(q[0]); ys.push(q[1]);
        });
        var fit = {
            minX: Math.min.apply(null, xs), maxX: Math.max.apply(null, xs),
            minY: Math.min.apply(null, ys), maxY: Math.max.apply(null, ys)
        };

        // A star without a distance drops out of its segment and the line
        // closes over the gap, as the side view of the atlas does.
        var lines = [];
        con.segments.forEach(function (seg) {
            var run = seg.map(function (hip) { return byHip[hip]; }).filter(Boolean);
            if (run.length >= 2) lines.push(run);
        });

        // Field stars have no distance in this data, so they sit at infinity
        // with the dust — which is honest: nothing is claimed for them.
        var field = con.stars.filter(function (s) { return !s.fig && s.mag <= 5.5; }).map(function (s) {
            return {
                dir: direction(s.ra, s.dec),
                core: hexToRgb(SC.starColors(s.sp)[0]),
                r: SC.starRadius(s.mag) * 0.5
            };
        });

        return {
            con: con, stars: stars, sorted: sorted, byHip: byHip,
            nearest: nearest, farthest: farthest,
            near: sorted[0], far: sorted[sorted.length - 1],
            target: target, base: base, fit: fit, lines: lines, field: field,
            dropped: con.stars.filter(function (s) { return s.fig && !s.pc; }),
            labels: { narrow: null, list: null }
        };
    }

    /* Which stars are named on screen: the bright named ones, plus the
       nearest and the farthest whatever they are called, since those two are
       the point. Fewer on a phone, where the labels are bigger. */
    function chooseLabels(scene, narrow) {
        if (scene.labels.narrow === narrow) return scene.labels.list;
        var limit = narrow ? 2.0 : 2.5, cap = narrow ? 5 : 8;
        var picked = scene.stars.filter(function (n) {
            return n.star.name && n.star.mag <= limit;
        }).sort(function (a, b) { return a.star.mag - b.star.mag; }).slice(0, cap);
        [scene.near, scene.far].forEach(function (n) {
            if (picked.indexOf(n) === -1) picked.push(n);
        });
        scene.labels = { narrow: narrow, list: picked };
        return picked;
    }

    // -------------------------------------------------------------------
    // The lab
    // -------------------------------------------------------------------

    /* opts: { canvas, surface, onTilt }
       canvas  — the <canvas> to draw on; it is sized to its CSS box.
       surface — the element pointer motion is read from (default: canvas).
       onTilt  — called once when the phone's orientation starts arriving. */
    function create(opts) {
        var canvas = opts.canvas;
        var surface = opts.surface || canvas;
        var ctx = canvas.getContext('2d');
        var reduced = !!(window.matchMedia
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        var coarse = !!(window.matchMedia
            && window.matchMedia('(pointer: coarse)').matches);

        var scene = null;
        var mode = 'parallax';
        var depthK = 0.5;
        var labelsOn = true;
        var mouse = { x: 0, y: 0 }, smooth = { x: 0, y: 0 };
        var gyro = { on: false, b0: null, g0: null, x: 0, y: 0 };
        var dpr = 1, width = 0, height = 0;
        var running = false, frame = null, t0 = null;
        var visible = true;
        // Bands at the top and foot of the canvas that something else is
        // drawn over (the readout and the controls, in the immersive view).
        // The sky still fills them; the figure is fitted to what is left.
        var insets = { top: 0, bottom: 0 };

        function amp() { return scene.nearest * (0.04 + 0.40 * depthK); }   // head travel, ly
        function sep() { return scene.nearest * (0.008 + 0.05 * depthK); }  // eye separation, ly

        /* An eye offset sideways and up from Earth, in the frame of the view
           from Earth itself, so "right" means the same thing every frame. */
        function eyeAt(offR, offU) {
            var b = scene.base;
            return [b.r[0] * offR + b.u[0] * offU,
                    b.r[1] * offR + b.u[1] * offU,
                    b.r[2] * offR + b.u[2] * offU];
        }

        // ---- drawing one view ----

        function circle(x, y, r) {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }

        function drawView(vp, eye, tint, withBackground) {
            var b = basisFor(eye, scene.target);
            var fit = scene.fit;
            var padX = 0.13, padY = 0.16;
            var spanX = Math.max(fit.maxX - fit.minX, 0.06);
            var spanY = Math.max(fit.maxY - fit.minY, 0.06);
            // The room the figure is fitted into: the viewport less any
            // band something else is drawn over.
            var room = {
                x: vp.x, y: vp.y + insets.top,
                w: vp.w, h: Math.max(40, vp.h - insets.top - insets.bottom)
            };
            var F = Math.min(room.w * (1 - 2 * padX) / spanX, room.h * (1 - 2 * padY) / spanY);
            var cx = room.x + room.w / 2 - F * (fit.minX + fit.maxX) / 2;
            var cy = room.y + room.h / 2 + F * (fit.minY + fit.maxY) / 2;
            var unit = vp.w / 1000;   // chart units -> pixels
            var narrow = vp.w < 520;

            ctx.save();
            ctx.beginPath();
            ctx.rect(vp.x, vp.y, vp.w, vp.h);
            ctx.clip();

            if (withBackground) {
                if (tint) {
                    ctx.fillStyle = '#04060c';
                } else {
                    var g = ctx.createRadialGradient(
                        vp.x + vp.w / 2, vp.y + vp.h * 0.45, 0,
                        vp.x + vp.w / 2, vp.y + vp.h * 0.45, Math.max(vp.w, vp.h) * 0.75);
                    g.addColorStop(0, '#151e3f');
                    g.addColorStop(1, SKY_DARK);
                    ctx.fillStyle = g;
                }
                ctx.fillRect(vp.x, vp.y, vp.w, vp.h);
            }

            // dust and field stars, both at infinity
            var dustRgb = tinted(DUST, tint);
            var i, q, x, y;
            for (i = 0; i < dust.length; i++) {
                q = projectDir(dust[i].dir, b);
                if (!q) continue;
                x = cx + F * q[0]; y = cy - F * q[1];
                if (x < vp.x || x > vp.x + vp.w || y < vp.y || y > vp.y + vp.h) continue;
                ctx.fillStyle = rgba(dustRgb, dust[i].a);
                ctx.fillRect(x, y, 1.1, 1.1);
            }
            for (i = 0; i < scene.field.length; i++) {
                var fs = scene.field[i];
                q = projectDir(fs.dir, b);
                if (!q) continue;
                x = cx + F * q[0]; y = cy - F * q[1];
                ctx.fillStyle = rgba(tinted(fs.core, tint), 0.55);
                circle(x, y, Math.max(0.8, fs.r * unit * 0.8));
            }

            // the figure stars, projected once
            var pos = {};
            scene.stars.forEach(function (n) {
                var v = sub(n.p, eye), d = length(v);
                var qq = projectDir(scale(v, 1 / d), b);
                if (!qq) return;
                var boost = 0.85 + 0.35 * (scene.nearest / n.ly);
                pos[n.star.hip] = {
                    x: cx + F * qq[0], y: cy - F * qq[1], d: d,
                    r: Math.max(1.6, n.r * unit * 0.8 * boost),
                    // exponential-squared fog by true distance: the farthest
                    // star of a figure comes through at about half strength
                    fog: Math.exp(-Math.pow(0.85 * n.ly / scene.farthest, 2))
                };
            });

            // the figure
            ctx.lineWidth = Math.max(0.8, 1.6 * unit);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = rgba(tinted(LINE, tint), 0.42);
            scene.lines.forEach(function (run) {
                ctx.beginPath();
                var pen = false;
                run.forEach(function (n) {
                    var p = pos[n.star.hip];
                    if (!p) { pen = false; return; }
                    if (pen) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y);
                    pen = true;
                });
                ctx.stroke();
            });

            // the stars, far to near so the near ones sit on top
            var order = scene.sorted.slice().reverse();
            order.forEach(function (n) {
                var p = pos[n.star.hip];
                if (!p) return;
                var glow = tinted(n.glow, tint), core = tinted(n.core, tint);
                var halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.4);
                halo.addColorStop(0, rgba(glow, 0.55 * p.fog));
                halo.addColorStop(0.4, rgba(glow, 0.18 * p.fog));
                halo.addColorStop(1, rgba(glow, 0));
                ctx.fillStyle = halo;
                circle(p.x, p.y, p.r * 3.4);
                ctx.fillStyle = rgba(core, 0.08 + 0.92 * p.fog);
                circle(p.x, p.y, p.r);
            });

            if (labelsOn) drawLabels(room, pos, tint, narrow);

            ctx.restore();
        }

        /* How much two boxes overlap, with a little margin so that "just
           touching" counts too. */
        function overlap(a, b) {
            var m = 4;
            var ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) + m;
            var oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) + m;
            return ox > 0 && oy > 0 ? ox * oy : 0;
        }

        /* Name and distance beside each labelled star. Orion's belt puts
           three named stars within a few pixels of one another, and a
           stereo half-frame is narrow, so each label tries six spots around
           its star — above and below, right, left and centred — and takes
           the first that lands on nothing, or failing that the one that
           covers least. The brightest stars choose first. A label that had
           to move away gets a leader line back to its star. */
        function drawLabels(vp, pos, tint, narrow) {
            // Grows with the frame, so a wall-sized immersive view is
            // readable from the back of the room.
            var fontPx = narrow ? 12 : clamp(Math.round(vp.w / 64), 12, 18);
            ctx.font = '500 ' + fontPx + 'px "Space Grotesk", "Outfit", system-ui, sans-serif';
            ctx.textBaseline = 'top';

            // Boxes a label must not cover: the labels placed so far, and
            // the stars themselves.
            var placed = [];
            var discs = [];
            scene.stars.forEach(function (n) {
                var p = pos[n.star.hip];
                if (p) discs.push({ x: p.x - p.r, y: p.y - p.r, w: p.r * 2, h: p.r * 2, p: p });
            });

            var items = [];
            var list = chooseLabels(scene, narrow).slice().sort(function (a, b) {
                return a.star.mag - b.star.mag;
            });
            list.forEach(function (n) {
                var p = pos[n.star.hip];
                if (!p) return;
                var name = SC.starLabel(n.star), dist = formatLy(n.ly);
                var wName = ctx.measureText(name).width;
                var wDist = ctx.measureText(dist).width;
                var gap = fontPx * 0.5, w = wName + gap + wDist, h = fontPx * 1.15;
                var off = p.r + 5;

                var cands = [
                    [p.x + off, p.y - off - h],
                    [p.x - off - w, p.y - off - h],
                    [p.x + off, p.y + off],
                    [p.x - off - w, p.y + off],
                    [p.x - w / 2, p.y - off - h - 2],
                    [p.x - w / 2, p.y + off + 2]
                ];
                var best = null, bestScore = Infinity;
                for (var c = 0; c < cands.length && bestScore > 0; c++) {
                    var box = {
                        x: clamp(cands[c][0], vp.x + 4, vp.x + vp.w - w - 4),
                        y: clamp(cands[c][1], vp.y + 4, vp.y + vp.h - h - 4),
                        w: w, h: h
                    };
                    var score = 0, k;
                    for (k = 0; k < placed.length; k++) score += overlap(box, placed[k]);
                    for (k = 0; k < discs.length; k++) {
                        if (discs[k].p !== p) score += overlap(box, discs[k]) * 0.5;
                    }
                    if (score < bestScore) { bestScore = score; best = box; }
                }
                placed.push(best);
                items.push({
                    p: p, box: best, name: name, dist: dist, wName: wName, gap: gap,
                    // Sitting where it was first asked to is "attached";
                    // anything clamped or pushed elsewhere gets a leader.
                    detached: Math.hypot(best.x + w / 2 - p.x, best.y + h / 2 - p.y) > w / 2 + off + h
                });
            });

            ctx.lineJoin = 'round';
            items.forEach(function (it) {
                var b = it.box;
                if (it.detached) {
                    ctx.strokeStyle = rgba(tinted([125, 151, 184], tint), 0.5);
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(it.p.x, it.p.y);
                    // To the nearer end of the label, at mid-height.
                    ctx.lineTo(it.p.x < b.x + b.w / 2 ? b.x - 2 : b.x + b.w + 2, b.y + b.h / 2);
                    ctx.stroke();
                }
                ctx.lineWidth = 3.5;
                ctx.strokeStyle = SKY_DARK;
                ctx.strokeText(it.name, b.x, b.y);
                ctx.fillStyle = rgba(tinted(INK, tint), 0.95);
                ctx.fillText(it.name, b.x, b.y);
                var xd = b.x + it.wName + it.gap;
                ctx.strokeText(it.dist, xd, b.y);
                ctx.fillStyle = rgba(tinted(GOLD, tint), 0.95);
                ctx.fillText(it.dist, xd, b.y);
            });
        }

        // ---- the frame ----

        function render(now) {
            var t = (now - t0) / 1000;
            var full = { x: 0, y: 0, w: width, h: height };
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.globalCompositeOperation = 'source-over';

            if (mode === 'sbs') {
                var s = sep() * 0.8, half = Math.floor(width / 2);
                // Cross-eyed: the right eye's view on the left.
                drawView({ x: 0, y: 0, w: half, h: height }, eyeAt(+s, 0), null, true);
                drawView({ x: half, y: 0, w: width - half, h: height }, eyeAt(-s, 0), null, true);
                ctx.fillStyle = 'rgba(159,179,200,0.28)';
                ctx.fillRect(half - 0.5, 0, 1, height);

            } else if (mode === 'anaglyph') {
                var e = sep() / 2;
                drawView(full, eyeAt(-e, 0), 'left', true);
                ctx.globalCompositeOperation = 'lighter';
                drawView(full, eyeAt(+e, 0), 'right', false);
                ctx.globalCompositeOperation = 'source-over';

            } else {
                var offR = 0, offU = 0;
                if (mode === 'orbit') {
                    var a = amp() * (reduced ? 0.25 : 0.55), w = 0.45;
                    offR = Math.cos(t * w) * a;
                    offU = Math.sin(t * w) * a * 0.6;
                } else if (mode === 'parallax') {
                    var useG = gyro.on && coarse;
                    var tx = useG ? gyro.x : mouse.x, ty = useG ? gyro.y : mouse.y;
                    smooth.x += (tx - smooth.x) * 0.08;
                    smooth.y += (ty - smooth.y) * 0.08;
                    offR = smooth.x * amp();
                    offU = -smooth.y * amp() * 0.7;
                } else if (mode === 'wiggle') {
                    var f = reduced ? 1.1 : 2.4;
                    offR = Math.sin(t * Math.PI * 2 * f) * sep() * 2.2;
                }
                drawView(full, eyeAt(offR, offU), null, true);
            }
        }

        function loop(now) {
            frame = null;
            if (!running) return;
            if (t0 === null) t0 = now;
            if (scene && width > 0) render(now);
            frame = window.requestAnimationFrame(loop);
        }

        function start() {
            running = true;
            if (frame === null) frame = window.requestAnimationFrame(loop);
        }

        function stop() { running = false; }

        // ---- sizing ----

        function resize() {
            var rect = canvas.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = Math.max(1, Math.round(rect.width));
            height = Math.max(1, Math.round(rect.height));
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
        }

        if (window.ResizeObserver) {
            new window.ResizeObserver(resize).observe(canvas);
        } else {
            window.addEventListener('resize', resize);
        }
        resize();

        // Draw only while on screen: the page below the stage is text, and
        // a phone reading it should not be spending its battery up here.
        if (window.IntersectionObserver) {
            new window.IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) start(); else stop();
            }).observe(canvas);
        }

        // ---- input ----

        surface.addEventListener('pointermove', function (e) {
            var rect = surface.getBoundingClientRect();
            mouse.x = clamp((e.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
            mouse.y = clamp((e.clientY - rect.top) / rect.height * 2 - 1, -1, 1);
        });
        function recentre() { mouse.x = 0; mouse.y = 0; }
        surface.addEventListener('pointerleave', recentre);
        // A finger lifting off lets the view settle back; a mouse parked
        // over the stage holds it.
        surface.addEventListener('pointerup', function (e) {
            if (e.pointerType === 'touch') recentre();
        });
        surface.addEventListener('pointercancel', recentre);

        function onOrientation(e) {
            if (e.beta == null || e.gamma == null) return;
            if (gyro.b0 == null) { gyro.b0 = e.beta; gyro.g0 = e.gamma; }
            gyro.x = clamp((e.gamma - gyro.g0) / 28, -1, 1);
            gyro.y = clamp((e.beta - gyro.b0) / 28, -1, 1);
            if (!gyro.on) {
                gyro.on = true;
                if (opts.onTilt) opts.onTilt();
            }
        }
        // Where no permission is needed the tilt just works; iOS needs
        // enableTilt() from a tap, which the page offers as a button.
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', onOrientation);
        }

        /* Ask for the phone's orientation, from inside a user gesture.
           Resolves true if tilt is on. */
        function enableTilt() {
            var DOE = window.DeviceOrientationEvent;
            if (!DOE) return Promise.resolve(false);
            var ask = typeof DOE.requestPermission === 'function'
                ? DOE.requestPermission() : Promise.resolve('granted');
            return ask.then(function (state) {
                if (state !== 'granted') return false;
                // Re-zero on the pose the phone is held in now.
                gyro.b0 = null;
                window.addEventListener('deviceorientation', onOrientation);
                return true;
            }, function () { return false; });
        }

        // ---- the public surface ----

        function show(con) {
            scene = build(con);
            smooth.x = 0; smooth.y = 0;
            if (visible) start();
        }

        function info() {
            if (!scene) return null;
            return {
                con: scene.con,
                nearest: scene.nearest, farthest: scene.farthest,
                near: scene.near.star, far: scene.far.star,
                stars: scene.sorted.map(function (n) { return { star: n.star, ly: n.ly }; }),
                dropped: scene.dropped
            };
        }

        return {
            show: show,
            info: info,
            setMode: function (id) {
                if (MODES.some(function (m) { return m.id === id; })) mode = id;
                return mode;
            },
            mode: function () { return mode; },
            setDepth: function (k) { depthK = clamp(+k || 0, 0, 1); },
            setLabels: function (on) { labelsOn = !!on; },
            labels: function () { return labelsOn; },
            enableTilt: enableTilt,
            tiltOn: function () { return gyro.on; },
            recentreTilt: function () { gyro.b0 = null; },
            /* Reserve bands at the top and foot of the canvas, in CSS
               pixels, that the figure must keep clear of. */
            setInsets: function (ins) {
                insets.top = Math.max(0, +ins.top || 0);
                insets.bottom = Math.max(0, +ins.bottom || 0);
            },
            resize: resize,
            coarse: coarse
        };
    }

    window.DepthLab = {
        MODES: MODES,
        create: create,
        placeable: placeable,
        formatLy: formatLy
    };
})();
