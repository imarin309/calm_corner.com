import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getCategoryBySlug, getCategoryName } from "@/constants/category";
import TagBadge from "@/components/TagBadge";
import ArticleToc from "@/components/ArticleToc";
import RecommendedPosts from "@/components/RecommendedPosts";
import AuthorProfile from "@/components/AuthorProfile";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import {
  siteName,
  siteUrl,
  siteAuthor,
  siteAuthorProfilePath,
} from "@/constants/meta";
import type { Metadata } from "next";

const categoryBadgeClassName = "bg-stone-800 px-3 py-1 text-xs text-white";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    robots: post.noindex ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: `/posts/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      ...(post.coverImage && {
        images: [{ url: post.coverImage }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      ...(post.coverImage && {
        images: [post.coverImage],
      }),
    },
  };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { default: MDXContent } = await import(
    `../../../../content/posts/${slug}.mdx`
  );

  const formattedDate = new Date(post.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    url: `${siteUrl}/posts/${post.slug}`,
    ...(post.coverImage && { image: post.coverImage }),
    author: {
      "@type": "Person",
      name: siteAuthor,
      url: `${siteUrl}${siteAuthorProfilePath}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article className="mx-auto max-w-3xl">
        <Breadcrumb category={post.category} title={post.title} />
        <header className="mb-8 border-b border-stone-200 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {getCategoryBySlug(post.category) ? (
              <Link
                href={`/category/${post.category}`}
                className={`${categoryBadgeClassName} transition-colors hover:bg-stone-600`}
              >
                {getCategoryName(post.category)}
              </Link>
            ) : (
              <span className={categoryBadgeClassName}>
                {getCategoryName(post.category)}
              </span>
            )}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            )}
            <time dateTime={post.date} className="text-xs text-stone-400">
              {formattedDate}
            </time>
          </div>
        </header>

        {post.showCoverImage && post.coverImage && (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-sm bg-line">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              style={{
                objectPosition: `center ${post.coverImagePositionY ?? 50}%`,
              }}
            />
          </div>
        )}

        <ArticleToc headings={post.headings} />

        <div className="prose prose-base sm:prose-lg prose-stone max-w-none prose-headings:font-semibold sm:prose-h2:text-[1.5rem] sm:prose-h3:text-[1.25rem] prose-a:text-stone-600 prose-a:underline-offset-2 hover:prose-a:text-stone-900">
          <MDXContent />
        </div>

        <AuthorProfile />
      </article>
      <RecommendedPosts currentSlug={post.slug} />
    </>
  );
}
