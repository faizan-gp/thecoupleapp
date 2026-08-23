import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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

      <h1 className="text-3xl font-bold">{dict.blog.title}</h1>
      <p className="mt-3 max-w-2xl">{dict.blog.intro}</p>

      {posts.length === 0 ? (
        <p className="mt-10 max-w-2xl">{dict.blog.empty}</p>
      ) : (
        <ul className="mt-10 grid list-none grid-cols-1 gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="rounded-lg border p-5">
                <h2 className="text-lg font-semibold">
                  <Link href={`/${lang}/blog/${post.slug}`} className="hover:underline">
                    {localized(post.title, lang)}
                  </Link>
                </h2>
                <p className="mt-1 text-sm">
                  <time dateTime={post.publishedDate}>
                    {new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(
                      new Date(post.publishedDate)
                    )}
                  </time>
                </p>
                <p className="mt-3">{localized(post.summary, lang)}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
