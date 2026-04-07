import { Copy, Link2, Share2 } from "lucide-react";

const shareTargets = [
  { label: "Copy", icon: Copy },
  { label: "Link", icon: Link2 },
  { label: "Share", icon: Share2 },
];

export function ShareBar() {
  return (
    <div className="flex items-center gap-2">
      <p className="mr-1 text-xs font-semibold uppercase tracking-[0.16em] text-base-content/60">
        Share
      </p>
      {shareTargets.map((target) => (
        <button
          key={target.label}
          type="button"
          aria-label={target.label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-base-300 text-base-content/70 hover:bg-base-200"
        >
          <target.icon size={15} />
        </button>
      ))}
    </div>
  );
}
