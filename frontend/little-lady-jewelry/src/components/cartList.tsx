"use client";

import Image from "next/image";
import Link from "next/link";
import { CustomCheckbox } from "./customCheckbox";
import { CartCounter } from "./cartCounter";
import { Button } from "./button";
import { Icon } from "./icon";
import { CartListItemProps } from "@/types";

export const CartList = ({
  id,
  name,
  price,
  images,
  weight,
  quantity,
  count,
  onCountChange,
  onClick,
  onClose,
  checked = true,
  onCheckboxChange,
}: CartListItemProps) => {
  return (
    <li className="flex items-center gap-2 border-b-2 border-[var(--accent-color)]">
      <CustomCheckbox checked={checked} onChange={onCheckboxChange} id={id} />

      <Link
        href={`/product/${id}`}
        onClick={onClose}
        className="block w-[50px] h-[50px] relative"
      >
        <Image
          src={images[0].url ?? "/no-photo.png"}
          alt={name || "Зображення відсутне"}
          fill
          sizes="(max-width: 768px) 120px, (max-width: 1200px) 150px, 150px"
          className="object-cover rounded-md"
        />
      </Link>
      <div className="flex items-center justify-between gap-1 overflow-hidden">
        <div className="min-w-[110px]">
          {" "}
          <h3>{name}</h3>
          <p>Вага: {weight} г</p>
        </div>
        <CartCounter
          onChange={(value) => onCountChange(id, value)}
          max={quantity}
          value={count}
        />
        <p>Ціна: {`${price} \u20B4`}</p>
        <Button
          onClick={onClick}
          icon={
            <Icon
              iconId="icon-Trash"
              className="w-[18px] h-[20px] fill-[var(--accent-color)]"
            />
          }
          className="p-1 hover:scale-125 transition-transform duration-300"
        />
      </div>
    </li>
  );
};
