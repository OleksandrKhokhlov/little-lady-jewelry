"use client";

import { getWarehouses, searchSettlements } from "@/app/api";
import debounce from "debounce";
import { Field, useFormikContext } from "formik";
import { use, useCallback, useEffect, useState } from "react";

export const TownField = () => {
  const { setFieldValue, errors, touched } = useFormikContext<any>();
  const [suggestions, setSuggestions] = useState<
    { Present: string; Ref: string }[]
  >([]);
  const [warehouses, setWarehouses] = useState<
    { Description: string; Ref: string }[]
  >([]);
  const [query, setQuery] = useState("");
  const [settlementRef, setSettlementRef] = useState<string | null>(null);
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [warehouseQuery, setWarehouseQuery] = useState("");
  const [isWarehouseSelected, setIsWarehouseSelected] = useState(false);

  const debouncedSearchWarehouses = useCallback(
    debounce(async (ref: string, searchTerm: string) => {
      if (!ref) return;
      try {
        const result = await getWarehouses(ref, searchTerm || undefined);
        const warehousesWithNumber = result.map((wh) => {
          const numberMatch =
            wh.Description.match(/(?:№|відділення\s+)(\d+)/i) ||
            wh.Description.match(/(\d+)/);
          return {
            ...wh,
            Number: numberMatch ? numberMatch[1] : "",
          };
        });
        setWarehouses(warehousesWithNumber);
      } catch (error) {
        console.error("Помилка пошуку відділень:", error);
      }
    }, 500),
    [],
  );

  useEffect(() => {
    if (isCitySelected || query.length < 3) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(async () => {
      const result = await searchSettlements(query);
      setSuggestions(result);
    }, 400);
    return () => clearTimeout(timeout);
  }, [query, isCitySelected]);

  useEffect(() => {
    if (!settlementRef || !isCitySelected || isWarehouseSelected) return;

    debouncedSearchWarehouses(settlementRef, warehouseQuery);
  }, [
    settlementRef,
    warehouseQuery,
    debouncedSearchWarehouses,
    isCitySelected,
    isWarehouseSelected,
  ]);

  const handleSelectCity = (item: { Present: string; Ref: string }) => {
    setQuery(item.Present);
    setSettlementRef(item.Ref);
    setSuggestions([]);
    setFieldValue("town", item.Present);
    setFieldValue("warehouse", "");
    setIsCitySelected(true);
    setWarehouseQuery("");
  };

  const handleWarehouseSearch = (searchTerm: string) => {
    setWarehouseQuery(searchTerm);
    setFieldValue("warehouse", searchTerm);
    setIsWarehouseSelected(false);
  };

  return (
    <div className="mt-2 flex flex-col relative pb-3">
      <Field
        id="town"
        name="town"
        placeholder="Населений пункт"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
          setSettlementRef(null);
          setWarehouses([]);
          setIsCitySelected(false);
          setFieldValue("warehouse", "");
        }}
        className="form-input"
      />

      {errors.town && touched.town ? (
        <span className="text-[10px] text-red-500 absolute bottom-0">
          {errors.town as string}
        </span>
      ) : null}

      {suggestions.length > 0 && (
        <ul className="absolute z-10 top-full left-0 rounded shadow-md bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.Ref}
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectCity(item)}
            >
              {item.Present}
            </li>
          ))}
        </ul>
      )}

      <Field
        id="warehouse"
        name="warehouse"
        placeholder="Відділення"
        value={warehouseQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleWarehouseSearch(e.target.value)
        }
        className={`mt-4 form-input ${isCitySelected ? "" : "focus:shadow-none hover:shadow-none cursor-not-allowed"}`}
        disabled={!isCitySelected}
      />

      {errors.warehouse && touched.warehouse ? (
        <span className="text-[10px] text-red-500">
          {errors.warehouse as string}
        </span>
      ) : null}

      {warehouses.length > 0 && (
        <ul className="absolute z-10 top-full left-0 rounded shadow-md bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
          {warehouses.map((wh) => (
            <li
              key={wh.Ref}
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setFieldValue("warehouse", wh.Description);
                setWarehouseQuery(wh.Description);
                setWarehouses([]);
                setIsWarehouseSelected(true);
              }}
            >
              {wh.Description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
