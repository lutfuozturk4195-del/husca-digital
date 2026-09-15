import { siteConfig } from "@/lib/site-config";
import { SERVICE_ICONS } from "@/components/icons/ServiceIcons";

export default function ServicesSection() {
  return (
    <section id="services" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-400">
            Services
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Everything it takes to become the answer, not just a result
          </h2>
          <p className="mt-4 text-white/50">
            A full-stack GEO engagement: entity foundations, AI-citable content,
            technical infrastructure, and earned corroboration — run like a growth
            program, not a one-off audit.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service) => {
            const Icon = SERVICE_ICONS[service.slug];
            return (
              <article
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500/15 to-cyan-400/15 text-accent-300 ring-1 ring-inset ring-white/10">
                  {Icon ? <Icon className="h-5 w-5" /> : null}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{service.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{service.summary}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
