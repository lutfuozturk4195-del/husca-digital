import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/site-config";

/**
 * Radix Accordion keeps each panel's content mounted in the DOM (just
 * visually collapsed via CSS), so every answer is still present in the
 * initial HTML for crawlers/LLM fetchers — matching the FAQPage JSON-LD
 * emitted alongside it, accordion state or not.
 */
export default function FAQSection() {
  return (
    <section id="faq" className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-500">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Questions AI answer engines get asked constantly
          </h2>
          <p className="mt-4 text-muted-foreground">
            Structured for humans and machines alike — this section is also published
            as FAQPage schema.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-14 border-t border-border">
          {siteConfig.faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question} className="border-border py-1">
              <AccordionTrigger className="py-5 text-base font-semibold text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
