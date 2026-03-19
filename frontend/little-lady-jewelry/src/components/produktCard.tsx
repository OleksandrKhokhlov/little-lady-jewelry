"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./button";
import { cn, useProduktContext } from "@/lib";
import { usePathname } from "next/navigation";
import { ProduktCardProps } from "@/types";
import { AdminProductCardMenu } from "./adminProductCardMenu";
import { DelProductBtn } from "./delProductBtn";
import { FavoriteBtn } from "./favoriteBtn";

export const ProduktCard = ({
  produkt: {
    _id: id,
    images,
    name = "Немає назви",
    price: initialPrice = 0,
    type = "Всі",
    quantity: initialQuantity = 0,
  },
  className,
}: ProduktCardProps) => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const { inCart, addToCart, setProdukts } = useProduktContext();

  const [imageError, setImageError] = useState(false);
  const [price, setPrice] = useState(initialPrice);
  const [quantity, setQuantity] = useState(initialQuantity);
  const isInCart = inCart.includes(id);

  return (
    <li
      key={id}
      className={cn(
        "md:min-w-[120px] p-1 rounded-md ",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:shadow-[0_0_10px_var(--accent-color)]",
        className,
      )}
    >
      <Link
        href={`${isAdminPage ? `/admin/product/${id}` : `/product/${id}`}`}
        className="block"
      >
        <div className="w-full h-[120px] md:h-[150px] relative">
          <Image
            src={imageError || !images[0].url ? "/no-photo.png" : images[0].url}
            alt={name || "Зображення відсутне"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-md"
            onError={() => setImageError(true)}
            priority={false}
          />
          {!isAdminPage ? (
            <FavoriteBtn id={id} />
          ) : (
            <DelProductBtn id={id} setProdukts={setProdukts} />
          )}
        </div>
        <h2 className="mt-1 md:text-lg/5 ">{name}</h2>
        <p className="text-[12px] mt-1 capitalize-first">{type}</p>
      </Link>

      {isAdminPage ? (
        <AdminProductCardMenu
          id={id}
          price={price}
          quantity={quantity}
          setPrice={setPrice}
          setQuantity={setQuantity}
          setProdukts={setProdukts}
        />
      ) : (
        <div>
          <span className="font-cabinsketch text-[var(--accent-color)] md:text-lg mt-1 block">{`${price} \u20B4`}</span>
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
            className={`w-full bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] md:text-sm p-2 md:p-1 mt-1 hover:bg-[var(--hover-color)] ${!quantity ? "opacity-80 cursor-not-allowed" : ""}`}
            disabled={!quantity}
          />
        </div>
      )}
    </li>
  );
};
