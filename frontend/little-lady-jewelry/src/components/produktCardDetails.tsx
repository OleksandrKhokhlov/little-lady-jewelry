import { FC, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { ProductDescription } from "./productDescription";
import { useProduktContext } from "@/lib";
import { useRouter } from "next/navigation";
import { EmblaCarousel } from "./emblaCarousel";
import { Button } from "./button";

interface ProduktCardDetailsProps {
  product: {
    _id: string;
    name: string;
    images: Array<{ public_id: string; url: string }>;
    video?: string;
    price: number;
    type: string;
    material: string;
    insert: string;
    weight: number;
    dimensions: {
      width?: number;
      height?: number;
    };
    quantity: number;
  };
}

export const ProduktCardDetails: FC<ProduktCardDetailsProps> = ({
  product,
}) => {
  const {
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
  } = product;

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

  return (
    <>
      <h2 className="text-[20px] my-1 text-center md:hidden">{name}</h2>
      {images && images.length > 0 && (
        <EmblaCarousel
          name={name}
          slides={images}
          video={video}
          options={OPTIONS}
        />
      )}
      <div className="relative md:flex md:flex-col md:justify-between md:pl-2 md:before:content-[''] md:before:absolute md:before:left-0 md:before:top-0 md:before:w-[3px] md:before:h-full md:before:bg-[var(--accent-color)] md:before:opacity-80">
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
            text={
              !quantity
                ? "Немає в наявності"
                : isInCart
                  ? "Вже у кошику"
                  : "Додати у кошик"
            }
            className={`w-[160px] bg-[var(--accent-color)] text-white rounded-md p-2  ${!quantity ? "opacity-80 cursor-not-allowed" : ""}`}
            disabled={!quantity}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(id);
            }}
            ariaLabel="Додати/видалити в/з обране"
            text={isFavorite ? "Видалити з обраного" : "Додати в обране"}
            className="w-[160px] bg-[var(--accent-color)] text-white rounded-md p-2"
          />
          <Button
            onClick={handleCheckout}
            text="Оформити замовлення"
            className="bg-[var(--accent-color)] text-white rounded-md p-2"
          />
        </div>
      </div>
    </>
  );
};
