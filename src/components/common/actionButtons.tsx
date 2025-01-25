import { MdDelete, MdEditSquare } from 'react-icons/md';

interface ActionButtonsProps {
	isEditing: boolean;
	onSave: () => void;
	onEdit: () => void;
	onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
	isEditing,
	onSave,
	onEdit,
	onDelete
}) => {
	return (
		<div className="d-flex justify-content-between">
			{isEditing ? (
				<button onClick={onSave} className="btn btn-success btn-sm me-1">
					Save
				</button>
			) : (
				<button onClick={onEdit} className="btn btn-outline-info btn-sm me-1">
					<MdEditSquare />
				</button>
			)}
			<button onClick={onDelete} className="btn btn-outline-danger btn-sm">
				<MdDelete />
			</button>
		</div>
	);
};

export default ActionButtons;
