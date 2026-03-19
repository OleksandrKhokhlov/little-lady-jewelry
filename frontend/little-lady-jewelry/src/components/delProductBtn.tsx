import toast from "react-hot-toast";
import { Icon } from "./icon";
import Swal from "sweetalert2";
import { deleteProdukt } from "@/app/api";
import { Produkt } from "@/types";

export const DelProductBtn = ({
  id,
  setProdukts,
}: {
  id: string;
  setProdukts: React.Dispatch<React.SetStateAction<Produkt[]>>;
}) => {
  const handleDeleteProdukt = async (productId: string) => {
    const res = await Swal.fire({
      title: "Видалити товар?",
      text: "Цю дію не можна буде скасувати!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Так, видалити!",
      cancelButtonText: "Скасувати",
    });

    if (res.isConfirmed) {
      await deleteProdukt(productId);
      setProdukts((prevProdukts) =>
        prevProdukts.filter((produkt) => produkt._id !== productId),
      );
      toast.success("Товар видалено");
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleDeleteProdukt(id);
      }}
      className="absolute top-1 right-1 size-[17px] flex items-center justify-center p-0"
    >
      <Icon
        iconId="icon-Cross"
        className="size-[15px] fill-[var(--accent-color)]"
      />
    </button>
  );
};
