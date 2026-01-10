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
      <Container className="flex items-center justify-between pt-2">
        <Button
          icon={
            <Icon
              iconId="icon-Burger"
              className="w-4 h-[16px] fill-[var(--accent-color)]"
            />
          }
          onClick={() => {
            setModalBurgerOpen(true);
            setModalCartOpen(false);
          }}
          className="md:hidden  w-[72px]"
        />
        <NavMenu className="hidden md:block" />
        <Logo />
        <div className="flex items-center justify-between gap-10">
          <ContactsMenu className="hidden md:flex " />
          <Link
            href={"./favorite"}
            className="relative h-full p-1 fill-[var(--accent-color)] hover:fill-[var(--hover-color)]  hover:scale-125 transition-all duration-300"
          >
            <Icon
              iconId="icon-Heart"
              className="size-[16px] stroke-2"
            />
            {favoriteProdukts.length > 0 && isClient && (
              <span className="absolute top-[45%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[10px] block">
                {favoriteProdukts.length}
              </span>
            )}
          </Link>
          <Button
            className="relative h-full p-1 fill-[var(--accent-color)] hover:fill-[var(--hover-color)]  hover:scale-125 transition-all duration-300"
            icon={
              <Icon
                iconId="icon-Cart"
                className=" w-[14px] h-[16px]"
              />
            }
            onClick={() => {
              setModalCartOpen(true);
              setModalBurgerOpen(false);
            }}
          >
            {isClient && inCart.length > 0 && (
              <span className="absolute top-[55%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[10px] block">
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
