import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addBug } from '../store/entities/bugs';
import store from '../store/store';

const BugAdd: React.FC = () => {
	const [newBugDescription, setNewBugDescription] = useState('');

	const handleAddBug = () => {
		if (newBugDescription.trim()) {
			store.dispatch(
				addBug({
					id: uuidv4(),
					description: newBugDescription,
					reportedAt: new Date().toLocaleDateString(),
					resolved: false
				})
			);
			setNewBugDescription('');
		}
	};

	return (
		<div className="d-flex justify-content-between align-items-center mt-4 mb-3">
			<input
				type="text"
				className="form-control"
				placeholder="Enter bug description"
				value={newBugDescription}
				onChange={(e) => setNewBugDescription(e.target.value)}
			/>
			<button
				onClick={handleAddBug}
				className="btn btn-primary text-nowrap ms-2 mt-sm-0"
			>
				Add Bug
			</button>
		</div>
	);
};

export default BugAdd;
