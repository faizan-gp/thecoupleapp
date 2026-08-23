import { Fraunces, Inter, Noto_Naskh_Arabic, Noto_Sans_Devanagari } from "next/font/google";

/**
 * Typography, defined once.
 *
 * Display is Fraunces — a high-contrast serif with a true italic — and body is
 * Inter, a neutral sans that stays out of the serif's way. Headlines are the
 * editorial voice; the italic (always in an accent color, see globals.css) is
 * where that voice leans in.
 *
 * Latin faces carry no Devanagari or Arabic glyphs, so `hi` and `ar` fall
 * through to the Noto faces per glyph via the font stacks in globals.css. Those
 * two are not preloaded: their unicode-ranges mean a Latin page never fetches
 * them, and preloading would cost every visitor a request they cannot use.
 *
 * All four are variable fonts, so no weight list is needed. Fraunces ships two
 * files per subset (roman + italic — the italic is real, not synthesized).
 * next/font self-hosts them at build time — no request ever leaves the
 * visitor's browser for a font (and `font-src 'self'` in the CSP stays valid).
 */

export const displayFace = Fraunces({
  variable: "--face-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const bodyFace = Inter({
  variable: "--face-body",
  subsets: ["latin"],
  display: "swap",
});

export const devanagariFace = Noto_Sans_Devanagari({
  variable: "--face-devanagari",
  subsets: ["devanagari"],
  display: "swap",
  preload: false,
});

export const arabicFace = Noto_Naskh_Arabic({
  variable: "--face-arabic",
  subsets: ["arabic"],
  display: "swap",
  preload: false,
});

/** Every font variable, for the <html> className. */
export const fontVariables = [
  displayFace.variable,
  bodyFace.variable,
  devanagariFace.variable,
  arabicFace.variable,
].join(" ");
