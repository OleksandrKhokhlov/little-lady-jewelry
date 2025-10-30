"use client";

import Image from "next/image";
import Link from "next/link";
import { CustomCheckbox } from "./customCheckbox";
import { CartCounter } from "./cartCounter";
import { Button } from "./button";
import { Icon } from "./icon";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  images: { public_id: string; url: string }[];
  weight: number;
  quantity: number;
  count: number;
  onCountChange: (id: string, newCount: number) => void;
  onClick: () => void;
  onClose?: () => void;
  checked?: boolean;
  onCheckboxChange?: (id: string) => void;
}

export const CartList: React.FC<CartItemProps> = ({
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
}) => {
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
          sizes="(max-width: 640px) 50px, (max-width: 768px) 50px, 50px"
          className="object-cover rounded-md"
        />
      </Link>
      <div className="flex items-center justify-between gap-1">
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
          className="p-1"
        />
      </div>
    </li>
  );
};
