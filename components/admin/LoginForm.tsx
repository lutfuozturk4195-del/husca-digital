"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Login failed");
      }

      const next = searchParams.get("next") ?? "/admin/dashboard";
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.02] p-8"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-400 to-cyan-400 text-sm font-bold text-ink-950">
          H
        </span>
        <span className="text-base font-semibold text-white">Husca Digital Admin</span>
      </div>

      <label htmlFor="password" className="mt-6 block text-xs font-medium text-white/50">
        Password
      </label>
      <input
        id="password"
        type="password"
        autoFocus
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white outline-none focus:border-accent-400/60 focus:ring-2 focus:ring-accent-400/20"
      />

      {error && (
        <p role="alert" className="mt-3 text-xs font-medium text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-gradient-to-r from-accent-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
