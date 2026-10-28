import { getAllPosts } from "@/lib/posts";
import { selectAdjacentPosts } from "@/lib/recommended-posts";
import PostCardCompact from "./PostCardCompact";
import SectionHeading from "./SectionHeading";

interface RecommendedPostsProps {
  currentSlug: string;
}

export default function RecommendedPosts({
  currentSlug,
}: RecommendedPostsProps) {
  const selected = selectAdjacentPosts(getAllPosts(), currentSlug);

  if (selected.length === 0) return null;

  return (
    <section className="py-(--space-lg)">
      <SectionHeading label="More Works" title="こちらもおすすめ" />
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
            tags={post.tags}
          />
        ))}
      </div>
    </section>
  );
}
