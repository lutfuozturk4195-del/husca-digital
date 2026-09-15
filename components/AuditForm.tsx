"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "idle" | "submitting" | "success" | "error";

const DOMAIN_PATTERN = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
const WORK_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
]);

export default function AuditForm() {
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const cleanDomain = domain.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
    const cleanEmail = email.trim();

    if (!DOMAIN_PATTERN.test(cleanDomain)) {
      setErrorMessage("Enter a valid company domain, e.g. acme.com");
      return;
    }
    if (!WORK_EMAIL_PATTERN.test(cleanEmail)) {
      setErrorMessage("Enter a valid email address");
      return;
    }
    const emailDomain = cleanEmail.split("@")[1]?.toLowerCase();
    if (emailDomain && FREE_EMAIL_DOMAINS.has(emailDomain)) {
      setErrorMessage("Please use your work email so we can match your domain");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: cleanDomain, email: cleanEmail }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 px-6 py-10 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-600">
          ✓
        </span>
        <h3 className="text-lg font-semibold text-foreground">Audit request received</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          We&rsquo;re running your AI Citation &amp; Visibility report now. Check your inbox
          within the next 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Honeypot field — hidden from real users, catches basic bots */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <Label htmlFor="domain" className="mb-1.5 text-xs font-medium text-muted-foreground">
          Company Domain
        </Label>
        <Input
          id="domain"
          name="domain"
          type="text"
          inputMode="url"
          placeholder="acme.com"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
          required
          className="h-11 rounded-xl px-4"
        />
      </div>

      <div>
        <Label htmlFor="email" className="mb-1.5 text-xs font-medium text-muted-foreground">
          Work Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@acme.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="h-11 rounded-xl px-4"
        />
      </div>

      {errorMessage && (
        <p role="alert" className="text-xs font-medium text-destructive">
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        size="lg"
        className="mt-1 h-11 w-full rounded-xl text-sm"
      >
        {status === "submitting" ? "Running audit…" : "Get My Free AI Visibility Audit"}
      </Button>

      <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
        No spam. We&rsquo;ll only email your audit results and, if relevant, a short
        follow-up. Unsubscribe anytime.
      </p>
    </form>
  );
}
