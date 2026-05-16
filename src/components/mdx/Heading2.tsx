"use client";

import { useCallback, useState } from "react";
import { Link } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function extractText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children != null && typeof children === "object" && "props" in children) {
    return extractText(
      (children as { props: { children?: ReactNode } }).props.children,
    );
  }
  return "";
}

function toSlug(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[<>'"[\]{}|\\^`]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function Heading2({
  children,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  const [copied, setCopied] = useState(false);

  const id = toSlug(extractText(children));

  const handleCopy = useCallback(() => {
    const base = window.location.href.split("#")[0];
    navigator.clipboard.writeText(`${base}#${id}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [id]);

  return (
    <h2 id={id} className="group relative" {...props}>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        aria-label="リンクをコピー"
      >
        {copied ? (
          <span className="text-xs text-secondary font-normal">✓</span>
        ) : (
          <Link size={14} className="text-secondary" />
        )}
      </button>
      {children}
    </h2>
  );
}
