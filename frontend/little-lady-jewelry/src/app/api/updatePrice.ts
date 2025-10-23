import { api } from "./api";

export const updatePrice = async (productId: string, newPrice: number) => {
  try {
    const res = await api.patch(`/product/${productId}/price`, {
      price: newPrice,
    });
    if (res.status !== 200) {
      return { success: false, message: res.statusText };
    }
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error updating price:", error);
    return { success: false, message: "Server error" };
  }
};
