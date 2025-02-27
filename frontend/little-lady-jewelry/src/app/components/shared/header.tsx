"use client";
import React, { useState } from "react";
import { Container } from "./container";
import Icon from "../ui/icon";
import Link from "next/link";
import Button from "../ui/button";

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
            !setModalBurgerOpen;
            setModalCartOpen(false);
          }}
          className="md:hidden  w-[72px]"
        />
        <Link href={"./"} className="text-center">
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
              !setModalCartOpen;
              setModalBurgerOpen(false);
            }}
          />
        </div>
      </Container>
    </header>
  );
};
