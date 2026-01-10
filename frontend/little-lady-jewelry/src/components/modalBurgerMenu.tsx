import React from "react";

import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Modal } from "./modal";
import { NavMenu } from "./navMenu";
import { ContactsMenu } from "./contactsMenu";

interface BurgerMenuProps {
  isModalBurgerOpen: boolean;
  setModalBurgerOpen: () => void;
  setModalCartOpen: () => void;
}

export const ModalBurgerMenu: React.FC<BurgerMenuProps> = ({
  isModalBurgerOpen,
  setModalBurgerOpen,
  setModalCartOpen,
}) => {
  const pathname = usePathname();
  if (!isModalBurgerOpen) return null;

  return createPortal(
    <Modal
      isOpen={isModalBurgerOpen}
      onClose={setModalBurgerOpen}
      side="left"
      className="md:hidden p-3"
    >
      <NavMenu
        setModalBurgerOpen={setModalBurgerOpen}
        setModalCartOpen={setModalCartOpen}
      />
      <ContactsMenu />
    </Modal>,
    document.body,
  );
};
