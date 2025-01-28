// hooks/useDragHandling.ts 
// Hook (Drag-and-Drop Logic)
import { DropResult } from '@hello-pangea/dnd';
import { Bug } from '../store/entities/bugs';
import store from '../store/store';
 
export const useDragHandling = (
    draggedBugs: Bug[],
    setDraggedBugs: React.Dispatch<React.SetStateAction<Bug[]>>
) => {
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const reorderedBugs = [...draggedBugs];
        const [movedBug] = reorderedBugs.splice(result.source.index, 1);
        reorderedBugs.splice(result.destination.index, 0, movedBug);

        setDraggedBugs(reorderedBugs);
        store.dispatch({ type: 'bugs/reorderedBugs', payload: reorderedBugs });
    };

    return { handleDragEnd };
};