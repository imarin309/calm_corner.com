import { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";

export default function Caution({
  title = "注意",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="not-prose my-8 rounded-sm border-l-[3px] border-caution bg-[color-mix(in_srgb,var(--color-caution)_5%,var(--color-surface))] px-4 py-3 sm:px-5">
      <p className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-caution">
        <TriangleAlert size={16} aria-hidden />
        {title}
      </p>
      <div className="prose prose-sm sm:prose-base prose-stone max-w-none text-stone-700 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
