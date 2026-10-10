import { beforeEach, describe, expect, it, vi } from "vitest";
import { getHomeFeed, getWorksByNewest } from "@/lib/home-feed";
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

beforeEach(() => {
  vi.resetAllMocks();
});

describe("getHomeFeed", () => {
  it("picks the newest work as featured even when newer notes exist", () => {
    mockGetAllPosts.mockReturnValue(
      makePosts([
        { slug: "note-1", category: "note" },
        { slug: "work-1", category: "girls-plamo" },
        { slug: "work-2" },
      ]),
    );

    const { featured, works, howTos } = getHomeFeed();

    expect(featured?.slug).toBe("work-1");
    expect(works.map((post) => post.slug)).toEqual(["work-2"]);
    expect(howTos.map((post) => post.slug)).toEqual(["note-1"]);
  });

  it("sorts by date regardless of the order getAllPosts returns", () => {
    const [newest, middle, oldest] = makePosts([
      { slug: "newest" },
      { slug: "middle" },
      { slug: "oldest" },
    ]);
    mockGetAllPosts.mockReturnValue([oldest, newest, middle]);

    const { featured, works } = getHomeFeed();

    expect(featured?.slug).toBe("newest");
    expect(works.map((post) => post.slug)).toEqual(["middle", "oldest"]);
  });

  it("shows the 3 works after featured and the 3 newest notes", () => {
    mockGetAllPosts.mockReturnValue(
      makePosts([
        ...Array.from({ length: 5 }, (_, i) => ({ slug: `work-${i}` })),
        ...Array.from({ length: 5 }, (_, i) => ({
          slug: `note-${i}`,
          category: "note",
        })),
      ]),
    );

    const { works, howTos } = getHomeFeed();

    expect(works.map((post) => post.slug)).toEqual([
      "work-1",
      "work-2",
      "work-3",
    ]);
    expect(howTos.map((post) => post.slug)).toEqual([
      "note-0",
      "note-1",
      "note-2",
    ]);
  });

  it("returns nothing when there are no posts", () => {
    mockGetAllPosts.mockReturnValue([]);

    expect(getHomeFeed()).toEqual({
      featured: undefined,
      works: [],
      howTos: [],
    });
  });
});

describe("getWorksByNewest", () => {
  it("includes every work, featured included, and leaves notes out", () => {
    mockGetAllPosts.mockReturnValue(
      makePosts([
        { slug: "work-1" },
        { slug: "note-1", category: "note" },
        { slug: "work-2", category: "girls-plamo" },
      ]),
    );

    expect(getWorksByNewest().map((post) => post.slug)).toEqual([
      "work-1",
      "work-2",
    ]);
  });
});
