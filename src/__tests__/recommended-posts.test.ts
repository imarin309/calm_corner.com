import { describe, expect, it } from "vitest";
import type { Post } from "@/lib/posts";
import { selectAdjacentPosts } from "@/lib/recommended-posts";

function makePost(slug: string, date: string, noindex = false): Post {
  return {
    slug,
    title: slug,
    date,
    category: "works",
    tags: [],
    showCoverImage: true,
    noindex,
    excerpt: "",
    headings: [],
  };
}

/** a が最も新しく、1日ずつ古くなる */
const posts = ["a", "b", "c", "d", "e", "f"].map((slug, i) =>
  makePost(slug, `2026-01-${String(30 - i).padStart(2, "0")}`),
);

const slugsOf = (selected: Post[]) => selected.map((post) => post.slug);

describe("selectAdjacentPosts", () => {
  it("1つ新しい記事と2つ古い記事を返す", () => {
    expect(slugsOf(selectAdjacentPosts(posts, "c"))).toEqual(["b", "d", "e"]);
  });

  it("並び順に左右されない", () => {
    expect(slugsOf(selectAdjacentPosts([...posts].reverse(), "c"))).toEqual([
      "b",
      "d",
      "e",
    ]);
  });

  it("最新の記事では古い記事で補う", () => {
    expect(slugsOf(selectAdjacentPosts(posts, "a"))).toEqual(["b", "c", "d"]);
  });

  it("古い側が足りなければ新しい記事で補う", () => {
    expect(slugsOf(selectAdjacentPosts(posts, "e"))).toEqual(["c", "d", "f"]);
    expect(slugsOf(selectAdjacentPosts(posts, "f"))).toEqual(["c", "d", "e"]);
  });

  it("noindex の記事を含めない", () => {
    const withHidden = [...posts, makePost("hidden", "2026-01-28", true)];
    expect(slugsOf(selectAdjacentPosts(withHidden, "c"))).toEqual([
      "b",
      "d",
      "e",
    ]);
  });

  it("noindex の記事にも前後の記事を出す", () => {
    const withHidden = [...posts, makePost("hidden", "2026-01-28", true)];
    expect(slugsOf(selectAdjacentPosts(withHidden, "hidden"))).toEqual([
      "c",
      "d",
      "e",
    ]);
  });

  it("候補が件数より少なければ、あるだけ返す", () => {
    expect(slugsOf(selectAdjacentPosts(posts.slice(0, 2), "a"))).toEqual(["b"]);
  });

  it("存在しない記事には何も返さない", () => {
    expect(selectAdjacentPosts(posts, "missing")).toEqual([]);
  });
});
