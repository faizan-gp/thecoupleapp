import "server-only";

import en from "@/dictionaries/en.json";
import { defaultLocale, type Locale } from "./locales";

/** The English dictionary is the schema — every other locale must match it. */
export type Dictionary = typeof en;

const loaders: Record<Locale, () => Promise<unknown>> = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  es: () => import("@/dictionaries/es.json").then((m) => m.default),
  fr: () => import("@/dictionaries/fr.json").then((m) => m.default),
  de: () => import("@/dictionaries/de.json").then((m) => m.default),
  pt: () => import("@/dictionaries/pt.json").then((m) => m.default),
  hi: () => import("@/dictionaries/hi.json").then((m) => m.default),
  ar: () => import("@/dictionaries/ar.json").then((m) => m.default),
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Deep-merge a partial locale dictionary over the English one so a missing key
 * falls back to English instead of rendering an empty string. Warns at build
 * time so gaps are visible in CI logs.
 */
function withFallback(locale: Locale, partial: unknown, base: unknown, path = ""): unknown {
  if (!isRecord(base)) {
    if (partial === undefined || partial === null || partial === "") {
      console.warn(`[i18n] "${locale}" is missing "${path}" — falling back to English.`);
      return base;
    }
    return partial;
  }
  const source = isRecord(partial) ? partial : {};
  const merged: Record<string, unknown> = {};
  for (const key of Object.keys(base)) {
    merged[key] = withFallback(
      locale,
      source[key],
      (base as Record<string, unknown>)[key],
      path ? `${path}.${key}` : key
    );
  }
  return merged;
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === defaultLocale) return en;
  const partial = await loaders[locale]();
  return withFallback(locale, partial, en) as Dictionary;
}

/** Tiny `{name}`-style interpolation for dictionary strings. */
export function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`);
}
