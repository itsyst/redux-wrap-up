import { useState } from 'react';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Bug, BugState, removeBug, updateBug } from '../store/entities/bugs';
import { UserState } from '../store/entities/users';
import store from '../store/store';
import Spinner from './spinner';

const BugList = () => {
	const bugs = useSelector((state: BugState) => state.entities.bugs.list);
	const users = useSelector((state: UserState) => state.entities.users.list);

	const [editingBugId, setEditingBugId] = useState<string | null>(null);
	const [editedBug, setEditedBug] = useState<Partial<Bug>>({});

	const handleDeleteBug = (bugId: string) => {
		store.dispatch(removeBug(bugId));
	};

	const handleEditStart = (bug: Bug) => {
		setEditingBugId(bug.id);
		setEditedBug({ ...bug }); // Initialize with current bug details
	};

	const handleSaveBug = () => {
		if (editingBugId && editedBug) {
			store.dispatch(updateBug(editedBug as Bug)); // Save changes
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

	// Get user name by userId
	const getUserName = (userId: number) => {
		const user = users.find((user) => user.id === userId);
		return user ? user.name : 'Unknown User';
	};

	if (!bugs.length || !users || users.length === 0) {
		return <Spinner />;
	}

	return (
		<table className="table table-striped table-hover table-bordered responsive mt-3">
			<thead>
				<tr>
					<th>Assigned User</th>
					<th>Severity</th>
					<th>Description</th>
					<th>Priority</th>
					<th>Tags</th>
					<th>Status</th>
					<th>Reported At</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{bugs.map((bug: Bug) => (
					<tr key={bug.id}>
						{/* Assigned User */}
						<td>
							{editingBugId === bug.id ? (
								<select
									className="form-select form-select-sm"
									value={editedBug.userId || bug.userId}
									onChange={(e) =>
										handleFieldChange('userId', Number(e.target.value))
									}
								>
									{users.map((user) => (
										<option key={user.id} value={user.id}>
											{user.name}
										</option>
									))}
								</select>
							) : (
								<span className={!bug.userId ? 'fw-bold text-danger' : ''}>
									{getUserName(bug.userId || 0)}
								</span>
							)}
						</td>
						{/* Severity Cell */}
						<td>
							<select
								className="form-select form-select-sm"
								disabled={editingBugId !== bug.id}
								value={
									editingBugId === bug.id ? editedBug.severity : bug.severity
								}
								onChange={(e) => handleFieldChange('severity', e.target.value)}
							>
								<option value="Critical">Critical</option>
								<option value="Major">Major</option>
								<option value="Moderate">Moderate</option>
								<option value="Minor">Minor</option>
							</select>
						</td>
						{/* Description Cell */}
						<td
							className={`${
								editingBugId === bug.id
									? 'text-dark fw-bold border border-2 border-info'
									: 'text-normal fw-normal'
							}`}
							contentEditable={editingBugId === bug.id}
							suppressContentEditableWarning
							onInput={(e) =>
								handleFieldChange(
									'description',
									e.currentTarget.textContent || ''
								)
							}
						>
							{editingBugId === bug.id ? editedBug.description : bug.description}
						</td>
						{/* Priority Cell */}
						<td>
							<select
								className="form-select form-select-sm"
								disabled={editingBugId !== bug.id}
								value={
									editingBugId === bug.id ? editedBug.priority : bug.priority
								}
								onChange={(e) => handleFieldChange('priority', e.target.value)}
							>
								<option value="High">High</option>
								<option value="Medium">Medium</option>
								<option value="Low">Low</option>
							</select>
						</td>
						{/* Tags Cell */}
						<td
							className={`${
								editingBugId === bug.id
									? 'text-dark fw-bold border border-2 border-info'
									: 'text-normal fw-normal'
							}`}
							contentEditable={editingBugId === bug.id}
							suppressContentEditableWarning
							onInput={(e) =>
								handleFieldChange(
									'tags',
									e.currentTarget.textContent
										?.split(',')
										.map((tag) => tag.trim()) || []
								)
							}
						>
							{editingBugId === bug.id
								? editedBug.tags?.join(', ')
								: bug.tags?.join(', ')}
						</td>
						{/* Status Dropdown */}
						<td>
							<select
								className={`${
									(editingBugId === bug.id ? editedBug.resolved : bug.resolved)
										? 'form-select form-select-sm text-success fw-bold'
										: 'form-select form-select-sm text-dark'
								}`}
								disabled={editingBugId !== bug.id}
								value={
									editingBugId === bug.id
										? editedBug.resolved
											? 'true'
											: 'false'
										: bug.resolved
										? 'true'
										: 'false'
								}
								onChange={(e) =>
									handleFieldChange('resolved', e.target.value === 'true')
								}
							>
								<option value="false">Pending</option>
								<option value="true">Resolved</option>
							</select>
						</td>
						{/* Reported At Cell */}
						<td>{bug.reportedAt}</td>
						{/* Action Buttons */}
						<td>
							<div className="d-flex justify-content-between">
								{editingBugId === bug.id ? (
									<button
										onClick={handleSaveBug}
										className="btn btn-success btn-sm me-1"
									>
										Save
									</button>
								) : (
									<button
										onClick={() => handleEditStart(bug)}
										className="btn btn-outline-info btn-sm me-1"
									>
										<MdEditSquare />
									</button>
								)}
								<button
									onClick={() => handleDeleteBug(bug.id)}
									className="btn btn-outline-danger btn-sm"
								>
									<MdDelete />
								</button>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
export default BugList;
