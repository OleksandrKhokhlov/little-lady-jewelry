import { api } from "./api";
import { ProductPayload, Produkt } from "@/types";

export const addProdukt = async (
  payload: ProductPayload,
): Promise<Produkt | null> => {
  try {
    const res = await api.post<Produkt>("/product", payload);
    if (res.status !== 201) {
      console.error("Error adding product:", res.statusText);
      return null;
    }
    return res.data;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};
