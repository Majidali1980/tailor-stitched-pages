/**
 * Blog slugs that no longer have their own post page.
 * A visit to /blog/<key> redirects to the mapped route instead.
 * Shared with scripts/check-sitemap-freshness.ts so redirecting slugs
 * are excluded from the sitemap URL coverage check.
 */
export const BLOG_REDIRECTS: Record<string, string> = {
  design_16: '/blog',
  'ma-tailor-ai-image-disclaimer-privacy-policy-detailed-blog-post': '/privacy-policy',
};
