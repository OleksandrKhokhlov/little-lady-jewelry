interface CustomRadioProps {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}

export const CustomRadioButton: React.FC<CustomRadioProps> = ({
  name,
  value,
  label,
  checked = false,
  onChange,
  disabled = false,
  className = "",
  labelClassName = "",
}) => {
  return (
    <label
      className={`inline-flex items-center cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <div className="relative">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`w-4 h-4 border-2 border-[var(--accent-color)] rounded-full transition-colors duration-200 flex items-center justify-center `}
        >
          {checked && (
            <div className="w-2 h-2 bg-[var(--accent-color)] rounded-full"></div>
          )}
        </div>
      </div>
      <span className={`ml-2 text-sm ${labelClassName}`}>{label}</span>
    </label>
  );
};
