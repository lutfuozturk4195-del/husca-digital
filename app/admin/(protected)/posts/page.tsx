import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        <h1 className="text-2xl font-semibold text-foreground">Blog Posts</h1>
        <Button asChild size="lg" className="h-9 rounded-full px-4">
          <Link href="/admin/posts/new">+ New Post</Link>
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-md">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-auto px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Title
              </TableHead>
              <TableHead className="h-auto px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Slug
              </TableHead>
              <TableHead className="h-auto px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Date
              </TableHead>
              <TableHead className="h-auto px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="h-auto px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => {
              const isDraft = post.status === "draft";
              return (
                <TableRow key={post.slug}>
                  <TableCell className="max-w-xs truncate whitespace-normal px-4 py-3 text-foreground">
                    {post.title}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {post.slug}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-muted-foreground">{post.date}</TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={
                        isDraft
                          ? "rounded-full border-amber-500/30 bg-amber-500/10 text-amber-700"
                          : "rounded-full border-cyan-500/30 bg-cyan-500/10 text-cyan-700"
                      }
                    >
                      {isDraft ? "Draft" : "Published"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-4 text-sm">
                      <Link href={`/admin/posts/${post.slug}/edit`} className="font-medium text-accent-500 hover:underline">
                        Edit
                      </Link>
                      <DeletePostButton slug={post.slug} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  No posts yet — create your first one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
