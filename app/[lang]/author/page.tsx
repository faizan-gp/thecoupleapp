import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
    { heading: dict.author.educationTitle, body: dict.author.educationBody },
    { heading: dict.author.engineeringTitle, body: dict.author.engineeringBody },
    { heading: dict.author.researchTitle, body: dict.author.researchBody },
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

      <h1 className="text-3xl font-bold">{dict.author.heading}</h1>

      <p className="mt-6 text-2xl font-semibold">{author.name}</p>
      <p className="mt-1 text-sm">{dict.author.role}</p>
      <p className="mt-4 max-w-2xl">{dict.author.intro}</p>

      {sections.map((section) => (
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
        <h2 className="text-2xl font-bold">{dict.author.stackTitle}</h2>
        <ul className="mt-4 flex max-w-2xl list-none flex-wrap gap-2">
          {author.stack.map((item) => (
            <li key={item} className="rounded border px-3 py-1 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{dict.author.contactTitle}</h2>
        <p className="mt-4 max-w-2xl">
          {dict.author.contactBody}{" "}
          <a href={`mailto:${supportEmail}`} className="font-semibold underline">
            {supportEmail}
          </a>
        </p>
        <p className="mt-2">
          <a
            href={author.github}
            rel="me noopener noreferrer"
            target="_blank"
            className="font-semibold underline"
          >
            {dict.author.githubLabel}
          </a>
        </p>
      </section>
    </>
  );
}
