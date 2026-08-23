import type { Metadata } from "next";
import { notFound } from "next/navigation";

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

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: `/${lang}` },
          { name: dict.meta.about.title, path: `/${lang}/about` },
        ])}
      />
      <h1 className="text-3xl font-bold">{dict.about.title}</h1>
      {dict.about.body.map((paragraph) => (
        <p key={paragraph} className="mt-4 max-w-2xl">
          {paragraph}
        </p>
      ))}

      {[
        { heading: dict.about.whoWeAreTitle, body: dict.about.whoWeAreBody },
        { heading: dict.about.whatWeDoTitle, body: dict.about.whatWeDoBody },
      ].map((section) => (
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
        <h2 className="text-2xl font-bold">{dict.about.contactTitle}</h2>
        <p className="mt-4 max-w-2xl">
          {dict.about.contactBody}{" "}
          <a href={`mailto:${supportEmail}`} className="font-semibold underline">
            {supportEmail}
          </a>
        </p>
      </section>
    </>
  );
}
