"use client";

import { EmblaThumbProps } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const Thumb = (props: EmblaThumbProps) => {
  const { selected, imageUrl, onClick } = props;
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`emba-thumbs__slide relative size-20 md:size-[100px] rounded-[10px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_10px_var(--accent-color)] ${selected ? "is-selected" : ""}`}
    >
      <Image
        src={imageError || !imageUrl ? "/no-photo.png" : imageUrl}
        alt="Мініатюра"
        className={`${imageUrl === "/poster-video.jpg" ? "" : "object-cover"}`}
        sizes="(max-width: 768px) 120px, (max-width: 1200px) 150px, 150px"
        onError={() => setImageError(true)}
        priority={false}
        fill
      />
    </button>
  );
};
