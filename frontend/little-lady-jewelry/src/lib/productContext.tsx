"use client";
import toast from "react-hot-toast";
import { createContext, useContext, useEffect, useState } from "react";
import { getProdukts } from "@/app/api";

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
  setProdukts: React.Dispatch<React.SetStateAction<Produkt[]>>;
  favoriteProdukts: string[];
  setFavoriteProdukts: React.Dispatch<React.SetStateAction<string[]>>;
  toggleFavorite: (id: string) => void;
}

const ProduktContext = createContext<ProduktContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
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
    setFavoriteProdukts((prev) => {
      const isFavorite = prev.includes(id);
      if (isFavorite) {
        toast.success("Видалено з улюбленого");
        return prev.filter((favId) => favId !== id);
      } else {
        toast.success("Додано до улюбленого");
        return [...prev, id];
      }
    });
  };

  useEffect(() => {
    getProdukts(setProdukts);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteProdukts));
  }, [favoriteProdukts]);

  return (
    <ProduktContext.Provider
      value={{
        produkts,
        setProdukts,
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
