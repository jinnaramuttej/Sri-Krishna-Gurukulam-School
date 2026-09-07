import type { MetadataRoute } from "next";
import { navLinks, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map((link) => ({
    url: `${site.url}${link.href}`,
    lastModified: new Date(),
    changeFrequency: link.href === "/" ? "weekly" : "monthly",
    priority: link.href === "/" ? 1 : link.href === "/admissions" ? 0.9 : 0.7,
  }));
}
