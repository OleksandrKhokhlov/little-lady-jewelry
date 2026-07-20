import { Produkt } from "@/types";
import { Metadata } from "next";
import { env } from "process";
import { createSlug } from "./slugify";

const BASED_URL =
  env.NEXT_PUBLIC_BASE_URL || "https://little-lady-jewelry.vercel.app";

export function getProduktMetadata(product: Produkt | null): Metadata {
  if (!product) {
    return {
      title: "Продукт не знайдено | Little Lady Jewelry",
      description:
        "Вибачте, але запитаний товар не знайдено в нашому каталозі.",
    };
  }

  const title = `${product.name} - купити в магазині прикрас Little Lady Jewelry`;
  const description = `Купити ${product.name} за ціною ${product.price} грн. Вишукані ювелірні прикраси та готові подарунки з доставкою по Україні.`;
  const imageUrl = product.images?.[0]?.url || `${BASED_URL}/no-photo.png`;
  const productSlug = createSlug(product.name);
  const canonicalUrl = `${BASED_URL}/product/${productSlug}-${product._id}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Little Lady Jewelry",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      locale: "uk_UA",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
