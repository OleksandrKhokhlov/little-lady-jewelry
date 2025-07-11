import axios from "axios";

export const getProdukts = async (setProdukts: (products: []) => void) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiUrl = `${baseUrl}api/product`;
    const resp = await axios.get(apiUrl);

    setProdukts(resp.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
