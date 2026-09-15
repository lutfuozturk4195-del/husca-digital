"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant="ghost"
      size="sm"
      className="h-auto justify-start p-0 text-xs font-medium text-muted-foreground hover:bg-transparent hover:text-foreground"
    >
      {loading ? "Signing out…" : "Sign out"}
    </Button>
  );
}
