import toast from "react-hot-toast";
import { api } from "./api";

export const updateQuantity = async (
  productId: string,
  newQuantity: number,
) => {
  try {
    const res = await api.patch(`/product/${productId}/quantity`, {
      quantity: newQuantity,
    });
    if (res.status !== 200) {
      toast.error("Помилка при оновленні кількості");
      console.error("Error updating quantity:", res.statusText);
      return null;
    }
    toast.success("Кількість успішно оновлена");
    return res.data;
  } catch (error) {
    toast.error("Помилка при оновленні кількості");
    console.error("Error updating quantity:", error);
    return null;
  }
};
