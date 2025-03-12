import { useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Level, Stream, Subject } from "@/types/types";
import { useEffect } from "react";
import { useSelectedFilterStore } from "../../-store/useSlectedFilterOption";
import { useSelectedChips } from "../../-store/useSelectedChips";

interface FilterLevelDropdownProps {
    placeholder?: string;
    FilterList: Level[];
}
interface FilterStreamDropdownProps {
    placeholder?: string;
    FilterList: Stream[];
}
interface FilterSubjectDropdownProps {
    placeholder?: string;
    FilterList: Subject[];
}
interface FilterDifficultiesDropdownProps {
    placeholder?: string;
    FilterList: string[];
}

export const FilterStreamDropdown = ({
    placeholder = "Select an option",
    FilterList,
}: FilterStreamDropdownProps) => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const { setSelected } = useSelectedFilterStore();
    const { addChip } = useSelectedChips();
    useEffect(() => {
        if (selectedValue) {
            const selectedStream = FilterList.find((option) => option.streamId === selectedValue);
            if (selectedStream) {
                setSelected("stream", {
                    streamId: selectedStream.streamId,
                    streamName: selectedStream.streamName,
                });
                addChip("STREAM", selectedStream.streamId, selectedStream.streamName);
            }
        }
    }, [selectedValue, FilterList, setSelected]);

    return (
        <Select value={selectedValue} onValueChange={setSelectedValue}>
            <SelectTrigger className="w-[250px] !outline-none">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {FilterList.map((option) => (
                    <SelectItem key={option.streamId} value={option.streamId}>
                        {option.streamName} {/* Display Name, but use ID as value */}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export const FilterLevelDropdown = ({
    placeholder = "Select an option",
    FilterList,
}: FilterLevelDropdownProps) => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const { setSelected } = useSelectedFilterStore();
    const { addChip } = useSelectedChips();

    useEffect(() => {
        if (selectedValue) {
            const selectedLevel = FilterList.find((option) => option.levelId === selectedValue);
            if (selectedLevel) {
                setSelected("level", {
                    levelId: selectedLevel.levelId,
                    levelName: selectedLevel.levelName,
                });
                addChip("LEVEL", selectedLevel.levelId, selectedLevel.levelName);
            }
        }
    }, [selectedValue, FilterList, setSelected]);
    return (
        <Select value={selectedValue} onValueChange={setSelectedValue}>
            <SelectTrigger className="w-[250px] !outline-none">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {FilterList.map((option) => (
                    <SelectItem key={option.levelId} value={option.levelId}>
                        {option.levelName} {/* Display Name, but use ID as value */}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export const FilterSubjectDropdown = ({
    placeholder = "Select an option",
    FilterList,
}: FilterSubjectDropdownProps) => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const { setSelected } = useSelectedFilterStore();
    const { addChip } = useSelectedChips();
    useEffect(() => {
        if (selectedValue) {
            const selectedSubject = FilterList.find((option) => option.subjectId === selectedValue);
            if (selectedSubject) {
                setSelected("subject", {
                    subjectId: selectedSubject.subjectId,
                    subjectName: selectedSubject.subjectName,
                });
                addChip("SUBJECT", selectedSubject.subjectId, selectedSubject.subjectName);
            }
        }
    }, [selectedValue, FilterList, setSelected]);

    return (
        <Select value={selectedValue} onValueChange={setSelectedValue}>
            <SelectTrigger className="w-[250px] !outline-none">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {FilterList.map((option) => (
                    <SelectItem key={option.subjectId} value={option.subjectId}>
                        {option.subjectName} {/* Display Name, but use ID as value */}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export const FilterDifficultiesDropdown = ({
    placeholder = "Select an option",
    FilterList,
}: FilterDifficultiesDropdownProps) => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const { setSelected } = useSelectedFilterStore();
    const { addChip } = useSelectedChips();

    useEffect(() => {
        if (selectedValue) {
            setSelected("difficulty", selectedValue);
            addChip("DIFFICULTY", selectedValue, selectedValue);
        }
    }, [selectedValue, FilterList, setSelected]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">Difficulty :</div>
            <Select value={selectedValue} onValueChange={setSelectedValue}>
                <SelectTrigger className="w-[250px] !outline-none">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {FilterList.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option} {/* Display Name, but use ID as value */}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export const SearchableFilterLevelDropdown = ({
    placeholder = "Select an option",
    FilterList,
}: FilterLevelDropdownProps) => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const { setSelected } = useSelectedFilterStore();
    const { addChip } = useSelectedChips();

    useEffect(() => {
        if (selectedValue) {
            const selectedLevel = FilterList.find((option) => option.levelId === selectedValue);
            if (selectedLevel) {
                setSelected("level", {
                    levelId: selectedLevel.levelId,
                    levelName: selectedLevel.levelName,
                });
                addChip("LEVEL", selectedLevel.levelId, selectedLevel.levelName);
            }
        }
    }, [selectedValue, FilterList, setSelected]);
    const [search, setSearch] = useState("");

    const filteredOptions = FilterList.filter((option) =>
        option.levelName.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">Levels :</div>
            <Select value={selectedValue} onValueChange={setSelectedValue}>
                <SelectTrigger className="w-[250px] !outline-none">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {/* Search Input */}
                    <div className="p-2">
                        <Input
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Filtered Options */}
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <SelectItem key={option.levelId} value={option.levelId}>
                                {option.levelName}
                            </SelectItem>
                        ))
                    ) : (
                        <div className="p-2 text-sm text-gray-500">No results found</div>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
};

export const SearchableFilterStreamDropdown = ({
    placeholder = "Select an option",
    FilterList,
}: FilterStreamDropdownProps) => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const { setSelected } = useSelectedFilterStore();
    const { addChip } = useSelectedChips();

    useEffect(() => {
        if (selectedValue) {
            const selectedStream = FilterList.find((option) => option.streamId === selectedValue);
            if (selectedStream) {
                setSelected("level", {
                    levelId: selectedStream.streamId,
                    levelName: selectedStream.streamName,
                });
                addChip("STREAM", selectedStream.streamId, selectedStream.streamName);
            }
        }
    }, [selectedValue]);
    const [search, setSearch] = useState("");

    const filteredOptions = FilterList.filter((option) =>
        option.streamName.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">Streams :</div>
            <Select value={selectedValue} onValueChange={setSelectedValue}>
                <SelectTrigger className="w-[250px] !outline-none focus:outline-none">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {/* Search Input */}
                    <div className="p-2">
                        <Input
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Filtered Options */}
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <SelectItem key={option.streamId} value={option.streamId}>
                                {option.streamName}
                            </SelectItem>
                        ))
                    ) : (
                        <div className="p-2 text-sm text-gray-500">No results found</div>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
};

export const SearchableFilterSubjectDropdown = ({
    placeholder = "Select a subject",
    FilterList,
}: FilterSubjectDropdownProps) => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const { setSelected } = useSelectedFilterStore();
    const { addChip } = useSelectedChips();
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (selectedValue) {
            const selectedSubject = FilterList.find((option) => option.subjectId === selectedValue);
            if (selectedSubject) {
                setSelected("subject", {
                    subjectId: selectedSubject.subjectId,
                    subjectName: selectedSubject.subjectName,
                });
                addChip("SUBJECT", selectedSubject.subjectId, selectedSubject.subjectName);
            }
        }
    }, [selectedValue]);

    const filteredOptions = FilterList.filter((option) =>
        option.subjectName.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">Subjects :</div>
            <Select value={selectedValue} onValueChange={setSelectedValue}>
                <SelectTrigger className="w-[250px] !outline-none">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {/* Search Input */}
                    <div className="p-2">
                        <Input
                            placeholder="Search subjects..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Filtered Options */}
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <SelectItem key={option.subjectId} value={option.subjectId}>
                                {option.subjectName}
                            </SelectItem>
                        ))
                    ) : (
                        <div className="p-2 text-sm text-gray-500">No results found</div>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
};

export const SearchableFilterDropdown = () => {
    const [search, setSearch] = useState("");
    const options = [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
        { label: "System", value: "system" },
    ];

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <Select>
            <SelectTrigger className="w-[250px] !outline-none">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                {/* Search Input */}
                <div className="p-2">
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* Filtered Options */}
                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))
                ) : (
                    <div className="p-2 text-sm text-gray-500">No results found</div>
                )}
            </SelectContent>
        </Select>
    );
};
