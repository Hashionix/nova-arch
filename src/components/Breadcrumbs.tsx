import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type Crumb = {
  label: string;
  to?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-base-content/65">
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className="inline-flex items-center gap-2"
          >
            {item.to ? (
              <Link className="hover:text-base-content" to={item.to}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-base-content">
                {item.label}
              </span>
            )}
            {index < items.length - 1 ? (
              <ChevronRight size={14} aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
