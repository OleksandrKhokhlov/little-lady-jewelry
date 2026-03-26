"use client";

import { NavMenuProps } from "@/types";
import { Icon } from "./icon";
import { NavLink } from "./navLink";

export const NavMenu = ({
  setModalBurgerOpen = () => {},
  setModalCartOpen = () => {},
  className,
}: NavMenuProps) => {
  return (
    <nav className={className}>
      <ul className="text-4 md:text-[18px] flex flex-col gap-5 md:gap-3 mt-2 md:flex-row md:mt-0 md:items-center md:w-full md:h-full">
        <li>
          <NavLink href={"/"} onClick={setModalBurgerOpen}>
            Головна
          </NavLink>
        </li>
        <li>
          <NavLink href={"/favorite"} onClick={setModalBurgerOpen}>
            Улюблене
          </NavLink>
        </li>
        <li className="md:hidden">
          <NavLink
            href={"/cart"}
            onClick={(e) => {
              e.preventDefault();
              setModalCartOpen();
              setModalBurgerOpen();
            }}
            className={" flex gap-2 "}
          >
            <Icon
              iconId="icon-Cart"
              className="w-[13px] h-[15px] fill-[var(--accent-color)]"
            />
            Кошик
          </NavLink>
        </li>
        <li>
          <NavLink href={"/deliveryAndPayment"} onClick={setModalBurgerOpen}>
            Доставка та оплата
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
