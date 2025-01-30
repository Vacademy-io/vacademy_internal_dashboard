import { uploadQuestionPaperFormSchema } from "@/routes/question-papers/-utils/upload-question-paper-form-schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Infer the form type from the schema
type QuestionFormSchemaType = z.infer<typeof uploadQuestionPaperFormSchema>;

export interface QuestionImagePreviewDialogueProps {
    form: UseFormReturn<QuestionFormSchemaType>; // Type for the form
    currentQuestionImageIndex: number;
    isUploadedAgain?: boolean;
}

export interface OptionImagePreviewDialogueProps {
    form: UseFormReturn<QuestionFormSchemaType>; // Type for the form
    option: number;
    isUploadedAgain?: boolean;
}
