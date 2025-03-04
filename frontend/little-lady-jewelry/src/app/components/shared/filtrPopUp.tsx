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
        <option value="Всі" className="bg-[var(--bg-color)]">
          Всі
        </option>
        <option value="Конго" className="bg-[var(--bg-color)]">
          Конго
        </option>
        <option value="Англійский замок" className="bg-[var(--bg-color)]">
          Англійский замок
        </option>
        <option value="Пусети на закрутках" className="bg-[var(--bg-color)]">
          Пусети на закрутках
        </option>
        <option value="Пусети на заглушках" className="bg-[var(--bg-color)]">
          Пусети на заглушках
        </option>
      </select>
    </>
  );
};
