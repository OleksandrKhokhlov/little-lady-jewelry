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
      <h1 className="text-[20px] mb-1 text-center">{name}</h1>
      {images && images.length > 0 && (
        <EmblaCarousel
          name={name}
          slides={images}
          video={video}
          options={OPTIONS}
        />
      )}
      <ProductDescription
        price={price}
        type={type}
        material={material}
        insert={insert}
        weight={weight}
        dimensions={dimensions}
      />
      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-[5px] justify-center">
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
          className={`w-[150px] h-[30px] bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1 ${!quantity ? "opacity-80 cursor-not-allowed" : ""}`}
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
          className="bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1 w-[150px] h-[30px] "
        />
        <Button
          onClick={handleCheckout}
          text="Оформити замовлення"
          className="bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1 w-[150px] h-[30px] "
        />
      </div>
    </>
  );
};
