import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";

import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale, localeDir, locales } from "@/lib/i18n/locales";
import { organizationLd, siteNavigationLd, webSiteLd } from "@/lib/seo/json-ld";
import { siteUrl } from "@/lib/site";

import "../globals.css";

// Placeholder face — the design pass (M4, frontend-design skill) picks the
// final display/text pairing incl. Devanagari + Arabic subsets.
const sans = Geist({ variable: "--font-sans", subsets: ["latin"], display: "swap" });

/** Pre-render every locale; unknown locales 404 instead of rendering. */
export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      template: dict.meta.titleTemplate,
      default: dict.meta.home.title,
    },
    description: dict.meta.home.description,
    openGraph: {
      siteName: dict.meta.siteName,
      type: "website",
      locale: lang,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} dir={localeDir(lang)} className={`${sans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <JsonLd data={organizationLd()} />
        <JsonLd data={webSiteLd(lang)} />
        <JsonLd
          data={siteNavigationLd([
            { name: dict.nav.home, path: `/${lang}` },
            { name: dict.nav.apps, path: `/${lang}/apps` },
            { name: dict.nav.blog, path: `/${lang}/blog` },
            { name: dict.nav.about, path: `/${lang}/about` },
            { name: dict.nav.contact, path: `/${lang}/contact` },
          ])}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:start-2 focus:top-2 focus:z-50 focus:rounded focus:border focus:bg-background focus:px-3 focus:py-2"
        >
          {dict.nav.skipToContent}
        </a>
        <Header lang={lang} dict={dict} />
        <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
        <BackToTop label={dict.ui.backToTop} />
      </body>
    </html>
  );
}
