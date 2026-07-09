/**
 * Shared media-query helpers for motion-aware components. One source of truth
 * so Reveal, the showcase Hero, and the primitives never drift on how they
 * detect reduced-motion / touch-only devices. Safe to call during SSR.
 */

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const noHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

/**
 * Subscribe to mid-session reduced-motion changes (OS toggle, battery saver).
 * Returns an unsubscribe function; a no-op on the server.
 */
export function watchReducedMotion(onChange: (reduced: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = (e: MediaQueryListEvent) => onChange(e.matches);
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}
