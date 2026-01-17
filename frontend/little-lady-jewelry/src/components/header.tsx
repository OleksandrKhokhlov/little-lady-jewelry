"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "./container";
import { Icon } from "./icon";
import { Button } from "./button";
import { Logo } from "./logo";
import { ModalBurgerMenu } from "./modalBurgerMenu";
import { ModalCart } from "./modalCart";
import { useProduktContext } from "@/lib";
import { NavMenu } from "./navMenu";
import { ContactsMenu } from "./contactsMenu";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const { favoriteProdukts, inCart } = useProduktContext();
  const [isModalBurgerOpen, setModalBurgerOpen] = useState(false);
  const [isModalCartOpen, setModalCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className={className}>
      <Container className="flex justify-between items-center pt-2">
        <Button
          icon={
            <Icon
              iconId="icon-Burger"
              className="size-8 fill-[var(--accent-color)]"
            />
          }
          onClick={() => {
            setModalBurgerOpen(true);
            setModalCartOpen(false);
          }}
          className="md:hidden w-8 min-w-[88px] h-full p-1"
        />
        <NavMenu className="text-[16px] hidden md:block md:min-w-[330px]" />
        <Logo />
        <div className="flex items-center justify-end gap-6">
          <ContactsMenu className="hidden md:flex" />
          <Link
            href={"./favorite"}
            className="relative w-8 md:w-5 h-full p-1 fill-[var(--accent-color)] hover:fill-[var(--hover-color)] hover:scale-125 transition-all duration-300"
          >
            <Icon iconId="icon-Heart" className="size-7 md:size-5 stroke-2" />
            {favoriteProdukts.length > 0 && isClient && (
              <span className="absolute top-[45%] left-[55%] md:left-[70%] transform -translate-x-1/2 -translate-y-1/2 text-[12px] block">
                {favoriteProdukts.length}
              </span>
            )}
          </Link>
          <Button
            className="relative w-8 md:w-5 h-full p-1 fill-[var(--accent-color)] hover:fill-[var(--hover-color)]  hover:scale-125 transition-all duration-300"
            icon={<Icon iconId="icon-Cart" className=" w-6 h-7 md:w-4 md:h-5" />}
            onClick={() => {
              setModalCartOpen(true);
              setModalBurgerOpen(false);
            }}
          >
            {isClient && inCart.length > 0 && (
              <span className="absolute top-[55%] left-[50%] md:left-[60%] transform -translate-x-1/2 -translate-y-1/2 text-[12px] block">
                {inCart.length}
              </span>
            )}
          </Button>
        </div>
        <ModalBurgerMenu
          isModalBurgerOpen={isModalBurgerOpen}
          setModalBurgerOpen={() => setModalBurgerOpen(false)}
          setModalCartOpen={() => setModalCartOpen(true)}
        />
        <ModalCart
          isModalCartOpen={isModalCartOpen}
          setModalCartOpen={() => setModalCartOpen(false)}
        />
      </Container>
    </header>
  );
};
