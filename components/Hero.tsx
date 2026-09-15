import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const PROOF_POINTS = [
  { value: "3", label: "AI engines tracked per audit — ChatGPT, Perplexity, Google AI Overviews" },
  { value: "48h", label: "to first technical GEO fixes shipped" },
  { value: "100%", label: "US-based B2B SaaS focus" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-glow">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid-fade bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]"
      />

      <div className="mx-auto max-w-5xl px-6 pb-20 pt-20 text-center md:pt-28">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          GEO &amp; AI Search Growth Agency — {siteConfig.areaServed} Market
        </p>

        <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          {siteConfig.valueProposition}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-white/60">
          Google SEO alone no longer decides who your buyers find. We engineer your
          entity, content, and technical infrastructure so generative answer engines
          cite <em className="text-white/80 not-italic">you</em> — not just rank you.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/#audit"
            className="w-full rounded-full bg-gradient-to-r from-accent-500 to-cyan-400 px-7 py-3.5 text-sm font-semibold text-ink-950 shadow-lg shadow-accent-500/20 transition hover:opacity-90 sm:w-auto"
          >
            Get My Free AI Visibility Audit
          </Link>
          <Link
            href="/blog"
            className="w-full rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5 sm:w-auto"
          >
            Read the GEO Playbook
          </Link>
        </div>

        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 border-t border-white/10 pt-10 text-left sm:grid-cols-3">
          {PROOF_POINTS.map((point) => (
            <div key={point.label}>
              <dt className="text-3xl font-semibold text-white">{point.value}</dt>
              <dd className="mt-1 text-sm text-white/50">{point.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
