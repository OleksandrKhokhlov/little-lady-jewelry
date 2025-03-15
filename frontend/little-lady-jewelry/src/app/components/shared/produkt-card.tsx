import Link from "next/link";
import Image from "next/image";
import React from "react";
import Button from "../ui/button";

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
  className?: string;
}

export const ProductCard: React.FC<ProduktCardProps> = ({
  id,
  images,
  name = "Немає назви",
  price = "Невизначена",
  type = "Невизначений",
  quantity = 0,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="w-full h-[120px] relative">
          <Image
            src={images && images[0] ? images[0] : "/no-photo.png"}
            alt={name || "Зображення відсутне"}
            fill
            className="object-cover"
          />
        </div>
        <h2 className="mt-2">{name}</h2>
        <p className="text-[12px] capitalize-first">{type}</p>
        <span className="font-cabinsketch text-[var(--accent-color)] mt-1 block">{`${price} \u20B4`}</span>
      </Link>
      <Button
        onClick={() => console.log(name)}
        text={
          !quantity || quantity === 0 ? "Немає в наявності" : "Додати у кошик"
        }
        className={`w-full bg-[var(--accent-color)] rounded-md text-[12px] p-1 mt-2 ${quantity === 0 ? "opacity-80 cursor-not-allowed" : ""}`}
        disabled={!quantity || quantity === 0}
      />
    </div>
  );
};
