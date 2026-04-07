import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { ShareBar } from "@/components/ShareBar";
import { TagList } from "@/components/TagList";
import { Compass } from "lucide-react";
import { useParams } from "react-router-dom";

type RouteShellProps = {
  title: string;
  subtitle: string;
};

export function RouteShell({ title, subtitle }: RouteShellProps) {
  const params = useParams();
  const hasParams = Object.keys(params).length > 0;

  return (
    <div className="space-stack-lg">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: title }]} />

      <PageHero
        eyebrow="Route Shell"
        title={title}
        description={subtitle}
        actions={[
          { label: "Explore Projects", to: "/projects" },
          { label: "Contact", to: "/contact" },
        ]}
      />

      <Card className="space-stack-md">
        <div className="inline-flex items-center gap-2 rounded-full bg-base-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/70">
          <Compass size={14} />
          Shell Status
        </div>
        <TagList
          items={[
            "Editorial Theme",
            "Reusable Components",
            "daisyUI Foundation",
            "Accessible Navigation",
          ]}
        />
        <ShareBar />
        {hasParams ? (
          <pre className="overflow-auto rounded-xl bg-base-200 p-4 text-xs">
            {JSON.stringify(params, null, 2)}
          </pre>
        ) : null}
      </Card>

      <CTASection
        eyebrow="Next Step"
        title="Populate this shell with page content"
        description="The foundational layout, tokens, and reusable components are in place for production content wiring."
        primaryAction={{ label: "Open News", to: "/news" }}
        secondaryAction={{ label: "Open Careers", to: "/careers" }}
      />
    </div>
  );
}
