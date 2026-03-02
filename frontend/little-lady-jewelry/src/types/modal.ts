export interface ModalProps {
  header?: string;
  isOpen: boolean;
  onClose: () => void;
  side?: "left" | "right";
  className?: string;
}

export interface BurgerMenuProps {
  isModalBurgerOpen: boolean;
  setModalBurgerOpen: () => void;
  setModalCartOpen: () => void;
}

export interface ModalCartProps {
  isModalCartOpen: boolean;
  setModalCartOpen: () => void;
}