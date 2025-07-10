import React from "react";
import { Modal } from "../ui";
import { createPortal } from "react-dom";

interface ModalCartProps {
  isModalCartOpen: boolean;
  setModalCartOpen: () => void;
}

export const ModalCart: React.FC<ModalCartProps> = ({
  isModalCartOpen,
  setModalCartOpen,
}) => {
  if (!isModalCartOpen) return null;

  return createPortal(
    <Modal isOpen={isModalCartOpen} onClose={setModalCartOpen}>
      <div>Кошик</div>
    </Modal>,
    document.body,
  );
};
