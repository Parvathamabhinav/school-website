import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

/**
 * ARIA tabs with automatic activation, for "index controls a media panel"
 * patterns. Hover (mouse), focus, click and arrow keys (with wrap, plus
 * Home/End) all select the same item, so pointer and keyboard users get
 * identical behaviour. Only the selected tab is in the Tab sequence; Tab
 * moves on into the panel.
 *
 * Spread getTabProps(i) on each <button>, tablistProps on the list and
 * panelProps on the single shared panel. Give each item's description
 * element id={descriptionId(i)}: tabs reference it via aria-describedby, so
 * screen readers announce the description with the tab, even while hidden.
 */
export function useTablist(count: number, orientation: "horizontal" | "vertical") {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const panelId = `${baseId}-panel`;
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const descriptionId = (index: number) => `${baseId}-description-${index}`;

  // Focusing a tab activates it (see onFocus).
  const focusTab = (index: number) => tabs.current[(index + count) % count]?.focus();

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => focusTab(active + 1),
      ArrowRight: () => focusTab(active + 1),
      ArrowUp: () => focusTab(active - 1),
      ArrowLeft: () => focusTab(active - 1),
      Home: () => focusTab(0),
      End: () => focusTab(count - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  const getTabProps = (index: number) => ({
    ref: (element: HTMLButtonElement | null) => {
      tabs.current[index] = element;
    },
    type: "button" as const,
    role: "tab",
    id: tabId(index),
    "aria-selected": index === active,
    "aria-controls": panelId,
    "aria-describedby": descriptionId(index),
    tabIndex: index === active ? 0 : -1,
    onFocus: () => setActive(index),
    onPointerEnter: (event: PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === "mouse") setActive(index);
    },
    onClick: () => setActive(index),
    onKeyDown,
  });

  return {
    active,
    getTabProps,
    descriptionId,
    tablistProps: { role: "tablist", "aria-orientation": orientation },
    panelProps: { role: "tabpanel", id: panelId, "aria-labelledby": tabId(active), tabIndex: 0 },
  };
}
