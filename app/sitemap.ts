import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://djuppe.example";
  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
