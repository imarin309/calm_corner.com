import type { PostHeading } from "@/lib/posts";

export default function ArticleToc({ headings }: { headings: PostHeading[] }) {
  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="目次"
      className="mb-8 rounded-sm border border-line bg-surface px-4 py-4 sm:px-6"
    >
      <p className="mb-2 text-sm font-semibold text-ink">目次</p>
      <ol className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="text-sm text-ink-muted transition-colors hover:text-accent"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
