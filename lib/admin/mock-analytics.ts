/**
 * Placeholder analytics. Husca Digital isn't wired to a real analytics
 * backend yet (Vercel Web Analytics needs the `@vercel/analytics` package
 * plus the project's Analytics tab enabled; AI-bot share needs server-log
 * user-agent parsing) — these numbers are clearly-labeled mock data so the
 * dashboard UI can be built and swapped later without touching layout.
 *
 * To go live: replace getSummary/getTrend with calls to the Vercel
 * Analytics API (https://vercel.com/docs/analytics) or your own log store,
 * keeping the same return shapes.
 */

export type Summary = {
  totalPageviews: number;
  uniqueVisitors: number;
  formSubmissions: number;
  /** 0-1 share of traffic attributed to known AI crawlers/citation clicks. */
  aiTrafficShare: number;
};

export type DayStat = {
  date: string;
  pageviews: number;
  visitors: number;
};

export function getSummary(): Summary {
  return {
    totalPageviews: 8420,
    uniqueVisitors: 3190,
    formSubmissions: 27,
    aiTrafficShare: 0.18,
  };
}

export function getTrend(days = 7): DayStat[] {
  const today = new Date();
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (days - 1 - i));
    const base = 900 + Math.round(Math.sin(i * 0.9) * 140) + i * 35;
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      pageviews: base,
      visitors: Math.round(base * 0.42),
    };
  });
}
