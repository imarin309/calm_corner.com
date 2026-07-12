"use client";

import { useCallback, useState } from "react";
import { Link } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { extractText, toSlug } from "@/lib/heading";

export default function Heading2({
  children,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  const [copied, setCopied] = useState(false);

  const text = extractText(children);
  const id = toSlug(text);

  const handleCopy = useCallback(() => {
    const base = window.location.href.split("#")[0];
    navigator.clipboard.writeText(`${base}#${id}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [id]);

  return (
    <h2
      id={id}
      data-toc-heading="2"
      data-toc-text={text}
      className="group relative scroll-mt-20"
      {...props}
    >
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
