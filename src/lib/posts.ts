import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { toString } from "mdast-util-to-string";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { extractExcerpt } from "./extract-excerpt";
import { toSlug } from "./heading";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  description?: string;
  coverImage?: string;
  coverImagePositionY?: number;
  showCoverImage: boolean;
  noindex: boolean;
  excerpt: string;
  headings: PostHeading[];
};

export type PostHeading = {
  id: string;
  text: string;
};

export type Page = {
  slug: string;
  title: string;
  description?: string;
};

const postsDir = path.join(process.cwd(), "content/posts");
const pagesDir = path.join(process.cwd(), "content/pages");

// gray-matter は YAML の日付をDate型で返すことがあるため YYYY-MM-DD に正規化する
function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function parsePercent(value: unknown): number | undefined {
  return typeof value === "number" && value >= 0 && value <= 100
    ? value
    : undefined;
}

// 目次を静的HTMLに含めるため、描画後のDOMではなくMDXのソースから見出しを拾う。
// 見出しに **太字** や :marker[] があっても本文の Heading2 と同じ文字・id になるよう、
// 構文木からテキストだけを取り出して toSlug に渡す
const headingParser = unified()
  .use(remarkParse)
  .use(remarkMdx)
  .use(remarkGfm)
  .use(remarkDirective);

function extractHeadings(content: string): PostHeading[] {
  const headings: PostHeading[] = [];
  visit(headingParser.parse(content), "heading", (node) => {
    if (node.depth !== 2) return;
    const text = toString(node).trim();
    headings.push({ id: toSlug(text), text });
  });
  return headings;
}

function parsePost(filename: string): Post {
  const slug = filename.replace(/\.mdx$/, "");
  const filePath = path.join(postsDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  if (!data.title) throw new Error(`Missing title in posts/${filename}`);
  if (!data.date) throw new Error(`Missing date in posts/${filename}`);
  if (!data.category) throw new Error(`Missing category in posts/${filename}`);

  return {
    slug,
    title: String(data.title),
    date: normalizeDate(data.date),
    category: String(data.category),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    description: data.description ? String(data.description) : undefined,
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    coverImagePositionY: parsePercent(data.coverImagePositionY),
    showCoverImage: data.showCoverImage !== false,
    noindex: Boolean(data.noindex ?? false),
    excerpt: extractExcerpt(content),
    headings: extractHeadings(content),
  };
}

function parsePage(filename: string): Page {
  const slug = filename.replace(/\.mdx$/, "");
  const filePath = path.join(pagesDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);

  if (!data.title) throw new Error(`Missing title in pages/${filename}`);

  return {
    slug,
    title: String(data.title),
    description: data.description ? String(data.description) : undefined,
  };
}

export function getAllPosts(): Post[] {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parsePost(f));
}

const SAFE_SLUG = /^[a-zA-Z0-9_-]+$/;

export function getPostBySlug(slug: string): Post | undefined {
  if (!SAFE_SLUG.test(slug)) return undefined;
  try {
    return parsePost(`${slug}.mdx`);
  } catch {
    return undefined;
  }
}

export function getAllPages(): Page[] {
  return fs
    .readdirSync(pagesDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parsePage(f));
}

export function getPageBySlug(slug: string): Page | undefined {
  if (!SAFE_SLUG.test(slug)) return undefined;
  try {
    return parsePage(`${slug}.mdx`);
  } catch {
    return undefined;
  }
}
