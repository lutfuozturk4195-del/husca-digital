import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { deleteFile, putFile } from "@/lib/admin/github";
import type { BlogCategoryId, PostStatus } from "@/lib/posts";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type AdminPostInput = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  answer: string;
  status: PostStatus;
  category: BlogCategoryId;
  /** Raw markdown body (no frontmatter). */
  content: string;
};

/**
 * Vercel sets VERCEL=1 on every deployment (production and preview). Locally
 * (`next dev` / `next build` on this machine) it's unset, so this cleanly
 * picks the write strategy: direct filesystem writes in dev (instant),
 * GitHub commits in production (the only way to persist anything, since
 * Vercel's deployed filesystem is read-only — a commit triggers the
 * auto-deploy we already have wired, live in roughly 30-60s).
 */
function isProduction(): boolean {
  return Boolean(process.env.VERCEL);
}

function serialize(input: AdminPostInput): string {
  const { content, slug: _slug, ...frontmatter } = input;
  return matter.stringify(content, frontmatter);
}

export async function savePost(input: AdminPostInput, isNew: boolean): Promise<void> {
  const raw = serialize(input);
  const repoRelativePath = `content/blog/${input.slug}.md`;

  if (isProduction()) {
    await putFile(repoRelativePath, raw, `${isNew ? "Add" : "Update"} blog post: ${input.slug}`);
    return;
  }

  fs.mkdirSync(BLOG_DIR, { recursive: true });
  fs.writeFileSync(path.join(BLOG_DIR, `${input.slug}.md`), raw, "utf8");
}

export async function removePost(slug: string): Promise<void> {
  const repoRelativePath = `content/blog/${slug}.md`;

  if (isProduction()) {
    await deleteFile(repoRelativePath, `Delete blog post: ${slug}`);
    return;
  }

  const target = path.join(BLOG_DIR, `${slug}.md`);
  if (fs.existsSync(target)) fs.unlinkSync(target);
}
