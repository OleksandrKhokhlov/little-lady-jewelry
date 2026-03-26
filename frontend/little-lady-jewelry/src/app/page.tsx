"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Button, Container } from "../components";
import { FiltrPopUp } from "../components";
import { Hero } from "../components";
import { ProduktCard } from "../components";
import { getInitialLimit, useProduktContext } from "@/lib";

export default function Home() {
  const { produkts, loadMoreProdukts } = useProduktContext();
  const [selectedValue, setSelectedValue] = useState("Всі");
  const [filtredProdukts, setFilteredProdukts] = useState(produkts);
  const [showLoadMore, setShowLoadMore] = useState(true);

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
      <h1 className="sr-only">
        Магазин прикрас Little Lady: готові подарунки під ключ
      </h1>
      <Hero />
      <Container className="py-0 pb-4">
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
            <span className="text-[var(--accent-color)]">{selectedValue}</span>
          </p>
        ) : (
          <ul className="grid grid-cols-3 min-[570px]:grid-cols-5 min-[840px]:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mt-3 md:mt-4">
            {filtredProdukts.map((produkt) => (
              <ProduktCard
                key={produkt._id}
                produkt={produkt}
                className={
                  "flex flex-col justify-between font-bold max-w-[150px]"
                }
              />
            ))}
          </ul>
        )}
        {showLoadMore && filtredProdukts.length > getInitialLimit() && (
          <Button
            text="Показати всі"
            ariaLabel="Кнопка показати всі"
            className={`w-1/2 mx-auto block bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] md:text-sm p-2 md:p-1 mt-4 hover:bg-[var(--hover-color)]`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              loadMoreProdukts();
              setShowLoadMore(false);
            }}
          />
        )}
      </Container>
    </>
  );
}
