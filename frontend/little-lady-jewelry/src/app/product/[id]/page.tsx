"use client";

import { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProduktContext } from "@/lib";
import { getProduktById } from "@/app/api";
import { Container, ProduktCardDetails } from "@/components";

interface ProductPageProps {
  id: string;
}

interface ProductDetails {
  _id: string;
  name: string;
  images: Array<{ public_id: string; url: string }>;
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
    height?: number;
    width?: number;
  };
  quantity: number;
}

const ProductPage: FC<ProductPageProps> = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const { produkts } = useProduktContext();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const found = produkts.find((produkt) => produkt._id === id);
    if (found) {
      setProduct(found as ProductDetails);
      return;
    } else {
      setLoading(true);
      getProduktById(id)
        .then((data) => setProduct(data))
        .finally(() => setLoading(false));
    }
  }, [id, produkts]);

  if (loading) {
    return <span className="loader"></span>;
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          Вибачте, але ми не знайшли детальний опис продукта
        </h1>
      </div>
    );
  }

  return (
    <Container tag="section" className="md:mt-4 md:flex md:gap-6">
      <ProduktCardDetails product={product} />
    </Container>
  );
};

export default ProductPage;
