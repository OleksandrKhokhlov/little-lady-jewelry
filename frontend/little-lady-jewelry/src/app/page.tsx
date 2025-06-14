"use client";
import { SetStateAction, useState } from "react";
import { Container } from "./components/shared/container";
import { FiltrPopUp } from "./components/shared/filtrPopUp";
import { Hero } from "./components/shared/hero";
import { ProduktCard } from "./components/shared/produkt-card";
import { WrapCatalog } from "./components/shared/wrapCastalog";
import { useProduktContext } from "@/lib/productContext";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("Всі");
  const { produkts, favoriteProdukts, toggleFavorite } = useProduktContext();

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
        <WrapCatalog className="mt-2 gap-x-2 gap-y-6 justify-start">
          {produkts.length > 0 ? (
            produkts.map(({ _id: id, images, price, type, quantity, name }) => (
              <ProduktCard
                key={id}
                id={id}
                images={images}
                name={name}
                price={price}
                type={type}
                quantity={quantity}
                favoriteProdukts={favoriteProdukts}
                onToggleFavorite={() => toggleFavorite(id)}
                className={
                  "w-[calc((100%/3)-6px)]  flex flex-col justify-between font-bold "
                }
              />
            ))
          ) : (
            <p>loading</p>
          )}
        </WrapCatalog>
      </Container>
    </>
  );
}
