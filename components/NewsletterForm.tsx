"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Lightweight newsletter opt-in. No ESP/CRM wired up yet — this just
 * collects + confirms the request (see app/api/newsletter/route.ts);
 * wiring it to a real provider later doesn't change this component.
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const cleanEmail = email.trim();
    if (!EMAIL_PATTERN.test(cleanEmail)) {
      setErrorMessage("Enter a valid email address");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 px-6 py-8 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-600">
          ✓
        </span>
        <p className="text-sm font-medium text-foreground">You&rsquo;re on the list</p>
        <p className="text-xs text-muted-foreground">
          We&rsquo;ll only email when there&rsquo;s something worth reading.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <Label htmlFor="newsletter-email" className="mb-1.5 text-xs font-medium text-muted-foreground">
          Email address
        </Label>
        <Input
          id="newsletter-email"
          type="email"
          placeholder="you@company.com"
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
        className="h-11 w-full rounded-xl text-sm"
      >
        {status === "submitting" ? "Subscribing…" : "Subscribe to the Playbook"}
      </Button>
    </form>
  );
}
