"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface ContactLinkProps {
  className?: string;
  href: string;
}

export const ContactLink = ({
  className,
  href,
  children,
}: PropsWithChildren<ContactLinkProps>) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block size-5 fill-[var(--accent-color)] hover:fill-[var(--hover-color)]  hover:scale-125 transition-all duration-300",
        className,
      )}
    >
      {children}
    </Link>
  );
};
