"use client";
import { Container } from "../components/shared/container";
import { useProduktContext } from "@/lib/productContext";
import { ProduktCard } from "../components/shared/produkt-card";

export default function FavoritePage() {
  const { produkts, favoriteProdukts, toggleFavorite } = useProduktContext();

  const favoriteProduktsList = produkts.filter((product) =>
    favoriteProdukts.includes(product._id),
  );

  return (
    <Container tag="section" className={"flex flex-wrap mt-2 gap-x-2 gap-y-6"}>
      {favoriteProduktsList.length > 0 ? (
        favoriteProduktsList.map((favoriteProdukt) => (
          <ProduktCard
            key={favoriteProdukt._id}
            produkt={favoriteProdukt}
            favoriteProdukts={favoriteProdukts}
            onToggleFavorite={() => toggleFavorite(favoriteProdukt._id)}
            className={
              "w-[calc((100%/3)-6px)]  flex flex-col justify-between font-bold "
            }
          />
        ))
      ) : (
        <h1 className="text-sm text-center">
          Сторінка обраних товарів порожня. Додайте товари до обраних, щоб вони
          з'явилися тут.
        </h1>
      )}
    </Container>
  );
}
