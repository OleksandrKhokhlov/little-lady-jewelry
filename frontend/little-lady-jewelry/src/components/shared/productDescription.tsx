import { FC } from "react";

interface ProductDescriptionProps {
  price: number;
  type: string;
  material: string;
  insert: string;
  weight: number;
  dimensions: {
    width?: number;
    height?: number;
  };
}

export const ProductDescription: FC<ProductDescriptionProps> = ({
  price,
  type,
  material,
  insert,
  weight,
  dimensions,
}) => {
  const { width, height } = dimensions || {};

  return (
    <ul className="mt-[5px] px-2 border-b-2 border-t-2 border-[var(--accent-color)] [&>li]:flex [&>li]:justify-between [&>li]:border-b [&>li]:border-[var(--accent-color)] [&>li:last-child]:border-b-0">
      <li>
        <span>Тип застібки:</span>
        <span>{type}</span>
      </li>
      <li>
        <span>Матеріал:</span>
        <span>{material}</span>
      </li>
      <li>
        <span>Вага:</span>
        <span>{weight} г</span>
      </li>
      <li>
        <span>Вставка:</span>
        <span>{insert}</span>
      </li>
      <li>
        <span>Довжина:</span>
        <span> {height} мм</span>
      </li>
      <li>
        <span>Ширина:</span>
        <span>{width} мм</span>
      </li>
      <li className="pt-2 pb-2">
        <span>Ціна:</span>
        <span className="font-cabinsketch text-[var(--accent-color)] block">{`${price} \u20B4`}</span>
      </li>
    </ul>
  );
};
