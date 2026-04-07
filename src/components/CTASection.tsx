import { SectionHeading } from "@/components/SectionHeading";
import { buttonClassName } from "@/lib/buttonClassName";
import { Link } from "react-router-dom";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction: { label: string; to: string };
  secondaryAction?: { label: string; to: string };
};

export function CTASection({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: CTASectionProps) {
  return (
    <section className="surface-panel space-stack-md p-8 md:p-10">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div className="flex flex-wrap gap-3">
        <Link to={primaryAction.to} className={buttonClassName("solid", "md")}>
          {primaryAction.label}
        </Link>
        {secondaryAction ? (
          <Link
            to={secondaryAction.to}
            className={buttonClassName("outline", "md")}
          >
            {secondaryAction.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
