// Fire a GA4 event if analytics is loaded (consent granted); no-op otherwise.
export function trackEvent(name: string, params?: Record<string, string>) {
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    w.gtag?.("event", name, params);
}