import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
];

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile top bar */}
      <div className="border-b border-border p-4 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-accent-500 to-cyan-400 text-xs font-bold text-white">
              H
            </span>
            <span className="text-sm font-semibold text-foreground">Admin</span>
          </div>
          <LogoutButton />
        </div>
        <nav className="mt-3 flex gap-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex">
        <aside className="hidden w-56 shrink-0 border-r border-border p-5 md:block">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-accent-500 to-cyan-400 text-xs font-bold text-white">
              H
            </span>
            <span className="text-sm font-semibold text-foreground">Admin</span>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 flex flex-col gap-2 border-t border-border pt-4">
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">
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
