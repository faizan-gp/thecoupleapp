import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppCard, ComingSoonCard } from "@/components/apps/AppCard";
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
      <section className="py-12">
        <h1 className="max-w-3xl text-4xl font-bold">{dict.home.heroTitle}</h1>
        <p className="mt-4 max-w-2xl text-lg">{dict.home.heroSubtitle}</p>
        <Link
          href="#released-apps"
          className="mt-6 inline-block rounded border px-5 py-2 font-semibold hover:underline"
        >
          {dict.home.heroCta}
        </Link>
      </section>

      {/* 2. Released apps grid */}
      <section id="released-apps" aria-labelledby="released-heading" className="py-12">
        <h2 id="released-heading" className="text-2xl font-bold">
          {dict.home.releasedTitle}
        </h2>
        <ul className="mt-6 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {released.map((app) => (
            <li key={app.slug}>
              <AppCard app={app} lang={lang} dict={dict} />
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Coming soon — visually subordinate, never mixed into the grid above */}
      {upcoming.length > 0 && (
        <section aria-labelledby="coming-soon-heading" className="py-12">
          <h2 id="coming-soon-heading" className="text-2xl font-bold">
            {dict.home.comingSoonTitle}
          </h2>
          <ul className="mt-6 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((app) => (
              <li key={app.slug}>
                <ComingSoonCard app={app} lang={lang} dict={dict} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 4. FAQ — mirrors the FAQPage JSON-LD above */}
      <section aria-labelledby="faq-heading" className="py-12">
        <h2 id="faq-heading" className="text-2xl font-bold">
          {dict.home.faqTitle}
        </h2>
        <dl className="mt-6 space-y-4">
          {dict.home.faqItems.map((item) => (
            <div key={item.q}>
              <dt className="font-semibold">{item.q}</dt>
              <dd className="mt-1 max-w-2xl">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 5. The multi-app thesis */}
      <section aria-labelledby="why-heading" className="py-12">
        <h2 id="why-heading" className="text-2xl font-bold">
          {dict.home.whyTitle}
        </h2>
        <ul className="mt-6 grid list-none grid-cols-1 gap-6 sm:grid-cols-2">
          {dict.home.whyItems.map((item) => (
            <li key={item.title}>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
