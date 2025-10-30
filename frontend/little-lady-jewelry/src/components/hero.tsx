import Image from "next/image";
import React from "react";

interface HeroProps {
  width: number;
  height: number;
}

export const Hero: React.FC<HeroProps> = ({ width, height }) => {
  return (
    <Image
      src={"/hero.jpg"}
      alt="Подарунок під ключ"
      width={width}
      height={height}
      priority
      className="w-full h-auto object-cover"
    />
  );
};
