/*
 * cosmos-bg.js — page-scoped starfield for newindex.html
 *
 * Design: a calm, slightly-twinkling night sky with a handful of gold
 * accent stars (matching the page's cosmic-gold theme), slow cosmic
 * dust, and an occasional shooting star that streaks across on a
 * 8–20s cadence. No O(n^2) constellation lines (the legacy
 * background-stars.js does per-star-pair checks every frame, which
 * hurts low-end mobiles).
 *
 * Perf budget:
 *   - ~30fps (FRAME_STEP throttled)
 *   - DPR capped at 1.5
 *   - Batched Path2D fills (one per visual layer)
 *   - Particle counts scale with viewport and are capped low on phones
 *   - Respects prefers-reduced-motion (shows static gradient only)
 */
(function () {
    'use strict';

    var reducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Shared deep-space gradient (applied as canvas/div background,
    // so clearRect reveals it for free without per-frame repaint).
    var SKY_BG = 'radial-gradient(ellipse at 50% 120%, #1a2a40 0%, #0a1018 55%, #04060a 100%)';

    if (reducedMotion) {
        // Just paint the static sky — no animation loop at all.
        var still = document.createElement('div');
        still.id = 'cosmos-bg-still';
        still.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;background:' + SKY_BG + ';';
        document.body.appendChild(still);
        return;
    }

    var canvas = document.createElement('canvas');
    canvas.id = 'cosmos-canvas';
    canvas.style.cssText = [
        'position:fixed', 'top:0', 'left:0',
        'width:100%', 'height:100%',
        'z-index:-1', 'pointer-events:none',
        'background:' + SKY_BG
    ].join(';');
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    var w = 0, h = 0;

    var stars = [];      // twinkling background stars
    var dust = [];       // slow-drifting cosmic dust
    var shooter = null;  // one shooting star at a time
    var nextShotAt = 0;

    var lastFrame = 0;
    var FRAME_STEP = 1000 / 30;   // throttle to ~30fps

    function resize() {
        var cssW = window.innerWidth;
        var cssH = window.innerHeight;
        canvas.width = Math.floor(cssW * DPR);
        canvas.height = Math.floor(cssH * DPR);
        canvas.style.width = cssW + 'px';
        canvas.style.height = cssH + 'px';
        // setTransform resets any prior scale so repeated resizes don't compound.
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        w = cssW;
        h = cssH;
        seed();
    }

    function seed() {
        // Counts scale with viewport but are capped conservatively.
        // On a 375x667 phone: ~31 stars, ~8 dust. On 1440x900 desktop: 70/18.
        var starCount = Math.min(Math.floor((w * h) / 8000), 70);
        stars = new Array(starCount);
        for (var i = 0; i < starCount; i++) {
            var isGold = Math.random() < 0.08;   // ~8% are gold accent stars
            stars[i] = {
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * (isGold ? 1.4 : 1.0) + 0.3,
                phase: Math.random() * Math.PI * 2,
                speed: 0.6 + Math.random() * 0.8,
                gold: isGold
            };
        }

        var dustCount = Math.min(Math.floor((w * h) / 30000), 18);
        dust = new Array(dustCount);
        for (var j = 0; j < dustCount; j++) {
            dust[j] = {
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.12,
                vy: (Math.random() - 0.5) * 0.12,
                r: Math.random() * 0.6 + 0.3
            };
        }
    }

    function scheduleNextShot(t) {
        nextShotAt = t + 8000 + Math.random() * 12000;   // 8–20 s
    }

    function spawnShooter() {
        // 70% of the time the meteor comes from the right (to pair
        // with the boy-logo who's looking right); 30% from the left.
        var fromRight = Math.random() < 0.7;
        var startX = fromRight
            ? w * (0.55 + Math.random() * 0.45)
            : w * (0.00 + Math.random() * 0.3);
        var angle = fromRight
            ? Math.PI * 0.80 + Math.random() * 0.08   // down-left
            : Math.PI * 0.20 + Math.random() * 0.08;  // down-right
        var speed = 5 + Math.random() * 3.5;
        shooter = {
            x: startX,
            y: -30,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0,
            maxLife: 60 + Math.random() * 35   // ~2–3 s at 30 fps
        };
    }

    function drawShooter(alpha) {
        var s = shooter;
        var mag = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        var tailLen = 80;
        var tailX = s.x - (s.vx / mag) * tailLen;
        var tailY = s.y - (s.vy / mag) * tailLen;

        var grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0.00, 'rgba(255,204,51,0)');
        grad.addColorStop(0.55, 'rgba(255,229,138,' + (0.55 * alpha) + ')');
        grad.addColorStop(1.00, 'rgba(255,255,255,' + alpha + ')');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // bright head
        ctx.fillStyle = 'rgba(255,255,255,' + alpha + ')';
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
    }

    function frame(ts) {
        requestAnimationFrame(frame);

        // 30fps throttle: skip work on ~half the animation callbacks.
        if (ts - lastFrame < FRAME_STEP) return;
        lastFrame = ts;

        ctx.clearRect(0, 0, w, h);

        // ---- 1. Cosmic dust (single batched fill) ----
        ctx.fillStyle = 'rgba(255,255,255,0.22)';
        ctx.beginPath();
        for (var i = 0; i < dust.length; i++) {
            var d = dust[i];
            d.x += d.vx;
            d.y += d.vy;
            // wrap around edges
            if (d.x < -2) d.x = w + 2;
            else if (d.x > w + 2) d.x = -2;
            if (d.y < -2) d.y = h + 2;
            else if (d.y > h + 2) d.y = -2;
            ctx.moveTo(d.x + d.r, d.y);
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        }
        ctx.fill();

        // ---- 2. White stars — twinkle via size modulation, batched ----
        var t = ts * 0.001;
        ctx.fillStyle = 'rgba(255,255,255,0.78)';
        ctx.beginPath();
        for (var j = 0; j < stars.length; j++) {
            var s = stars[j];
            if (s.gold) continue;
            var tw = 0.65 + 0.35 * Math.sin(t * s.speed + s.phase);
            var rr = s.r * tw;
            ctx.moveTo(s.x + rr, s.y);
            ctx.arc(s.x, s.y, rr, 0, Math.PI * 2);
        }
        ctx.fill();

        // ---- 3. Gold accent stars (few, drawn individually for glow) ----
        for (var k = 0; k < stars.length; k++) {
            var g = stars[k];
            if (!g.gold) continue;
            var gtw = 0.55 + 0.45 * Math.sin(t * g.speed + g.phase);
            ctx.fillStyle = 'rgba(255,204,51,' + (0.9 * gtw) + ')';
            ctx.beginPath();
            ctx.arc(g.x, g.y, g.r * gtw + 0.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // ---- 4. Shooting star ----
        if (!shooter && ts > nextShotAt) {
            spawnShooter();
            scheduleNextShot(ts);
        }
        if (shooter) {
            shooter.x += shooter.vx;
            shooter.y += shooter.vy;
            shooter.life++;

            var dead = shooter.life > shooter.maxLife ||
                shooter.x < -100 || shooter.x > w + 100 ||
                shooter.y > h + 100;

            if (dead) {
                shooter = null;
            } else {
                var p = shooter.life / shooter.maxLife;
                // fade-in (0→0.15), steady, fade-out (0.85→1)
                var a = p < 0.15 ? p / 0.15
                      : p > 0.85 ? (1 - p) / 0.15
                      : 1;
                if (a > 0) drawShooter(a);
            }
        }
    }

    // Init
    window.addEventListener('resize', resize, { passive: true });
    resize();
    scheduleNextShot(performance.now() + 3000);   // first shot ~3 s in
    requestAnimationFrame(frame);
})();
