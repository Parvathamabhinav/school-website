/** id of each page's <main> element; the skip link targets it. */
export const MAIN_CONTENT_ID = "main-content";

/** First focusable element on every page; visible only when focused. */
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="theme-inverse type-label sr-only z-50 px-md py-sm focus:not-sr-only focus:fixed focus:top-md focus:left-md"
    >
      Skip to main content
    </a>
  );
}
