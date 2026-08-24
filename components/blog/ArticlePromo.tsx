import Image from "next/image";
import Link from "next/link";

import type { CoupleApp } from "@/content/apps";
import { localized } from "@/lib/apps";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";
import type { Locale } from "@/lib/i18n/locales";

/**
 * Inline promo that sits between article sections rather than only ever
 * waiting at the end — the reader who's already sold on a section shouldn't
 * have to scroll to the bottom to act on it.
 */
export function ArticlePromo({
  app,
  lang,
  dict,
}: {
  app: CoupleApp;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <aside className="article-promo">
      <Image
        src={app.icon}
        alt=""
        width={40}
        height={40}
        unoptimized
        className="article-promo-icon"
      />
      <div className="article-promo-body">
        <p className="article-promo-title">{app.name}</p>
        <p className="article-promo-text">{localized(app.tagline, lang)}</p>
      </div>
      <Link
        href={`/${lang}/apps/${app.slug}`}
        className="btn btn-primary article-promo-cta"
      >
        {interpolate(dict.home.glimpseCta, { name: app.name })}
      </Link>
    </aside>
  );
}
