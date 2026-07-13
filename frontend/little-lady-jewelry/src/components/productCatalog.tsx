"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Produkt } from "@/types";
import { FiltrPopUp } from "./filtrPopUp";
import { ProduktCard } from "./produktCard";

type ProductCatalogProps = {
  initialProducts: Produkt[];
};

export const ProductCatalog = ({ initialProducts }: ProductCatalogProps) => {
  const [selectedValue, setSelectedValue] = useState("Всі");
  const [filtredProdukts, setFilteredProdukts] = useState(initialProducts);

  const normalize = (str: string) => str.toLowerCase().replace(/\s/g, "");

  useEffect(() => {
    const normSelected = normalize(selectedValue);

    const filtred = initialProducts.filter(
      (produkt) =>
        normSelected === "всі" || normalize(produkt.type) === normSelected,
    );
    setFilteredProdukts(filtred);
  }, [selectedValue, initialProducts]);

  return (
    <>
      <FiltrPopUp
        selectedValue={selectedValue}
        handleChange={(e: { target: { value: SetStateAction<string> } }) =>
          setSelectedValue(e.target.value)
        }
      />

      {initialProducts.length === 0 ? (
        <span className="loader"></span>
      ) : (
        <ul className="flex flex-wrap gap-2 mt-3 md:mt-4">
          {filtredProdukts.map((produkt) => (
            <ProduktCard key={produkt._id} produkt={produkt} />
          ))}
        </ul>
      )}
    </>
  );
};
