import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Eyebrow({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60",
        className,
      )}
      {...props}
    />
  );
}
