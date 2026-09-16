"use client";

import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Wraps Vercel Web Analytics + Google Tag Manager so /admin visits (the site
 * owner using their own dashboard/CMS) don't get counted as public traffic.
 *
 * GA4 is NOT loaded directly here — it previously was (gtag.js) alongside
 * GTM (gtm.js), which double-loaded Google's analytics scripts (~175KB +
 * 550ms of main-thread blocking on top of GTM's own ~120KB/160ms) and
 * dragged the mobile PageSpeed score down. GA4 now needs to be configured
 * as a "Google Analytics: GA4 Configuration" tag inside the GTM container
 * (tagmanager.google.com) instead, so there's a single script doing the job.
 */
export default function SiteAnalytics() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <>
      <Analytics />
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
    </>
  );
}
