"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <p className="text-sm font-medium text-cyan-600">
        ✓ You&rsquo;re on the list — we&rsquo;ll only email when there&rsquo;s something worth reading.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2 sm:flex-row">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <Input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        aria-label="Email address"
        className="h-10 flex-1 rounded-xl px-4"
      />
      <Button type="submit" disabled={status === "submitting"} variant="secondary" className="h-10 rounded-xl px-5">
        {status === "submitting" ? "Subscribing…" : "Subscribe"}
      </Button>
      {errorMessage && (
        <p role="alert" className="text-xs font-medium text-destructive sm:basis-full">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
