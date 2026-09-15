import type { DayStat } from "@/lib/admin/mock-analytics";

/**
 * Pure Tailwind bar chart — no charting library. Server-renderable (no
 * client JS needed) and keeps the admin bundle small, per the brief's
 * "Recharts or Tailwind progress bars" option.
 */
export default function TrendChart({ data }: { data: DayStat[] }) {
  const max = Math.max(...data.map((day) => day.pageviews), 1);

  return (
    <div>
      <div className="flex h-48 items-end gap-3">
        {data.map((day) => {
          const heightPct = Math.max(4, Math.round((day.pageviews / max) * 100));
          return (
            <div key={day.date} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-[11px] font-medium text-muted-foreground">
                {day.pageviews.toLocaleString("en-US")}
              </span>
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-accent-500 to-cyan-400"
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{day.date}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gradient-to-br from-accent-500 to-cyan-400" />
          Pageviews
        </span>
      </div>
    </div>
  );
}
