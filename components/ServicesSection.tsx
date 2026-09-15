import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { SERVICE_ICONS } from "@/components/icons/ServiceIcons";

export default function ServicesSection() {
  return (
    <section id="services" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-500">
            Services
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything it takes to become the answer, not just a result
          </h2>
          <p className="mt-4 text-muted-foreground">
            A full-stack GEO engagement: entity foundations, AI-citable content,
            technical infrastructure, and earned corroboration — run like a growth
            program, not a one-off audit.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service, index) => {
            const Icon = SERVICE_ICONS[service.slug];
            return (
              <Card
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 gap-3 rounded-2xl border-border p-2 shadow-none ring-0 transition hover:border-accent-400/50 hover:shadow-sm"
              >
                <CardHeader className="px-4 pt-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </div>
                  <CardTitle className="mt-3 text-base font-semibold text-foreground">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-2">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.summary}
                  </p>
                </CardContent>
                <span className="sr-only">{String(index + 1).padStart(2, "0")}</span>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
