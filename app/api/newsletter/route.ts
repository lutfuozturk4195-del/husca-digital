import { NextResponse } from "next/server";

export const runtime = "edge";
export const preferredRegion = ["iad1", "sfo1"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NewsletterPayload = {
  email?: string;
  company_website?: string; // honeypot
};

/**
 * Receives newsletter signups. No ESP/CRM wired up yet — forwards to
 * NEWSLETTER_WEBHOOK_URL if set (same pattern as /api/audit), otherwise
 * just logs server-side so the UI flow works end-to-end while that's
 * pending.
 */
export async function POST(request: Request) {
  let body: NewsletterPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";

  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "husca-digital-website-newsletter",
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("[newsletter] webhook forward failed", error);
      return NextResponse.json(
        { ok: false, error: "Could not submit signup" },
        { status: 502 }
      );
    }
  } else {
    console.warn("[newsletter] NEWSLETTER_WEBHOOK_URL not set — received", { email });
  }

  return NextResponse.json({ ok: true });
}
