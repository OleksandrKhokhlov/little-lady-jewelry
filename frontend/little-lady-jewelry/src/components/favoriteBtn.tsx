"use client";

import { useProduktContext } from "@/lib";
import { useEffect, useState } from "react";
import { Icon } from "./icon";

export const FavoriteBtn = ({ id }: { id: string }) => {
  const { favoriteProdukts, toggleFavorite } = useProduktContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isFavorite = isMounted ? favoriteProdukts.includes(id) : false;

  return (
    <button
      type="button"
      className="size-[17px] flex items-center justify-center p-0"
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
