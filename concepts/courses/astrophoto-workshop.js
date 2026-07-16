// ============================================================
// Astrophotography Workshop — beginner, tripod-only.
//
// Scoped hard at the entry rung, and the concept graph is what
// enforced it. The first draft of this file had a star-tracker night
// teaching `tracking-imaging`; `course-validate` pointed out that it
// requires `polar-alignment` → `telescope-mounts` → `telescope-designs`,
// and `sidereal-day` → `equatorial-coords`. A workshop advertising
// "no telescope required" cannot stand on four telescope concepts.
//
// So the tracker was cut rather than the prereqs hacked. What is left
// is genuinely doable with a phone or an entry DSLR on a tripod, and
// the graph now agrees that it is. Tracked and deep-sky imaging are a
// real follow-on course — `course-gaps` on this one names exactly what
// that course would have to teach first.
//
// Both imaging nights need a genuinely dark sky, so the whole weekend
// must sit near new moon. That is the constraint people discover by
// booking a venue first and finding the moon full on the night;
// `cli.js course astrophoto-beginner` prints the window instead.
// ============================================================

window.COURSES.push(

    {
        id: "astrophoto-beginner",
        name: "Astrophotography: First Light",
        kind: "workshop",
        audience: "photo",
        blurb: "Three days, one weekend, no telescope. Arrive with a phone or a DSLR and a tripod; leave with a stacked Milky Way nightscape you processed yourself.",

        // A camera workshop, not an astronomy course. Participants are
        // assumed to have found the Milky Way at least once and to know
        // that a lens focuses light — if not, they belong in the club
        // programme first. Prereq closure pulls the rest of the naked-eye
        // sky in behind these.
        assumes: [
            "lenses-mirrors",
            "lunar-observing",
            "milky-way-band",
            "light-pollution",
            "pole-star",
            "star-charts",
            "eye-at-night"
        ],

        sessions: [
            {
                title: "Day 1 — The camera, before dark",
                mode: "theory",
                day: 1,
                duration: 150,
                concepts: [
                    "exposure-triangle",
                    "raw-format",
                    "histogram-reading"
                ],
                equipment: ["projector", "dslr", "phone", "tripod"],
                notes: "In daylight, in a room, on their own cameras — everyone finds manual mode, RAW and the histogram before the sun goes down. A participant hunting for manual mode at 9pm in the dark has lost the night, and this session exists to prevent exactly that. Make them shoot one deliberately blown frame and one crushed one, and read both off the histogram."
            },
            {
                title: "Day 1 — Why night shots fail",
                mode: "theory",
                day: 1,
                duration: 90,
                concepts: [
                    "camera-sensors",
                    "snr-noise",
                    "dark-adaptation",
                    "night-focusing"
                ],
                equipment: ["projector", "laptop"],
                notes: "Noise is not a defect of cheap cameras, it is photon statistics — which is why the fix is more total exposure, not a better body. That framing makes stacking on Day 2 an obvious consequence rather than a software trick. Practise focusing on a distant streetlight now; live-view on a star at midnight is a different sport."
            },
            {
                title: "Day 1 — First night: tripod only",
                mode: "imaging",
                day: 1,
                duration: 180,
                concepts: [
                    "phone-astrophotography",
                    "nightscapes",
                    "star-trail-imaging"
                ],
                equipment: ["dslr", "phone", "tripod", "red-torch", "power-bank"],
                sky: { moon: "dark", targets: ["milky-way", "star-trails", "constellations"] },
                notes: "Teach the 500 rule, then make them break it and pixel-peep the trailing — the number means nothing until they have watched it fail. Modern phone night mode genuinely works; do not be snobbish about it, it is the camera most of them will keep using. Everyone shoots trails as a stack of subs rather than one long exposure, because Day 2 needs those frames."
            },
            {
                title: "Day 2 — Stacking: the whole trick",
                mode: "lab",
                day: 2,
                duration: 180,
                concepts: [
                    "stacking",
                    "calibration-frames"
                ],
                equipment: ["laptop", "power-bank"],
                notes: "Their own frames from last night, never a demo set — the payoff is watching their own noisy sub become a clean image. Darks and flats are the two that matter; bias can wait a lifetime. Someone will have forgotten flats: let the gradient show, then shoot flats against a laptop screen and redo it. That failure teaches flats better than a slide."
            },
            {
                title: "Day 2 — Second night: the sky moves",
                mode: "imaging",
                day: 2,
                duration: 180,
                concepts: [
                    "sky-timelapse",
                    "observing-log"
                ],
                equipment: ["dslr", "phone", "tripod", "red-torch", "power-bank", "star-chart"],
                sky: { moon: "dark", targets: ["milky-way", "star-trails", "constellations"] },
                notes: "Night one was about one frame; tonight is about a sequence. An intervalometer run doubles as timelapse frames and as stacking subs, so nobody chooses. This is also the night to log properly — settings, target, conditions — because the next clear sky should start from knowledge, not from scratch. If a tracker is on site, demonstrate it; do not teach it, it is the next course."
            },
            {
                title: "Day 3 — Processing, and stopping in time",
                mode: "lab",
                day: 3,
                duration: 180,
                concepts: [
                    "post-processing"
                ],
                equipment: ["laptop", "projector"],
                notes: "Stretching is the one idea: the data is linear, the eye is not. Gradient removal, then colour balance. The hardest thing to teach is when to stop — put an over-processed image beside a restrained one without saying which is which, and let the room call it."
            },
            {
                title: "Day 3 — Show and tell",
                mode: "review",
                day: 3,
                duration: 60,
                concepts: [
                    "citizen-science"
                ],
                equipment: ["projector"],
                notes: "Everyone puts one image up with its settings attached. Close on citizen science so the weekend has an afterwards: variable-star estimates and meteor counts need exactly the kit they now own and know how to use."
            }
        ],

        status: "draft",
        sources: []
    }

);
