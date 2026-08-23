import type { CoupleApp } from "@/content/apps";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";

/**
 * Store links as real anchors with descriptive accessible names
 * ("Download Duet on the App Store"). Badge artwork lands in the design pass.
 */
export function StoreBadges({ app, dict }: { app: CoupleApp; dict: Dictionary }) {
  const badges = [
    { href: app.stores.appStore, label: interpolate(dict.stores.appStore, { name: app.name }) },
    { href: app.stores.playStore, label: interpolate(dict.stores.playStore, { name: app.name }) },
    { href: app.stores.web, label: interpolate(dict.stores.web, { name: app.name }) },
  ].filter((badge): badge is { href: string; label: string } => Boolean(badge.href));

  if (badges.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-3">
      {badges.map((badge) => (
        <li key={badge.href}>
          <a
            href={badge.href}
            rel="noopener"
            className="inline-block rounded border px-4 py-2 hover:underline"
          >
            {badge.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
