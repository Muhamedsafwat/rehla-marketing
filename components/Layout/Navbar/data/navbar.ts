export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

export const NAV_LINKS: NavItem[] = [
  { label: 'home', href: '/' },
  { label: 'about', href: '/about' },
  { label: 'services', href: '/services' },
  { label: 'contact', href: '/contact', isButton: true },
];
