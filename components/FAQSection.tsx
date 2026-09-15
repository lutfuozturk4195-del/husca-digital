import { siteConfig } from "@/lib/site-config";

/**
 * Renders as a plain, fully-expanded FAQ list (no client-side accordion
 * hidden behind JS) so both Googlebot and LLM fetchers get every answer
 * in the initial HTML — matching the FAQPage JSON-LD emitted alongside it.
 */
export default function FAQSection() {
  return (
    <section id="faq" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-400">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Questions AI answer engines get asked constantly
          </h2>
          <p className="mt-4 text-white/50">
            Structured for humans and machines alike — this section is also published
            as FAQPage schema.
          </p>
        </div>

        <dl className="mt-14 divide-y divide-white/10 border-t border-white/10">
          {siteConfig.faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <dt className="text-base font-semibold text-white">{faq.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-white/55">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
