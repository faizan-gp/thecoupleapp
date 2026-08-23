import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale, locales } from "@/lib/i18n/locales";
import { HOURSTORY_LAST_UPDATED, hourStoryLegalPreamble, hourStoryTerms } from "@/lib/legal/hourstory";
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
    title: `HourStory — ${hourStoryTerms.title}`,
    description: dict.hourStoryLegal.termsDescription,
    alternates: localeAlternates(lang, "/apps/hourstory/terms"),
  };
}

export default async function HourStoryTermsPage({
  params,
}: PageProps<"/[lang]/apps/hourstory/terms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: `/${lang}` },
          { name: "HourStory", path: `/${lang}/apps/hourstory` },
          { name: hourStoryTerms.title, path: `/${lang}/apps/hourstory/terms` },
        ])}
      />

      <h1 className="text-3xl font-bold">HourStory — {hourStoryTerms.title}</h1>
      <p className="mt-2 text-sm">
        {dict.legal.lastUpdated}:{" "}
        <time dateTime={HOURSTORY_LAST_UPDATED}>
          {new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(
            new Date(HOURSTORY_LAST_UPDATED)
          )}
        </time>
      </p>

      <p className="mt-4 max-w-2xl rounded border p-4 text-sm">{dict.hourStoryLegal.englishNotice}</p>

      {hourStoryLegalPreamble.map((block, i) =>
        block.type === "p" ? (
          <p key={i} className="mt-4 max-w-2xl">
            {block.text}
          </p>
        ) : null
      )}

      <p className="mt-4 max-w-2xl">
        <Link href={`/${lang}/apps/hourstory/privacy`} className="font-semibold underline">
          {dict.hourStoryLegal.viewPrivacy}
        </Link>
      </p>

      <LegalDocument sections={hourStoryTerms.sections} />
    </>
  );
}
