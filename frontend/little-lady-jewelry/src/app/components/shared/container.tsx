import React from "react";
import { cn } from "@/lib/cn";

interface Props {
    className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    return <div className={cn('mx-auto max-w-[400px] px-[10px] pt-[5px]', className)}>{ children}</div>
}