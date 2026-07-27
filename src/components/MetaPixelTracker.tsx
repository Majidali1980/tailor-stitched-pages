import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { fbTrack } from '@/lib/metaPixel';

// Route path prefixes that count as "service / content" pages for ViewContent.
const VIEW_CONTENT_PREFIXES = [
  '/services',
  '/gallery',
  '/bridal-dress-stitching',
  '/shalwar-kameez-stitching',
  '/pakistani-tailor-online',
  '/product/',
  '/special-discount-offers',
];

const CHECKOUT_LABELS = [
  'book now',
  'order now',
  'place order',
  'book appointment',
  'book an appointment',
  'confirm via whatsapp',
];

const isWhatsAppHref = (href: string | null | undefined) => {
  if (!href) return false;
  const h = href.toLowerCase();
  return h.includes('wa.me') || h.includes('api.whatsapp.com') || h.includes('whatsapp://');
};

const MetaPixelTracker = () => {
  const location = useLocation();
  const lastPath = useRef<string | null>(null);

  // PageView + ViewContent on every route change
  useEffect(() => {
    const path = location.pathname;
    if (lastPath.current === path) return;
    lastPath.current = path;

    fbTrack('PageView');

    if (VIEW_CONTENT_PREFIXES.some((p) => path === p || path.startsWith(p + '/') || path.startsWith(p))) {
      fbTrack('ViewContent', { content_path: path });
    }
  }, [location.pathname]);

  // Global click delegation for Contact (WhatsApp) + InitiateCheckout (booking CTAs)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest('a, button') as HTMLAnchorElement | HTMLButtonElement | null;
      if (!el) return;

      // Contact — any WhatsApp link
      if (el.tagName === 'A') {
        const href = (el as HTMLAnchorElement).getAttribute('href');
        if (isWhatsAppHref(href)) {
          fbTrack('Contact');
        }
      }

      // InitiateCheckout — CTA buttons/links by visible text
      const label = (el.textContent || '').trim().toLowerCase();
      if (label && CHECKOUT_LABELS.some((l) => label === l || label.includes(l))) {
        fbTrack('InitiateCheckout');
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
};

export default MetaPixelTracker;
