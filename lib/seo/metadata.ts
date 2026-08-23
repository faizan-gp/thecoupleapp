import type { Metadata } from "next";

import { defaultLocale, localeCodes, type Locale } from "@/lib/i18n/locales";
import { siteUrl } from "@/lib/site";

/**
 * Self-referencing canonical plus hreflang alternates for every locale and
 * `x-default` (English). `path` is the locale-less route path ("/", "/apps/hourstory").
 * Relative URLs are resolved against metadataBase set in the [lang] layout.
 */
export function localeAlternates(lang: Locale, path: string): Metadata["alternates"] {
  const suffix = path === "/" ? "" : path;
  return {
    canonical: `/${lang}${suffix}`,
    languages: {
      ...Object.fromEntries(localeCodes.map((code) => [code, `/${code}${suffix}`])),
      "x-default": `/${defaultLocale}${suffix}`,
    },
    // Feed discovery on every page, since page-level alternates replace the
    // layout's rather than merging with them.
    types: { "application/rss+xml": `${siteUrl}/feed.xml` },
  };
}
