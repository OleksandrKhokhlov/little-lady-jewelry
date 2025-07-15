import Image from "next/image";
import Link from "next/link";
import { Icon } from "../ui";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  images: string[];
  weight: number;
  quantity: number;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  images,
  weight,
  quantity,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 border-b-2 border-[var(--accent-color)]">
      <Link href={`/product/${id}`} className="block">
        <Image
          src={images?.[0] ?? "/no-photo.png"}
          alt={name || "Зображення відсутне"}
          width={50}
          height={50}
          className="object-cover rounded-md"
        />
      </Link>
      <div className="flex items-center justify-between gap-4">
        <div>
          {" "}
          <h3>{name}</h3>
          <p>Вага: {weight} г</p>
        </div>
        <p>Ціна: {`${price} \u20B4`}</p>
        <Icon iconId="icon-Trash" className="w-[18px] h-[20px]" />
      </div>
    </div>
  );
};
