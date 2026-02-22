import { FC } from "react";

interface ProductDescriptionProps {
  name: string;
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
  name,
  price,
  type,
  material,
  insert,
  weight,
  dimensions,
}) => {
  const { width, height } = dimensions || {};

  return (
    <div >
      <h2 className="text-[20px] hidden mb-1 text-center md:block">{name}</h2>
      <ul className="mt-2 text-[16px] md:mt-3 md:[&>li]:mb-2 px-2 border-b-2 border-t-2 border-[var(--accent-color)] [&>li]:flex [&>li]:justify-between [&>li]:border-b [&>li]:border-[var(--accent-color)] [&>li:last-child]:border-b-0 md:[&>li:first-child]:mt-2">
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
        <li className="pt-2 pb-2 text-[20px]">
          <span>Ціна:</span>
          <span className="font-cabinsketch text-[var(--accent-color)] block">{`${price} \u20B4`}</span>
        </li>
      </ul>
    </div>
  );
};
