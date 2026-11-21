import Link from "next/link";
import { getCategoryBySlug, getCategoryName } from "@/constants/category";

interface BreadcrumbProps {
  category: string;
  title: string;
}

const linkClassName =
  "underline-offset-4 transition-colors hover:text-ink hover:underline";

export default function Breadcrumb({ category, title }: BreadcrumbProps) {
  const isKnownCategory = getCategoryBySlug(category) !== undefined;

  return (
    <nav aria-label="パンくずリスト" className="mb-4">
      <ol className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs text-ink-muted">
        <li>
          <Link href="/" className={linkClassName}>
            ホーム
          </Link>
        </li>
        <li aria-hidden>›</li>
        <li>
          {isKnownCategory ? (
            <Link href={`/category/${category}`} className={linkClassName}>
              {getCategoryName(category)}
            </Link>
          ) : (
            getCategoryName(category)
          )}
        </li>
        <li aria-hidden>›</li>
        <li aria-current="page" className="min-w-0 break-words text-ink">
          {title}
        </li>
      </ol>
    </nav>
  );
}
