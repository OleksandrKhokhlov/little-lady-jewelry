import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui";
import { Icon } from "../ui";
import { useProduktContext } from "@/lib";
import { usePathname } from "next/navigation";
import { deleteProdukt, updatePrice, updateQuantity } from "@/app/api";
import Swal from "sweetalert2";

interface ProduktCardProps {
  produkt: {
    _id: string;
    images: Array<{ public_id: string; url: string }>;
    name?: string;
    price: number;
    type:
      | "англійський замок"
      | "конго"
      | "пусети на закрутках"
      | "пусети на заглушках";
    quantity: number;
  };

  favoriteProdukts?: string[];
  onToggleFavorite?: () => void;
  className?: string;
}

export const ProduktCard: React.FC<ProduktCardProps> = ({
  produkt: {
    _id: id,
    images,
    name = "Немає назви",
    price: initialPrice = 0,
    type = "Невизначений",
    quantity: initialQuantity = 0,
  },
  favoriteProdukts = [],
  onToggleFavorite = () => {},
  className,
}) => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const { inCart, addToCart, setProdukts } = useProduktContext();

  const [isFavorite, setIsFavorite] = useState(favoriteProdukts.includes(id));
  const [imageError, setImageError] = useState(false);
  const [price, setPrice] = useState(initialPrice);
  const [quantity, setQuantity] = useState(initialQuantity);
  const isInCart = inCart.includes(id);

  useEffect(() => {
    setIsFavorite(favoriteProdukts.includes(id));
  }, [favoriteProdukts, id]);

  const handleUpdatePrice = async (newPrice: number) => {
    const res = await updatePrice(id, newPrice);
    if (res.success) {
      setProdukts((prevProdukts) =>
        prevProdukts.map((produkt) =>
          produkt._id === id ? { ...produkt, price: newPrice } : produkt,
        ),
      );
      toast.success("Ціну оновлено");
      return;
    } else {
      toast.error(res.message || "Не вдалося оновити ціну");
    }
  };

  const handleUpdateQuantity = async (newQuantity: number) => {
    const res = await updateQuantity(id, newQuantity);
    if (res.success) {
      setProdukts((prevProdukts) =>
        prevProdukts.map((produkt) =>
          produkt._id === id ? { ...produkt, quantity: newQuantity } : produkt,
        ),
      );
      toast.success("Кількість оновлено");
    } else {
      toast.error(res.message || "Не вдалося оновити кількість");
    }
  };

  const handleDeleteProdukt = async (productId: string) => {
    const res = await Swal.fire({
      title: "Видалити товар?",
      text: "Цю дію не можна буде скасувати!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Так, видалити!",
      cancelButtonText: "Скасувати",
    });

    if (res.isConfirmed) {
      await deleteProdukt(productId);
      setProdukts((prevProdukts) =>
        prevProdukts.filter((produkt) => produkt._id !== productId),
      );
      toast.success("Товар видалено");
    }
  };

  return (
    <li key={id} className={className}>
      <Link href={`/product/${id}`} className="block">
        <div className="w-full h-[120px] relative">
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
            <button
              type="button"
              className="absolute bottom-1 right-1 size-[17px] flex items-center justify-center p-0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite();
              }}
              aria-label="Додати в обране"
            >
              {isFavorite ? (
                <Icon
                  iconId="icon-Heart-Active"
                  className="fill-[var(--accent-color)]"
                />
              ) : (
                <Icon
                  iconId="icon-Heart"
                  className="fill-[var(--accent-color)]"
                />
              )}
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDeleteProdukt(id);
              }}
              className="absolute top-1 right-1 size-[17px] flex items-center justify-center p-0"
            >
              <Icon
                iconId="icon-Cross"
                className="size-[15px] fill-[var(--accent-color)]"
              />
            </button>
          )}
        </div>
        <h2 className="mt-1">{name}</h2>
        <p className="text-[12px] mt-1 capitalize-first">{type}</p>
      </Link>

      {isAdminPage ? (
        <div>
          <div className="flex gap-1 items-center justify-between">
            <label className="text-xs text-gray-600 w-[70%]">
              Ціна:
              <input
                name="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="form-input text-center text-sm w-[90%]"
              />
            </label>
            <button
              type="button"
              onClick={() => handleUpdatePrice(price)}
              className="size-[26px] "
            >
              <Icon
                iconId="icon-Check-Admin"
                className="fill-[var(--accent-color)]"
              />
            </button>
          </div>

          <div className="flex gap-1 items-center justify-between">
            <label className="text-xs text-gray-600 w-[70%]">
              Кількість:
              <input
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="form-input text-center text-sm w-[90%]"
              />
            </label>
            <button
              type="button"
              onClick={() => handleUpdateQuantity(quantity)}
              className="size-[26px] "
            >
              <Icon
                iconId="icon-Check-Admin"
                className="fill-[var(--accent-color)]"
              />
            </button>
          </div>
        </div>
      ) : (
        <>
          <span className="font-cabinsketch text-[var(--accent-color)] mt-1 block">{`${price} \u20B4`}</span>
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
            className={`w-full bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1 mt-1 ${!quantity ? "opacity-80 cursor-not-allowed" : ""}`}
            disabled={!quantity}
          />
        </>
      )}
    </li>
  );
};
