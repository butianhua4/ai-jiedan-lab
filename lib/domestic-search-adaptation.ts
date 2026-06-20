import { site } from "@/data/site";
import { getSearchPlatformStatus } from "@/lib/search-platform-status";
import { getSeoGrowthReport } from "@/lib/seo-growth-monitor";

export type DomesticSearchAdaptationPlan = {
  generatedAt: string;
  strategicDecision: {
    primaryMarket: "US/global";
    secondaryMarket: "China";
    recommendation: string;
    reason: string;
  };
  currentState: {
    canonicalDomain: string;
    qPages: number;
    blogPages: number;
    clusterPages: number;
    orphanPages: number;
    internalLinkHealth: number;
    bingStatus: string;
    googleAnalyticsConfigured: boolean;
    microsoftClarityConfigured: boolean;
  };
  chinaSearchRisks: Array<{ risk: string; impact: "high" | "medium" | "low"; response: string }>;
  platformChecklist: Array<{ platform: string; purpose: string; status: "ready" | "optional" | "manual" | "not_now"; action: string }>;
  domainOptions: Array<{ option: string; fit: "recommended" | "optional" | "avoid_now"; notes: string[] }>;
  nextActions: string[];
};

export function getDomesticSearchAdaptationPlan(): DomesticSearchAdaptationPlan {
  const growth = getSeoGrowthReport();
  const platforms = getSearchPlatformStatus();

  return {
    generatedAt: new Date().toISOString(),
    strategicDecision: {
      primaryMarket: "US/global",
      secondaryMarket: "China",
      recommendation: "Keep US/global search as the primary growth lane, and treat China search as an optional mirror/distribution lane until a mainland-accessible deployment exists.",
      reason:
        "The live site is built around Vercel/custom-domain deployment and English/technical problem queries. Mainland search access can be inconsistent for Vercel-hosted assets, so forcing China-first indexing now would add operational complexity before the Google/Bing surface matures.",
    },
    currentState: {
      canonicalDomain: site.url,
      qPages: growth.qPages,
      blogPages: growth.blogPages,
      clusterPages: growth.clusterPages,
      orphanPages: growth.orphanPages,
      internalLinkHealth: growth.internalLinkHealth,
      bingStatus: platforms.search.bingWebmasterTools.status,
      googleAnalyticsConfigured: platforms.analytics.googleAnalytics.configured,
      microsoftClarityConfigured: platforms.analytics.microsoftClarity.configured,
    },
    chinaSearchRisks: [
      {
        risk: "Mainland crawlers may not reliably reach Vercel-hosted pages.",
        impact: "high",
        response: "Do not promise Baidu/360/Sogou indexing from the current deployment. If China becomes primary, deploy a China-accessible mirror on a compliant host and use canonical strategy carefully.",
      },
      {
        risk: "Duplicate domain mirrors can split authority if canonicals and sitemap ownership are unclear.",
        impact: "high",
        response: "Keep one canonical domain for Google/Bing now. If a China mirror is added, decide whether it is an alternate language/regional mirror or a separate product surface before submitting sitemaps.",
      },
      {
        risk: "Domestic platforms require more manual verification and may not value the same English problem queries.",
        impact: "medium",
        response: "Prioritize Chinese landing/category pages only after real Google/Bing crawl and impression signals exist.",
      },
      {
        risk: "Analytics scripts can be blocked or delayed in some regions.",
        impact: "medium",
        response: "Use server-side logs and platform dashboards as the source of truth; do not infer traffic from missing GA/Clarity data.",
      },
    ],
    platformChecklist: [
      {
        platform: "Bing Webmaster Tools",
        purpose: "Bing discovery, IndexNow, sitemap processing, and Microsoft Copilot/AI visibility signals.",
        status: "ready",
        action: "Keep /sitemap.xml submitted, refresh IndexNow readiness daily, and submit priority q/cluster URLs in small reviewed batches.",
      },
      {
        platform: "Google Search Console",
        purpose: "Primary search validation for the current canonical domain.",
        status: "manual",
        action: "Continue daily URL Inspection for 5-15 priority q/cluster URLs and record confirmed submissions locally.",
      },
      {
        platform: "Baidu Webmaster",
        purpose: "China mainland search discovery if a mainland-accessible deployment is created.",
        status: "not_now",
        action: "Register only after deciding a China-accessible domain or mirror. Do not submit the current Vercel-hosted surface as a guaranteed mainland SEO asset.",
      },
      {
        platform: "360 Search / Sogou",
        purpose: "Secondary domestic discovery.",
        status: "optional",
        action: "Defer until Baidu/domain strategy is clear. These should not distract from Google/Bing early growth.",
      },
      {
        platform: "Microsoft Clarity",
        purpose: "Behavior observation after visitors arrive.",
        status: platforms.analytics.microsoftClarity.configured ? "ready" : "manual",
        action: "Use heatmaps/session recordings after real visits appear; do not use it as an indexing signal.",
      },
    ],
    domainOptions: [
      {
        option: "Keep ai.aporet.com as canonical",
        fit: "recommended",
        notes: [
          "Best for current Google/Bing momentum.",
          "Avoids splitting authority while the site is still early in indexing.",
          "Matches existing sitemap and Search Console setup.",
        ],
      },
      {
        option: "Add a China-accessible mirror later",
        fit: "optional",
        notes: [
          "Useful only if China becomes a serious acquisition channel.",
          "Requires careful canonical, hreflang/regional copy, sitemap, and analytics separation.",
          "Should be tested with live crawler/access checks before submission.",
        ],
      },
      {
        option: "Move canonical domain immediately to a new mainland-oriented host",
        fit: "avoid_now",
        notes: [
          "High migration risk while Google/Bing has just started processing the new domain.",
          "Can reset or delay search signals.",
          "Not needed for the current US/global target market.",
        ],
      },
    ],
    nextActions: [
      "Keep Google/Bing as the primary indexing loop for the next 2-4 weeks.",
      "Use Bing IndexNow for reviewed q/cluster batches, not unreviewed bulk pushes.",
      "Do not register Baidu/360/Sogou until a China-accessible deployment decision is made.",
      "Prepare a small Chinese regional landing page plan only after GSC/Bing impressions identify winning topics.",
      "If using a subdomain on the existing aporet.com domain, keep ai.aporet.com canonical and avoid redirect experiments during early indexing.",
    ],
  };
}
