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
      className={`emba-thumbs__slide relative size-20 md:size-[100px] rounded-[10px] overflow-hidden ${selected ? "is-selected" : ""}`}
    >
      <Image
        src={imageError || !imageUrl ? "/no-photo.png" : imageUrl}
        alt="Мініатюра"
        className={`${imageUrl === "/poster-video.jpg" ? "" : "object-cover"}`}
        onError={() => setImageError(true)}
        priority={false}
        fill
      />
    </button>
  );
};
