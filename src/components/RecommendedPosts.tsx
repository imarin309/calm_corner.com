import { getAllPosts } from "@/lib/posts";
import {
  DEFAULT_RECOMMEND_SEED,
  selectRecommendedPosts,
} from "@/lib/recommended-posts";
import PostCardCompact from "./PostCardCompact";
import SectionHeading from "./SectionHeading";

interface RecommendedPostsProps {
  currentSlug?: string;
}

export default function RecommendedPosts({
  currentSlug,
}: RecommendedPostsProps) {
  const selected = selectRecommendedPosts(getAllPosts(), {
    seed: currentSlug ?? DEFAULT_RECOMMEND_SEED,
    excludeSlug: currentSlug,
  });

  if (selected.length === 0) return null;

  return (
    <section className="py-(--space-lg)">
      <div className="mx-auto max-w-5xl px-4">
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
      </div>
    </section>
  );
}
