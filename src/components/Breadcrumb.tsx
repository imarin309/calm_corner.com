import Link from "next/link";
import { getCategoryName } from "@/constants/category";

interface BreadcrumbProps {
  category: string;
  title: string;
}

const linkClassName =
  "underline-offset-4 transition-colors hover:text-ink hover:underline";

export default function Breadcrumb({ category, title }: BreadcrumbProps) {
  return (
    <nav
      aria-label="パンくずリスト"
      className="mx-auto max-w-3xl border-t border-line pt-(--space-md) pb-(--space-lg)"
    >
      <ol className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs text-ink-muted">
        <li>
          <Link href="/" className={linkClassName}>
            ホーム
          </Link>
        </li>
        <li aria-hidden>›</li>
        <li>
          <Link href={`/category/${category}`} className={linkClassName}>
            {getCategoryName(category)}
          </Link>
        </li>
        <li aria-hidden>›</li>
        <li aria-current="page" className="min-w-0 break-words text-ink">
          {title}
        </li>
      </ol>
    </nav>
  );
}
