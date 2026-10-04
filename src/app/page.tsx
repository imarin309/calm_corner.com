import Header from "@/components/Header";
import SectionHeading from "@/components/SectionHeading";
import FeaturedWork from "@/components/home/FeaturedWork";
import RecentGrid from "@/components/home/RecentGrid";
import CategoryShelf from "@/components/home/CategoryShelf";
import { getAllPosts } from "@/lib/posts";
import { getHomeFeed } from "@/lib/home-feed";
import { getAllCategories } from "@/constants/category";

export default function Home() {
  const { featured, posts, totalPages } = getHomeFeed(1);

  const allPosts = getAllPosts();
  const categories = getAllCategories()
    .map((category) => ({
      ...category,
      count: allPosts.filter((post) => post.category === category.slug).length,
    }))
    .filter(({ count }) => count > 0);

  return (
    <div className="flex flex-col gap-(--space-xl)">
      {/* モバイルでは Featured Work の「制作記録を読む」まで1画面に収めたいため、ここだけ詰める */}
      <div className="flex flex-col gap-(--space-md) sm:gap-(--space-xl)">
        <div className="pt-2">
          <Header />
        </div>

        {featured && (
          <section aria-labelledby="featured-heading">
            <SectionHeading id="featured-heading" label="Featured Work" />
            <FeaturedWork post={featured} />
          </section>
        )}
      </div>

      {posts.length > 0 && (
        <section aria-label="最近の記録">
          <RecentGrid posts={posts} currentPage={1} totalPages={totalPages} />
        </section>
      )}

      <section aria-labelledby="categories-heading">
        <SectionHeading
          id="categories-heading"
          label="Categories"
          title="カテゴリーから探す"
        />
        <CategoryShelf categories={categories} />
      </section>
    </div>
  );
}
