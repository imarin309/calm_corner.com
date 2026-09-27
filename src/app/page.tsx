import Header from "@/components/Header";
import SectionHeading from "@/components/SectionHeading";
import FeaturedWork from "@/components/home/FeaturedWork";
import WorkCard from "@/components/home/WorkCard";
import WorkNoteItem from "@/components/home/WorkNoteItem";
import CategoryShelf from "@/components/home/CategoryShelf";
import { getAllPosts } from "@/lib/posts";
import { getAllCategories } from "@/constants/category";

/** 完成作品として棚に並べるカテゴリー。それ以外は制作ノートとして扱う */
const WORK_CATEGORIES = ["gunpla", "girls-plamo"];
const RECENT_WORKS_COUNT = 6;
const WORK_NOTES_COUNT = 4;

export default function Home() {
  const sortedPosts = getAllPosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const works = sortedPosts.filter((post) =>
    WORK_CATEGORIES.includes(post.category),
  );
  const notes = sortedPosts.filter(
    (post) => !WORK_CATEGORIES.includes(post.category),
  );
  const [featured, ...restWorks] = works;
  const recentWorks = restWorks.slice(0, RECENT_WORKS_COUNT);

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

      {recentWorks.length > 0 && (
        <section aria-labelledby="works-heading">
          <SectionHeading id="works-heading" label="Recent Works" />
          <div className="grid gap-x-(--space-md) gap-y-(--space-lg) sm:grid-cols-2 lg:grid-cols-3 lg:[&>*:nth-child(3n+2)]:mt-(--space-lg)">
            {recentWorks.map((post) => (
              <WorkCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {notes.length > 0 && (
        <section
          aria-labelledby="notes-heading"
          className="-mx-4 bg-surface px-4 py-(--space-lg) sm:mx-0 sm:rounded-sm sm:px-(--space-lg)"
        >
          <SectionHeading id="notes-heading" label="Work Notes" />
          <div className="grid divide-y divide-line sm:grid-cols-2 sm:gap-x-(--space-lg) sm:divide-y-0">
            {notes.slice(0, WORK_NOTES_COUNT).map((post) => (
              <WorkNoteItem key={post.slug} post={post} />
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
