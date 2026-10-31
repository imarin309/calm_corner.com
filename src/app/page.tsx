import Header from "@/components/Header";
import SectionHeading from "@/components/SectionHeading";
import FeaturedWork from "@/components/home/FeaturedWork";
import HomePostSection from "@/components/home/HomePostSection";
import TagShelf from "@/components/home/TagShelf";
import SiteConcept from "@/components/home/SiteConcept";
import { getAllPosts } from "@/lib/posts";
import { getHomeFeed } from "@/lib/home-feed";
import { fetchImageSize } from "@/lib/image-size";
import { getAllTags } from "@/constants/tag";

export default async function Home() {
  const { featured, works, howTos } = getHomeFeed();
  const featuredImageSize = featured?.coverImage
    ? await fetchImageSize(featured.coverImage)
    : undefined;

  const allPosts = getAllPosts();
  const tags = getAllTags()
    .map((tag) => ({
      ...tag,
      count: allPosts.filter((post) => post.tags.includes(tag.slug)).length,
    }))
    .filter(({ count }) => count > 0);

  return (
    <div className="flex flex-col gap-(--space-xl)">
      {/* モバイルでは Featured Work の「制作記録を読む」まで1画面に収めたいため、ここだけ詰める */}
      <div className="flex flex-col gap-(--space-md) sm:gap-(--space-xl)">
        <div className="pt-2">
          <Header />
        </div>

        {featured && (
          <section aria-labelledby="featured-heading">
            <SectionHeading id="featured-heading" label="Featured Work" />
            <FeaturedWork post={featured} imageSize={featuredImageSize} />
          </section>
        )}
      </div>

      {howTos.length > 0 && (
        <HomePostSection
          id="notes-heading"
          label="Note"
          title="制作ノート"
          posts={howTos}
          moreHref="/category/note"
        />
      )}

      {works.length > 0 && (
        <HomePostSection
          id="works-heading"
          label="Works"
          title="制作記録"
          posts={works}
          moreHref="/works"
        />
      )}

      <SiteConcept />

      <section aria-labelledby="tags-heading">
        <SectionHeading id="tags-heading" label="Tags" title="タグから探す" />
        <TagShelf tags={tags} />
      </section>
    </div>
  );
}
