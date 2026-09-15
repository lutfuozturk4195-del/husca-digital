import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Explicitly welcomes the major generative-engine crawlers rather than
// leaving them to the default "*" rule — signals intent, and some crawler
// implementations still prefer an exact user-agent match.
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended",
  "CCBot",
];

const ADMIN_PATHS = ["/admin", "/api/admin"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ADMIN_PATHS },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: ADMIN_PATHS })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
