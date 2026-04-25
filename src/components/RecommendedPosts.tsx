import { getAllPosts } from "@/lib/posts";
import RecommendedPostsClient, {
  type PostSummary,
} from "./RecommendedPostsClient";

export default function RecommendedPosts() {
  const candidates: PostSummary[] = getAllPosts()
    .filter((post) => !post.noindex)
    .map(({ title, slug, date, coverImage, category }) => ({
      title,
      slug,
      date,
      coverImage,
      category,
    }));

  return <RecommendedPostsClient posts={candidates} />;
}
