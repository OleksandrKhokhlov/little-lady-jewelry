import { api } from "./api";

export const getProdukts = async (setProdukts: (products: []) => void) => {
  try {
    const res = await api.get(`/product`);

    setProdukts(res.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
