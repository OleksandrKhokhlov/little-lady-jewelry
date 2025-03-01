import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Modal from "../ui/modal";
import Icon from "../ui/icon";

interface BurgerMenuProps {
  isModalBurgerOpen: boolean;
  setModalBurgerOpen: () => void;
}

export const ModalBurgerMenu: React.FC<BurgerMenuProps> = ({
  isModalBurgerOpen,
  setModalBurgerOpen,
}) => {
    const pathname = usePathname();
    
  return (
    <Modal
      isOpen={isModalBurgerOpen}
      onClose={setModalBurgerOpen}
      side="left"
      className="md:hidden"
    >
      <nav>
        <ul className="flex flex-col gap-4 mt-2 ">
          <li>
            <Link
              href={"/"}
              onClick={setModalBurgerOpen}
              className={`px-1 border-b-2  w-fit  ${pathname === "/" ? "text-[var(--accent-color)] border-[var(--accent-color)]" : "border-[var(--text-color)]"}`}
            >
              Головна
            </Link>
          </li>
          <li>
            <Link
              href={"/favorite"}
              onClick={setModalBurgerOpen}
              className={`px-1 border-b-2  w-fit ${pathname === "/favorite" ? "text-[var(--accent-color)] border-[var(--accent-color)]" : "border-[var(--text-color)]"}`}
            >
              Улюблене
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              onClick={setModalBurgerOpen}
              className={
                "px-1 flex gap-4 border-b-2 border-[var(--text-color)] w-fit"
              }
            >
              Кошик
              <Icon iconId="icon-Cart" className="w-[13px] h-[15px]" />
            </Link>
          </li>
          <li>
            <Link
              href={"/deliveryAndPayment"}
              onClick={setModalBurgerOpen}
              className={`px-1 border-b-2  w-fit ${pathname === "/deliveryAndPayment" ? "text-[var(--accent-color)] border-[var(--accent-color)]" : "border-[var(--text-color)]"}`}
            >
              Доставка та оплата
            </Link>
          </li>
        </ul>
      </nav>
      <ul className="flex gap-10 mt-8">
        <li>
          <a
            href={
              "https://www.instagram.com/little.lady.jewelry?igsh=cWJmaWYwdmVxdjJ1"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon iconId="icon-Instagram" className="size-5" />
          </a>
        </li>
        <li>
          <a
            href={"https://t.me/tanya_khokhlovaa"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon iconId="icon-Telegram" className="size-5" />
          </a>
        </li>
        <li>
          <a
            href={"viber://chat?number=+380932470158"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon iconId="icon-Viber" className="size-5" />
          </a>
        </li>
      </ul>
    </Modal>
  );
};
