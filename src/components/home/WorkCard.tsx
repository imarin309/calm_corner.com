import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { getCategoryName } from "@/constants/category";
import { splitWorkTitle } from "@/lib/work-title";
import TagBadge from "@/components/TagBadge";

export default function WorkCard({ post }: { post: Post }) {
  const { name, catchCopy } = splitWorkTitle(post.title);
  const month = new Date(post.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
  });

  return (
    <article>
      <Link href={`/posts/${post.slug}`} className="group block">
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-line">
          <Image
            src={post.coverImage ?? "/icon.png"}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            style={{
              objectPosition: `center ${post.coverImagePositionY ?? 50}%`,
            }}
          />
        </div>
        <h3 className="mt-3 font-bold leading-snug text-ink group-hover:text-accent">
          {name}
        </h3>
        {catchCopy && (
          <p className="mt-1 text-sm text-ink-muted">{catchCopy}</p>
        )}
        <p className="mt-2 text-xs text-ink-muted">
          {getCategoryName(post.category)}・{month}
        </p>
      </Link>
      {post.tags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-x-3">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
