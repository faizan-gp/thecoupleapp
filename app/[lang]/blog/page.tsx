import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs, PageShell, PageTitle } from "@/components/layout/Page";
import { JsonLd } from "@/components/seo/JsonLd";
import { localized } from "@/lib/apps";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale } from "@/lib/i18n/locales";
import { getAllPosts } from "@/lib/posts";
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
    title: dict.blog.title,
    description: dict.blog.description,
    alternates: localeAlternates(lang, "/blog"),
  };
}

export default async function BlogIndexPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const posts = getAllPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: `/${lang}` },
          { name: dict.blog.title, path: `/${lang}/blog` },
        ])}
      />

      <PageShell>
        <Breadcrumbs
          label={dict.nav.breadcrumb}
          items={[{ name: dict.nav.home, href: `/${lang}` }, { name: dict.blog.title }]}
        />
        <PageTitle title={dict.blog.title} lead={dict.blog.intro} />

        {posts.length === 0 ? (
          <p className="prose mt-12 rounded-[14px] border border-dashed border-line-strong p-8 text-muted">
            {dict.blog.empty}
          </p>
        ) : (
          <ul className="mt-12 grid list-none grid-cols-1 gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="card h-full p-6">
                  <p className="eyebrow">
                    <time dateTime={post.publishedDate}>
                      {new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(
                        new Date(post.publishedDate)
                      )}
                    </time>
                  </p>
                  <h2 className="t-card mt-3">
                    <Link href={`/${lang}/blog/${post.slug}`} className="link-title">
                      {localized(post.title, lang)}
                    </Link>
                  </h2>
                  <p className="mt-3 text-muted">{localized(post.summary, lang)}</p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </PageShell>
    </>
  );
}
