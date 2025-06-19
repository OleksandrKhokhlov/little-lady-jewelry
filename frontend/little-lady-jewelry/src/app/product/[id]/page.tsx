"use client";
import { FC } from "react";
import { useParams } from "next/navigation";

interface ProductPageProps {
  params: { id: string };
}

const ProductPage: FC<ProductPageProps> = () => {
  const params = useParams();
  const { id } = params || {};

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Product Page {id}</h1>
    </div>
  );
};

export default ProductPage;
