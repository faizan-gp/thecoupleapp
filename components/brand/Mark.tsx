/**
 * The brand marks.
 *
 * Both are the same shape — two rings, side by side, overlapping slightly.
 * That shape is the whole idea: two people, and two apps' worth of a library
 * that keeps growing. The status glyph re-uses it to say something real:
 *
 *   available  two solid rings, one iris and one plum — both partners have it
 *   soon       two hollow rings — the pair exists, the app doesn't yet
 *   open       one faint ring — nothing occupies this part of the library
 *
 * Marks are inline SVG rather than <img>: no extra request, no layout shift,
 * and they inherit the theme's colors in light and dark without a second file.
 */

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 24"
      width="40"
      height="24"
      fill="none"
      strokeWidth="2.6"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle cx="13" cy="12" r="9.4" stroke="var(--iris)" />
      <circle cx="27" cy="12" r="9.4" stroke="var(--plum)" />
    </svg>
  );
}

export type DuoState = "available" | "soon" | "open";

export function DuoMark({ state, className }: { state: DuoState; className?: string }) {
  const common = {
    viewBox: "0 0 20 12",
    width: 20,
    height: 12,
    "aria-hidden": true as const,
    focusable: "false" as const,
    className,
  };

  if (state === "available") {
    return (
      <svg {...common}>
        <circle cx="5.6" cy="6" r="4.8" fill="var(--iris)" />
        <circle cx="14.4" cy="6" r="4.8" fill="var(--plum)" />
      </svg>
    );
  }

  if (state === "soon") {
    return (
      <svg {...common} fill="none" strokeWidth="1.6">
        <circle cx="5.6" cy="6" r="4.4" stroke="var(--iris)" />
        <circle cx="14.4" cy="6" r="4.4" stroke="var(--plum)" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="none" strokeWidth="1.4">
      <circle cx="10" cy="6" r="4.4" stroke="var(--line-strong)" strokeDasharray="2.4 2.6" />
    </svg>
  );
}
