import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EntitySchema from "@/components/EntitySchema";
import BlogCTA from "@/components/BlogCTA";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";
import { blogPostingSchema, breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
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

      <nav aria-label="Breadcrumb" className="text-xs text-white/40">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-white/70">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/blog" className="hover:text-white/70">
              Blog
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-white/60">{post.title}</li>
        </ol>
      </nav>

      <header className="mt-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-white/45">
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
      <div className="mt-8 rounded-2xl border border-accent-400/20 bg-accent-500/5 p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-400">
          Direct Answer
        </p>
        <p className="mt-2 text-base leading-relaxed text-white/85">{post.answer}</p>
      </div>

      <div
        className="prose prose-invert mt-10 max-w-none prose-headings:scroll-mt-24 prose-table:text-sm"
        // Content is authored in-repo markdown (content/blog/*.md) — trusted source.
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <BlogCTA />

      <div className="mt-12 border-t border-white/10 pt-8">
        <Link href="/blog" className="text-sm font-semibold text-accent-400 hover:underline">
          ← Back to all articles
        </Link>
      </div>
    </article>
  );
}
