import { sitemapIndex } from "@/lib/sitemap-xml";

export function GET() {
  return sitemapIndex(["/sitemap-priority.xml", "/sitemap-q.xml", "/sitemap-cluster.xml", "/sitemap-blog.xml", "/sitemap-static.xml"]);
}
