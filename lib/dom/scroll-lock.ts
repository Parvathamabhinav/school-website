/**
 * Reference-counted page scroll lock for overlays (mobile menu, future
 * dialogs). Nested locks are safe: scrolling resumes only after the last
 * unlock. Layout doesn't shift because <html> reserves the scrollbar gutter
 * (see globals.css).
 */
let activeLocks = 0;

export function lockScroll(): void {
  activeLocks += 1;
  if (activeLocks === 1) document.documentElement.style.overflow = "hidden";
}

export function unlockScroll(): void {
  if (activeLocks === 0) return;
  activeLocks -= 1;
  if (activeLocks === 0) document.documentElement.style.overflow = "";
}
