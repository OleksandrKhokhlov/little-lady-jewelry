"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useProduktContext } from "@/lib";
import { CartList } from "./cartList";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Modal } from "./modal";
import { Button } from "./button";

interface ModalCartProps {
  isModalCartOpen: boolean;
  setModalCartOpen: () => void;
}

export const ModalCart: React.FC<ModalCartProps> = ({
  isModalCartOpen,
  setModalCartOpen,
}) => {
  const { produkts, inCart, deleteFromCart } = useProduktContext();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [isLoad, setIsLoad] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isModalCartOpen) return;
    setIsLoad(false);

    const cartItems = produkts.filter((product) =>
      inCart.includes(product._id),
    );
    setSelectedIds(cartItems.map((product) => product._id));
    setCounts((prev) => {
      const newCount = { ...prev };
      cartItems.forEach((item) => {
        if (!newCount[item._id]) newCount[item._id] = 1;
      });
      return newCount;
    });
  }, [isModalCartOpen, inCart, produkts]);

  if (!isModalCartOpen) return null;

  const cartItems = produkts.filter((product) => inCart.includes(product._id));
  const checkedItems = cartItems.filter((product) =>
    selectedIds.includes(product._id),
  );
  const totalPrice = checkedItems.reduce(
    (total, item) => total + item.price * (counts[item._id] || 1),
    0,
  );

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleCountChange = (id: string, newCount: number) => {
    setCounts((prev) => ({
      ...prev,
      [id]: newCount,
    }));
  };

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) {
      toast.error("Будь ласка, оберіть товари для оформлення замовлення.");
      return;
    }
    setIsLoad(true);

    const filteredCounts = Object.fromEntries(
      selectedIds.map((id) => [id, counts[id] || 1]),
    );

    setModalCartOpen();

    const query = new URLSearchParams({
      counts: encodeURIComponent(JSON.stringify(filteredCounts)),
      totalPrice: totalPrice.toString(),
    }).toString();

    router.push(`/checkout?${query}`);
  };

  const modalContent = (
    <Modal
      isOpen={isModalCartOpen}
      onClose={setModalCartOpen}
      className="px-3 py-3 "
      header="Кошик"
    >
      <div className="flex flex-col justify-between h-[80vh] overflow-y-auto">
        {cartItems.length > 0 ? (
          <ul className="flex-1">
            {cartItems.map(
              ({ _id: id, name, price, images, weight, quantity }) => (
                <CartList
                  key={id}
                  id={id}
                  name={name}
                  price={price}
                  images={images}
                  weight={weight}
                  quantity={quantity}
                  count={counts[id] || 1}
                  onCountChange={handleCountChange}
                  onClick={() => deleteFromCart(id)}
                  onClose={setModalCartOpen}
                  checked={selectedIds.includes(id)}
                  onCheckboxChange={handleCheckboxChange}
                />
              ),
            )}
          </ul>
        ) : (
          <p> Нажаль в кошику поки що нічого немає</p>
        )}

        <div className="flex justify-between items-end border-b-2 border-[var(--accent-color)]">
          <p>До сплати: </p>
          <p>{totalPrice} грн</p>
        </div>
        <Button
          onClick={handleCheckout}
          text="Оформити замовлення"
          className="mt-4 bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1 w-[50%] mr-auto ml-auto"
        />
      </div>
      {isLoad && <span className="loader"></span>}
    </Modal>
  );
  return mounted && typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : modalContent;
};
