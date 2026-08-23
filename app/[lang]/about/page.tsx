import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleSection, Breadcrumbs, PageShell, PageTitle } from "@/components/layout/Page";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale } from "@/lib/i18n/locales";
import { breadcrumbLd } from "@/lib/seo/json-ld";
import { localeAlternates } from "@/lib/seo/metadata";
import { supportEmail } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    alternates: localeAlternates(lang, "/about"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const [lead, ...rest] = dict.about.body;

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: `/${lang}` },
          { name: dict.meta.about.title, path: `/${lang}/about` },
        ])}
      />
      <PageShell>
        <Breadcrumbs
          label={dict.nav.breadcrumb}
          items={[
            { name: dict.nav.home, href: `/${lang}` },
            { name: dict.meta.about.title },
          ]}
        />
        <PageTitle title={dict.about.title} lead={lead} />

        {rest.length > 0 && (
          <div className="prose py-10">
            {rest.map((paragraph) => (
              <p key={paragraph} className="mt-4 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        <ArticleSection id="story" title={dict.about.storyTitle} paragraphs={dict.about.storyBody} />
        <ArticleSection
          id="who-we-are"
          title={dict.about.whoWeAreTitle}
          paragraphs={dict.about.whoWeAreBody}
        />
        <ArticleSection
          id="what-we-do"
          title={dict.about.whatWeDoTitle}
          paragraphs={dict.about.whatWeDoBody}
        />
        <ArticleSection id="contact" title={dict.about.contactTitle}>
          <p>
            {dict.about.contactBody}{" "}
            <a href={`mailto:${supportEmail}`} className="link">
              {supportEmail}
            </a>
          </p>
        </ArticleSection>
      </PageShell>
    </>
  );
}
