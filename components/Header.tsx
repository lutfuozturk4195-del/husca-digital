import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500 to-cyan-400 text-sm font-bold text-white shadow-sm">
            H
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button asChild size="lg" className="h-9 rounded-full px-5">
          <Link href="/#audit">Get Free Audit</Link>
        </Button>
      </div>
    </header>
  );
}
