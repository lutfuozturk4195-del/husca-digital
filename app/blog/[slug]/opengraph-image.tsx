import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

// See app/opengraph-image.tsx for why this is forced dynamic (Windows-local
// next/og build quirk — harmless, Vercel's Linux build renders it normally).
export const dynamic = "force-dynamic";

export const alt = "Husca Digital — GEO Playbook";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  const title = post?.title ?? siteConfig.name;
  const tag = post?.tags?.[0] ?? siteConfig.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #05050a 0%, #12121f 55%, #0b0b14 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 11,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg,#8b8ff9,#5ee6d0)",
              fontSize: 22,
              fontWeight: 700,
              color: "#05050a",
            }}
          >
            H
          </div>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 600, color: "#f5f5fa" }}>
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 54,
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#f5f5fa",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#5ee6d0",
            textTransform: "uppercase",
            letterSpacing: 2,
            fontWeight: 600,
          }}
        >
          {tag} · GEO Playbook
        </div>
      </div>
    ),
    { ...size }
  );
}
