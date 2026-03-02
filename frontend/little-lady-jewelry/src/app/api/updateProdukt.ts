import { ProductPayload, Produkt } from "@/types";
import { api } from "./api";

export const updateProdukt = async (
  productId: string,
  updatedData: Partial<ProductPayload>,
): Promise<Produkt | null> => {
  try {
    const res = await api.patch<Produkt>(
      `/product/${productId}`,
      updatedData,
    );
    if (res.status !== 200) {
      console.error("Error updating product:", res.statusText);
      return null;
    }
    return res.data;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};
