"use client";

import { useEffect, useState } from "react";
import { List, X } from "lucide-react";
import clsx from "clsx";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("article [data-toc-heading]"),
    ).filter((el) => el.id && el.dataset.tocText);

    // eslint-disable-next-line react-hooks/set-state-in-effect -- headings come from MDX-rendered DOM, not from this component's own render
    setHeadings(
      elements.map((el) => ({
        id: el.id,
        text: el.dataset.tocText ?? "",
        level: Number(el.dataset.tocHeading),
      })),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (headings.length < 2) return null;

  const list = (onLinkClick?: () => void) => (
    <ul className="space-y-1.5">
      {headings.map((h) => (
        <li
          key={h.id}
          className={clsx(h.level === 3 && "pl-3", h.level === 4 && "pl-6")}
        >
          <a
            href={`#${h.id}`}
            onClick={onLinkClick}
            className={clsx(
              "block truncate text-sm transition-colors",
              activeId === h.id
                ? "font-semibold text-stone-800"
                : "text-stone-500 hover:text-stone-700",
            )}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* デスクトップ: 右側固定パネル */}
      <nav
        aria-label="目次"
        className="hidden xl:block fixed right-6 top-1/2 z-30 max-h-[70vh] w-52 -translate-y-1/2 overflow-y-auto rounded-xl border border-stone-200 bg-white/95 p-4 shadow-sm backdrop-blur-sm"
      >
        <p className="mb-2 text-xs font-semibold text-stone-400">目次</p>
        {list()}
      </nav>

      {/* スマホ: 丸ボタン + ボトムシート */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="目次を開く"
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-stone-800 text-white shadow-lg xl:hidden"
      >
        <List size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[70vh] overflow-y-auto rounded-t-2xl bg-white p-5 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-stone-700">目次</p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="閉じる"
                className="text-stone-400 hover:text-stone-600"
              >
                <X size={18} />
              </button>
            </div>
            {list(() => setIsOpen(false))}
          </div>
        </div>
      )}
    </>
  );
}
