import React from "react";
import Icon from "./icon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  side?: "left" | "right";
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, side = "right", children }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 ${side === "right" ? "right-0" : "left-0"} h-full w-80 bg-white shadow-lg p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : side === "right" ? "translate-x-full" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 hover:text-black">
          <Icon iconId="icon-Cross" className="size-[15px]"/>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
