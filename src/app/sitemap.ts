import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { siteUrl } from "@/constants/meta";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getAllPosts().filter((post) => !post.noindex);

  const postEntries = allPosts.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const latestPost = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .at(0);

  return [
    {
      url: siteUrl,
      ...(latestPost && { lastModified: new Date(latestPost.date) }),
    },
    { url: `${siteUrl}/about` },
    { url: `${siteUrl}/contact` },
    { url: `${siteUrl}/privacy-policy` },
    ...postEntries,
  ];
}
