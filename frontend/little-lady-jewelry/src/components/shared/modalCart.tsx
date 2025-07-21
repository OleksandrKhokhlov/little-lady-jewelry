import React from "react";
import { Modal } from "../ui";
import { createPortal } from "react-dom";
import { useProduktContext } from "@/lib";
import { CartItem } from "./cartItem";

interface ModalCartProps {
  isModalCartOpen: boolean;
  setModalCartOpen: () => void;
}

export const ModalCart: React.FC<ModalCartProps> = ({
  isModalCartOpen,
  setModalCartOpen,
}) => {
  if (!isModalCartOpen) return null;
  const { produkts, inCart, addToCart, deleteFromCart } = useProduktContext();
  const cartItems = produkts.filter((product) => inCart.includes(product._id));

  return createPortal(
    <Modal
      isOpen={isModalCartOpen}
      onClose={setModalCartOpen}
      className="px-3 py-1"
      header="Кошик"
    >
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map(
            ({ _id: id, name, price, images, weight, quantity }) => (
              <CartItem
                key={id}
                id={id}
                name={name}
                price={price}
                images={images}
                weight={weight}
                quantity={quantity}
                onClick={() => deleteFromCart(id)}
                onClose={setModalCartOpen}
              />
            ),
          )}
        </ul>
      ) : (
        <p> Нажаль в кошику поки що нічого немає</p>
      )}
    </Modal>,
    document.body,
  );
};
