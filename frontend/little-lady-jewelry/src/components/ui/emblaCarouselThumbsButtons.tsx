"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

type PropType = {
  imageUrl: string;
  selected: boolean;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imageUrl, onClick } = props;
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`emba-thumbs__slide ${selected ? "is-selected" : ""}`}
    >
      <Image
        src={imageError || !imageUrl ? "/no-photo.png" : imageUrl}
        alt="Мініатюра"
        width={80}
        height={80}
        className={`h-[80px] rounded-[10px] ${imageUrl === "/poster-video.jpg" ? "" : "object-cover"}`}
        onError={() => setImageError(true)}
        priority={false}
      />
    </button>
  );
};
