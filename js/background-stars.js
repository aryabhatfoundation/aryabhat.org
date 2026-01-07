(function () {
    // Create Canvas Element
    var canvas = document.createElement('canvas');
    canvas.id = 'starfield-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    // Use the deep dark blue from the sky map or pure black
    canvas.style.background = 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var w, h;
    var stars = [];

    // Configuration
    var config = {
        starCount: 100,
        maxStars: 150, // Cap for high-res screens to save battery
        starColor: 'rgba(255, 255, 255, 0.7)',
        lineColor: 'rgba(255, 255, 255, 0.15)',
        lineDistance: 120,
        speed: 0.5
    };

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        // Adjust star count, but cap it
        var calculated = Math.floor((w * h) / 9000);
        config.starCount = Math.min(calculated, config.maxStars);
        initStars();
    }

    function initStars() {
        stars = [];
        for (var i = 0; i < config.starCount; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * config.speed,
                vy: (Math.random() - 0.5) * config.speed,
                size: Math.random() * 2
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);

        // 1. Update Star Positions
        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            s.x += s.vx;
            s.y += s.vy;

            // Bounce/Wrap
            if (s.x < 0 || s.x > w) s.vx = -s.vx;
            if (s.y < 0 || s.y > h) s.vy = -s.vy;
        }

        // 2. Draw Stars (Batch 1)
        ctx.fillStyle = config.starColor;
        ctx.beginPath();
        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            ctx.moveTo(s.x, s.y);
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        }
        ctx.fill();

        // 3. Draw Lines (Batch 2 - huge performance win)
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = config.lineColor;
        ctx.beginPath();

        // Pre-calculate squared distance to avoid Math.sqrt inside loop
        var distSq = config.lineDistance * config.lineDistance;

        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            for (var j = i + 1; j < stars.length; j++) {
                var s2 = stars[j];
                var dx = s.x - s2.x;
                var dy = s.y - s2.y;

                // Optimized check (no Sqrt)
                if (dx * dx + dy * dy < distSq) {
                    ctx.moveTo(s.x, s.y);
                    ctx.lineTo(s2.x, s2.y);
                }
            }
        }
        ctx.stroke();

        requestAnimationFrame(animate);
    }

    // Init
    window.addEventListener('resize', resize);
    resize();
    animate();
})();
