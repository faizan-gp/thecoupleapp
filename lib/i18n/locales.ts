/**
 * Single source of truth for supported locales.
 * Adding a language = add one entry here + one dictionary file in /dictionaries.
 *
 * This module is imported by proxy.ts and client components — keep it free of
 * server-only code and dictionary imports.
 */

export const locales = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "de", label: "Deutsch", dir: "ltr" },
  { code: "pt", label: "Português", dir: "ltr" },
  { code: "hi", label: "हिन्दी", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
] as const;

export type Locale = (typeof locales)[number]["code"];
export type TextDirection = (typeof locales)[number]["dir"];

export const localeCodes: Locale[] = locales.map((l) => l.code);

/** `x-default` and fallback language. */
export const defaultLocale: Locale = "en";

/** Cookie that persists an explicit language choice (wins over Accept-Language). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function hasLocale(value: string): value is Locale {
  return (localeCodes as string[]).includes(value);
}

export function localeDir(locale: Locale): TextDirection {
  return locales.find((l) => l.code === locale)?.dir ?? "ltr";
}
