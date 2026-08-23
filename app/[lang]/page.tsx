import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppCard, AppRow, FeaturedAppCard } from "@/components/apps/AppCard";
import { LibraryBoard } from "@/components/home/LibraryBoard";
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

export default async function LandingPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const released = getReleasedApps();
  const upcoming = getUpcomingApps();

  return (
    <>
      <JsonLd data={faqLd(dict.home.faqItems)} />

      {/* 1. Hero — owns the page's single h1 */}
      <section className="wrap pt-14 pb-12 sm:pt-24 sm:pb-16">
        <h1 className="t-hero rise max-w-[15ch]">{dict.home.heroTitle}</h1>
        <p
          className="t-lead rise prose-tight mt-6"
          style={{ animationDelay: "70ms" }}
        >
          {dict.home.heroSubtitle}
        </p>
        <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "140ms" }}>
          <Link href={`/${lang}/apps`} className="btn btn-primary">
            {dict.home.heroCta}
          </Link>
          <Link href={`/${lang}/about`} className="btn btn-quiet">
            {dict.nav.about}
          </Link>
        </div>
      </section>

      {/* 2. The library board — which parts of a relationship have an app yet */}
      <LibraryBoard lang={lang} dict={dict} />

      {/* 3. Released apps grid */}
      <section
        id="released-apps"
        aria-labelledby="released-heading"
        className="wrap border-t border-line py-14 sm:py-20"
      >
        <h2 id="released-heading" className="t-section">
          {dict.home.releasedTitle}
        </h2>
        <ul
          className={
            released.length === 1
              ? "mt-8 list-none"
              : "mt-8 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {released.map((app) => (
            <li key={app.slug}>
              {released.length === 1 ? (
                <FeaturedAppCard app={app} lang={lang} dict={dict} />
              ) : (
                <AppCard app={app} lang={lang} dict={dict} />
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Coming soon — visually subordinate, never mixed into the grid above */}
      {upcoming.length > 0 && (
        <section
          aria-labelledby="coming-soon-heading"
          className="wrap border-t border-line py-14 sm:py-20"
        >
          <h2 id="coming-soon-heading" className="t-section">
            {dict.home.comingSoonTitle}
          </h2>
          <ul className="mt-6 list-none border-t border-line">
            {upcoming.map((app) => (
              <li key={app.slug}>
                <AppRow app={app} lang={lang} dict={dict} />
              </li>
            ))}
          </ul>
        </section>
      )}

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
