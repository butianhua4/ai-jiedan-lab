import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

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
