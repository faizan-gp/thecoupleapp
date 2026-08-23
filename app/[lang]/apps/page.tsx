import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppsBrowser } from "@/components/apps/AppsBrowser";
import { Breadcrumbs, PageShell, PageTitle } from "@/components/layout/Page";
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

      <PageShell>
        <Breadcrumbs
          label={dict.nav.breadcrumb}
          items={[{ name: dict.nav.home, href: `/${lang}` }, { name: dict.meta.apps.title }]}
        />
        <PageTitle title={dict.appsIndex.title} lead={dict.appsIndex.intro} />

        {/* The full, unfiltered catalog is server-rendered inside AppsBrowser;
            its search box only narrows what is already in the HTML. */}
        <AppsBrowser released={released} upcoming={upcoming} lang={lang} dict={dict} />
      </PageShell>
    </>
  );
}
