import fs from "fs";
import path from "path";
import { site } from "@/data/site";

export type IntegrationSource = "env" | "code-default" | "public-file" | "missing";

export type SearchPlatformStatus = {
  generatedAt: string;
  analytics: {
    googleAnalytics: {
      configured: boolean;
      measurementId: string | null;
      source: IntegrationSource;
    };
    microsoftClarity: {
      configured: boolean;
      projectId: string | null;
      source: IntegrationSource;
    };
    cloudflareWebAnalytics: {
      configured: boolean;
      tokenPresent: boolean;
      source: IntegrationSource;
    };
  };
  search: {
    googleSearchConsole: {
      verificationFilePresent: boolean;
      metaVerificationConfigured: boolean;
      apiConnected: boolean;
      status: "verified_surface_present" | "meta_only" | "not_configured";
      note: string;
    };
    bingWebmasterTools: {
      metaVerificationConfigured: boolean;
      indexNowKeyFilePresent: boolean;
      apiConnected: boolean;
      status: "indexnow_surface_present" | "meta_only" | "not_configured";
      note: string;
    };
    ahrefsWebmasterTools: {
      metaVerificationConfigured: boolean;
      apiConnected: boolean;
      status: "meta_only" | "not_configured";
      note: string;
    };
  };
  sitemap: {
    canonicalUrl: string;
    sitemapIndexUrl: string;
    submittedFiles: string[];
  };
};

const defaultGoogleAnalyticsId = "G-BG3NQRLR64";
const defaultClarityProjectId = "x9c2phrvfy";

export function getSearchPlatformStatus(): SearchPlatformStatus {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || defaultGoogleAnalyticsId;
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || defaultClarityProjectId;
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || null;
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || null;
  const ahrefsVerification = process.env.NEXT_PUBLIC_AHREFS_SITE_VERIFICATION || null;
  const cloudflareToken = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN || null;

  const googleFilePresent = fileExists("public", "google9261e6722616fa13.html");
  const indexNowFilePresent = fileExists("public", "indexnow-4d7b5e9c9f2a4c7c8e7d2a6b3c1f0a9e.txt");

  return {
    generatedAt: new Date().toISOString(),
    analytics: {
      googleAnalytics: {
        configured: Boolean(googleAnalyticsId),
        measurementId: googleAnalyticsId || null,
        source: googleAnalyticsId
          ? process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
            ? "env"
            : "code-default"
          : "missing",
      },
      microsoftClarity: {
        configured: Boolean(clarityProjectId),
        projectId: clarityProjectId || null,
        source: clarityProjectId ? (process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ? "env" : "code-default") : "missing",
      },
      cloudflareWebAnalytics: {
        configured: Boolean(cloudflareToken),
        tokenPresent: Boolean(cloudflareToken),
        source: cloudflareToken ? "env" : "missing",
      },
    },
    search: {
      googleSearchConsole: {
        verificationFilePresent: googleFilePresent,
        metaVerificationConfigured: Boolean(googleVerification),
        apiConnected: false,
        status: googleFilePresent ? "verified_surface_present" : googleVerification ? "meta_only" : "not_configured",
        note: "GSC verification/indexing surface is detectable locally, but Search Console API import is not connected yet.",
      },
      bingWebmasterTools: {
        metaVerificationConfigured: Boolean(bingVerification),
        indexNowKeyFilePresent: indexNowFilePresent,
        apiConnected: false,
        status: indexNowFilePresent ? "indexnow_surface_present" : bingVerification ? "meta_only" : "not_configured",
        note: "Bing/IndexNow surface is detectable locally, but Bing Webmaster API import is not connected yet.",
      },
      ahrefsWebmasterTools: {
        metaVerificationConfigured: Boolean(ahrefsVerification),
        apiConnected: false,
        status: ahrefsVerification ? "meta_only" : "not_configured",
        note: "Ahrefs verification can be exposed by env meta tag; Ahrefs API metrics are not connected.",
      },
    },
    sitemap: {
      canonicalUrl: site.url,
      sitemapIndexUrl: `${site.url}/sitemap.xml`,
      submittedFiles: [
        `${site.url}/sitemap.xml`,
        `${site.url}/sitemap-blog.xml`,
        `${site.url}/sitemap-q.xml`,
        `${site.url}/sitemap-cluster.xml`,
        `${site.url}/sitemap-priority.xml`,
      ],
    },
  };
}

function fileExists(...parts: string[]) {
  return fs.existsSync(path.join(/* turbopackIgnore: true */ process.cwd(), ...parts));
}
