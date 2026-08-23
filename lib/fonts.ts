import { Bricolage_Grotesque, Literata, Noto_Naskh_Arabic, Noto_Sans_Devanagari } from "next/font/google";

/**
 * Typography, defined once.
 *
 * Display is a grotesque and body is a serif — the inverse of the usual
 * marketing pairing, and the right way round for a product that calls itself a
 * library: headings are signage, body copy is reading.
 *
 * Latin faces carry no Devanagari or Arabic glyphs, so `hi` and `ar` fall
 * through to the Noto faces per glyph via the font stacks in globals.css. Those
 * two are not preloaded: their unicode-ranges mean a Latin page never fetches
 * them, and preloading would cost every visitor a request they cannot use.
 *
 * All four are variable fonts, so no weight list is needed and each ships as a
 * single file per subset. next/font self-hosts them at build time — no request
 * ever leaves the visitor's browser for a font (and `font-src 'self'` in the
 * CSP stays valid).
 */

export const displayFace = Bricolage_Grotesque({
  variable: "--face-display",
  subsets: ["latin"],
  display: "swap",
});

export const bodyFace = Literata({
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
