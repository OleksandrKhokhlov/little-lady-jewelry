import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createSlug, getProduktMetadata } from "@/lib";
import { getProduktById } from "@/app/api";
import { Container, ProduktCardDetails } from "@/components";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: rawSlug } = params;
  const productId = rawSlug?.includes("-") ? rawSlug.split("-").pop() : rawSlug;

  if (!productId) return getProduktMetadata(null);

  const product = await getProduktById(productId);
  return getProduktMetadata(product);
}

export default async function ProductPage({ params }: Props) {
  const { id: rawSlug } = params;
  const productId = rawSlug?.includes("-") ? rawSlug.split("-").pop() : rawSlug;

  if (!productId) notFound();

  const product = await getProduktById(productId);

  if (!product) {
    return (
      <Container
        tag="section"
        className="relative pb-4 md:mt-4 md:flex md:gap-6"
      >
        <h1 className="text-2xl font-bold text-center text-red-600">
          Вибачте, але ми не знайшли детальний опис цього продукта.
        </h1>
      </Container>
    );
  }

  const productSlug = createSlug(product.name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images?.map((img: { url: string }) => img.url) || [
      "/no-photo.png",
    ],
    description: `Ювелірна прикраса ${product.name} від магазину Little Lady Jewelry.`,
    sku: product._id,
    brand: {
      "@type": "Brand",
      name: "Little Lady Jewelry",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "UAH",
      availability:
        product.quantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `https://littlelady.com.ua/product/${productSlug}-${product._id}`,
      seller: {
        "@type": "Organization",
        name: "Little Lady Jewelry",
      },
    },
  };

  return (
    <Container tag="section" className="relative pb-4 md:mt-4 md:flex md:gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProduktCardDetails {...product} />
    </Container>
  );
}
