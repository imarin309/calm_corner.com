import type { MetadataRoute } from "next";
import { posts } from "#site/content";
import { siteUrl } from "@/constants/meta";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries = posts
    .filter((post) => !post.noindex)
    .map((post) => ({
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: new Date(post.date),
    }));

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/about` },
    ...postEntries,
  ];
}
