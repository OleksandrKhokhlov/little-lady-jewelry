import { cn } from "@/lib";

interface IconProps {
  iconId: string;
  className?: string;
}

export const Icon = ({ iconId, className }: IconProps) => (
  <svg className={cn("size-[100%]", className)}>
    <use href={`/icons.svg#${iconId}`} />
  </svg>
);
