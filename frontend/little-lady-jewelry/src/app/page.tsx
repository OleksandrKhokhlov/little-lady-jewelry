import { Container, Hero, ProductCatalog } from "../components";
import { getProdukts } from "./api";

export default async function Home() {

  const initialProducts = (await getProdukts()) || [];

  return (
    <>
      <h1 className="sr-only">
        Магазин прикрас Little Lady: готові подарунки під ключ
      </h1>
      <Hero />
      <Container className="py-0 pb-4">
        <ProductCatalog initialProducts={initialProducts} />
      </Container>
    </>
  );
}
