import Link from "next/link";
import Image from "next/image";
import React from "react";
import Button from "../ui/button";
import Icon from "../ui/icon";

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
      <Link href={`/product/${id}`} className="block">
        <div className="w-full h-[120px] relative">
          <Image
            src={images && images[0] ? images[0] : "/no-photo.png"}
            alt={name || "Зображення відсутне"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-md"
          />
          <button
            type="button"
            className="absolute bottom-1 right-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            aria-label="Додати в обране"
          >
            <Icon iconId="icon-Heart" className="size-[15px]" />
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
