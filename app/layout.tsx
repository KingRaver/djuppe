import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://djuppe.example"),
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
    title: site.title,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DJUPPE — Metal, Given Intent" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image"],
  },
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
          className="fixed left-4 top-3 z-[200] -translate-y-20 bg-white px-4 py-3 font-mono text-xs text-black focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
