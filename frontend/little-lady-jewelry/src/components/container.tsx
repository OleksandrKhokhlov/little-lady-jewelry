'use client';

import React from "react";
import { cn } from "@/lib";

interface Props {
    className?: string;
    tag?: keyof JSX.IntrinsicElements;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children, tag = 'div' }) => {
    const Tag = tag;

    return <Tag className={cn('mx-auto px-[8px]  md:max-w-6xl md:px-[12px]', className)}>{ children}</Tag>
}