import fs from "fs";
import path from "path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getAllPages,
  getAllPosts,
  getPageBySlug,
  getPostBySlug,
} from "@/lib/posts";

vi.mock("fs", () => ({
  default: {
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
  },
}));

const mockFs = vi.mocked(fs, true);

const postsDir = path.join(process.cwd(), "content/posts");
const pagesDir = path.join(process.cwd(), "content/pages");

beforeEach(() => {
  vi.resetAllMocks();
});

describe("getAllPosts", () => {
  it("parses frontmatter and derives the slug from the filename", () => {
    mockFs.readdirSync.mockReturnValue(["hello-world.mdx"] as never);
    mockFs.readFileSync.mockReturnValue(
      "---\ntitle: Hello\ndate: 2024-01-01\ncategory: gunpla\n---\n本文です。",
    );

    expect(getAllPosts()).toEqual([
      {
        slug: "hello-world",
        title: "Hello",
        date: "2024-01-01",
        category: "gunpla",
        tags: [],
        description: undefined,
        coverImage: undefined,
        noindex: false,
        excerpt: "本文です。",
      },
    ]);
  });

  it("normalizes a YAML Date value to YYYY-MM-DD", () => {
    mockFs.readdirSync.mockReturnValue(["hello-world.mdx"] as never);
    mockFs.readFileSync.mockReturnValue(
      "---\ntitle: Hello\ndate: 2024-01-01\ncategory: gunpla\n---\n本文",
    );

    expect(getAllPosts()[0].date).toBe("2024-01-01");
  });

  it("parses tags, description, coverImage and noindex", () => {
    mockFs.readdirSync.mockReturnValue(["hello-world.mdx"] as never);
    mockFs.readFileSync.mockReturnValue(
      "---\ntitle: Hello\ndate: 2024-01-01\ncategory: gunpla\ntags: [塗装, 素組み]\ndescription: desc\ncoverImage: https://r2.calm-corner.com/x.jpg\nnoindex: true\n---\n本文",
    );

    const post = getAllPosts()[0];
    expect(post.tags).toEqual(["塗装", "素組み"]);
    expect(post.description).toBe("desc");
    expect(post.coverImage).toBe("https://r2.calm-corner.com/x.jpg");
    expect(post.noindex).toBe(true);
  });

  it("throws when title is missing", () => {
    mockFs.readdirSync.mockReturnValue(["broken.mdx"] as never);
    mockFs.readFileSync.mockReturnValue(
      "---\ndate: 2024-01-01\ncategory: gunpla\n---\n本文",
    );

    expect(() => getAllPosts()).toThrow(/title/);
  });

  it("throws when date is missing", () => {
    mockFs.readdirSync.mockReturnValue(["broken.mdx"] as never);
    mockFs.readFileSync.mockReturnValue(
      "---\ntitle: Hello\ncategory: gunpla\n---\n本文",
    );

    expect(() => getAllPosts()).toThrow(/date/);
  });

  it("throws when category is missing", () => {
    mockFs.readdirSync.mockReturnValue(["broken.mdx"] as never);
    mockFs.readFileSync.mockReturnValue(
      "---\ntitle: Hello\ndate: 2024-01-01\n---\n本文",
    );

    expect(() => getAllPosts()).toThrow(/category/);
  });

  it("ignores non-.mdx files", () => {
    mockFs.readdirSync.mockReturnValue(["notes.txt", "hello.mdx"] as never);
    mockFs.readFileSync.mockReturnValue(
      "---\ntitle: Hello\ndate: 2024-01-01\ncategory: gunpla\n---\n本文",
    );

    expect(getAllPosts()).toHaveLength(1);
  });

  describe("excerpt", () => {
    function excerptFor(body: string): string {
      mockFs.readdirSync.mockReturnValue(["hello-world.mdx"] as never);
      mockFs.readFileSync.mockReturnValue(
        `---\ntitle: Hello\ndate: 2024-01-01\ncategory: gunpla\n---\n${body}`,
      );
      return getAllPosts()[0].excerpt;
    }

    it("strips the heading marker but keeps the heading text", () => {
      expect(excerptFor("## 見出し\n本文です。")).toBe("見出し\n本文です。");
    });

    it("strips list markers but keeps the item text", () => {
      expect(excerptFor("- 1章 ゲート処理\n- 2章 サーフェイサー塗布")).toBe(
        "1章 ゲート処理\n2章 サーフェイサー塗布",
      );
    });

    it("removes a bare URL line that would become a LinkCard", () => {
      expect(
        excerptFor(
          "本文の前半です。\n\nhttps://example.com/article\n\n本文の後半です。",
        ),
      ).toBe("本文の前半です。\n本文の後半です。");
    });

    it("keeps link text but drops the URL", () => {
      expect(
        excerptFor("[プラモ製作ガイド](https://example.com/guide)を読んだ"),
      ).toBe("プラモ製作ガイドを読んだ");
    });

    it("keeps inline code content but drops the backticks", () => {
      expect(excerptFor("`エアブラシ` を使う")).toBe("エアブラシ を使う");
    });

    it("strips bold/italic/strikethrough markers but keeps the text", () => {
      expect(excerptFor("**重要**な話と*補足*と~~削除線~~")).toBe(
        "重要な話と補足と削除線",
      );
    });

    it("strips blockquote markers", () => {
      expect(excerptFor("> 引用文です")).toBe("引用文です");
    });

    it("strips JSX/MDXコンポーネントタグ", () => {
      expect(excerptFor("<ImageGallery images={[]} />本文")).toBe("本文");
    });

    it("unwraps a text-size/color directive, including nested ones", () => {
      expect(excerptFor("本文の前半です:large[大きな文字]の後半です")).toBe(
        "本文の前半です大きな文字の後半です",
      );
    });

    it("collapses 2+ consecutive newlines into a single newline", () => {
      expect(excerptFor("1行目\n\n\n2行目")).toBe("1行目\n2行目");
    });

    it("truncates to maxLength (120 characters)", () => {
      const long = "あ".repeat(200);
      expect(excerptFor(long)).toHaveLength(120);
    });
  });
});

describe("getPostBySlug", () => {
  it("returns the post when the file exists", () => {
    mockFs.readFileSync.mockReturnValue(
      "---\ntitle: Hello\ndate: 2024-01-01\ncategory: gunpla\n---\n本文",
    );

    expect(getPostBySlug("hello-world")?.title).toBe("Hello");
    expect(mockFs.readFileSync).toHaveBeenCalledWith(
      path.join(postsDir, "hello-world.mdx"),
      "utf-8",
    );
  });

  it("returns undefined when the file does not exist", () => {
    mockFs.readFileSync.mockImplementation(() => {
      throw new Error("ENOENT");
    });

    expect(getPostBySlug("missing")).toBeUndefined();
  });

  it("returns undefined for a directory-traversal slug without touching the filesystem", () => {
    expect(getPostBySlug("../../etc/passwd")).toBeUndefined();
    expect(mockFs.readFileSync).not.toHaveBeenCalled();
  });
});

describe("getAllPages", () => {
  it("parses a page without requiring date or category", () => {
    mockFs.readdirSync.mockReturnValue(["about.mdx"] as never);
    mockFs.readFileSync.mockReturnValue(
      "---\ntitle: About\ndescription: test page\n---\n本文",
    );

    expect(getAllPages()).toEqual([
      { slug: "about", title: "About", description: "test page" },
    ]);
  });

  it("throws when title is missing", () => {
    mockFs.readdirSync.mockReturnValue(["about.mdx"] as never);
    mockFs.readFileSync.mockReturnValue(
      "---\ndescription: test page\n---\n本文",
    );

    expect(() => getAllPages()).toThrow(/title/);
  });
});

describe("getPageBySlug", () => {
  it("returns undefined for a directory-traversal slug without touching the filesystem", () => {
    expect(getPageBySlug("../../etc/passwd")).toBeUndefined();
    expect(mockFs.readFileSync).not.toHaveBeenCalled();
  });

  it("returns undefined when the file does not exist", () => {
    mockFs.readFileSync.mockImplementation(() => {
      throw new Error("ENOENT");
    });

    expect(getPageBySlug("missing")).toBeUndefined();
  });

  it("returns the page when the file exists", () => {
    mockFs.readFileSync.mockReturnValue("---\ntitle: About\n---\n本文");

    expect(getPageBySlug("about")?.title).toBe("About");
    expect(mockFs.readFileSync).toHaveBeenCalledWith(
      path.join(pagesDir, "about.mdx"),
      "utf-8",
    );
  });
});
