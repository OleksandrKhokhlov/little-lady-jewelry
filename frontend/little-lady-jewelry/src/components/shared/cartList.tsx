'use client';

import Image from "next/image";
import Link from "next/link";
import { Button, CartCounter, Icon } from "../ui";
import { useState } from "react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  images: string[];
  weight: number;
  quantity: number;
  onClick: () => void;
  onClose?: () => void; // Optional prop for closing the modal
  checked?: boolean; // Optional prop for checkbox state
  onCheckboxChange?: (id: string) => void; // Optional prop for checkbox change
}

export const CartList: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  images,
  weight,
  quantity,
  onClick,
  onClose,
  checked = true,
  onCheckboxChange,
}) => {
  const [count, setCount] = useState<number>(1);

  const handleCountChange = (newCount: number) => {
    setCount(newCount);
  };

  

  return (
    <li className="flex items-center gap-2 border-b-2 border-[var(--accent-color)]">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onCheckboxChange?.(id)}
        className="appearance-none rounded-md border-2 border-[var(--accent-color)] w-[10px] h-[10px] cursor-pointer  checked:bg-[var(--accent-color)] "
      />
      <Link
        href={`/product/${id}`}
        onClick={onClose}
        className="block w-[50px] h-[50px] relative"
      >
        <Image
          src={images?.[0] ?? "/no-photo.png"}
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
        <CartCounter onChange={handleCountChange} max={quantity} />
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
