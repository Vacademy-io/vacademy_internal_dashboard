import {
    MCQS,
    MCQM,
    Numerical,
    TrueFalse,
    Match,
    LongAnswer,
    SingleWord,
    CMCQS,
    CMCQM,
    CompTrueFalse,
    CompLongAnswer,
    CompSingleWord,
} from "@/svgs";
import {
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { QuestionPaperUpload } from "./QuestionPaperUpload";
import { Dispatch, SetStateAction } from "react";
import { X } from "phosphor-react";
import useDialogStore from "../-global-states/question-paper-dialogue-close";

interface QuestionTypeProps {
    icon: React.ReactNode; // Accepts an SVG or any React component
    text: string; // Accepts the text label
}
interface QuestionPaperHeadingInterface {
    currentQuestionIndex: number;
    setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
    currentQuestionImageIndex: number;
    setCurrentQuestionImageIndex: Dispatch<SetStateAction<number>>;
}

export function QuestionTypeSelection({
    currentQuestionIndex,
    setCurrentQuestionIndex,
    currentQuestionImageIndex,
    setCurrentQuestionImageIndex,
}: QuestionPaperHeadingInterface) {
    const { setIsManualQuestionPaperDialogOpen } = useDialogStore();
    const QuestionType: React.FC<QuestionTypeProps> = ({ icon, text }) => {
        return (
            <>
                <AlertDialogTrigger>
                    <div className="flex cursor-pointer flex-row items-center gap-4 rounded-md border px-4 py-3">
                        {icon}
                        <div className="text-body">{text}</div>
                    </div>
                </AlertDialogTrigger>
            </>
        );
    };
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4">
                <div className="text-subtitle font-semibold">Quick Access</div>
                <QuestionType
                    icon={<MCQS />}
                    text="Multiple Choice Questions (Single correct)"
                ></QuestionType>
                <QuestionType
                    icon={<MCQM />}
                    text="Multiple Choice Questions (Multiple correct)"
                ></QuestionType>
                <QuestionType icon={<Numerical />} text="Numerical"></QuestionType>
                <QuestionType icon={<TrueFalse />} text="True False"></QuestionType>
            </div>
            <div className="border"></div>
            <div className="flex flex-col gap-4">
                <div className="text-subtitle font-semibold">Option Based</div>
                <QuestionType
                    icon={<MCQS />}
                    text="Multiple Choice Questions (Single correct)"
                ></QuestionType>
                <QuestionType
                    icon={<MCQM />}
                    text="Multiple Choice Questions (Multiple correct)"
                ></QuestionType>
                <QuestionType icon={<TrueFalse />} text="True False"></QuestionType>
                <QuestionType icon={<Match />} text="Match the Collunm"></QuestionType>
            </div>
            <div className="border"></div>
            <div className="flex flex-col gap-4">
                <div className="text-subtitle font-semibold">Math Based</div>
                <QuestionType icon={<Numerical />} text="Numerical"></QuestionType>
            </div>
            <div className="border"></div>
            <div className="flex flex-col gap-4">
                <div className="text-subtitle font-semibold">Option Based</div>
                <QuestionType icon={<LongAnswer />} text="Long Answer"></QuestionType>
                <QuestionType icon={<SingleWord />} text="Single Word"></QuestionType>
            </div>
            <div className="border"></div>
            <div className="flex flex-col gap-4">
                <div className="text-subtitle font-semibold">Option Based</div>
                <QuestionType
                    icon={<CMCQS />}
                    text="Comprehension Multiple Choice Questions (Single correct)"
                ></QuestionType>
                <QuestionType
                    icon={<CMCQM />}
                    text="Comprehension Multiple Choice Questions (Multiple correct)"
                ></QuestionType>
                <QuestionType
                    icon={<CompTrueFalse />}
                    text="Comprehension True False"
                ></QuestionType>
                <QuestionType
                    icon={<CompLongAnswer />}
                    text="Comprehension Long Answer"
                ></QuestionType>
                <QuestionType
                    icon={<CompSingleWord />}
                    text="Comprehension Single Word"
                ></QuestionType>
            </div>
            <AlertDialogContent className="p-0">
                <div className="flex items-center justify-between rounded-md bg-primary-50">
                    <h1 className="rounded-sm p-4 font-bold text-primary-500">
                        Create Question Paper Manually
                    </h1>
                    <AlertDialogCancel
                        onClick={() => setIsManualQuestionPaperDialogOpen(false)}
                        className="border-none bg-primary-50 shadow-none hover:bg-primary-50"
                    >
                        <X className="text-neutral-600" />
                    </AlertDialogCancel>
                </div>
                <QuestionPaperUpload
                    isManualCreated={true}
                    currentQuestionIndex={currentQuestionIndex}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    currentQuestionImageIndex={currentQuestionImageIndex}
                    setCurrentQuestionImageIndex={setCurrentQuestionImageIndex}
                />
            </AlertDialogContent>
        </div>
    );
}
