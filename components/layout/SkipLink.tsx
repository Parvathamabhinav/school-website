/** id of each page's <main> element; the skip link targets it. */
export const MAIN_CONTENT_ID = "main-content";

/** First focusable element on every page; visible only when focused. */
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="type-label sr-only z-50 bg-primary px-4 py-3 text-on-primary [--color-focus:var(--color-accent)] focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
    >
      Skip to main content
    </a>
  );
}
