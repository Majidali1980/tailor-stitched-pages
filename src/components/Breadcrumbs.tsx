import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Home } from 'lucide-react';

const SITE = 'https://matailor.lovable.app';

// Human-readable overrides for known slugs
const LABELS: Record<string, string> = {
  'ai-design-studio': 'AI Design Studio',
  'bulk-orders': 'Bulk Orders',
  'track-order': 'Track Order',
  'pakistani-tailor-online': 'Pakistani Tailor Online',
  'bridal-dress-stitching': 'Bridal Dress Stitching',
  'shalwar-kameez-stitching': 'Shalwar Kameez Stitching',
  'special-discount-offers': 'Special Discount Offers',
  'privacy-policy': 'Privacy Policy',
  'terms-of-use': 'Terms of Use',
  faq: 'FAQ',
  blog: 'Blog',
  category: 'Category',
  tag: 'Tag',
};

const humanize = (seg: string) =>
  LABELS[seg] ??
  decodeURIComponent(seg)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

// Routes where breadcrumbs should NOT render
const HIDDEN_PREFIXES = ['/admin', '/lovable'];

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  if (pathname === '/' || HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((seg, i) => {
    const to = '/' + segments.slice(0, i + 1).join('/');
    return { label: humanize(seg), to };
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      ...crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: c.label,
        item: `${SITE}${c.to}`,
      })),
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav
        aria-label="Breadcrumb"
        className="bg-black/60 border-b border-gold/10 pt-24 lg:pt-32"
      >
        <div className="container mx-auto px-4 py-2">
          <ol className="flex flex-wrap items-center gap-1 text-xs sm:text-sm font-montserrat text-gray-300 overflow-x-auto">
            <li className="flex items-center">
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-gold transition-colors"
                aria-label="Home"
              >
                <Home className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Home</span>
              </Link>
            </li>
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={c.to} className="flex items-center gap-1 min-w-0">
                  <ChevronRight className="h-3.5 w-3.5 text-gray-500 shrink-0" aria-hidden="true" />
                  {last ? (
                    <span
                      className="text-gold truncate max-w-[60vw]"
                      aria-current="page"
                    >
                      {c.label}
                    </span>
                  ) : (
                    <Link
                      to={c.to}
                      className="hover:text-gold transition-colors truncate max-w-[40vw]"
                    >
                      {c.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;
