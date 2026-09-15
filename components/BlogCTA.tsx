import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/** Built-in conversion CTA embedded inside every blog post body. */
export default function BlogCTA() {
  return (
    <Card className="not-prose my-10 gap-2 rounded-2xl border-accent-400/25 bg-gradient-to-br from-accent-500/[0.06] to-cyan-400/[0.04] p-2 shadow-lg shadow-accent-500/10 ring-0">
      <CardContent className="px-6 py-6 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-500">
          Free Audit
        </p>
        <h3 className="mt-2 text-xl font-semibold text-foreground">
          Is ChatGPT already recommending your competitor over you?
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Get a free AI Citation &amp; Visibility Audit and see exactly where you stand
          across ChatGPT, Perplexity, and Google AI Overviews.
        </p>
        <Button asChild className="mt-5 h-10 rounded-full px-5">
          <Link href="/#audit">Get My Free Audit →</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
