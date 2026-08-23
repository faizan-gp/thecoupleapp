import { ImageResponse } from "next/og";

import { getAppBySlug, localized } from "@/lib/apps";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, hasLocale } from "@/lib/i18n/locales";

/** Per-app, per-locale OG image generated with next/og. */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = hasLocale(rawLang) ? rawLang : defaultLocale;
  const dict = await getDictionary(lang);
  const app = getAppBySlug(slug);
  const released = app?.status === "released";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#131020",
          color: "#ece8f7",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="60" height="36" viewBox="0 0 40 24" fill="none" strokeWidth="2.6">
            <circle cx="13" cy="12" r="9.4" stroke="#a79dff" />
            <circle cx="27" cy="12" r="9.4" stroke="#e58ab4" />
          </svg>
          <div style={{ fontSize: 26, color: "#a49cbe" }}>{dict.meta.siteName}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, color: "#a49cbe", letterSpacing: 4 }}>
            {app
              ? `${dict.categories[app.category].toUpperCase()} · ${(released
                  ? dict.statuses.released
                  : dict.home.comingSoonTag
                ).toUpperCase()}`
              : ""}
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -3,
              marginTop: 18,
            }}
          >
            {app?.name ?? dict.meta.siteName}
          </div>
          <div style={{ display: "flex", height: 1, background: "#443c69", margin: "36px 0" }} />
          <div style={{ fontSize: 34, color: "#a49cbe", lineHeight: 1.35 }}>
            {app ? localized(app.tagline, lang) : dict.meta.home.description}
          </div>
        </div>
      </div>
    ),
    size
  );
}
