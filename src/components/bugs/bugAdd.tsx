import { useState } from 'react';

interface BugAddProps {
	handleAddBug: (description: string) => void;
}

const BugAdd: React.FC<BugAddProps> = ({ handleAddBug }) => {
	const [newBugDescription, setNewBugDescription] = useState('');

	const onAddClick = () => {
		if (newBugDescription.trim()) {
			handleAddBug(newBugDescription); // Call handleAddBug from parent
			setNewBugDescription('');
		}

		console.log(newBugDescription);
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
				onClick={onAddClick}
				className="btn btn-primary text-nowrap ms-2 mt-sm-0"
			>
				Add Bug
			</button>
		</div>
	);
};

export default BugAdd;
