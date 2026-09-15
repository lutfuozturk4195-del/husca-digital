import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
];

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950">
      {/* Mobile top bar */}
      <div className="border-b border-white/5 p-4 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-accent-400 to-cyan-400 text-xs font-bold text-ink-950">
              H
            </span>
            <span className="text-sm font-semibold text-white">Admin</span>
          </div>
          <LogoutButton />
        </div>
        <nav className="mt-3 flex gap-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/60 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex">
        <aside className="hidden w-56 shrink-0 border-r border-white/5 p-5 md:block">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-accent-400 to-cyan-400 text-xs font-bold text-ink-950">
              H
            </span>
            <span className="text-sm font-semibold text-white">Admin</span>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 flex flex-col gap-2 border-t border-white/5 pt-4">
            <Link href="/" className="text-xs text-white/40 hover:text-white/70">
              ← View site
            </Link>
            <LogoutButton />
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
