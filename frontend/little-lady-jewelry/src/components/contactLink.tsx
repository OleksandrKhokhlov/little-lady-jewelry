"use client";

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
      className={className}
    >
      {children}
    </Link>
  );
};
