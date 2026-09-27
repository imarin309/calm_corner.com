import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";

export default function WorkNoteItem({ post }: { post: Post }) {
  const formattedDate = new Date(post.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group">
      <Link
        href={`/posts/${post.slug}`}
        className="flex gap-(--space-sm) py-(--space-sm)"
      >
        <div className="flex-1">
          <time dateTime={post.date} className="text-xs text-ink-muted">
            {formattedDate}
          </time>
          <h3 className="mt-1 font-bold leading-snug text-ink group-hover:text-accent">
            {post.title}
          </h3>
          {post.description && (
            <p className="mt-2 line-clamp-2 text-sm text-ink-muted">
              {post.description}
            </p>
          )}
        </div>
        {post.coverImage && (
          <div className="relative size-20 shrink-0 overflow-hidden rounded-sm sm:size-24">
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        )}
      </Link>
    </article>
  );
}
