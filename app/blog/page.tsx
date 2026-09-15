import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "GEO & AI Search Blog",
  description:
    "Technical, answer-first articles on Generative Engine Optimization (GEO), AI search visibility, and getting recommended by ChatGPT and Perplexity — written for US B2B SaaS teams.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-400">
          {siteConfig.tagline}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
          The GEO Playbook
        </h1>
        <p className="mt-4 text-white/55">
          Answer-first, technical breakdowns of Generative Engine Optimization —
          written to be useful to a human founder and citable by an AI model.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="mt-4 text-lg font-semibold leading-snug text-white group-hover:text-accent-300">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-white/55">
              {post.description}
            </p>
            <div className="mt-5 flex items-center justify-between text-xs text-white/40">
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
