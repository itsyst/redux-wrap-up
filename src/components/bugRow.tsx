import { MdDelete, MdEditSquare } from 'react-icons/md';
import { Draggable } from '@hello-pangea/dnd';
import { Bug } from '../store/entities/bugs';
import { UserState } from '../store/entities/users';

interface BugRowProps {
	bug: Bug;
	index: number;
	editingBugId: string | null;
	editedBug: Partial<Bug>;
	users: UserState['entities']['users']['list'];
	handleEditStart: (bug: Bug) => void;
	handleSaveBug: () => void;
	handleFieldChange: (
		field: keyof Bug,
		value: string | boolean | number | string[]
	) => void;
	handleDeleteBug: (bugId: string) => void;
}

const BugRow: React.FC<BugRowProps> = ({
	bug,
	index,
	editingBugId,
	editedBug,
	users,
	handleEditStart,
	handleSaveBug,
	handleFieldChange,
	handleDeleteBug
}) => {
	const isEditing = editingBugId === bug.id;

	const getUserName = (userId: number) => {
		const user = users.find((user) => user.id === userId);
		return user ? user.name : 'Unknown User';
	};

	return (
		<Draggable key={bug.id} draggableId={bug.id} index={index}>
			{(provided) => (
				<tr
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					{/* Assigned User */}
					<td>
						{isEditing ? (
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
							className={`form-select form-select-sm ${
								(isEditing ? editedBug.severity : bug.severity) === 'Critical'
									? 'text-danger fw-bold'
									: 'text-dark'
							}`}
							disabled={!isEditing}
							value={isEditing ? editedBug.severity : bug.severity}
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
							isEditing
								? 'text-dark fw-bold border border-2 border-info'
								: 'text-normal fw-normal'
						}`}
						contentEditable={isEditing}
						suppressContentEditableWarning
						onInput={(e) =>
							handleFieldChange('description', e.currentTarget.textContent || '')
						}
					>
						{isEditing ? editedBug.description : bug.description}
					</td>
					{/* Priority Cell */}
					<td>
						<select
							className="form-select form-select-sm"
							disabled={!isEditing}
							value={isEditing ? editedBug.priority : bug.priority}
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
							isEditing
								? 'text-dark fw-bold border border-2 border-info'
								: 'text-normal fw-normal'
						}`}
						contentEditable={isEditing}
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
						{isEditing ? editedBug.tags?.join(', ') : bug.tags?.join(', ')}
					</td>
					{/* Status Dropdown */}
					<td>
						<select
							className={`${
								(isEditing ? editedBug.resolved : bug.resolved)
									? 'form-select form-select-sm text-success fw-bold'
									: 'form-select form-select-sm text-dark'
							}`}
							disabled={!isEditing}
							value={
								isEditing
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
							{isEditing ? (
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
			)}
		</Draggable>
	);
};

export default BugRow;
