import { api } from "./api";
import { Produkt } from "@/types";

export const getProdukts = async (
  setProdukts: React.Dispatch<React.SetStateAction<Produkt[]>>,
  options?: { limit?: number; skip?: number },
) => {
  try {
    const res = await api.get(`/product`, { params: options });

    setProdukts((prev) => {
      if (options?.skip !== undefined) {
        const newProdukts = res.data.filter(
          (newProdukt: Produkt) =>
            !prev.some(
              (existingProdukt) => existingProdukt._id === newProdukt._id,
            ),
        );
        return [...prev, ...newProdukts];
      }
      return res.data;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
