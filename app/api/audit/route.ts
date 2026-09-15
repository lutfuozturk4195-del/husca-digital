import { NextResponse } from "next/server";

export const runtime = "edge";
// Pin execution to US regions (Vercel Edge Network) — matches the site's
// US-only areaServed and keeps lead data processing on US infrastructure.
export const preferredRegion = ["iad1", "sfo1"];

const DOMAIN_PATTERN = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AuditPayload = {
  domain?: string;
  email?: string;
  company_website?: string; // honeypot
};

/**
 * Receives Audit form submissions and forwards them to an automation
 * webhook (n8n, Zapier, Make, etc.) configured via AUDIT_WEBHOOK_URL.
 * Keeps the webhook URL server-side only — never exposed to the client.
 */
export async function POST(request: Request) {
  let body: AuditPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const domain = body.domain?.trim().toLowerCase() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";

  // Honeypot: bots that fill every field will populate this hidden input.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  if (!DOMAIN_PATTERN.test(domain) || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid domain or email" }, { status: 400 });
  }

  const webhookUrl = process.env.AUDIT_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain,
          email,
          source: "husca-digital-website",
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("[audit] webhook forward failed", error);
      return NextResponse.json(
        { ok: false, error: "Could not submit audit request" },
        { status: 502 }
      );
    }
  } else {
    // No webhook configured yet (e.g. local dev) — log instead of failing
    // the request so the UI flow can still be tested end-to-end.
    console.warn("[audit] AUDIT_WEBHOOK_URL not set — received", { domain, email });
  }

  return NextResponse.json({ ok: true });
}
