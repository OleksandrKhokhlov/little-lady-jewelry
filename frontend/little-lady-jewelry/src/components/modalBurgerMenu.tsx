import React from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Modal } from "./modal";
import { Icon } from "./icon";
import { NavMenu } from "./navMenu";

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
      <ul className="flex gap-10 mt-8">
        <li>
          <a
            href={
              "https://www.instagram.com/little.lady.jewelry?igsh=cWJmaWYwdmVxdjJ1"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              iconId="icon-Instagram"
              className="size-5 fill-[var(--accent-color)]"
            />
          </a>
        </li>
        <li>
          <a
            href={"https://t.me/tanya_khokhlovaa"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              iconId="icon-Telegram"
              className="size-5 fill-[var(--accent-color)] stroke-[var(--accent-color)]"
            />
          </a>
        </li>
        <li>
          <a
            href={"viber://chat?number=+380932470158"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              iconId="icon-Viber"
              className="size-5 fill-[var(--accent-color)]"
            />
          </a>
        </li>
      </ul>
    </Modal>,
    document.body,
  );
};
