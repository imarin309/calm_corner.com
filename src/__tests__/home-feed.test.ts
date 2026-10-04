import { beforeEach, describe, expect, it, vi } from "vitest";
import { getHomeFeed } from "@/lib/home-feed";
import { getAllPosts, type Post } from "@/lib/posts";

vi.mock("@/lib/posts", () => ({
  getAllPosts: vi.fn(),
}));

const mockGetAllPosts = vi.mocked(getAllPosts);

function makePost(slug: string, date: string, category = "gunpla"): Post {
  return {
    slug,
    title: slug,
    date,
    category,
    tags: [],
    noindex: false,
    excerpt: "",
  };
}

/** 新しい順に並んだ slug の列から、1日ずつ古くなる記事を作る */
function makePosts(specs: { slug: string; category?: string }[]): Post[] {
  return specs.map(({ slug, category }, i) =>
    makePost(slug, `2026-01-${String(31 - i).padStart(2, "0")}`, category),
  );
}

function collectAllPages(): { slugs: string[]; totalPages: number } {
  const { totalPages } = getHomeFeed(1);
  const slugs = Array.from({ length: totalPages }, (_, i) =>
    getHomeFeed(i + 1).posts.map((post) => post.slug),
  ).flat();
  return { slugs, totalPages };
}

beforeEach(() => {
  vi.resetAllMocks();
});

describe("getHomeFeed", () => {
  it("picks the newest work as featured even when newer notes exist, and excludes it from the feed", () => {
    mockGetAllPosts.mockReturnValue(
      makePosts([
        { slug: "note-1", category: "note" },
        { slug: "note-2", category: "note" },
        { slug: "work-1", category: "girls-plamo" },
        { slug: "work-2" },
      ]),
    );

    const { featured, posts, totalPages } = getHomeFeed(1);

    expect(featured?.slug).toBe("work-1");
    expect(posts.map((post) => post.slug)).toEqual([
      "note-1",
      "note-2",
      "work-2",
    ]);
    expect(totalPages).toBe(1);
  });

  it("sorts by date regardless of the order getAllPosts returns", () => {
    const [newest, middle, oldest] = makePosts([
      { slug: "newest" },
      { slug: "middle" },
      { slug: "oldest" },
    ]);
    mockGetAllPosts.mockReturnValue([oldest, newest, middle]);

    const { featured, posts } = getHomeFeed(1);

    expect(featured?.slug).toBe("newest");
    expect(posts.map((post) => post.slug)).toEqual(["middle", "oldest"]);
  });

  it("fits exactly 9 feed posts on a single page", () => {
    mockGetAllPosts.mockReturnValue(
      makePosts(Array.from({ length: 10 }, (_, i) => ({ slug: `post-${i}` }))),
    );

    const { posts, totalPages } = getHomeFeed(1);

    expect(totalPages).toBe(1);
    expect(posts).toHaveLength(9);
    expect(posts.map((post) => post.slug)).not.toContain("post-0");
  });

  it("moves the 10th feed post to page 2 without duplicates or gaps", () => {
    mockGetAllPosts.mockReturnValue(
      makePosts(Array.from({ length: 11 }, (_, i) => ({ slug: `post-${i}` }))),
    );

    expect(getHomeFeed(1).posts).toHaveLength(9);
    expect(getHomeFeed(2).posts.map((post) => post.slug)).toEqual(["post-10"]);

    const { slugs, totalPages } = collectAllPages();
    expect(totalPages).toBe(2);
    expect(slugs).toEqual(
      Array.from({ length: 10 }, (_, i) => `post-${i + 1}`),
    );
  });

  it("keeps every non-featured post exactly once when featured is not at the top", () => {
    const notes = Array.from({ length: 12 }, (_, i) => ({
      slug: `note-${i}`,
      category: "note",
    }));
    mockGetAllPosts.mockReturnValue(
      makePosts([
        ...notes.slice(0, 5),
        { slug: "work-featured" },
        ...notes.slice(5),
        { slug: "work-old" },
      ]),
    );

    const { slugs, totalPages } = collectAllPages();

    expect(getHomeFeed(1).featured?.slug).toBe("work-featured");
    expect(totalPages).toBe(2);
    expect(slugs).toEqual([...notes.map(({ slug }) => slug), "work-old"]);
  });

  it("puts every post in the feed when there is no work to feature", () => {
    mockGetAllPosts.mockReturnValue(
      makePosts([
        { slug: "note-1", category: "note" },
        { slug: "note-2", category: "note" },
      ]),
    );

    const { featured, posts } = getHomeFeed(1);

    expect(featured).toBeUndefined();
    expect(posts.map((post) => post.slug)).toEqual(["note-1", "note-2"]);
  });

  it("reports one page even when there are no posts", () => {
    mockGetAllPosts.mockReturnValue([]);

    expect(getHomeFeed(1)).toEqual({
      featured: undefined,
      posts: [],
      totalPages: 1,
    });
  });
});
