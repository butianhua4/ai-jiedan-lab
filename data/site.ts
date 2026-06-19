const canonicalUrl = "https://ai.aporet.com";
const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
const siteUrl =
  envSiteUrl && !envSiteUrl.includes("ai-jiedan-lab.vercel.app") ? envSiteUrl : canonicalUrl;

export const site = {
  name: "AI Tools Guide",
  englishName: "AI Tools Guide",
  url: siteUrl,
  description:
    "Practical AI deployment, agent, RAG, prompt, automation, and troubleshooting guides for builders targeting Google search in the United States and global English-speaking markets.",
  englishDescription:
    "Practical AI deployment, agent, RAG, prompt, automation, and troubleshooting guides for builders targeting Google search in the United States and global English-speaking markets.",
  ogImage: "/og-image.svg",
  author: "AI Tools Guide",
  email: "hello@example.com",
  targetMarkets: ["US", "global"],
  languages: ["zh-CN", "en-US"],
};
