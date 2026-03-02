import toast from "react-hot-toast";
import { api } from "./api";
import { ProductPayload, Produkt } from "@/types";

export const addProdukt = async (payload: ProductPayload): Promise<Produkt | null> => {
  try {
    const res = await api.post<{product: Produkt}>("/product", {product: payload});
    if (res.status !== 201) {
      console.error("Error adding product:", res.statusText);
      return null;
    }
    toast.success("Продукт успішно додано");
    return res.data.product;
  } catch (error) {
    console.error("Error adding product:", error);
    toast.error("Помилка при додаванні продукту");
    return null;
  }
};
