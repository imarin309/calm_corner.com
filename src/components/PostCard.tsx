import Image from "next/image";
import Link from "next/link";
import { getCategoryName } from "@/constants/category";

interface PostCardProps {
  title: string;
  excerpt?: string;
  date: string;
  slug: string;
  coverImage?: string;
  category: string;
}

export default function PostCard({
  title,
  excerpt,
  date,
  slug,
  coverImage,
  category,
}: PostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group overflow-hidden border border-stone-200 bg-white transition-all hover:border-stone-300 hover:shadow-lg">
      <Link href={`/posts/${slug}`} className="sm:flex">
        <div className="relative aspect-[1200/675] overflow-hidden sm:w-72 sm:shrink-0">
          <Image
            src={coverImage ?? "/icon.png"}
            alt={title}
            fill
            sizes="(min-width: 640px) 288px, 100vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute left-0 top-3">
            <span className="bg-stone-800 px-3 py-1 text-xs font-medium text-white">
              {getCategoryName(category)}
            </span>
          </div>
        </div>
        <div className="p-4 sm:flex sm:flex-col sm:justify-center">
          <time className="text-xs text-stone-400">{formattedDate}</time>
          <h2 className="mt-2 text-lg font-semibold leading-snug text-stone-700 group-hover:text-stone-900">
            {title}
          </h2>
          {excerpt && (
            <p className="mt-2 line-clamp-2 text-sm text-stone-500">
              {excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
