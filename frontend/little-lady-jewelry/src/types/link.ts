export interface NavLinkProps {
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export interface NavMenuProps {
  setModalBurgerOpen?: () => void;
  setModalCartOpen?: () => void;
  className?: string;
}
