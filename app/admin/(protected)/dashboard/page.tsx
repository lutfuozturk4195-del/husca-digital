import type { Metadata } from "next";
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
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
            Stat cards below are mock data
          </span>
          <a
            href="https://vercel.com/lutfuozturk4195-9831s-projects/husca-digital/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            View real Vercel Analytics →
          </a>
        </div>
      </div>
      <p className="mt-2 text-xs text-white/40">
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

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <h2 className="text-sm font-semibold text-white">Traffic — last 7 days</h2>
        <div className="mt-6">
          <TrendChart data={trend} />
        </div>
      </div>
    </div>
  );
}
