// Meta Pixel helper — uses the pixel already installed in index.html.
// Deduplicates events fired within the same tick to avoid double-tracking.

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const recent = new Map<string, number>();
const DEDUPE_MS = 800;

export const fbTrack = (event: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  const key = event + JSON.stringify(params ?? {});
  const now = Date.now();
  const last = recent.get(key) ?? 0;
  if (now - last < DEDUPE_MS) return;
  recent.set(key, now);
  try {
    if (params) window.fbq('track', event, params);
    else window.fbq('track', event);
  } catch {
    /* noop */
  }
};
