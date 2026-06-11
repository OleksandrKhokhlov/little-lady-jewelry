"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { cn, createSlug, useProduktContext } from "@/lib";
import { usePathname } from "next/navigation";
import { ProduktCardProps } from "@/types";
import { AdminProductCardMenu } from "./adminProductCardMenu";
import { DelProductBtn } from "./delProductBtn";
import { FavoriteBtn } from "./favoriteBtn";

export const ProduktCard = ({
  produkt: {
    _id: id,
    images = [],
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isInCart = isMounted ? inCart.includes(id) : false;

  const productSlug = createSlug(name);
  const productUrl = isAdminPage
    ? `/admin/product/${id}`
    : `/product/${productSlug}-${id}`;

  const btnTextCart = !quantity
    ? "Немає в наявності"
    : isInCart
      ? "Вже у кошику"
      : "Додати у кошик";

  return (
    <li
      key={id}
      className={cn(
        "flex flex-col justify-between w-[calc((100%-16px)/3)] min-[540px]:w-[calc((100%-24px)/4)] min-[760px]:w-[calc((100%-32px)/5)] min-[890px]:w-[calc((100%-40px)/6)] min-[1300px]:w-[calc((100%-48px)/7)]",
        "p-1 rounded-md ",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:shadow-[0_0_10px_var(--accent-color)]",
        className,
      )}
    >
      <Link href={productUrl} className="block group">
        <div className="relative w-full h-[120px] md:h-[150px]">
          <Image
            src={imageError || !images[0].url ? "/no-photo.png" : images[0].url}
            alt={`${name} — ювелірний виріб Little Lady`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="relative rounded-md"
            onError={() => setImageError(true)}
            priority={false}
          />
          <div className="absolute bottom-1 right-1 z-10">
            {!isAdminPage ? (
              <FavoriteBtn id={id} />
            ) : (
              <DelProductBtn id={id} setProdukts={setProdukts} />
            )}
          </div>
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
            text={btnTextCart}
            className={`w-full bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] md:text-sm py-2 md:py-1 mt-1  ${!quantity ? "opacity-80 cursor-not-allowed" : "hover:bg-[var(--hover-color)]"}`}
            disabled={!quantity}
          />
        </div>
      )}
    </li>
  );
};
