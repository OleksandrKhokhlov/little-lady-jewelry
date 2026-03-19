import toast from "react-hot-toast";
import { Icon } from "./icon";
import { updatePrice, updateQuantity } from "@/app/api";
import { Produkt } from "@/types";

export const AdminProductCardMenu = ({
  id,
  price,
  quantity,
  setPrice,
  setQuantity,
  setProdukts,
}: {
  id: string;
  price: number;
  quantity: number;
  setPrice: (price: number) => void;
  setQuantity: (quantity: number) => void;
  setProdukts: React.Dispatch<React.SetStateAction<Produkt[]>>;
}) => {
  const handleUpdatePrice = async (newPrice: number) => {
    const res = await updatePrice(id, newPrice);
    if (res.success) {
      setProdukts((prevProdukts) =>
        prevProdukts.map((produkt) =>
          produkt._id === id ? { ...produkt, price: newPrice } : produkt,
        ),
      );
      toast.success("Ціну оновлено");
      return;
    } else {
      toast.error(res.message || "Не вдалося оновити ціну");
    }
  };

  const handleUpdateQuantity = async (newQuantity: number) => {
    const res = await updateQuantity(id, newQuantity);
    if (res.success) {
      setProdukts((prevProdukts) =>
        prevProdukts.map((produkt) =>
          produkt._id === id ? { ...produkt, quantity: newQuantity } : produkt,
        ),
      );
      toast.success("Кількість оновлено");
    } else {
      toast.error(res.message || "Не вдалося оновити кількість");
    }
  };

  return (
    <div>
      <div className="flex gap-1 items-center justify-between">
        <label className="text-xs text-gray-600 w-[70%]">
          Ціна:
          <input
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="form-input text-center text-sm w-[90%]"
          />
        </label>
        <button
          type="button"
          onClick={() => handleUpdatePrice(price)}
          className="size-[26px] "
        >
          <Icon
            iconId="icon-Check-Admin"
            className="fill-[var(--accent-color)]"
          />
        </button>
      </div>

      <div className="flex gap-1 items-center justify-between">
        <label className="text-xs text-gray-600 w-[70%]">
          Кількість:
          <input
            name="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="form-input text-center text-sm w-[90%]"
          />
        </label>
        <button
          type="button"
          onClick={() => handleUpdateQuantity(quantity)}
          className="size-[26px] "
        >
          <Icon
            iconId="icon-Check-Admin"
            className="fill-[var(--accent-color)]"
          />
        </button>
      </div>
    </div>
  );
};
