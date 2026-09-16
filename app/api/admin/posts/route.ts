import { NextResponse } from "next/server";
import { BLOG_CATEGORIES, getAllPosts, getAllSlugs } from "@/lib/posts";
import { savePost, type AdminPostInput } from "@/lib/admin/posts-store";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CATEGORY_IDS = BLOG_CATEGORIES.map((category) => category.id);

export async function GET() {
  const posts = getAllPosts({ includeDrafts: true });
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  let body: Partial<AdminPostInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { slug, title, description, date, author, answer, content } = body;
  const tags = Array.isArray(body.tags) ? body.tags : [];

  if (!slug || !title || !description || !date || !author || !answer || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!SLUG_PATTERN.test(slug)) {
    return NextResponse.json(
      { error: "Slug must be lowercase letters, numbers, and hyphens only" },
      { status: 400 }
    );
  }
  if (getAllSlugs().includes(slug)) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }
  if (body.category && !CATEGORY_IDS.includes(body.category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  try {
    await savePost(
      {
        slug,
        title,
        description,
        date,
        author,
        tags,
        answer,
        status: body.status === "draft" ? "draft" : "published",
        category: body.category ?? CATEGORY_IDS[0],
        content,
      },
      true
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Save failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, slug });
}
