import { z } from "zod";

export const uploadQuestionPaperFormSchema = z.object({
    questionPaperId: z
        .string({
            required_error: "Question Paper ID is required",
            invalid_type_error: "Question Paper ID must be a number",
        })
        .optional(),
    isFavourite: z.boolean().default(false),
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
    }),
    createdOn: z.date().default(() => new Date()),
    yearClass: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
    }),
    subject: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
    }),
    questionsType: z.string({
        required_error: "Question field is required",
        invalid_type_error: "Question field must be a string",
    }),
    optionsType: z.string({
        required_error: "Option field is required",
        invalid_type_error: "Option field must be a string",
    }),
    answersType: z.string({
        required_error: "Answer field is required",
        invalid_type_error: "Answer field must be a string",
    }),
    explanationsType: z.string({
        required_error: "Explanation field is required",
        invalid_type_error: "Explanation field must be a string",
    }),
    fileUpload: z
        .instanceof(File, {
            message: "File upload is required and must be a valid file",
        })
        .optional(),
    questions: z.array(
        z
            .object({
                questionId: z.string().optional(),
                questionName: z.string().min(1, "Question name is required"),
                explanation: z.string().optional(),
                questionType: z.string().default("MCQS"),
                questionPenalty: z.string(),
                questionDuration: z.object({
                    hrs: z.string(),
                    min: z.string(),
                }),
                questionMark: z.string(),
                imageDetails: z
                    .array(
                        z.object({
                            imageId: z.string().optional(),
                            imageName: z.string().min(1, "Image name is required"),
                            imageTitle: z.string().optional(),
                            imageFile: z.string().min(1, "Image file is required"),
                            isDeleted: z.boolean().optional(),
                        }),
                    )
                    .optional(),
                singleChoiceOptions: z.array(
                    z.object({
                        name: z.string().optional(),
                        isSelected: z.boolean().optional(),
                        image: z.object({
                            imageId: z.string().optional(),
                            imageName: z.string().optional(),
                            imageTitle: z.string().optional(),
                            imageFile: z.string().optional(),
                            isDeleted: z.boolean().optional(),
                        }),
                    }),
                ),
                multipleChoiceOptions: z.array(
                    z.object({
                        name: z.string().optional(),
                        isSelected: z.boolean().optional(),
                        image: z.object({
                            imageId: z.string().optional(),
                            imageName: z.string().optional(),
                            imageTitle: z.string().optional(),
                            imageFile: z.string().optional(),
                            isDeleted: z.boolean().optional(),
                        }),
                    }),
                ),
                parentRichTextContent: z.union([z.string(), z.null()]).optional(),
                decimals: z.number().optional(),
                numericType: z.string().optional(),
                validAnswers: z.union([z.array(z.number()), z.null()]).optional(),
                questionResponseType: z.union([z.string(), z.null()]).optional(),
                subjectiveAnswerText: z.string().optional(),
            })
            .superRefine((question, ctx) => {
                const { numericType, validAnswers } = question;

                if (!validAnswers || !Array.isArray(validAnswers)) return;
                console.log("here ", validAnswers);
                const typeChecks: Record<string, (n: number) => boolean> = {
                    SINGLE_DIGIT_NON_NEGATIVE_INTEGER: (n) =>
                        Number.isInteger(n) && n >= 0 && n <= 9,
                    INTEGER: (n) => Number.isInteger(n),
                    POSITIVE_INTEGER: (n) => Number.isInteger(n) && n > 0,
                    DECIMAL: (n) => typeof n === "number",
                };

                const check = numericType ? typeChecks[numericType] : undefined;

                if (check && !validAnswers.every(check)) {
                    ctx.addIssue({
                        path: ["validAnswers"],
                        code: z.ZodIssueCode.custom,
                        message: `Not correct answer type is entered ${numericType}`,
                    });
                }
            }),
    ),
});
