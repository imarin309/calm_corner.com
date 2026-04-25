import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { extractExcerpt } from "./extract-excerpt";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  description?: string;
  coverImage?: string;
  noindex: boolean;
  excerpt: string;
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
    description: data.description ? String(data.description) : undefined,
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    noindex: Boolean(data.noindex ?? false),
    excerpt: extractExcerpt(content),
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

export function getPostBySlug(slug: string): Post | undefined {
  // ディレクトリトラバーサル防御
  const normalized = path.normalize(slug);
  if (normalized.includes("..") || normalized.includes("/")) return undefined;
  try {
    return parsePost(`${normalized}.mdx`);
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
  const normalized = path.normalize(slug);
  if (normalized.includes("..") || normalized.includes("/")) return undefined;
  try {
    return parsePage(`${normalized}.mdx`);
  } catch {
    return undefined;
  }
}
