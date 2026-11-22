import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import WorkCard from "@/components/home/WorkCard";
import type { Post } from "@/lib/posts";

interface HomePostSectionProps {
  id: string;
  label: string;
  title: string;
  posts: Post[];
  moreHref: string;
}

export default function HomePostSection({
  id,
  label,
  title,
  posts,
  moreHref,
}: HomePostSectionProps) {
  return (
    <section aria-labelledby={id}>
      <SectionHeading id={id} label={label} title={title} />
      {/* モバイルは次のカードが少し覗くようにして、横にスライドできることを伝える */}
      <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-(--space-md) overflow-x-auto px-4 pb-2 [&>*]:w-4/5 [&>*]:shrink-0 [&>*]:snap-start sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 sm:[&>*]:w-auto">
        {posts.map((post) => (
          <WorkCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-(--space-md) text-center">
        <Link
          href={moreHref}
          className="inline-flex min-h-11 items-center py-2 text-ink underline decoration-line decoration-2 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent"
        >
          {title}をもっと見る
        </Link>
      </div>
    </section>
  );
}
