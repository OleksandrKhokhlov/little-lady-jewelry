"use client";
import toast from "react-hot-toast";
import { createContext, useContext, useEffect, useState } from "react";
import { getProdukts } from "@/app/api";
import { getLocalStorage } from "./localStorage";

interface Produkt {
  _id: string;
  images: Array<{ public_id: string; url: string }>;
  name: string;
  price: number;
  type:
    | "англійський замок"
    | "конго"
    | "пусети на закрутках"
    | "пусети на заглушках";
  quantity: number;
  weight: number;
}

interface ProduktContextType {
  produkts: Produkt[];
  setProdukts: React.Dispatch<React.SetStateAction<Produkt[]>>;
  favoriteProdukts: string[];
  setFavoriteProdukts: React.Dispatch<React.SetStateAction<string[]>>;
  inCart: string[];
  setInCart: React.Dispatch<React.SetStateAction<string[]>>;
  toggleFavorite: (id: string) => void;
  addToCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
}

const ProduktContext = createContext<ProduktContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [produkts, setProdukts] = useState<Produkt[]>([]);
  const [favoriteProdukts, setFavoriteProdukts] = useState<string[]>(() =>
    getLocalStorage<string[]>("favorites", []),
  );
  const [inCart, setInCart] = useState<string[]>(() =>
    getLocalStorage<string[]>("inCart", []),
  );

  const toggleFavorite = (id: string) => {
    const isFavorite = favoriteProdukts.includes(id);

    setFavoriteProdukts((prev) =>
      isFavorite ? prev.filter((favId) => favId !== id) : [...prev, id],
    );

    setTimeout(() => {
      toast.success(isFavorite ? "Видалено з обраного" : "Додано до обраного", {
        duration: 2000,
      });
    }, 0);
  };

  const addToCart = (id: string) => {
    const isInCart = inCart.includes(id);

    setInCart((prev) => (isInCart ? prev : [...prev, id]));

    setTimeout(() => {
      toast.success(isInCart ? "Вже у кошику" : "Додано до кошика", {
        duration: 2000,
      });
    }, 0);
  };

  const deleteFromCart = (id: string) => {
    const isInCart = inCart.includes(id);
    setInCart((prev) =>
      isInCart ? prev.filter((cartId) => cartId !== id) : prev,
    );
  };

  useEffect(() => {
    getProdukts(setProdukts);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteProdukts));
  }, [favoriteProdukts]);

  useEffect(() => {
    localStorage.setItem("inCart", JSON.stringify(inCart));
  }, [inCart]);

  return (
    <ProduktContext.Provider
      value={{
        produkts,
        setProdukts,
        favoriteProdukts,
        setFavoriteProdukts,
        inCart,
        setInCart,
        toggleFavorite,
        addToCart,
        deleteFromCart,
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
