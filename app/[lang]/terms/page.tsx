import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale } from "@/lib/i18n/locales";
import { breadcrumbLd } from "@/lib/seo/json-ld";
import { localeAlternates } from "@/lib/seo/metadata";

const LAST_UPDATED = "2026-08-23";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return {
    title: dict.meta.terms.title,
    description: dict.meta.terms.description,
    alternates: localeAlternates(lang, "/terms"),
  };
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: `/${lang}` },
          { name: dict.meta.terms.title, path: `/${lang}/terms` },
        ])}
      />
      <h1 className="text-3xl font-bold">{dict.legal.termsTitle}</h1>
      <p className="mt-2 text-sm">
        {dict.legal.lastUpdated}:{" "}
        <time dateTime={LAST_UPDATED}>
          {new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(new Date(LAST_UPDATED))}
        </time>
      </p>
      {dict.legal.termsBody.map((paragraph) => (
        <p key={paragraph} className="mt-4 max-w-2xl">
          {paragraph}
        </p>
      ))}
    </>
  );
}
