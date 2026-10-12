import Link from "next/link";
import type { Tag } from "@/constants/tag";

interface TagShelfProps {
  tags: (Tag & { count: number })[];
}

export default function TagShelf({ tags }: TagShelfProps) {
  return (
    <ul className="flex flex-wrap gap-x-(--space-md) gap-y-1">
      {tags.map(({ slug, name, count }) => (
        <li key={slug}>
          <Link
            href={`/tags/${slug}`}
            className="group inline-flex min-h-11 items-baseline gap-2 py-2"
          >
            <span className="text-lg text-ink underline decoration-line decoration-2 underline-offset-8 transition-colors group-hover:text-accent group-hover:decoration-accent">
              #{name}
            </span>
            <span className="text-xs text-ink-muted">{count}件</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
