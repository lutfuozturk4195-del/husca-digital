import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import DeletePostButton from "@/components/admin/DeletePostButton";

export const metadata: Metadata = {
  title: "Posts",
  robots: { index: false, follow: false },
};

export default function AdminPostsPage() {
  const posts = getAllPosts({ includeDrafts: true });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-white">Blog Posts</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-white/90"
        >
          + New Post
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-white/[0.03] text-white/50">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {posts.map((post) => {
              const isDraft = post.status === "draft";
              return (
                <tr key={post.slug}>
                  <td className="max-w-xs truncate px-4 py-3 text-white/85">{post.title}</td>
                  <td className="px-4 py-3 font-mono text-xs text-white/50">{post.slug}</td>
                  <td className="px-4 py-3 text-white/50">{post.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                        isDraft ? "bg-amber-400/10 text-amber-300" : "bg-cyan-400/10 text-cyan-300"
                      }`}
                    >
                      {isDraft ? "Draft" : "Published"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-4 text-sm">
                      <Link href={`/admin/posts/${post.slug}/edit`} className="text-accent-400 hover:underline">
                        Edit
                      </Link>
                      <DeletePostButton slug={post.slug} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-white/40">
                  No posts yet — create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
