import { MyDialog } from "@/components/design-system/dialog";
import {
    FilterDifficultiesDropdown,
    SearchableFilterLevelDropdown,
    SearchableFilterStreamDropdown,
    SearchableFilterSubjectDropdown,
} from "./FilterDropdown";
import { Chip } from "./Chips";
import { addFiltersToEntity } from "../../-services/utils";
import { useFilterStore } from "../../-store/useFilterOptions";
import { useSelectedChips } from "../../-store/useSelectedChips";
import { MyButton } from "@/components/design-system/button";
import { MyInput } from "@/components/design-system/input";
import { Stream, Subject } from "@/types/types";
import { useState } from "react";

interface AddTagDialogBoxProps {
    heading: string;
    dialogWidth?: string;
    open?: boolean;
    onOpenChange: (open: boolean) => void;
    children?: React.ReactNode;
    questionId?: string;
}

export function AddTagDialogBox({ heading, open, onOpenChange, questionId }: AddTagDialogBoxProps) {
    // const { setSelected } = useSelectedFilterStore();
    const { options } = useFilterStore();
    const {
        selected: selectedChips,
        setCommaSeparatedTags,
        commaSeparatedTags,
    } = useSelectedChips();
    const [csvValues, setCsvValues] = useState<string>("");
    const AddTagsToquestion = async () => {
        await addFiltersToEntity(commaSeparatedTags, selectedChips, questionId || "");
        onOpenChange(false);
    };
    const combineStreams = (streamsData: Record<string, Stream[]>): Stream[] => {
        const allStreams = Object.values(streamsData).flat();
        const uniqueStreams = Array.from(
            new Map(allStreams.map((stream) => [stream.streamId, stream])).values(),
        );
        return uniqueStreams;
    };

    const combineSubjects = (levelsData: Record<string, Subject[]>): Subject[] => {
        const allSubjects = Object.values(levelsData).flat();
        const uniqueSubjects = Array.from(
            new Map(allSubjects.map((subject) => [subject.subjectId, subject])).values(),
        );
        return uniqueSubjects;
    };

    const changeInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommaSeparatedTags(e.target.value);
        setCsvValues(e.target.value);
    };

    return (
        <MyDialog heading={heading} open={open} onOpenChange={onOpenChange}>
            <div className="bg-sidebar-background flex flex-col gap-4 rounded p-4">
                <SearchableFilterLevelDropdown
                    placeholder={"Select Level/Grade"}
                    FilterList={options.levels}
                />
                <SearchableFilterStreamDropdown
                    placeholder="Select Stream"
                    FilterList={combineStreams(options.streams) || []}
                />
                <SearchableFilterSubjectDropdown
                    FilterList={combineSubjects(options.subjects) || []}
                    placeholder="Select Subject"
                />
                <FilterDifficultiesDropdown
                    FilterList={options.difficulties || []}
                    placeholder="Select Difficulty"
                />
                {/* TODO : add searchable filtr for tag or provide way to add custom tags  */}
                <div className="flex flex-col gap-2">
                    Add Your Custom Tags (Comma Separated Values)
                    <MyInput
                        // inputType="text"
                        input={csvValues}
                        onChangeFunction={changeInputValues}
                    />
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-2 border-b border-t p-4">
                {selectedChips.length > 0 ? (
                    selectedChips.map(({ id, name }) => <Chip key={id} id={id} tag={name}></Chip>)
                ) : (
                    <p className="text-gray-500">No filters selected</p>
                )}
            </div>
            <div className="m-4 text-center">
                <MyButton onClick={AddTagsToquestion}>Submit</MyButton>
            </div>
        </MyDialog>
    );
}
