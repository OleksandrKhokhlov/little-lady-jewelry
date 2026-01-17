"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";

export const ContactLink: React.FC<{
  className?: string;
  href: string;
  children?: React.ReactNode;
}> = ({ className, href, children }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block size-5 md:size-7 fill-[var(--accent-color)] hover:fill-[var(--hover-color)]  hover:scale-125 transition-all duration-300",
        className,
      )}
    >
      {children}
    </Link>
  );
};
