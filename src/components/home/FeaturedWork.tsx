import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { getCategoryName } from "@/constants/category";
import { splitWorkTitle } from "@/lib/work-title";

export default function FeaturedWork({ post }: { post: Post }) {
  const { name, catchCopy } = splitWorkTitle(post.title);
  const href = `/posts/${post.slug}`;

  return (
    <article className="group grid gap-(--space-md) sm:grid-cols-[3fr_2fr] sm:items-end sm:gap-(--space-lg)">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block -rotate-1"
      >
        {/* 手作業感はこの1枚だけに留め、作品棚の写真には付けない */}
        <span className="absolute -top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rotate-[-4deg] bg-line/80" />
        <div className="relative aspect-[5/4] overflow-hidden rounded-sm sm:aspect-[4/3]">
          <Image
            src={post.coverImage ?? "/icon.png"}
            alt=""
            fill
            priority
            sizes="(min-width: 640px) 60vw, 100vw"
            className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
            style={{
              objectPosition: `center ${post.coverImagePositionY ?? 50}%`,
            }}
          />
          {/* スマホには hover がないため、写真がリンクだと分かる目印を常に出しておく */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 bottom-2 text-sm text-white/90 drop-shadow-[0_1px_3px_rgb(0_0_0/0.8)] transition-colors group-hover:text-white motion-reduce:transition-none"
          >
            記録を読む →
          </span>
        </div>
      </Link>
      <div className="sm:pb-(--space-md)">
        <p className="text-xs text-ink-muted">
          {getCategoryName(post.category)}
        </p>
        <h3 className="mt-2 text-2xl font-bold leading-snug text-ink">
          <Link href={href} className="hover:text-accent">
            {name}
          </Link>
        </h3>
        {catchCopy && (
          <p className="mt-2 text-base text-ink-muted">{catchCopy}</p>
        )}
        <Link
          href={href}
          className="mt-(--space-xs) inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline sm:mt-(--space-md)"
        >
          制作記録を読む <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
