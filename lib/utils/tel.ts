/**
 * A `tel:` link from a phone number written for display, so every school can
 * keep its own format in data: "+44 (0)20 7946 0000" → "tel:+442079460000".
 * Keeps a leading + and the digits; drops spaces and punctuation, and a
 * "(0)" trunk prefix that only callers inside the country dial.
 */
export function telHref(phone: string): string {
  const digits = phone.replace(/\(0\)/g, "").replace(/[^\d+]/g, "");
  const international = digits.startsWith("+");
  return `tel:${international ? "+" : ""}${digits.replace(/\+/g, "")}`;
}
