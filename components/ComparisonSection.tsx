import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-500">
            Show, Don&rsquo;t Tell
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            SEO vs. GEO, at a glance
          </h2>
          <p className="mt-4 text-muted-foreground">
            This exact table is the kind of answer-first, structured content we
            build for clients — extractable and citable by design.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card">
          <Table className="min-w-[560px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-auto px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Dimension
                </TableHead>
                <TableHead className="h-auto px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Traditional SEO
                </TableHead>
                <TableHead className="h-auto px-5 py-4 text-xs font-semibold uppercase tracking-wider text-accent-500">
                  GEO
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((row) => (
                <TableRow key={row.dimension}>
                  <TableCell className="whitespace-normal px-5 py-4 font-medium text-foreground">
                    {row.dimension}
                  </TableCell>
                  <TableCell className="whitespace-normal px-5 py-4 text-muted-foreground">
                    {row.seo}
                  </TableCell>
                  <TableCell className="whitespace-normal px-5 py-4 text-foreground">
                    {row.geo}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Full breakdown:{" "}
          <a
            href="/blog/geo-vs-seo-comparison"
            className="font-medium text-accent-500 hover:underline"
          >
            GEO vs SEO: The Complete Comparison →
          </a>
        </p>
      </div>
    </section>
  );
}
