// Analytics IDs. Set NEXT_PUBLIC_GTM_ID to switch the site to Google Tag Manager
// (GA4 is then loaded from inside GTM). Without it, GA4 is loaded directly.
// Only one of the two is ever loaded, so visits are not counted twice.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-164VVDS7P1';

// Send a named event (e.g. generate_lead) to GA4 through whichever install is active.
// With GTM, create a "Custom Event" trigger with the same event name.
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;

  if (GTM_ID) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
  } else if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}
