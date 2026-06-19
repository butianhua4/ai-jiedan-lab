import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { defaultOgImages, seoDescription } from "@/lib/seo-metadata";

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
const ahrefsSiteVerification = process.env.NEXT_PUBLIC_AHREFS_SITE_VERIFICATION;
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "G-BG3NQRLR64";
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "x9c2phrvfy";
const cloudflareWebAnalyticsToken = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN;

const extraVerification = {
  ...(bingSiteVerification ? { "msvalidate.01": bingSiteVerification } : {}),
  ...(ahrefsSiteVerification ? { "ahrefs-site-verification": ahrefsSiteVerification } : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.englishName}`,
  },
  description: seoDescription(site.description),
  alternates: {
    languages: {
      "zh-CN": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: `${site.name} / ${site.englishName}`,
    description: seoDescription(site.englishDescription),
    url: "/",
    siteName: site.englishName,
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    type: "website",
    images: defaultOgImages,
  },
  twitter: {
    card: "summary_large_image",
    title: site.englishName,
    description: seoDescription(site.englishDescription),
    images: [site.ogImage],
  },
  icons: {
    icon: "/favicon.svg",
  },
  ...(googleSiteVerification || Object.keys(extraVerification).length
    ? {
        verification: {
          ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
          ...(Object.keys(extraVerification).length ? { other: extraVerification } : {}),
        },
      }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        {googleAnalyticsId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');
`}
            </Script>
          </>
        ) : null}
        {clarityProjectId ? (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityProjectId}");
`}
          </Script>
        ) : null}
        {cloudflareWebAnalyticsToken ? (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            strategy="afterInteractive"
            data-cf-beacon={JSON.stringify({ token: cloudflareWebAnalyticsToken })}
          />
        ) : null}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: site.name,
            alternateName: [site.englishName, "AI Deployment Guide", "AI Agent Guide"],
            url: site.url,
            inLanguage: site.languages,
            audience: {
              "@type": "Audience",
              geographicArea: [
                { "@type": "Country", name: "United States" },
                { "@type": "AdministrativeArea", name: "Global English-speaking market" },
              ],
            },
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
