import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../ui/button";
import Icon from "../ui/icon";
import { toggleFavorite } from "@/lib";

interface ProduktCardProps {
  id: string;
  images: Array<string>;
  name?: string;
  price: number;
  type:
    | "англійський замок"
    | "конго"
    | "пусети на закрутках"
    | "пусети на заглушках";
  quantity: number;
  favoriteProdukts: string[];
  onToggleFavorite: (updatedFavorites: string[]) => void;
  className?: string;
}

export const ProductCard: React.FC<ProduktCardProps> = ({
  id,
  images,
  name = "Немає назви",
  price = 0,
  type = "Невизначений",
  quantity = 0,
  favoriteProdukts,
  onToggleFavorite,
  className,
}) => {
  const [isFavorite, setIsFavorite] = useState(favoriteProdukts.includes(id));

  useEffect(() => {
    setIsFavorite(favoriteProdukts.includes(id));
  }, [favoriteProdukts, id]);

  const handleToggleFavorite = () => {
    const updatedFavorites = toggleFavorite(id, favoriteProdukts);
    setIsFavorite(updatedFavorites.includes(id));
    onToggleFavorite(updatedFavorites);
  }

  return (
    <div className={className}>
      <Link href={`/product/${id}`} className="block">
        <div className="w-full h-[120px] relative">
          <Image
            src={images?.[0] ?? "/no-photo.png"}
            alt={name || "Зображення відсутне"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-md"
          />
          <button
            type="button"
            className="absolute bottom-1 right-1 size-[17px] flex items-center justify-center p-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // setIsFavorite(!isFavorite);
              handleToggleFavorite();
            }}
            aria-label="Додати в обране"
          >
            {isFavorite ? (
              <Icon iconId="icon-Heart-Active" className="size-[100%]" />
            ) : (
              <Icon iconId="icon-Heart" className="size-[100%]" />
            )}
          </button>
        </div>
        <h2 className="mt-1">{name}</h2>
        <p className="text-[12px] capitalize-first">{type}</p>
      </Link>
      <div>
        <span className="font-cabinsketch text-[var(--accent-color)] mt-1 block">{`${price} \u20B4`}</span>
        <Button
          onClick={() => console.log(name)}
          text={!quantity ? "Немає в наявності" : "Додати у кошик"}
          className={`w-full bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1 mt-1 ${!quantity ? "opacity-80 cursor-not-allowed" : ""}`}
          disabled={!quantity}
        />
      </div>
    </div>
  );
};
