import {
    ADD_QUESTION_PAPER,
    GET_QUESTION_PAPER_BY_ID,
    GET_QUESTION_PAPER_FILTERED_DATA,
    MARK_QUESTION_PAPER_STATUS,
    UPDATE_QUESTION_PAPER,
    ADD_QUESTIONS_TO_QUESTION_PAPER,
    DELETE_PUBLIC_QUESTION_PAPER,
} from "@/constants/urls";
import authenticatedAxiosInstance from "@/lib/auth/axiosInstance";
import {
    transformFilterData,
    transformQuestionPaperData,
    transformQuestionPaperEditData,
    transformQuestionPaperDataToAddQuestionToQuestionPaper,
} from "./helper";
import { FilterOption } from "@/types/assessments/question-paper-filter";
import {
    MyQuestionPaperFormEditInterface,
    MyQuestionPaperFormInterface,
} from "@/types/assessments/question-paper-form";

export const addQuestionPaper = async (data: MyQuestionPaperFormInterface) => {
    console.log("data ", data);
    console.log("Transformed data ", transformQuestionPaperData(data));
    try {
        const response = await authenticatedAxiosInstance({
            method: "POST",
            url: `${ADD_QUESTION_PAPER}`,
            data: transformQuestionPaperData(data),
        });
        return response?.data;
    } catch (error: unknown) {
        throw new Error(`${error}`);
    }
};
export const addQuestionsToQuestionPaper = async (
    data: MyQuestionPaperFormInterface,
    id: string,
) => {
    try {
        const response = await authenticatedAxiosInstance({
            method: "POST",
            url: `${ADD_QUESTIONS_TO_QUESTION_PAPER}`,
            data: transformQuestionPaperDataToAddQuestionToQuestionPaper(data, id),
        });
        return response?.data;
    } catch (error: unknown) {
        throw new Error(`${error}`);
    }
};

export const updateQuestionPaper = async (
    data: MyQuestionPaperFormInterface,
    previousQuestionPaperData: MyQuestionPaperFormEditInterface,
) => {
    try {
        const response = await authenticatedAxiosInstance({
            method: "PATCH",
            url: `${UPDATE_QUESTION_PAPER}`,
            data: transformQuestionPaperEditData(data, previousQuestionPaperData),
        });
        return response?.data;
    } catch (error: unknown) {
        throw new Error(`${error}`);
    }
};

export const deletePublicQuestionPaper = async (questionPaperId: string) => {
    try {
        const response = await authenticatedAxiosInstance({
            method: "POST",
            url: `${DELETE_PUBLIC_QUESTION_PAPER}`,
            params: { questionPaperId },
        });
        return response?.data;
    } catch (error: unknown) {
        throw new Error(`${error}`);
    }
};

export const markQuestionPaperStatus = async (
    status: string,
    questionPaperId: string,
    instituteId: string,
) => {
    try {
        const response = await authenticatedAxiosInstance({
            method: "POST",
            url: `${MARK_QUESTION_PAPER_STATUS}`,
            data: { status, question_paper_id: questionPaperId, institute_id: instituteId },
        });
        return response?.data;
    } catch (error: unknown) {
        throw new Error(`${error}`);
    }
};

export const getQuestionPaperById = async (questionPaperId: string | undefined) => {
    try {
        const response = await authenticatedAxiosInstance({
            method: "GET",
            url: `${GET_QUESTION_PAPER_BY_ID}`,
            params: {
                questionPaperId,
            },
        });
        return response?.data;
    } catch (error: unknown) {
        throw new Error(`${error}`);
    }
};

export const getQuestionPaperDataWithFilters = async (
    pageNo: number,
    pageSize: number,
    data: Record<string, FilterOption[]>,
) => {
    try {
        const response = await authenticatedAxiosInstance({
            method: "POST",
            url: `${GET_QUESTION_PAPER_FILTERED_DATA}`,
            params: {
                pageNo,
                pageSize,
            },
            data: transformFilterData(data),
        });
        return response?.data;
    } catch (error: unknown) {
        throw new Error(`${error}`);
    }
};

export const getQuestionPaperFilteredData = (
    pageNo: number,
    pageSize: number,
    // instituteId: string,
    data: Record<string, FilterOption[]>,
) => {
    return {
        queryKey: ["GET_QUESTION_PAPER_FILTERED_DATA", pageNo, pageSize, data],
        queryFn: () => getQuestionPaperDataWithFilters(pageNo, pageSize, data),
        staleTime: Infinity, // Prevent query from becoming stale
        cacheTime: Infinity, // Keep the query in the cache indefinitely
    };
};
