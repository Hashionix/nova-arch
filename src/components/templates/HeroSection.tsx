import { Link } from "react-router-dom";
import type { HeroContent } from "../../types/content";
import { FadeInSection } from "../motion/FadeInSection";

type HeroSectionProps = {
  content: HeroContent;
};

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <FadeInSection className="grid items-end gap-8 lg:grid-cols-[1.2fr,1fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
          {content.eyebrow}
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl leading-tight md:text-6xl">
          {content.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-base-content/75">
          {content.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="btn btn-primary rounded-full px-6"
            to={content.primaryCta.to}
          >
            {content.primaryCta.label}
          </Link>
          <Link
            className="btn btn-outline rounded-full px-6"
            to={content.secondaryCta.to}
          >
            {content.secondaryCta.label}
          </Link>
        </div>
      </div>
      <figure className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-editorial">
        <img
          className="h-full w-full object-cover"
          src={content.image.src}
          alt={content.image.alt}
        />
      </figure>
    </FadeInSection>
  );
}
