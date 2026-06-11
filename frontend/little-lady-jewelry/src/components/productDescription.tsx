import { ProductDescriptionType } from "@/types";

export const ProductDescription = ({
  name,
  price,
  type,
  material,
  insert,
  weight,
  dimensions,
}: ProductDescriptionType) => {
  const { width, height } = dimensions || {};

  return (
    <div>
      <h1 className="text-[20px] hidden mb-1 text-center md:block">{name}</h1>
      <ul className="mt-2 text-[16px] md:mt-3 md:[&>li]:mb-2 px-2 border-b-2 border-t-2 border-[var(--accent-color)] [&>li]:flex [&>li]:justify-between [&>li]:border-b [&>li]:border-[var(--accent-color)] [&>li:last-child]:border-b-0 md:[&>li:first-child]:mt-2">
        {type && (
          <li>
            <span>Застібка:</span>
            <span>{type}</span>
          </li>
        )}
        {material && (
          <li>
            <span>Матеріал:</span>
            <span>{material}</span>
          </li>
        )}
        {weight && (
          <li>
            <span>Вага:</span>
            <span>{weight} г</span>
          </li>
        )}
        {insert && (
          <li>
            <span>Вставка:</span>
            <span>{insert}</span>
          </li>
        )}
        {height ? (
          <li>
            <span>Довжина:</span>
            <span> {height} мм</span>
          </li>
        ) : null}
        {width ? (
          <li>
            <span>Ширина:</span>
            <span>{width} мм</span>
          </li>
        ) : null}
        <li className="pt-2 pb-2 text-[20px]">
          <span>Ціна:</span>
          <span className="font-cabinsketch text-[var(--accent-color)] block">{price ? `${price} \u20B4` : "Ціну уточнюйте"}</span>
        </li>
      </ul>
    </div>
  );
};
