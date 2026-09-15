"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

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

const inputClass =
  "w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-accent-400/60 focus:ring-2 focus:ring-accent-400/20";
const labelClass = "mb-1.5 block text-xs font-medium text-white/60";

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
          <label className={labelClass}>Title</label>
          <input
            required
            value={values.title}
            onChange={(event) => {
              const title = event.target.value;
              update("title", title);
              if (!slugTouched) update("slug", slugify(title));
            }}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input
            required
            value={values.slug}
            onChange={(event) => {
              setSlugTouched(true);
              update("slug", slugify(event.target.value));
            }}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Excerpt / Description</label>
        <textarea
          required
          rows={2}
          value={values.description}
          onChange={(event) => update("description", event.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Direct Answer (the answer-first callout at the top of the post)</label>
        <textarea
          required
          rows={2}
          value={values.answer}
          onChange={(event) => update("answer", event.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Date</label>
          <input
            required
            type="date"
            value={values.date}
            onChange={(event) => update("date", event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Author</label>
          <input
            required
            value={values.author}
            onChange={(event) => update("author", event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select
            value={values.status}
            onChange={(event) => update("status", event.target.value as "draft" | "published")}
            className={inputClass}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Tags (comma-separated)</label>
        <input
          value={values.tags}
          onChange={(event) => update("tags", event.target.value)}
          placeholder="GEO, AI Search"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Content (Markdown)</label>
        <textarea
          required
          rows={18}
          value={values.content}
          onChange={(event) => update("content", event.target.value)}
          spellCheck={false}
          className={`${inputClass} font-mono text-sm`}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-400">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-full bg-gradient-to-r from-accent-500 to-cyan-400 px-6 py-2.5 text-sm font-semibold text-ink-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "saving" ? "Saving…" : mode === "create" ? "Create Post" : "Save Changes"}
        </button>
        <span className="text-xs text-white/35">
          On the live site this commits to GitHub and redeploys — live in ~30-60s.
        </span>
      </div>
    </form>
  );
}
