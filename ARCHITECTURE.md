# Architecture

Marketing / catalog hub for the TheCoupleApp library. Next.js 16 (App Router), React 19 Server
Components, Tailwind 4, TypeScript strict. Every page is statically generated per locale — full
HTML on first byte, zero JS required to read anything. See [requirement.md](requirement.md) for
the product spec.

## File structure

```
thecoupleapp/
├── proxy.ts                    # Next 16 middleware: locale detection → one-hop 307 (/apps → /en/apps)
├── next.config.ts              # Security headers (CSP compatible with inline JSON-LD)
├── .env.example                # NEXT_PUBLIC_SITE_URL — the only place the domain lives
│
├── content/
│   └── apps.ts                 # App catalog: typed, single source of truth. Adding an app = one entry + assets
│
├── dictionaries/               # One JSON per locale; en.json is the schema
│   ├── en.json  es.json  fr.json  de.json  pt.json  hi.json  ar.json
│
├── lib/
│   ├── site.ts                 # siteUrl / absoluteUrl (from NEXT_PUBLIC_SITE_URL)
│   ├── fonts.ts                # THE type pairing (display/body + Devanagari/Arabic) — next/font
│   ├── apps.ts                 # ONLY sanctioned reader of content/apps.ts (+ localized() fallback)
│   ├── i18n/
│   │   ├── locales.ts          # THE locale array (code/label/dir) — add a language here + one dictionary
│   │   └── dictionaries.ts     # server-only getDictionary(lang), deep en-fallback with build warnings
│   └── seo/
│       ├── metadata.ts         # localeAlternates(): self-canonical + hreflang for all locales + x-default
│       └── json-ld.ts          # Organization, WebSite, SoftwareApplication, BreadcrumbList, FAQPage builders
│
├── components/
│   ├── brand/Mark.tsx          # Two-ring logo + the status glyph (available / soon / open slot)
│   ├── home/LibraryBoard.tsx   # Landing signature: six areas, filled or open, read from the catalog
│   ├── layout/                 # Header (<details> menus), Footer, Page (shell/breadcrumbs/sections),
│   │                           #   NavLinks + LanguageSwitcher (client islands), BackToTop
│   ├── apps/                   # AppCard, FeaturedAppCard, AppRow, AppsBrowser, StoreBadges
│   ├── legal/LegalDocument.tsx # Legal blocks + table of contents
│   └── seo/JsonLd.tsx          # Sanitized server-rendered <script type="application/ld+json">
│
├── app/
│   ├── globals.css             # Tailwind + ALL design tokens and component classes (see Design system)
│   ├── favicon.ico
│   ├── sitemap.ts              # all pages × all locales, each with full hreflang alternates
│   ├── robots.ts               # allow all + sitemap reference
│   ├── manifest.ts
│   ├── opengraph-image.tsx     # site-wide default OG (next/og)
│   └── [lang]/                 # ALL pages are locale-prefixed; root layout lives here (Next 16 i18n pattern)
│       ├── layout.tsx          # <html lang dir>, metadataBase, title template, Org+WebSite JSON-LD,
│       │                       #   generateStaticParams (7 locales), dynamicParams=false
│       ├── page.tsx            # Landing: hero(h1) → library board → available now → coming soon →
│       │                       #   why-a-library → FAQ
│       ├── not-found.tsx       # Localized 404 (real HTTP 404; locale via next/root-params)
│       ├── apps/
│       │   ├── page.tsx        # Full catalog in HTML (filters later = progressive enhancement)
│       │   └── [slug]/
│       │       ├── page.tsx    # Per-app SEO surface: SoftwareApplication + FAQPage + Breadcrumb JSON-LD
│       │       └── opengraph-image.tsx   # per-app, per-locale OG image
│       ├── about/page.tsx  contact/page.tsx  privacy/page.tsx  terms/page.tsx
│
└── public/
    ├── icon.svg                # brand mark: two rings, iris + plum
    └── apps/<slug>/            # per-app assets: icon.svg, screenshots/
```

## How indexing works (Google alignment)

- **Static HTML per locale.** `generateStaticParams` pre-renders every page for all 7 locales
  (`●` SSG in the build output). View-source shows complete localized content; no client fetching.
- **One canonical URL per page per language**, self-referencing, plus `hreflang` link tags for all
  locales and `x-default` → English. Emitted by every page via `localeAlternates()` and mirrored in
  `sitemap.xml` (`xhtml:link` alternates), exactly as Google's localized-versions guidance asks.
- **Locale routing**: sub-path (`/en/...`), negotiated in `proxy.ts` (cookie → `Accept-Language` →
  `en`) with a single 307 hop and no redirect chains. Locale-prefixed URLs are never redirected, so
  Googlebot (which crawls without cookies) reaches every language version directly.
- **Each app = its own indexable page** at `/{lang}/apps/{slug}` with unique title/description/
  keywords per locale (from the catalog's `seo` field), unique descriptive copy, `SoftwareApplication`
  + `FAQPage` + `BreadcrumbList` structured data, and a generated OG image. Slugs are permanent.
- **Semantics**: one `h1` per page, ordered headings, `<header>/<nav aria-label>/<main>/<footer>`
  landmarks, apps as `<article>` in `<ul>` grids, store links as real `<a>` with descriptive names,
  skip-link, RTL via `dir="rtl"` + logical properties (`ms-*/me-*/start/end`).
- **404s are real 404s**; unknown locales are rejected (`dynamicParams = false`).

## Conventions

- **Add a language**: one entry in `lib/i18n/locales.ts` + one `dictionaries/<code>.json`. Missing
  keys fall back to English with a build-log warning — never an empty string in HTML.
- **Add an app**: one entry in `content/apps.ts` + assets in `public/apps/<slug>/`. No layout code.
- **Read the catalog only through `lib/apps.ts`** so a future CMS/DB swap (→ ISR, never client
  fetching) touches one file.
- **Client components are islands only** (`NavLinks`, `LanguageSwitcher`, `BackToTop`); everything
  else is a Server Component. Both header menus are native `<details>` — they work with JS disabled;
  the islands only add `aria-current` and close the disclosure after a client-side navigation.
- **No hardcoded domain** — everything derives from `NEXT_PUBLIC_SITE_URL`.
- **Future room** (design-for, per spec §12): `app/[lang]/blog/[slug]` slots in beside `apps/`;
  the newsletter capture slot is marked in the app-detail template.

## Design system (M4)

Direction: the brand is a **library** of small apps, and every app is made for **two** people.
Both ideas are encoded rather than decorated.

- **Tokens** live only in `app/globals.css`: one `:root` block, one `prefers-color-scheme: dark`
  block, exposed to Tailwind through `@theme inline`. Utilities resolve through `var()`, so dark
  mode needs no `dark:` prefixes anywhere and cannot flash the wrong theme.
- **Two accents, never blended.** `--iris` and `--plum` are equal partners and always appear as two
  discrete marks — never mixed into a gradient. `--paper` / `--surface` / `--sunken` are the three
  grounds; `--line` / `--line-strong` are the only dividers. The single shadow on the site is the
  card hover lift.
- **Type** (`lib/fonts.ts`): Bricolage Grotesque for display, Literata for body — a grotesque over a
  serif, the inverse of the usual marketing pairing and the right way round for a library. Noto Sans
  Devanagari and Noto Naskh Arabic cover `hi`/`ar` per glyph via the stacks in `globals.css`, and are
  not preloaded. All four are variable and self-hosted by `next/font`, so `font-src 'self'` holds.
- **Components** in `globals.css` are flat single classes that style only themselves and set no
  margins — spacing stays in the markup, so nothing there can win a specificity fight with a utility.
- **The signature** is `components/home/LibraryBoard.tsx`: six cells, one per part of a relationship,
  each holding the app that occupies it or drawn as an open shelf. It is derived from the catalog, so
  the count stays true as apps ship. `components/brand/Mark.tsx` carries the two-ring mark and the
  status glyph (both solid = available, both hollow = coming soon, one faint = open).
- **Motion**: one hero entrance (`.rise`), a card hover lift, nothing else — all switched off under
  `prefers-reduced-motion`. No content depends on an animation running.

> **Fonts need the network on the first build.** `next/font/google` downloads and self-hosts the four
> faces at build time; only Geist ships inside Next itself. An offline `next build` fails in
> `lib/fonts.ts` — the one file to change if the pairing ever has to be swapped.

## Pending milestones

- **M5 — launch**: finalize legal copy + store URLs, Lighthouse ≥ 95 verification, deploy, submit
  sitemap in Search Console.

## CI gates

`npm run build` (fails on type errors and missing routes), `npx tsc --noEmit`, `npm run lint` —
all currently clean.
