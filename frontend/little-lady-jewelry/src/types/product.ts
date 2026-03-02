import { LockTypeValues } from "@/constans";

export interface ProductDimensions {
  width?: number;
  height?: number;
}

export interface ProductImage {
  public_id: string;
  url: string;
}

export interface ProductPayload {
  name: string;
  images: ProductImage[];
  video?: string;
  price: number;
  type: LockTypeValues;
  material: string;
  insert: string;
  weight: number;
  dimensions: ProductDimensions;
  quantity: number;
}

export interface ProduktCardProps {
  produkt: Omit<
    Produkt,
    "video" | "material" | "insert" | "dimensions" | "weight"
  >;

  favoriteProdukts?: string[];
  onToggleFavorite?: () => void;
  className?: string;
}

export interface Produkt extends ProductPayload {
  _id: string;
}

export interface FormValues
  extends Omit<ProductPayload, "images" | "dimensions"> {
  images: string[];
  width: number;
  height: number;
}

export interface ProductDescriptionType
  extends Omit<ProductPayload, "images" | "video" | "quantity"> {}
