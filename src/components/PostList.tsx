import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

interface Post {
  title: string;
  description?: string;
  excerpt?: string;
  date: string;
  slug: string;
  coverImage?: string;
  category: string;
}

interface PostListProps {
  posts: Post[];
  title?: string;
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function PostList({
  posts,
  title,
  currentPage,
  totalPages,
  basePath,
}: PostListProps) {
  return (
    <div>
      {title && (
        <div className="mb-6">
          <h2 className="inline text-lg font-semibold text-stone-700 bg-gradient-to-r from-primary to-secondary bg-[length:100%_2px] bg-no-repeat bg-bottom pb-1">
            {title}
          </h2>
        </div>
      )}
      <section>
        {posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt ?? post.description}
                date={post.date}
                slug={post.slug}
                coverImage={post.coverImage}
                category={post.category}
              />
            ))}
          </div>
        ) : (
          <p className="text-stone-400">記事がありません。</p>
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
