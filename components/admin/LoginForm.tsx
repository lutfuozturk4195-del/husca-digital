"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="w-full max-w-sm rounded-2xl border-border p-2 shadow-sm ring-0">
      <CardContent className="px-6 py-6">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500 to-cyan-400 text-sm font-bold text-white">
              H
            </span>
            <span className="text-base font-semibold text-foreground">Husca Digital Admin</span>
          </div>

          <Label htmlFor="password" className="mt-6 mb-1.5 text-xs font-medium text-muted-foreground">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            autoFocus
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-10 rounded-xl px-4"
          />

          {error && (
            <p role="alert" className="mt-3 text-xs font-medium text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" disabled={loading} size="lg" className="mt-5 h-10 w-full rounded-xl text-sm">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
