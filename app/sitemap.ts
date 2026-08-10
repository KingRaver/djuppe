import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url;
  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
