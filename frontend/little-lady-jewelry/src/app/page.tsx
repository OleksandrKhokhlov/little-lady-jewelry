"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Container } from "../components";
import { FiltrPopUp } from "../components";
import { Hero } from "../components";
import { ProduktCard } from "../components";
import { useProduktContext } from "@/lib";

export default function Home() {
  const { produkts, favoriteProdukts, toggleFavorite } = useProduktContext();
  const [selectedValue, setSelectedValue] = useState("Всі");
  const [filtredProdukts, setFilteredProdukts] = useState(produkts);

  useEffect(() => {
    const normalizedSelectedValue = selectedValue
      .toLowerCase()
      .replace(/\s/g, "");
    const filtred = produkts.filter((produkt) => {
      const normalizedProduktType = produkt.type
        .toLowerCase()
        .replace(/\s/g, "");
      return (
        normalizedSelectedValue === "всі" ||
        normalizedSelectedValue === normalizedProduktType
      );
    });
    setFilteredProdukts(filtred);
  }, [selectedValue, produkts]);

  return (
    <>
      <Hero />
      <Container className="py-0 pb-4">
        <FiltrPopUp
          selectedValue={selectedValue}
          handleChange={(e: { target: { value: SetStateAction<string> } }) =>
            setSelectedValue(e.target.value)
          }
        />
        {produkts.length === 0 ? (
          <p>
            Нажаль в продажу поки що немає прикрас з типом застібки:{" "}
            {selectedValue}.
          </p>
        ) : (
          <ul className="grid grid-cols-3 min-[570px]:grid-cols-5 min-[840px]:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mt-2 md:mt-4">
            {filtredProdukts.map((produkt) => (
              <ProduktCard
                key={produkt._id}
                produkt={produkt}
                favoriteProdukts={favoriteProdukts}
                onToggleFavorite={() => toggleFavorite(produkt._id)}
                className={
                  "flex flex-col justify-between font-bold max-w-[150px]"
                }
              />
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
