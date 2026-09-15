"use client";

import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Wraps Vercel Web Analytics + Google Analytics 4 so /admin visits (the
 * site owner using their own dashboard/CMS) don't get counted as public
 * traffic. GoogleAnalytics only renders when NEXT_PUBLIC_GA_MEASUREMENT_ID
 * is set, so leaving it unset locally just skips gtag entirely.
 */
export default function SiteAnalytics() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <Analytics />
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </>
  );
}
