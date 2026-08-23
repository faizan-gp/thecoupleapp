import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs, PageShell, PageTitle } from "@/components/layout/Page";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllApps, localized } from "@/lib/apps";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale } from "@/lib/i18n/locales";
import { getAllPosts } from "@/lib/posts";
import { breadcrumbLd } from "@/lib/seo/json-ld";
import { localeAlternates } from "@/lib/seo/metadata";

/**
 * Human-readable sitemap — the browsable counterpart to /sitemap.xml. Every
 * indexable page in the current locale, one hop from the footer.
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
    title: dict.sitemapPage.title,
    description: dict.sitemapPage.description,
    alternates: localeAlternates(lang, "/sitemap"),
  };
}

export default async function SitemapPage({ params }: PageProps<"/[lang]/sitemap">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const posts = getAllPosts();

  const sections = [
    {
      heading: dict.sitemapPage.mainSection,
      links: [
        { href: `/${lang}`, label: dict.nav.home },
        { href: `/${lang}/apps`, label: dict.nav.apps },
        { href: `/${lang}/blog`, label: dict.nav.blog },
        { href: `/${lang}/about`, label: dict.nav.about },
        { href: `/${lang}/author`, label: dict.author.title },
        { href: `/${lang}/contact`, label: dict.nav.contact },
      ],
    },
    {
      heading: dict.sitemapPage.appsSection,
      links: getAllApps().map((app) => ({
        href: `/${lang}/apps/${app.slug}`,
        label: app.name,
      })),
    },
    // Omitted while there are no posts — an empty section under a heading
    // reads as broken rather than as "nothing here yet".
    ...(posts.length > 0
      ? [
          {
            heading: dict.sitemapPage.blogSection,
            links: posts.map((post) => ({
              href: `/${lang}/blog/${post.slug}`,
              label: localized(post.title, lang),
            })),
          },
        ]
      : []),
    {
      heading: dict.sitemapPage.legalSection,
      links: [
        { href: `/${lang}/privacy`, label: dict.meta.privacy.title },
        { href: `/${lang}/terms`, label: dict.meta.terms.title },
        { href: `/${lang}/editorial-guidelines`, label: dict.editorial.title },
        { href: `/${lang}/apps/hourstory/privacy`, label: dict.hourStoryLegal.footerPrivacy },
        { href: `/${lang}/apps/hourstory/terms`, label: dict.hourStoryLegal.footerTerms },
      ],
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: `/${lang}` },
          { name: dict.sitemapPage.title, path: `/${lang}/sitemap` },
        ])}
      />

      <PageShell>
        <Breadcrumbs
          label={dict.nav.breadcrumb}
          items={[{ name: dict.nav.home, href: `/${lang}` }, { name: dict.sitemapPage.title }]}
        />
        <PageTitle title={dict.sitemapPage.title} lead={dict.sitemapPage.intro} />

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <section key={section.heading} aria-labelledby={`sitemap-${section.heading}`}>
              <h2
                id={`sitemap-${section.heading}`}
                className="eyebrow border-b border-line pb-3"
              >
                {section.heading}
              </h2>
              <ul className="mt-4 flex list-none flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-quiet">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </PageShell>
    </>
  );
}
