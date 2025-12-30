import toast from "react-hot-toast";
import { api } from "./api";

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
    if (res.status !== 201) {
      console.error("Error submitting order:", res.statusText);
      toast.error("Помилка при оформленні замовлення. Спробуйте ще раз.");
      return null;
    }
    toast.success("Замовлення успішно оформлено!");
    return res.data;
  } catch (error) {
    console.error("Error submitting order:", error);
    return null;
  }
};
