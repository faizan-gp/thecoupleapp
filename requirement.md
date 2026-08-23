# TheCoupleApp — Website Requirements

**Project:** thecoupleapp.com (working name)
**Type:** Marketing / catalog website
**Status:** Draft v1 — 2026-08-23

---

## 1. Vision & Purpose

TheCoupleApp is an umbrella brand for a growing **library of apps for couples**. Each app solves one specific problem for couples (communication, planning, memories, finances, etc.) and ships as its own product. This website is the **main hub** that:

1. Presents the brand and its mission ("a complete library of solutions for couples").
2. Lists every **released** app on the landing page with store links.
3. Teases **upcoming** apps to build anticipation and collect interest.
4. Ranks well organically — the site is the primary acquisition channel, so **SEO is a first-class requirement**, not an afterthought.

### Goals
- Every page is fully server-rendered so Google (and other crawlers) index complete HTML with zero JS required.
- Semantically correct HTML throughout (proper landmarks, heading hierarchy, structured data).
- Multi-language from day one, with correct international SEO (`hreflang`, localized URLs, localized metadata).
- Each app gets its own indexable detail page that can rank for its own keywords.
- Fast: excellent Core Web Vitals on mobile.

### Non-goals (v1)
- No user accounts, auth, or dashboards.
- No CMS/admin panel — content lives in the repo as typed data + translation files.
- No blog in v1 (architecture must leave room for one; see §12).

---

## 2. Tech Stack (already in repo — do not swap)

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.3.2**, App Router | ⚠️ Next 16 has breaking changes vs. older docs. Consult `node_modules/next/dist/docs/` before coding (per `AGENTS.md`). Notably: **Middleware is renamed to Proxy** (`proxy.ts` at project root), `params` is a Promise (`await params`), and `PageProps<'/[lang]'>` / `LayoutProps` typed helpers are globally available. |
| UI | React 19, Server Components by default | Client components only where interactivity demands it (language switcher, mobile nav, carousel). |
| Styling | Tailwind CSS 4 (via `@tailwindcss/postcss`) | Design tokens as CSS variables in `globals.css` (`@theme`). |
| Language | TypeScript, strict | All content models fully typed. |
| Hosting | Vercel (or any Node host) | Must support SSR/ISR — **no `output: 'export'`**. |

### Process requirement — UI skills
Implementation **must** use the installed Claude skills:
- **`frontend-design`** — load before building any UI to establish a distinctive, non-templated visual direction (typography, color, spacing, motion).
- **`web-design-guidelines`** — run as an audit pass after the UI is built (accessibility, UX, interface best practices) and fix all findings.

---

## 3. Rendering & Indexing Architecture

- **All routes are server-rendered.** Marketing content is static per locale, so pages should be **statically generated at build time** (SSG via `generateStaticParams` for every `[lang]` × page combination) — this *is* SSR from the crawler's perspective: full HTML on first byte, and the fastest possible variant of it.
- No content may depend on client-side fetching to appear in the DOM. View-source must show the full page text.
- Interactive islands (language switcher, mobile menu) hydrate progressively; the page must be fully readable and navigable with JavaScript disabled.
- When app data later moves to a remote source, use ISR (`revalidate`) — never client fetching — so HTML stays complete.

---

## 4. Internationalization (i18n)

### Routing
- **Sub-path locale routing**: all pages live under `app/[lang]/…` → `/en`, `/es/apps/...`, etc.
- `proxy.ts` (Next 16's middleware) detects the visitor's locale from the `Accept-Language` header (`negotiator` + `@formatjs/intl-localematcher`) and **redirects** bare paths (`/` → `/en`) — following the pattern in `node_modules/next/dist/docs/01-app/02-guides/internationalization.md`.
- A visitor's explicit language choice (switcher) is persisted in a cookie and takes precedence over the header on later visits.
- Every locale version of every page is pre-rendered via `generateStaticParams`.

### Launch locales
| Code | Language | Direction |
|---|---|---|
| `en` | English (default / `x-default`) | LTR |
| `es` | Spanish | LTR |
| `fr` | French | LTR |
| `de` | German | LTR |
| `pt` | Portuguese | LTR |
| `hi` | Hindi | LTR |
| `ar` | Arabic | **RTL** |

The locale list must be a single config array — adding a language later = add one dictionary file + one array entry.

### Localization mechanics
- Dictionary JSON per locale (`dictionaries/en.json`, …), loaded server-side via a `getDictionary(lang)` helper with `server-only`. No i18n runtime shipped to the client.
- App catalog content (names stay in English; taglines/descriptions/features are translated) is keyed per locale in the content model (§6).
- `<html lang={lang} dir={dir}>` set in the `[lang]` layout. RTL layout must actually mirror (use Tailwind logical properties: `ms-*`, `me-*`, `text-start`, etc. — no hardcoded left/right).
- Dates/numbers formatted with `Intl` using the active locale.

### International SEO
- Every page emits `alternates.languages` metadata → `hreflang` link tags for **all** locales plus `x-default` (pointing at `en`).
- Canonical URL per page per locale (self-referencing).
- Localized `<title>`, `<meta description>`, and OG tags per locale — pulled from the dictionaries, not machine-stubbed.
- `sitemap.ts` lists every URL in every locale with `alternates` entries.

---

## 5. Information Architecture & Routes

All routes are locale-prefixed. `PageProps<'/[lang]/…'>` typing throughout.

| Route | Page | Purpose |
|---|---|---|
| `/[lang]` | **Landing** | Hero + brand promise, grid of released apps, coming-soon teasers, how-it-fits-together story, footer. |
| `/[lang]/apps` | Apps index | Full catalog, filterable by status/category (filters are progressive enhancement — the unfiltered list is in the HTML). |
| `/[lang]/apps/[slug]` | App detail | One page per app — its long-tail SEO surface. Hero, screenshots, feature list, store badges, FAQ. |
| `/[lang]/about` | About | Mission, story, the "library of solutions" thesis. |
| `/[lang]/contact` | Contact | Support email + simple contact form (server action) or `mailto`. |
| `/[lang]/privacy` | Privacy policy | Required by App Store / Play Store listings. |
| `/[lang]/terms` | Terms of use | Ditto. |
| `not-found.tsx` | Localized 404 | With links back to home/apps. |

Special files (no locale prefix): `sitemap.ts`, `robots.ts`, `manifest.ts`, `icon`/`favicon`, `opengraph-image` (per route where feasible).

---

## 6. Content Model — App Catalog

Single source of truth: `content/apps.ts` (typed), one entry per app:

```ts
type CoupleApp = {
  slug: string;                    // URL segment, stable, English
  name: string;                    // brand name, not translated
  category: 'communication' | 'planning' | 'memories' | 'finance' | 'wellness' | 'fun';
  status: 'released' | 'coming-soon' | 'beta';
  releaseDate?: string;            // ISO date
  icon: string;                    // /public path
  screenshots: { src: string; alt: Record<Locale, string> }[];
  stores: { appStore?: string; playStore?: string; web?: string };
  // Localized copy (falls back to `en` if a locale is missing):
  tagline: Record<Locale, string>;
  description: Record<Locale, string>;      // 1–2 paragraphs, unique per app (SEO)
  features: Record<Locale, { title: string; body: string }[]>;
  faq?: Record<Locale, { q: string; a: string }[]>;
  seo: Record<Locale, { title: string; description: string; keywords?: string[] }>;
};
```

Rules:
- Landing page shows `status === 'released'` in the main grid; `coming-soon` in a separate teaser section (never intermixed — don't dilute the "available now" signal).
- Adding a new app = one catalog entry + assets. No layout code changes.
- Missing translations fall back to English at build time with a console warning — never an empty string in production HTML.

---

## 7. SEO Requirements (acceptance-level detail)

### Semantic HTML
- Exactly **one `<h1>` per page** (landing: brand value proposition; app detail: app name + tagline).
- Logical heading order (`h1 → h2 → h3`, no skips). Section titles are real headings, not styled `<div>`s.
- Landmarks: `<header>`, `<nav aria-label>`, `<main>`, `<footer>`; app cards as `<article>`; lists as `<ul>`.
- Store badges and CTAs are real `<a>` elements with descriptive accessible names ("Download {App} on the App Store").
- All images have meaningful, localized `alt` text; decorative images `alt=""`.

### Metadata (Next Metadata API)
- `generateMetadata` on every page: localized title (template: `%s — TheCoupleApp`), description, canonical, `hreflang` alternates, OpenGraph + Twitter cards.
- `metadataBase` set once in the root layout from the production origin (env var `NEXT_PUBLIC_SITE_URL`).
- OG images: branded default plus per-app `opengraph-image` (generated with `next/og`).

### Structured data (JSON-LD, per Next's `json-ld` guide)
- Site-wide: `Organization` + `WebSite`.
- App detail pages: `SoftwareApplication` (name, operatingSystem, applicationCategory, offers with price `0`/actual, store URLs) — and `FAQPage` where FAQ content exists.
- All pages below home: `BreadcrumbList`.
- JSON-LD is rendered server-side in the page HTML (script tag, sanitized).

### Crawling
- `sitemap.ts`: all pages × all locales, with `lastModified` and locale `alternates`.
- `robots.ts`: allow all, reference the sitemap.
- No route requires JS or cookies to render its content.
- 404s return real HTTP 404; the locale redirect in `proxy.ts` uses 307/308 correctly and never redirect-chains (`/apps` → `/en/apps` in one hop).

---

## 8. Landing Page (v1 scope)

Sections, in order — each a semantic `<section>` with an `h2` (hero owns the `h1`):

1. **Hero** — brand promise ("Every part of your relationship, one app at a time" — final copy TBD in dictionaries), primary CTA scrolls/links to the apps grid.
2. **Released apps grid** — the core of the page. Card: icon, name, localized tagline, category tag, store badges. Card links to the app detail page.
3. **Coming soon** — muted teaser cards (name + category + "coming soon" tag), visually subordinate to the released grid.
4. **Why a library, not one bloated app** — 3–4 short value-prop blurbs explaining the multi-app thesis (also good keyword surface).
5. **Footer** — nav (all top-level pages), language switcher, legal links, copyright, socials placeholder.

Header (all pages): logo → `/[lang]`, nav (Apps, About, Contact), language switcher. Mobile: accessible disclosure menu.

---

## 9. Design Requirements

- Direction is set by the **`frontend-design` skill** at implementation time. Constraints it must satisfy:
  - Warm, trustworthy, modern — a couples brand, but **not** clichéd pink-hearts kitsch; no generic AI-template look (no default Tailwind palette dump, no stock gradient-blob hero).
  - Distinct display face for headings + highly readable text face (via `next/font`, self-hosted, `swap`).
  - Design tokens (colors, spacing, radii, type scale) as CSS variables so future per-app accent theming is possible.
  - Light and dark mode via `prefers-color-scheme`; no flash-of-wrong-theme.
  - Fully responsive 360px → 1440px+; RTL mirroring verified in Arabic.
  - Motion is subtle and respects `prefers-reduced-motion`.
- Final pass audited with the **`web-design-guidelines` skill**; all findings fixed before release.

---

## 10. Performance & Quality Budgets

- Core Web Vitals (mobile, lab): **LCP < 2.0s, CLS < 0.05, INP < 200ms**; Lighthouse ≥ 95 in Performance / SEO / Accessibility / Best Practices for `/en` and one app detail page.
- All images through `next/image` with explicit dimensions (zero layout shift); screenshots lazy-loaded below the fold; hero image `priority`.
- Client JS kept minimal: no client-side data fetching, no heavy UI libraries; islands only.
- Accessibility: WCAG 2.1 AA — contrast, focus states, keyboard-only navigation of the full site including the mobile menu and language switcher.

---

## 11. Analytics, Ops & Deployment

- **Analytics:** privacy-friendly, cookieless (e.g. Vercel Analytics or Plausible) — no consent banner needed in v1. If a cookie-based tool is ever added, a GDPR consent layer becomes a requirement.
- **Env:** `NEXT_PUBLIC_SITE_URL` drives `metadataBase`, sitemap, and JSON-LD URLs (no hardcoded domain anywhere).
- **CI gates:** `next build` succeeds, `eslint` clean, TypeScript clean. Build fails on missing `en` dictionary keys.
- **Post-launch:** submit sitemap in Google Search Console (all locales), verify `hreflang` in the International Targeting report, monitor CWV field data.
- **Security headers:** sensible defaults via `next.config.ts` headers (at minimum `X-Content-Type-Options`, `Referrer-Policy`, a CSP compatible with JSON-LD inline scripts).

---

## 12. Future-proofing (design for, don't build)

- **Blog / guides** (`/[lang]/blog/[slug]`, MDX) for content marketing — the `[lang]` layout and dictionary system must not assume a fixed page list.
- **Newsletter capture** on coming-soon apps ("get notified") — leave a slot in the app-detail template.
- **Per-app microsites/deep links** — stable slugs are the contract; never rename a released slug (add redirects if forced).
- **Remote catalog** — `content/apps.ts` is read through one accessor function so a later move to a DB/CMS touches one file.

---

## 13. Milestones

| # | Milestone | Contents |
|---|---|---|
| M1 | Skeleton + i18n | `[lang]` routing, `proxy.ts` locale detection, dictionaries (`en` complete), layout with header/footer, language switcher. |
| M2 | Content & pages | App catalog model, landing page, apps index, app detail template, about/contact/legal. |
| M3 | SEO layer | Metadata + hreflang, JSON-LD, sitemap/robots/manifest, OG images, 404. |
| M4 | Design & polish | `frontend-design` direction applied, dark mode, RTL pass, `web-design-guidelines` audit + fixes. |
| M5 | Launch | Remaining locale translations, Lighthouse/CWV budget verification, deploy, Search Console submission. |

---

## 14. Acceptance Checklist

- [ ] View-source of every page shows complete localized content (no JS required).
- [ ] `/` redirects once to the best locale; every page reachable at `/{lang}/…` for all 7 locales.
- [ ] Every page: one `h1`, valid landmark structure, no heading-level skips.
- [ ] `hreflang` + `x-default` + self-canonical present and consistent on every page.
- [ ] `sitemap.xml` and `robots.txt` valid; JSON-LD passes Google's Rich Results test (Organization, SoftwareApplication, BreadcrumbList, FAQPage).
- [ ] Arabic renders fully mirrored RTL with correct typography.
- [ ] Language switcher keeps the visitor on the equivalent page in the new locale and persists the choice.
- [ ] Lighthouse ≥ 95 across all four categories on mobile for landing + one app page.
- [ ] Keyboard-only walkthrough of the entire site succeeds; axe/`web-design-guidelines` audit clean.
- [ ] Adding a new app is a data-only change (verified by adding a dummy entry).
