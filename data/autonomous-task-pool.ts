export type AutonomousTaskType = "seo" | "conversion" | "tool" | "content" | "monitoring" | "ux";
export type AutonomousTaskPriority = "P0" | "P1" | "P2" | "P3" | "P4" | "P5";
export type AutonomousRiskLevel = "low" | "medium" | "high";

export type AutonomousTask = {
  id: string;
  type: AutonomousTaskType;
  priority: AutonomousTaskPriority;
  title: string;
  reason: string;
  expectedImpact: string;
  riskLevel: AutonomousRiskLevel;
  allowedToAutoExecute: boolean;
  executionKind: "report" | "source-change" | "manual-only";
};

export const autonomousTaskPool: AutonomousTask[] = [
  seoTask("seo-q-title-template", "Optimize q page title template", "Improve query-page search snippets.", "Higher relevance for problem-first queries."),
  seoTask("seo-q-description-template", "Optimize q page description template", "Improve query-page meta descriptions.", "Clearer SERP summaries and better CTR."),
  seoTask("seo-q-faq-jsonld", "Add q page FAQ JSON-LD", "Expose concise problem/solution pairs to search engines.", "Better eligibility for rich results."),
  seoTask("seo-cluster-breadcrumb-jsonld", "Add cluster page Breadcrumb JSON-LD", "Clarify cluster hierarchy.", "Cleaner entity and navigation signals."),
  seoTask("seo-related-q-links", "Strengthen related q links", "Increase q-to-q discovery depth.", "More crawl paths across similar problems."),
  seoTask("seo-blog-to-q-links", "Strengthen blog to q links", "Move authority from deep articles to query entry pages.", "Better q page discovery and authority flow."),
  seoTask("seo-sitemap-priority-changefreq", "Add sitemap priority and changefreq", "Make sitemap intent clearer for q, cluster, and blog pages.", "Better crawl prioritization hints."),
  seoTask("seo-robots-check", "Add robots check", "Catch accidental crawl blocking.", "Lower indexability risk."),
  seoTask("seo-canonical-check", "Add canonical check", "Catch duplicate or missing canonical issues.", "Lower duplicate-content risk."),
  seoTask("seo-indexability-report", "Add indexability report", "Create an auditable indexability queue.", "Faster diagnosis of pages that should be submitted."),
  conversionTask("conversion-services-page", "Add /services service page", "The site has SEO pages but needs a clearer monetization entry.", "Visitors can understand what can be bought without hurting SEO.", "source-change"),
  conversionTask("conversion-hire-me-page", "Add /hire-me page", "Add a direct lead capture destination.", "More obvious service intent for qualified visitors.", "source-change"),
  conversionTask("conversion-error-help-form", "Add error help form UI", "Turn error-search traffic into support leads.", "Higher conversion from problem pages."),
  conversionTask("conversion-fix-this-error-cta", "Add fix this error CTA", "Add contextual CTA on error pages.", "Better lead capture from urgent queries."),
  conversionTask("conversion-build-seo-site-cta", "Add build same SEO tool site CTA", "Offer the project pattern as a service.", "Monetization path for site builders."),
  conversionTask("conversion-template-download-guide", "Add template download guidance", "Improve template funnel clarity.", "Better template engagement."),
  conversionTask("conversion-newsletter-placeholder", "Add newsletter placeholder", "Reserve a low-friction audience capture point.", "Future list-building without blocking current UX."),
  conversionTask("conversion-affiliate-slot", "Add tool recommendation affiliate slot", "Create a compliant future affiliate area.", "Future monetization without rewriting pages."),
  conversionTask("conversion-pricing-section", "Add pricing section", "Clarify service price ranges.", "Reduce buyer uncertainty."),
  conversionTask("conversion-case-study-placeholder", "Add case study placeholder page", "Create a place for proof once results exist.", "Future trust-building."),
  toolTask("tool-proposal-generator-upgrade", "Enhance Proposal Generator", "Improve the strongest existing freelancing tool.", "Better repeat use and lead value."),
  toolTask("tool-error-explainer-upgrade", "Enhance Error Explainer", "Improve the strongest error-query conversion tool.", "Better match for troubleshooting traffic."),
  toolTask("tool-title-generator", "Add Title Generator", "Help users improve SEO snippets.", "Useful tool aligned with current SEO traffic."),
  toolTask("tool-meta-description-generator", "Add Meta Description Generator", "Help users improve descriptions.", "Useful tool aligned with CTR optimization."),
  toolTask("tool-sitemap-url-checker", "Add Sitemap URL Checker", "Give users a simple sitemap diagnostic.", "Tool-led SEO traffic and utility."),
  toolTask("tool-robots-checker", "Add Robots.txt Checker", "Give users a simple crawlability diagnostic.", "Tool-led SEO traffic and utility."),
  toolTask("tool-canonical-checker", "Add Canonical Checker", "Give users a canonical diagnostic.", "Tool-led SEO traffic and utility."),
  toolTask("tool-internal-link-checker", "Add Internal Link Checker", "Give users an internal-link diagnostic.", "Tool-led SEO traffic and utility."),
  toolTask("tool-upwork-rate-calculator", "Add Upwork Rate Calculator", "Support freelancing monetization queries.", "Better commercial-intent traffic capture."),
  toolTask("tool-ai-comparison-builder", "Add AI Tool Comparison Builder", "Support AI tool comparison workflows.", "Better comparison-intent traffic capture."),
  contentTask("content-english-q-draft-plan", "Generate English q page draft framework", "Prepare international expansion without publishing.", "Faster US-market growth when ready."),
  contentTask("content-quality-sampling-report", "Generate content quality sampling report", "Audit quality without rewriting everything.", "Safer content improvement queue."),
  contentTask("content-high-potential-keywords", "Generate high-potential keyword list", "Prioritize concrete problem queries.", "Better editorial focus."),
  contentTask("content-dead-page-improvements", "Generate dead page improvement suggestions", "Prepare fixes for pages without signals.", "Reduce wasted crawl budget over time."),
  contentTask("content-top-50-q-optimization", "Generate top 50 q page optimization list", "Focus on the highest-value q pages.", "Better CTR and indexing readiness."),
  contentTask("content-cn-to-en-expansion-plan", "Generate Chinese to English expansion plan", "Prepare US-market structure.", "International SEO readiness."),
  contentTask("content-cn-search-adaptation-plan", "Generate domestic search adaptation plan", "Handle China access/search differences without DNS changes.", "Lower domestic discoverability risk."),
  contentTask("content-bing-indexnow-plan", "Generate Bing IndexNow push plan", "Make Bing submission auditable.", "Faster Bing discovery."),
  contentTask("content-gsc-manual-indexing-list", "Generate GSC manual indexing list", "Keep manual requests focused.", "Faster Google discovery of priority pages."),
  contentTask("content-next-1000-q-plan", "Generate next 1000 q pages plan without publishing", "Prepare scale without low-quality bulk publishing.", "Controlled scale planning."),
  monitoringTask("monitoring-ga-clarity-status", "Add GA/Clarity detection status", "Verify behavior tools are installed and ready.", "Better confidence in post-click measurement."),
  monitoringTask("monitoring-gsc-bing-placeholders", "Add GSC/Bing data placeholders", "Reserve real import points without fake data.", "Cleaner future data integration."),
  monitoringTask("monitoring-gsc-import-placeholder", "Add Search Console data import script placeholder", "Define the expected CSV/API import shape.", "Faster future GSC ingestion."),
  monitoringTask("monitoring-traffic-report-page", "Add traffic report page", "Make traffic signals visible once imported.", "Better operating visibility."),
  monitoringTask("monitoring-conversion-report-page", "Add conversion report page", "Make monetization signals visible once tracked.", "Better operating visibility."),
  uxTask("ux-home-hero-cta", "Optimize home first-screen CTA", "Clarify what visitors should do next.", "Better engagement from first visit."),
  uxTask("ux-tools-navigation", "Optimize tools navigation", "Make utility pages easier to scan.", "More tool usage."),
  uxTask("ux-mobile-article-reading", "Optimize mobile article reading", "Improve q and blog readability on phones.", "Better engagement and lower bounce."),
  uxTask("ux-q-page-readability", "Optimize q page readability", "Make problem pages easier to skim.", "Better user satisfaction and conversion."),
  uxTask("ux-template-conversion-layout", "Optimize template page conversion layout", "Make downloads and next steps clearer.", "Better conversion from template traffic."),
];

function seoTask(id: string, title: string, reason: string, expectedImpact: string): AutonomousTask {
  return baseTask(id, "seo", "P1", title, reason, expectedImpact);
}

function conversionTask(id: string, title: string, reason: string, expectedImpact: string, executionKind: AutonomousTask["executionKind"] = "report"): AutonomousTask {
  return baseTask(id, "conversion", "P2", title, reason, expectedImpact, "low", executionKind, true);
}

function toolTask(id: string, title: string, reason: string, expectedImpact: string): AutonomousTask {
  return baseTask(id, "tool", "P3", title, reason, expectedImpact, "medium", "manual-only", false);
}

function contentTask(id: string, title: string, reason: string, expectedImpact: string): AutonomousTask {
  return baseTask(id, "content", "P4", title, reason, expectedImpact, "low", "report", true);
}

function monitoringTask(id: string, title: string, reason: string, expectedImpact: string): AutonomousTask {
  return baseTask(id, "monitoring", "P1", title, reason, expectedImpact);
}

function uxTask(id: string, title: string, reason: string, expectedImpact: string): AutonomousTask {
  return baseTask(id, "ux", "P5", title, reason, expectedImpact, "medium", "manual-only", false);
}

function baseTask(
  id: string,
  type: AutonomousTaskType,
  priority: AutonomousTaskPriority,
  title: string,
  reason: string,
  expectedImpact: string,
  riskLevel: AutonomousRiskLevel = "low",
  executionKind: AutonomousTask["executionKind"] = "report",
  allowedToAutoExecute = true,
): AutonomousTask {
  return { id, type, priority, title, reason, expectedImpact, riskLevel, allowedToAutoExecute, executionKind };
}
