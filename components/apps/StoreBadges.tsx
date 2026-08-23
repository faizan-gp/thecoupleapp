import type { CoupleApp } from "@/content/apps";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";

/**
 * Store links as real anchors. The visible label is the store's own name —
 * a brand name, so it is never translated — while the accessible name carries
 * the full localized sentence ("Download HourStory on the App Store"), which is what
 * a screen reader announces and what search engines read as the link text.
 */

function DownloadGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
      <path
        d="M8 1.8v8.4m0 0L4.8 7M8 10.2L11.2 7M2.4 12.4v1.2a.6.6 0 0 0 .6.6h10a.6.6 0 0 0 .6-.6v-1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
      <path
        d="M3.6 2.2l8.6 5.8-8.6 5.8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
      <path
        d="M6.5 9.5l3-3M6.8 4.2l1.4-1.4a2.8 2.8 0 0 1 4 4L10.8 8.2M5.2 7.8L3.8 9.2a2.8 2.8 0 0 0 4 4l1.4-1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StoreBadges({
  app,
  dict,
  size = "default",
}: {
  app: CoupleApp;
  dict: Dictionary;
  /** `compact` is the row inside an app card; `default` is the detail page. */
  size?: "default" | "compact";
}) {
  const badges = [
    {
      href: app.stores.appStore,
      name: "App Store",
      label: interpolate(dict.stores.appStore, { name: app.name }),
      glyph: <DownloadGlyph />,
    },
    {
      href: app.stores.playStore,
      name: "Google Play",
      label: interpolate(dict.stores.playStore, { name: app.name }),
      glyph: <PlayGlyph />,
    },
    {
      href: app.stores.web,
      name: interpolate(dict.stores.web, { name: app.name }),
      label: interpolate(dict.stores.web, { name: app.name }),
      glyph: <LinkGlyph />,
    },
  ].filter((badge): badge is typeof badge & { href: string } => Boolean(badge.href));

  if (badges.length === 0) return null;

  const compact = size === "compact";

  return (
    <ul className="flex list-none flex-wrap gap-2">
      {badges.map((badge, index) => (
        <li key={badge.href}>
          <a
            href={badge.href}
            rel="noopener"
            aria-label={badge.label}
            className={
              compact
                ? "btn btn-quiet px-3.5 py-1.5 text-[0.85rem]"
                : index === 0
                  ? "btn btn-primary"
                  : "btn btn-quiet"
            }
          >
            {badge.glyph}
            {badge.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
