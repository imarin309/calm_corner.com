import Link from "next/link";
import { getTagName } from "@/constants/tag";

interface TagBadgeProps {
  tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="inline-block py-1 text-xs text-ink-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
    >
      #{getTagName(tag)}
    </Link>
  );
}
