import Link from "next/link";

/** Built-in conversion CTA embedded inside every blog post body. */
export default function BlogCTA() {
  return (
    <div className="not-prose my-10 rounded-2xl border border-accent-400/20 bg-gradient-to-br from-accent-500/10 to-cyan-400/5 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent-400">
        Free Audit
      </p>
      <h3 className="mt-2 text-xl font-semibold text-white">
        Is ChatGPT already recommending your competitor over you?
      </h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60">
        Get a free AI Citation &amp; Visibility Audit and see exactly where you stand
        across ChatGPT, Perplexity, and Google AI Overviews.
      </p>
      <Link
        href="/#audit"
        className="mt-5 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-white/90"
      >
        Get My Free Audit →
      </Link>
    </div>
  );
}
