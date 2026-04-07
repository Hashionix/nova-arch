export type NavItem = {
  label: string;
  to: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Research", to: "/research-innovation" },
  { label: "People", to: "/people" },
  { label: "News", to: "/news" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];
