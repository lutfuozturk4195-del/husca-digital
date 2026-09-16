import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BLOG_CATEGORIES, getAllPosts, getCategoryLabel } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";
import { cn } from "cn";

export const metadata: Metadata = {
  title: "GEO & AI Search Blog",
  description:
    "Technical, answer-first articles on Generative Engine Optimization (GEO), AI search visibility, and getting recommended by ChatGPT and Perplexity — written for US B2B SaaS teams.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const posts = getAllPosts();
  const activeCategory = searchParams.category;
  const visiblePosts = activeCategory
    ? posts.filter((post) => post.category === activeCategory)
    : posts;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-500">
          {siteConfig.tagline}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
          The GEO Playbook
        </h1>
        <p className="mt-4 text-muted-foreground">
          Answer-first, technical breakdowns of Generative Engine Optimization —
          written to be useful to a human founder and citable by an AI model.
        </p>
      </div>

      <nav aria-label="Blog categories" className="mt-10 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            !activeCategory
              ? "border-transparent bg-primary text-primary-foreground shadow-sm"
              : "border-border text-muted-foreground hover:border-accent-400/60 hover:text-foreground"
          )}
        >
          All
        </Link>
        {BLOG_CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={`/blog?category=${category.id}`}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              activeCategory === category.id
                ? "border-transparent bg-primary text-primary-foreground shadow-sm"
                : "border-border text-muted-foreground hover:border-accent-400/60 hover:text-foreground"
            )}
          >
            {category.label}
          </Link>
        ))}
      </nav>

      {visiblePosts.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col rounded-2xl border-border p-6 shadow-sm ring-0 transition-all duration-200 hover:-translate-y-1 hover:border-accent-400/60 hover:shadow-xl hover:shadow-accent-500/10">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full bg-accent-500/10 text-accent-600">
                    {getCategoryLabel(post.category)}
                  </Badge>
                  {post.tags.slice(0, 1).map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-full text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2 className="mt-4 text-lg font-semibold leading-snug text-foreground group-hover:text-accent-600">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span>{post.readingTimeMinutes} min read</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-14 text-sm text-muted-foreground">
          No articles in this category yet — check back soon.
        </p>
      )}
    </div>
  );
}
