import type { StatItem } from "../../types/content";
import { FadeInSection } from "../motion/FadeInSection";

type StatsStripProps = {
  items: StatItem[];
};

export function StatsStrip({ items }: StatsStripProps) {
  return (
    <FadeInSection className="mt-14 grid gap-4 rounded-3xl border border-base-300 bg-base-100 p-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <article key={item.label} className="rounded-2xl bg-base-200/65 p-4">
          <p className="font-display text-3xl text-primary">{item.value}</p>
          <p className="mt-1 text-sm text-base-content/70">{item.label}</p>
        </article>
      ))}
    </FadeInSection>
  );
}
