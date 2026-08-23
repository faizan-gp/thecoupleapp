import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale } from "@/lib/i18n/locales";
import { breadcrumbLd } from "@/lib/seo/json-ld";
import { localeAlternates } from "@/lib/seo/metadata";
import { supportEmail } from "@/lib/site";

/**
 * How the written content on this site is produced and corrected.
 *
 * Scoped to the content that actually exists — app descriptions, feature
 * lists, FAQs and their translations — rather than describing an editorial
 * process (newsroom, review board, fact-checking desk) that this site does
 * not have.
 */
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
    title: dict.editorial.title,
    description: dict.editorial.description,
    alternates: localeAlternates(lang, "/editorial-guidelines"),
  };
}

export default async function EditorialGuidelinesPage({
  params,
}: PageProps<"/[lang]/editorial-guidelines">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: `/${lang}` },
          { name: dict.editorial.title, path: `/${lang}/editorial-guidelines` },
        ])}
      />

      <h1 className="text-3xl font-bold">{dict.editorial.title}</h1>
      <p className="mt-2 text-sm">
        {dict.legal.lastUpdated}:{" "}
        <time dateTime={LAST_UPDATED}>
          {new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(new Date(LAST_UPDATED))}
        </time>
      </p>
      <p className="mt-4 max-w-2xl">{dict.editorial.intro}</p>

      {dict.editorial.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-2xl font-bold">{section.heading}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-2xl">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{dict.editorial.correctionsTitle}</h2>
        <p className="mt-4 max-w-2xl">
          {dict.editorial.correctionsBody}{" "}
          <a href={`mailto:${supportEmail}`} className="font-semibold underline">
            {supportEmail}
          </a>
          .
        </p>
        <p className="mt-4 max-w-2xl">
          {dict.editorial.authorNote}{" "}
          <Link href={`/${lang}/author`} className="font-semibold underline">
            {dict.author.title}
          </Link>
          .
        </p>
      </section>
    </>
  );
}
