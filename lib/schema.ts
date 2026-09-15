import { siteConfig } from "@/lib/site-config";
import type { Faq } from "@/lib/site-config";
import type { PostMeta } from "@/lib/posts";

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/**
 * Core Organization entity. Every other schema on the site references this
 * node by @id instead of repeating the entity, so crawlers resolve one
 * canonical brand node across the whole graph.
 */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: siteConfig.logo,
    foundingDate: siteConfig.foundingDate,
    description: siteConfig.description,
    sameAs: siteConfig.sameAs,
    knowsAbout: siteConfig.knowsAbout,
    areaServed: {
      "@type": "Country",
      name: siteConfig.areaServed === "US" ? "United States" : siteConfig.areaServed,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.addressCountry,
    },
  };
}

/** WebSite node with a SearchAction, linked to the Organization as publisher. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

/**
 * ProfessionalService — the commercial entity a buyer or an AI model should
 * understand Husca Digital to be, distinct from the generic Organization
 * node. Lists the full service catalog so models can cite specific offers.
 */
export function professionalServiceSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#service`,
    name: siteConfig.name,
    provider: { "@id": ORG_ID },
    url: siteConfig.url,
    description: siteConfig.valueProposition,
    areaServed: {
      "@type": "Country",
      name: siteConfig.areaServed === "US" ? "United States" : siteConfig.areaServed,
    },
    knowsAbout: siteConfig.knowsAbout,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "GEO & AI Search Growth Services",
      itemListElement: siteConfig.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.summary,
          url: `${siteConfig.url}/#${service.slug}`,
        },
      })),
    },
  };
}

export function faqPageSchema(faqs: Faq[] = siteConfig.faqs) {
  return {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function blogPostingSchema(post: PostMeta & { html?: string }) {
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  return {
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    mainEntityOfPage: postUrl,
    headline: post.title,
    description: post.description,
    abstract: post.answer,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: post.author,
    },
    publisher: { "@id": ORG_ID },
    keywords: post.tags.join(", "),
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Wraps one or more nodes in a single JSON-LD @graph so every entity shares one context. */
export function jsonLdGraph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
