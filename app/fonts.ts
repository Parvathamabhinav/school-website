import { Inter, Newsreader } from "next/font/google";

/**
 * Self-hosted variable fonts (no runtime requests to Google).
 *
 * - Newsreader: editorial serif for display and headings. The optical-size
 *   axis keeps it refined at large sizes and sturdy at small ones.
 * - Inter: highly legible sans for body copy, labels and metadata.
 *
 * Exposed as CSS variables and consumed by the font tokens in globals.css.
 */
export const displayFont = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
