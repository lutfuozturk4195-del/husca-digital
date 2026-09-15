import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EntitySchema from "@/components/EntitySchema";
import SiteAnalytics from "@/components/SiteAnalytics";
import { siteConfig } from "@/lib/site-config";
import {
  faqPageSchema,
  jsonLdGraph,
  organizationSchema,
  professionalServiceSchema,
  websiteSchema,
} from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.knowsAbout,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "iSJJPwyUdIGTSSL-2WBNTUvCjTbV4aDG-FptImNmUDs",
  },
};

// Global entity graph: Organization + WebSite + ProfessionalService + FAQPage,
// all linked by @id so every page inherits one consistent knowledge graph
// instead of re-declaring the brand entity per page.
const globalGraph = jsonLdGraph(
  organizationSchema(),
  websiteSchema(),
  professionalServiceSchema(),
  faqPageSchema()
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        {/* Google Tag Manager (noscript) — kept right after <body> per Google's
            own placement guidance; the script tag itself loads via
            SiteAnalytics below. Unconditional (not gated to skip /admin) since
            it only fires with JS disabled, and /admin requires JS to work at
            all. */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <EntitySchema data={globalGraph} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SiteAnalytics />
      </body>
    </html>
  );
}
