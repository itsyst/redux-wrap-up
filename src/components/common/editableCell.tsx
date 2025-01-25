interface EditableCellProps {
	value: string | string[];
	isEditing: boolean;
	onChange: (value: string | string[]) => void;
	className?: string;
}

const EditableCell: React.FC<EditableCellProps> = ({
	value,
	isEditing,
	onChange,
	className
}) => {
	const handleInput = (e: React.FormEvent<HTMLTableCellElement>) => {
		const newValue = e.currentTarget.textContent || '';
		if (Array.isArray(value)) {
			onChange(newValue.split(',').map((tag) => tag.trim()));
		} else {
			onChange(newValue);
		}
	};

	return (
		<td
			className={`${
				isEditing
					? 'text-dark fw-bold border border-2 border-info'
					: 'text-normal fw-normal'
			} ${className || ''}`}
			contentEditable={isEditing}
			suppressContentEditableWarning
			onInput={handleInput}
		>
			{Array.isArray(value) ? value.join(', ') : value}
		</td>
	);
};

export default EditableCell;
