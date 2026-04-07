import { cn } from "@/lib/cn";
import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ className, children }: CardProps) {
  return (
    <article className={cn("surface-panel p-6", className)}>{children}</article>
  );
}
