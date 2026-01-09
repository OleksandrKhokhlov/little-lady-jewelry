import React from "react";
import Link from "next/link";
import { cn } from "@/lib";

interface LogoProps {
  classNameH1?: string;
  classNameH2?: string;
}

export const Logo: React.FC<LogoProps> = (classNameH1, classNameH2) => {
  return (
    <Link href={"/"} className="text-center ">
      <h1 className={cn ("font-kallithea md:text-[20px]", classNameH1)}>Little lady</h1>
      <h2 className={cn("font-calisto text-[10px] md:text-[12px] text-[var(--accent-color)] uppercase", classNameH2)}>
        Jewelry
      </h2>
    </Link>
  );
};
