import { cn } from "@/lib/cn";

type LoadingSkeletonProps = {
  lines?: number;
  className?: string;
};

export function LoadingSkeleton({
  lines = 4,
  className,
}: LoadingSkeletonProps) {
  return (
    <div
      className={cn("surface-panel p-6", className)}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="h-5 w-2/5 animate-pulse rounded bg-base-300" />
      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-3 animate-pulse rounded bg-base-300",
              index === lines - 1 ? "w-4/5" : "w-full",
            )}
          />
        ))}
      </div>
    </div>
  );
}
