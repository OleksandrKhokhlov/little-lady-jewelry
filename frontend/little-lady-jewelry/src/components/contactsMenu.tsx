"use client";

import { cn } from "@/lib";
import { Icon } from "./icon";
import { ContactLink } from "./contactLink";

export const ContactsMenu: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <ul className={cn("flex gap-10 mt-8", className)}>
      <li>
        <ContactLink href="https://www.instagram.com/little.lady.jewelry?igsh=cWJmaWYwdmVxdjJ1">
          <Icon
            iconId="icon-Instagram"
            className="size-5 fill-[var(--accent-color)]"
          />
        </ContactLink>
      </li>
      <li>
        <ContactLink href="https://t.me/tanya_khokhlovaa">
          <Icon
            iconId="icon-Telegram"
            className="size-5 fill-[var(--accent-color)] stroke-[var(--accent-color)]"
          />
        </ContactLink>
      </li>
      <li>
        <ContactLink href="viber://chat?number=+380932470158">
          <Icon
            iconId="icon-Viber"
            className="size-5 fill-[var(--accent-color)]"
          />
        </ContactLink>
      </li>
    </ul>
  );
};
