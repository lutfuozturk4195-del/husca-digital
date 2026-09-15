import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/admin/StatCard";
import TrendChart from "@/components/admin/TrendChart";
import { getSummary, getTrend } from "@/lib/admin/mock-analytics";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  const summary = getSummary();
  const trend = getTrend();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline" className="rounded-full border-amber-500/30 bg-amber-500/10 text-amber-700">
            Stat cards below are mock data
          </Badge>
          <a
            href="https://vercel.com/lutfuozturk4195-9831s-projects/husca-digital/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            View real Vercel Analytics →
          </a>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Vercel Web Analytics is now tracking real visits (added {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}).
        On the Hobby plan its data isn&rsquo;t available via API, so the cards
        below stay illustrative — use the link above for real pageviews and
        visitors until that changes.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Pageviews"
          value={summary.totalPageviews.toLocaleString("en-US")}
          hint="Last 7 days"
        />
        <StatCard
          label="Unique Visitors"
          value={summary.uniqueVisitors.toLocaleString("en-US")}
          hint="Last 7 days"
        />
        <StatCard
          label="Form Submissions"
          value={String(summary.formSubmissions)}
          hint="AI Visibility Audit requests"
        />
        <StatCard
          label="AI Bot / Citation Traffic"
          value={`${Math.round(summary.aiTrafficShare * 100)}%`}
          hint="Share of total traffic"
        />
      </div>

      <Card className="mt-6 rounded-2xl border-border p-2 shadow-md ring-0">
        <CardContent className="px-5 py-5">
          <h2 className="text-sm font-semibold text-foreground">Traffic — last 7 days</h2>
          <div className="mt-6">
            <TrendChart data={trend} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
