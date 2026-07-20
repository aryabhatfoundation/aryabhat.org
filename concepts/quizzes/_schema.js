// ============================================================
// Aryabhat Quiz Layer — schema & taxonomy.
//
// LOAD ORDER MATTERS. This file must be the first of the
// quizzes/*.js scripts: it declares the taxonomy and creates
// window.QUESTIONS and window.QUIZZES, which every bank file
// push()es into. It loads AFTER the concept and course data.
//
// ------------------------------------------------------------
// WHY A THIRD LAYER
// ------------------------------------------------------------
// A concept says what an idea is. A course says when it is taught.
// A quiz asks whether it landed. Keeping them apart means one
// question bank serves every course: a question about the pole star
// is the same question whether it is an entry check for the camp or
// an end-of-year paper for class 8.
//
// Every question names the ONE concept it tests. That single tag is
// what makes the rest work — it lets us ask which concepts a course
// tests, which it teaches but never tests, and (the important one)
// whether an "entry" quiz is honestly testing prior knowledge rather
// than quietly examining material the course has not taught yet.
//
// ------------------------------------------------------------
// QUESTION RECORD
// ------------------------------------------------------------
// Required:
//   id       : stable slug, conventionally q-<concept>-NN
//   concept  : the concept id under test — exactly one
//   kind     : a key of QUESTION_KINDS
//   stem     : the question as asked
//
// Required by kind:
//   mcq      : options[] — each { text, correct?, diagnoses? }
//              exactly one option carries correct: true
//
//              AUTHOR THE CORRECT OPTION FIRST. It reads better in
//              source and it is the only convention that survives
//              editing. The order you write is NOT the order anyone
//              sees: QuizDB.build() applies a permutation derived from
//              the question id, so (a) is not always the answer and
//              every consumer — web page, paper, key, CLI — letters
//              the options identically. Consequence worth knowing:
//              renaming a question id reshuffles its letters.
//   short    : answer — what a correct response must contain
//   practical: answer — what the assessor watches the student DO
//
// Optional:
//   explain    : why the answer is right; printed on the marker's copy
//   difficulty : 1 recall · 2 apply · 3 reason (default 2)
//   status     : "published" | "review" | "draft" (default published)
//   sources    : provenance, same meaning as elsewhere
//
// ------------------------------------------------------------
// `diagnoses` — THE POINT OF THIS WHOLE LAYER
// ------------------------------------------------------------
// A wrong option may carry `diagnoses`: the misconception a student
// reveals by picking it. Distractors are not filler to be guessed
// between — each one should be a wrong model somebody actually holds:
//
//   { text: "The Earth's shadow falls on the Moon",
//     diagnoses: "Phases as Earth's shadow — that is an eclipse" }
//
// Then a marked paper says "nine students hold the shadow model of
// phases", not "nine students scored 60%". One tells you what to
// reteach on Day 2; the other tells you nothing.
//
// The concept records already carry the documented misconceptions —
// `misconceptions` on each concept. Distractors should be drawn from
// there wherever the concept has them, and QuizDB warns when a
// question tests a concept with documented misconceptions but
// diagnoses none of them: a missed diagnostic opportunity.
//
// ------------------------------------------------------------
// QUIZ RECORD
// ------------------------------------------------------------
// Required:
//   id, name
//   purpose  : a key of QUIZ_PURPOSES
//   questions: ordered question ids
//
// Optional but strongly advised:
//   course   : the course id this quiz serves. Setting it turns on
//              the scope check below, which is the reason to bother.
//   session  : 1-based session number — REQUIRED when purpose is
//              "session".
//   blurb, duration (minutes), status, sources
//
// ------------------------------------------------------------
// THE SCOPE CHECK
// ------------------------------------------------------------
// Attach a quiz to a course and QuizDB enforces the thing that is
// easy to get wrong and impossible to see by eye:
//
//   entry   — every question must test a concept the course ASSUMES,
//             and must NOT test one the course teaches. An entry quiz
//             that examines the syllabus is not measuring readiness,
//             it is measuring clairvoyance.
//   session — every question must test a concept taught in that
//             session or earlier, or assumed. No asking on Day 1
//             about Day 3's material.
//   exit    — every question must test a concept the course actually
//             teaches or assumes.
//
// Same spirit as the course layer's prereq coverage: the graph knows
// what was taught and when, so the machine can check the paper.
// ============================================================

window.QUESTION_KINDS = {
    mcq:       { name: "Multiple choice",  needsOptions: true },
    short:     { name: "Short answer",     needsOptions: false },
    practical: { name: "Practical task",   needsOptions: false }
};

window.QUIZ_PURPOSES = {
    entry:   { name: "Entry check",  blurb: "What the learner is expected to arrive already knowing." },
    session: { name: "Session check", blurb: "Did this session land?" },
    exit:    { name: "Exit paper",   blurb: "The whole course, at the end." }
};

// 1 recall · 2 apply · 3 reason. A paper made only of 1s tests memory
// and nothing else; a paper made only of 3s fails everyone on time.
window.QUESTION_DIFFICULTY = {
    1: { name: "Recall",  hint: "States a fact taught directly" },
    2: { name: "Apply",   hint: "Uses the idea in a situation" },
    3: { name: "Reason",  hint: "Chains two ideas, or defends a claim" }
};

window.QUESTION_STATUS = window.CONCEPT_STATUS;

window.QUESTIONS = [];
window.QUIZZES = [];
