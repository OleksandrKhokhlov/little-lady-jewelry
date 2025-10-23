"use client";

import { Container, ProduktCard } from "@/components/shared";
import withAdminAuth from "@/components/shared/withAdminAuth";
import { useProduktContext } from "@/lib";

const AdminProducts = () => {
  const { produkts, setProdukts } = useProduktContext();
  return (
    <Container className="py-0 mt-2">
      {produkts.map((produkt) => (
        <ProduktCard
          produkt={produkt}
          className={
            "w-[calc((100%/3)-6px)]  flex flex-col justify-between font-bold "
          }
        />
      ))}
    </Container>
  );
};

export default withAdminAuth(AdminProducts);
