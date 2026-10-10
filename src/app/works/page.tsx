import type { Metadata } from "next";
import PostList from "@/components/PostList";
import { getWorksByNewest } from "@/lib/home-feed";
import { POSTS_PER_PAGE } from "@/constants/config";

export const metadata: Metadata = {
  title: "制作記録の一覧",
  // 一覧は記事カードを並べただけで独自の内容がないため検索結果に出さない
  robots: { index: false, follow: true },
};

export default function WorksPage() {
  const works = getWorksByNewest();

  return (
    <PostList
      posts={works.slice(0, POSTS_PER_PAGE)}
      title="制作記録"
      currentPage={1}
      totalPages={Math.ceil(works.length / POSTS_PER_PAGE)}
      basePath="/works"
    />
  );
}
