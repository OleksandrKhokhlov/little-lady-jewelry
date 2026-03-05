"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Icon } from "./icon";
import { ModalProps } from "@/types";

export const Modal = ({
  header,
  isOpen,
  onClose,
  side = "right",
  className,
  children,
}: PropsWithChildren<ModalProps>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ease-out ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } ${className}`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 ${side === "right" ? "right-0 rounded-l-xl" : "left-0 rounded-r-xl"} bg-[var(--bg-color)] shadow-xl transform transition-transform duration-500 ease-out ${className} ${
          isOpen
            ? "translate-x-0"
            : side === "right"
              ? "translate-x-full"
              : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={` flex items-center ${header ? "justify-between border-b-2 border-[var(--accent-color)]" : "justify-end "}`}
        >
          {" "}
          {header && <h2 className="text-[20px]">{header}</h2>}
          <button
            onClick={onClose}
            className="fill-[var(--text-color)] hover:fill-[var(--hover-color)] transition-colors duration-300"
          >
            <Icon iconId="icon-Cross" className="size-[15px] " />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
