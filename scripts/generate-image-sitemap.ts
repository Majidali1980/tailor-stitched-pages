/**
 * Generates public/image-sitemap.xml (Google image sitemap format) and
 * public/sitemap-index.xml referencing both the URL sitemap and the image
 * sitemap. Runs before dev/build so both files stay in sync with Supabase
 * content plus the static service landing pages.
 */

import { writeFileSync, existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { serviceLandingPages } from '../src/data/serviceLandingPages';
import { BLOG_REDIRECTS } from '../src/lib/blogRedirects';

const BASE_URL = 'https://matailor.lovable.app';
const SUPABASE_URL = 'https://nqbvlbtvmesjhgstznhe.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xYnZsYnR2bWVzamhnc3R6bmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNTkzOTYsImV4cCI6MjA3MTYzNTM5Nn0.leeVdR5ijVl4uIP8Omt-suWHULG5TsWfUxqt8a6kpts';

const H = { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` };

interface ImageEntry {
  loc: string;
  caption?: string;
  title?: string;
}
interface PageImages {
  pageUrl: string;
  images: ImageEntry[];
}

function xmlEscape(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function fetchJson<T = any>(path: string): Promise<T[]> {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: H });
    if (!r.ok) return [];
    return (await r.json()) as T[];
  } catch {
    return [];
  }
}

async function collect(): Promise<PageImages[]> {
  const [gallery, blog, hero, offers, servicePagesDb] = await Promise.all([
    fetchJson<{ image_url: string; caption: string | null }>(
      'gallery?select=image_url,caption&is_active=eq.true&image_url=not.is.null',
    ),
    fetchJson<{ slug: string; title: string; featured_image_url: string | null }>(
      'blog?select=slug,title,featured_image_url&is_published=eq.true&featured_image_url=not.is.null',
    ),
    fetchJson<{ title: string | null; image_url: string | null }>(
      'hero_section?select=title,image_url&is_active=eq.true&image_url=not.is.null',
    ),
    fetchJson<{ slug: string; title: string; image_url: string | null }>(
      'discount_offers?select=slug,title,image_url&is_active=eq.true&image_url=not.is.null',
    ),
    fetchJson<{
      slug: string;
      service_name: string | null;
      hero_image_url: string | null;
      hero_image_alt: string | null;
      images: { src: string; alt?: string }[] | null;
    }>(
      'service_pages?select=slug,service_name,hero_image_url,hero_image_alt,images&is_active=eq.true',
    ),
  ]);

  const pages: PageImages[] = [];

  // Homepage: hero images + up to 20 gallery highlights
  const homeImages: ImageEntry[] = [];
  for (const h of hero) {
    if (h.image_url)
      homeImages.push({ loc: h.image_url, caption: h.title ?? undefined });
  }
  for (const g of gallery.slice(0, 20)) {
    homeImages.push({ loc: g.image_url, caption: g.caption ?? undefined });
  }
  if (homeImages.length) pages.push({ pageUrl: `${BASE_URL}/`, images: homeImages });

  // Gallery page: every gallery image
  if (gallery.length) {
    pages.push({
      pageUrl: `${BASE_URL}/gallery`,
      images: gallery.map((g) => ({
        loc: g.image_url,
        caption: g.caption ?? undefined,
      })),
    });
  }

  // Blog posts
  for (const b of blog) {
    if (!b.featured_image_url || BLOG_REDIRECTS[b.slug]) continue;
    pages.push({
      pageUrl: `${BASE_URL}/blog/${b.slug}`,
      images: [{ loc: b.featured_image_url, caption: b.title, title: b.title }],
    });
  }

  // Discount offers
  for (const o of offers) {
    if (!o.image_url) continue;
    pages.push({
      pageUrl: `${BASE_URL}/special-discount-offers/${o.slug}`,
      images: [{ loc: o.image_url, caption: o.title, title: o.title }],
    });
  }

  // Service landing pages — Supabase first, then static fallback
  const seenServiceSlugs = new Set<string>();
  for (const s of servicePagesDb) {
    if (!s.slug) continue;
    seenServiceSlugs.add(s.slug);
    const imgs: ImageEntry[] = [];
    if (s.hero_image_url)
      imgs.push({
        loc: s.hero_image_url,
        caption: s.hero_image_alt ?? s.service_name ?? undefined,
      });
    if (Array.isArray(s.images)) {
      for (const img of s.images) {
        if (img?.src) imgs.push({ loc: img.src, caption: img.alt });
      }
    }
    if (imgs.length)
      pages.push({ pageUrl: `${BASE_URL}/services/${s.slug}`, images: imgs });
  }
  for (const [slug, cfg] of Object.entries(serviceLandingPages)) {
    if (seenServiceSlugs.has(slug)) continue;
    const imgs: ImageEntry[] = [];
    if (cfg.heroImage?.src)
      imgs.push({ loc: cfg.heroImage.src, caption: cfg.heroImage.alt });
    if (Array.isArray(cfg.images)) {
      for (const img of cfg.images) {
        if (img?.src) imgs.push({ loc: img.src, caption: img.alt });
      }
    }
    if (imgs.length)
      pages.push({ pageUrl: `${BASE_URL}/services/${slug}`, images: imgs });
  }

  return pages;
}

function renderImageSitemap(pages: PageImages[]): string {
  const urls = pages
    .map((p) => {
      const imgs = p.images
        .map((i) => {
          const parts = [`      <image:loc>${xmlEscape(i.loc)}</image:loc>`];
          if (i.caption)
            parts.push(`      <image:caption>${xmlEscape(i.caption)}</image:caption>`);
          if (i.title)
            parts.push(`      <image:title>${xmlEscape(i.title)}</image:title>`);
          return `    <image:image>\n${parts.join('\n')}\n    </image:image>`;
        })
        .join('\n');
      return `  <url>\n    <loc>${xmlEscape(p.pageUrl)}</loc>\n${imgs}\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;
}

function renderSitemapIndex(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${BASE_URL}/sitemap.xml</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>\n  <sitemap>\n    <loc>${BASE_URL}/image-sitemap.xml</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>\n</sitemapindex>\n`;
}

function injectImagesIntoSitemap(sitemap: string, pages: PageImages[]): string {
  const byUrl = new Map(pages.map((p) => [p.pageUrl, p.images] as const));
  let out = sitemap;
  if (!/xmlns:image=/.test(out)) {
    out = out.replace(
      /<urlset\s+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`,
    );
  }
  // Strip previously-injected image blocks so we regenerate cleanly
  out = out.replace(/\s*<image:image>[\s\S]*?<\/image:image>/g, '');

  out = out.replace(/<url>([\s\S]*?)<\/url>/g, (match, inner) => {
    const locMatch = inner.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch) return match;
    const url = locMatch[1].trim();
    const imgs = byUrl.get(url);
    if (!imgs || !imgs.length) return match;
    const imgXml = imgs
      .map((i) => {
        const parts = [`      <image:loc>${xmlEscape(i.loc)}</image:loc>`];
        if (i.title)
          parts.push(`      <image:title>${xmlEscape(i.title)}</image:title>`);
        if (i.caption)
          parts.push(`      <image:caption>${xmlEscape(i.caption)}</image:caption>`);
        return `    <image:image>\n${parts.join('\n')}\n    </image:image>`;
      })
      .join('\n');
    return `<url>${inner}${imgXml}\n  </url>`;
  });

  return out;
}

async function collectContentUrls(): Promise<string[]> {
  const [blog, services, offers] = await Promise.all([
    fetchJson<{ slug: string }>('blog?select=slug&is_published=eq.true'),
    fetchJson<{ slug: string }>('service_pages?select=slug&is_active=eq.true'),
    fetchJson<{ slug: string }>('discount_offers?select=slug&is_active=eq.true'),
  ]);

  return [
    ...blog
      .filter((row) => row.slug && !BLOG_REDIRECTS[row.slug])
      .map((row) => `${BASE_URL}/blog/${row.slug}`),
    ...services
      .filter((row) => Boolean(row.slug))
      .map((row) => `${BASE_URL}/services/${row.slug}`),
    ...offers
      .filter((row) => Boolean(row.slug))
      .map((row) => `${BASE_URL}/special-discount-offers/${row.slug}`),
  ];
}

function addMissingContentUrls(sitemap: string, urls: string[]): string {
  const existing = new Set(
    [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim()),
  );
  const missing = [...new Set(urls)].filter((url) => !existing.has(url));
  if (!missing.length) return sitemap;

  const additions = missing
    .map(
      (url) =>
        `  <url>\n    <loc>${xmlEscape(url)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`,
    )
    .join('\n');
  return sitemap.replace(/<\/urlset>/i, `${additions}\n</urlset>`);
}

async function main() {
  const pages = await collect();
  const contentUrls = await collectContentUrls();
  const totalImages = pages.reduce((n, p) => n + p.images.length, 0);
  writeFileSync(resolve('public/image-sitemap.xml'), renderImageSitemap(pages));
  writeFileSync(resolve('public/sitemap-index.xml'), renderSitemapIndex());
  const sitemapPath = resolve('public/sitemap.xml');
  if (existsSync(sitemapPath)) {
    const current = addMissingContentUrls(readFileSync(sitemapPath, 'utf8'), contentUrls);
    writeFileSync(sitemapPath, injectImagesIntoSitemap(current, pages));
  } else {
    console.warn('warning: public/sitemap.xml missing — index will 404 that entry');
  }
  console.log(
    `image-sitemap.xml written (${pages.length} pages, ${totalImages} images); sitemap.xml enriched with per-URL image entries; sitemap-index.xml written`,
  );
}

main().catch((e) => {
  console.error('generate-image-sitemap failed:', e);
  process.exit(1);
});
