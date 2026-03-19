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
        <ul className="grid grid-cols-3 min-[570px]:grid-cols-5 min-[840px]:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mt-2 md:mt-4">
          {favoriteProduktsList.map((favoriteProdukt) => (
            <ProduktCard
              key={favoriteProdukt._id}
              produkt={favoriteProdukt}
              favoriteProdukts={favoriteProdukts}
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
