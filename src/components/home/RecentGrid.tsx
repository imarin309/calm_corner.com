import Pagination from "@/components/Pagination";
import WorkCard from "@/components/home/WorkCard";
import type { Post } from "@/lib/posts";

interface RecentGridProps {
  posts: Post[];
  currentPage: number;
  totalPages: number;
}

export default function RecentGrid({
  posts,
  currentPage,
  totalPages,
}: RecentGridProps) {
  return (
    <div>
      <div className="grid gap-x-(--space-md) gap-y-(--space-lg) sm:grid-cols-2 lg:grid-cols-3 lg:[&>*:nth-child(3n+2)]:mt-(--space-lg)">
        {posts.map((post) => (
          <WorkCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
