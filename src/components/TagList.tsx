import { cn } from "@/lib/cn";

type TagListProps = {
  items: string[];
  className?: string;
};

export function TagList({ items, className }: TagListProps) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-base-300 px-3 py-1 text-xs font-medium text-base-content/70"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
