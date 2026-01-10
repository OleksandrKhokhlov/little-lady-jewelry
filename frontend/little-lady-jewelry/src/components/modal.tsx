import React, { useEffect } from "react";
import { Icon } from "./icon";

interface ModalProps {
  header?: string;
  isOpen: boolean;
  onClose: () => void;
  side?: "left" | "right";
  className?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  header,
  isOpen,
  onClose,
  side = "right",
  className,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } ${className}`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 ${side === "right" ? "right-0 rounded-l-xl" : "left-0 rounded-r-xl"} bg-[var(--bg-color)] shadow-lg transition-transform duration-300 ${className} ${
          isOpen
            ? "translate-x-0"
            : side === "right"
              ? "translate-x-full"
              : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={` flex  ${header ? "justify-between border-b-2 border-[var(--accent-color)]" : "justify-end "} align-baseline `}
        >
          {" "}
          {header && <h2 className="text-[20px]">{header}</h2>}
          <button onClick={onClose} className="fill-[var(--text-color)] hover:fill-[var(--hover-color)] transition-all duration-300">
            <Icon iconId="icon-Cross" className="size-[15px] " />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
