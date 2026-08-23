import { ImageResponse } from "next/og";

import { getAppBySlug, localized } from "@/lib/apps";
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
  const app = getAppBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#171717",
          color: "#ffffff",
          padding: 80,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 700 }}>{app?.name ?? "TheCoupleApp"}</div>
        <div style={{ fontSize: 36, marginTop: 24, color: "#d4d4d4" }}>
          {app ? localized(app.tagline, lang) : "A library of apps for couples"}
        </div>
        <div style={{ fontSize: 28, marginTop: 48, color: "#a3a3a3" }}>TheCoupleApp</div>
      </div>
    ),
    size
  );
}
