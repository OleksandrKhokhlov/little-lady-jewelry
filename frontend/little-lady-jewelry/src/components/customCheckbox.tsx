import { Icon } from "./icon";

interface CustomCheckboxProps {
  checked: boolean;
  onChange?: (id: string) => void;
  id: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  id,
}) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange?.(id)}
        className="sr-only"
      />
      <div
        className={`mr-1 w-4 h-4 border-2 rounded-md transition-colors duration-200 flex items-center justify-center ${
          checked
            ? "bg-[var(--accent-color)] border-[var(--accent-color)]"
            : " border-[var(--accent-color)]"
        }`}
      >
        {checked && (
          <Icon iconId="icon-Checked" className="w-3 h-3 text-white" />
        )}
      </div>
    </label>
  );
};
