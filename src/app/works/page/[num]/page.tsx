import { redirect } from "next/navigation";
import type { Metadata } from "next";
import PostList from "@/components/PostList";
import { getWorksByNewest } from "@/lib/home-feed";
import { POSTS_PER_PAGE } from "@/constants/config";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

const works = getWorksByNewest();
const totalPages = Math.ceil(works.length / POSTS_PER_PAGE);

export function generateStaticParams() {
  // output: "export" は空の配列だとビルドに失敗するため、1ページしかなくても /works/page/2 を作ってリダイレクトさせる
  if (totalPages <= 1) {
    return [{ num: "2" }];
  }
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    num: String(i + 2),
  }));
}

export default async function WorksPaginatedPage({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;
  const pageNum = Number(num);

  if (!Number.isInteger(pageNum) || pageNum <= 1 || pageNum > totalPages) {
    redirect("/works");
  }

  const start = (pageNum - 1) * POSTS_PER_PAGE;

  return (
    <PostList
      posts={works.slice(start, start + POSTS_PER_PAGE)}
      title={`制作記録 ページ ${pageNum}`}
      currentPage={pageNum}
      totalPages={totalPages}
      basePath="/works"
    />
  );
}
