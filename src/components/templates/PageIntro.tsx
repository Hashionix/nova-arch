import { FadeInSection } from "../motion/FadeInSection";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  summary: string;
};

export function PageIntro({ eyebrow, title, summary }: PageIntroProps) {
  return (
    <FadeInSection>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight md:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-base-content/75">{summary}</p>
    </FadeInSection>
  );
}
