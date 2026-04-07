export type NavItem = {
  label: string;
  to: string;
};

export type SeoMeta = {
  title: string;
  description: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: NavItem;
  secondaryCta: NavItem;
  image: {
    src: string;
    alt: string;
  };
};

export type StatItem = {
  label: string;
  value: string;
};

export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: {
    src: string;
    alt: string;
  };
};

export type TeamPrinciple = {
  title: string;
  detail: string;
};

export type ContactOption = {
  label: string;
  value: string;
};

export type Insight = {
  id: number;
  title: string;
  summary: string;
};

export type PageIntroContent = {
  eyebrow: string;
  title: string;
  summary: string;
};

export type HeroMedia = {
  src: string;
  alt: string;
  aspect: "16:9" | "4:3" | "3:4";
};

export type EntityKind =
  | "offices"
  | "projects"
  | "services"
  | "innovationPractices"
  | "people"
  | "articles"
  | "awards"
  | "jobs"
  | "testimonials";

export type RelatedEntityIds = Partial<Record<EntityKind, string[]>>;

export type TaxonomyMap = Record<string, string[]>;

export type ContentEntryBase = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  seo: SeoMeta;
  heroMedia: HeroMedia;
  tags: string[];
  taxonomies: TaxonomyMap;
  relatedIds: RelatedEntityIds;
};

export type Office = ContentEntryBase & {
  city: string;
  country: string;
  region: "Americas" | "EMEA" | "APAC";
  addressLine: string;
};

export type Project = ContentEntryBase & {
  client: string;
  year: number;
  sector: string;
  status: "Live" | "Archived";
};

export type Service = ContentEntryBase & {
  group: "design" | "consulting";
  deliveryMode: "engagement" | "advisory" | "program";
};

export type InnovationPractice = ContentEntryBase & {
  maturity: "emerging" | "established";
};

export type Person = ContentEntryBase & {
  role: string;
  officeId: string;
  disciplines: string[];
};

export type Article = ContentEntryBase & {
  publishedAt: string;
  authorId: string;
  category: string;
};

export type Award = ContentEntryBase & {
  issuer: string;
  year: number;
  level: "winner" | "shortlist" | "commendation";
};

export type Job = ContentEntryBase & {
  team: string;
  officeIds: string[];
  employmentType: "full-time" | "contract" | "internship";
};

export type Testimonial = ContentEntryBase & {
  personId: string;
  quote: string;
};

export type SiteConfig = ContentEntryBase & {
  studioName: string;
  email: string;
  mainNavigation: NavItem[];
  featuredPathways: NavItem[];
  legalNavigation: NavItem[];
};
