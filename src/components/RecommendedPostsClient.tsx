"use client";

import { useMemo, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import PostCardCompact from "./PostCardCompact";
import SectionHeading from "./SectionHeading";

export type PostSummary = {
  title: string;
  slug: string;
  date: string;
  coverImage?: string;
  coverImagePositionY?: number;
  category: string;
};

export type PostSelector = (
  posts: PostSummary[],
  count: number,
) => PostSummary[];

const randomSelect: PostSelector = (posts, count) => {
  const shuffled = [...posts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

interface RecommendedPostsClientProps {
  posts: PostSummary[];
  count?: number;
  selectPosts?: PostSelector;
}

function Skeleton({ count }: { count: number }) {
  return (
    <div className="grid gap-(--space-md) sm:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/3] rounded-sm bg-line" />
          <div className="mt-3 h-4 w-3/4 rounded-sm bg-line" />
          <div className="mt-2 h-3 w-20 rounded-sm bg-line" />
        </div>
      ))}
    </div>
  );
}

const emptySubscribe = () => () => {};

export default function RecommendedPostsClient({
  posts,
  count = 3,
  selectPosts = randomSelect,
}: RecommendedPostsClientProps) {
  const pathname = usePathname();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const selected = useMemo(
    () => (mounted ? selectPosts(posts, count) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- pathname triggers re-shuffle on navigation
    [mounted, posts, count, selectPosts, pathname],
  );

  // トップページは作品棚そのものなので、おすすめを重ねて出さない
  if (pathname === "/") return null;

  return (
    <section className="py-(--space-lg)">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading label="More Works" title="こちらもおすすめ" />
        {!mounted ? (
          <Skeleton count={count} /> // SSR/静的HTMLではランダム選択ができないため、マウントまでの間にスケルトンを表示してハイドレーションミスマッチを防ぐ
        ) : selected.length > 0 ? (
          <div className="grid gap-(--space-lg) sm:grid-cols-3 sm:gap-(--space-md)">
            {selected.map((post) => (
              <PostCardCompact
                key={post.slug}
                title={post.title}
                date={post.date}
                slug={post.slug}
                coverImage={post.coverImage}
                coverImagePositionY={post.coverImagePositionY}
                category={post.category}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
