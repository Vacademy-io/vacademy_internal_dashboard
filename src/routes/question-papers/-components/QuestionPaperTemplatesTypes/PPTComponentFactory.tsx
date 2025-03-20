import React from "react";
import { SingleCorrectQuestionPaperTemplatePPTView } from "./MCQ(Single Correct)/SingleCorrectQuestionPaperTemplatePPTView";
import { NumericQuestionPaperTemplatePPTView } from "./NumericType/NumericQuestionPaperTemplatePPTView";
import { QuestionPaperTemplateFormProps } from "../../-utils/question-paper-template-form";
import { MultipleCorrectQuestionPaperTemplatePPTView } from "./MCQ(Multiple Correct)/MultipleCorrectQuestionPaperTemplatePPTView";
// import { ComprehensiveSingleCorrectQuestionPaperTemplatePPTView } from "./Comprehensive MCQ(Single Correct)/ComprehensiveSingleCorrectQuestionPaperTemplatePPTView";
import { QuestionType } from "@/constants/dummy-data";
import { ComprehensiveMultipleCorrectQuestionPaperTemplatePPTView } from "./Comprehensive MCQ(Multiple Correct)/ComprehensiveMultipleCorrectQuestionPaperTemplatePPTView";
import { ComprehensiveNumericQuestionPaperTemplatePPTView } from "./ComprehensiveNumericType/ComprehensiveNumericQuestionPaperTemplatePPTView";

type PPTComponentType = QuestionType;

type PPTComponent = (props: QuestionPaperTemplateFormProps) => React.ReactElement;

const PPTComponentsMap: Record<PPTComponentType, PPTComponent> = {
    MCQS: SingleCorrectQuestionPaperTemplatePPTView,
    MCQM: MultipleCorrectQuestionPaperTemplatePPTView,
    NUMERIC: NumericQuestionPaperTemplatePPTView,
    CMCQS: SingleCorrectQuestionPaperTemplatePPTView,
    CMCQM: ComprehensiveMultipleCorrectQuestionPaperTemplatePPTView,
    CNUMERIC: ComprehensiveNumericQuestionPaperTemplatePPTView,
};

export const PPTComponentFactory = (params: {
    type: PPTComponentType;
    props: QuestionPaperTemplateFormProps;
}) => {
    const Component = PPTComponentsMap[params.type];
    return <Component {...params.props} />;
};
