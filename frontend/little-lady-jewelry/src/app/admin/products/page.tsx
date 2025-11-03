"use client";

import { Container, Icon, ModalCreateProduct, ProduktCard } from "@/components";
import withAdminAuth from "@/components/withAdminAuth";
import { useProduktContext } from "@/lib";
import { useState } from "react";

const AdminProducts = () => {
  const { produkts } = useProduktContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Container className="py-0 mt-2">
      <ul className="flex flex-wrap gap-x-2 gap-y-6 mt-2">
        <li className="w-[calc((100%/3)-6px)] border-2 border-dashed border-[var(--accent-color)] rounded-lg flex items-center justify-center">
          <button
            type="button"
            className="w-[40%] text-[var(--accent-color)]"
            onClick={() => setIsModalOpen(true)}
          >
            <Icon iconId="icon-Plus" className="fill-current" />
          </button>
        </li>
        {produkts.map((produkt) => (
          <ProduktCard
            key={produkt._id}
            produkt={produkt}
            className={
              "w-[calc((100%/3)-6px)]  flex flex-col justify-between font-bold "
            }
          />
        ))}
      </ul>
      <ModalCreateProduct
        isModalOpen={isModalOpen}
        setModalOpen={() => setIsModalOpen(!isModalOpen)}
      />
    </Container>
  );
};

export default withAdminAuth(AdminProducts);
