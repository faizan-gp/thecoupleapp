import Link from "next/link";

import { Logo } from "@/components/brand/Mark";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { dmca, socialLinks, supportEmail } from "@/lib/site";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const siteLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/apps`, label: dict.nav.apps },
    { href: `/${lang}/blog`, label: dict.nav.blog },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
    { href: `/${lang}/author`, label: dict.author.title },
    { href: `/${lang}/sitemap`, label: dict.footer.sitemap },
  ];

  const legalLinks = [
    { href: `/${lang}/privacy`, label: dict.meta.privacy.title },
    { href: `/${lang}/terms`, label: dict.meta.terms.title },
    { href: `/${lang}/editorial-guidelines`, label: dict.editorial.title },
    { href: `/${lang}/apps/hourstory/privacy`, label: dict.hourStoryLegal.footerPrivacy },
    { href: `/${lang}/apps/hourstory/terms`, label: dict.hourStoryLegal.footerTerms },
  ];

  return (
    <footer className="mt-auto border-t border-line bg-sunken">
      <div className="wrap py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <p className="flex items-center gap-2.5">
              <Logo className="h-6 w-10" />
              <span className="font-display text-[1.05rem] font-semibold tracking-tight">
                {dict.meta.siteName}
              </span>
            </p>
            <p className="mt-4 text-[0.95rem] text-muted">{dict.footer.description}</p>
            <p className="mt-4 text-[0.95rem]">
              <a href={`mailto:${supportEmail}`} className="link">
                {supportEmail}
              </a>
            </p>
          </div>

          <nav aria-label={dict.footer.navLabel}>
            {/* The nav's accessible name stays "Footer navigation"; the visible
                column head is what a reader scanning the footer needs. */}
            <h2 className="eyebrow">{dict.footer.siteLabel}</h2>
            <ul className="mt-4 flex list-none flex-col gap-2.5 text-[0.95rem]">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-quiet">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.legalLabel}>
            <h2 className="eyebrow">{dict.footer.legalLabel}</h2>
            <ul className="mt-4 flex list-none flex-col gap-2.5 text-[0.95rem]">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-quiet">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">{dict.footer.languageLabel}</h2>
            <div className="mt-3 -ms-3">
              <LanguageSwitcher currentLang={lang} label={dict.footer.languageLabel} />
            </div>

            {/* Renders only once a real profile exists in lib/site.ts socialLinks. */}
            {socialLinks.length > 0 && (
              <nav aria-label={dict.footer.socialLabel} className="mt-6">
                <h2 className="eyebrow">{dict.footer.socialLabel}</h2>
                <ul className="mt-3 flex list-none flex-wrap gap-x-4 gap-y-1 text-[0.95rem]">
                  {socialLinks.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        rel="me noopener noreferrer"
                        target="_blank"
                        className="link-quiet"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.9rem] text-muted">
            © {year} {dict.meta.siteName}. {dict.footer.rights}
          </p>

          {/* DMCA badge. Plain <img> on purpose: next/image would rewrite the
              src to /_next/image, and the badge only verifies when it is
              fetched from images.dmca.com directly (allowed in the CSP). */}
          <a
            href={dmca.statusUrl}
            title="DMCA.com Protection Status"
            className="dmca-badge"
            rel="noopener noreferrer"
            target="_blank"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dmca.badgeUrl}
              alt="DMCA.com Protection Status"
              width={120}
              height={26}
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
