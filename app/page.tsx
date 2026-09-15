import Link from "next/link";
import Hero from "@/components/Hero";
import AuditForm from "@/components/AuditForm";
import ServicesSection from "@/components/ServicesSection";
import ComparisonSection from "@/components/ComparisonSection";
import FAQSection from "@/components/FAQSection";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />

      {/* Lead Magnet: AI Search Visibility Audit */}
      <section id="audit" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 md:grid-cols-2 md:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Free Lead Magnet
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Get a Free AI Citation &amp; Visibility Audit
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/55">
                See exactly whether ChatGPT and Perplexity recommend{" "}
                <strong className="text-white/80">you</strong> or your competitor when
                your buyers ask for a solution like yours.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/60">
                {[
                  "Citation check across ChatGPT, Perplexity & Google AI Overviews",
                  "Entity & schema markup gap analysis",
                  "Competitor citation comparison",
                  "Prioritized technical GEO fix list",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-cyan-400">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="self-center">
              <AuditForm />
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />
      <ComparisonSection />

      {/* Blog highlights */}
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-400">
                From the Blog
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                The GEO Playbook
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-accent-400 hover:underline"
            >
              View all articles →
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                <span className="text-xs font-medium text-white/40">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  · {post.readingTimeMinutes} min read
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-accent-300">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      {/* Final CTA */}
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to see where you stand?
          </h2>
          <p className="mt-4 text-white/55">
            Run the free audit and know within 24 hours whether AI answer engines
            already recommend you — or your competitor.
          </p>
          <Link
            href="/#audit"
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-accent-500 to-cyan-400 px-8 py-3.5 text-sm font-semibold text-ink-950 transition hover:opacity-90"
          >
            Get My Free AI Visibility Audit
          </Link>
        </div>
      </section>
    </>
  );
}
