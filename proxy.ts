import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, hasLocale, LOCALE_COOKIE, localeCodes } from "@/lib/i18n/locales";

/**
 * Locale negotiation (Next 16 Proxy — the renamed Middleware).
 * Order of precedence: explicit choice (cookie) → Accept-Language → default.
 */
function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && hasLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const languages = new Negotiator({
      headers: { "accept-language": acceptLanguage },
    }).languages();
    try {
      return match(languages, localeCodes, defaultLocale);
    } catch {
      return defaultLocale;
    }
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = localeCodes.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  const localizedPathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  // Default locale: rewrite so the canonical URL (e.g. "/", "/apps") serves
  // /en content directly with no visible redirect and no extra 307 hop.
  if (locale === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = localizedPathname;
    return NextResponse.rewrite(url);
  }

  // Non-default locale: redirect so the URL reflects the negotiated language.
  // 307 (not 308) because the target depends on the visitor's language and
  // must stay renegotiable.
  request.nextUrl.pathname = localizedPathname;
  return NextResponse.redirect(request.nextUrl, 307);
}

export const config = {
  // Skip Next internals, API routes, and any file with an extension
  // (public/ assets, favicon.ico, sitemap.xml, robots.txt, …).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
