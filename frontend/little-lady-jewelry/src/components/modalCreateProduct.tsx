import { createPortal } from "react-dom";
import { AdminProductEditor } from "./adminProductEditor";
import { Modal } from "./modal";

interface ModalCreateProductProps {
  isModalOpen: boolean;
  setModalOpen: () => void;
}

export const ModalCreateProduct = ({
  isModalOpen,
  setModalOpen,
}: ModalCreateProductProps) => {
  return createPortal(
    <Modal
      header="Створення продукту"
      isOpen={isModalOpen}
      onClose={setModalOpen}
      className="p-3"
    >
      <AdminProductEditor />
    </Modal>,
    document.body,
  );
};
