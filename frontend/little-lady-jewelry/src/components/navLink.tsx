"use client";

import { cn } from "@/lib";
import { NavLinkProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export const NavLink = ({
  href,
  children,
  onClick,
  className,
}: PropsWithChildren<NavLinkProps>) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative px-1 w-fit transition-colors duration-300",
        //   underline
        "after:absolute after:left-0 after:bottom-[-2px] md:after:bottom-0 after:w-full after:h-[2px] after:bg-[var(--accent-color)] after:rounded-full",
        "after:scale-x-0 hover:after:scale-x-100 after:origin-center after:transition-transform after:duration-300",
        isActive && "text-[var(--accent-color)] after:scale-x-100",
        className,
      )}
    >
      {children}
    </Link>
  );
};
