import RowItem from "../RowItem";
import { ReactComponent as ArrowRight } from '../../../assets/icons/arrow-right.svg';
import { ReactComponent as ArrowRightDown } from '../../../assets/icons/arrow-right-down.svg';
import { ReactComponent as Close } from '../../../assets/icons/close.svg';
import { ListEntryProps } from "./ListEntryInterface";
import { memo } from "react";

// Notes for the reviewer:
// 1. If there was more time, it would definitely be benefitial to focus on tyding up the props list
// The component tree might be redone in a way that it is not necessary to pass down the list of unfolded and deleted ids
// 2. Furthermore, just as I control the (un)folding of rows and deletion with a separate field, it might be possible to enrich the original data structure with folded and deleted flags

export const ListEntry = ({ entry, toggleFold, deleteItem, unfoldedIds, deletedIds, isUnfolded }: ListEntryProps) => {
    const records = Object.values(entry.children).map((child) => child.records[0]);
    if (deletedIds.includes(entry.data.uniqueId)) return null;
    return (
        <>
            {(
                <div className="row">
                    <>
                        <RowItem type="icon" icon={isUnfolded(entry.data.uniqueId) ? <ArrowRightDown /> : <ArrowRight />} position="top" onClick={() => toggleFold(entry.data.uniqueId)} />
                        {Object.entries(entry.data).map(([key, value]) => <RowItem key={key} type="data" data={{ key, value: value.toString() }} />)}
                        <RowItem type="icon" icon={<Close />} position="top" onClick={() => deleteItem(entry.data.uniqueId)} />
                    </>
                </div>
            )}
            {records.map((child) => isUnfolded(entry.data.uniqueId) && <ListEntryMemo key={child.data.uniqueId} entry={child} toggleFold={toggleFold} deleteItem={deleteItem} unfoldedIds={unfoldedIds} deletedIds={deletedIds} isUnfolded={isUnfolded} />)}
        </>
    );
}

const ListEntryMemo = memo(ListEntry);

export default ListEntryMemo;