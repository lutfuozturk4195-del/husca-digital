import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

// Forces this route to render on-demand instead of at build time. The
// underlying image renderer (next/og -> @vercel/og) has a known bug on
// native Windows builds (path-separator handling breaks its internal
// file:// URL resolution) that only surfaces when the route actually
// executes — force-dynamic keeps `next build` from touching it locally.
// Vercel's build/runtime is Linux, so this executes normally in production.
export const dynamic = "force-dynamic";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #05050a 0%, #12121f 55%, #0b0b14 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg,#8b8ff9,#5ee6d0)",
              fontSize: 28,
              fontWeight: 700,
              color: "#05050a",
            }}
          >
            H
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#f5f5fa" }}>
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 980,
            color: "#f5f5fa",
          }}
        >
          {siteConfig.valueProposition}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            color: "#a5a5c0",
            maxWidth: 900,
          }}
        >
          GEO &amp; AI Search Growth Agency — US B2B SaaS
        </div>
      </div>
    ),
    { ...size }
  );
}
