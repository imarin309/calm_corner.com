import Header from "@/components/Header";
import SectionHeading from "@/components/SectionHeading";
import FeaturedWork from "@/components/home/FeaturedWork";
import WorkCard from "@/components/home/WorkCard";
import CategoryShelf from "@/components/home/CategoryShelf";
import { getAllPosts } from "@/lib/posts";
import { getAllCategories } from "@/constants/category";

/** Featured Work には完成作品だけを選ぶ */
const WORK_CATEGORIES = ["gunpla", "girls-plamo"];
const RECENT_POSTS_COUNT = 9;

export default function Home() {
  const sortedPosts = getAllPosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const featured = sortedPosts.find((post) =>
    WORK_CATEGORIES.includes(post.category),
  );
  const recentPosts = sortedPosts
    .filter((post) => post !== featured)
    .slice(0, RECENT_POSTS_COUNT);

  const categories = getAllCategories()
    .map((category) => ({
      ...category,
      count: sortedPosts.filter((post) => post.category === category.slug)
        .length,
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

      {recentPosts.length > 0 && (
        <section aria-label="最近の記録">
          <div className="grid gap-x-(--space-md) gap-y-(--space-lg) sm:grid-cols-2 lg:grid-cols-3 lg:[&>*:nth-child(3n+2)]:mt-(--space-lg)">
            {recentPosts.map((post) => (
              <WorkCard key={post.slug} post={post} />
            ))}
          </div>
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
