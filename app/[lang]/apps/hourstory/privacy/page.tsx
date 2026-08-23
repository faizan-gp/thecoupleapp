import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs, PageShell, PageTitle } from "@/components/layout/Page";
import { LegalDocument, LegalToc } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale, locales } from "@/lib/i18n/locales";
import { HOURSTORY_LAST_UPDATED, hourStoryLegalPreamble, hourStoryPrivacy } from "@/lib/legal/hourstory";
import { breadcrumbLd } from "@/lib/seo/json-ld";
import { localeAlternates } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return {
    title: `HourStory — ${hourStoryPrivacy.title}`,
    description: dict.hourStoryLegal.privacyDescription,
    alternates: localeAlternates(lang, "/apps/hourstory/privacy"),
  };
}

export default async function HourStoryPrivacyPage({
  params,
}: PageProps<"/[lang]/apps/hourstory/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const documentTitle = `HourStory — ${hourStoryPrivacy.title}`;

  return (
    <>
      {/* HourStory has no catalog entry of its own, so the trail runs through
          the apps index rather than a /apps/hourstory page that does not exist. */}
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: `/${lang}` },
          { name: dict.meta.apps.title, path: `/${lang}/apps` },
          { name: documentTitle, path: `/${lang}/apps/hourstory/privacy` },
        ])}
      />

      <PageShell>
        <Breadcrumbs
          label={dict.nav.breadcrumb}
          items={[
            { name: dict.nav.home, href: `/${lang}` },
            { name: dict.meta.apps.title, href: `/${lang}/apps` },
            { name: documentTitle },
          ]}
        />

        <PageTitle
          title={documentTitle}
          meta={
            <p className="eyebrow">
              {dict.legal.lastUpdated}:{" "}
              <time dateTime={HOURSTORY_LAST_UPDATED}>
                {new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(
                  new Date(HOURSTORY_LAST_UPDATED)
                )}
              </time>
            </p>
          }
        />

        {/* This document is drafted and maintained in English only — see
            lib/legal/hourstory.ts for why. The notice below is translated UI
            chrome; the legal text itself is not. */}
        <p
          lang={lang}
          className="prose mt-8 rounded-[14px] border border-line bg-sunken p-5 text-[0.95rem] text-muted"
        >
          {dict.hourStoryLegal.englishNotice}
        </p>

        <div lang="en">
          {hourStoryLegalPreamble.map((block, i) =>
            block.type === "p" ? (
              <p key={i} className="prose mt-5">
                {block.text}
              </p>
            ) : null
          )}

          <LegalToc sections={hourStoryPrivacy.sections} />
          <LegalDocument sections={hourStoryPrivacy.sections} />
        </div>

        <p className="mt-12 border-t border-line pt-8">
          <Link href={`/${lang}/apps/hourstory/terms`} className="link">
            {dict.hourStoryLegal.viewTerms}
          </Link>
        </p>
      </PageShell>
    </>
  );
}
