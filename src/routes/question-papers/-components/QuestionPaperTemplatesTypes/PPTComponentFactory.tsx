import React from "react";
import { SingleCorrectQuestionPaperTemplatePPTView } from "./MCQ(Single Correct)/SingleCorrectQuestionPaperTemplatePPTView";
import { NumericQuestionPaperTemplatePPTView } from "./NumericType/NumericQuestionPaperTemplatePPTView";
import { QuestionPaperTemplateFormProps } from "../../-utils/question-paper-template-form";
import { MultipleCorrectQuestionPaperTemplatePPTView } from "./MCQ(Multiple Correct)/MultipleCorrectQuestionPaperTemplatePPTView";

type PPTComponentType = "MCQS" | "MCQM" | "NUMERIC";

type PPTComponent = (props: QuestionPaperTemplateFormProps) => React.ReactElement;

const PPTComponentsMap: Record<PPTComponentType, PPTComponent> = {
    MCQS: SingleCorrectQuestionPaperTemplatePPTView,
    MCQM: MultipleCorrectQuestionPaperTemplatePPTView,
    NUMERIC: NumericQuestionPaperTemplatePPTView,
};

export const PPTComponentFactory = (params: {
    type: PPTComponentType;
    props: QuestionPaperTemplateFormProps;
}) => {
    const Component = PPTComponentsMap[params.type];
    return <Component {...params.props} />;
};
