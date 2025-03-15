"use client";
import { SetStateAction, useState } from "react";
import { Container } from "./components/shared/container";
import { FiltrPopUp } from "./components/shared/filtrPopUp";
import { Hero } from "./components/shared/hero";
import { ProductCard } from "./components/shared/produkt-card";
import { WrapCatalog } from "./components/shared/wrapCastalog";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("Всі");

  return (
    <>
      <Hero width={1280} height={648} />
      <Container className="py-0 mt-2">
        <FiltrPopUp
          selectedValue={selectedValue}
          handleChange={(e: { target: { value: SetStateAction<string> } }) =>
            setSelectedValue(e.target.value)
          }
        />
        <WrapCatalog className="mt-2 gap-y-4">
          <ProductCard
            id={"123"}
            images={[]}
            price={398}
            type={"пусети на закрутках"}
            quantity={10}
            className={"w-[calc((100%/3)-8px)] rounded-sm font-bold"}
          />
          <ProductCard
            id={"124"}
            images={[]}
            price={200}
            type={"англійський замок"}
            quantity={0}
            className={"w-[calc((100%/3)-8px)] rounded-sm font-bold"}
          />
          <ProductCard
            id={"125"}
            images={[]}
            price={1234}
            type={"англійський замок"}
            quantity={10}
            className={"w-[calc((100%/3)-8px)] rounded-sm font-bold"}
          />
          <ProductCard
            id={"126"}
            images={[]}
            price={0}
            type={"англійський замок"}
            quantity={0}
            className={"w-[calc((100%/3)-8px)] rounded-sm font-bold"}
          />
        </WrapCatalog>
      </Container>
    </>
  );
}
