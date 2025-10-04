import toast from "react-hot-toast";
import { api } from "./api";

export const updatePrice = async (productId: string, newPrice: number) => {
  try {
    const res = await api.patch(`/product/${productId}/price`, {
      price: newPrice,
    });
    if (res.status !== 200) {
      toast.error("Помилка при оновленні ціни");
      console.error("Error updating price:", res.statusText);
      return null;
    }
    toast.success("Ціна успішно оновлена");
    return res.data;
  } catch (error) {
    console.error("Error updating price:", error);
    toast.error("Помилка при оновленні ціни");
    return null;
  }
};
