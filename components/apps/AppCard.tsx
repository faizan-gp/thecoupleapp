import Image from "next/image";
import Link from "next/link";

import type { CoupleApp } from "@/content/apps";
import { localized } from "@/lib/apps";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";
import type { Locale } from "@/lib/i18n/locales";

/** Card for a released (or beta) app — links to its indexable detail page. */
export function AppCard({
  app,
  lang,
  dict,
}: {
  app: CoupleApp;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <article className="rounded-lg border p-5">
      <div className="flex items-center gap-3">
        <Image
          src={app.icon}
          alt={interpolate(dict.appDetail.iconAlt, { name: app.name })}
          width={48}
          height={48}
          className="rounded"
        />
        <h3 className="text-lg font-semibold">
          <Link href={`/${lang}/apps/${app.slug}`} className="hover:underline">
            {app.name}
          </Link>
        </h3>
      </div>
      <p className="mt-3">{localized(app.tagline, lang)}</p>
      <p className="mt-2 text-sm">
        {dict.categories[app.category]}
        {app.status !== "released" ? ` · ${dict.statuses[app.status]}` : ""}
      </p>
    </article>
  );
}

/** Muted teaser for an unreleased app — visually subordinate to released cards. */
export function ComingSoonCard({
  app,
  lang,
  dict,
}: {
  app: CoupleApp;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <article className="rounded-lg border border-dashed p-5 opacity-80">
      <div className="flex items-center gap-3">
        <Image
          src={app.icon}
          alt={interpolate(dict.appDetail.iconAlt, { name: app.name })}
          width={40}
          height={40}
          className="rounded"
        />
        <h3 className="font-semibold">
          <Link href={`/${lang}/apps/${app.slug}`} className="hover:underline">
            {app.name}
          </Link>
        </h3>
      </div>
      <p className="mt-2 text-sm">
        {dict.categories[app.category]} · {dict.home.comingSoonTag}
      </p>
    </article>
  );
}
