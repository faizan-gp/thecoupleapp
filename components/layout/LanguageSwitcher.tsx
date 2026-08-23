"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { closeEnclosingDisclosure } from "@/components/layout/NavLinks";
import { LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n/locales";

/**
 * Client island: swaps the locale segment of the current path so the visitor
 * stays on the equivalent page, and persists the explicit choice in a cookie
 * (which proxy.ts honors over Accept-Language on later visits).
 * Renders real <a> links — crawlable and keyboard-accessible without JS.
 *
 * `inline` is the footer's wrapping row and is a labelled nav landmark of its
 * own; `menu` is the stacked list inside a disclosure that already labels it,
 * so it renders as a plain list — two landmarks called "Language" on one page
 * would be one too many.
 */
function persistChoice(code: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({
  currentLang,
  label,
  variant = "inline",
}: {
  currentLang: Locale;
  label: string;
  variant?: "inline" | "menu";
}) {
  const pathname = usePathname() ?? `/${currentLang}`;
  const restOfPath = pathname.replace(new RegExp(`^/${currentLang}(?=/|$)`), "") || "";

  const Wrapper = variant === "menu" ? "div" : "nav";

  return (
    <Wrapper aria-label={variant === "menu" ? undefined : label}>
      <ul
        className={
          // Seven languages stacked in one column makes a very tall panel on a phone.
          variant === "menu" ? "grid grid-cols-2 gap-0.5" : "flex flex-wrap gap-x-1 gap-y-0.5"
        }
      >
        {locales.map(({ code, label: name }) => {
          const active = code === currentLang;
          return (
            <li key={code}>
              <Link
                href={`/${code}${restOfPath}`}
                lang={code}
                hrefLang={code}
                aria-current={active ? "true" : undefined}
                onClick={(event) => {
                  persistChoice(code);
                  closeEnclosingDisclosure(event.currentTarget);
                }}
                className={`block rounded-full px-3 py-2 font-display text-[0.9rem] transition-colors ${
                  active
                    ? "bg-candy-wash font-semibold text-candy"
                    : "text-muted hover:bg-sunken hover:text-ink"
                }`}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
}
