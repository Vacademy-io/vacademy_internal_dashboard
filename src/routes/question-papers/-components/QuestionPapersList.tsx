import { Button } from "@/components/ui/button";
import { DotsThree, Star } from "phosphor-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MyPagination } from "@/components/design-system/pagination";
import ViewQuestionPaper from "./ViewQuestionPaper";
import { useMutation } from "@tanstack/react-query";
import { getQuestionPaperById, markQuestionPaperStatus } from "../-utils/question-paper-services";
import { INSTITUTE_ID } from "@/constants/urls";
import { PaginatedResponse, QuestionPaperInterface } from "@/types/question-paper-template";
import {
    getLevelNameById,
    getSubjectNameById,
    transformResponseDataToMyQuestionsSchema,
} from "../-utils/helper";
import { useInstituteDetailsStore } from "@/stores/students/students-list/useInstituteDetailsStore";
import { DashboardLoader } from "@/components/core/dashboard-loader";
import useDialogStore from "../-global-states/question-paper-dialogue-close";
import { MyQuestion } from "@/types/question-paper-form";
import { z } from "zod";
import sectionDetailsSchema from "../-utils/section-details-schema";
import { UseFormReturn } from "react-hook-form";

export type SectionFormType = z.infer<typeof sectionDetailsSchema>;
export const QuestionPapersList = ({
    questionPaperList,
    pageNo,
    handlePageChange,
    refetchData,
    isAssessment,
    index,
    sectionsForm,
}: {
    questionPaperList: PaginatedResponse;
    pageNo: number;
    handlePageChange: (newPage: number) => void;
    refetchData: () => void;
    isAssessment: boolean;
    index?: number;
    sectionsForm?: UseFormReturn<SectionFormType>;
}) => {
    const { setIsSavedQuestionPaperDialogOpen } = useDialogStore();
    const { instituteDetails } = useInstituteDetailsStore();

    const handleMarkQuestionPaperStatus = useMutation({
        mutationFn: ({
            status,
            questionPaperId,
            instituteId,
        }: {
            status: string;
            questionPaperId: string;
            instituteId: string;
        }) => markQuestionPaperStatus(status, questionPaperId, instituteId),
        onSuccess: () => {
            refetchData();
        },
        onError: (error: unknown) => {
            console.error(error);
        },
    });

    const handleMarkFavourite = (questionPaperId: string, status: string) => {
        handleMarkQuestionPaperStatus.mutate({
            status: status === "FAVOURITE" ? "ACTIVE" : "FAVOURITE",
            questionPaperId,
            instituteId: INSTITUTE_ID,
        });
    };

    const handleDeleteQuestionPaper = (questionPaperId: string) => {
        handleMarkQuestionPaperStatus.mutate({
            status: "DELETE",
            questionPaperId,
            instituteId: INSTITUTE_ID,
        });
    };

    const handleGetQuestionPaperData = useMutation({
        mutationFn: ({ id }: { id: string }) => getQuestionPaperById(id),
        onSuccess: (data) => {
            setIsSavedQuestionPaperDialogOpen(false);
            const transformQuestionsData: MyQuestion[] = transformResponseDataToMyQuestionsSchema(
                data.question_dtolist,
            );

            if (sectionsForm && index !== undefined) {
                sectionsForm.setValue(`section.${index}`, {
                    ...sectionsForm.getValues(`section.${index}`),
                    adaptive_marking_for_each_question: transformQuestionsData.map((question) => ({
                        questionId: question.questionId,
                        questionName: question.questionName,
                        questionType: question.questionType,
                        questionMark: question.questionMark,
                        questionPenalty: "",
                        ...(question.questionType === "MCQM" && {
                            correctOptionIdsCnt: question?.multipleChoiceOptions?.filter(
                                (item) => item.isSelected,
                            ).length,
                        }),
                        questionDuration: {
                            hrs: "",
                            min: "",
                        },
                    })),
                });
            }
        },
        onError: (error: unknown) => {
            console.error(error);
        },
    });

    const handleGetQuestionPaperDataById = (questionsData: QuestionPaperInterface) => {
        const id = questionsData.id;

        if (sectionsForm && index !== undefined) {
            sectionsForm.setValue(`section.${index}`, {
                ...sectionsForm.getValues(`section.${index}`),
                questionPaperTitle: questionsData.title,
                subject: getSubjectNameById(
                    instituteDetails?.subjects || [],
                    questionsData.subject_id,
                ),
                yearClass: getLevelNameById(instituteDetails?.levels || [], questionsData.level_id),
                sectionName: getSubjectNameById(
                    instituteDetails?.subjects || [],
                    questionsData.subject_id,
                ),
                uploaded_question_paper: id,
            });
        }

        handleGetQuestionPaperData.mutate({ id });
    };

    if (
        handleMarkQuestionPaperStatus.status == "pending" ||
        handleGetQuestionPaperData.status === "pending"
    )
        return <DashboardLoader />;

    return (
        <div className="mt-5 flex flex-col gap-5">
            {questionPaperList?.content?.map((questionsData, idx) => (
                <div
                    key={idx}
                    className="flex flex-col gap-2 rounded-xl border-[1.5px] bg-neutral-50 p-4"
                    onClick={() => handleGetQuestionPaperDataById(questionsData)}
                >
                    <div className="flex items-center justify-between">
                        <h1 className="font-medium">{questionsData.title}</h1>
                        {!isAssessment && (
                            <div className="flex items-center gap-4">
                                <Star
                                    size={20}
                                    weight={questionsData.status === "FAVOURITE" ? "fill" : "light"}
                                    onClick={() =>
                                        handleMarkFavourite(questionsData.id, questionsData.status)
                                    }
                                    className={`cursor-pointer ${
                                        questionsData.status === "FAVOURITE"
                                            ? "text-yellow-500"
                                            : "text-gray-300"
                                    }`}
                                />

                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button
                                            variant="outline"
                                            className="h-6 bg-transparent p-1 shadow-none"
                                        >
                                            <DotsThree size={20} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <ViewQuestionPaper
                                            questionPaperId={questionsData.id}
                                            title={questionsData.title}
                                            subject={questionsData.subject_id}
                                            level={questionsData.level_id}
                                            refetchData={refetchData}
                                        />
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleDeleteQuestionPaper(questionsData.id)
                                            }
                                            className="cursor-pointer"
                                        >
                                            Delete Question Paper
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )}
                    </div>
                    <div className="flex w-full items-center justify-start gap-8 text-xs">
                        <p>
                            Created On:{" "}
                            {new Date(questionsData.created_on).toLocaleDateString() || "N/A"}
                        </p>
                        <p>
                            Year/Class:{" "}
                            {instituteDetails &&
                                getLevelNameById(instituteDetails.levels, questionsData.level_id)}
                        </p>
                        <p>
                            Subject:{" "}
                            {instituteDetails &&
                                getSubjectNameById(
                                    instituteDetails.subjects,
                                    questionsData.subject_id,
                                )}
                        </p>
                    </div>
                </div>
            ))}
            <MyPagination
                currentPage={pageNo}
                totalPages={questionPaperList.total_pages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
