import type { ServiceItem } from "../../types/content";
import { FadeInSection } from "../motion/FadeInSection";

type ServiceGridProps = {
  title: string;
  intro: string;
  items: ServiceItem[];
};

export function ServiceGrid({ title, intro, items }: ServiceGridProps) {
  return (
    <FadeInSection className="mt-16">
      <div className="mb-8 max-w-2xl">
        <h2 className="font-display text-4xl leading-tight">{title}</h2>
        <p className="mt-4 text-base-content/75">{intro}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.slug}
            className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-secondary">
              {item.slug.replace("-", " ")}
            </p>
            <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-base-content/75">
              {item.summary}
            </p>
          </article>
        ))}
      </div>
    </FadeInSection>
  );
}
