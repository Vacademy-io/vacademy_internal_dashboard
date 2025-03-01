import { useState } from "react";
import { useSelectedChips } from "../../-store/useSelectedChips";

interface ChipProps {
    tag: string;
    id: string;
}

export function Chip({ tag, id }: ChipProps) {
    const [selected, setSelected] = useState<boolean>(false);
    const { deleteChip } = useSelectedChips();
    function onSelected() {
        setSelected(!selected);
    }
    return (
        <div
            className={`flex w-fit cursor-pointer flex-row gap-4 rounded-md border px-3 py-2 text-body hover:border-primary-500 hover:bg-primary-100`}
            onClick={onSelected}
        >
            {tag}
            <button onClick={() => deleteChip(id)} className="hover:text-red-700">
                ✕
            </button>
        </div>
    );
}
