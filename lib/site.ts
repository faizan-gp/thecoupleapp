/**
 * Canonical site origin. Drives metadataBase, sitemap, robots, and JSON-LD —
 * never hardcode the domain elsewhere.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  ""
);

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
