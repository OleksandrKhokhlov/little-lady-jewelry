import toast from "react-hot-toast";
import { api } from "./api";

export const deleteProdukt = async (productId: string) => {
  try {
    const res = await api.delete(`/products/${productId}`);
    if (res.status !== 200) {
      toast.error("Щось пішло не так, спробуйте ще раз");
      throw new Error("Failed to delete product");
    }
    toast.success("Товар успішно видалено");
    return res.data;
  } catch (error) {
    toast.error("Щось пішло не так, спробуйте ще раз");
    console.log(error);
    return null;
  }
};
