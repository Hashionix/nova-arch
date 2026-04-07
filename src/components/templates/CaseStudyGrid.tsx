import type { CaseStudy } from "../../types/content";
import { FadeInSection } from "../motion/FadeInSection";

type CaseStudyGridProps = {
  title: string;
  intro: string;
  items: CaseStudy[];
};

export function CaseStudyGrid({ title, intro, items }: CaseStudyGridProps) {
  return (
    <FadeInSection className="mt-16">
      <div className="mb-8 max-w-2xl">
        <h2 className="font-display text-4xl leading-tight">{title}</h2>
        <p className="mt-4 text-base-content/75">{intro}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.slug}
            className="overflow-hidden rounded-3xl border border-base-300 bg-base-100"
          >
            <img
              className="h-48 w-full object-cover"
              src={item.image.src}
              alt={item.image.alt}
            />
            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                {item.category}
              </p>
              <h3 className="mt-3 font-display text-2xl leading-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-base-content/75">
                {item.summary}
              </p>
            </div>
          </article>
        ))}
      </div>
    </FadeInSection>
  );
}
