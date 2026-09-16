import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import EntitySchema from "@/components/EntitySchema";
import BlogCTA from "@/components/BlogCTA";
import { getAllPosts, getCategoryLabel, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";
import { blogPostingSchema, breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export function generateStaticParams() {
  // Published only — draft slugs aren't pre-rendered or publicly reachable.
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const graph = jsonLdGraph(
    blogPostingSchema(post),
    breadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Blog", url: `${siteConfig.url}/blog` },
      { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
    ])
  );

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <EntitySchema data={graph} />

      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/blog" className="hover:text-foreground">
              Blog
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground/70">{post.title}</li>
        </ol>
      </nav>

      <header className="mt-6">
        <div className="flex flex-wrap gap-2">
          <Link href={`/blog?category=${post.category}`}>
            <Badge className="rounded-full bg-accent-500/10 text-accent-600 hover:bg-accent-500/20">
              {getCategoryLabel(post.category)}
            </Badge>
          </Link>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-full text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
          <span>{post.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span>{post.readingTimeMinutes} min read</span>
        </div>
      </header>

      {/* Answer-first block: the direct, quotable answer AI engines can lift. */}
      <Card className="mt-8 gap-0 rounded-2xl border-accent-400/25 bg-accent-500/[0.05] p-2 shadow-md shadow-accent-500/10 ring-0">
        <CardContent className="px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-500">
            Direct Answer
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">{post.answer}</p>
        </CardContent>
      </Card>

      <div
        className="prose mt-10 max-w-none prose-headings:scroll-mt-24 prose-a:text-accent-600 prose-a:no-underline hover:prose-a:underline prose-table:text-sm"
        // Content is authored in-repo markdown (content/blog/*.md) — trusted source.
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <BlogCTA />

      <div className="mt-12 border-t border-border pt-8">
        <Link href="/blog" className="text-sm font-semibold text-accent-500 hover:underline">
          ← Back to all articles
        </Link>
      </div>
    </article>
  );
}
