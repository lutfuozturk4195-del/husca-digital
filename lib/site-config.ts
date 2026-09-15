import siteConfigJson from "@/data/site-config.json";

export type Service = {
  name: string;
  slug: string;
  summary: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type SiteConfig = {
  name: string;
  legalName: string;
  tagline: string;
  valueProposition: string;
  description: string;
  url: string;
  logo: string;
  foundingDate: string;
  email: string;
  areaServed: string;
  addressCountry: string;
  sameAs: string[];
  knowsAbout: string[];
  services: Service[];
  faqs: Faq[];
};

// process.env.NEXT_PUBLIC_SITE_URL lets deploys override the canonical
// domain without touching source (e.g. staging vs. production).
export const siteConfig: SiteConfig = {
  ...(siteConfigJson as SiteConfig),
  url: process.env.NEXT_PUBLIC_SITE_URL ?? siteConfigJson.url,
};
