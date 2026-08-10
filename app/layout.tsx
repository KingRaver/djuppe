import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s — DJUPPE",
  },
  description: site.description,
  keywords: ["Djuppe", "metal sculpture", "fabrication", "industrial design", "kinetic sculpture", "Athens"],
  authors: [{ name: "Djuppe" }],
  creator: "Djuppe",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DJUPPE",
    url: "/",
    title: site.title,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DJUPPE — Metal, Given Intent" }],
  },
  // WhatsApp reads the apple-touch icon when it cannot fetch og:image in time.
  appleWebApp: { title: "DJUPPE", statusBarStyle: "black-translucent", capable: true },
  // Only the card type is pinned here. Hardcoding twitter title/description/images
  // made them override every child route, so project pages advertised the homepage
  // card to X while sending their own to WhatsApp and Telegram. Left unset, Next
  // fills them from each route's own title, description and opengraph-image file.
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#07090a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-200 -translate-y-20 bg-white px-4 py-3 font-mono text-xs text-black focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
