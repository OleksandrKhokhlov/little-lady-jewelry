import { lockTypes } from "@/app/constans/lock-type";
import React from "react";

interface FiltrProps {
  selectedValue: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FiltrPopUp: React.FC<FiltrProps> = ({
  selectedValue,
  handleChange,
}) => {
  return (
    <>
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
            value={type.value}
            className="bg-[var(--bg-color)]"
          >
            {type.name}
          </option>
        ))}
      </select>
    </>
  );
};
