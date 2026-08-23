import { ImageResponse } from "next/og";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, hasLocale } from "@/lib/i18n/locales";

/**
 * Site-wide default OG image, localized (per-app pages override it with their
 * own). Drawn from the design tokens: the ink ground, the two brand rings, and
 * a hairline separating the promise from the wordmark.
 */
export const alt = "TheCoupleApp — A library of apps for couples";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = hasLocale(rawLang) ? rawLang : defaultLocale;
  const dict = await getDictionary(lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#171111",
          color: "#f5eee4",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="88" height="52" viewBox="0 0 40 24" fill="none" strokeWidth="3.4">
            <circle cx="13" cy="12" r="9" stroke="#f0609f" />
            <circle cx="27" cy="12" r="9" stroke="#f97a2f" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 600 }}>{dict.meta.siteName}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
            {dict.home.heroTitle}
          </div>
          <div style={{ display: "flex", height: 1, background: "#463733", margin: "40px 0" }} />
          <div style={{ fontSize: 30, color: "#a99a90", lineHeight: 1.4 }}>
            {dict.meta.home.description}
          </div>
        </div>
      </div>
    ),
    size
  );
}
