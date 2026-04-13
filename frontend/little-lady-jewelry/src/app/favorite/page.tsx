"use client";
import { Container } from "../../components/container";
import { useProduktContext } from "@/lib/productContext";
import { ProduktCard } from "../../components/produktCard";

export default function FavoritePage() {
  const { produkts, favoriteProdukts } = useProduktContext();

  const favoriteProduktsList = produkts.filter((product) =>
    favoriteProdukts.includes(product._id),
  );

  return (
    <Container tag="section" className="pb-4">
      {favoriteProduktsList.length > 0 ? (
        <ul className="flex flex-wrap gap-2 mt-3 md:mt-4">
          {favoriteProduktsList.map((favoriteProdukt) => (
            <ProduktCard
              key={favoriteProdukt._id}
              produkt={favoriteProdukt}
              className={
                "flex flex-col justify-between font-bold max-w-[150px]"
              }
            />
          ))}
        </ul>
      ) : (
        <h2 className="text-sm text-center">
          Сторінка обраних товарів порожня. Додайте товари до обраних, щоб вони
          з&apos;явилися тут.
        </h2>
      )}
    </Container>
  );
}
