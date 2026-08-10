import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: "DJUPPE",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#07090a",
    theme_color: "#07090a",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png", purpose: "any" },
      { src: "/icons/any-512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-192", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
