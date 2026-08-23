import { appCategories, apps, type AppCategory, type CoupleApp, type Localized } from "@/content/apps";
import { defaultLocale, type Locale } from "@/lib/i18n/locales";

/**
 * The only sanctioned way to read the app catalog. If the catalog later moves
 * to a DB/CMS, only this file changes.
 */

export function getAllApps(): CoupleApp[] {
  return apps;
}

export function getReleasedApps(): CoupleApp[] {
  return apps.filter((app) => app.status === "released");
}

export function getUpcomingApps(): CoupleApp[] {
  return apps.filter((app) => app.status !== "released");
}

export function getAppBySlug(slug: string): CoupleApp | undefined {
  return apps.find((app) => app.slug === slug);
}

/** The library's areas, in presentation order. */
export function getCategories(): AppCategory[] {
  return appCategories;
}

/**
 * The app occupying a category, or undefined while that part of the library is
 * still open. Released apps win over unreleased ones if a category ever holds
 * more than one.
 */
export function getAppForCategory(category: AppCategory): CoupleApp | undefined {
  const inCategory = apps.filter((app) => app.category === category);
  return inCategory.find((app) => app.status === "released") ?? inCategory[0];
}

/**
 * Resolve a localized catalog field, falling back to English (with a build-time
 * warning) so production HTML never contains an empty string.
 */
export function localized<T>(field: Localized<T>, lang: Locale): T {
  const value = field[lang];
  if (value !== undefined) return value;
  if (lang !== defaultLocale) {
    console.warn(`[catalog] Missing "${lang}" translation — falling back to English.`);
  }
  return field.en;
}
