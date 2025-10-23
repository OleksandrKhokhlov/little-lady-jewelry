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
      return { success: false, message: res.statusText };
    }
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error updating quantity:", error);
    return { success: false, message: "Server error" };
  }
};
