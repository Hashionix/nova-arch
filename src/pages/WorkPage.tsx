import { PageSeo } from "../components/seo/PageSeo";
import { CaseStudyGrid } from "../components/templates/CaseStudyGrid";
import { PageIntro } from "../components/templates/PageIntro";
import {
  featuredWork,
  workIntro,
  workSection,
  workSeo,
} from "../data/siteContent";

export function WorkPage() {
  return (
    <>
      <PageSeo title={workSeo.title} description={workSeo.description} />
      <PageIntro
        eyebrow={workIntro.eyebrow}
        title={workIntro.title}
        summary={workIntro.summary}
      />
      <CaseStudyGrid
        title={workSection.title}
        intro={workSection.intro}
        items={featuredWork}
      />
    </>
  );
}
