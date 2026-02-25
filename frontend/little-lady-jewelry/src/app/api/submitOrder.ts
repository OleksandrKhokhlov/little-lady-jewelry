import toast from "react-hot-toast";
import { api } from "./api";
import { updateQuantity } from "./updateQuantity";
import { getLocalStorage } from "@/lib";

interface OrderData {
  firstName: string;
  lastName: string;
  telephone: string;
  delivery: "Нова пошта" | "Укрпошта";
  town: string;
  warehouse: string;
  comment?: string;
  payment: "При отриманні" | "Онлайн";
  totalPrice: number;
  counts: Record<string, number>;
}

export const submitOrder = async (orderData: OrderData) => {
  try {
    const res = await api.post("/orders", orderData);
    if (res.status !== 201 && res.status !== 200) {
      console.error("Error submitting order:", res.statusText);
      toast.error("Помилка при оформленні замовлення. Спробуйте ще раз.");
      return null;
    }
    toast.success("Замовлення успішно оформлено!");

    const currentCart = getLocalStorage("inCart", []);
    const orderedProductsIds = Object.keys(orderData.counts);

    Object.entries(orderData.counts).forEach(([productId, quantity]) => {
      updateQuantity(productId, -quantity);
    });

    if (currentCart.length === orderedProductsIds.length) {
      localStorage.removeItem("inCart");
    } else {
      const updatedCart = currentCart.filter(
        (id) => !orderedProductsIds.includes(id),
      );
      localStorage.setItem("inCart", JSON.stringify(updatedCart));
    }

    return res.data;
  } catch (error) {
    console.error("Error submitting order:", error);
    return null;
  }
};
