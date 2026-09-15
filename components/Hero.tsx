import Link from "next/link";
import { Button } from "@/components/ui/button";
import EntityGraphBackground from "@/components/EntityGraphBackground";
import { siteConfig } from "@/lib/site-config";

const PROOF_POINTS = [
  { value: "3", label: "AI engines tracked per audit — ChatGPT, Perplexity, Google AI Overviews" },
  { value: "48h", label: "to first technical GEO fixes shipped" },
  { value: "100%", label: "US-based B2B SaaS focus" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(139,143,249,0.14)_0%,transparent_70%)]"
      />
      <EntityGraphBackground
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_20%,#000_55%,transparent_100%)] sm:opacity-90"
      />

      <div className="mx-auto max-w-5xl px-6 pb-20 pt-20 text-center md:pt-28">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          GEO &amp; AI Search Growth Agency — {siteConfig.areaServed} Market
        </p>

        <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {siteConfig.valueProposition}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
          Google SEO alone no longer decides who your buyers find. We engineer your
          entity, content, and technical infrastructure so generative answer engines
          cite <em className="text-foreground not-italic">you</em> — not just rank you.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="h-11 w-full rounded-full px-7 text-sm sm:w-auto">
            <Link href="/#audit">Get My Free AI Visibility Audit</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-11 w-full rounded-full px-7 text-sm sm:w-auto">
            <Link href="/blog">Read the GEO Playbook</Link>
          </Button>
        </div>

        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 border-t border-border pt-10 text-left sm:grid-cols-3">
          {PROOF_POINTS.map((point) => (
            <div key={point.label}>
              <dt className="text-3xl font-semibold text-foreground">{point.value}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{point.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
