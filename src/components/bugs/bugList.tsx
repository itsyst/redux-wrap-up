// BugList.tsx
import { DragDropContext } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useBugEditing } from '../../hooks/useBugEditing';
import { useBugMutations } from '../../hooks/useBugMutations ';
import { useDragHandling } from '../../hooks/useDragHandling';
import {
	assignBugToUser,
	Bug,
	BugState,
	getBugs,
	updateBug
} from '../../store/entities/bugs';
import { getUsers, UserState } from '../../store/entities/users';
import store from '../../store/store';
import Spinner from '../common/spinner';
import BugAdd from './bugAdd';
import BugTable from './bugTable';

const BugList = () => {
	const bugs = useSelector((state: BugState) => state.entities.bugs.list);
	const users = useSelector((state: UserState) => state.entities.users.list);
	const [draggedBugs, setDraggedBugs] = useState<Bug[]>(bugs);

	// Load from localStorage on mount
	useEffect(() => {
		const savedBugs = localStorage.getItem('draggedBugs');

		setDraggedBugs(savedBugs ? JSON.parse(savedBugs) : bugs);

		store.dispatch(getBugs());
		if (bugs.length) store.dispatch(getUsers());
	}, [bugs]);

	// Persist to localStorage
	useEffect(() => {
		if (draggedBugs.length)
			localStorage.setItem('draggedBugs', JSON.stringify(draggedBugs));
	}, [draggedBugs]);

	// Edit functionality
	const {
		editingBugId,
		editedBug,
		handleEditStart,
		handleSaveBug,
		handleFieldChange
	} = useBugEditing((editedBug) => {
		store.dispatch(updateBug(editedBug));
		if (editedBug.userId) store.dispatch(assignBugToUser(editedBug));
		setDraggedBugs((prev) =>
			prev.map((bug) => (bug.id === editedBug.id ? editedBug : bug))
		);
	});

	// Add/delete functionality
	const { handleAddBug, handleDeleteBug } = useBugMutations(setDraggedBugs);

	// Drag handling
	const { handleDragEnd } = useDragHandling(draggedBugs, setDraggedBugs);

	if (!bugs.length || !users || users.length === 0) {
		return <Spinner />;
	}

	return (
		<>
			<BugAdd handleAddBug={handleAddBug} />
			<DragDropContext onDragEnd={handleDragEnd}>
				<BugTable
					bugs={draggedBugs}
					users={users}
					editingBugId={editingBugId}
					editedBug={editedBug}
					handleEditStart={handleEditStart}
					handleSaveBug={handleSaveBug}
					handleFieldChange={handleFieldChange}
					handleDeleteBug={handleDeleteBug}
				/>
			</DragDropContext>
		</>
	);
};

export default BugList;
