import { EmblaOptionsType } from "embla-carousel";
import { ProductImage } from "./product";

export interface EmblaCarouselProps {
  name?: string;
  slides: ProductImage[];
  video?: string;
  options?: EmblaOptionsType;
}

export interface EmblaThumbProps {
  imageUrl: string;
  selected: boolean;
  onClick: () => void;
}
