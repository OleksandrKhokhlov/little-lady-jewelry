import Link from "next/link";
import Image from "next/image";
import React from "react";
import Button from "../ui/button";

interface ProduktCardProps {
  id: string;
  images: Array<string>;
  name: string;
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
  name,
  price,
  type,
  quantity,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <Image src={images[0]} alt={name} />
        <h2>{name}</h2>
        <h3>{type}</h3>
        <h3>{`${price} \u20B4`}</h3>
      </Link>
      <Button
        onClick={() => console.log(name)}
        text="Додати у кошик"
        className={`bg-[var(--accent-color)] rounded-sm ${quantity === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={quantity === 0}
      />
    </div>
  );
};
