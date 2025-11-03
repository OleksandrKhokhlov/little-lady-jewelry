import { api } from "./api";

interface ProductData {
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
}

type UpdateProductPayload = Partial<ProductData>;
type UpdateProductReasponse = ProductData;

export const updateProdukt = async (
  productId: string,
  updatedData: UpdateProductPayload,
) => {
  try {
    const res = await api.patch<UpdateProductReasponse>(
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
