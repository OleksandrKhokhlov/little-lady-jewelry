import toast from "react-hot-toast";
import { api } from "./api";

interface AddProduktResponse {
  product: {
    name: string;
    images: string[];
    video?: string;
    price: number;
    type:
      | "пусети на заглушках"
      | "пусети на закрутках"
      | "англійський замок"
      | "конго";
    material: string;
    insert: string;
    weight: number;
    dimensions: {
      width?: number;
      height?: number;
    };
    quantity: number;
  };
}

export const updateProdukt = async (
  productId: string,
  updatedData: AddProduktResponse,
) => {
  try {
    const res = await api.put(`/product/${productId}`, updatedData);
    if (res.status !== 200) {
      toast.error("Помилка при оновленні продукту");
      console.error("Error updating product:", res.statusText);
      return null;
    }
    toast.success("Продукт успішно оновлено");
    return res.data;
  } catch (error) {
    console.error("Error updating product:", error);
    toast.error("Помилка при оновленні продукту");
    return null;
  }
};
