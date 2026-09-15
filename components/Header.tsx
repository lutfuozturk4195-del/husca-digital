import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-400 to-cyan-400 text-sm font-bold text-ink-950">
            H
          </span>
          <span className="text-base font-semibold tracking-tight text-white">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#audit"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-white/90"
        >
          Get Free Audit
        </Link>
      </div>
    </header>
  );
}
