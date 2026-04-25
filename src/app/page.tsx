import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";
import { POSTS_PER_PAGE } from "@/constants/config";

export default function Home() {
  const sortedPosts = getAllPosts().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const pagePosts = sortedPosts.slice(0, POSTS_PER_PAGE);

  return (
    <PostList
      posts={pagePosts}
      title="最新の記事"
      currentPage={1}
      totalPages={totalPages}
    />
  );
}
