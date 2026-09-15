#!/usr/bin/env node
// Generates /public/llms.txt and /public/llms-full.txt from
// data/site-config.json + content/blog/*.md, following the llms.txt
// convention (https://llmstxt.org) so GPTBot, PerplexityBot, ClaudeBot and
// similar LLM fetchers can ingest our services and content without parsing
// full HTML. Runs automatically before every build via the "prebuild" script.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const PUBLIC_DIR = path.join(ROOT, "public");

const site = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "site-config.json"), "utf8"));
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

function loadPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return { ...data, slug: file.replace(/\.md$/, ""), content: content.trim() };
    })
    .filter((post) => post.status !== "draft")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function buildLlmsTxt(posts) {
  const lines = [];
  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(`> ${site.valueProposition}. ${site.description}`);
  lines.push("");
  lines.push(
    `${site.name} is a Generative Engine Optimization (GEO) and technical SEO growth agency serving the ${site.areaServed} B2B SaaS market. Core expertise: ${site.knowsAbout.join(", ")}.`
  );
  lines.push("");

  lines.push("## Services");
  lines.push("");
  for (const service of site.services) {
    lines.push(`- [${service.name}](${siteUrl}/#${service.slug}): ${service.summary}`);
  }
  lines.push("");

  lines.push("## Blog");
  lines.push("");
  for (const post of posts) {
    lines.push(`- [${post.title}](${siteUrl}/blog/${post.slug}): ${post.description}`);
  }
  lines.push("");

  lines.push("## Lead Magnet");
  lines.push("");
  lines.push(
    `- [Free AI Search Visibility Audit](${siteUrl}/#audit): Submit a company domain and work email to receive a free report showing whether ChatGPT, Perplexity, and Google AI Overviews currently cite the brand.`
  );
  lines.push("");

  lines.push("## Optional");
  lines.push("");
  lines.push(`- [Full documentation](${siteUrl}/llms-full.txt): Complete markdown export of all services, FAQs, and blog articles.`);
  lines.push(`- [Sitemap](${siteUrl}/sitemap.xml)`);

  return lines.join("\n") + "\n";
}

function buildLlmsFullTxt(posts) {
  const lines = [];
  lines.push(`# ${site.name} — Full Reference`);
  lines.push("");
  lines.push(`> ${site.valueProposition}`);
  lines.push("");
  lines.push(site.description);
  lines.push("");
  lines.push(`- Legal name: ${site.legalName}`);
  lines.push(`- URL: ${siteUrl}`);
  lines.push(`- Area served: ${site.areaServed}`);
  lines.push(`- Contact: ${site.email}`);
  lines.push(`- Known for: ${site.knowsAbout.join(", ")}`);
  lines.push(`- Profiles: ${site.sameAs.join(", ")}`);
  lines.push("");

  lines.push("## Services");
  lines.push("");
  for (const service of site.services) {
    lines.push(`### ${service.name}`);
    lines.push("");
    lines.push(service.summary);
    lines.push("");
  }

  lines.push("## Frequently Asked Questions");
  lines.push("");
  for (const faq of site.faqs) {
    lines.push(`### ${faq.question}`);
    lines.push("");
    lines.push(faq.answer);
    lines.push("");
  }

  lines.push("## Blog Articles (Full Text)");
  lines.push("");
  for (const post of posts) {
    lines.push(`### ${post.title}`);
    lines.push("");
    lines.push(`*${post.description}*`);
    lines.push("");
    lines.push(`Published: ${post.date}${post.updated ? ` (updated ${post.updated})` : ""} · Author: ${post.author} · URL: ${siteUrl}/blog/${post.slug}`);
    lines.push("");
    lines.push(post.content);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  return lines.join("\n") + "\n";
}

function main() {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const posts = loadPosts();

  fs.writeFileSync(path.join(PUBLIC_DIR, "llms.txt"), buildLlmsTxt(posts), "utf8");
  fs.writeFileSync(path.join(PUBLIC_DIR, "llms-full.txt"), buildLlmsFullTxt(posts), "utf8");

  console.log(`[generate-llms] wrote llms.txt and llms-full.txt (${posts.length} posts)`);
}

main();
