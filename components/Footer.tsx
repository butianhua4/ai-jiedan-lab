import Link from "next/link";

const footerLinks = [
  ["/about", "About"],
  ["/contact", "Contact"],
  ["/privacy", "Privacy"],
  ["/terms", "Terms"],
  ["/disclaimer", "Disclaimer"],
  ["/docs", "Docs"],
  ["/monetization", "Monetization"],
  ["/sitemap.xml", "Sitemap"],
];

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-gray-50">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 text-sm text-gray-600 md:grid-cols-2">
        <p>
          © 2026 AI Tools Guide. Educational AI workflow, deployment, and troubleshooting content for real search problems.
        </p>
        <div className="flex flex-wrap gap-4 md:justify-end">
          {footerLinks.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-brand">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
