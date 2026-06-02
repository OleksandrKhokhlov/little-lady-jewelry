"use client";

import { SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Container,
  FiltrPopUp,
  Hero,
  ProduktCard,
} from "../components";
import { getInitialLimit, useProduktContext } from "@/lib";

export default function Home() {
  const { produkts, loadMoreProdukts } = useProduktContext();
  const [selectedValue, setSelectedValue] = useState("Всі");
  const [filtredProdukts, setFilteredProdukts] = useState(produkts);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [limit] = useState(getInitialLimit());
  const [hasMore, setHasMore] = useState(true);

  const normalize = (str: string) => str.toLowerCase().replace(/\s/g, "");

  useEffect(() => {
    if (filtredProdukts.length < limit) {
      setShowLoadMore(false);
    } else {
      setShowLoadMore(hasMore);
    }
  }, [filtredProdukts, limit, hasMore]);

  useEffect(() => {
    const normSelected = normalize(selectedValue);

    const filtred = produkts.filter(
      (produkt) =>
        normSelected === "всі" || normalize(produkt.type) === normSelected,
    );
    setFilteredProdukts(filtred);
  }, [selectedValue, produkts]);

  const handleLoadMore = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    await loadMoreProdukts();
    setHasMore(false);
  };

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
          <ul className="flex flex-wrap gap-2 mt-3 md:mt-4">
            {filtredProdukts.map((produkt) => (
              <ProduktCard key={produkt._id} produkt={produkt} />
            ))}
          </ul>
        )}
        {showLoadMore && filtredProdukts.length > 0 && (
          <Button
            text="Показати всі"
            ariaLabel="Кнопка показати всі"
            className={`w-1/2 mx-auto block bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] md:text-sm p-2 md:p-1 mt-4 hover:bg-[var(--hover-color)]`}
            onClick={handleLoadMore}
          />
        )}
      </Container>
    </>
  );
}
