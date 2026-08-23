import Link from "next/link";

import { Logo } from "@/components/brand/Mark";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { NavLinks } from "@/components/layout/NavLinks";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { locales, type Locale } from "@/lib/i18n/locales";

/**
 * Site header. Both disclosures — the mobile menu and the language list — are
 * native <details> elements, so the whole header works with JavaScript off and
 * needs no focus-trap or outside-click handling of its own.
 */
export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = [
    { href: `/${lang}/apps`, label: dict.nav.apps },
    { href: `/${lang}/blog`, label: dict.nav.blog },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const currentLanguage = locales.find((locale) => locale.code === lang)?.label ?? lang;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${lang}`}
          className="flex shrink-0 items-center gap-2.5 rounded-md text-ink"
        >
          <Logo className="h-6 w-10" />
          <span className="font-display text-[1.05rem] font-semibold tracking-tight">
            {dict.meta.siteName}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav aria-label={dict.nav.main} className="hidden md:block">
            <NavLinks links={links} />
          </nav>

          {/* Language disclosure — desktop. On small screens it lives inside
              the menu panel below so the bar never holds two open toggles. */}
          <details className="group hidden md:block">
            <summary className="chip chip-control hover:border-line-strong hover:text-ink">
              <span className="sr-only">{dict.nav.language}</span>
              {currentLanguage}
              <svg
                viewBox="0 0 10 6"
                width="10"
                height="6"
                aria-hidden="true"
                className="transition-transform group-open:rotate-180"
              >
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </summary>
            <div className="absolute end-4 mt-3 min-w-56 rounded-[14px] border border-line bg-surface p-2 shadow-xl">
              <LanguageSwitcher
                currentLang={lang}
                label={dict.footer.languageLabel}
                variant="menu"
              />
            </div>
          </details>

          {/* Mobile menu */}
          <details className="md:hidden">
            <summary className="chip chip-control hover:border-line-strong hover:text-ink">
              {dict.nav.menu}
            </summary>
            <div className="absolute inset-x-0 top-16 border-b border-line bg-surface px-5 pb-6 pt-4 shadow-xl">
              <nav aria-label={dict.nav.main}>
                <NavLinks links={links} orientation="column" />
              </nav>
              <p className="eyebrow mt-6 mb-2">{dict.nav.language}</p>
              <div className="-ms-3">
                <LanguageSwitcher
                  currentLang={lang}
                  label={dict.footer.languageLabel}
                  variant="menu"
                />
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
