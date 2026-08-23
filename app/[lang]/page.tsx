import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppGlimpse } from "@/components/apps/AppGlimpse";
import { DayTimeline } from "@/components/home/DayTimeline";
import { LibraryBoard } from "@/components/home/LibraryBoard";
import { Ticker } from "@/components/home/Ticker";
import { JsonLd } from "@/components/seo/JsonLd";
import { getReleasedApps, getUpcomingApps } from "@/lib/apps";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale } from "@/lib/i18n/locales";
import { faqLd } from "@/lib/seo/json-ld";
import { localeAlternates } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return {
    // Landing page owns the absolute title (no template suffix duplication).
    title: { absolute: dict.meta.home.title },
    description: dict.meta.home.description,
    alternates: localeAlternates(lang, "/"),
  };
}

/**
 * Renders the headline with its accent phrase in the italic pink voice. The
 * accent is a per-locale substring of the title; if a translation drifts and
 * the substring no longer matches, the title renders whole rather than broken.
 */
function AccentedTitle({ title, accent }: { title: string; accent: string }) {
  const index = accent ? title.indexOf(accent) : -1;
  if (index === -1) return title;
  return (
    <>
      {title.slice(0, index)}
      <em className="t-accent">{accent}</em>
      {title.slice(index + accent.length)}
    </>
  );
}

export default async function LandingPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const released = getReleasedApps();
  const upcoming = getUpcomingApps();

  return (
    <>
      <JsonLd data={faqLd(dict.home.faqItems)} />

      {/* 1. The ticker — the site's short promises, scrolling under the header */}
      <Ticker items={dict.home.ticker} />

      {/* 2. Hero — owns the page's single h1. The headline carries the italic
             accent phrase; the couple's thread sits beside it as illustration. */}
      <section className="wrap grid grid-cols-1 items-center gap-x-16 gap-y-14 pt-14 pb-14 sm:pt-20 sm:pb-20 lg:grid-cols-[3fr_2fr]">
        <div>
          <h1 className="t-hero rise max-w-[22ch]">
            <AccentedTitle title={dict.home.heroTitle} accent={dict.home.heroAccent} />
          </h1>
          <p
            className="t-lead rise prose-tight mt-6"
            style={{ animationDelay: "70ms" }}
          >
            {dict.home.heroSubtitle}
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "140ms" }}>
            <Link href={`/${lang}/apps`} className="btn btn-primary">
              {dict.home.heroCta}
            </Link>
            <Link href={`/${lang}/about`} className="btn btn-quiet">
              {dict.nav.about}
            </Link>
          </div>
        </div>
        <DayTimeline dict={dict} />
      </section>

      {/* 3. The library board — which parts of a relationship have an app yet */}
      <LibraryBoard lang={lang} dict={dict} />

      {/* 4. The glimpses — one landing block per couple app, alternating sides,
             released apps first. Everything inside is derived from the catalog,
             so a new app gets its section for free. */}
      <section
        id="released-apps"
        aria-labelledby="apps-glimpse-heading"
        className="wrap border-t border-line py-14 sm:py-20"
      >
        <h2 id="apps-glimpse-heading" className="t-section">
          {dict.home.appsGlimpseTitle}
        </h2>
        <div className="mt-12 flex flex-col gap-20 sm:mt-16 sm:gap-28">
          {[...released, ...upcoming].map((app, index) => (
            <AppGlimpse
              key={app.slug}
              app={app}
              lang={lang}
              dict={dict}
              flip={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* 5. The multi-app thesis — set on the recessed band so the argument
             reads as a change of voice rather than another list of products. */}
      <section id="why" aria-labelledby="why-heading" className="border-y border-line bg-sunken">
        <div className="wrap py-14 sm:py-20">
          <h2 id="why-heading" className="t-section prose-tight">
            {dict.home.whyTitle}
          </h2>
          <ul className="mt-10 grid list-none grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {dict.home.whyItems.map((item) => (
              <li key={item.title} className="border-t border-line-strong pt-5">
                <h3 className="font-display text-[1.15rem] font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. FAQ — mirrors the FAQPage JSON-LD above */}
      <section aria-labelledby="faq-heading" className="wrap py-14 sm:py-20">
        <h2 id="faq-heading" className="t-section">
          {dict.home.faqTitle}
        </h2>
        <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-2">
          {dict.home.faqItems.map((item) => (
            <div key={item.q} className="border-t border-line pt-5">
              <dt className="font-display text-[1.05rem] font-semibold">{item.q}</dt>
              <dd className="mt-2 text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
