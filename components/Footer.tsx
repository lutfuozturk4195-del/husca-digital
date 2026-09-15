import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-accent-400 to-cyan-400 text-xs font-bold text-ink-950">
                H
              </span>
              <span className="text-sm font-semibold text-white">{siteConfig.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              {siteConfig.services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/#${service.slug}`}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-white/60 transition hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-white/60 transition hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-white/40 md:flex-row">
          <p>
            © {year} {siteConfig.legalName}. Built in the US, for the US B2B SaaS market.
          </p>
          <div className="flex gap-4">
            {siteConfig.sameAs.map((href) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white/70"
              >
                {new URL(href).hostname.replace("www.", "")}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
