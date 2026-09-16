import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_CATEGORIES, getRawPostBySlug } from "@/lib/posts";
import PostForm from "@/components/admin/PostForm";

export const metadata: Metadata = {
  title: "Edit Post",
  robots: { index: false, follow: false },
};

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const post = getRawPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Edit Post</h1>
      <PostForm
        mode="edit"
        initialValues={{
          slug: post.slug,
          title: post.title,
          description: post.description,
          date: post.date,
          author: post.author,
          tags: post.tags.join(", "),
          answer: post.answer,
          status: post.status ?? "published",
          category: post.category ?? BLOG_CATEGORIES[0].id,
          content: post.content,
        }}
      />
    </div>
  );
}
