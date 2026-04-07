import { Eyebrow } from "@/components/Eyebrow";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("max-w-prose space-stack-sm", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="type-title">{title}</h2>
      {description ? (
        <p className="text-muted leading-relaxed">{description}</p>
      ) : null}
    </header>
  );
}
