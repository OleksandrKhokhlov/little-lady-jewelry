"use client";

import { createPortal } from "react-dom";
import { Modal } from "./modal";
import { NavMenu } from "./navMenu";
import { ContactsMenu } from "./contactsMenu";
import { BurgerMenuProps } from "@/types";
import { useEffect, useState } from "react";

export const ModalBurgerMenu = ({
  isModalBurgerOpen,
  setModalBurgerOpen,
  setModalCartOpen,
}: BurgerMenuProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
