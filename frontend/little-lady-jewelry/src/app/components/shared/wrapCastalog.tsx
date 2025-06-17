import { cn } from "@/lib/cn";
import React from "react";

interface WrapCatalogProps {
  className?: string;
  children: React.ReactNode;
}

export const WrapCatalog: React.FC<WrapCatalogProps> = ({
  className,
  children,
}) => {
  return (
    <section className={cn("flex flex-wrap", className)}>
      {children}
    </section>
  );
};
