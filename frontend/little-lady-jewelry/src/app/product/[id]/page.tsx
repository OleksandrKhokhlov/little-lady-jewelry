"use client";
import { FC } from "react";
import { useParams } from "next/navigation";
import { useProduktContext } from "@/lib";
import { getProduktById } from "@/app/api";

interface ProductPageProps {
  id: string;
}

const ProductPage: FC<ProductPageProps> = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const { produkts } = useProduktContext();

  // Find the product by ID
  const product = produkts.find((produkt) => produkt._id === id);

  if (!product) {
    const produkctById = getProduktById(id);
    if (!produkctById) {
      return (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Loading product...</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Product Page {id}</h1>
    </div>
  );
};

export default ProductPage;
