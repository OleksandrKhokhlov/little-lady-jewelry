import React from "react";
import { cn } from "@/lib";

interface Props {
    className?: string;
    tag?: keyof JSX.IntrinsicElements;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children, tag = 'div' }) => {
    const Tag = tag;

    return <Tag className={cn('mx-auto max-w-[400px] px-[10px] pt-[5px]', className)}>{ children}</Tag>
}