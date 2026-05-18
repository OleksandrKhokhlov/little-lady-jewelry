import { Icon } from "./icon";

interface CustomCheckboxProps {
  checked: boolean;
  quantity: number;
  onChange?: (id: string) => void;
  id: string;
}

export const CustomCheckbox = ({
  checked,
  quantity,
  onChange,
  id,
}: CustomCheckboxProps) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => quantity && onChange?.(id)}
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
