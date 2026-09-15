"use client";

import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";

/**
 * Wraps @vercel/analytics so /admin visits (i.e. the site owner using their
 * own dashboard/CMS) don't get counted as public traffic.
 */
export default function SiteAnalytics() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <Analytics />;
}
