import { getAllPosts, type Post } from "@/lib/posts";

/** Featured Work には完成作品だけを選ぶ */
const WORK_CATEGORIES = ["gunpla", "girls-plamo"];
/** トップのグリッドが3列なので、段が欠けない件数にする */
const HOME_POSTS_PER_PAGE = 9;

/**
 * Featured はトップ1ページ目にしか出さないため、一覧からは外して
 * 全記事がどこかのページにちょうど1回ずつ載るようにしている
 */
export function getHomeFeed(pageNum: number): {
  featured?: Post;
  posts: Post[];
  totalPages: number;
} {
  const sortedPosts = getAllPosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const featured = sortedPosts.find((post) =>
    WORK_CATEGORIES.includes(post.category),
  );
  const feedPosts = sortedPosts.filter((post) => post !== featured);
  const start = (pageNum - 1) * HOME_POSTS_PER_PAGE;

  return {
    featured,
    posts: feedPosts.slice(start, start + HOME_POSTS_PER_PAGE),
    totalPages: Math.max(1, Math.ceil(feedPosts.length / HOME_POSTS_PER_PAGE)),
  };
}
