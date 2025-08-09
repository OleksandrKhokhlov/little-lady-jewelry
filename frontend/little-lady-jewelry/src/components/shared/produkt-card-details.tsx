import { FC } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { EmblaCarousel } from "../ui";

interface ProduktCardDetailsProps {
  product: {
    name: string;
    images: string[];
    video?: string;
    price: number;
    type: string;
    material: string;
    insert: string;
    weight: string;
    dimensions?: {
      width?: number;
      height?: number;
    };
    quantity: number;
  };
}

export const ProduktCardDetails: FC<ProduktCardDetailsProps> = ({
  product,
}) => {
  const {
    name,
    images,
    video,
    price,
    type,
    material,
    insert,
    weight,
    dimensions,
    quantity,
  } = product;

  const OPTIONS: EmblaOptionsType = {};

  return (
    <>
      <h1 className="text-[20px] mb-1 text-center">{name}</h1>
        {images && images.length > 0 && (
          <EmblaCarousel
            name={name}
            slides={images}
            video={video}
            options={OPTIONS}
          />
        )}
    </>
  );
};
