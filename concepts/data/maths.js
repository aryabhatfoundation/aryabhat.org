// ============================================================
// MATHEMATICS concepts.
//
// Requires data/_schema.js to have run first (it creates
// window.CONCEPTS and the taxonomy tables).
//
// These ids are published permalinks (#c=<id>) — never rename one.
// Domains: m-number, m-algebra, m-geometry, m-mensuration, m-data,
// m-trig, m-calculus, m-reason.
//
// ------------------------------------------------------------
// NOTES ON OVERLAP
// ------------------------------------------------------------
// · MEASUREMENT. `units-measurement` here is the arithmetic of
//   measure (choose a unit, count it, convert it). The SI system,
//   instrument error and significant figures live in physics under
//   `p-measure`. Do not duplicate them here.
// · STATISTICS. `m-data` owns the mathematical machinery (mean,
//   spread, probability). Experimental design, sampling bias and
//   "what counts as evidence" belong to skills (`s-inquiry`).
// · SCALE & ESTIMATION. `rounding-estimation` is the numeric skill;
//   order-of-magnitude reasoning as a habit of mind is astronomy's
//   `big-numbers` / skills' `model-thinking`. Both are linked, not
//   re-defined.
// · GEOMETRY vs ASTRONOMY. Angle measurement starts in astronomy
//   (`angles-protractor`, a naked-eye skill); `angles-lines` picks it
//   up as formal geometry. `coordinate-geometry` and
//   `latitude-longitude` are the same idea on a plane and a sphere —
//   linked as `related`, not as prereqs.
// · TRIGONOMETRY is kept whole here even though physics (waves) and
//   astronomy (spherical triangles) both lean on it.
//
// ------------------------------------------------------------
// NOTE ON syllabusRefs
// ------------------------------------------------------------
// Refs are given ONLY where the NCERT chapter number is stable and
// verifiable. Classes 6–8 moved to the "Ganita Prakash" books, whose
// chapter numbering no longer matches the older Mathematics texts, and
// the 2023 rationalisation shifted the tail chapters of classes 9–11.
// So refs appear only for: class 9 ch 1–8, class 10 ch 1–10, class 11
// ch 1–3, and class 12 (numbering unchanged). Everything else omits
// the field rather than guess. `grades` is still filled everywhere.
// ============================================================

window.CONCEPTS.push(

    // ==================================================================
    // NUMBER & ARITHMETIC
    // ==================================================================
    {
        id: "whole-numbers", name: "Whole Numbers", domain: "m-number", level: 1,
        desc: "Counting is the first mathematics: one name, one object, no skipping and no repeats. Whole numbers are what counting produces — 0, 1, 2, 3 … — an endless supply with no largest member.",
        grades: [1, 2, 3],
        tracks: ["school-foundation", "school-primary"],
        prereqs: [],
        related: ["number-line", "place-value"],
        aliases: ["natural numbers", "counting numbers"],
        keywords: ["zero", "successor", "predecessor", "cardinal", "ordinal", "0 1 2 3"],
        misconceptions: ["Thinking zero is not a number, or that it means 'nothing is there'"],
        tools: [{ k: "activity", label: "Count a jar of pulses two ways — one by one, then in tens — and check the answers agree" }]
    },
    {
        id: "number-line", name: "The Number Line", domain: "m-number", level: 2,
        desc: "Stretch the numbers out along a ruled line and arithmetic becomes movement: adding walks right, subtracting walks left, and 'bigger' simply means 'further right'. Almost every later number system is defined by finding it a home on this line.",
        grades: [2, 3, 4, 5, 6],
        tracks: ["school-primary", "school-middle"],
        prereqs: ["whole-numbers"],
        related: ["negative-numbers", "fractions", "real-numbers"],
        aliases: ["number line representation"],
        keywords: ["origin", "unit length", "left of", "right of", "ordering", "between"],
        tools: [{ k: "activity", label: "Chalk a number line on the floor and jump the sums — 3 + 4, then 3 − 4" }]
    },
    {
        id: "place-value", name: "Place Value", domain: "m-number", level: 2,
        desc: "The same digit 7 means seven, seventy or seven hundred depending only on where it sits. This one trick lets ten symbols write any number at all — and it is why 0 must exist, to hold an empty column open.",
        grades: [1, 2, 3, 4, 5],
        tracks: ["school-foundation", "school-primary"],
        prereqs: ["whole-numbers"],
        related: ["big-numbers", "decimals", "rounding-estimation"],
        aliases: ["positional notation", "decimal system", "Hindu-Arabic numerals", "place value system"],
        keywords: ["ones", "tens", "hundreds", "thousands", "lakh", "crore", "base ten", "digit", "expanded form", "regrouping"],
        misconceptions: ["Reading 105 as 'ten-five' — treating the 0 as decoration rather than an empty tens column"],
        tools: [{ k: "activity", label: "Bundle 100 matchsticks into tens with rubber bands, then trade ten bundles for a hundred" }]
    },
    {
        id: "four-operations", name: "The Four Operations", domain: "m-number", level: 2,
        desc: "Add, subtract, multiply, divide — and, crucially, knowing which one a story needs. Multiplication is repeated addition only until it isn't; division splits into two different questions ('how many each?' and 'how many groups?') that feel nothing alike.",
        grades: [1, 2, 3, 4, 5],
        tracks: ["school-foundation", "school-primary"],
        prereqs: ["place-value"],
        related: ["rounding-estimation", "factors-multiples"],
        aliases: ["basic operations", "arithmetic operations", "addition subtraction multiplication division"],
        keywords: ["sum", "difference", "product", "quotient", "remainder", "carry", "borrow", "BODMAS", "order of operations", "commutative", "associative", "distributive"],
        misconceptions: ["Believing multiplication always makes a number bigger and division always makes it smaller"],
        tools: [{ k: "activity", label: "Shopkeeper game: price cards and paper money, with every bill checked by mental estimate before it is paid" }]
    },
    {
        id: "rounding-estimation", name: "Rounding & Estimation", domain: "m-number", level: 2,
        desc: "A good approximate answer you trust beats an exact answer you can't check. Rounding deliberately throws away detail so the arithmetic fits in your head — and so a slipped decimal point announces itself instead of hiding.",
        grades: [3, 4, 5, 6, 7],
        tracks: ["school-primary", "school-middle"],
        prereqs: ["place-value"],
        related: ["four-operations", "big-numbers", "model-thinking", "scientific-notation"],
        aliases: ["approximation", "rounding off", "estimation", "nearest ten"],
        keywords: ["round up", "round down", "nearest hundred", "approximate", "roughly", "order of magnitude", "ballpark", "Fermi estimate"],
        misconceptions: ["Rounding step by step — turning 4.46 into 4.5 and then into 5"],
        tools: [{ k: "activity", label: "Estimate the rice grains in a fistful, then count one spoonful and scale up; compare with a friend's guess" }]
    },
    {
        id: "factors-multiples", name: "Factors & Multiples", domain: "m-number", level: 2,
        desc: "Ask which numbers divide a number exactly and you get its factors; ask which numbers it divides into and you get its multiples. The same fact, 3 × 4 = 12, read from both ends — and the whole of number theory grows out of the asymmetry.",
        grades: [4, 5, 6],
        tracks: ["school-primary", "school-middle"],
        prereqs: ["four-operations"],
        related: ["divisibility-rules", "primes"],
        aliases: ["factors and multiples", "divisors"],
        keywords: ["divisor", "multiple", "divides exactly", "factor pairs", "common factor", "common multiple", "perfect number"],
        misconceptions: ["Mixing up the two — saying 12 is a factor of 3 because 3 and 12 'go together'"],
        tools: [{ k: "activity", label: "Build every rectangle possible from 24 tiles; the side lengths you find are exactly the factors of 24" }]
    },
    {
        id: "divisibility-rules", name: "Divisibility Rules", domain: "m-number", level: 2,
        desc: "Shortcuts that answer 'does 3 divide this?' without doing the division — last digit for 2 and 5, digit sum for 3 and 9. They look like magic tricks but each one is a small theorem about place value waiting to be proved.",
        grades: [5, 6],
        tracks: ["school-primary", "school-middle", "olympiad"],
        prereqs: ["factors-multiples"],
        related: ["primes", "place-value"],
        aliases: ["tests of divisibility", "divisibility tests"],
        keywords: ["divisible by 3", "digit sum", "divisible by 9", "divisible by 11", "alternating sum"],
        tools: [{ k: "activity", label: "Test the digit-sum rule for 9 on twenty random numbers, then work out why it must always hold" }]
    },
    {
        id: "primes", name: "Prime Numbers", domain: "m-number", level: 2,
        desc: "A prime has no factors but 1 and itself — it cannot be built from smaller pieces. Every other number is a unique product of primes, which makes them the atoms of arithmetic; and there is no last one.",
        grades: [5, 6, 7, 10],
        tracks: ["school-primary", "school-middle", "school-high", "olympiad"],
        prereqs: ["factors-multiples"],
        related: ["hcf-lcm", "divisibility-rules"],
        aliases: ["prime numbers", "composite numbers", "prime factorisation", "fundamental theorem of arithmetic"],
        keywords: ["prime", "composite", "sieve of Eratosthenes", "prime factor", "coprime", "twin primes", "unique factorisation"],
        misconceptions: ["Calling 1 a prime number, because it seems to have 'no factors'"],
        tools: [{ k: "activity", label: "Sieve of Eratosthenes on a 10×10 grid — strike out multiples and watch the primes survive" }]
    },
    {
        id: "hcf-lcm", name: "HCF & LCM", domain: "m-number", level: 3,
        desc: "The largest number that divides both, and the smallest that both divide. HCF is about cutting things into equal pieces; LCM is about waiting for two repeating cycles to line up again — which is exactly how eclipse seasons and gear teeth work.",
        grades: [6, 7, 10],
        syllabusRefs: ["ncert:10:math:1"],
        tracks: ["school-middle", "school-high", "olympiad"],
        prereqs: ["primes"],
        related: ["fractions"],
        aliases: ["highest common factor", "lowest common multiple", "GCD", "greatest common divisor", "LCM", "HCF"],
        keywords: ["common factor", "common multiple", "prime factorisation method", "Euclid's division algorithm", "coprime", "HCF × LCM = product"],
        misconceptions: ["Assuming the LCM is always the product of the two numbers"],
        tools: [{ k: "activity", label: "Two paper gears with 8 and 12 teeth — mark a tooth on each and count turns until they meet again" }]
    },
    {
        id: "fractions", name: "Fractions", domain: "m-number", level: 2,
        desc: "A fraction answers 'how much of one thing?' — but only once you fix what the whole is, which is where most confusion starts. It is simultaneously a part of a whole, a point on the number line, and a division waiting to happen.",
        grades: [3, 4, 5, 6, 7],
        tracks: ["school-primary", "school-middle"],
        prereqs: ["four-operations"],
        related: ["decimals", "number-line", "ratio-proportion"],
        aliases: ["fraction", "proper fraction", "improper fraction", "mixed number", "equivalent fractions", "like and unlike fractions"],
        keywords: ["numerator", "denominator", "half", "quarter", "third", "lowest terms", "simplify", "common denominator", "reciprocal"],
        misconceptions: ["Thinking 1/3 is bigger than 1/2 because 3 > 2", "Adding fractions by adding tops and bottoms: 1/2 + 1/3 = 2/5"],
        tools: [{ k: "activity", label: "Fold paper strips into halves, thirds and sixths; line them up and read off which fractions are equal" }]
    },
    {
        id: "decimals", name: "Decimals", domain: "m-number", level: 2,
        desc: "Place value carried on past the ones column: tenths, hundredths, thousandths. Decimals make fractions comparable at a glance and money and measurement easy — at the price that the point is now the only thing standing between you and a 10× error.",
        grades: [4, 5, 6, 7],
        tracks: ["school-primary", "school-middle"],
        prereqs: ["fractions", "place-value"],
        related: ["percentages", "rounding-estimation", "rational-numbers"],
        aliases: ["decimal fractions", "decimal numbers", "decimal point"],
        keywords: ["tenths", "hundredths", "thousandths", "decimal point", "terminating decimal", "recurring decimal", "0.5", "place after point"],
        misconceptions: ["Thinking 0.45 is bigger than 0.5 because 45 is bigger than 5"],
        tools: [{ k: "activity", label: "Measure ten classmates' heights with a metre tape and write each in metres, centimetres and millimetres" }]
    },
    {
        id: "percentages", name: "Percentages", domain: "m-number", level: 3,
        desc: "A fraction forced onto a denominator of 100 so that any two can be compared instantly — 18/25 versus 7/10 is a puzzle, 72% versus 70% is not. The trap is that a percentage is meaningless until you say 'per cent of what'.",
        grades: [5, 6, 7, 8],
        tracks: ["school-primary", "school-middle"],
        prereqs: ["fractions", "decimals"],
        related: ["ratio-proportion", "simple-compound-interest", "pie-charts"],
        aliases: ["percent", "per cent", "percentage increase", "percentage change"],
        keywords: ["%", "per hundred", "discount", "profit", "loss", "markup", "percentage points", "of the total"],
        misconceptions: ["Thinking a 20% rise followed by a 20% fall returns you to the starting value"],
        tools: [{ k: "activity", label: "Collect five shop discount labels and check each claimed saving against the actual rupees taken off" }]
    },
    {
        id: "ratio-proportion", name: "Ratio & Proportion", domain: "m-number", level: 3,
        desc: "Ratio compares two quantities without caring how big either is — 2:3 is the same relationship whether it's spoons or tonnes. Proportion is what lets you keep that relationship fixed while scaling everything up, which is the whole basis of maps, recipes and models.",
        grades: [6, 7, 8],
        tracks: ["school-middle", "school-high"],
        prereqs: ["fractions"],
        related: ["maps-scale", "percentages", "triangle-similarity", "speed-distance-time"],
        aliases: ["ratio", "proportion", "direct proportion", "inverse proportion", "unitary method", "direct and inverse variation"],
        keywords: ["a:b", "equivalent ratio", "scale factor", "cross multiplication", "per unit", "varies directly", "varies inversely", "rate"],
        misconceptions: ["Comparing ratios by subtracting instead of dividing — thinking 3:5 and 5:7 are the same because both differ by 2"],
        tools: [{ k: "activity", label: "Scale a two-person recipe to seven people, cook it, and see whether the ratios survived contact with reality" }]
    },
    {
        id: "negative-numbers", name: "Negative Numbers", domain: "m-number", level: 2,
        desc: "Numbers to the left of zero, invented because 3 − 5 has to mean something. They are not 'less than nothing' — they are the other direction: debt, cold, below sea level, a step backwards.",
        grades: [6, 7],
        tracks: ["school-middle"],
        prereqs: ["whole-numbers"],
        related: ["number-line", "integers", "temperature-heat"],
        aliases: ["signed numbers", "negative integers", "directed numbers"],
        keywords: ["minus", "below zero", "opposite", "additive inverse", "debt", "sea level", "−5"],
        misconceptions: ["Thinking −8 is greater than −3 because 8 is greater than 3"],
        tools: [{ k: "activity", label: "Keep a lift-floor log for a building with basements; every journey is an addition of signed numbers" }]
    },
    {
        id: "integers", name: "Integers", domain: "m-number", level: 2,
        desc: "The whole numbers, their negatives and zero, taken as one closed system where subtraction always works. The rules that follow — most notoriously that two negatives multiply to a positive — are forced by wanting the old arithmetic to keep behaving.",
        grades: [6, 7],
        tracks: ["school-middle"],
        prereqs: ["negative-numbers", "four-operations"],
        related: ["rational-numbers", "number-line"],
        aliases: ["integer", "positive and negative integers", "set of integers", "Z"],
        keywords: ["ℤ", "additive inverse", "closure", "sign rules", "minus times minus", "absolute value", "modulus"],
        misconceptions: ["Applying the addition sign rules to multiplication, so that (−2) × (−3) comes out as −6"],
        tools: [{ k: "activity", label: "Red and black counter game: red cancels black one-for-one, and every integer rule falls out of the cancelling" }]
    },
    {
        id: "rational-numbers", name: "Rational Numbers", domain: "m-number", level: 3,
        desc: "Every number expressible as p/q with q not zero — which is exactly the numbers a ruler can name. Between any two of them lies another, forever, and yet they still leave gaps in the line.",
        grades: [7, 8, 9],
        syllabusRefs: ["ncert:9:math:1"],
        tracks: ["school-middle", "school-high"],
        prereqs: ["integers", "fractions"],
        related: ["decimals", "real-numbers"],
        aliases: ["rational number", "p/q form", "Q"],
        keywords: ["ℚ", "terminating decimal", "recurring decimal", "non-terminating repeating", "density", "standard form", "between any two"],
        misconceptions: ["Believing there is a 'next' rational number after 1/2, the way 3 follows 2"],
        tools: [{ k: "activity", label: "Find a fraction between 3/7 and 4/7; then between your answer and 3/7; keep going until the class is convinced it never ends" }]
    },
    {
        id: "squares-roots", name: "Squares & Square Roots", domain: "m-number", level: 3,
        desc: "Squaring turns a side length into an area; the square root undoes it, asking 'what side gives this area?'. The moment you ask it of 2 you discover a number no fraction can name — the crisis that broke the Pythagoreans.",
        grades: [7, 8],
        tracks: ["school-middle", "school-high"],
        prereqs: ["four-operations", "factors-multiples"],
        related: ["exponents-powers", "pythagoras", "real-numbers"],
        aliases: ["perfect squares", "square root", "cube root", "squares and square roots"],
        keywords: ["√", "squared", "perfect square", "surd", "prime factorisation method", "long division method", "cube root", "∛"],
        misconceptions: ["Thinking √(a + b) equals √a + √b"],
        tools: [{ k: "activity", label: "Lay square tile arrays for 1, 4, 9, 16 and note the gaps between them go 3, 5, 7 — consecutive odd numbers" }]
    },
    {
        id: "exponents-powers", name: "Exponents & Powers", domain: "m-number", level: 3,
        desc: "Shorthand for repeated multiplication that quickly outgrows its own definition: once you insist the laws keep working, a⁰ must be 1 and a⁻² must be a fraction. Exponents are also where numbers stop growing and start exploding.",
        grades: [7, 8],
        tracks: ["school-middle", "school-high"],
        prereqs: ["squares-roots"],
        related: ["scientific-notation", "geometric-progression", "big-numbers"],
        aliases: ["indices", "powers", "laws of exponents", "exponents and powers"],
        keywords: ["base", "exponent", "index", "a^n", "power of ten", "negative exponent", "zero exponent", "aᵐ × aⁿ = aᵐ⁺ⁿ"],
        misconceptions: ["Reading 2³ as 2 × 3", "Thinking a negative exponent makes the answer negative"],
        tools: [{ k: "activity", label: "Fold a sheet of paper in half as many times as you can and tabulate 2ⁿ layers — the doubling beats you around fold seven" }]
    },
    {
        id: "scientific-notation", name: "Scientific Notation", domain: "m-number", level: 3,
        desc: "Write any number as a digit-or-so times a power of ten, and the Sun's distance and a virus's width become comparable on the same page. It also makes the important part of a number — its size — impossible to miscount.",
        grades: [7, 8, 9],
        tracks: ["school-middle", "school-high"],
        prereqs: ["exponents-powers", "big-numbers"],
        related: ["decimals", "rounding-estimation", "unit-conversion", "model-thinking"],
        aliases: ["standard form", "exponential form", "powers of ten notation"],
        keywords: ["1.5 × 10^8", "mantissa", "order of magnitude", "× 10^", "e notation", "significant digits"],
        misconceptions: ["Thinking 25 × 10³ is in standard form — the leading part must lie between 1 and 10"],
        tools: [{ k: "activity", label: "Make a powers-of-ten card set from 10⁻⁶ m to 10²¹ m and pin real objects to each rung" }]
    },
    {
        id: "simple-compound-interest", name: "Simple & Compound Interest", domain: "m-number", level: 3,
        desc: "Simple interest grows in a straight line; compound interest grows on its own growth and therefore curves upward without limit. The gap between them is small in year one and shocking by year twenty — the most useful percentage anyone learns.",
        grades: [7, 8],
        tracks: ["school-middle", "school-high"],
        prereqs: ["percentages"],
        related: ["geometric-progression", "exponents-powers"],
        aliases: ["interest", "compound interest", "simple interest", "comparing quantities"],
        keywords: ["principal", "rate", "time", "amount", "P(1+R/100)^n", "compounded annually", "half-yearly", "depreciation"],
        misconceptions: ["Assuming compound interest for 2 years is just simple interest doubled"],
        tools: [{ k: "activity", label: "Chart ₹1000 at 10% for 20 years both ways on one graph — the fork in the curves is the whole lesson" }]
    },
    {
        id: "real-numbers", name: "Real Numbers", domain: "m-number", level: 4,
        desc: "The rationals leave holes in the number line — √2 and π fall straight through them. Filling every hole gives the reals: the numbers that finally make 'a point on the line' and 'a number' the same thing.",
        grades: [9, 10],
        syllabusRefs: ["ncert:9:math:1", "ncert:10:math:1"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["rational-numbers", "squares-roots"],
        related: ["number-line", "limits-intro", "proof-methods"],
        aliases: ["irrational numbers", "number system", "real number system", "surds", "R"],
        keywords: ["ℝ", "irrational", "√2", "π", "non-terminating non-recurring", "rationalising the denominator", "completeness"],
        misconceptions: ["Thinking π equals 22/7 exactly, rather than 22/7 being a handy rational approximation"],
        tools: [{ k: "activity", label: "Construct √2 on a number line with compass and a unit right triangle — then meet the proof that it is not a fraction" }]
    },

    // ==================================================================
    // ALGEBRA & PATTERNS
    // ==================================================================
    {
        id: "patterns-generalisation", name: "Patterns & Generalisation", domain: "m-algebra", level: 2,
        desc: "Spot what stays the same as a pattern grows, then say it once instead of forever. The leap from 'the 5th shape needs 11 sticks' to 'the nth shape needs 2n + 1' is the moment arithmetic becomes algebra.",
        grades: [4, 5, 6, 7],
        tracks: ["school-primary", "school-middle", "olympiad"],
        prereqs: ["whole-numbers"],
        related: ["algebraic-expressions", "sequences-series"],
        aliases: ["number patterns", "generalisation", "growing patterns", "rule of a pattern"],
        keywords: ["nth term", "rule", "pattern", "matchstick pattern", "generalise", "term number", "figurate numbers"],
        tools: [{ k: "activity", label: "Build matchstick squares in a row, tabulate sticks against squares, and predict shape 100 before you build it" }]
    },
    {
        id: "algebraic-expressions", name: "Algebraic Expressions", domain: "m-algebra", level: 3,
        desc: "A letter standing for 'any number' lets you write down a rule once and use it forever. The hard part is not the letters — it is accepting that 3x + 2 is a finished answer, not a sum waiting to be done.",
        grades: [6, 7, 8],
        tracks: ["school-middle", "school-high"],
        prereqs: ["patterns-generalisation", "integers"],
        related: ["linear-equations", "algebraic-identities"],
        aliases: ["algebra", "expressions", "variables", "algebraic expression", "literal numbers"],
        keywords: ["variable", "constant", "coefficient", "term", "like terms", "monomial", "binomial", "substitution", "simplify", "expand"],
        misconceptions: ["Simplifying 3x + 2 to 5x — treating unlike terms as if they could be added"],
        tools: [{ k: "activity", label: "Think-of-a-number tricks: perform one on a friend, then use a letter to show why it always lands on the same answer" }]
    },
    {
        id: "algebraic-identities", name: "Algebraic Identities", domain: "m-algebra", level: 3,
        desc: "Equations true for every value of the letter, not just some — (a + b)² = a² + 2ab + b² never fails. Each one is a rectangle cut up two ways, which is why they can be seen as well as proved.",
        grades: [8, 9],
        syllabusRefs: ["ncert:9:math:2"],
        tracks: ["school-middle", "school-high", "olympiad"],
        prereqs: ["algebraic-expressions"],
        related: ["factorisation-algebra", "polynomials"],
        aliases: ["standard identities", "identities", "expansion formulae", "special products"],
        keywords: ["(a+b)²", "(a−b)²", "a² − b²", "difference of squares", "(x+a)(x+b)", "identity vs equation", "expansion"],
        misconceptions: ["Expanding (a + b)² as a² + b², forgetting the 2ab middle term"],
        tools: [{ k: "activity", label: "Cut a square of side a+b into four pieces of paper and physically hand over the a², b² and two ab rectangles" }]
    },
    {
        id: "factorisation-algebra", name: "Factorisation", domain: "m-algebra", level: 3,
        desc: "Running expansion backwards: turn a sum into a product so that the zero-product rule can bite. Factorising is guessy in a way expanding never is, which is exactly why it repays pattern recognition.",
        grades: [8, 9],
        tracks: ["school-middle", "school-high", "olympiad"],
        prereqs: ["algebraic-identities", "factors-multiples"],
        related: ["quadratic-equations", "polynomials"],
        aliases: ["factorising", "factoring", "splitting the middle term"],
        keywords: ["common factor", "grouping", "middle term split", "difference of squares", "product of factors", "zero product"],
        tools: [{ k: "activity", label: "Rearrange algebra tiles for x² + 5x + 6 into a rectangle; its sides are the factors (x+2) and (x+3)" }]
    },
    {
        id: "linear-equations", name: "Linear Equations", domain: "m-algebra", level: 3,
        desc: "An equation is a balance: whatever you do to one side you must do to the other, and the unknown is cornered one legal move at a time. Linear means the unknown appears plainly — no squares, no hiding in a denominator.",
        grades: [6, 7, 8, 9],
        syllabusRefs: ["ncert:9:math:4"],
        tracks: ["school-middle", "school-high"],
        prereqs: ["algebraic-expressions"],
        related: ["linear-graphs", "inequalities", "simultaneous-equations"],
        aliases: ["simple equations", "linear equation in one variable", "solving equations", "linear equations in two variables"],
        keywords: ["solve for x", "transpose", "balance", "LHS", "RHS", "root", "solution", "ax + b = 0", "check by substitution"],
        misconceptions: ["Moving a term across the equals sign and keeping its sign unchanged"],
        tools: [{ k: "activity", label: "Pan balance with identical bags plus known weights: solve 2x + 3 = 11 by physically removing equal amounts from both pans" }]
    },
    {
        id: "graphs-coordinates", name: "Coordinates & the Cartesian Plane", domain: "m-algebra", level: 2,
        desc: "Two number lines crossed at right angles pin down any point in a plane with one ordered pair. Descartes' idea is that geometry and algebra are the same subject in different clothes — a shape becomes an equation and back again.",
        grades: [8, 9],
        syllabusRefs: ["ncert:9:math:3"],
        tracks: ["school-middle", "school-high"],
        prereqs: ["number-line", "integers"],
        related: ["linear-graphs", "coordinate-geometry", "maps-scale", "latitude-longitude"],
        aliases: ["cartesian plane", "coordinate plane", "ordered pairs", "x-y plane", "plotting points"],
        keywords: ["x-axis", "y-axis", "origin", "abscissa", "ordinate", "quadrant", "(x, y)", "plot"],
        misconceptions: ["Plotting (3, 5) at the point (5, 3) — reading the pair in whichever order feels natural"],
        tools: [{ k: "activity", label: "Play Battleship on squared paper, then re-label the grid with negative coordinates and play again" }]
    },
    {
        id: "linear-graphs", name: "Straight-Line Graphs", domain: "m-algebra", level: 3,
        desc: "Every equation of the form y = mx + c draws a straight line, and every straight line comes from such an equation. Slope becomes a rate you can see, and the intercept is where the story starts.",
        grades: [8, 9, 10],
        syllabusRefs: ["ncert:9:math:4"],
        tracks: ["school-middle", "school-high"],
        prereqs: ["linear-equations", "graphs-coordinates"],
        related: ["rate-of-change", "simultaneous-equations", "speed-distance-time"],
        aliases: ["linear graph", "slope-intercept form", "graph of a linear equation", "straight line graph"],
        keywords: ["y = mx + c", "slope", "gradient", "intercept", "rise over run", "steepness", "parallel lines same slope"],
        misconceptions: ["Reading a distance–time graph as a picture of the journey's path rather than a record of it"],
        tools: [{ k: "activity", label: "Time a friend walking at steady pace along a corridor, plot distance against time, and read their speed off the slope" }]
    },
    {
        id: "simultaneous-equations", name: "Simultaneous Equations", domain: "m-algebra", level: 4,
        desc: "Two unknowns need two conditions, and the solution is the single point where both are satisfied at once — which is why graphically it is just where the lines cross. Parallel lines mean no solution; identical lines mean infinitely many.",
        grades: [9, 10],
        syllabusRefs: ["ncert:10:math:3"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["linear-equations", "linear-graphs"],
        related: ["inequalities"],
        aliases: ["pair of linear equations in two variables", "system of equations", "simultaneous linear equations"],
        keywords: ["substitution method", "elimination method", "cross-multiplication", "consistent", "inconsistent", "point of intersection", "unique solution", "infinitely many solutions"],
        misconceptions: ["Thinking every pair of linear equations must have exactly one solution"],
        tools: [{ k: "activity", label: "Price puzzle: 3 pens + 2 pencils cost ₹40, 2 pens + 3 pencils cost ₹35 — solve it both by graph and by elimination" }]
    },
    {
        id: "polynomials", name: "Polynomials", domain: "m-algebra", level: 3,
        desc: "Expressions built only from powers of x with number coefficients — the best-behaved functions there are. Their zeros, their factors and where their graph crosses the axis are three descriptions of one thing.",
        grades: [9, 10],
        syllabusRefs: ["ncert:9:math:2", "ncert:10:math:2"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["algebraic-expressions", "exponents-powers"],
        related: ["factorisation-algebra", "quadratic-equations", "functions-concept"],
        aliases: ["polynomial", "degree of a polynomial", "zeros of a polynomial", "remainder theorem", "factor theorem"],
        keywords: ["degree", "coefficient", "zero of a polynomial", "linear quadratic cubic", "remainder theorem", "factor theorem", "division algorithm", "sum and product of zeros"],
        misconceptions: ["Confusing a zero of the polynomial with the value of the polynomial at zero"],
        tools: [{ k: "activity", label: "Plot y = x² − 5x + 6 point by point on graph paper and check the crossings sit exactly at its factors" }]
    },
    {
        id: "quadratic-equations", name: "Quadratic Equations", domain: "m-algebra", level: 4,
        desc: "Once the unknown is squared a straight-line trick no longer works, and there are generally two answers, not one. Completing the square is the honest method; the formula is that method done once and remembered forever.",
        grades: [10],
        syllabusRefs: ["ncert:10:math:4"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["polynomials", "factorisation-algebra"],
        related: ["squares-roots", "functions-concept"],
        aliases: ["quadratic equation", "quadratic formula", "completing the square", "sridharacharya formula"],
        keywords: ["ax² + bx + c = 0", "discriminant", "b² − 4ac", "roots", "parabola", "nature of roots", "two real roots", "no real roots"],
        misconceptions: ["Solving x² = 9 as x = 3 only, forgetting −3"],
        tools: [{ k: "activity", label: "Complete the square literally: lay out x² + 6x with tiles and count how many unit tiles finish the square" }]
    },
    {
        id: "inequalities", name: "Inequalities", domain: "m-algebra", level: 3,
        desc: "Not everything worth solving is an equals sign — budgets, tolerances and safety limits are all 'at most' and 'at least'. Solutions come as whole stretches of the number line, and multiplying by a negative flips the sign, which catches everyone once.",
        grades: [9, 11],
        tracks: ["school-high", "olympiad"],
        prereqs: ["linear-equations", "number-line"],
        related: ["simultaneous-equations", "logical-statements"],
        aliases: ["linear inequalities", "inequations", "inequality"],
        keywords: ["<", ">", "≤", "≥", "solution set", "number line representation", "interval", "region", "flip the inequality"],
        misconceptions: ["Dividing an inequality by a negative number without reversing the sign"],
        tools: [{ k: "activity", label: "Shade the solutions of 2x + 3 ≤ 11 on a number line, then test three shaded and three unshaded values" }]
    },
    {
        id: "sequences-series", name: "Sequences & Series", domain: "m-algebra", level: 3,
        desc: "A sequence is an ordered list with a rule; a series is what happens when you add it up. The useful question is always the same — can you get the 100th term, or the total, without grinding through the first 99?",
        grades: [10, 11],
        tracks: ["school-high", "olympiad"],
        prereqs: ["patterns-generalisation", "algebraic-expressions"],
        related: ["arithmetic-progression", "geometric-progression", "limits-intro"],
        aliases: ["sequence", "series", "progressions", "nth term"],
        keywords: ["term", "nth term", "aₙ", "sum to n terms", "Sₙ", "sigma notation", "Σ", "finite", "infinite series"],
        tools: [{ k: "activity", label: "Add 1 + 2 + … + 100 the way Gauss reputedly did in school — pair the ends and see it collapse to 50 × 101" }]
    },
    {
        id: "arithmetic-progression", name: "Arithmetic Progression", domain: "m-algebra", level: 3,
        desc: "Add the same amount every step and you get an AP — the numerical twin of a straight-line graph. Its sum has a lovely shortcut: pair the first term with the last, the second with the second-last, and every pair totals the same.",
        grades: [10],
        syllabusRefs: ["ncert:10:math:5"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["sequences-series"],
        related: ["linear-graphs", "geometric-progression"],
        aliases: ["AP", "arithmetic sequence", "arithmetic series"],
        keywords: ["common difference", "first term", "aₙ = a + (n−1)d", "Sₙ = n/2[2a + (n−1)d]", "d", "consecutive terms"],
        misconceptions: ["Using n as the last term instead of the number of terms in the sum formula"],
        tools: [{ k: "activity", label: "Stack a staircase of coins 1, 2, 3, … high; two copies of it always fit into a rectangle, which proves the sum formula" }]
    },
    {
        id: "geometric-progression", name: "Geometric Progression", domain: "m-algebra", level: 4,
        desc: "Multiply by the same factor every step and growth stops being steady and starts being explosive — or, if the factor is less than 1, dies away to nothing. It is the arithmetic behind compound interest, halving doses and the wheat-on-a-chessboard story.",
        grades: [10, 11],
        tracks: ["school-high", "olympiad"],
        prereqs: ["sequences-series", "exponents-powers"],
        related: ["simple-compound-interest", "arithmetic-progression", "limits-intro"],
        aliases: ["GP", "geometric sequence", "geometric series"],
        keywords: ["common ratio", "arⁿ⁻¹", "sum of a GP", "infinite GP", "exponential growth", "r", "converges"],
        misconceptions: ["Assuming an infinite series must add up to infinity, even when the terms shrink fast"],
        tools: [{ k: "activity", label: "Put one grain of rice on square 1 of a chessboard and double each square; give up out loud when the class sees where it goes" }]
    },
    {
        id: "functions-concept", name: "Functions", domain: "m-algebra", level: 4,
        desc: "A machine with a rule: one input, exactly one output, no exceptions. Almost every law in science is a claim about which function connects two quantities — and the graph is that claim made visible.",
        grades: [11, 12],
        syllabusRefs: ["ncert:11:math:2", "ncert:12:math:1"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["algebraic-expressions", "graphs-coordinates"],
        related: ["sets-venn", "limits-intro", "rate-of-change", "trig-functions-graphs"],
        aliases: ["function", "relations and functions", "mapping", "domain and range"],
        keywords: ["f(x)", "domain", "range", "codomain", "input output", "one-one", "onto", "vertical line test", "composite function", "inverse function"],
        misconceptions: ["Reading f(x) as f multiplied by x"],
        tools: [{ k: "activity", label: "Function-machine game: one student applies a secret rule to numbers called out, the rest deduce it from the outputs alone" }]
    },

    // ==================================================================
    // GEOMETRY & SHAPE
    // ==================================================================
    {
        id: "basic-shapes", name: "Basic Shapes", domain: "m-geometry", level: 1,
        desc: "Circle, triangle, square, rectangle — learned by handling and sorting, not by definition. What matters early is noticing that a shape stays itself when you turn it, shrink it or draw it badly.",
        grades: [1, 2, 3, 4],
        tracks: ["school-foundation", "school-primary"],
        prereqs: [],
        related: ["symmetry", "polygons", "solid-shapes"],
        aliases: ["plane figures", "2D shapes", "basic geometrical ideas", "flat shapes"],
        keywords: ["circle", "square", "rectangle", "triangle", "side", "corner", "vertex", "curved", "straight", "closed figure"],
        misconceptions: ["Thinking a square standing on its corner is no longer a square but a diamond"],
        tools: [{ k: "activity", label: "Shape hunt around the school: photograph or sketch ten real objects and sort them by shape, not by what they are" }]
    },
    {
        id: "angles-lines", name: "Lines & Angles", domain: "m-geometry", level: 2,
        desc: "An angle measures turning, not the length of its arms — a fact worth insisting on early. Once parallel lines are cut by a transversal, angles start travelling in copies, and that is the engine of nearly every proof that follows.",
        grades: [6, 7, 9],
        syllabusRefs: ["ncert:9:math:6"],
        tracks: ["school-middle", "school-high"],
        prereqs: ["angles-protractor", "basic-shapes"],
        related: ["triangles", "euclid-axioms", "polygons"],
        aliases: ["lines and angles", "angle pairs", "parallel lines and transversal"],
        keywords: ["acute", "obtuse", "reflex", "right angle", "vertically opposite", "linear pair", "supplementary", "complementary", "corresponding angles", "alternate angles", "co-interior", "transversal", "degree"],
        misconceptions: ["Judging one angle bigger than another because its arms are drawn longer"],
        tools: [{ k: "activity", label: "Two rulers pinned at one end make a live angle; open it against a protractor and name every range as you sweep" }]
    },
    {
        id: "euclid-axioms", name: "Euclid's Axioms & Postulates", domain: "m-geometry", level: 3,
        desc: "Geometry's founding bargain: agree a short list of statements you will not argue about, and derive everything else. The point is not the axioms themselves but the discovery that you cannot prove anything from nothing.",
        grades: [9],
        syllabusRefs: ["ncert:9:math:5"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["angles-lines"],
        related: ["proof-methods", "logical-statements", "constructions"],
        aliases: ["Euclid's geometry", "axioms", "postulates", "introduction to Euclid's geometry"],
        keywords: ["axiom", "postulate", "undefined terms", "point line plane", "parallel postulate", "self-evident", "Elements"],
        misconceptions: ["Believing a well-drawn diagram counts as a proof"],
        tools: [{ k: "activity", label: "Invent a two-axiom game with counters and derive three 'theorems' from it — axioms stop feeling sacred fast" }]
    },
    {
        id: "triangles", name: "Triangles", domain: "m-geometry", level: 2,
        desc: "The simplest closed straight-sided figure, and the only rigid one — which is why bridges and roof trusses are made of them. Its three angles always total 180°, a fact you can find by tearing corners before you ever prove it.",
        grades: [6, 7, 9],
        syllabusRefs: ["ncert:9:math:7"],
        tracks: ["school-middle", "school-high"],
        prereqs: ["angles-lines"],
        related: ["triangle-congruence", "pythagoras", "area-triangle", "polygons"],
        aliases: ["triangle", "types of triangles", "properties of triangles"],
        keywords: ["scalene", "isosceles", "equilateral", "acute-angled", "right-angled", "obtuse-angled", "angle sum property", "exterior angle", "triangle inequality", "median", "altitude"],
        misconceptions: ["Thinking any three lengths can make a triangle, ignoring that two sides must beat the third"],
        tools: [{ k: "activity", label: "Tear the three corners off a paper triangle and fit them together — they always make a straight line" }]
    },
    {
        id: "triangle-congruence", name: "Congruence of Triangles", domain: "m-geometry", level: 3,
        desc: "Congruent means identical — same shape, same size, just possibly moved or flipped. The real content is that you never need all six measurements: three well-chosen ones (SSS, SAS, ASA, RHS) already pin the triangle down, and SSA doesn't.",
        grades: [7, 9],
        syllabusRefs: ["ncert:9:math:7"],
        tracks: ["school-middle", "school-high"],
        prereqs: ["triangles"],
        related: ["triangle-similarity", "proof-methods", "transformations", "constructions"],
        aliases: ["congruent triangles", "congruence", "SSS SAS ASA RHS", "criteria for congruence"],
        keywords: ["≅", "SSS", "SAS", "ASA", "AAS", "RHS", "corresponding parts", "CPCT", "superimpose"],
        misconceptions: ["Accepting AAA as a congruence rule — it fixes the shape but not the size"],
        tools: [{ k: "activity", label: "Give the class only SAS measurements and have everyone cut a triangle; stack all of them and they coincide exactly" }]
    },
    {
        id: "triangle-similarity", name: "Similarity of Triangles", domain: "m-geometry", level: 4,
        desc: "Same shape, different size: angles equal, sides in a fixed ratio. This is what lets a shadow measure a tower and a map stand in for a district — and it is the direct ancestor of trigonometry.",
        grades: [10],
        syllabusRefs: ["ncert:10:math:6"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["triangle-congruence", "ratio-proportion"],
        related: ["trig-ratios", "maps-scale", "light-shadow", "pythagoras"],
        aliases: ["similar triangles", "similarity", "AA criterion", "basic proportionality theorem", "Thales theorem"],
        keywords: ["~", "AA", "SSS similarity", "SAS similarity", "scale factor", "BPT", "ratio of areas", "corresponding sides proportional"],
        misconceptions: ["Assuming that doubling every side doubles the area"],
        tools: [{ k: "activity", label: "Measure a tree by shadows: your height and shadow versus the tree's shadow — similar triangles do the rest" }]
    },
    {
        id: "pythagoras", name: "Pythagoras' Theorem", domain: "m-geometry", level: 3,
        desc: "In a right triangle the squares on the two short sides together equal the square on the longest. It is the bridge between distance and coordinates, and its converse gives builders a way to make a true right angle with only a knotted rope.",
        grades: [7, 8, 10],
        syllabusRefs: ["ncert:10:math:6"],
        tracks: ["school-middle", "school-high", "olympiad"],
        prereqs: ["triangles", "squares-roots"],
        related: ["triangle-similarity", "coordinate-geometry", "trig-ratios", "constructions"],
        aliases: ["Pythagorean theorem", "Baudhayana theorem", "hypotenuse theorem", "Pythagoras theorem"],
        keywords: ["a² + b² = c²", "hypotenuse", "right angle", "Pythagorean triple", "3-4-5", "converse", "Baudhayana Sulbasutra"],
        misconceptions: ["Applying a² + b² = c² to triangles with no right angle"],
        tools: [{ k: "activity", label: "Knot a rope at 12 equal intervals and pull a 3-4-5 triangle taut — a perfect right angle, the way surveyors did it" }]
    },
    {
        id: "quadrilaterals", name: "Quadrilaterals", domain: "m-geometry", level: 3,
        desc: "Four sides, and a family tree: square inside rectangle and rhombus, both inside parallelogram. Every property in that tree is proved by slicing the quadrilateral into triangles you already understand.",
        grades: [8, 9],
        syllabusRefs: ["ncert:9:math:8"],
        tracks: ["school-middle", "school-high"],
        prereqs: ["triangles", "polygons"],
        related: ["symmetry", "perimeter-area", "triangle-congruence"],
        aliases: ["quadrilateral", "parallelogram", "rhombus", "trapezium", "understanding quadrilaterals"],
        keywords: ["square", "rectangle", "rhombus", "parallelogram", "trapezium", "kite", "diagonal", "opposite sides", "angle sum 360", "mid-point theorem"],
        misconceptions: ["Insisting a square is not a rectangle, because the two words name different pictures"],
        tools: [{ k: "activity", label: "Make a jointed four-strip loop with split pins; flex it and watch a rectangle collapse to a parallelogram while sides stay fixed" }]
    },
    {
        id: "polygons", name: "Polygons", domain: "m-geometry", level: 2,
        desc: "Any closed figure of straight sides. Cut one into triangles and its angle sum falls out immediately — (n − 2) × 180° — which is more satisfying than being handed the formula.",
        grades: [6, 7, 8],
        tracks: ["school-middle"],
        prereqs: ["angles-lines", "basic-shapes"],
        related: ["quadrilaterals", "triangles", "symmetry", "perimeter-area"],
        aliases: ["polygon", "regular polygon", "pentagon", "hexagon", "n-gon"],
        keywords: ["side", "vertex", "diagonal", "interior angle", "exterior angle", "angle sum", "(n−2)×180", "regular", "convex", "concave", "tessellation"],
        misconceptions: ["Calling any six-sided figure a regular hexagon, regardless of its angles"],
        tools: [{ k: "activity", label: "Draw a heptagon, split it into triangles from one vertex, count them, and derive the angle-sum rule yourself" }]
    },
    {
        id: "symmetry", name: "Symmetry", domain: "m-geometry", level: 2,
        desc: "A shape is symmetric if some move — a flip, a turn — leaves it looking untouched. Rangoli, temple plans and butterfly wings are all statements about which moves do nothing, which is a surprisingly deep idea in a friendly costume.",
        grades: [5, 6, 7],
        tracks: ["school-primary", "school-middle"],
        prereqs: ["basic-shapes"],
        related: ["transformations", "polygons"],
        aliases: ["line symmetry", "rotational symmetry", "reflection symmetry", "axis of symmetry"],
        keywords: ["mirror line", "line of symmetry", "order of rotational symmetry", "point symmetry", "rangoli", "kolam", "reflection"],
        misconceptions: ["Thinking every shape has a line of symmetry through its middle, including a parallelogram"],
        tools: [{ k: "activity", label: "Fold and cut paper rangoli, then test each design's lines of symmetry against a small mirror" }]
    },
    {
        id: "transformations", name: "Transformations", domain: "m-geometry", level: 3,
        desc: "Slide, turn, flip, resize — the four ways to move a shape. Translations, rotations and reflections preserve size (so they explain congruence); enlargement doesn't (so it explains similarity).",
        grades: [7, 8, 9],
        tracks: ["school-middle", "school-high"],
        prereqs: ["symmetry", "graphs-coordinates"],
        related: ["triangle-congruence", "triangle-similarity", "coordinate-geometry"],
        aliases: ["translation", "rotation", "reflection", "enlargement", "geometric transformations"],
        keywords: ["image", "object", "invariant", "centre of rotation", "mirror line", "scale factor", "isometry", "maps onto"],
        tools: [{ k: "activity", label: "Cut a scalene triangle from card and trace it after each move on coordinate paper; tabulate how the coordinates change" }]
    },
    {
        id: "constructions", name: "Geometric Constructions", domain: "m-geometry", level: 3,
        desc: "Build exact figures with only a compass and an unmarked straightedge — no measuring allowed. The constraint is the point: every construction is a proof you can hold, and it forces you to know why a bisector bisects.",
        grades: [6, 7, 9, 10],
        tracks: ["school-middle", "school-high"],
        prereqs: ["angles-lines", "triangles"],
        related: ["triangle-congruence", "euclid-axioms", "circles-geometry"],
        aliases: ["practical geometry", "ruler and compass constructions", "compass constructions", "constructions"],
        keywords: ["compass", "straightedge", "perpendicular bisector", "angle bisector", "60 degree angle", "arc", "locus", "construct a triangle"],
        misconceptions: ["Measuring with a ruler and calling the result a construction"],
        tools: [{ k: "activity", label: "Construct a 60° angle, bisect it twice to get 15°, then check with a protractor — the compass wins" }]
    },
    {
        id: "circles-geometry", name: "Circles", domain: "m-geometry", level: 3,
        desc: "Every point the same distance from a centre — one condition that generates the most symmetric shape there is. Chords, arcs and tangents are all consequences of that single sentence.",
        grades: [6, 9, 10],
        tracks: ["school-middle", "school-high"],
        prereqs: ["angles-lines", "basic-shapes"],
        related: ["circle-measure", "circle-theorems", "constructions"],
        aliases: ["circle", "parts of a circle", "chord", "arc", "sector"],
        keywords: ["centre", "radius", "diameter", "chord", "arc", "sector", "segment", "circumference", "tangent", "secant", "concentric"],
        misconceptions: ["Using 'circle' for the disc — the circle is the boundary curve, not the region inside"],
        tools: [{ k: "activity", label: "Peg-and-string circle on the ground; then try to draw one freehand and measure how far off centre you drift" }]
    },
    {
        id: "circle-theorems", name: "Circle Theorems", domain: "m-geometry", level: 4,
        desc: "Surprising equalities that fall out of a circle's symmetry: equal chords sit equally far from the centre, the angle at the centre doubles the angle at the rim, and a tangent always meets the radius square-on. Each is a one-diagram proof.",
        grades: [9, 10],
        syllabusRefs: ["ncert:10:math:10"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["circles-geometry", "triangle-congruence"],
        related: ["proof-methods", "constructions"],
        aliases: ["angle in a semicircle", "cyclic quadrilateral", "tangent to a circle", "properties of circles"],
        keywords: ["angle subtended", "central angle", "inscribed angle", "cyclic quadrilateral", "opposite angles supplementary", "tangent perpendicular to radius", "equal chords", "alternate segment"],
        misconceptions: ["Thinking a tangent must touch the circle at two points to be a straight line through it"],
        tools: [{ k: "activity", label: "Pin two nails as a diameter and slide a set square around the arc — the right angle never leaves the semicircle" }]
    },
    {
        id: "coordinate-geometry", name: "Coordinate Geometry", domain: "m-geometry", level: 4,
        desc: "Do geometry by algebra: distance from Pythagoras, midpoints by averaging, and a proof about triangles becomes a calculation. The cost is losing the picture; the gain is that the method never needs cleverness.",
        grades: [9, 10, 11],
        syllabusRefs: ["ncert:10:math:7"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["graphs-coordinates", "pythagoras"],
        related: ["latitude-longitude", "linear-graphs", "transformations"],
        aliases: ["analytical geometry", "cartesian geometry", "distance formula", "section formula"],
        keywords: ["distance formula", "midpoint formula", "section formula", "collinear points", "area of a triangle from coordinates", "√((x₂−x₁)² + (y₂−y₁)²)"],
        misconceptions: ["Subtracting coordinates in the wrong order and expecting a negative distance"],
        tools: [{ k: "activity", label: "Grid the school ground with chalk, mark three flags, and check by tape measure that the distance formula was right" }]
    },
    {
        id: "solid-shapes", name: "Solid Shapes", domain: "m-geometry", level: 2,
        desc: "Cubes, cuboids, cones, cylinders, spheres — shapes with an inside. Counting faces, edges and vertices is where geometry stops being flat and children first meet a genuine three-dimensional object as an object.",
        grades: [5, 6, 7, 8],
        tracks: ["school-primary", "school-middle"],
        prereqs: ["basic-shapes"],
        related: ["3d-visualisation", "surface-area", "volume"],
        aliases: ["3D shapes", "solids", "visualising solid shapes", "polyhedra"],
        keywords: ["cube", "cuboid", "cone", "cylinder", "sphere", "prism", "pyramid", "face", "edge", "vertex", "net", "Euler's formula", "F + V − E = 2"],
        misconceptions: ["Calling a sphere a circle, and a cube a square — using the flat name for the solid"],
        tools: [{ k: "activity", label: "Fold nets into cube, prism and pyramid; tabulate F, V and E for each and spot Euler's F + V − E = 2" }]
    },
    {
        id: "3d-visualisation", name: "3D Visualisation", domain: "m-geometry", level: 3,
        desc: "Holding a solid in your head and turning it: which net folds into which box, what a cone looks like sliced, what the view from above shows. It is a trainable skill, not a talent — and it is the one geometry most transfers to engineering and to the sky.",
        grades: [7, 8],
        tracks: ["school-middle", "school-high"],
        prereqs: ["solid-shapes"],
        related: ["model-thinking", "earth-globe", "transformations"],
        aliases: ["spatial visualisation", "visualising solid shapes", "nets and views", "spatial reasoning"],
        keywords: ["net", "top view", "front view", "side view", "elevation", "plan", "cross-section", "isometric", "oblique sketch", "mental rotation"],
        tools: [{ k: "activity", label: "Build a 5-cube shape from blocks behind a screen and describe only its three views; a partner must rebuild it" }]
    },

    // ==================================================================
    // MEASUREMENT & MENSURATION
    // ==================================================================
    {
        id: "units-measurement", name: "Units & Measurement", domain: "m-mensuration", level: 1,
        desc: "Measuring is counting a chosen unit — which is why 'how long?' has no answer until someone names the unit. Standard units exist because a handspan is not the same for you and me, and trade collapsed until they did.",
        grades: [1, 2, 3, 4, 5, 6],
        tracks: ["school-foundation", "school-primary", "school-middle"],
        prereqs: [],
        related: ["unit-conversion", "perimeter-area", "data-collection"],
        aliases: ["measurement", "standard units", "non-standard units", "measuring length"],
        keywords: ["metre", "centimetre", "kilogram", "litre", "second", "handspan", "cubit", "unit", "scale", "least count", "estimate then measure"],
        misconceptions: ["Reading a ruler from its end rather than from the zero mark"],
        tools: [{ k: "activity", label: "Measure the classroom in handspans with every child, list the answers, and let the class conclude a standard unit is needed" }]
    },
    {
        id: "unit-conversion", name: "Unit Conversion", domain: "m-mensuration", level: 2,
        desc: "The same quantity, renamed: 2.5 km and 2500 m are one length wearing two labels. Multiply-or-divide is decided by one question — will there be more of the smaller unit or fewer? — and area and volume scale by the square and cube, which everyone forgets once.",
        grades: [4, 5, 6, 7],
        tracks: ["school-primary", "school-middle", "school-high"],
        prereqs: ["units-measurement", "four-operations"],
        related: ["decimals", "ratio-proportion", "scientific-notation"],
        aliases: ["converting units", "changing units", "metric conversion"],
        keywords: ["km to m", "kg to g", "ml to l", "conversion factor", "multiply or divide", "cm² to m²", "prefix", "kilo", "centi", "milli"],
        misconceptions: ["Converting 1 m² to 100 cm² instead of 10 000 cm² — scaling area by the linear factor"],
        tools: [{ k: "activity", label: "Tile a 1 m² square with 1 cm² paper squares — or start to; the count needed settles the area-conversion argument" }]
    },
    {
        id: "perimeter-area", name: "Perimeter & Area", domain: "m-mensuration", level: 2,
        desc: "Perimeter is fence, area is floor — and they are genuinely independent, which is why two fields with the same fencing can hold very different amounts of crop. Area is counted in squares; the formulas are just shortcuts for that counting.",
        grades: [4, 5, 6, 7],
        tracks: ["school-primary", "school-middle"],
        prereqs: ["units-measurement", "basic-shapes"],
        related: ["area-triangle", "circle-measure", "polygons", "quadrilaterals"],
        aliases: ["mensuration", "area and perimeter", "area of rectangle", "perimeter of a rectangle"],
        keywords: ["boundary", "square units", "cm²", "m²", "length × breadth", "area of a square", "compound shapes", "hectare"],
        misconceptions: ["Assuming shapes with equal perimeter must have equal area"],
        tools: [{ k: "activity", label: "Make every rectangle with perimeter 20 cm from a string loop, tabulate areas, and find which one wins" }]
    },
    {
        id: "area-triangle", name: "Area of a Triangle", domain: "m-mensuration", level: 3,
        desc: "Half base times height, because two copies of any triangle make a parallelogram. The catch is that the height must be perpendicular to the base you chose — not the slanted side that looks like it should be.",
        grades: [6, 7, 8, 9],
        tracks: ["school-middle", "school-high"],
        prereqs: ["perimeter-area", "triangles"],
        related: ["herons-formula", "coordinate-geometry", "trig-applications"],
        aliases: ["triangle area", "half base times height", "area of triangles"],
        keywords: ["½ × b × h", "base", "perpendicular height", "altitude", "parallelogram", "same base same parallels"],
        misconceptions: ["Using a slanted side as the height because it is the number the diagram offers"],
        tools: [{ k: "activity", label: "Cut two identical triangles and rotate one onto the other — a parallelogram appears, and the half is obvious" }]
    },
    {
        id: "herons-formula", name: "Heron's Formula", domain: "m-mensuration", level: 3,
        desc: "Get a triangle's area from its three sides alone, with no height to be found or measured. It is exactly what a surveyor with a tape and no set square needs, and it works for the most awkward scalene field.",
        grades: [9],
        tracks: ["school-high", "olympiad"],
        prereqs: ["area-triangle", "squares-roots"],
        related: ["pythagoras"],
        aliases: ["Heron's formula", "Hero's formula", "semi-perimeter formula"],
        keywords: ["s = (a+b+c)/2", "semi-perimeter", "√(s(s−a)(s−b)(s−c))", "scalene", "area from three sides"],
        tools: [{ k: "activity", label: "Tape-measure a triangular patch of ground, apply Heron's formula, then check it against ½ base × height" }]
    },
    {
        id: "circle-measure", name: "Circumference & Area of a Circle", domain: "m-mensuration", level: 3,
        desc: "Every circle, however big, has circumference exactly π times its diameter — a constant that no measurement gets to vote on. Area is πr², which you can see by cutting the circle into sectors and combing them into a rectangle.",
        grades: [7, 8, 10],
        tracks: ["school-middle", "school-high"],
        prereqs: ["perimeter-area", "circles-geometry"],
        related: ["angles-radians", "real-numbers"],
        aliases: ["circumference", "area of a circle", "pi", "areas related to circles", "sector area"],
        keywords: ["π", "2πr", "πr²", "22/7", "3.14159", "arc length", "sector", "segment", "diameter"],
        misconceptions: ["Believing π is exactly 22/7, since that is the value used in every sum"],
        tools: [{ k: "activity", label: "Wrap thread round five round lids, measure each circumference and diameter, and divide — π shows up every time" }]
    },
    {
        id: "surface-area", name: "Surface Area", domain: "m-mensuration", level: 3,
        desc: "How much paper would wrap it — found by unfolding the solid into its net and adding up flat areas. Curved surfaces need a trick, and the reason a cylinder's curved surface is 2πrh is that it unrolls into a plain rectangle.",
        grades: [8, 9, 10],
        tracks: ["school-middle", "school-high"],
        prereqs: ["perimeter-area", "solid-shapes"],
        related: ["volume", "3d-visualisation"],
        aliases: ["total surface area", "lateral surface area", "curved surface area", "surface areas and volumes", "TSA"],
        keywords: ["net", "TSA", "CSA", "LSA", "2πrh", "4πr²", "πrl", "slant height", "unfold"],
        misconceptions: ["Assuming the solid with the largest volume must also have the largest surface area"],
        tools: [{ k: "activity", label: "Unroll a paper label from a tin and measure the rectangle you get — its sides are 2πr and h" }]
    },
    {
        id: "volume", name: "Volume & Capacity", domain: "m-mensuration", level: 3,
        desc: "How many unit cubes fit inside — and for irregular things, how much water gets displaced. The cone-is-a-third-of-the-cylinder result is worth pouring rather than proving the first time you meet it.",
        grades: [5, 6, 8, 9, 10],
        tracks: ["school-primary", "school-middle", "school-high"],
        prereqs: ["units-measurement", "solid-shapes"],
        related: ["surface-area", "unit-conversion"],
        aliases: ["capacity", "volume of a cuboid", "surface areas and volumes", "displacement"],
        keywords: ["cubic units", "cm³", "m³", "litre", "l × b × h", "πr²h", "⅓πr²h", "4/3πr³", "displacement", "1 litre = 1000 cm³"],
        misconceptions: ["Thinking a tall thin glass holds more than a short wide one just because it looks bigger"],
        tools: [{ k: "activity", label: "Make a cone and a cylinder of the same radius and height; it takes exactly three coneloads of sand to fill the cylinder" }]
    },

    // ==================================================================
    // DATA, STATISTICS & PROBABILITY
    // ==================================================================
    {
        id: "data-collection", name: "Collecting & Organising Data", domain: "m-data", level: 1,
        desc: "Before any statistic there is a decision: what to count, from whom, and how to record it without cheating yourself. Tally marks and a tidy table are unglamorous, but a badly collected number cannot be rescued by clever analysis later.",
        grades: [3, 4, 5, 6, 7],
        tracks: ["school-primary", "school-middle"],
        prereqs: [],
        related: ["bar-line-graphs", "mean-median-mode", "units-measurement"],
        aliases: ["data handling", "tally marks", "raw data", "organising data", "frequency table"],
        keywords: ["tally", "frequency", "observation", "survey", "sample", "raw data", "table", "categorical", "numerical"],
        misconceptions: ["Believing that asking only your own friends still gives a picture of the whole school"],
        tools: [{ k: "activity", label: "Run a one-question survey across three different classes and compare answers — then argue about who you asked" }]
    },
    {
        id: "bar-line-graphs", name: "Bar & Line Graphs", domain: "m-data", level: 2,
        desc: "A picture that makes comparison instant: bars for separate categories, lines for something changing continuously. Choosing wrongly between them is a real error — a line graph of favourite fruits implies fruits in between.",
        grades: [4, 5, 6, 7, 8],
        tracks: ["school-primary", "school-middle"],
        prereqs: ["data-collection"],
        related: ["pie-charts", "histograms-frequency", "misleading-graphs", "graphs-coordinates"],
        aliases: ["bar chart", "bar graph", "line graph", "double bar graph", "pictograph"],
        keywords: ["axis", "scale", "bar", "category", "title", "legend", "pictograph", "double bar", "trend"],
        misconceptions: ["Reading a bar as twice as big when the axis starts at 50 rather than 0"],
        tools: [{ k: "activity", label: "Plot the class's daily screen time as bars, then as a line, and debate aloud which one lies less" }]
    },
    {
        id: "pie-charts", name: "Pie Charts", domain: "m-data", level: 3,
        desc: "A circle sliced so each sector's angle is its share of 360°. Pie charts show parts of one whole and nothing else — which is why comparing two pies of different sizes is almost always a mistake.",
        grades: [5, 8],
        tracks: ["school-primary", "school-middle", "school-high"],
        prereqs: ["data-collection", "fractions"],
        related: ["percentages", "angles-protractor", "bar-line-graphs"],
        aliases: ["pie chart", "circle graph", "sector graph"],
        keywords: ["sector", "central angle", "360 degrees", "share", "proportion", "slice", "percentage of total"],
        misconceptions: ["Comparing slices across two pie charts drawn for totals of very different size"],
        tools: [{ k: "activity", label: "Turn the class's travel-to-school data into a pie chart with a protractor, then check the angles total 360°" }]
    },
    {
        id: "histograms-frequency", name: "Histograms & Frequency Distributions", domain: "m-data", level: 3,
        desc: "Group continuous data into intervals and the shape of the whole distribution finally appears — peaked, flat, or lopsided. Unlike a bar chart the bars touch, because the underlying scale never had gaps in it.",
        grades: [8, 9, 11],
        tracks: ["school-middle", "school-high"],
        prereqs: ["bar-line-graphs"],
        related: ["mean-median-mode", "range-spread", "standard-deviation"],
        aliases: ["histogram", "frequency distribution", "grouped data", "frequency polygon", "class intervals"],
        keywords: ["class interval", "class width", "frequency", "cumulative frequency", "ogive", "bars touch", "continuous data", "skewed", "distribution"],
        misconceptions: ["Treating a histogram as a bar chart and reordering the bars to look tidier"],
        tools: [{ k: "activity", label: "Measure everyone's height, group into 5 cm bins and build the histogram with sticky notes on the board" }]
    },
    {
        id: "mean-median-mode", name: "Mean, Median & Mode", domain: "m-data", level: 3,
        desc: "Three different answers to 'what is typical?' — the balance point, the middle one, the commonest. They disagree exactly when the data is lopsided, which is why quoting average income tells you less than the median does.",
        grades: [7, 8, 9, 10, 11],
        tracks: ["school-middle", "school-high"],
        prereqs: ["data-collection", "four-operations"],
        related: ["range-spread", "histograms-frequency", "misleading-graphs"],
        aliases: ["averages", "measures of central tendency", "arithmetic mean", "median", "mode"],
        keywords: ["average", "central tendency", "sum ÷ count", "middle value", "most frequent", "outlier", "x̄", "assumed mean method", "skew"],
        misconceptions: ["Treating 'average' as always meaning the mean, and quoting it even when one huge outlier drags it"],
        tools: [{ k: "activity", label: "Compute all three averages for the class's monthly pocket money, then add one imaginary crorepati and recompute" }]
    },
    {
        id: "range-spread", name: "Range & Spread", domain: "m-data", level: 3,
        desc: "Two datasets can share a mean and be nothing alike — one clustered tight, the other all over the place. Spread is the second question you must always ask, and range is the crudest way of asking it.",
        grades: [9, 10, 11],
        tracks: ["school-high"],
        prereqs: ["mean-median-mode"],
        related: ["standard-deviation", "histograms-frequency"],
        aliases: ["range", "dispersion", "measures of dispersion", "spread", "interquartile range"],
        keywords: ["max minus min", "quartile", "IQR", "median", "box plot", "variability", "consistent", "mean deviation"],
        misconceptions: ["Judging two datasets identical because their means match"],
        tools: [{ k: "activity", label: "Two batsmen average 40 each — hand out their ten innings scores and decide who you would pick, and why" }]
    },
    {
        id: "standard-deviation", name: "Standard Deviation", domain: "m-data", level: 4,
        desc: "The typical distance of a value from the mean — spread measured properly, using every data point rather than just the two extremes. Squaring before averaging is not decoration: it stops the pluses and minuses cancelling to zero.",
        grades: [11],
        tracks: ["school-high", "olympiad"],
        prereqs: ["range-spread", "squares-roots"],
        related: ["histograms-frequency", "probability-events"],
        aliases: ["SD", "variance", "root mean square deviation", "sigma"],
        keywords: ["σ", "variance", "deviation from mean", "Σ(x − x̄)²", "spread", "normal distribution", "coefficient of variation"],
        misconceptions: ["Averaging the raw deviations from the mean and being surprised the answer is always zero"],
        tools: [{ k: "activity", label: "Compute the SD of two cricketers' scores by hand, once with the squares and once without, and see why the squares are needed" }]
    },
    {
        id: "misleading-graphs", name: "Misleading Graphs", domain: "m-data", level: 3,
        desc: "A truncated axis, a 3D pie, a cherry-picked window — every one lets an honest number tell a dishonest story. Learning to draw graphs and learning to distrust them are the same lesson.",
        grades: [8, 9, 10],
        tracks: ["school-middle", "school-high"],
        prereqs: ["bar-line-graphs"],
        related: ["mean-median-mode", "pie-charts", "model-thinking"],
        aliases: ["graph literacy", "distorted graphs", "how to lie with statistics", "misleading charts"],
        keywords: ["truncated axis", "broken scale", "cherry-picking", "3D effect", "correlation is not causation", "double y-axis", "sample size"],
        misconceptions: ["Trusting a graph because the numbers on it are correct, without ever checking the axis"],
        tools: [{ k: "activity", label: "Take one real dataset and draw it twice — once to alarm, once to reassure — using no false numbers at all" }]
    },
    {
        id: "probability-basics", name: "Probability", domain: "m-data", level: 2,
        desc: "Put a number between 0 and 1 on how likely something is: count the favourable outcomes, divide by all of them — provided every outcome really is equally likely. Chance is not a force; a coin has no memory of the last five heads.",
        grades: [8, 9, 10],
        tracks: ["school-middle", "school-high"],
        prereqs: ["fractions"],
        related: ["probability-events", "data-collection"],
        aliases: ["chance", "likelihood", "theoretical probability", "experimental probability"],
        keywords: ["outcome", "event", "favourable", "equally likely", "sample space", "P(E)", "impossible", "certain", "fair coin", "die"],
        misconceptions: ["The gambler's fallacy: expecting a tail because five heads have just come up"],
        tools: [{ k: "activity", label: "Toss a coin 200 times as a class and watch the running fraction of heads wobble in towards 0.5 without ever being forced there" }]
    },
    {
        id: "probability-events", name: "Probability of Compound Events", domain: "m-data", level: 4,
        desc: "Chances of 'A and B' and 'A or B', where the whole difficulty is whether the events interfere with each other. Independent events multiply; overlapping ones must not be double-counted — which is exactly what a Venn diagram prevents.",
        grades: [11, 12],
        syllabusRefs: ["ncert:12:math:13"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["probability-basics", "sets-venn"],
        related: ["standard-deviation", "logical-statements"],
        aliases: ["compound probability", "conditional probability", "addition theorem of probability", "independent events"],
        keywords: ["P(A ∩ B)", "P(A ∪ B)", "mutually exclusive", "independent", "conditional", "P(A|B)", "Bayes theorem", "tree diagram", "with replacement"],
        misconceptions: ["Adding probabilities for events that can happen together, and counting the overlap twice"],
        tools: [{ k: "activity", label: "Draw two counters from a bag with and without replacement, 100 trials each; the tree diagram predicts both, differently" }]
    },

    // ==================================================================
    // TRIGONOMETRY
    // ==================================================================
    {
        id: "angles-radians", name: "Radian Measure", domain: "m-trig", level: 4,
        desc: "Measure an angle by the arc it cuts on a unit circle and the degree — an arbitrary Babylonian 360 — becomes unnecessary. Radians are the units in which arc length is just rθ, and in which calculus on sines works at all.",
        grades: [11],
        syllabusRefs: ["ncert:11:math:3"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["angles-lines", "circle-measure"],
        related: ["trig-ratios", "trig-functions-graphs"],
        aliases: ["radians", "radian", "circular measure", "degree and radian measure"],
        keywords: ["rad", "π radians = 180°", "2π", "arc length = rθ", "unit circle", "π/6", "conversion", "angular measure"],
        misconceptions: ["Treating radians as just another name for degrees and leaving the calculator in the wrong mode"],
        tools: [{ k: "activity", label: "Lay a string of length r along a circle's rim — the angle it subtends is 1 radian, and it takes a bit over six to go round" }]
    },
    {
        id: "trig-ratios", name: "Trigonometric Ratios", domain: "m-trig", level: 4,
        desc: "In a right triangle the side ratios depend only on the angle, never on the size — so sin, cos and tan can be tabulated once and used forever. This is similar triangles cashed out as a lookup table, and it is how the Earth was first measured.",
        grades: [10, 11],
        syllabusRefs: ["ncert:10:math:8"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["triangle-similarity", "pythagoras"],
        related: ["trig-identities", "trig-applications", "angles-radians"],
        aliases: ["trigonometry", "sine cosine tangent", "introduction to trigonometry", "trigonometric ratios", "SOH CAH TOA"],
        keywords: ["sin", "cos", "tan", "cosec", "sec", "cot", "opposite", "adjacent", "hypotenuse", "SOHCAHTOA", "30-60-90", "standard angles", "jya"],
        misconceptions: ["Thinking sin θ means sin multiplied by θ", "Expecting the ratios to change if the triangle is drawn bigger"],
        tools: [{ k: "activity", label: "Draw three right triangles with a 35° angle in different sizes, measure all sides, and find opposite/hypotenuse is the same each time" }]
    },
    {
        id: "trig-identities", name: "Trigonometric Identities", domain: "m-trig", level: 4,
        desc: "Relations true for every angle — sin²θ + cos²θ = 1 above all, which is just Pythagoras written in ratios. They are the grammar that lets a monstrous trig expression collapse to a single term.",
        grades: [10, 11],
        syllabusRefs: ["ncert:10:math:8", "ncert:11:math:3"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["trig-ratios"],
        related: ["algebraic-identities", "pythagoras", "trig-functions-graphs"],
        aliases: ["trigonometric identities", "Pythagorean identity", "compound angle formulae"],
        keywords: ["sin²θ + cos²θ = 1", "1 + tan²θ = sec²θ", "complementary angles", "sin(A+B)", "double angle", "prove that", "LHS = RHS"],
        misconceptions: ["Reading sin²θ as sin(θ²)"],
        tools: [{ k: "activity", label: "Plot sin²θ and cos²θ from a table of values and add the columns — the total is 1 in every row" }]
    },
    {
        id: "trig-applications", name: "Heights & Distances", domain: "m-trig", level: 4,
        desc: "Measure what you cannot reach: a tower, a cliff, the Moon. One angle from a known baseline plus a tangent is enough — the same move whether the target is a temple gopuram or a planet.",
        grades: [10],
        syllabusRefs: ["ncert:10:math:9"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["trig-ratios"],
        related: ["angles-protractor", "area-triangle", "maps-scale", "speed-distance-time"],
        aliases: ["some applications of trigonometry", "heights and distances", "angle of elevation", "angle of depression"],
        keywords: ["angle of elevation", "angle of depression", "line of sight", "horizontal", "baseline", "clinometer", "theodolite", "parallax"],
        misconceptions: ["Forgetting to add the observer's own eye height back onto the calculated height"],
        tools: [{ k: "activity", label: "Build a straw-and-protractor clinometer and measure the school building's height from two distances; the answers should agree" }]
    },
    {
        id: "trig-functions-graphs", name: "Trigonometric Functions & Their Graphs", domain: "m-trig", level: 5,
        desc: "Let the angle run past 90° and keep going, and sine stops being a triangle ratio and becomes a wave that repeats forever. That wave is the mathematical shape of everything periodic — tides, sound, orbits, alternating current.",
        grades: [11],
        syllabusRefs: ["ncert:11:math:3"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["trig-ratios", "angles-radians", "functions-concept"],
        related: ["trig-identities", "derivatives"],
        aliases: ["trigonometric functions", "sine curve", "sine wave", "periodic functions", "unit circle definition"],
        keywords: ["period", "amplitude", "unit circle", "sin x graph", "cos x graph", "2π periodic", "phase", "all silver tea cups", "quadrant signs"],
        misconceptions: ["Believing sine is undefined beyond 90° because a triangle cannot have two obtuse angles"],
        tools: [{ k: "activity", label: "Roll a marked wheel along a line and plot the height of the mark against distance travelled — a sine curve draws itself" }]
    },

    // ==================================================================
    // CALCULUS & CHANGE
    // ==================================================================
    {
        id: "rate-of-change", name: "Rate of Change", domain: "m-calculus", level: 4,
        desc: "How fast one quantity moves when another does — speed is just distance's rate against time. Average rate is a slope between two points; the whole of calculus starts with wanting that answer at a single instant instead.",
        grades: [11, 12],
        tracks: ["school-high"],
        prereqs: ["linear-graphs", "functions-concept"],
        related: ["speed-distance-time", "derivatives", "limits-intro"],
        aliases: ["rates of change", "average rate of change", "gradient as a rate"],
        keywords: ["slope", "Δy/Δx", "per second", "average rate", "instantaneous rate", "steepness", "chord", "gradient"],
        misconceptions: ["Confusing a large value with a fast-changing one — a big quantity can be perfectly steady"],
        tools: [{ k: "activity", label: "Fill a bottle from a tap, record depth every 10 s, and plot it; the slope is the filling rate, and it changes where the bottle narrows" }]
    },
    {
        id: "limits-intro", name: "Limits", domain: "m-calculus", level: 5,
        desc: "What a function is heading towards as the input closes in — regardless of whether it ever arrives, or is even defined there. This careful dodge around 0/0 is what makes instantaneous speed a legitimate idea rather than a contradiction.",
        grades: [11],
        tracks: ["school-high", "olympiad"],
        prereqs: ["functions-concept"],
        related: ["real-numbers", "derivatives", "sequences-series"],
        aliases: ["limit", "limits and derivatives", "tends to", "approaching a value"],
        keywords: ["lim", "x → a", "approaches", "tends to", "left hand limit", "right hand limit", "indeterminate form", "0/0", "continuity"],
        misconceptions: ["Thinking the limit at x = a must be the value of the function at a"],
        tools: [{ k: "activity", label: "Tabulate (x² − 1)/(x − 1) at x = 0.9, 0.99, 0.999 — the answer marches to 2 at a point where the formula itself is 0/0" }]
    },
    {
        id: "derivatives", name: "Derivatives", domain: "m-calculus", level: 5,
        desc: "The slope of a curve at one point, got by sliding a chord until its two ends merge. It converts a graph into another graph of its own steepness, which is how you find maxima, minima and the exact speed at 3 o'clock.",
        grades: [11, 12],
        syllabusRefs: ["ncert:12:math:5", "ncert:12:math:6"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["limits-intro", "rate-of-change"],
        related: ["integration-intro", "trig-functions-graphs", "polynomials"],
        aliases: ["differentiation", "derivative", "differential calculus", "first principles", "continuity and differentiability"],
        keywords: ["dy/dx", "f'(x)", "tangent", "first principles", "chain rule", "product rule", "maxima and minima", "stationary point", "second derivative"],
        misconceptions: ["Reading dy/dx as d times y divided by d times x — a fraction rather than one symbol for a limit"],
        tools: [{ k: "activity", label: "Draw y = x² large, lay a ruler as a chord between x = 1 and x = 1.5, then 1.1, then 1.01 — watch it settle onto slope 2" }]
    },
    {
        id: "integration-intro", name: "Integration", domain: "m-calculus", level: 5,
        desc: "Add up infinitely many infinitely thin slices and get an exact area — or a total from a rate. The astonishment is the Fundamental Theorem: this summing turns out to be differentiation run backwards, which nothing in the setup promised.",
        grades: [12],
        syllabusRefs: ["ncert:12:math:7", "ncert:12:math:8"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["derivatives"],
        related: ["circle-measure", "volume", "sequences-series"],
        aliases: ["integral calculus", "integration", "antiderivative", "definite integral", "area under a curve"],
        keywords: ["∫", "dx", "definite integral", "indefinite integral", "constant of integration", "+C", "limits of integration", "fundamental theorem of calculus", "area under the curve", "Riemann sum"],
        misconceptions: ["Dropping the + C from an indefinite integral, as if the antiderivative were unique"],
        tools: [{ k: "activity", label: "Estimate the area under a curve by counting graph-paper squares, then halve the square size twice and watch the estimate converge" }]
    },

    // ==================================================================
    // REASONING & PROOF
    // ==================================================================
    {
        id: "logical-statements", name: "Statements & Logic", domain: "m-reason", level: 3,
        desc: "A mathematical statement is one that is definitely true or definitely false — no 'sort of'. Precision about and, or, not, and especially if–then is what separates an argument from an opinion, and 'if P then Q' does not give you 'if Q then P'.",
        grades: [9, 11],
        tracks: ["school-high", "olympiad"],
        prereqs: [],
        related: ["proof-methods", "sets-venn", "inequalities"],
        aliases: ["mathematical reasoning", "logic", "statements", "propositions", "if-then statements"],
        keywords: ["true or false", "negation", "and", "or", "if-then", "implies", "converse", "contrapositive", "counterexample", "for all", "there exists", "necessary and sufficient"],
        misconceptions: ["Assuming a statement's converse is automatically true once the statement is proved"],
        tools: [{ k: "activity", label: "Write 'if it is a square then it has four sides', then its converse and contrapositive, and decide which are true" }]
    },
    {
        id: "sets-venn", name: "Sets & Venn Diagrams", domain: "m-reason", level: 3,
        desc: "A set is just a well-defined collection — the trick is that 'well-defined' is the whole of the work. Venn diagrams turn overlapping-membership questions into pictures, and make double-counting visible instead of theoretical.",
        grades: [11],
        syllabusRefs: ["ncert:11:math:1"],
        tracks: ["school-high", "olympiad"],
        prereqs: ["logical-statements"],
        related: ["probability-events", "functions-concept"],
        aliases: ["sets", "set theory", "Venn diagram", "union and intersection"],
        keywords: ["∈", "⊂", "∪", "∩", "universal set", "complement", "empty set", "φ", "subset", "disjoint", "cardinality", "n(A ∪ B) = n(A) + n(B) − n(A ∩ B)"],
        misconceptions: ["Treating {0} and the empty set as the same thing — one holds an element, the other holds nothing"],
        tools: [{ k: "activity", label: "Two hula hoops on the floor: students stand in 'wears glasses' and 'plays cricket', and settle live who belongs in the overlap" }]
    },
    {
        id: "proof-methods", name: "Methods of Proof", domain: "m-reason", level: 4,
        desc: "Checking a hundred cases is not proof; a single counterexample is disproof. Direct proof, contradiction and the contrapositive are the standard routes from things agreed to things established — the actual product mathematics sells.",
        grades: [9, 10, 11],
        tracks: ["school-high", "olympiad"],
        prereqs: ["logical-statements"],
        related: ["euclid-axioms", "triangle-congruence", "mathematical-induction", "real-numbers"],
        aliases: ["proof", "mathematical proof", "proof by contradiction", "counterexample", "deductive reasoning"],
        keywords: ["theorem", "given", "to prove", "QED", "hence proved", "contradiction", "contrapositive", "counterexample", "conjecture", "deductive", "without loss of generality"],
        misconceptions: ["Believing that a pattern holding for the first ten numbers proves it holds for all of them"],
        tools: [{ k: "activity", label: "Meet the proof that √2 is irrational, then hunt a counterexample to 'n² + n + 41 is always prime' — it survives 39 tries" }]
    },
    {
        id: "mathematical-induction", name: "Mathematical Induction", domain: "m-reason", level: 5,
        desc: "Prove it for the first case, then prove each case forces the next — and infinitely many statements fall like dominoes. It feels like a cheat the first time, which is precisely why the base case must never be skipped.",
        grades: [11],
        tracks: ["school-high", "olympiad"],
        prereqs: ["proof-methods", "sequences-series"],
        related: ["arithmetic-progression", "patterns-generalisation"],
        aliases: ["principle of mathematical induction", "induction", "PMI"],
        keywords: ["base case", "inductive step", "inductive hypothesis", "P(n)", "P(k) implies P(k+1)", "true for all n", "dominoes"],
        misconceptions: ["Skipping the base case and 'proving' something false, since the inductive step alone proves nothing"],
        tools: [{ k: "activity", label: "Stand a line of dominoes with one gap; the induction step holds everywhere but the chain still stops — that gap is a missing base case" }]
    }
);
