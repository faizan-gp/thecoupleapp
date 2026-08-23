import Image from "next/image";
import Link from "next/link";

import { DuoMark } from "@/components/brand/Mark";
import { StoreBadges } from "@/components/apps/StoreBadges";
import type { CoupleApp } from "@/content/apps";
import { localized } from "@/lib/apps";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";
import type { Locale } from "@/lib/i18n/locales";

/**
 * App icons are first-party SVGs: `unoptimized` skips the image optimizer,
 * which has nothing to do for vector art, and keeps them out of /_next/image.
 * Width and height are still explicit, so the box is reserved before load.
 */
function AppIcon({ app, dict, size }: { app: CoupleApp; dict: Dictionary; size: number }) {
  return (
    <Image
      src={app.icon}
      alt={interpolate(dict.appDetail.iconAlt, { name: app.name })}
      width={size}
      height={size}
      unoptimized
      className="rounded-[14px]"
    />
  );
}

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
    <article className="card h-full p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <AppIcon app={app} dict={dict} size={52} />
        <span className="chip chip-live">
          <DuoMark state="available" />
          {dict.statuses[app.status]}
        </span>
      </div>

      <h3 className="t-card mt-5">
        <Link href={`/${lang}/apps/${app.slug}`} className="link-title">
          {app.name}
        </Link>
      </h3>

      <p className="mt-2 mb-5 text-[1rem] leading-relaxed text-muted">{localized(app.tagline, lang)}</p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <span className="eyebrow">{dict.categories[app.category]}</span>
        <StoreBadges app={app} dict={dict} size="compact" />
      </div>
    </article>
  );
}

/**
 * An app as a quiet row rather than a card, for lists that must stay
 * subordinate to whatever they sit under: the coming-soon list (a card would
 * put an unreleased app on the same footing as one you can download, and a
 * lone teaser in a card grid reads as a hole) and the cross-links at the foot
 * of an app page.
 */
export function AppRow({
  app,
  lang,
  dict,
}: {
  app: CoupleApp;
  lang: Locale;
  dict: Dictionary;
}) {
  const released = app.status === "released";

  return (
    <article className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-line py-5">
      <span className={released ? undefined : "opacity-70"}>
        <AppIcon app={app} dict={dict} size={40} />
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="t-card text-[1.15rem]">
          <Link href={`/${lang}/apps/${app.slug}`} className="link-title">
            {app.name}
          </Link>
        </h3>
        <p className="mt-1 text-[0.98rem] text-muted">{localized(app.tagline, lang)}</p>
      </div>

      <p className="flex flex-wrap items-center gap-2">
        <span className="chip">{dict.categories[app.category]}</span>
        <span className={`chip ${released ? "chip-live" : "chip-soon"}`}>
          <DuoMark state={released ? "available" : "soon"} />
          {released ? dict.statuses.released : dict.home.comingSoonTag}
        </span>
      </p>
    </article>
  );
}

/**
 * Wide spotlight for a released app, used on the landing page while the
 * library holds a single released app: one card in a three-column grid reads
 * as a gap where two more should be, and the library board directly above
 * already says how many areas are still open. The description earns its place
 * here — at this width there is room to say what the app actually does.
 */
export function FeaturedAppCard({
  app,
  lang,
  dict,
}: {
  app: CoupleApp;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <article className="card p-6 sm:p-8 lg:flex-row lg:items-start lg:gap-10">
      <div className="flex min-w-0 flex-1 items-start gap-5">
        <AppIcon app={app} dict={dict} size={64} />
        <div className="min-w-0">
          <h3 className="t-card text-[1.6rem]">
            <Link href={`/${lang}/apps/${app.slug}`} className="link-title">
              {app.name}
            </Link>
          </h3>
          <p className="mt-2 text-[1.1rem] text-muted">{localized(app.tagline, lang)}</p>
          <p className="prose mt-4 text-[1rem] text-muted">{localized(app.description, lang)}</p>
        </div>
      </div>

      <div className="mt-8 flex shrink-0 flex-col gap-4 border-t border-line pt-6 lg:mt-0 lg:border-t-0 lg:border-s lg:ps-10 lg:pt-0">
        <p className="flex flex-wrap items-center gap-2">
          <span className="chip chip-live">
            <DuoMark state="available" />
            {dict.statuses[app.status]}
          </span>
          <span className="chip">{dict.categories[app.category]}</span>
        </p>
        <StoreBadges app={app} dict={dict} />
      </div>
    </article>
  );
}
