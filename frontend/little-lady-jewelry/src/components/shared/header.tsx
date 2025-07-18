"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Container } from "./container";
import { Icon } from "../ui";
import { Button } from "../ui";
import { Logo } from "../ui";
import { ModalBurgerMenu } from "./modalBurgerMenu";
import { ModalCart } from "./modalCart";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const [isModalBurgerOpen, setModalBurgerOpen] = useState(false);
  const [isModalCartOpen, setModalCartOpen] = useState(false);

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
          <Link href={"./favorite"}>
            <Icon
              iconId="icon-Heart"
              className="size-[15px] fill-[var(--accent-color)]"
            />
          </Link>
          <Button
            icon={
              <Icon
                iconId="icon-Cart"
                className="w-[13px] h-[15px] fill-[var(--accent-color)]"
              />
            }
            onClick={() => {
              setModalCartOpen(true);
              setModalBurgerOpen(false);
            }}
          />
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
