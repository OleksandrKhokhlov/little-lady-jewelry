import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui";
import { Icon } from "../ui";
import { useProduktContext } from "@/lib";

interface ProduktCardProps {
  produkt: {
    _id: string;
    images: Array<string>;
    name?: string;
    price: number;
    type:
      | "англійський замок"
      | "конго"
      | "пусети на закрутках"
      | "пусети на заглушках";
    quantity: number;
  };

  favoriteProdukts: string[];
  onToggleFavorite: () => void;
  className?: string;
}

export const ProduktCard: React.FC<ProduktCardProps> = ({
  produkt: {
    _id: id,
    images,
    name = "Немає назви",
    price = 0,
    type = "Невизначений",
    quantity = 0,
  },
  favoriteProdukts,
  onToggleFavorite,
  className,
}) => {
  const [isFavorite, setIsFavorite] = useState(favoriteProdukts.includes(id));
  const [imageError, setImageError] = useState(false);
  const { inCart, addToCart } = useProduktContext();
  const isInCart = inCart.includes(id);

  useEffect(() => {
    setIsFavorite(favoriteProdukts.includes(id));
  }, [favoriteProdukts, id]);

  return (
    <li className={className}>
      <Link href={`/product/${id}`} className="block">
        <div className="w-full h-[120px] relative">
          <Image
            src={imageError || !images?.[0] ? "/no-photo.png" : images[0]}
            alt={name || "Зображення відсутне"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-md"
            onError={() => setImageError(true)}
            priority={false}
          />
          <button
            type="button"
            className="absolute bottom-1 right-1 size-[17px] flex items-center justify-center p-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite();
            }}
            aria-label="Додати в обране"
          >
            {isFavorite ? (
              <Icon
                iconId="icon-Heart-Active"
                className="fill-[var(--accent-color)]"
              />
            ) : (
              <Icon
                iconId="icon-Heart"
                className="fill-[var(--accent-color)]"
              />
            )}
          </button>
        </div>
        <h2 className="mt-1">{name}</h2>
        <p className="text-[12px] mt-1 capitalize-first">{type}</p>
      </Link>
      <div>
        <span className="font-cabinsketch text-[var(--accent-color)] mt-1 block">{`${price} \u20B4`}</span>
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
          className={`w-full bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1 mt-1 ${!quantity ? "opacity-80 cursor-not-allowed" : ""}`}
          disabled={!quantity}
        />
      </div>
    </li>
  );
};
