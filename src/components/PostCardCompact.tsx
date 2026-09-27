import Image from "next/image";
import Link from "next/link";
import { getCategoryName } from "@/constants/category";

interface PostCardCompactProps {
  title: string;
  date: string;
  slug: string;
  coverImage?: string;
  coverImagePositionY?: number;
  category: string;
}

// PostCardCompact はdescriptionを持たないPostCard
export default function PostCardCompact({
  title,
  date,
  slug,
  coverImage,
  coverImagePositionY = 50,
  category,
}: PostCardCompactProps) {
  const formattedDate = new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
  });

  return (
    <article className="group">
      <Link href={`/posts/${slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-line">
          <Image
            src={coverImage ?? "/icon.png"}
            alt=""
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            style={{ objectPosition: `center ${coverImagePositionY}%` }}
          />
        </div>
        <h3 className="mt-3 line-clamp-2 text-sm font-bold leading-snug text-ink group-hover:text-accent">
          {title}
        </h3>
        <p className="mt-1 text-xs text-ink-muted">
          {getCategoryName(category)}・{formattedDate}
        </p>
      </Link>
    </article>
  );
}
