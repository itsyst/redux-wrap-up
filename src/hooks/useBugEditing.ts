// hooks/useBugEditing.ts
// Hook (Edit State Management)
import { useState } from 'react';
import { Bug } from '../store/entities/bugs';
 
type SaveHandler = (editedBug: Bug) => void;

export const useBugEditing = (onSave: SaveHandler) => {
    const [editingBugId, setEditingBugId] = useState<string | null>(null);
    const [editedBug, setEditedBug] = useState<Partial<Bug>>({});

    const handleEditStart = (bug: Bug) => {
        setEditingBugId(bug.id);
        setEditedBug({ ...bug });
    };

    const handleSaveBug = () => {
        if (editingBugId && editedBug) {
            onSave(editedBug as Bug);
        }
        setEditingBugId(null);
        setEditedBug({});
    };

    const handleFieldChange = (
        field: keyof Bug,
        value: string | boolean | number | string[]
    ) => {
        setEditedBug(prev => ({ ...prev, [field]: value }));
    };

    return {
        editingBugId,
        editedBug,
        handleEditStart,
        handleSaveBug,
        handleFieldChange
    };
};