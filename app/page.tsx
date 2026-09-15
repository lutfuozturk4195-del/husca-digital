import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
          <Card className="grid gap-10 rounded-3xl border-border p-2 shadow-xl shadow-accent-500/10 ring-0 md:grid-cols-2 md:gap-14 md:p-4">
            <div className="px-6 pt-6 md:px-4 md:pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600">
                Free Lead Magnet
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Get a Free AI Citation &amp; Visibility Audit
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                See exactly whether ChatGPT and Perplexity recommend{" "}
                <strong className="text-foreground">you</strong> or your competitor when
                your buyers ask for a solution like yours.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {[
                  "Citation check across ChatGPT, Perplexity & Google AI Overviews",
                  "Entity & schema markup gap analysis",
                  "Competitor citation comparison",
                  "Prioritized technical GEO fix list",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-cyan-600">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="self-center px-6 pb-6 md:px-4 md:pb-4">
              <AuditForm />
            </div>
          </Card>
        </div>
      </section>

      <ServicesSection />
      <ComparisonSection />

      {/* Blog highlights */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-500">
                From the Blog
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                The GEO Playbook
              </h2>
            </div>
            <Button asChild variant="link" className="h-auto p-0 text-sm font-semibold text-accent-500">
              <Link href="/blog">View all articles →</Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                <Card className="h-full rounded-2xl border-border p-6 shadow-sm ring-0 transition-all duration-200 hover:-translate-y-1 hover:border-accent-400/60 hover:shadow-xl hover:shadow-accent-500/10">
                  <span className="text-xs font-medium text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {post.readingTimeMinutes} min read
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-accent-600">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      {/* Final CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Ready to see where you stand?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Run the free audit and know within 24 hours whether AI answer engines
            already recommend you — or your competitor.
          </p>
          <Button asChild size="lg" className="mt-8 h-11 rounded-full px-8 text-sm">
            <Link href="/#audit">Get My Free AI Visibility Audit</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
