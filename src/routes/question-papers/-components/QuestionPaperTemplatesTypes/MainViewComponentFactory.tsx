import React from "react";
import { QuestionPaperTemplateFormProps } from "../../-utils/question-paper-template-form";
import { SingleCorrectQuestionPaperTemplateMainView } from "./MCQ(Single Correct)/SingleCorrectQuestionPaperTemplateMainView";
import { NumericQuestionPaperTemplateMainView } from "./NumericType/NumericQuestionPaperTemplateMainView";
import { MultipleCorrectQuestionPaperTemplateMainView } from "./MCQ(Multiple Correct)/MultipleCorrectQuestionPaperTemplateMainView";

type MainViewComponentType = "MCQS" | "MCQM" | "NUMERIC";

type MainViewComponent = (props: QuestionPaperTemplateFormProps) => React.ReactElement;

const MainViewComponentsMap: Record<MainViewComponentType, MainViewComponent> = {
    MCQS: SingleCorrectQuestionPaperTemplateMainView,
    MCQM: MultipleCorrectQuestionPaperTemplateMainView,
    NUMERIC: NumericQuestionPaperTemplateMainView,
};

export const MainViewComponentFactory = (params: {
    type: MainViewComponentType;
    props: QuestionPaperTemplateFormProps;
}) => {
    const Component = MainViewComponentsMap[params.type];
    return <Component {...params.props} />;
};
