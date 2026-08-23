import { getAllApps, localized } from "@/lib/apps";
import { defaultLocale } from "@/lib/i18n/locales";
import { absoluteUrl } from "@/lib/site";

/**
 * App-release feed. One item per app in the catalog, newest release first, so
 * readers can follow the library as it grows. English-only: a feed reader has
 * no locale to negotiate against, so it points at the x-default (/en) pages.
 *
 * Lives at /feed.xml — the dot in the filename keeps it out of proxy.ts's
 * locale matcher.
 */

const FEED_TITLE = "TheCoupleApp — new apps for couples";
const FEED_DESCRIPTION =
  "New and upcoming apps in the TheCoupleApp library — one focused app per problem couples actually have.";

/** XML text escaping; every interpolated value below goes through this. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = getAllApps()
    .filter((app) => app.releaseDate)
    .sort((a, b) => (a.releaseDate! < b.releaseDate! ? 1 : -1));

  const lastBuildDate = new Date().toUTCString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${escapeXml(absoluteUrl(`/${defaultLocale}`))}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>${defaultLocale}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(absoluteUrl("/feed.xml"))}" rel="self" type="application/rss+xml" />
${items
  .map((app) => {
    const url = absoluteUrl(`/${defaultLocale}/apps/${app.slug}`);
    return `    <item>
      <title>${escapeXml(app.name)} — ${escapeXml(localized(app.tagline, defaultLocale))}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(app.releaseDate!).toUTCString()}</pubDate>
      <description>${escapeXml(localized(app.description, defaultLocale))}</description>
    </item>`;
  })
  .join("\n")}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export const dynamic = "force-static";
