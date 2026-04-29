import { api } from "./api";

export const deleteProdukt = async (productId: string) => {
  try {
    const res = await api.delete(`/product/${productId}`);
    if (res.status !== 200) {
      throw new Error("Failed to delete product");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
