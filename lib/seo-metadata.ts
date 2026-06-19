import { site } from "@/data/site";

export const defaultOgImages = [
  {
    url: site.ogImage,
    width: 1200,
    height: 630,
    alt: `${site.englishName} search guide`,
  },
];

const minimumDescriptionLength = 150;
const fallbackSuffix =
  " Includes practical steps, risk checks, related questions, and deeper AI deployment or automation guidance for search-driven builders.";

export function seoDescription(description: string, context?: string) {
  const clean = description.trim();
  if (clean.length >= minimumDescriptionLength) return clean;

  const extra = context?.trim() || fallbackSuffix;
  const combined = `${clean} ${extra}`.replace(/\s+/g, " ").trim();
  return combined.length >= minimumDescriptionLength ? combined : `${combined}${fallbackSuffix}`;
}

