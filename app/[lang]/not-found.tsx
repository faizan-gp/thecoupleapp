import Link from "next/link";
import { lang as getLang } from "next/root-params";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, hasLocale } from "@/lib/i18n/locales";

/**
 * Localized 404 (served with a real HTTP 404 status). Reads the locale via
 * next/root-params since not-found receives no params prop.
 */
export default async function NotFound() {
  const rawLang = await getLang();
  const locale = rawLang && hasLocale(rawLang) ? rawLang : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <section className="py-16 text-center">
      <h1 className="text-3xl font-bold">{dict.notFound.title}</h1>
      <p className="mt-4">{dict.notFound.body}</p>
      <ul className="mt-6 flex list-none justify-center gap-6">
        <li>
          <Link href={`/${locale}`} className="font-semibold underline">
            {dict.notFound.homeCta}
          </Link>
        </li>
        <li>
          <Link href={`/${locale}/apps`} className="font-semibold underline">
            {dict.notFound.appsCta}
          </Link>
        </li>
      </ul>
    </section>
  );
}
