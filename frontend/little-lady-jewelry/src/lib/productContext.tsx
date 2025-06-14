"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface Produkt {
  _id: string;
  images: string[];
  name: string;
  price: number;
  type:
    | "англійський замок"
    | "конго"
    | "пусети на закрутках"
    | "пусети на заглушках";
  quantity: number;
}

interface ProduktContextType {
  produkts: Produkt[];
  favoriteProdukts: string[];
  setFavoriteProdukts: React.Dispatch<React.SetStateAction<string[]>>;
  toggleFavorite: (id: string) => void;
}

const ProduktContext = createContext<ProduktContextType | undefined>(undefined);

export const ProductProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [produkts, setProdukts] = useState<Produkt[]>([]);
  const [favoriteProdukts, setFavoriteProdukts] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch (error) {
      console.error("Error parsing favorites:", error);
      return [];
    }
  });

  const toggleFavorite = (id: string) => {
    setFavoriteProdukts((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    const fetchProdukts = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const apiUrl = `${baseUrl}api/product`;
        const resp = await axios.get(apiUrl);
        setProdukts(resp.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProdukts();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteProdukts));
  }, [favoriteProdukts]);

  return (
    <ProduktContext.Provider
      value={{
        produkts,
        favoriteProdukts,
        setFavoriteProdukts,
        toggleFavorite,
      }}
    >
      {children}
    </ProduktContext.Provider>
  );
};

export const useProduktContext = (): ProduktContextType => {
  const context = useContext(ProduktContext);
  if (!context) {
    throw new Error("useProduktContext must be used within a ProduktProvider");
  }
  return context;
};
