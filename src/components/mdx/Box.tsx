import { ReactNode } from "react";

export default function Box({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`not-prose relative my-8 rounded-sm border border-line bg-surface px-4 pb-3 sm:px-6 ${
        title ? "pt-6" : "pt-3"
      }`}
    >
      {title && (
        <p className="absolute -top-3 left-3 -rotate-1 bg-line/80 px-3 py-0.5 text-sm font-semibold text-ink sm:left-5">
          {title}
        </p>
      )}
      <div className="mdx-box-body prose prose-sm sm:prose-base prose-stone max-w-none text-stone-700 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
