import type { ComponentPropsWithoutRef } from "react";
import { extractText, toSlug } from "@/lib/heading";

export default function Heading3({
  children,
  ...props
}: ComponentPropsWithoutRef<"h3">) {
  const text = extractText(children);
  const id = toSlug(text);

  return (
    <h3
      id={id}
      data-toc-heading="3"
      data-toc-text={text}
      className="scroll-mt-20"
      {...props}
    >
      {children}
    </h3>
  );
}
