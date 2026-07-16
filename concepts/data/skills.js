// ============================================================
// SCIENCE & MATHS SKILLS concepts.
//
// Requires data/_schema.js to have run first (it creates
// window.CONCEPTS and the taxonomy tables).
//
// Domains: s-inquiry (Scientific Method & Inquiry), s-model
// (Models, Scale & Estimation).
//
// SEED FILE. These are the cross-cutting habits every other subject
// leans on — they are almost never a chapter of their own, so they
// are taught implicitly across a wide grade span and the `grades`
// arrays here are deliberately broad. Every record is status:"review".
//
// NOTE ON OVERLAP:
//   · Astronomy already owns model-thinking, big-numbers, maps-scale
//     and speed-distance-time. `model-thinking` — what a model is and
//     what it deliberately leaves out — is the root of the s-model
//     strand and is used as a prereq, never re-authored here.
//   · Maths owns the machinery: mean-median-mode, standard-deviation,
//     bar-line-graphs, data-collection, rounding-estimation,
//     scientific-notation, ratio-proportion, units-measurement. This
//     file owns the *judgement* laid on top of that machinery —
//     when a mean is meaningful, when a graph lies, when a
//     correlation is not a cause.
// ============================================================

window.CONCEPTS.push(

    // ==================== SCIENTIFIC METHOD & INQUIRY ====================
    {
        id: "observation-inference", name: "Observation vs Inference", domain: "s-inquiry", level: 2,
        desc: "'The pavement is wet' is an observation; 'it rained last night' is an inference — a story you added. Science advances by keeping the two on separate lines of the notebook, because inferences can be wrong while the observation stays true, and a lab report that blurs them cannot be checked by anyone.",
        grades: [3, 4, 5, 6, 7, 8, 9],
        status: "review",
        tracks: ["school-primary", "school-middle", "school-high", "club"],
        prereqs: [],
        related: ["hypothesis", "conclusions-evidence", "model-thinking"],
        aliases: ["observation and inference", "fact vs interpretation", "what you see vs what you think"],
        keywords: ["observation", "inference", "qualitative", "quantitative", "evidence", "interpretation", "assumption", "bias", "black box"],
        misconceptions: ["Thinking an inference is just a guess, when a good inference is reasoned from evidence and can be tested", "Believing observation is passive and neutral — what you notice already depends on what you expected to see"],
        tools: [{ k: "activity", label: "Mystery box: shake a sealed box and fill two columns — what you observed, what you inferred. Open it last." }, { k: "activity", label: "Take one photo of a street scene and have everyone write three observations and three inferences; compare how differently the same picture reads" }]
    },
    {
        id: "hypothesis", name: "Hypothesis & the Testable Question", domain: "s-inquiry", level: 2,
        desc: "'Why do plants grow?' goes nowhere; 'Do bean plants grow taller in red light than blue?' can be answered by Friday. A hypothesis is a proposed answer stated so sharply that a result could prove it wrong — and if no possible result would embarrass it, it is not science yet.",
        grades: [5, 6, 7, 8, 9, 10],
        status: "review",
        tracks: ["school-primary", "school-middle", "school-high", "olympiad"],
        prereqs: ["observation-inference"],
        related: ["variables-fair-test", "conclusions-evidence", "peer-review"],
        aliases: ["testable question", "forming a hypothesis", "research question", "prediction"],
        keywords: ["hypothesis", "prediction", "testable", "falsifiable", "falsifiability", "null hypothesis", "if-then", "operational definition", "scientific method"],
        misconceptions: ["Thinking a scientific theory is 'just a theory' — a hunch — when a theory is a well-tested explanation and a hypothesis is the thing being tested", "Treating a hypothesis as something you must prove right, so that a disproved hypothesis feels like a failed experiment"],
        tools: [{ k: "activity", label: "Take five vague wonderings from the class and rewrite each as a question you could answer with what is in the room this week" }, { k: "activity", label: "For each hypothesis on the board, state the result that would kill it. Any that survive everything get struck off." }]
    },
    {
        id: "variables-fair-test", name: "Variables & the Fair Test", domain: "s-inquiry", level: 3,
        desc: "Change one thing, measure one thing, hold everything else still — that is the whole trick. The one you change is independent, the one you measure is dependent, and the crowd you pin down are the controlled variables; let two of them move at once and no result can tell you which one did it.",
        grades: [6, 7, 8, 9, 10, 11],
        status: "review",
        tracks: ["school-middle", "school-high", "olympiad"],
        prereqs: ["hypothesis"],
        related: ["repeat-reliability", "conclusions-evidence", "correlation-causation", "recording-data"],
        aliases: ["independent and dependent variables", "controlled variables", "fair testing", "control group", "controlled experiment"],
        keywords: ["independent variable", "dependent variable", "controlled variable", "constant", "control group", "experimental group", "fair test", "placebo", "blind trial", "double-blind", "confounding variable"],
        misconceptions: ["Confusing a control variable with a control group — one is a condition you hold fixed, the other is a whole set-up you leave untreated for comparison", "Thinking an experiment without a control is still fine as long as you measured carefully — with nothing to compare against, the number means nothing"],
        tools: [{ k: "activity", label: "Paper helicopters: pick one thing to vary — wing length, paperclips, drop height — and list every variable you must nail down to keep it fair" }, { k: "activity", label: "Read any advertisement's 'clinically proven' claim and work out what the control group must have been, if there was one" }]
    },
    {
        id: "recording-data", name: "Recording Data in Tables", domain: "s-inquiry", level: 2,
        desc: "Draw the table before the experiment, not after: columns for the independent variable, each repeat, and the mean, with units in the heading and never beside the numbers. A table designed in advance forces you to admit how many readings you intend to take — and stops you from 'remembering' a value at the end.",
        grades: [5, 6, 7, 8, 9, 10],
        status: "review",
        tracks: ["school-primary", "school-middle", "school-high"],
        prereqs: ["data-collection"],
        related: ["bar-line-graphs", "variables-fair-test", "repeat-reliability", "graphs-as-models"],
        aliases: ["data tables", "results table", "tabulating results", "lab notebook"],
        keywords: ["table", "column heading", "units", "raw data", "processed data", "trial", "repeat", "tally", "anomalous result", "outlier", "lab record"],
        misconceptions: ["Treating the table as a fair copy made after the experiment, rather than the live record you write in as it happens"],
        tools: [{ k: "activity", label: "Design the blank table for tomorrow's experiment today — if you cannot rule the columns, you do not yet know what you are measuring" }]
    },
    {
        id: "repeat-reliability", name: "Repeat Readings & Reliability", domain: "s-inquiry", level: 3,
        desc: "One reading is an anecdote. Take five, and the scatter itself tells you how much to trust the mean — tight repeats mean a reliable method, wild ones mean something uncontrolled is still moving. Averaging beats down random error, but it will never touch a bias that pushes every reading the same way.",
        grades: [6, 7, 8, 9, 10, 11],
        status: "review",
        tracks: ["school-middle", "school-high", "olympiad"],
        prereqs: ["variables-fair-test", "mean-median-mode"],
        related: ["measurement-uncertainty", "range-spread", "recording-data", "peer-review"],
        aliases: ["reliability", "repeatability", "repeat trials", "reproducible readings"],
        keywords: ["repeat", "trial", "mean", "spread", "range", "random error", "systematic error", "anomaly", "outlier", "reliable", "precision", "sample size"],
        misconceptions: ["Believing that averaging enough readings fixes any error, when a systematic error — a mis-zeroed scale — survives every repeat untouched", "Throwing out a reading simply because it spoils a nice pattern, instead of investigating why it is odd"],
        tools: [{ k: "activity", label: "Time ten swings of a pendulum, ten times over — then time one swing, ten times over. Compare the scatter and you have discovered why nobody times one swing." }]
    },
    {
        id: "measurement-uncertainty", name: "Measurement Error & Uncertainty", domain: "s-inquiry", level: 4,
        desc: "No measurement is a number — it is a range. A metre rule marked in millimetres gives 24.3 cm plus or minus about half a millimetre, and quoting anything tighter is a claim you cannot back. Random error scatters both ways and averages out; systematic error leans one way and does not, which is why a stuck zero is more dangerous than a shaky hand.",
        grades: [9, 10, 11, 12],
        status: "review",
        tracks: ["school-high", "olympiad"],
        prereqs: ["units-measurement", "repeat-reliability"],
        related: ["significant-figures", "standard-deviation", "fermi-estimation", "air-pressure"],
        aliases: ["experimental error", "uncertainty in measurement", "error analysis", "accuracy and precision", "least count"],
        keywords: ["absolute error", "relative error", "percentage error", "least count", "zero error", "parallax", "random error", "systematic error", "accuracy", "precision", "vernier", "error bar", "tolerance", "plus-minus"],
        misconceptions: ["Using accuracy and precision as synonyms — a jammed clock is beautifully precise and always wrong", "Thinking error means a mistake you made, when uncertainty is an unavoidable property of every instrument ever built"],
        tools: [{ k: "activity", label: "Have thirty people measure the same desk with the same rule and plot the results — the spread is the uncertainty, and nobody made a mistake" }, { k: "activity", label: "Weigh an object on a balance you deliberately mis-zero by 5 g, then repeat twenty times and average. Watch averaging fail to save you." }]
    },
    {
        id: "significant-figures", name: "Significant Figures", domain: "s-inquiry", level: 4,
        desc: "Your calculator will happily print 3.66666667 from two readings taken with a school rule — and seven of those digits are fiction. Significant figures are honesty made arithmetic: the answer carries no more precision than the sloppiest measurement that went into it.",
        grades: [9, 10, 11, 12],
        status: "review",
        tracks: ["school-high", "olympiad"],
        prereqs: ["measurement-uncertainty", "rounding-estimation"],
        related: ["scientific-notation", "orders-magnitude", "fermi-estimation"],
        aliases: ["sig figs", "significant digits", "precision in calculations"],
        keywords: ["significant figures", "leading zeros", "trailing zeros", "rounding", "decimal places", "scientific notation", "order of operations", "propagation", "spurious precision"],
        misconceptions: ["Copying every digit the calculator shows because more digits look more scientific", "Thinking 2.0 and 2.00 say the same thing — the second claims a measurement ten times as fine"],
        tools: [{ k: "activity", label: "Measure a book's sides with a school rule, compute the volume, then decide honestly how many of the calculator's digits you are entitled to keep" }]
    },
    {
        id: "conclusions-evidence", name: "Drawing Conclusions from Evidence", domain: "s-inquiry", level: 3,
        desc: "A conclusion answers the original question, in the light of the data, and admits how far the data can carry it — 'the plants under red light grew 20 per cent taller over three weeks', not 'red light is best for plants'. The discipline is to say what you found, then separately what you think it means, then honestly where it could still be wrong.",
        grades: [6, 7, 8, 9, 10, 11],
        status: "review",
        tracks: ["school-middle", "school-high", "olympiad"],
        prereqs: ["variables-fair-test", "recording-data"],
        related: ["correlation-causation", "peer-review", "hypothesis", "graphs-as-models"],
        aliases: ["evidence-based conclusion", "interpreting results", "evaluating an experiment", "conclusion and evaluation"],
        keywords: ["conclusion", "evidence", "trend", "pattern", "supports", "refutes", "limitations", "sources of error", "extrapolation", "generalisation", "scope", "cherry-picking"],
        misconceptions: ["Concluding what you hoped for and quietly explaining away the data that disagreed", "Thinking a result that contradicts the hypothesis means the experiment failed, when a clean disproof is a real finding"],
        tools: [{ k: "activity", label: "Swap results tables with another group and write each other's conclusions — mismatches are exactly where the reasoning was doing the work, not the data" }]
    },
    {
        id: "correlation-causation", name: "Correlation vs Causation", domain: "s-inquiry", level: 4,
        desc: "Ice cream sales and drowning deaths rise together, and neither causes the other — summer causes both. Two things moving in step may share a hidden cause, may run the other way round, or may simply be a coincidence dredged out of enough data; only an experiment that intervenes, or very careful control, can promote a correlation to a cause.",
        grades: [9, 10, 11, 12],
        status: "review",
        tracks: ["school-high", "olympiad", "club"],
        prereqs: ["conclusions-evidence"],
        related: ["variables-fair-test", "probability-basics", "graphs-as-models", "peer-review", "climate-change"],
        aliases: ["correlation does not imply causation", "confounding", "spurious correlation", "association vs cause"],
        keywords: ["correlation", "causation", "confounding variable", "lurking variable", "reverse causation", "coincidence", "scatter plot", "randomised controlled trial", "intervention", "data dredging", "cherry-picking"],
        misconceptions: ["Reading a tight-looking graph as proof that one thing causes the other", "Swinging the other way and dismissing every correlation as meaningless, when correlations are how most real causes are first spotted"],
        tools: [{ k: "activity", label: "Hunt down three absurd correlations that hold to r above 0.9, and for each one name the confounder or admit it is a coincidence" }, { k: "activity", label: "Take one health headline from today's paper and work out whether the study could have shown cause at all, or only association" }]
    },
    {
        id: "peer-review", name: "Peer Review & Reproducibility", domain: "s-inquiry", level: 3,
        desc: "A result is not knowledge because a clever person announced it — it becomes knowledge when strangers who would rather like to prove you wrong write down your method, run it, and get the same thing. Publication with enough method to copy, and reviewers paid in nothing but reputation, is science's slow immune system; it works, but a published paper is a claim under scrutiny, not a verdict.",
        grades: [8, 9, 10, 11, 12],
        status: "review",
        tracks: ["school-middle", "school-high", "olympiad", "club"],
        prereqs: ["conclusions-evidence"],
        related: ["repeat-reliability", "correlation-causation", "hypothesis", "continental-drift"],
        aliases: ["peer review", "reproducibility", "replication", "scientific publishing", "self-correction in science"],
        keywords: ["journal", "referee", "preprint", "replication", "reproducibility crisis", "retraction", "method section", "consensus", "predatory journal", "citation", "conflict of interest", "open data"],
        misconceptions: ["Thinking published means proven — peer review checks that the work is sound enough to be worth arguing about, not that it is right", "Believing science is settled by an expert's authority rather than by results anyone can go and reproduce"],
        tools: [{ k: "activity", label: "Write a method, hand it to another group with no talking, and see if they can reproduce your result from the paper alone — the gaps are what a referee hunts for" }, { k: "activity", label: "Take Wegener's drift paper against forty years of rejection, and Semmelweis on hand-washing: when was the community's scepticism healthy, and when was it just stubborn?" }]
    },

    // ==================== MODELS, SCALE & ESTIMATION ====================
    {
        id: "scale-models", name: "Scale & Scale Models", domain: "s-model", level: 3,
        desc: "Shrinking something by a fixed factor keeps its shape honest but nothing else: halve every length and the area drops to a quarter, the volume to an eighth. That square-cube trap is why a model bridge can hold its own weight when the real one could not, why elephants have pillar legs, and why the solar system will never fit on a poster with the planets to scale.",
        grades: [6, 7, 8, 9, 10, 11],
        status: "review",
        tracks: ["school-middle", "school-high", "olympiad", "club"],
        prereqs: ["model-thinking", "maps-scale", "ratio-proportion"],
        related: ["orders-magnitude", "fermi-estimation", "approximation", "earth-layers"],
        aliases: ["scale model", "scaling", "square-cube law", "proportional reasoning", "scale factor"],
        keywords: ["scale factor", "linear scale", "area scale", "volume scale", "square-cube law", "similar figures", "surface-area-to-volume ratio", "1:100", "model", "prototype", "allometry"],
        misconceptions: ["Assuming that doubling every length doubles the area and the volume too", "Thinking a scale model behaves like the real thing in every way, when its strength, its cooling and its water flow all scale differently from its size"],
        tools: [{ k: "activity", label: "Build a 2 cm and a 4 cm paper cube: the big one has 4 times the surface but 8 times the volume — then explain why small animals must eat all day" }, { k: "activity", label: "Scale the solar system to a cricket ground with the Sun as a football, then walk to Neptune. Nobody makes it." }]
    },
    {
        id: "orders-magnitude", name: "Orders of Magnitude", domain: "s-model", level: 3,
        desc: "Stop asking 'what is the number?' and ask 'how many zeros?' — a bacterium at 10⁻⁶ m, you at 10⁰, the Earth at 10⁷, the galaxy at 10²¹. Thinking in powers of ten turns quantities too big or small to picture into a ladder you can climb, and lets you catch an answer that is wrong by a factor of a thousand at a glance.",
        grades: [8, 9, 10, 11, 12],
        status: "review",
        tracks: ["school-middle", "school-high", "olympiad", "club"],
        prereqs: ["big-numbers", "scientific-notation"],
        related: ["fermi-estimation", "scale-models", "exponents-powers", "significant-figures", "fossils-geological-time"],
        aliases: ["order of magnitude", "powers of ten", "magnitude estimation", "log scale thinking"],
        keywords: ["order of magnitude", "power of ten", "exponent", "logarithmic scale", "decade", "factor of ten", "back-of-envelope", "sanity check", "Richter scale", "decibel", "pH"],
        misconceptions: ["Feeling a million and a billion as roughly the same sort of big — a million seconds is 12 days, a billion is 32 years", "Reading a logarithmic axis as if equal steps meant equal amounts"],
        tools: [{ k: "activity", label: "Build a powers-of-ten ladder along the corridor, one card per decade from an atom to the observable universe, and make everyone place their card by argument" }, { k: "activity", label: "Guess the order of magnitude first — hairs on a head, litres in a tank, seconds in a lifetime — then check. You will be right far more often than you expect." }]
    },
    {
        id: "fermi-estimation", name: "Fermi Estimation", domain: "s-model", level: 4,
        desc: "How many chapatis does Mumbai eat in a day? Break the impossible question into a chain of guessable ones — people, households, per meal — and the errors, being independent, largely cancel; you land within a factor of a few, which is often all a decision needs. Enrico Fermi estimated the first atomic bomb's yield by dropping paper scraps and watching how far the blast blew them.",
        grades: [9, 10, 11, 12],
        status: "review",
        tracks: ["school-high", "olympiad", "club"],
        prereqs: ["orders-magnitude", "rounding-estimation"],
        related: ["scale-models", "significant-figures", "measurement-uncertainty", "approximation", "big-numbers"],
        aliases: ["Fermi problem", "back-of-the-envelope estimation", "order-of-magnitude estimate", "guesstimate"],
        keywords: ["Fermi problem", "back-of-envelope", "estimation", "assumption", "decomposition", "upper bound", "lower bound", "sanity check", "piano tuners", "ballpark", "plausibility"],
        misconceptions: ["Thinking an estimate is worthless because it is not exact, when a number good to a factor of three, arrived at in two minutes, beats no number at all", "Believing a good estimate needs good data — it needs good decomposition and honest assumptions"],
        tools: [{ k: "activity", label: "Estimate how many litres of water your school uses in a year using nothing but your head, then check it against the actual bill" }, { k: "activity", label: "Fermi race: two teams, one question, five minutes, no phones. Whoever's assumptions survive cross-examination wins, not whoever is closest." }]
    },
    {
        id: "approximation", name: "Approximation", domain: "s-model", level: 3,
        desc: "Science gets its answers by deliberately throwing things away — ignoring air resistance, calling the Earth a perfect sphere, treating a cricket ball as a point with no size at all. An approximation is a controlled lie: the skill is not avoiding it but knowing which term is small enough to drop, and being able to say what it would cost you to keep it.",
        grades: [8, 9, 10, 11, 12],
        status: "review",
        tracks: ["school-middle", "school-high", "olympiad"],
        prereqs: ["model-thinking", "rounding-estimation"],
        related: ["fermi-estimation", "significant-figures", "orders-magnitude", "scale-models", "measurement-uncertainty"],
        aliases: ["simplifying assumptions", "idealisation", "neglecting small terms", "first approximation"],
        keywords: ["assumption", "idealisation", "negligible", "point mass", "frictionless", "ideal gas", "small-angle approximation", "rigid body", "linearisation", "rule of thumb", "spherical cow", "successive approximation", "limiting case"],
        misconceptions: ["Thinking an approximation is just a sloppier version of an exact answer, when for most real systems no exact answer exists and the approximation is the model", "Treating 'ignore air resistance' as cheating, rather than a deliberate first pass you can add back once you know how big it is"],
        tools: [{ k: "activity", label: "Drop a cricket ball, a flat sheet of paper and the same sheet crumpled: name the exact moment air resistance stopped being negligible" }, { k: "activity", label: "Compare sin θ with θ in radians from 1° to 40° and find where the 'harmless' small-angle approximation starts costing you 1 per cent" }]
    },
    {
        id: "graphs-as-models", name: "Graphs as Models", domain: "s-model", level: 3,
        desc: "A graph is not a decoration at the end of the report — it is the model itself: the line through your scatter claims that reality is smooth between your points, and its gradient and intercept usually are the physics. Which is also why a graph is the easiest place to lie: chop the axis, and a 2 per cent wobble becomes a cliff.",
        grades: [7, 8, 9, 10, 11, 12],
        status: "review",
        tracks: ["school-middle", "school-high", "olympiad"],
        prereqs: ["bar-line-graphs", "model-thinking"],
        related: ["graphs-coordinates", "conclusions-evidence", "correlation-causation", "recording-data", "weather-climate"],
        aliases: ["interpreting graphs", "line of best fit", "graphical analysis", "misleading graphs"],
        keywords: ["line of best fit", "gradient", "slope", "intercept", "trend line", "scatter plot", "interpolation", "extrapolation", "truncated axis", "log scale", "error bar", "anomalous point", "linearisation"],
        misconceptions: ["Joining the dots point-to-point instead of drawing the best-fit line the model actually predicts", "Trusting an extrapolation far beyond the data, where nothing was ever measured and the trend has no obligation to continue"],
        tools: [{ k: "activity", label: "Plot one honest dataset three ways — full axis, truncated axis, log axis — and write the headline each version would sell" }, { k: "activity", label: "Take a graph from a news article and ask three questions: where is zero, what is the sample, and how far past the data does the line go?" }]
    },
    {
        id: "simulation", name: "Simulation", domain: "s-model", level: 4,
        desc: "When a system is too big, too slow or too dangerous to experiment on — a monsoon, a galaxy, an epidemic — you write down its rules and let a computer run them forward instead. A simulation is only ever as good as the rules and starting numbers you fed it, which is why it must be tested against a past it was not tuned on before anyone trusts its future.",
        grades: [9, 10, 11, 12],
        status: "review",
        tracks: ["school-high", "olympiad", "club"],
        prereqs: ["model-thinking", "scale-models"],
        related: ["probability-basics", "graphs-as-models", "climate-change", "orders-magnitude"],
        aliases: ["computer simulation", "numerical model", "computational model", "Monte Carlo"],
        keywords: ["simulation", "numerical model", "initial conditions", "parameter", "time step", "Monte Carlo", "random sampling", "hindcast", "validation", "ensemble", "chaos", "butterfly effect", "sensitivity", "garbage in garbage out", "climate model"],
        misconceptions: ["Treating a simulation's output as data — it is the consequence of your assumptions, not a measurement of the world", "Thinking a longer, more detailed simulation must be more accurate, when a chaotic system loses predictability no matter how fine the grid"],
        tools: [{ k: "activity", label: "Estimate pi by throwing rice grains at a square with a quarter-circle drawn in it — count the hits, and you have run a Monte Carlo simulation by hand" }, { k: "activity", label: "Simulate an epidemic with dice and a class of thirty: change one rule — how many people each person meets — and watch the curve bend" }]
    }
);
