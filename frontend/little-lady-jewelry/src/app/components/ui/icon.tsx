import React from "react";

interface IconProps {
  iconId: string;
  className?: string;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({
  iconId,
  className,
}) => (
  <svg className={className}>
    <use href={`/icons.svg#${iconId}`}/>
  </svg>
);
