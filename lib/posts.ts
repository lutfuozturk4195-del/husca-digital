import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostStatus = "draft" | "published";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  /** Direct, answer-first summary rendered in a callout above the article body. */
  answer: string;
  /** Defaults to "published" when omitted, so every pre-existing post keeps working unchanged. */
  status?: PostStatus;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTimeMinutes: number;
};

export type Post = PostMeta & {
  html: string;
};

export type RawPost = PostFrontmatter & {
  slug: string;
  /** Raw markdown body (frontmatter stripped, HTML NOT rendered) — for the admin editor only. */
  content: string;
};

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Every slug on disk, drafts included — used for admin-side uniqueness checks. */
export function getAllSlugs(): string[] {
  return readSlugs();
}

export function getAllPosts(options: { includeDrafts?: boolean } = {}): PostMeta[] {
  const { includeDrafts = false } = options;
  return readSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
      const { data, content } = matter(raw);
      const fm = data as PostFrontmatter;
      return {
        ...fm,
        slug,
        readingTimeMinutes: readingTime(content),
      };
    })
    .filter((post) => includeDrafts || post.status !== "draft")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(
  slug: string,
  options: { includeDrafts?: boolean } = {}
): Promise<Post | null> {
  const { includeDrafts = false } = options;
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  if (!includeDrafts && fm.status === "draft") return null;

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  return {
    ...fm,
    slug,
    readingTimeMinutes: readingTime(content),
    html: String(processed),
  };
}

/**
 * Un-rendered post for the admin editor: returns the raw markdown source
 * instead of HTML, and always includes drafts (an admin editing a draft
 * needs to load it regardless of publish status).
 */
export function getRawPostBySlug(slug: string): RawPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { ...(data as PostFrontmatter), slug, content: content.trim() };
}
