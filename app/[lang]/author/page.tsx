import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleSection, Breadcrumbs, PageShell, PageTitle } from "@/components/layout/Page";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale } from "@/lib/i18n/locales";
import { breadcrumbLd, personLd } from "@/lib/seo/json-ld";
import { localeAlternates } from "@/lib/seo/metadata";
import { author, supportEmail } from "@/lib/site";

/**
 * Attribution page for the person who builds the library. Every claim here is
 * first-party — supplied by the subject — and the Person schema's sameAs
 * points only at a public profile that can actually be checked.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return {
    title: dict.author.title,
    description: dict.author.description,
    alternates: localeAlternates(lang, "/author"),
  };
}

export default async function AuthorPage({ params }: PageProps<"/[lang]/author">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const sections = [
    { id: "education", heading: dict.author.educationTitle, body: dict.author.educationBody },
    { id: "engineering", heading: dict.author.engineeringTitle, body: dict.author.engineeringBody },
    { id: "research", heading: dict.author.researchTitle, body: dict.author.researchBody },
  ];

  return (
    <>
      <JsonLd data={personLd(lang, dict.author.role, dict.author.alumniOf)} />
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: `/${lang}` },
          { name: dict.author.title, path: `/${lang}/author` },
        ])}
      />

      <PageShell>
        <Breadcrumbs
          label={dict.nav.breadcrumb}
          items={[{ name: dict.nav.home, href: `/${lang}` }, { name: dict.author.title }]}
        />
        <PageTitle
          title={dict.author.heading}
          lead={dict.author.intro}
          meta={<p className="eyebrow">{dict.author.role}</p>}
        />

        <p className="mt-8 font-display text-[1.6rem] font-semibold tracking-tight">
          {author.name}
        </p>

        <div className="mt-10">
          {sections.map((section) => (
            <ArticleSection
              key={section.id}
              id={section.id}
              title={section.heading}
              paragraphs={section.body}
            />
          ))}

          <ArticleSection id="stack" title={dict.author.stackTitle}>
            <ul className="flex list-none flex-wrap gap-2">
              {author.stack.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </ArticleSection>

          <ArticleSection id="author-contact" title={dict.author.contactTitle}>
            <p>
              {dict.author.contactBody}{" "}
              <a href={`mailto:${supportEmail}`} className="link">
                {supportEmail}
              </a>
            </p>
            <p className="mt-4">
              <a
                href={author.linkedin}
                rel="me noopener noreferrer"
                target="_blank"
                className="link"
              >
                {dict.author.linkedinLabel}
              </a>
            </p>
          </ArticleSection>
        </div>
      </PageShell>
    </>
  );
}
