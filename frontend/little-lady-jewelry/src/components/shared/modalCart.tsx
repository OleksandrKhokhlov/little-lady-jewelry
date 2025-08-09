"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal } from "../ui";
import { createPortal } from "react-dom";
import { useProduktContext } from "@/lib";
import { CartList } from "./cartList";

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isModalCartOpen) {
      const cartItems = produkts.filter((product) =>
        inCart.includes(product._id),
      );
      setSelectedIds(cartItems.map((product) => product._id));
    }
  }, [isModalCartOpen, inCart, produkts]);

  if (!isModalCartOpen || !mounted) return null;

  const cartItems = produkts.filter((product) => inCart.includes(product._id));
  const checkedItems = cartItems.filter((product) =>
    selectedIds.includes(product._id),
  );
  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return createPortal(
    <Modal
      isOpen={isModalCartOpen}
      onClose={setModalCartOpen}
      className="px-3 py-1"
      header="Кошик"
    >
      <div className="flex flex-col justify-between h-[90vh] overflow-y-auto">
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
          <p>
            {checkedItems.reduce((total, item) => total + item.price, 0)} грн
          </p>
        </div>
        <Button
          onClick={(e) => console.log("Оформити замовлення")}
          text="Оформити замовлення"
          className="mt-4 bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1 w-[50%] mr-auto ml-auto"
        />
      </div>
    </Modal>,
    document.body,
  );
};
