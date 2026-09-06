import { lazy, type ComponentType } from 'react';

/**
 * React.lazy with automatic retry + one-time page reload fallback.
 * Protects against "Failed to fetch dynamically imported module" errors
 * caused by stale/aborted chunk requests after a new deploy.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  key: string,
) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (err) {
      // Retry once after a short delay (transient network / HMR hiccup)
      await new Promise((r) => setTimeout(r, 500));
      try {
        return await factory();
      } catch (err2) {
        const flag = `chunk-reload:${key}`;
        if (typeof window !== 'undefined' && !sessionStorage.getItem(flag)) {
          sessionStorage.setItem(flag, '1');
          window.location.reload();
          // Never resolves; page is reloading.
          return await new Promise<{ default: T }>(() => {});
        }
        throw err2;
      }
    }
  });
}
