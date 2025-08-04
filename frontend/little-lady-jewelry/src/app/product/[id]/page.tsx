"use client";
import { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProduktContext } from "@/lib";
import { getProduktById } from "@/app/api";
import { EmblaCarousel } from "@/components/ui";
import { EmblaOptionsType } from "embla-carousel";

interface ProductPageProps {
  id: string;
}

const ProductPage: FC<ProductPageProps> = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const { produkts } = useProduktContext();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const found = produkts.find((produkt) => produkt._id === id);
    if (found) {
      setProduct(found);
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
  const OPTIONS: EmblaOptionsType = {};

  const {
    name,
    images,
    video,
    price,
    type,
    material,
    insert,
    weight,
    dimensions,
    quantity,
  } = product;
  return (
    <section key={id} className="container p-2">
      <h1 className="text-3xl font-bold mb-1 mx-auto">{name}</h1>
      <div className="flex flex-col items-center">
        {images && images.length > 0 && (
          <EmblaCarousel
            name={name}
            slides={images}
            video={video}
            options={OPTIONS}
          />
        )}
      </div>
    </section>
  );
};

export default ProductPage;
