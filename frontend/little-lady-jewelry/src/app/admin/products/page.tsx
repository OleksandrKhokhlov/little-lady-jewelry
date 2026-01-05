"use client";

import {
  Container,
  FiltrPopUp,
  Icon,
  ModalCreateProduct,
  ProduktCard,
} from "@/components";
import withAdminAuth from "@/components/withAdminAuth";
import { useProduktContext } from "@/lib";
import { SetStateAction, useEffect, useState } from "react";

const AdminProducts = () => {
  const { produkts } = useProduktContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Всі");
  const [filtredProdukts, setFilteredProdukts] = useState(produkts);

  useEffect(() => {
    const normalizedSelectedValue = selectedValue
      .toLowerCase()
      .replace(/\s/g, "");
    const filtred = produkts.filter((produkt) => {
      const normalizedProduktType = produkt.type
        .toLowerCase()
        .replace(/\s/g, "");
      return (
        normalizedSelectedValue === "всі" ||
        normalizedSelectedValue === normalizedProduktType
      );
    });
    setFilteredProdukts(filtred);
  }, [selectedValue, produkts]);

  return (
    <Container className="py-0 mt-2">
      <FiltrPopUp
        selectedValue={selectedValue}
        handleChange={(e: { target: { value: SetStateAction<string> } }) =>
          setSelectedValue(e.target.value)
        }
      />
      {produkts.length === 0 ? (
        <span className="loader"></span>
      ) : filtredProdukts.length === 0 ? (
        <p>
          {" "}
          Нажаль в продажу поки що немає прикрас з типом застібки:{" "}
          {selectedValue}.
        </p>
      ) : (
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
          {filtredProdukts.map((produkt) => (
            <ProduktCard
              key={produkt._id}
              produkt={produkt}
              className={
                "w-[calc((100%/3)-6px)]  flex flex-col justify-between font-bold "
              }
            />
          ))}
        </ul>
      )}

      <ModalCreateProduct
        isModalOpen={isModalOpen}
        setModalOpen={() => setIsModalOpen(!isModalOpen)}
      />
    </Container>
  );
};

export default withAdminAuth(AdminProducts);
