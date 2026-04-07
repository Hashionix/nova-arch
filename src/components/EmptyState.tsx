import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <section className="surface-panel flex flex-col items-center px-6 py-12 text-center">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-base-200 text-base-content/70">
        <Inbox size={18} />
      </span>
      <h2 className="mt-4 type-title text-2xl">{title}</h2>
      <p className="mt-3 max-w-prose text-muted">{description}</p>
    </section>
  );
}
