"use client";

import { useEffect, useState } from "react";
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

export const Header = ({ className }: { className?: string }) => {
  const { favoriteProdukts, inCart } = useProduktContext();
  const [isModalBurgerOpen, setModalBurgerOpen] = useState(false);
  const [isModalCartOpen, setModalCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className={className}>
      <Container className="flex justify-between items-center py-2">
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
          className="lg:hidden w-8 min-w-[96px] h-full p-1"
        />
        <NavMenu className="text-[16px] hidden lg:block md:min-w-[340px]" />
        <Logo />
        <div className="flex items-center justify-between lg:min-w-[365px]">
          <ContactsMenu className="hidden lg:flex" />
          <div className="flex items-center justify-end gap-8">
            <Link
              href={"/favorite"}
              className="relative w-8 h-full p-1 fill-[var(--accent-color)] hover:fill-[var(--hover-color)] hover:scale-125 transition-all duration-300"
            >
              <Icon iconId="icon-Heart" className="size-7 stroke-2" />
              {favoriteProdukts.length > 0 && isClient && (
                <span className="absolute top-[45%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 text-[12px] block">
                  {favoriteProdukts.length}
                </span>
              )}
            </Link>
            <Button
              className="relative w-8 h-full p-1 fill-[var(--accent-color)] hover:fill-[var(--hover-color)]  hover:scale-125 transition-all duration-300"
              icon={
                <Icon iconId="icon-Cart" className=" w-7 h-8" />
              }
              onClick={() => {
                setModalCartOpen(true);
                setModalBurgerOpen(false);
              }}
            >
              {isClient && inCart.length > 0 && (
                <span className="absolute top-[60%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 text-[12px] block">
                  {inCart.length}
                </span>
              )}
            </Button>
          </div>
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
