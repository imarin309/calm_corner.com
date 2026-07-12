import type { ReactNode } from "react";

export function extractText(children: ReactNode): string {
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

export function toSlug(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[<>'"[\]{}|\\^`]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}
