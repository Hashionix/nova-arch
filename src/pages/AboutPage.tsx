import { FadeInSection } from "../components/motion/FadeInSection";
import { PageSeo } from "../components/seo/PageSeo";
import { PageIntro } from "../components/templates/PageIntro";
import {
  aboutGlobalFootprint,
  aboutIntro,
  aboutSeo,
  teamPrinciples,
} from "../data/siteContent";

export function AboutPage() {
  return (
    <>
      <PageSeo title={aboutSeo.title} description={aboutSeo.description} />
      <PageIntro
        eyebrow={aboutIntro.eyebrow}
        title={aboutIntro.title}
        summary={aboutIntro.summary}
      />
      <FadeInSection className="mt-16 grid gap-4 md:grid-cols-3">
        {teamPrinciples.map((principle) => (
          <article
            key={principle.title}
            className="rounded-3xl border border-base-300 bg-base-100 p-6"
          >
            <h2 className="font-display text-2xl">{principle.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-base-content/75">
              {principle.detail}
            </p>
          </article>
        ))}
      </FadeInSection>
      <FadeInSection className="mt-12 rounded-3xl border border-base-300 bg-base-200 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-primary/75">
          Global Footprint
        </p>
        <p className="mt-4 max-w-3xl font-display text-3xl leading-tight">
          {aboutGlobalFootprint}
        </p>
      </FadeInSection>
    </>
  );
}
