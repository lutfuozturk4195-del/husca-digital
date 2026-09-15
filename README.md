# Husca Digital — AI Search & GEO Growth Lab

Production-ready Next.js (App Router) + TypeScript + Tailwind CSS site for
**Husca Digital**, a Generative Engine Optimization (GEO) and technical SEO
growth agency targeting the US B2B SaaS market. The site itself is built as
a GEO showcase: answer-first content, deep entity/schema markup, and
machine-readable `llms.txt` files for AI crawlers.

## Stack

- **Next.js 14** (App Router, static generation for all blog content)
- **TypeScript**
- **Tailwind CSS** + `@tailwindcss/typography` for article styling
- Markdown blog pipeline: `gray-matter` + `unified`/`remark`/`rehype` (GFM tables, heading slugs)
- Edge API route (`/api/audit`) forwarding lead form submissions to an automation webhook (n8n, Zapier, Make…)

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL and AUDIT_WEBHOOK_URL
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  layout.tsx              Root layout — fonts, metadata, global Organization/WebSite/
                           ProfessionalService/FAQPage JSON-LD graph
  page.tsx                Home: Hero, Audit lead-magnet, Services, GEO-vs-SEO
                           comparison, blog highlights, FAQ, final CTA
  api/audit/route.ts       Edge route handler — validates + forwards audit form leads
  blog/page.tsx            Blog index grid
  blog/[slug]/page.tsx      Dynamic post template — answer-first block, markdown body,
                           BlogPosting + Breadcrumb JSON-LD, conversion CTA
  sitemap.ts               Dynamic sitemap (home, blog index, every post)
  robots.ts                Robots rules, explicit allow list for GPTBot/PerplexityBot/
                           ClaudeBot/Google-Extended/CCBot
components/
  EntitySchema.tsx         Generic JSON-LD <script> renderer
  Header.tsx / Footer.tsx  Nav + footer
  Hero.tsx                 Value prop, proof points
  AuditForm.tsx            Client component — domain + work email lead form
  ServicesSection.tsx      Service catalog cards
  ComparisonSection.tsx    SEO vs GEO comparison table (homepage demo of the pattern)
  FAQSection.tsx           Fully-expanded FAQ list (matches FAQPage schema 1:1)
  BlogCTA.tsx              Conversion CTA box embedded in blog posts
lib/
  posts.ts                 Markdown loading, frontmatter parsing, HTML rendering
  schema.ts                JSON-LD generators (Organization, ProfessionalService, FAQPage,
                           BlogPosting, BreadcrumbList) — one entity graph via @id references
  site-config.ts           Typed wrapper around data/site-config.json
data/site-config.json      Single source of truth: brand info, services, knowsAbout, FAQs
content/blog/*.md          Blog posts (frontmatter + markdown body)
scripts/generate-llms.mjs  Builds public/llms.txt + public/llms-full.txt from
                           data/site-config.json + content/blog (runs on `npm run build`)
public/llms.txt            Concise llms.txt (llmstxt.org convention)
public/llms-full.txt       Full markdown export (services, FAQs, complete articles)
```

## Editing content

- **Brand info, services, FAQs, entity keywords (`knowsAbout`)** → `data/site-config.json`.
  This single file feeds the JSON-LD schema, the homepage, the footer, and both
  `llms.txt` files — update it once, everywhere updates.
- **Blog posts** → add a new `content/blog/your-slug.md` file with frontmatter:

  ```markdown
  ---
  title: "..."
  description: "..."
  date: "2026-03-01"
  author: "Husca Digital Team"
  tags: ["GEO"]
  answer: "One or two sentences a model can quote directly — rendered in the
    Direct Answer callout at the top of the post."
  ---

  ## Body in GitHub-flavored markdown, tables supported.
  ```

  The post is automatically picked up by the blog index, sitemap, and
  `llms-full.txt` on the next build — no other file needs to change.

## Lead capture

`AuditForm` posts to `/api/audit`, which validates the domain/email and
forwards the payload to `AUDIT_WEBHOOK_URL` (set in `.env.local` / your
hosting provider's env vars) — point this at an n8n, Zapier, or Make webhook
to trigger the automated audit workflow. Without the env var set, submissions
are logged server-side so the UI flow can still be tested locally.

## Deployment

Live at **https://huscadigital.com** (Vercel, US regions — see
`preferredRegion` in `app/api/audit/route.ts`).

- Hosting: Vercel project `husca-digital`
- Git integration: connected to this repo's `main` branch — every push
  triggers an automatic production deployment
- DNS: `huscadigital.com` / `www.huscadigital.com` point at Vercel via `A`
  records (`76.76.21.21`) on the domain's registrar

## Before going to production

- [x] `NEXT_PUBLIC_SITE_URL` set to `https://huscadigital.com` (Vercel env var)
- [x] Static favicon (`app/icon.svg`) and dynamic OG images (home + per blog
      post) in place
- [ ] Replace the placeholder `sameAs` profile URLs and `logo` in
      `data/site-config.json` with the real accounts
- [ ] Set `AUDIT_WEBHOOK_URL` once the lead-capture automation (n8n or
      otherwise) is ready — until then, audit submissions are only logged
      server-side, not stored anywhere durable
