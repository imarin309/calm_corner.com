import RecommendedPosts from "@/components/RecommendedPosts";
import { getAllPosts } from "@/lib/posts";

interface RecommendedOnPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default async function RecommendedOnPost({
  params,
}: RecommendedOnPostProps) {
  const { slug } = await params;
  return <RecommendedPosts currentSlug={slug} />;
}
