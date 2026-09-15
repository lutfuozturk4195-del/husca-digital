const ROWS: { dimension: string; seo: string; geo: string }[] = [
  { dimension: "Output surface", seo: "Ranked list of links", geo: "Synthesized answer with citations" },
  { dimension: "Unit optimized", seo: "Keyword / page", geo: "Entity / claim / answer block" },
  { dimension: "Success metric", seo: "Ranking position, CTR", geo: "Citation frequency, share of AI voice" },
  { dimension: "Trust signal", seo: "Backlink volume", geo: "Entity consistency + corroboration" },
  { dimension: "Refresh speed", seo: "Weeks to months", geo: "Days to weeks" },
];

/**
 * This table is deliberately identical in substance to the one published
 * in /blog/geo-vs-seo-comparison — the same answer-first, extractable
 * pattern we sell, demonstrated live on the homepage.
 */
export default function ComparisonSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl"
      />
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-400">
            Show, Don&rsquo;t Tell
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            SEO vs. GEO, at a glance
          </h2>
          <p className="mt-4 text-white/50">
            This exact table is the kind of answer-first, structured content we
            build for clients — extractable and citable by design.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-white/[0.03] text-white/50">
                <th className="px-5 py-4 font-medium">Dimension</th>
                <th className="px-5 py-4 font-medium">Traditional SEO</th>
                <th className="px-5 py-4 font-medium text-cyan-300">GEO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ROWS.map((row) => (
                <tr key={row.dimension}>
                  <td className="px-5 py-4 font-medium text-white/80">{row.dimension}</td>
                  <td className="px-5 py-4 text-white/50">{row.seo}</td>
                  <td className="px-5 py-4 text-white/80">{row.geo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-sm text-white/40">
          Full breakdown:{" "}
          <a
            href="/blog/geo-vs-seo-comparison"
            className="font-medium text-accent-400 hover:underline"
          >
            GEO vs SEO: The Complete Comparison →
          </a>
        </p>
      </div>
    </section>
  );
}
