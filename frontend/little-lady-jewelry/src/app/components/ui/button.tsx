import React from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  text?: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ type='button', text, icon, onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {icon && icon}
      {text && text}
    </button>
  );
};

export default Button;
