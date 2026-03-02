import { ButtonProps } from "@/types";

export const Button = ({
  type = "button",
  text,
  icon,
  onClick,
  className,
  disabled = false,
  ariaLabel,
  children,
}: ButtonProps) => {
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
