/**
 * Canonical site origin. Drives metadataBase, sitemap, robots, and JSON-LD —
 * never hardcode the domain elsewhere.
 *
 * Falls back to the production domain (not localhost) when NODE_ENV is
 * "production" so a missing NEXT_PUBLIC_SITE_URL in a deploy env can't
 * silently bake localhost into canonical/metadataBase URLs.
 */
const fallbackSiteUrl =
  process.env.NODE_ENV === "production" ? "https://thecoupleapp.com" : "http://localhost:3000";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
