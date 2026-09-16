import { NextResponse } from "next/server";
import { BLOG_CATEGORIES, getAllSlugs, getRawPostBySlug } from "@/lib/posts";
import { removePost, savePost, type AdminPostInput } from "@/lib/admin/posts-store";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CATEGORY_IDS = BLOG_CATEGORIES.map((category) => category.id);

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const post = getRawPostBySlug(params.slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  const originalSlug = params.slug;

  let body: Partial<AdminPostInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { title, description, date, author, answer, content } = body;
  const tags = Array.isArray(body.tags) ? body.tags : [];
  const newSlug = body.slug && body.slug !== originalSlug ? body.slug : originalSlug;

  if (!title || !description || !date || !author || !answer || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!getAllSlugs().includes(originalSlug)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  if (newSlug !== originalSlug) {
    if (!SLUG_PATTERN.test(newSlug)) {
      return NextResponse.json(
        { error: "Slug must be lowercase letters, numbers, and hyphens only" },
        { status: 400 }
      );
    }
    if (getAllSlugs().includes(newSlug)) {
      return NextResponse.json({ error: "A post with the new slug already exists" }, { status: 409 });
    }
  }
  if (body.category && !CATEGORY_IDS.includes(body.category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  try {
    await savePost(
      {
        slug: newSlug,
        title,
        description,
        date,
        updated: new Date().toISOString().slice(0, 10),
        author,
        tags,
        answer,
        status: body.status === "draft" ? "draft" : "published",
        category: body.category ?? CATEGORY_IDS[0],
        content,
      },
      false
    );
    if (newSlug !== originalSlug) {
      await removePost(originalSlug);
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Save failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, slug: newSlug });
}

export async function DELETE(_request: Request, { params }: { params: { slug: string } }) {
  if (!getAllSlugs().includes(params.slug)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  try {
    await removePost(params.slug);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Delete failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
