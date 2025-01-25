import { Droppable } from '@hello-pangea/dnd';
import BugRow from './bugRow';
import { Bug } from '../store/entities/bugs';
import { UserState } from '../store/entities/users';

interface BugTableProps {
	bugs: Bug[];
	users: UserState['entities']['users']['list'];
	editingBugId: string | null;
	editedBug: Partial<Bug>;
	handleEditStart: (bug: Bug) => void;
	handleSaveBug: () => void;
	handleFieldChange: (
		field: keyof Bug,
		value: string | boolean | number | string[]
	) => void;
	handleDeleteBug: (bugId: string) => void;
}

const BugTable: React.FC<BugTableProps> = ({
	bugs,
	users,
	editingBugId,
	editedBug,
	handleEditStart,
	handleSaveBug,
	handleFieldChange,
	handleDeleteBug
}) => {
	return (
		<Droppable droppableId="bugList">
			{(provided) => (
				<table
					className="table table-striped table-hover table-bordered responsive mt-3"
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
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
						{bugs.map((bug, index) => (
							<BugRow
								key={bug.id}
								bug={bug}
								index={index}
								editingBugId={editingBugId}
								editedBug={editedBug}
								users={users}
								handleEditStart={handleEditStart}
								handleSaveBug={handleSaveBug}
								handleFieldChange={handleFieldChange}
								handleDeleteBug={handleDeleteBug}
							/>
						))}
						{provided.placeholder}
					</tbody>
				</table>
			)}
		</Droppable>
	);
};

export default BugTable;
