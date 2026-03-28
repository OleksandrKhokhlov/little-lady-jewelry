"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProduktContext } from "@/lib";
import { getProduktById } from "@/app/api";
import { Container, ProduktCardDetails } from "@/components";
import { Produkt } from "@/types";

const ProductPage = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const { produkts } = useProduktContext();
  const [product, setProduct] = useState<Produkt | null>(null);

  useEffect(() => {
    const found = produkts.find((produkt) => produkt._id === id);
    if (found) {
      setProduct(found as Produkt);
      return;
    } else {
      getProduktById(id).then((data) => setProduct(data));
    }
  }, [id, produkts]);

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
    <Container tag="section" className="relative pb-4 md:mt-4 md:flex md:gap-6">
      <ProduktCardDetails {...product} />
    </Container>
  );
};

export default ProductPage;
