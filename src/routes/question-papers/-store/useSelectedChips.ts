import { create } from "zustand";

interface SelectedChip {
    source: string;
    id: string;
    name: string;
}

interface SelectedChipsStore {
    selected: SelectedChip[];
    commaSeparatedTags: string;
    setCommaSeparatedTags: (value: string) => void;
    addChip: (source: string, id: string, name: string) => void;
    deleteChip: (id: string) => void;
    clearFilters: () => void;
}

export const useSelectedChips = create<SelectedChipsStore>((set) => ({
    selected: [],
    commaSeparatedTags: "",

    setCommaSeparatedTags: (value: string) => set(() => ({ commaSeparatedTags: value })),
    addChip: (source, id, name) =>
        set((state) => {
            const exists = state.selected.some((chip) => chip.id === id);
            return exists ? state : { selected: [...state.selected, { source, id, name }] };
        }),

    deleteChip: (id) =>
        set((state) => ({
            selected: state.selected.filter((chip) => chip.id !== id),
        })),

    clearFilters: () => set({ selected: [] }),
}));
