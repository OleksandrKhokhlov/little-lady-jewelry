"use client";
import { SetStateAction, useState } from "react";
import { Container } from "./components/shared";
import { FiltrPopUp } from "./components/shared";
import { Hero } from "./components/shared";
import { ProduktCard } from "./components/shared";
import { WrapCatalog } from "./components/shared";
import { useProduktContext } from "@/lib";

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
        <WrapCatalog className="mt-2 gap-x-2 gap-y-6">
          {produkts.length > 0 ? (
            produkts.map((produkt) => (
              <ProduktCard
                key={produkt._id}
                produkt={produkt}
                favoriteProdukts={favoriteProdukts}
                onToggleFavorite={() => toggleFavorite(produkt._id)}
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
