"use client";

import { cn } from "@/lib";
import { PropsWithChildren } from "react";

interface Props {
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

export const Container = ({
  className,
  children,
  tag = "div",
}: PropsWithChildren<Props>) => {
  const Tag = tag;

  return (
    <Tag
      className={cn("mx-auto px-4 pb-4 md:max-w-6xl md:px-9", className)}
    >
      {children}
    </Tag>
  );
};
