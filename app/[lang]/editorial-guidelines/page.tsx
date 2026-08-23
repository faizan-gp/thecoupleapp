import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleSection, Breadcrumbs, PageShell, PageTitle } from "@/components/layout/Page";
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

      <PageShell>
        <Breadcrumbs
          label={dict.nav.breadcrumb}
          items={[{ name: dict.nav.home, href: `/${lang}` }, { name: dict.editorial.title }]}
        />
        <PageTitle
          title={dict.editorial.title}
          lead={dict.editorial.intro}
          meta={
            <p className="eyebrow">
              {dict.legal.lastUpdated}:{" "}
              <time dateTime={LAST_UPDATED}>
                {new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(
                  new Date(LAST_UPDATED)
                )}
              </time>
            </p>
          }
        />

        <div className="mt-10">
          {dict.editorial.sections.map((section, index) => (
            <ArticleSection
              key={section.heading}
              id={`editorial-${index}`}
              title={section.heading}
              paragraphs={section.body}
            />
          ))}

          <ArticleSection id="corrections" title={dict.editorial.correctionsTitle}>
            <p>
              {dict.editorial.correctionsBody}{" "}
              <a href={`mailto:${supportEmail}`} className="link">
                {supportEmail}
              </a>
              .
            </p>
            <p className="mt-4">
              {dict.editorial.authorNote}{" "}
              <Link href={`/${lang}/author`} className="link">
                {dict.author.title}
              </Link>
              .
            </p>
          </ArticleSection>
        </div>
      </PageShell>
    </>
  );
}
