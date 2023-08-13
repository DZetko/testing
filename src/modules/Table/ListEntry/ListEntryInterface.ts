import { Entry } from "../../../models/Entry";

export interface ListEntryProps {
    entry: Entry;
    toggleFold: (id: number) => void;
    deleteItem: (id: number) => void;
    isUnfolded: (parentId: number) => boolean;
    unfoldedIds: number[];
    deletedIds: number[];
}