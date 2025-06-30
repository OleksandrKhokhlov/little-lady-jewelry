import React from "react";
import { Modal } from "../ui";

interface ModalCartProps {
  isModalCartOpen: boolean;
  setModalCartOpen: () => void;
}

export const ModalCart: React.FC<ModalCartProps> = ({
  isModalCartOpen,
  setModalCartOpen,
}) => {
  return (
    <Modal isOpen={isModalCartOpen} onClose={setModalCartOpen} side="right">
      <div></div>
    </Modal>
  );
};
