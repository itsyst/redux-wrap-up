interface EditableSelectProps {
	value: string | number | boolean;
	options: { value: string; label: string }[];
	disabled: boolean;
	onChange: (value: string) => void;
	className?: string;
}

const EditableSelect: React.FC<EditableSelectProps> = ({
	value,
	options,
	disabled,
	onChange,
	className
}) => {
	return (
		<select
			className={`form-select form-select-sm ${className || ''}`}
			disabled={disabled}
			value={String(value)}
			onChange={(e) => onChange(e.target.value)}
		>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default EditableSelect;
