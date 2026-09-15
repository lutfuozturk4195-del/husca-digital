import { siteConfig } from "@/lib/site-config";

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
          {siteConfig.services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              <span className="text-xs font-mono text-white/30">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">{service.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{service.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
