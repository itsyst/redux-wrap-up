import { Draggable } from '@hello-pangea/dnd';
import { Bug } from '../../store/entities/bugs';
import { UserState } from '../../store/entities/users';
import EditableSelect from '../common/editableSelect';
import EditableCell from '../common/editableCell';
import ActionButtons from '../common/actionButtons';

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
		const user = users.find((user) => Number(user.id) === userId);
		return user ? user.name : 'Unknown User';
	};

	const severityOptions = [
		{ value: 'Critical', label: 'Critical' },
		{ value: 'Major', label: 'Major' },
		{ value: 'Moderate', label: 'Moderate' },
		{ value: 'Minor', label: 'Minor' }
	];

	const priorityOptions = [
		{ value: 'High', label: 'High' },
		{ value: 'Medium', label: 'Medium' },
		{ value: 'Low', label: 'Low' }
	];

	const statusOptions = [
		{ value: 'false', label: 'Pending' },
		{ value: 'true', label: 'Resolved' }
	];

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
							<EditableSelect
								value={editedBug.userId || bug.userId || 0}
								options={users.map((user) => ({
									value: String(user.id),
									label: user.name
								}))}
								disabled={!isEditing}
								onChange={(value) => handleFieldChange('userId', Number(value))}
							/>
						) : (
							<span className={!bug.userId ? 'fw-bold text-danger' : ''}>
								{getUserName(bug.userId || 0)}
							</span>
						)}
					</td>
					{/* Severity Cell */}
					<td>
						<EditableSelect
							value={isEditing ? editedBug.severity || '' : bug.severity || ''}
							options={severityOptions}
							disabled={!isEditing}
							onChange={(value) => handleFieldChange('severity', value)}
							className={
								(isEditing ? editedBug.severity : bug.severity) === 'Critical'
									? 'text-danger fw-bold'
									: 'text-dark'
							}
						/>
					</td>
					{/* Description Cell */}
					<EditableCell
						value={
							isEditing ? editedBug.description || '' : bug.description || ''
						}
						isEditing={isEditing}
						onChange={(value) => handleFieldChange('description', value)}
					/>
					{/* Priority Cell */}
					<td>
						<EditableSelect
							value={isEditing ? editedBug.priority || '' : bug.priority || ''}
							options={priorityOptions}
							disabled={!isEditing}
							onChange={(value) => handleFieldChange('priority', value)}
						/>
					</td>
					{/* Tags Cell */}
					<EditableCell
						value={isEditing ? editedBug.tags || [] : bug.tags || []}
						isEditing={isEditing}
						onChange={(value) => handleFieldChange('tags', value)}
					/>
					{/* Status Dropdown */}
					<td>
						<EditableSelect
							value={
								isEditing
									? editedBug.resolved
										? 'true'
										: 'false'
									: bug.resolved
									? 'true'
									: 'false'
							}
							options={statusOptions}
							disabled={!isEditing}
							onChange={(value) =>
								handleFieldChange('resolved', value === 'true')
							}
							className={
								(isEditing ? editedBug.resolved : bug.resolved)
									? 'text-success fw-bold'
									: 'text-dark'
							}
						/>
					</td>
					{/* Reported At Cell */}
					<td>{bug.reportedAt}</td>
					{/* Action Buttons */}
					<td>
						<ActionButtons
							isEditing={isEditing}
							onSave={handleSaveBug}
							onEdit={() => handleEditStart(bug)}
							onDelete={() => handleDeleteBug(bug.id)}
						/>
					</td>
				</tr>
			)}
		</Draggable>
	);
};

export default BugRow;
