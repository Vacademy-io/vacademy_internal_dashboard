import {
    GET_QUESTION_PAPER_FILTERED_DATA,
    INIT_FILTERS,
    ADD_FILTERS_TO_ENTITY,
} from "@/constants/urls";
import authenticatedAxiosInstance from "@/lib/auth/axiosInstance";
import { FilterOption } from "@/types/assessments/question-paper-filter";

interface SelectedChip {
    source: string;
    id: string;
    name: string;
}

export async function addFiltersToEntity(
    commaSeparatedTags: string,
    selectedChips: SelectedChip[],
    questionId: string,
) {
    try {
        const tags = selectedChips.map(({ source, id }) => ({
            tagId: id,
            tagSource: source,
        }));
        const body = {
            entityId: questionId,
            entityName: "QUESTION_PAPER",
            commaSeparatedTags,
            tags,
        };
        await authenticatedAxiosInstance({
            method: "POST",
            url: `${ADD_FILTERS_TO_ENTITY}`,
            data: body,
        });
    } catch (error) {
        console.error("something went wrong");
    }
}
export async function fetchStaticData() {
    try {
        const response = await authenticatedAxiosInstance({
            method: "GET",
            url: `${INIT_FILTERS}`,
        });
        return response?.data;
    } catch (error: unknown) {
        throw new Error(`${error}`);
    }
}

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
            // data: transformFilterData(data),
            data,
        });
        return response?.data;
    } catch (error: unknown) {
        throw new Error(`${error}`);
    }
};
