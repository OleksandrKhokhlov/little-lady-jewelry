import axios from "axios";

export const getProduktById = async (id: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiUrl = `${baseUrl}api/product/${id}`;
    const resp = await axios.get(apiUrl);

    if (resp.status !== 200) {
      console.error(`Error fetching product with ID ${id}:`, resp.statusText);
      return null;
    }
    return resp.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};
