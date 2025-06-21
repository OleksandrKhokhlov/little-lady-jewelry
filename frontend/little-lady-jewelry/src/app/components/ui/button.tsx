import React from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  text?: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  text,
  icon,
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {icon && icon}
      {text && text}
    </button>
  );
};
