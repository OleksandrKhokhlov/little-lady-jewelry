"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Container } from "../components/shared";
import { FiltrPopUp } from "../components/shared";
import { Hero } from "../components/shared";
import { ProduktCard } from "../components/shared";
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
      <Hero width={1280} height={648} />
      <Container className="py-0 mt-2">
        <FiltrPopUp
          selectedValue={selectedValue}
          handleChange={(e: { target: { value: SetStateAction<string> } }) =>
            setSelectedValue(e.target.value)
          }
        />
        {produkts.length === 0 ? (
          <span className="loader"></span>
        ) : filtredProdukts.length === 0 ? (
          <p>
            Нажаль в продажу поки що немає прикрас з типом застібки:{" "}
            {selectedValue}.
          </p>
        ) : (
          <ul className="flex flex-wrap gap-x-2 gap-y-6 mt-2">
            {filtredProdukts.map((produkt) => (
              <ProduktCard
                key={produkt._id}
                produkt={produkt}
                favoriteProdukts={favoriteProdukts}
                onToggleFavorite={() => toggleFavorite(produkt._id)}
                className={
                  "w-[calc((100%/3)-6px)]  flex flex-col justify-between font-bold "
                }
              />
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
