import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

const WINDOW_SIZE = 6;

function getPageWindow(current: number, total: number): number[] {
  if (total <= WINDOW_SIZE) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  let start = Math.max(1, current - Math.floor(WINDOW_SIZE / 2));
  const end = Math.min(total, start + WINDOW_SIZE - 1);
  if (end - start + 1 < WINDOW_SIZE) {
    start = Math.max(1, end - WINDOW_SIZE + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) => {
    if (basePath) {
      return page === 1 ? basePath : `${basePath}/page/${page}`;
    }
    return page === 1 ? "/" : `/page/${page}`;
  };

  const pages = getPageWindow(currentPage, totalPages);
  const showStartEllipsis = pages[0] > 1;
  const showEndEllipsis = pages[pages.length - 1] < totalPages;

  const pageButtonBase =
    "flex h-11 w-11 items-center justify-center rounded-sm text-sm transition-colors";
  const pageButtonActive = "bg-ink font-medium text-paper";
  const pageButtonInactive = "text-ink-muted hover:bg-line hover:text-ink";
  const arrowButtonActive =
    "flex h-11 w-11 items-center justify-center rounded-sm text-ink-muted transition-colors hover:bg-line hover:text-ink";
  const arrowButtonDisabled =
    "flex h-11 w-11 cursor-not-allowed items-center justify-center text-line";

  return (
    <nav
      aria-label="ページネーション"
      className="mt-10 flex items-center justify-center gap-1"
    >
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          className={arrowButtonActive}
          aria-label="前のページ"
        >
          ‹
        </Link>
      ) : (
        <span className={arrowButtonDisabled}>‹</span>
      )}

      {showStartEllipsis && (
        <>
          <Link
            href={pageHref(1)}
            className={`${pageButtonBase} ${pageButtonInactive}`}
          >
            1
          </Link>
          <span className="flex h-11 w-5 items-end justify-center pb-2 text-xs tracking-widest text-ink-muted">
            ···
          </span>
        </>
      )}

      {pages.map((page) =>
        page === currentPage ? (
          <span
            key={page}
            aria-current="page"
            className={`${pageButtonBase} ${pageButtonActive}`}
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={pageHref(page)}
            className={`${pageButtonBase} ${pageButtonInactive}`}
          >
            {page}
          </Link>
        ),
      )}

      {showEndEllipsis && (
        <>
          <span className="flex h-11 w-5 items-end justify-center pb-2 text-xs tracking-widest text-ink-muted">
            ···
          </span>
          <Link
            href={pageHref(totalPages)}
            className={`${pageButtonBase} ${pageButtonInactive}`}
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          className={arrowButtonActive}
          aria-label="次のページ"
        >
          ›
        </Link>
      ) : (
        <span className={arrowButtonDisabled}>›</span>
      )}
    </nav>
  );
}
