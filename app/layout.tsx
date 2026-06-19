import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "G-BG3NQRLR64";
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "x9c2phrvfy";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.englishName}`,
  },
  description: site.description,
  alternates: {
    languages: {
      "zh-CN": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: `${site.name} / ${site.englishName}`,
    description: site.englishDescription,
    url: "/",
    siteName: site.englishName,
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.englishName,
    description: site.englishDescription,
  },
  icons: {
    icon: "/favicon.svg",
  },
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
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
