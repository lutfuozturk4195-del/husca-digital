import type { Metadata } from "next";
import PostForm from "@/components/admin/PostForm";

export const metadata: Metadata = {
  title: "New Post",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">New Post</h1>
      <PostForm mode="create" />
    </div>
  );
}
