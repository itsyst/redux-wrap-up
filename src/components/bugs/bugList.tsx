import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
	addBug,
	Bug,
	BugState,
	getBugs,
	removeBug,
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

	const [editingBugId, setEditingBugId] = useState<string | null>(null);
	const [editedBug, setEditedBug] = useState<Partial<Bug>>({});
	const [draggedBugs, setDraggedBugs] = useState<Bug[]>(bugs);

	// Load persisted draggedBugs from localStorage on mount
	useEffect(() => {
		const savedBugs = localStorage.getItem('draggedBugs');
		if (savedBugs) {
			setDraggedBugs(JSON.parse(savedBugs));
		} else {
			setDraggedBugs(bugs);
		}
		store.dispatch(getBugs());
		if (bugs.length > 0) store.dispatch(getUsers());
	}, [bugs]);

	// Save draggedBugs to localStorage whenever it changes
	useEffect(() => {
		if (draggedBugs.length) {
			localStorage.setItem('draggedBugs', JSON.stringify(draggedBugs));
		}
	}, [draggedBugs]);

	const handleDeleteBug = (bugId: string) => {
		store.dispatch(removeBug(bugId));
		const updatedBugs = draggedBugs.filter((bug) => bug.id !== bugId);
		setDraggedBugs(updatedBugs);
		localStorage.setItem('draggedBugs', JSON.stringify(updatedBugs));
	};

	const handleEditStart = (bug: Bug) => {
		setEditingBugId(bug.id);
		setEditedBug({ ...bug });
	};

	const handleSaveBug = () => {
		if (editingBugId && editedBug) {
			store.dispatch(updateBug(editedBug as Bug));
			const updatedBugs = draggedBugs.map((bug) =>
				bug.id === editingBugId ? { ...bug, ...editedBug } : bug
			);
			setDraggedBugs(updatedBugs);
		}
		setEditingBugId(null);
		setEditedBug({});
	};

	const handleFieldChange = (
		field: keyof Bug,
		value: string | boolean | number | string[]
	) => {
		setEditedBug((prev) => ({ ...prev, [field]: value }));
	};

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const reorderedBugs = Array.from(draggedBugs);
		const [movedBug] = reorderedBugs.splice(result.source.index, 1);
		reorderedBugs.splice(result.destination.index, 0, movedBug);

		setDraggedBugs(reorderedBugs);
		localStorage.setItem('draggedBugs', JSON.stringify(reorderedBugs));

		store.dispatch({
			type: 'bugs/reorderedBugs',
			payload: reorderedBugs
		});
	};

	const handleAddBug = async (description: string) => {
		if (description.trim()) {
			const newBug: Bug = {
				id: uuidv4(),
				severity: 'Minor',
				description: description,
				priority: 'Low',
				reportedAt: new Date().toLocaleDateString(),
				resolved: false
			};
			await store.dispatch(addBug(newBug));
			const newDraggedBugs = [newBug, ...draggedBugs];
			setDraggedBugs(newDraggedBugs);
			localStorage.setItem('draggedBugs', JSON.stringify(newDraggedBugs));
		}
	};

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
