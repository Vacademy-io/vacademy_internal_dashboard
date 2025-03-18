export const QUESTION_TYPES = [
    { code: "MCQS", display: "Multiple Choice (Single)" },
    { code: "MCQM", display: "Multiple Choice (Multiple)" },
    { code: "NUMERIC", display: "Numeric Answer" },
    { code: "CMCQS", display: "Comprehensive Multiple Choice (Single)" },
    { code: "CMCQM", display: "Comprehensive Multiple Choice (Multiple)" },
    { code: "CNUMERIC", display: "Comprehensive Numeric Answer" },
];

export enum QuestionType {
    MCQS = "MCQS",
    MCQM = "MCQM",
    NUMERIC = "NUMERIC",
    CMCQS = "CMCQS",
    CMCQM = "CMCQM",
    CNUMERIC = "CNUMERIC",
}

export const NUMERIC_TYPES = [
    "SINGLE_DIGIT_NON_NEGATIVE_INTEGER", // 0 - 9 integers
    "INTEGER", // positive and negative integers
    "POSITIVE_INTEGER", // all positive integers
    "DECIMAL",
];

export const QUESTION_LABELS = ["(1.)", "1.)", "(1)", "1)"];
export const OPTIONS_LABELS = ["(a.)", "a.)", "(a)", "a)", "(A.)", "A.)", "(A)", "A)"];
export const ANSWER_LABELS = ["Ans:", "Answer:", "Ans.", "Answer."];
export const EXPLANATION_LABELS = ["Exp:", "Explanation:", "Exp.", "Explanation."];
export const scheduleTestTabsData = [
    {
        value: "liveTests",
        message: "No tests are currently live.",
    },
    {
        value: "upcomingTests",
        message: "No upcoming tests scheduled.",
    },
    {
        value: "previousTests",
        message: "No previous tests available.",
    },
];

export const timeLimit = ["1 min", "2 min", "3 min", "5 min", "10 min", "15 min"];

export const EvaluationType = ["Auto", "Manual", "PDF", "VIDEO"];
