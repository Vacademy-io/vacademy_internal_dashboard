import { INSTITUTE_ID } from "@/constants/urls";
import { FilterOption } from "@/types/assessments/question-paper-filter";
import { Level, QuestionResponse, Subject } from "@/types/assessments/question-paper-template";
import {
    MyQuestion,
    MyQuestionPaperFormEditInterface,
    MyQuestionPaperFormInterface,
} from "@/types/assessments/question-paper-form";
import { useMutation } from "@tanstack/react-query";
import { QuestionType } from "@/constants/dummy-data";

export function formatStructure(structure: string, value: string | number): string {
    // If structure does not contain parentheses, just replace the number/letter with the value
    return structure.replace(/[a-zA-Z0-9]/, `${value}`);
}

export function transformFilterData(data: Record<string, FilterOption[]>) {
    const result: Record<string, string[] | string> = {};

    Object.keys(data).forEach((key) => {
        // Safely handle undefined and assign an empty array if necessary
        const items = data[key] || [];
        result[key] = items.map((item) => item.id);

        if (key === "name" && Array.isArray(result[key])) {
            // Perform join only if result[key] is an array
            result[key] = (result[key] as string[]).join("");
        }
    });

    return result;
}

export function transformQuestionPaperData(data: MyQuestionPaperFormInterface) {
    console.log("before url call data ", data);
    return {
        title: data.title,
        institute_id: INSTITUTE_ID, // Assuming there's no direct mapping for institute_id
        level_id: data.yearClass, // Assuming there's no direct mapping for level_id
        subject_id: data.subject, // Assuming there's no direct mapping for subject_id
        questions: data?.questions?.map((question) => {
            const options =
                question.questionType === QuestionType.MCQS ||
                question.questionType === QuestionType.CMCQS
                    ? question.singleChoiceOptions.map((opt, idx) => ({
                          id: null, // Assuming no direct mapping for option ID
                          preview_id: idx, // Using index as preview_id
                          question_id: null,
                          text: {
                              id: null, // Assuming no direct mapping for option text ID
                              type: "HTML", // Assuming option content is HTML
                              content: opt?.name?.replace(/<\/?p>/g, ""), // Remove <p> tags from content
                          },
                          media_id: null, // Assuming no direct mapping for option media ID
                          option_order: null,
                          created_on: null,
                          updated_on: null,
                          explanation_text: {
                              id: null, // Assuming no direct mapping for explanation text ID
                              type: "HTML", // Assuming explanation for options is in HTML
                              content: question.explanation, // Assuming no explanation provided for options
                          },
                      }))
                    : question.multipleChoiceOptions.map((opt, idx) => ({
                          id: null, // Assuming no direct mapping for option ID
                          preview_id: idx, // Using index as preview_id
                          question_id: null,
                          text: {
                              id: null, // Assuming no direct mapping for option text ID
                              type: "HTML", // Assuming option content is HTML
                              content: opt?.name?.replace(/<\/?p>/g, ""), // Remove <p> tags from content
                          },
                          media_id: null, // Assuming no direct mapping for option media ID
                          option_order: null,
                          created_on: null,
                          updated_on: null,
                          explanation_text: {
                              id: null, // Assuming no direct mapping for explanation text ID
                              type: "HTML", // Assuming explanation for options is in HTML
                              content: question.explanation, // Assuming no explanation provided for options
                          },
                      }));

            // Extract correct option indices as strings
            const correctOptionIds = (
                question.questionType === QuestionType.MCQS ||
                question.questionType === QuestionType.CMCQS
                    ? question.singleChoiceOptions
                    : question.multipleChoiceOptions
            )
                .map((opt, idx) => (opt.isSelected ? idx.toString() : null))
                .filter((idx) => idx !== null); // Remove null values

            const auto_evaluation_json = getEvaluationJSON(
                question,
                correctOptionIds,
                question.validAnswers,
                question.subjectiveAnswerText,
            );
            const options_json = getOptionsJson(question);
            const parent_rich_text = question.parentRichTextContent
                ? {
                      id: null,
                      type: "HTML",
                      content: question.parentRichTextContent,
                  }
                : null;

            const questionTypeForBackend = getQuestionType(question.questionType);

            return {
                id: null,
                preview_id: question.questionId, // Assuming no direct mapping for preview_id
                text: {
                    id: null, // Assuming no direct mapping for text ID
                    type: "HTML", // Assuming the content is HTML
                    content: question.questionName.replace(/<\/?p>/g, ""), // Remove <p> tags from content
                },
                media_id: null, // Assuming no direct mapping for media_id
                created_at: null,
                updated_at: null,
                question_response_type: null, // Assuming no direct mapping for response type
                question_type: questionTypeForBackend,
                access_level: null, // Assuming no direct mapping for access level
                auto_evaluation_json, // Add auto_evaluation_json
                evaluation_type: null, // Assuming no direct mapping for evaluation type
                explanation_text: {
                    id: null, // Assuming no direct mapping for explanation text ID
                    type: "HTML", // Assuming explanation is in HTML
                    content: question.explanation,
                },
                default_question_time_mins:
                    Number(question.questionDuration.hrs || 0) * 60 +
                    Number(question.questionDuration.min || 0),
                options, // Use the mapped options
                parent_rich_text,
                options_json,
                errors: [], // Assuming no errors are provided
                warnings: [], // Assuming no warnings are provided
            };
        }),
    };
}

function getEvaluationJSON(
    question: MyQuestion,
    correctOptionIds?: (string | null)[],
    validAnswers?: number[],
    subjectiveAnswerText?: string,
): string {
    switch (question.questionType) {
        case "MCQS":
            return JSON.stringify({
                type: "MCQS",
                data: {
                    correctOptionIds,
                },
            });
        case "CMCQS":
            return JSON.stringify({
                type: "MCQS",
                data: {
                    correctOptionIds,
                },
            });
        case "MCQM":
            return JSON.stringify({
                type: "MCQM",
                data: {
                    correctOptionIds,
                },
            });
        case "CMCQM":
            return JSON.stringify({
                type: "MCQM",
                data: {
                    correctOptionIds,
                },
            });
        case "NUMERIC":
            return JSON.stringify({
                type: "NUMERIC",
                data: {
                    validAnswers,
                },
            });
        case "CNUMERIC":
            return JSON.stringify({
                type: "NUMERIC",
                data: {
                    validAnswers,
                },
            });
        case "ONE_WORD":
            return JSON.stringify({
                type: "ONE_WORD",
                data: {
                    answer: subjectiveAnswerText,
                },
            });
        case "LONG_ANSWER":
            return JSON.stringify({
                type: "ONE_WORD",
                data: {
                    answer: { id: null, type: "HTML", content: subjectiveAnswerText },
                },
            });
        default:
            return "";
    }
}
function getOptionsJson(question: MyQuestion): string | null {
    console.log(question);
    switch (question.questionType) {
        case "MCQS":
            return null;
        case "MCQM":
            return null;
        case "NUMERIC":
            return JSON.stringify({
                decimals: question.decimals,
                numericType: question.numericType,
            });
        default:
            return null;
    }
}

export function transformQuestionPaperDataToAddQuestionToQuestionPaper(
    data: MyQuestionPaperFormInterface,
    id: string,
) {
    return {
        id: id,
        title: data.title,
        institute_id: INSTITUTE_ID, // Assuming there's no direct mapping for institute_id
        level_id: data.yearClass, // Assuming there's no direct mapping for level_id
        subject_id: data.subject, // Assuming there's no direct mapping for subject_id
        questions: data?.questions?.map((question) => {
            const options =
                question.questionType === "MCQS"
                    ? question.singleChoiceOptions.map((opt, idx) => ({
                          id: null, // Assuming no direct mapping for option ID
                          preview_id: idx, // Using index as preview_id
                          question_id: null,
                          text: {
                              id: null, // Assuming no direct mapping for option text ID
                              type: "HTML", // Assuming option content is HTML
                              content: opt?.name?.replace(/<\/?p>/g, ""), // Remove <p> tags from content
                          },
                          media_id: null, // Assuming no direct mapping for option media ID
                          option_order: null,
                          created_on: null,
                          updated_on: null,
                          explanation_text: {
                              id: null, // Assuming no direct mapping for explanation text ID
                              type: "HTML", // Assuming explanation for options is in HTML
                              content: question.explanation, // Assuming no explanation provided for options
                          },
                      }))
                    : question.multipleChoiceOptions.map((opt, idx) => ({
                          id: null, // Assuming no direct mapping for option ID
                          preview_id: idx, // Using index as preview_id
                          question_id: null,
                          text: {
                              id: null, // Assuming no direct mapping for option text ID
                              type: "HTML", // Assuming option content is HTML
                              content: opt?.name?.replace(/<\/?p>/g, ""), // Remove <p> tags from content
                          },
                          media_id: null, // Assuming no direct mapping for option media ID
                          option_order: null,
                          created_on: null,
                          updated_on: null,
                          explanation_text: {
                              id: null, // Assuming no direct mapping for explanation text ID
                              type: "HTML", // Assuming explanation for options is in HTML
                              content: question.explanation, // Assuming no explanation provided for options
                          },
                      }));

            // Extract correct option indices as strings
            const correctOptionIds = (
                question.questionType === "MCQS"
                    ? question.singleChoiceOptions
                    : question.multipleChoiceOptions
            )
                .map((opt, idx) => (opt.isSelected ? idx.toString() : null))
                .filter((idx) => idx !== null); // Remove null values

            const auto_evaluation_json = JSON.stringify({
                type: question.questionType === "MCQS" ? "MCQS" : "MCQM",
                data: {
                    correctOptionIds,
                },
            });

            const parent_rich_text = question.parentRichTextContent
                ? {
                      id: null,
                      type: "HTML",
                      content: question.parentRichTextContent,
                  }
                : null;

            return {
                id: null,
                preview_id: question.questionId, // Assuming no direct mapping for preview_id
                text: {
                    id: null, // Assuming no direct mapping for text ID
                    type: "HTML", // Assuming the content is HTML
                    content: question.questionName.replace(/<\/?p>/g, ""), // Remove <p> tags from content
                },
                media_id: null, // Assuming no direct mapping for media_id
                created_at: null,
                updated_at: null,
                question_response_type: null, // Assuming no direct mapping for response type
                question_type: question.questionType,
                access_level: null, // Assuming no direct mapping for access level
                auto_evaluation_json, // Add auto_evaluation_json
                evaluation_type: null, // Assuming no direct mapping for evaluation type
                explanation_text: {
                    id: null, // Assuming no direct mapping for explanation text ID
                    type: "HTML", // Assuming explanation is in HTML
                    content: question.explanation,
                },
                default_question_time_mins:
                    Number(question.questionDuration.hrs || 0) * 60 +
                    Number(question.questionDuration.min || 0),
                options, // Use the mapped options
                parent_rich_text,
                errors: [], // Assuming no errors are provided
                warnings: [], // Assuming no warnings are provided
            };
        }),
    };
}

export function transformQuestionPaperEditData(
    data: MyQuestionPaperFormInterface,
    previousQuestionPaperData: MyQuestionPaperFormEditInterface,
) {
    // Extract previous question IDs for comparison
    const previousQuestionIds = previousQuestionPaperData.questions.map(
        (prevQuestion) => prevQuestion.questionId,
    );

    return {
        id: data.questionPaperId,
        title: data.title,
        institute_id: INSTITUTE_ID,
        ...(data.yearClass !== "N/A" && { level_id: data.yearClass }),
        ...(data.subject !== "N/A" && { subject_id: data.subject }),
        questions: data?.questions?.map((question) => {
            // Check if the current question ID exists in the previous data
            const isNewQuestion = !previousQuestionIds.includes(question.questionId);

            const options =
                question.questionType === "MCQS"
                    ? question.singleChoiceOptions.map((opt, idx) => ({
                          id: isNewQuestion ? null : idx, // Set to null if it's a new question
                          preview_id: idx, // Always use index as preview_id
                          question_id: isNewQuestion ? null : question.questionId,
                          text: {
                              id: null, // Assuming no mapping for text ID
                              type: "HTML",
                              content: opt?.name?.replace(/<\/?p>/g, ""),
                          },
                          media_id: null,
                          option_order: null,
                          created_on: null,
                          updated_on: null,
                          explanation_text: {
                              id: null,
                              type: "HTML",
                              content: question.explanation,
                          },
                      }))
                    : question.multipleChoiceOptions.map((opt, idx) => ({
                          id: isNewQuestion ? null : idx,
                          preview_id: idx,
                          question_id: isNewQuestion ? null : question.questionId,
                          text: {
                              id: null,
                              type: "HTML",
                              content: opt?.name?.replace(/<\/?p>/g, ""),
                          },
                          media_id: null,
                          option_order: null,
                          created_on: null,
                          updated_on: null,
                          explanation_text: {
                              id: null,
                              type: "HTML",
                              content: question.explanation,
                          },
                      }));

            const correctOptionIds = (
                question.questionType === "MCQS"
                    ? question.singleChoiceOptions
                    : question.multipleChoiceOptions
            )
                .map((opt, idx) => (opt.isSelected ? idx.toString() : null))
                .filter((idx) => idx !== null);

            const auto_evaluation_json = getEvaluationJSON(
                question,
                correctOptionIds,
                question.validAnswers,
            );
            const options_json = getOptionsJson(question);
            const parent_rich_text = question.parentRichTextContent
                ? {
                      id: null,
                      type: "HTML",
                      content: question.parentRichTextContent,
                  }
                : null;

            const questionTypeForBackend = getQuestionType(question.questionType);

            return {
                id: isNewQuestion ? null : question.questionId, // Set to null if it's a new question
                preview_id: question.questionId, // Keep preview_id as the questionId
                text: {
                    id: null,
                    type: "HTML",
                    content: question.questionName.replace(/<\/?p>/g, ""),
                },
                media_id: null,
                created_at: null,
                updated_at: null,
                question_response_type: null,
                question_type: questionTypeForBackend,
                access_level: null,
                auto_evaluation_json,
                evaluation_type: null,
                explanation_text: {
                    id: null,
                    type: "HTML",
                    content: question.explanation,
                },
                default_question_time_mins: null,
                options_json,
                parent_rich_text,
                options,
                errors: [],
                warnings: [],
            };
        }),
    };
}

const getQuestionType = (type: string): string => {
    console.log(type);
    if (type === "CMCQS") return "MCQS";
    else if (type === "CMCQM") return "MCQM";
    else if (type === "CNUMERIC") return "NUMERIC";
    else return type;
};

export const getLevelNameById = (levels: Level[], id: string | null): string => {
    const level = levels.find((item) => item.id === id);
    return level?.level_name || "N/A";
};

export const getSubjectNameById = (subjects: Subject[], id: string | null): string => {
    const subject = subjects.find((item) => item.id === id);
    return subject?.subject_name || "N/A";
};

export const getIdByLevelName = (levels: Level[], name: string | null | undefined): string => {
    const level = levels.find((item) => item.level_name === name);
    return level?.id || "N/A";
};

export const getIdBySubjectName = (
    subjects: Subject[],
    name: string | null | undefined,
): string => {
    const subject = subjects.find((item) => item.subject_name === name);
    return subject?.id || "N/A";
};

export const transformResponseDataToMyQuestionsSchema = (data: QuestionResponse[]) => {
    console.log("in tranformation fuction ", data);
    return data.map((item) => {
        const correctOptionIds =
            JSON.parse(item.auto_evaluation_json)?.data?.correctOptionIds || [];
        const validAnswers = JSON.parse(item.auto_evaluation_json)?.data?.validAnswers || [];
        let decimals;
        let numericType;
        let subjectiveAnswerText;
        if (item.options_json) {
            decimals = JSON.parse(item.options_json)?.decimals || 0;
            numericType = JSON.parse(item.options_json)?.numeric_type || "";
        }
        if (item.auto_evaluation_json) {
            if (item.question_type === "ONE_WORD") {
                subjectiveAnswerText = JSON.parse(item.auto_evaluation_json)?.data?.answer;
            } else if (item.question_type === "LONG_ANSWER") {
                subjectiveAnswerText = JSON.parse(item.auto_evaluation_json)?.data?.answer?.content;
            }
        }
        console.log(item.parent_rich_text);
        const baseQuestion: MyQuestion = {
            questionId: item.id || item.preview_id || undefined,
            questionName: item.text?.content || "",
            explanation: item.explanation_text?.content || "",
            questionType: item.question_type,
            questionPenalty: "",
            questionDuration: {
                hrs: String(Math.floor((item.default_question_time_mins ?? 0) / 60)), // Extract hours
                min: String((item.default_question_time_mins ?? 0) % 60), // Extract remaining minutes
            },
            questionMark: "",
            singleChoiceOptions: [],
            multipleChoiceOptions: [],
            validAnswers: [],
            decimals,
            numericType,
            parentRichTextContent: item.parent_rich_text?.content || null,
            subjectiveAnswerText,
        };

        if (item.question_type === "MCQS") {
            baseQuestion.singleChoiceOptions = item.options.map((option) => ({
                name: option.text?.content || "",
                isSelected: correctOptionIds.includes(option.id || option.preview_id),
                image: {},
            }));
            baseQuestion.multipleChoiceOptions = Array(4).fill({
                name: "",
                isSelected: false,
                image: {
                    imageId: "",
                    imageName: "",
                    imageTitle: "",
                    imageFile: "",
                    isDeleted: false,
                },
            });
        } else if (item.question_type === "MCQM") {
            baseQuestion.multipleChoiceOptions = item.options.map((option) => ({
                name: option.text?.content || "",
                isSelected: correctOptionIds.includes(option.id || option.preview_id),
                image: {},
            }));
            baseQuestion.singleChoiceOptions = Array(4).fill({
                name: "",
                isSelected: false,
                image: {
                    imageId: "",
                    imageName: "",
                    imageTitle: "",
                    imageFile: "",
                    isDeleted: false,
                },
            });
        } else if (item.question_type === "NUMERIC") {
            baseQuestion.validAnswers = validAnswers;
        }
        console.log(baseQuestion);
        return baseQuestion;
    });
};

export const handleRefetchData = (
    getFilteredFavouriteData: ReturnType<typeof useMutation>,
    getFilteredActiveData: ReturnType<typeof useMutation>,
    pageNo: number,
    selectedQuestionPaperFilters: Record<string, FilterOption[]>,
) => {
    getFilteredFavouriteData.mutate({
        pageNo,
        pageSize: 10,
        instituteId: INSTITUTE_ID,
        data: {
            ...selectedQuestionPaperFilters,
            statuses: [{ id: "FAVOURITE", name: "FAVOURITE" }],
        },
    });
    getFilteredActiveData.mutate({
        pageNo,
        pageSize: 10,
        instituteId: INSTITUTE_ID,
        data: {
            ...selectedQuestionPaperFilters,
            statuses: [{ id: "ACTIVE", name: "ACTIVE" }],
        },
    });
};
