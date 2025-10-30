"use client";
import { Field, useField } from "formik";
import { useState } from "react";

export const PhoneField = () => {
  const [field, meta, helpers] = useField("telephone");
  const [inputValue, setInputValue] = useState("+380");

  const { error, touched } = meta;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith("+380")) {
      helpers.setValue("+380");
      setInputValue("+380");
      return;
    }
    if (value.length <= 13) {
      helpers.setValue(value);
      setInputValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "+380") {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col relative pb-3">
      <Field
        id="telephone"
        name="telephone"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="form-input pl-12"
      />
      {error && touched && (
        <span className="text-[10px] text-red-500 absolute bottom-0">
          {error}
        </span>
      )}
    </div>
  );
};
