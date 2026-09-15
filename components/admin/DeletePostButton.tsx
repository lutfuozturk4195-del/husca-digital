"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DeletePostButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        alert(data.error ?? "Delete failed");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleDelete}
      disabled={loading}
      variant="ghost"
      size="sm"
      className="h-auto p-0 font-medium text-destructive hover:bg-transparent hover:text-destructive hover:underline"
    >
      {loading ? "Deleting…" : "Delete"}
    </Button>
  );
}
