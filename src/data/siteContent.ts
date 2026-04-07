import type {
  CaseStudy,
  ContactOption,
  HeroContent,
  NavItem,
  PageIntroContent,
  SeoMeta,
  ServiceItem,
  StatItem,
  TeamPrinciple,
} from "../types/content";

export const studioName = "North Axis Studio";

export const navigation: NavItem[] = [
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const homeSeo: SeoMeta = {
  title: `${studioName} | Design and Consulting`,
  description:
    "Global design and consulting studio shaping branded experiences, digital products, and strategic narratives.",
};

export const homeSections = {
  serviceTitle: "Services designed for strategic momentum",
  serviceIntro:
    "We shape initiatives that move from conceptual ambition to measurable delivery across teams, channels, and customer moments.",
  workTitle: "Selected collaborations",
  workIntro:
    "A snapshot of work where design and consulting solved high-stakes transformation challenges.",
  insightsTitle: "Field Notes",
  insightsIntro:
    "Practical observations from our consulting teams, updated from a lightweight external feed.",
  insightsLoading: "Loading latest notes...",
  insightsError:
    "Insights are temporarily unavailable. Please check back shortly.",
};

export const homeHero: HeroContent = {
  eyebrow: "Global Design and Consulting Studio",
  title: "Designing decisive moves for ambitious organizations.",
  description:
    "We partner with leaders to align strategy, brand, and digital product into premium experiences that perform across markets.",
  primaryCta: { label: "Start a Project", to: "/contact" },
  secondaryCta: { label: "View Selected Work", to: "/work" },
  image: {
    src: "/media/hero-atrium.svg",
    alt: "Abstract architectural atrium with warm gradient light",
  },
};

export const studioStats: StatItem[] = [
  { label: "Client Markets", value: "22" },
  { label: "Senior Consultants", value: "48" },
  { label: "Projects Launched", value: "310+" },
  { label: "Years Operating", value: "14" },
];

export const services: ServiceItem[] = [
  {
    slug: "brand-systems",
    title: "Brand Systems",
    summary:
      "Positioning, narrative frameworks, and identity systems built to scale across global touchpoints.",
  },
  {
    slug: "digital-platforms",
    title: "Digital Platforms",
    summary:
      "Product strategy, UX architecture, and interface design for service-rich experiences.",
  },
  {
    slug: "transformation-design",
    title: "Transformation Design",
    summary:
      "Cross-functional operating models, journey design, and service orchestration for measurable change.",
  },
];

export const featuredWork: CaseStudy[] = [
  {
    slug: "aurora-grid",
    title: "Aurora Grid Program",
    category: "Energy Services",
    summary:
      "Reframed a multinational energy platform to support new ventures and investor confidence in six regions.",
    image: {
      src: "/media/work-grid.svg",
      alt: "Aerial style geometric forms representing infrastructure planning",
    },
  },
  {
    slug: "atlas-travel",
    title: "Atlas Travel Ecosystem",
    category: "Hospitality",
    summary:
      "Unified booking, loyalty, and concierge services into one editorial booking experience.",
    image: {
      src: "/media/work-atlas.svg",
      alt: "Minimal abstract map-like composition in warm palette",
    },
  },
  {
    slug: "northshore-health",
    title: "Northshore Health Service",
    category: "Healthcare",
    summary:
      "Designed a patient-first digital pathway with clearer care access and staff coordination.",
    image: {
      src: "/media/work-health.svg",
      alt: "Layered soft gradient circles symbolizing connected care pathways",
    },
  },
];

export const aboutSeo: SeoMeta = {
  title: `About | ${studioName}`,
  description:
    "Meet the team and principles behind our global design and consulting practice.",
};

export const servicesSeo: SeoMeta = {
  title: `Services | ${studioName}`,
  description:
    "Explore North Axis Studio services spanning brand systems, digital platforms, and transformation design.",
};

export const servicesIntro: PageIntroContent = {
  eyebrow: "Capabilities",
  title: "An integrated consulting and design offer.",
  summary:
    "Our teams bring strategy, product, and brand disciplines together so organizations can execute transformation with clarity and confidence.",
};

export const servicesSection = {
  title: "Service pillars",
  intro:
    "Each engagement is tailored, but our structure keeps teams aligned from discovery through launch.",
};

export const workSeo: SeoMeta = {
  title: `Work | ${studioName}`,
  description:
    "Selected strategic design and consulting projects delivered by North Axis Studio.",
};

export const workIntro: PageIntroContent = {
  eyebrow: "Portfolio",
  title: "Casework shaped for real-world complexity.",
  summary:
    "From digital service transformation to brand modernization, our engagements balance measurable outcomes with cultural resonance.",
};

export const workSection = {
  title: "Recent engagements",
  intro:
    "These examples illustrate how we combine strategic framing with detailed execution across industries.",
};

export const aboutIntro: PageIntroContent = {
  eyebrow: "Who We Are",
  title: "A senior team built for cross-market transformation.",
  summary:
    "North Axis Studio is an independent collective of strategists, designers, and technologists helping organizations move from intent to execution.",
};

export const aboutGlobalFootprint =
  "North Axis Studio teams are distributed across New York, Copenhagen, Nairobi, and Singapore, with project support worldwide.";

export const teamPrinciples: TeamPrinciple[] = [
  {
    title: "Editorial Clarity",
    detail:
      "We reduce complexity into clear decisions, strong narratives, and confident visual systems.",
  },
  {
    title: "Business Relevance",
    detail:
      "Every design choice connects to operational outcomes, adoption, and long-term capability.",
  },
  {
    title: "Craft at Scale",
    detail:
      "Our teams combine strategic rigor with production discipline across global implementation.",
  },
];

export const contactSeo: SeoMeta = {
  title: `Contact | ${studioName}`,
  description:
    "Tell us about your transformation opportunity and our team will follow up.",
};

export const contactIntro: PageIntroContent = {
  eyebrow: "Start a Conversation",
  title: "Tell us what you need to move forward.",
  summary:
    "Share your challenge, timeline, and context. We will reply with a focused next-step recommendation.",
};

export const contactFormCopy = {
  nameLabel: "Name",
  emailLabel: "Email",
  organizationLabel: "Organization",
  projectTypeLabel: "Project Type",
  budgetLabel: "Budget Range",
  briefLabel: "Project Brief",
  selectPlaceholder: "Select one",
  submitIdle: "Send Inquiry",
  submitSending: "Sending...",
  success: "Thanks, your brief has been received. We will reply shortly.",
  error: "Submission failed. Please try again in a few minutes.",
};

export const projectTypeOptions: ContactOption[] = [
  { label: "Brand System", value: "brand-system" },
  { label: "Digital Platform", value: "digital-platform" },
  { label: "Transformation Program", value: "transformation-program" },
  { label: "Research Sprint", value: "research-sprint" },
];

export const budgetOptions: ContactOption[] = [
  { label: "USD 50k - 150k", value: "50-150" },
  { label: "USD 150k - 500k", value: "150-500" },
  { label: "USD 500k - 1M", value: "500-1000" },
  { label: "USD 1M+", value: "1000+" },
];

export const footerBlurb =
  "North Axis Studio partners with organizations across the Americas, EMEA, and APAC.";
