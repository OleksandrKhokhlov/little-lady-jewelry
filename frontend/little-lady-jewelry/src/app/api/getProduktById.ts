import { api } from "./api";

export const getProduktById = async (id: string) => {
  try {
    const res = await api.get(`/product/${id}`);

    if (res.status !== 200) {
      console.error(`Error fetching product with ID ${id}:`, res.statusText);
      return null;
    }
    return res.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};
