import { useProduktContext } from "@/lib";
import { useEffect, useState } from "react";
import { Icon } from "./icon";

export const FavoriteBtn = ({ id }: { id: string }) => {
  const { favoriteProdukts, toggleFavorite } = useProduktContext();
  const [isFavorite, setIsFavorite] = useState(favoriteProdukts.includes(id));

  useEffect(() => {
    setIsFavorite(favoriteProdukts.includes(id));
  }, [favoriteProdukts, id]);

  return (
    <button
      type="button"
      className="absolute bottom-1 right-1 size-[17px] flex items-center justify-center p-0"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
      aria-label="Додати в обране"
    >
      {isFavorite ? (
        <Icon
          iconId="icon-Heart-Active"
          className="fill-[var(--accent-color)]"
        />
      ) : (
        <Icon iconId="icon-Heart" className="fill-[var(--accent-color)]" />
      )}
    </button>
  );
};
