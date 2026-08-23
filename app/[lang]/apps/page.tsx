import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppCard, ComingSoonCard } from "@/components/apps/AppCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getReleasedApps, getUpcomingApps } from "@/lib/apps";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale } from "@/lib/i18n/locales";
import { breadcrumbLd } from "@/lib/seo/json-ld";
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
    title: dict.meta.apps.title,
    description: dict.meta.apps.description,
    alternates: localeAlternates(lang, "/apps"),
  };
}

export default async function AppsIndexPage({ params }: PageProps<"/[lang]/apps">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const released = getReleasedApps();
  const upcoming = getUpcomingApps();

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: `/${lang}` },
          { name: dict.meta.apps.title, path: `/${lang}/apps` },
        ])}
      />

      <h1 className="text-3xl font-bold">{dict.appsIndex.title}</h1>
      <p className="mt-3 max-w-2xl">{dict.appsIndex.intro}</p>

      {/* The full, unfiltered catalog is in the HTML; any future filtering UI
          is progressive enhancement on top of this list. */}
      <section aria-labelledby="released-list-heading" className="mt-10">
        <h2 id="released-list-heading" className="text-2xl font-bold">
          {dict.appsIndex.released}
        </h2>
        <ul className="mt-6 grid list-none grid-cols-1 gap-4 sm:grid-cols-2">
          {released.map((app) => (
            <li key={app.slug}>
              <AppCard app={app} lang={lang} dict={dict} />
            </li>
          ))}
        </ul>
      </section>

      {upcoming.length > 0 && (
        <section aria-labelledby="upcoming-list-heading" className="mt-10">
          <h2 id="upcoming-list-heading" className="text-2xl font-bold">
            {dict.appsIndex.comingSoon}
          </h2>
          <ul className="mt-6 grid list-none grid-cols-1 gap-4 sm:grid-cols-2">
            {upcoming.map((app) => (
              <li key={app.slug}>
                <ComingSoonCard app={app} lang={lang} dict={dict} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
