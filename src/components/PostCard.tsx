import Image from "next/image";
import Link from "next/link";
import { getCategoryName } from "@/constants/category";
import TagBadge from "@/components/TagBadge";

interface PostCardProps {
  title: string;
  excerpt?: string;
  date: string;
  slug: string;
  coverImage?: string;
  coverImagePositionY?: number;
  category: string;
  tags?: string[];
}

export default function PostCard({
  title,
  excerpt,
  date,
  slug,
  coverImage,
  coverImagePositionY = 50,
  category,
  tags,
}: PostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group flex flex-col gap-(--space-sm) py-(--space-md) sm:flex-row sm:gap-(--space-md)">
      <Link
        href={`/posts/${slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[4/3] overflow-hidden rounded-sm bg-line sm:w-60 sm:shrink-0"
      >
        <Image
          src={coverImage ?? "/icon.png"}
          alt=""
          fill
          sizes="(min-width: 640px) 240px, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ objectPosition: `center ${coverImagePositionY}%` }}
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <p className="text-xs text-ink-muted">
          {getCategoryName(category)}・
          <time dateTime={date}>{formattedDate}</time>
        </p>
        <h2 className="mt-1 text-lg font-bold leading-snug text-ink">
          <Link href={`/posts/${slug}`} className="group-hover:text-accent">
            {title}
          </Link>
        </h2>
        {excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
            {excerpt}
          </p>
        )}
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-3">
            {tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
