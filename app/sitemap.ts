import type { MetadataRoute } from "next";

import { getAllApps } from "@/lib/apps";
import { getAllPosts } from "@/lib/posts";
import { defaultLocale, localeCodes } from "@/lib/i18n/locales";
import { absoluteUrl } from "@/lib/site";

/**
 * Every page × every locale, each entry carrying the full hreflang alternate
 * set (incl. x-default) so Google discovers all language versions.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/apps",
    ...getAllApps().map((app) => `/apps/${app.slug}`),
    "/blog",
    ...getAllPosts().map((post) => `/blog/${post.slug}`),
    "/about",
    "/author",
    "/contact",
    "/privacy",
    "/terms",
    "/editorial-guidelines",
    "/sitemap",
  ];
  const lastModified = new Date();

  return paths.flatMap((path) => {
    const suffix = path === "/" ? "" : path;
    const languages = {
      ...Object.fromEntries(localeCodes.map((code) => [code, absoluteUrl(`/${code}${suffix}`)])),
      "x-default": absoluteUrl(`/${defaultLocale}${suffix}`),
    };
    return localeCodes.map((code) => ({
      url: absoluteUrl(`/${code}${suffix}`),
      lastModified,
      alternates: { languages },
    }));
  });
}
