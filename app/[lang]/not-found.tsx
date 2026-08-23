import Link from "next/link";
import { lang as getLang } from "next/root-params";

import { DuoMark } from "@/components/brand/Mark";
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
    <div className="wrap flex min-h-[60vh] flex-col justify-center py-20">
      <p className="eyebrow flex items-center gap-2">
        <DuoMark state="open" />
        404
      </p>
      <h1 className="t-page mt-4 max-w-[16ch]">{dict.notFound.title}</h1>
      <p className="t-lead prose-tight mt-5">{dict.notFound.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={`/${locale}`} className="btn btn-primary">
          {dict.notFound.homeCta}
        </Link>
        <Link href={`/${locale}/apps`} className="btn btn-quiet">
          {dict.notFound.appsCta}
        </Link>
      </div>
    </div>
  );
}
