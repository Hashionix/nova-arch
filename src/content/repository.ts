import {
  articles,
  awards,
  innovationPractices,
  jobs,
  offices,
  people,
  projects,
  services,
  siteConfig,
  testimonials,
} from "@/content/seed";

export function getSiteConfig() {
  return siteConfig;
}

export function getOffices() {
  return offices;
}

export function getProjects() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getServices() {
  return services;
}

export function getServicesByGroup(group: "design" | "consulting") {
  return services.filter((service) => service.group === group);
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getInnovationPractices() {
  return innovationPractices;
}

export function getInnovationBySlug(slug: string) {
  return innovationPractices.find((practice) => practice.slug === slug);
}

export function getPeople() {
  return people;
}

export function getPersonBySlug(slug: string) {
  return people.find((person) => person.slug === slug);
}

export function getArticles() {
  return articles;
}

export function getArticlesByCategory(category: string) {
  return articles.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase(),
  );
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getAwards() {
  return awards;
}

export function getJobs() {
  return jobs;
}

export function getJobBySlug(slug: string) {
  return jobs.find((job) => job.slug === slug);
}

export function getTestimonials() {
  return testimonials;
}
