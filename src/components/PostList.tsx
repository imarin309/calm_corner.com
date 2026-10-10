import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import SectionHeading from "@/components/SectionHeading";

interface Post {
  title: string;
  description?: string;
  excerpt?: string;
  date: string;
  slug: string;
  coverImage?: string;
  coverImagePositionY?: number;
  category: string;
  tags?: string[];
}

interface PostListProps {
  posts: Post[];
  title?: string;
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function PostList({
  posts,
  title,
  currentPage,
  totalPages,
  basePath,
}: PostListProps) {
  return (
    <div className="mx-auto max-w-3xl">
      {title && <SectionHeading title={title} />}
      <section>
        {posts.length > 0 ? (
          <div className="divide-y divide-line border-t border-line">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                title={post.title}
                excerpt={post.description ?? post.excerpt}
                date={post.date}
                slug={post.slug}
                coverImage={post.coverImage}
                coverImagePositionY={post.coverImagePositionY}
                category={post.category}
                tags={post.tags}
              />
            ))}
          </div>
        ) : (
          <p className="text-ink-muted">記事がありません。</p>
        )}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={basePath}
      />
    </div>
  );
}
