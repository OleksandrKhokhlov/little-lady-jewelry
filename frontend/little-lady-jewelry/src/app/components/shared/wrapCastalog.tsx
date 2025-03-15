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
    <div className={cn("flex justify-between flex-wrap", className)}>
      {children}
    </div>
  );
};
