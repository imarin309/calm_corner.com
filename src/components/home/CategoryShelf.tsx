import Link from "next/link";
import type { Category } from "@/constants/category";

interface CategoryShelfProps {
  categories: (Category & { count: number })[];
}

export default function CategoryShelf({ categories }: CategoryShelfProps) {
  return (
    <ul className="flex flex-wrap gap-x-(--space-md) gap-y-1">
      {categories.map(({ slug, name, count }) => (
        <li key={slug}>
          <Link
            href={`/category/${slug}`}
            className="group inline-flex min-h-11 items-baseline gap-2 py-2"
          >
            <span className="text-lg text-ink underline decoration-line decoration-2 underline-offset-8 transition-colors group-hover:text-accent group-hover:decoration-accent">
              {name}
            </span>
            <span className="text-xs text-ink-muted">{count}件</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
