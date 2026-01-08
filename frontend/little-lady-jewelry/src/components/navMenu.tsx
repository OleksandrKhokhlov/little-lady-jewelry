import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icon";

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
  const pathname = usePathname();
  return (
    <nav className="hidden md:block">
      <ul className="flex flex-col gap-4 mt-2 md:flex-row md:gap-3 md:mt-0  md:items-center  md:justify-center  md:h-[100%]">
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
        <li className="md:hidden">
          <Link
            href={"/"}
            onClick={(e) => {
              e.preventDefault();
              setModalCartOpen();
              setModalBurgerOpen();
            }}
            className={
              "px-1 flex gap-4 border-b-2 border-[var(--text-color)] w-fit "
            }
          >
            Кошик
            <Icon
              iconId="icon-Cart"
              className="w-[13px] h-[15px] fill-[var(--accent-color)]"
            />
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
  );
};
