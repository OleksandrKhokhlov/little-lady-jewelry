"use client";
import { SetStateAction, useEffect, useState } from "react";
import { Container } from "./components/shared/container";
import { FiltrPopUp } from "./components/shared/filtrPopUp";
import { Hero } from "./components/shared/hero";
import { ProductCard } from "./components/shared/produkt-card";
import { WrapCatalog } from "./components/shared/wrapCastalog";
import axios from "axios";

type Product = {
  _id: string;
  name: string;
  images: string[];
  price: number;
  type:
    | "англійський замок"
    | "конго"
    | "пусети на закрутках"
    | "пусети на заглушках";
  quantity: number;
};

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("Всі");
  const [produkts, setProdukts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = "http://localhost:8080/api/product";
        const resp = await axios.get(apiUrl);
        setProdukts(resp.data);
      } catch (error) {
        console.error("Помилка при завантаженні:", error);
      }
    };

    fetchProducts();
  }, [setProdukts]);

  return (
    <>
      <Hero width={1280} height={648} />
      <Container className="py-0 mt-2">
        <FiltrPopUp
          selectedValue={selectedValue}
          handleChange={(e: { target: { value: SetStateAction<string> } }) =>
            setSelectedValue(e.target.value)
          }
        />
        <WrapCatalog className="mt-2 gap-x-2 gap-y-6 justify-start">
          {produkts.length > 0 ? (
            produkts.map(({ _id: id, images, price, type, quantity, name }) => (
              <ProductCard
                key={id}
                id={id}
                images={images}
                name={name}
                price={price}
                type={type}
                quantity={quantity}
                className={"w-[calc((100%/3)-6px)]  flex flex-col justify-between font-bold "}
              />
            ))
          ) : (
            <p>loading</p>
          )}
        </WrapCatalog>
      </Container>
    </>
  );
}
