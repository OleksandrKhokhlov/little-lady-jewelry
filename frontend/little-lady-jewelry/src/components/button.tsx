import React from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  text?: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  text,
  icon,
  onClick,
  className,
  disabled = false,
  ariaLabel,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon && icon}
      {text && text}
      {children && children}
    </button>
  );
};
