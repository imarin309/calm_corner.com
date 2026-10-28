import type { Post } from "./posts";

// 記事ページ以外では今のURLを受け取れないため、共通のシードで同じ組み合わせを出す
export const DEFAULT_RECOMMEND_SEED = "calm-corner";

function fnv1a(text: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

// 静的HTMLに出すためビルドのたびに同じ結果になるよう、乱数ではなくハッシュで並べる。
// 候補ごとに独立したスコアなので、記事を追加しても既存記事のおすすめが総入れ替えにならない
export function selectRecommendedPosts(
  posts: Post[],
  {
    seed,
    excludeSlug,
    count = 3,
  }: {
    seed: string;
    excludeSlug?: string;
    count?: number;
  },
): Post[] {
  return posts
    .filter((post) => !post.noindex && post.slug !== excludeSlug)
    .map((post) => ({ post, score: fnv1a(`${seed}:${post.slug}`) }))
    .sort((a, b) => a.score - b.score || a.post.slug.localeCompare(b.post.slug))
    .slice(0, count)
    .map(({ post }) => post);
}
