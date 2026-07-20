"use client";

import { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { ProductDescription } from "./productDescription";
import { useProduktContext } from "@/lib";
import { useRouter } from "next/navigation";
import { EmblaCarousel } from "./emblaCarousel";
import { Button } from "./button";
import { Produkt } from "@/types";
import { Icon } from "./icon";

export const ProduktCardDetails = ({
  _id: id,
  name,
  images,
  video,
  price,
  type,
  material,
  insert,
  weight,
  dimensions,
  quantity,
}: Produkt) => {
  const OPTIONS: EmblaOptionsType = {};
  const router = useRouter();

  const { inCart, favoriteProdukts, addToCart, toggleFavorite } =
    useProduktContext();
  const [isFavorite, setIsFavorite] = useState(favoriteProdukts.includes(id));
  const isInCart = inCart.includes(id);

  useEffect(() => {
    setIsFavorite(favoriteProdukts.includes(id));
  }, [favoriteProdukts, id]);

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();

    const filteredCounts = { [id]: 1 };

    const query = new URLSearchParams({
      counts: encodeURIComponent(JSON.stringify(filteredCounts)),
      totalPrice: price.toString(),
    }).toString();

    router.push(`/checkout?${query}`);
  };

  const btnTextCart = !quantity
    ? "Немає в наявності"
    : isInCart
      ? "Вже у кошику"
      : "Додати у кошик";

  const btnTextFavorite = isFavorite ? "Видалити з обраного" : "Додати в обране";

  return (
    <>
      <h1 className="text-[20px] my-1 text-center md:hidden">{name}</h1>
      {images && images.length > 0 && (
        <EmblaCarousel
          name={name}
          slides={images}
          video={video}
          options={OPTIONS}
        />
      )}
      <div className="relative w-full md:flex md:flex-col md:justify-between md:pl-[2.25rem] md:before:content-[''] md:before:absolute md:before:left-0 md:before:top-0 md:before:w-[3px] md:before:h-full md:before:bg-[var(--accent-color)] md:before:opacity-80">
        <ProductDescription
          name={name}
          price={price}
          type={type}
          material={material}
          insert={insert}
          weight={weight}
          dimensions={dimensions}
        />
        <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-4 mt-[5px] md:mt-0 justify-center">
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(id);
            }}
            text={btnTextCart}
            className={`w-[160px] bg-[var(--accent-color)] text-white rounded-md p-2  ${!quantity ? "opacity-80 cursor-not-allowed" : "hover:bg-[var(--hover-color)]"}`}
            disabled={!quantity}
            ariaLabel={btnTextCart}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(id);
            }}
            ariaLabel={btnTextFavorite}
            text={btnTextFavorite}
            className="w-[160px] bg-[var(--accent-color)] text-white rounded-md p-2 hover:bg-[var(--hover-color)]"
          />
          {quantity > 0 && (
            <Button
              onClick={handleCheckout}
              text="Оформити замовлення"
              className="bg-[var(--accent-color)] text-white rounded-md p-2 hover:bg-[var(--hover-color)]"
              ariaLabel="Оформити замовлення"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="size-10 absolute top-1 left-2 sm:left-4"
        onClick={() => router.back()}
        aria-label="Повернутися назад"
      >
        <Icon
          iconId="icon-Back"
          className="stroke-[var(--accent-color)] hover:stroke-[var(--hover-color)] transition-colors duration-300"
        />
      </button>
    </>
  );
};
