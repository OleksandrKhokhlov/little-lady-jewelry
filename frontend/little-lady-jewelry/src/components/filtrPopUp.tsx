import React, { SetStateAction } from "react";
import { lockTypes } from "@/constans/lock-type";

interface FiltrProps {
  selectedValue: string;
  handleChange: (e: { target: { value: SetStateAction<string> } }) => void;
}

export const FiltrPopUp: React.FC<FiltrProps> = ({
  selectedValue,
  handleChange,
}) => {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    value: string,
  ) => {
    e.preventDefault();
    handleChange({ target: { value: value as SetStateAction<string> } });
  };

  return (
    <>
      <div className="hidden md:flex justify-between text-[16px]">
        {lockTypes.map((type) => {
          const isActive = selectedValue === type.name;
          return (
            <a
              key={type.value}
              href="#"
              onClick={(e) => handleLinkClick(e, type.name)}
              className={`relative px-1 w-fit transition-colors duration-300 after:absolute after:left-0 after:bottom-[-2px] md:after:bottom-0 after:w-full after:h-[2px] after:bg-[var(--accent-color)] after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:origin-center after:transition-transform after:duration-300 ${isActive && "text-[var(--accent-color)] after:scale-x-100"}`}
            >
              {type.name}
            </a>
          );
        })}
      </div>
      <div className="md:hidden">
        <label
          htmlFor="lock-type"
          className="text-[var(--accent-color)] border-b-2 border-[var(--accent-color)]"
        >
          Тип замочку:
        </label>
        <select
          id="lock-type"
          value={selectedValue}
          onChange={handleChange}
          className="p-1 ml-1 border border-[var(--accent-color)] rounded focus:outline-none focus:border-[var(--hover-color)] bg-transparent"
        >
          {lockTypes.map((type) => (
            <option
              key={type.value}
              value={type.name}
              className="bg-[var(--bg-color)]"
            >
              {type.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
