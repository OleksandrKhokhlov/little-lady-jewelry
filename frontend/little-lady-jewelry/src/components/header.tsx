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
      <Container className="flex items-center justify-between">
        <Button
          icon={
            <Icon
              iconId="icon-Burger"
              className="w-5 h-[15px] fill-[var(--accent-color)]"
            />
          }
          onClick={() => {
            setModalBurgerOpen(true);
            setModalCartOpen(false);
          }}
          className="md:hidden  w-[72px]"
        />
        <Logo />
        <div className="flex items-center justify-between gap-11">
          <Link href={"./favorite"} className="relative">
            <Icon
              iconId="icon-Heart"
              className="size-[15px] fill-[var(--accent-color)] stroke-2"
            />
            {favoriteProdukts.length > 0 && isClient && (
              <span className="absolute top-0 left-[50%] transform -translate-x-1/2 text-[10px] block">
                {favoriteProdukts.length}
              </span>
            )}
          </Link>
          <Button
            className="relative"
            icon={
              <Icon
                iconId="icon-Cart"
                className=" w-[13px] h-[15px] fill-[var(--accent-color)]"
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
