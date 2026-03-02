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
      className={cn("mx-auto px-[8px]  md:max-w-6xl md:px-[36px]", className)}
    >
      {children}
    </Tag>
  );
};
