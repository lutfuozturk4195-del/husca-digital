/**
 * Blog category taxonomy — split out from lib/posts.ts (which pulls in
 * node:fs/node:path) so client components like the admin PostForm can
 * import just the category list without dragging server-only code into
 * the browser bundle.
 */
export const BLOG_CATEGORIES = [
  { id: "seo-geo-ai", label: "SEO & GEO-AI" },
  { id: "ecommerce", label: "E-commerce" },
] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number]["id"];

export function getCategoryLabel(id: string): string {
  return BLOG_CATEGORIES.find((category) => category.id === id)?.label ?? id;
}
