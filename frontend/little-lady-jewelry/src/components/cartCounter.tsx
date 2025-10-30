"use client";

import toast from "react-hot-toast";
import { Icon } from "./icon";
import { Button } from "./button";

interface CartCounterProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export const CartCounter: React.FC<CartCounterProps> = ({
  value,
  min = 1,
  max = 99,
  onChange,
}) => {
  const handleIncrement = () => {
    if (value >= max) {
      toast.error(`Максимальна кількість: ${max}`);
      return;
    }
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center border-2 border-[var(--accent-color)] rounded-sm">
      <Button
        onClick={handleDecrement}
        icon={
          <Icon
            iconId="icon-Minus"
            className="size-[15px] fill-[var(--text-color)] "
          />
        }
        disabled={value <= min}
        className="bg-[var(--accent-color)] p-[3px]"
        ariaLabel="Зменшити кількість"
      />
      <span className="w-[20px] text-center text-[16px]">{value}</span>
      <Button
        onClick={handleIncrement}
        icon={
          <Icon
            iconId="icon-Plus"
            className="size-[15px] fill-[var(--text-color)]"
          />
        }
        className="bg-[var(--accent-color)] p-[3px]"
        ariaLabel="Збільшити кількість"
      />
    </div>
  );
};
