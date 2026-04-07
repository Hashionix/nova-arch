import { PageSeo } from "../components/seo/PageSeo";
import { PageIntro } from "../components/templates/PageIntro";
import { ServiceGrid } from "../components/templates/ServiceGrid";
import {
  services,
  servicesIntro,
  servicesSection,
  servicesSeo,
} from "../data/siteContent";

export function ServicesPage() {
  return (
    <>
      <PageSeo
        title={servicesSeo.title}
        description={servicesSeo.description}
      />
      <PageIntro
        eyebrow={servicesIntro.eyebrow}
        title={servicesIntro.title}
        summary={servicesIntro.summary}
      />
      <ServiceGrid
        title={servicesSection.title}
        intro={servicesSection.intro}
        items={services}
      />
    </>
  );
}
