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
  onClick: () => void;
  onClose?: () => void; // Optional prop for closing the modal
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  images,
  weight,
  onClick,
  onClose,
}) => {
  return (
    <div className="flex items-center gap-4 border-b-2 border-[var(--accent-color)]">
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
      <div className="flex items-center justify-between gap-4">
        <div>
          {" "}
          <h3>{name}</h3>
          <p>Вага: {weight} г</p>
        </div>
        <p>Ціна: {`${price} \u20B4`}</p>
        <button type="button" onClick={onClick} className="p-1">
          <Icon
            iconId="icon-Trash"
            className="w-[18px] h-[20px] fill-[var(--accent-color)]"
          />
        </button>
      </div>
    </div>
  );
};
