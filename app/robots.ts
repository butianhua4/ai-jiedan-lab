import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: [
      `${site.url}/sitemap.xml`,
      `${site.url}/sitemap-priority.xml`,
      `${site.url}/sitemap-q.xml`,
      `${site.url}/sitemap-cluster.xml`,
      `${site.url}/sitemap-blog.xml`,
      `${site.url}/sitemap-static.xml`,
    ],
  };
}
