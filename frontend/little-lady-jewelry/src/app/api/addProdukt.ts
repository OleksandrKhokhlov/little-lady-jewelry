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

export const addProdukt = async (product: AddProduktResponse) => {
  try {
    const res = await api.post("/product", product);
    if (res.status !== 201) {
      console.error("Error adding product:", res.statusText);
      return null;
    }
    toast.success("Продукт успішно додано");
    return res.data;
  } catch (error) {
    console.error("Error adding product:", error);
    toast.error("Помилка при додаванні продукту");
    return null;
  }
};
