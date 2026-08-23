import Image from "next/image";
import Link from "next/link";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

/**
 * Site header. The mobile menu is a native <details> disclosure — fully usable
 * without JavaScript; the design pass (M4) may progressively enhance it.
 */
export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = [
    { href: `/${lang}/apps`, label: dict.nav.apps },
    { href: `/${lang}/blog`, label: dict.nav.blog },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href={`/${lang}`} className="flex items-center gap-2 text-lg font-bold">
          <Image src="/icon.svg" alt={dict.nav.logoAlt} width={32} height={32} priority />
          {dict.meta.siteName}
        </Link>

        {/* Desktop nav */}
        <nav aria-label={dict.nav.main} className="hidden sm:block">
          <ul className="flex gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile disclosure nav (no-JS friendly) */}
        <details className="relative sm:hidden">
          <summary className="cursor-pointer list-none rounded border px-3 py-1">
            {dict.nav.menu}
          </summary>
          <nav
            aria-label={dict.nav.main}
            className="absolute end-0 z-10 mt-2 min-w-40 rounded border bg-background p-3 shadow"
          >
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
