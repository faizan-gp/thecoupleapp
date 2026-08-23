import Link from "next/link";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { socialLinks, supportEmail } from "@/lib/site";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="max-w-xs">
            <p className="font-bold">{dict.meta.siteName}</p>
            <p className="mt-2 text-sm">{dict.footer.description}</p>
            <p className="mt-3 text-sm">
              <a href={`mailto:${supportEmail}`} className="underline">
                {supportEmail}
              </a>
            </p>
          </div>

          <nav aria-label={dict.footer.navLabel}>
            <ul className="flex flex-col gap-2 sm:flex-row sm:gap-6">
              <li>
                <Link href={`/${lang}`} className="hover:underline">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/apps`} className="hover:underline">
                  {dict.nav.apps}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="hover:underline">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="hover:underline">
                  {dict.nav.contact}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/author`} className="hover:underline">
                  {dict.author.title}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/sitemap`} className="hover:underline">
                  {dict.footer.sitemap}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={dict.footer.legalLabel}>
            <ul className="flex flex-col gap-2 sm:flex-row sm:gap-6">
              <li>
                <Link href={`/${lang}/privacy`} className="hover:underline">
                  {dict.meta.privacy.title}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/terms`} className="hover:underline">
                  {dict.meta.terms.title}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/editorial-guidelines`} className="hover:underline">
                  {dict.editorial.title}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Renders only once a real profile exists in lib/site.ts socialLinks. */}
        {socialLinks.length > 0 && (
          <nav aria-label={dict.footer.socialLabel}>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {socialLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    rel="me noopener noreferrer"
                    target="_blank"
                    className="hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <LanguageSwitcher currentLang={lang} label={dict.footer.languageLabel} />

        <p className="text-sm">
          © {year} {dict.meta.siteName}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
