import Link from "next/link";
import { getTagName } from "@/constants/tag";

interface TagBadgeProps {
  tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="border border-stone-400 px-2 py-1 text-xs text-stone-500 transition-colors hover:border-stone-600 hover:text-stone-700"
    >
      #{getTagName(tag)}
    </Link>
  );
}
