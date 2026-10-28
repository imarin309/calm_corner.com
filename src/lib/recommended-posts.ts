import type { Post } from "./posts";

const NEWER_COUNT = 1;

// 日付順に隣り合う記事をつなぐと、どの記事も前後の記事からリンクされ、クローラーがすべてをたどれる。
// 端の記事では反対側から補い、件数をそろえる
export function selectAdjacentPosts(
  posts: Post[],
  currentSlug: string,
  count = 3,
): Post[] {
  const sorted = posts
    .filter((post) => !post.noindex || post.slug === currentSlug)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime() ||
        a.slug.localeCompare(b.slug),
    );
  const index = sorted.findIndex((post) => post.slug === currentSlug);
  if (index < 0) return [];

  const others = sorted.filter((post) => post.slug !== currentSlug);
  const start = Math.max(
    0,
    Math.min(index - NEWER_COUNT, others.length - count),
  );
  return others.slice(start, start + count);
}
