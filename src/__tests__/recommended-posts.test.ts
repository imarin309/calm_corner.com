import { describe, expect, it } from "vitest";
import type { Post } from "@/lib/posts";
import { selectRecommendedPosts } from "@/lib/recommended-posts";

function makePost(slug: string, noindex = false): Post {
  return {
    slug,
    title: slug,
    date: "2026-01-01",
    category: "works",
    tags: [],
    showCoverImage: true,
    noindex,
    excerpt: "",
    headings: [],
  };
}

const posts = ["a", "b", "c", "d", "e", "f", "g", "h"].map((slug) =>
  makePost(slug),
);

const slugsOf = (selected: Post[]) => selected.map((post) => post.slug);

describe("selectRecommendedPosts", () => {
  it("同じ入力なら同じ記事を返す", () => {
    const first = selectRecommendedPosts(posts, { seed: "a" });
    const second = selectRecommendedPosts([...posts].reverse(), { seed: "a" });
    expect(slugsOf(first)).toEqual(slugsOf(second));
  });

  it("指定した件数だけ返す", () => {
    expect(selectRecommendedPosts(posts, { seed: "a" })).toHaveLength(3);
    expect(selectRecommendedPosts(posts, { seed: "a", count: 5 })).toHaveLength(
      5,
    );
  });

  it("今の記事を含めない", () => {
    for (const { slug } of posts) {
      const selected = selectRecommendedPosts(posts, {
        seed: slug,
        excludeSlug: slug,
      });
      expect(slugsOf(selected)).not.toContain(slug);
    }
  });

  it("noindex の記事を含めない", () => {
    const withHidden = [...posts, makePost("hidden", true)];
    const selected = selectRecommendedPosts(withHidden, {
      seed: "x",
      count: withHidden.length,
    });
    expect(slugsOf(selected)).not.toContain("hidden");
    expect(selected).toHaveLength(posts.length);
  });

  it("シードが変わると組み合わせも変わる", () => {
    const combinations = new Set(
      posts.map(({ slug }) =>
        slugsOf(selectRecommendedPosts(posts, { seed: slug })).join(","),
      ),
    );
    expect(combinations.size).toBeGreaterThan(1);
  });

  it("候補が件数より少なければ、あるだけ返す", () => {
    const selected = selectRecommendedPosts([makePost("a"), makePost("b")], {
      seed: "a",
      excludeSlug: "a",
    });
    expect(slugsOf(selected)).toEqual(["b"]);
  });
});
