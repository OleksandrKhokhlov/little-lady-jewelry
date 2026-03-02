import { ProductImage } from "./product";

export interface CartCounterProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  images: string[];
  weight: number;
  quantity: number;
  onClick: () => void;
  onClose?: () => void; // Optional prop for closing the modal
}

export interface CartListItemProps extends Omit<CartItemProps, "images"> {
  images: ProductImage[];
  count: number;
  onCountChange: (id: string, newCount: number) => void;
  checked?: boolean;
  onCheckboxChange?: (id: string) => void;
}
