// hooks/useBugMutations.ts 
// Hook (Add/Delete Operations)
import { v4 as uuidv4 } from 'uuid';
import { addBug, Bug, removeBug } from '../store/entities/bugs';
import store from '../store/store';


export const useBugMutations = (
    setDraggedBugs: React.Dispatch<React.SetStateAction<Bug[]>>
) => {
    const handleAddBug = async (description: string) => {
        if (!description.trim()) return;

        const newBug: Bug = {
            id: uuidv4(),
            severity: 'Minor',
            description,
            priority: 'Low',
            reportedAt: new Date().toLocaleDateString(),
            resolved: false
        };

        await store.dispatch(addBug(newBug));
        setDraggedBugs(prev => [newBug, ...prev]);
    };

    const handleDeleteBug = (bugId: string) => {
        store.dispatch(removeBug(bugId));
        setDraggedBugs(prev => prev.filter(bug => bug.id !== bugId));
    };

    return { handleAddBug, handleDeleteBug };
};