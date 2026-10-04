import { redirect } from "next/navigation";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import RecentGrid from "@/components/home/RecentGrid";
import { getHomeFeed } from "@/lib/home-feed";

const { totalPages } = getHomeFeed(1);

export function generateStaticParams() {
  // output: "export" は空の配列だとビルドに失敗するため、1ページしかなくても /page/2 を作ってリダイレクトさせる
  if (totalPages <= 1) {
    return [{ num: "2" }];
  }
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    num: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ num: string }>;
}): Promise<Metadata> {
  const { num } = await params;
  return {
    title: `記事一覧 ページ${num}`,
    // 一覧は記事カードを並べただけで独自の内容がないため検索結果に出さない
    robots: { index: false, follow: true },
  };
}

export default async function PaginatedPage({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;
  const pageNum = Number(num);

  if (!Number.isInteger(pageNum) || pageNum <= 1 || pageNum > totalPages) {
    redirect("/");
  }

  const { posts } = getHomeFeed(pageNum);

  return (
    <section aria-labelledby="page-heading">
      <SectionHeading id="page-heading" label={`Page ${pageNum}`} />
      <RecentGrid posts={posts} currentPage={pageNum} totalPages={totalPages} />
    </section>
  );
}
