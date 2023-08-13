import SourceData from '../../data.json';
import './AppStyle.css';
import { useCallback, useEffect, useState } from 'react';
import { Entry } from '../../models/Entry';
import ListEntryMemo from '../Table/ListEntry';

function App() {
    const addIdsToEntries = useCallback((entry: Entry) => {
        entry.data = {
            ...entry.data,
            uniqueId: Number(Math.random().toString().substring(2, 6)),
        }
        Object.keys(entry.children).forEach((key) => {
            entry.children[key].records.forEach((child) => {
                addIdsToEntries(child);
            });
        });
        return entry;
    }, []);

    const originalData = SourceData as unknown as Entry[];
    const [data, setData] = useState<Entry[]>(originalData);
    useEffect(() => {
        setData(originalData.map((entry) => addIdsToEntries(entry)));
    }, [addIdsToEntries, originalData]);

    const [unfoldedIds, setUnfoldedIds] = useState<number[]>([]);
    const [deletedIds, setDeletedIds] = useState<number[]>([]);

    const toggleFold = useCallback((id: number) => {
        if (unfoldedIds.includes(id)) {
            setUnfoldedIds(prev => prev.filter(prevId => prevId !== id));
        } else {
            setUnfoldedIds(prev => [...prev, id]);
        }
    }, [unfoldedIds]);

    const isUnfolded = useCallback((parentId: number) => {
        return unfoldedIds.includes(parentId);
    }, [unfoldedIds]);

    const deleteItem = useCallback((parentId: number) => {
        setDeletedIds(prev => [...prev, parentId]);
    }, []);

    return (
        <div className="app">
            {data.map((entry) => <ListEntryMemo key={entry.data.uniqueId} entry={entry} toggleFold={toggleFold} unfoldedIds={unfoldedIds} deletedIds={deletedIds} isUnfolded={isUnfolded} deleteItem={deleteItem} />)}
        </div>
    );
}

export default App;
