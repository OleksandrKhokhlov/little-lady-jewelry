"use client";

import { Icon } from "./icon";
import { NavLink } from "./navLink";

interface NavMenuProps {
  setModalBurgerOpen?: () => void;
  setModalCartOpen?: () => void;
  className?: string;
}

export const NavMenu: React.FC<NavMenuProps> = ({
  setModalBurgerOpen = () => {},
  setModalCartOpen = () => {},
  className,
}) => {
  return (
    <nav className={className}>
      <ul className="flex flex-col gap-4 mt-2 md:flex-row md:mt-0  md:items-center  md:justify-between md:w-full  md:h-full">
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
