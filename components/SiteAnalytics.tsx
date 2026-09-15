"use client";

import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Wraps Vercel Web Analytics + Google Analytics 4 + Google Tag Manager so
 * /admin visits (the site owner using their own dashboard/CMS) don't get
 * counted as public traffic. Each Google tag only renders when its env var
 * is set, so leaving one unset locally just skips it entirely.
 */
export default function SiteAnalytics() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <>
      <Analytics />
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
    </>
  );
}
