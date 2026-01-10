"use client";

import { cn } from "@/lib";
import { Icon } from "./icon";
import { ContactLink } from "./contactLink";

export const ContactsMenu: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <ul className={cn("flex gap-10 mt-8 md:mt-0", className)}>
      <li>
        <ContactLink href="https://www.instagram.com/little.lady.jewelry?igsh=cWJmaWYwdmVxdjJ1">
          <Icon iconId="icon-Instagram" />
        </ContactLink>
      </li>
      <li>
        <ContactLink href="https://t.me/tanya_khokhlovaa">
          <Icon iconId="icon-Telegram" />
        </ContactLink>
      </li>
      <li>
        <ContactLink href="viber://chat?number=+380932470158">
          <Icon iconId="icon-Viber" />
        </ContactLink>
      </li>
    </ul>
  );
};
