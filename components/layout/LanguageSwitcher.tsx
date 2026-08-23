"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n/locales";

/**
 * Client island: swaps the locale segment of the current path so the visitor
 * stays on the equivalent page, and persists the explicit choice in a cookie
 * (which proxy.ts honors over Accept-Language on later visits).
 * Renders real <a> links — crawlable and keyboard-accessible without JS.
 */
function persistChoice(code: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({ currentLang, label }: { currentLang: Locale; label: string }) {
  const pathname = usePathname() ?? `/${currentLang}`;
  const restOfPath = pathname.replace(new RegExp(`^/${currentLang}(?=/|$)`), "") || "";

  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-x-3 gap-y-1">
        {locales.map(({ code, label: name }) => (
          <li key={code}>
            <Link
              href={`/${code}${restOfPath}`}
              lang={code}
              hrefLang={code}
              aria-current={code === currentLang ? "true" : undefined}
              onClick={() => persistChoice(code)}
              className={code === currentLang ? "font-semibold underline" : "hover:underline"}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
