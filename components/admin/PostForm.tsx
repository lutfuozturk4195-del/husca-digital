"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type PostFormValues = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  /** Comma-separated in the form; split into an array on submit. */
  tags: string;
  answer: string;
  status: "draft" | "published";
  content: string;
};

const DEFAULT_VALUES: PostFormValues = {
  slug: "",
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  author: "Husca Digital Team",
  tags: "",
  answer: "",
  status: "draft",
  content: "",
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostForm({
  mode,
  initialValues,
}: {
  mode: "create" | "edit";
  initialValues?: PostFormValues;
}) {
  const router = useRouter();
  const [values, setValues] = useState<PostFormValues>(initialValues ?? DEFAULT_VALUES);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  function update<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("saving");
    setError("");

    const payload = {
      ...values,
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      const url = mode === "create" ? "/api/admin/posts" : `/api/admin/posts/${initialValues!.slug}`;
      const method = mode === "create" ? "POST" : "PUT";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Save failed");
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="title" className="mb-1.5 text-xs font-medium text-muted-foreground">
            Title
          </Label>
          <Input
            id="title"
            required
            value={values.title}
            onChange={(event) => {
              const title = event.target.value;
              update("title", title);
              if (!slugTouched) update("slug", slugify(title));
            }}
            className="h-10 rounded-xl px-4"
          />
        </div>
        <div>
          <Label htmlFor="slug" className="mb-1.5 text-xs font-medium text-muted-foreground">
            Slug
          </Label>
          <Input
            id="slug"
            required
            value={values.slug}
            onChange={(event) => {
              setSlugTouched(true);
              update("slug", slugify(event.target.value));
            }}
            className="h-10 rounded-xl px-4 font-mono text-sm"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description" className="mb-1.5 text-xs font-medium text-muted-foreground">
          Excerpt / Description
        </Label>
        <Textarea
          id="description"
          required
          rows={2}
          value={values.description}
          onChange={(event) => update("description", event.target.value)}
          className="rounded-xl px-4 py-3"
        />
      </div>

      <div>
        <Label htmlFor="answer" className="mb-1.5 text-xs font-medium text-muted-foreground">
          Direct Answer (the answer-first callout at the top of the post)
        </Label>
        <Textarea
          id="answer"
          required
          rows={2}
          value={values.answer}
          onChange={(event) => update("answer", event.target.value)}
          className="rounded-xl px-4 py-3"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <Label htmlFor="date" className="mb-1.5 text-xs font-medium text-muted-foreground">
            Date
          </Label>
          <Input
            id="date"
            required
            type="date"
            value={values.date}
            onChange={(event) => update("date", event.target.value)}
            className="h-10 rounded-xl px-4"
          />
        </div>
        <div>
          <Label htmlFor="author" className="mb-1.5 text-xs font-medium text-muted-foreground">
            Author
          </Label>
          <Input
            id="author"
            required
            value={values.author}
            onChange={(event) => update("author", event.target.value)}
            className="h-10 rounded-xl px-4"
          />
        </div>
        <div>
          <Label className="mb-1.5 text-xs font-medium text-muted-foreground">Status</Label>
          <Select
            value={values.status}
            onValueChange={(value) => update("status", value as "draft" | "published")}
          >
            <SelectTrigger className="h-10 w-full rounded-xl px-4">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="tags" className="mb-1.5 text-xs font-medium text-muted-foreground">
          Tags (comma-separated)
        </Label>
        <Input
          id="tags"
          value={values.tags}
          onChange={(event) => update("tags", event.target.value)}
          placeholder="GEO, AI Search"
          className="h-10 rounded-xl px-4"
        />
      </div>

      <div>
        <Label htmlFor="content" className="mb-1.5 text-xs font-medium text-muted-foreground">
          Content (Markdown)
        </Label>
        <Textarea
          id="content"
          required
          rows={18}
          value={values.content}
          onChange={(event) => update("content", event.target.value)}
          spellCheck={false}
          className="rounded-xl px-4 py-3 font-mono text-sm"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          disabled={status === "saving"}
          size="lg"
          className="h-10 rounded-full px-6 text-sm"
        >
          {status === "saving" ? "Saving…" : mode === "create" ? "Create Post" : "Save Changes"}
        </Button>
        <span className="text-xs text-muted-foreground">
          On the live site this commits to GitHub and redeploys — live in ~30-60s.
        </span>
      </div>
    </form>
  );
}
