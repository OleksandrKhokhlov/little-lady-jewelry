"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProduktContext } from "@/lib";
import { getProduktById } from "@/app/api";
import { AdminProductEditor, Container } from "@/components";

const AdminProductPage = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const { produkts } = useProduktContext();
  const [product, setProduct] = useState<any | null>(null);

  useEffect(() => {
    const found = produkts.find((produkt) => produkt._id === id);
    if (found) {
      setProduct(found);
    } else {
      const fetchProduct = async () => {
        try {
          const res = await getProduktById(id);
          setProduct(res);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
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
    <Container tag="section">
      <AdminProductEditor product={product} />
    </Container>
  );
};

export default AdminProductPage;
