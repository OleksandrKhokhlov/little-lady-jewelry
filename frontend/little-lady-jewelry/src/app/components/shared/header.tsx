"use client";
import React, { useState } from "react";
import { Container } from "./container";
import Icon from "../ui/icon";
import Link from "next/link";
import Button from "../ui/button";
import { Logo } from "../ui/logo";
import { ModalBurgerMenu } from "./modalBurgerMenu";

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
          icon={<Icon iconId="icon-Burger" className="w-5 h-[15px] " />}
          onClick={() => {
            setModalBurgerOpen(true);
            setModalCartOpen(false);
          }}
          className="md:hidden  w-[72px]"
        />
        <Logo />
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
        <ModalBurgerMenu
          isModalBurgerOpen={isModalBurgerOpen}
          setModalBurgerOpen={() => setModalBurgerOpen(false)}
        />
      </Container>
    </header>
  );
};
