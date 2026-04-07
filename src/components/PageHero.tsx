import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { MediaFrame } from "@/components/MediaFrame";
import { buttonClassName } from "@/lib/buttonClassName";
import { Link } from "react-router-dom";

type HeroAction = {
  label: string;
  to: string;
};

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: HeroAction[];
  mediaSrc?: string;
  mediaAlt?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  mediaSrc,
  mediaAlt = "",
}: PageHeroProps) {
  return (
    <Container
      as="section"
      className="grid gap-10 py-10 lg:grid-cols-[1.15fr,1fr] lg:items-end"
    >
      <div className="space-stack-md">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="type-display">{title}</h1>
        {description ? (
          <p className="max-w-prose text-lg leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
        {actions?.length ? (
          <div className="flex flex-wrap gap-3">
            {actions.map((action, index) => (
              <Link
                key={action.to}
                className={buttonClassName(
                  index === 0 ? "solid" : "outline",
                  "md",
                )}
                to={action.to}
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      {mediaSrc ? (
        <MediaFrame aspect="4-3" src={mediaSrc} alt={mediaAlt} />
      ) : (
        <div className="surface-panel media-4-3" />
      )}
    </Container>
  );
}
