import Image from "next/image";
import Link from "next/link";

import { HourStoryPhone } from "@/components/apps/HourStoryPhone";
import { StoreBadges } from "@/components/apps/StoreBadges";
import { DuoMark } from "@/components/brand/Mark";
import type { CoupleApp } from "@/content/apps";
import { localized } from "@/lib/apps";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";
import type { Locale } from "@/lib/i18n/locales";

/**
 * The phone — a spare device frame that sketches what an app feels like from
 * its own catalog data: its features as rows of app UI. Purely illustrative,
 * so the whole frame is aria-hidden — the real content sits in the text next
 * to it.
 */
export function PhoneMock({ app, lang }: { app: CoupleApp; lang: Locale }) {
  const features = localized(app.features, lang);

  return (
    <div className="phone" aria-hidden="true">
      <div className="phone-screen">
        <div className="phone-bar">
          <span className="phone-notch" />
        </div>

        <div className="flex items-center gap-2.5 border-b border-line pb-3">
          <Image src={app.icon} alt="" width={30} height={30} unoptimized className="rounded-lg" />
          <span className="font-display text-[1.05rem] font-semibold">{app.name}</span>
          <span className="ms-auto inline-flex">
            <DuoMark state={app.status === "released" ? "available" : "soon"} />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2.5 pt-1">
          {features.map((feature, index) => (
            <p key={feature.title} className="phone-row">
              <span
                className={`size-2.5 shrink-0 rounded-full ${
                  index % 2 === 0 ? "bg-candy" : "bg-ember"
                }`}
              />
              {feature.title}
            </p>
          ))}
          <p className="phone-row justify-center border-dashed text-muted">+</p>
        </div>
      </div>
    </div>
  );
}

/** A single ember check for the glimpse's feature bullets. */
function CheckGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      aria-hidden="true"
      focusable="false"
      className="mt-1 shrink-0 text-ember"
    >
      <path
        d="M2.8 8.6l3.4 3.4 7-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * One landing block per app: the pitch on one side, the phone on the other,
 * alternating sides down the page. Everything is derived from the catalog —
 * a new app gets its glimpse for free.
 */
export function AppGlimpse({
  app,
  lang,
  dict,
  flip,
}: {
  app: CoupleApp;
  lang: Locale;
  dict: Dictionary;
  flip: boolean;
}) {
  const released = app.status === "released";
  const tagline = localized(app.tagline, lang);
  const description = localized(app.description, lang);
  const features = localized(app.features, lang);

  return (
    <article className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
      <div>
        <p className="flex flex-wrap items-center gap-2">
          <span className={`chip ${released ? "chip-live" : "chip-soon"}`}>
            <DuoMark state={released ? "available" : "soon"} />
            {released ? dict.statuses.released : dict.home.comingSoonTag}
          </span>
          <span className="chip">{dict.categories[app.category]}</span>
        </p>

        <h3 className="mt-5 font-display text-[2rem] font-semibold leading-tight tracking-tight sm:text-[2.4rem]">
          <Link href={`/${lang}/apps/${app.slug}`} className="link-title">
            {app.name}
          </Link>
        </h3>
        <p className="t-lead mt-3">{tagline}</p>
        <p className="prose mt-4 text-muted">{description}</p>

        <ul className="mt-6 flex list-none flex-col gap-2.5">
          {features.map((feature) => (
            <li key={feature.title} className="flex items-start gap-2.5 text-[0.98rem]">
              <CheckGlyph />
              {feature.title}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-4">
          <Link href={`/${lang}/apps/${app.slug}`} className="btn btn-primary">
            {interpolate(dict.home.glimpseCta, { name: app.name })}
          </Link>
          {released && <StoreBadges app={app} dict={dict} size="compact" />}
        </div>
      </div>

      {/* An app with a working demo shows it; the generic frame stays the
          fallback for apps that don't have one built yet. A live phone earns
          its space on the landing page in a way a still of one does not. */}
      <div className={`justify-self-center ${flip ? "lg:order-first" : ""}`}>
        {app.slug === "hourstory" ? (
          <HourStoryPhone lang={lang} dict={dict} />
        ) : (
          <PhoneMock app={app} lang={lang} />
        )}
      </div>
    </article>
  );
}
