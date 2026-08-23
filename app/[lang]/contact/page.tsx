import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale } from "@/lib/i18n/locales";
import { breadcrumbLd } from "@/lib/seo/json-ld";
import { localeAlternates } from "@/lib/seo/metadata";

const SUPPORT_EMAIL = "hello@thecoupleapp.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: localeAlternates(lang, "/contact"),
  };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: `/${lang}` },
          { name: dict.meta.contact.title, path: `/${lang}/contact` },
        ])}
      />
      <h1 className="text-3xl font-bold">{dict.contact.title}</h1>
      <p className="mt-4 max-w-2xl">{dict.contact.body}</p>
      <p className="mt-4">
        {dict.contact.emailCta}{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold underline">
          {SUPPORT_EMAIL}
        </a>
      </p>
    </>
  );
}
