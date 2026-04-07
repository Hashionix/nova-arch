import { getSiteConfig } from "@/content/repository";
import type { NavItem } from "@/types/content";

export type NavGroup = {
  heading: string;
  items: NavItem[];
};

const config = getSiteConfig();

export const mainNavigation: NavItem[] = config.mainNavigation;

export const featuredPathways: NavItem[] = config.featuredPathways;

export const legalLinks: NavItem[] = config.legalNavigation;

export const footerGroups: NavGroup[] = [
  {
    heading: "Studio",
    items: [
      { label: "About", to: "/about" },
      { label: "People", to: "/people" },
      { label: "Awards", to: "/awards" },
      { label: "Careers", to: "/careers" },
    ],
  },
  {
    heading: "Work",
    items: [
      { label: "Projects", to: "/projects" },
      { label: "Services", to: "/services" },
      { label: "Research", to: "/research-innovation" },
      { label: "News", to: "/news" },
    ],
  },
  {
    heading: "Contact",
    items: [
      { label: "General Inquiry", to: "/contact" },
      { label: "Open Roles", to: "/careers/open-roles" },
    ],
  },
];

export const socialPlaceholders = ["LinkedIn", "Instagram", "YouTube"];

export const studioEmail = config.email;
