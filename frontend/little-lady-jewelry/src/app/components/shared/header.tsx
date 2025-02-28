"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "./container";
import Icon from "../ui/icon";
import Link from "next/link";
import Button from "../ui/button";
import Modal from "../ui/modal";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const [isModalBurgerOpen, setModalBurgerOpen] = useState(false);
  const [isModalCartOpen, setModalCartOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={className}>
      <Container className="flex items-center justify-between">
        <Button
          icon={<Icon iconId="icon-Burger" className="w-5 h-[15px] " />}
          onClick={() => {
            setModalBurgerOpen(true);
            setModalCartOpen(false);
          }}
          className="md:hidden  w-[72px]"
        />
        <Link href={"/"} className="text-center">
          <h1 className="font-kallithea">Little lady</h1>
          <h2 className="font-calisto text-[10px] text-[var(--accent-color)] uppercase">
            Jewelry
          </h2>
        </Link>
        <div className="flex items-center justify-between gap-11">
          <Link href={"./favorite"}>
            <Icon iconId="icon-Heart" className="size-[15px]" />
          </Link>
          <Button
            icon={<Icon iconId="icon-Cart" className="w-[13px] h-[15px]" />}
            onClick={() => {
              setModalCartOpen(true);
              setModalBurgerOpen(false);
            }}
          />
        </div>
        <Modal
          isOpen={isModalBurgerOpen}
          onClose={() => setModalBurgerOpen(false)}
          side="left"
        >
          <nav>
            <ul className="flex flex-col gap-4 mt-2 ">
              <li>
                <Link
                  href={"/"}
                  onClick={() => setModalBurgerOpen(false)}
                  className={`px-1 border-b-2 border-[var(--text-color)] w-fit  ${pathname === "/" ? "text-[var(--hover-color)] border-[var(--hover-color)]" : ""}`}
                >
                  Головна
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href={"./favorite"}
                  onClick={() => setModalBurgerOpen(false)}
                  className={`px-1 border-b-2 border-[var(--text-color)] w-fit ${pathname === "/favorite" ? "text-[var(--hover-color)] border-[var(--hover-color)]" : ""}`}
                >
                  Улюблене
                </Link>
              </li>
              <li>
                <Link
                  href={"./deliveryAndPayment"}
                  onClick={() => setModalBurgerOpen(false)}
                  className={`px-1 border-b-2 border-[var(--text-color)] w-fit ${pathname === "/deliveryAndPayment" ? "text-[var(--hover-color)] border-[var(--hover-color)]" : ""}`}
                >
                  Доставка та оплата
                </Link>
              </li>
            </ul>
          </nav>
        </Modal>
      </Container>
    </header>
  );
};
