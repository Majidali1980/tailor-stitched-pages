/**
 * Build-time freshness check for sitemap.xml, image-sitemap.xml and
 * sitemap-index.xml.
 *
 * Verifies, on every build (postbuild):
 *  1. All three sitemap files exist and are well-formed enough to parse.
 *  2. They were regenerated AFTER the most recent content change in Supabase
 *     (blog / gallery / service_pages / discount_offers / hero_section).
 *  3. They contain the latest URLs: every published blog post, service page and
 *     discount offer, plus every active gallery image in the image sitemap.
 *
 * Fails the build (exit 1) on missing files, stale generation or missing URLs.
 * Skip with SKIP_SITEMAP_FRESHNESS=1 (offline builds).
 */

import { existsSync, readFileSync, statSync } from 'fs';
import { resolve, join } from 'path';

const BASE_URL = 'https://matailor.lovable.app';
const SUPABASE_URL = 'https://nqbvlbtvmesjhgstznhe.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xYnZsYnR2bWVzamhnc3R6bmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNTkzOTYsImV4cCI6MjA3MTYzNTM5Nn0.leeVdR5ijVl4uIP8Omt-suWHULG5TsWfUxqt8a6kpts';
const H = { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` };

if (process.env.SKIP_SITEMAP_FRESHNESS === '1') {
  console.log('[sitemap-freshness] Skipped via SKIP_SITEMAP_FRESHNESS=1');
  process.exit(0);
}

const errors: string[] = [];
const warnings: string[] = [];
const ok = (m: string) => console.log(`  ✓ ${m}`);
const err = (m: string) => { errors.push(m); console.log(`  ✗ ${m}`); };
const warn = (m: string) => { warnings.push(m); console.log(`  ! ${m}`); };

const FILES = ['sitemap.xml', 'image-sitemap.xml', 'sitemap-index.xml'] as const;

function pathFor(name: string): string | null {
  const dist = resolve('dist', name);
  const pub = resolve('public', name);
  if (existsSync(dist)) return dist;
  if (existsSync(pub)) return pub;
  return null;
}

async function fetchJson<T = any>(path: string): Promise<T[] | null> {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: H });
    if (!r.ok) return null;
    return (await r.json()) as T[];
  } catch {
    return null;
  }
}

console.log('\n🗺️  Sitemap freshness check\n');

// ---------- 1. files exist ----------
const contents: Record<string, string> = {};
const mtimes: Record<string, number> = {};
for (const f of FILES) {
  const p = pathFor(f);
  if (!p) { err(`${f} not found in dist/ or public/`); continue; }
  contents[f] = readFileSync(p, 'utf-8');
  mtimes[f] = statSync(p).mtimeMs;
  const root = f === 'sitemap-index.xml' ? '<sitemapindex' : '<urlset';
  if (!contents[f].includes(root)) err(`${f} missing ${root} root element`);
  else ok(`${f} present and well-formed (${(contents[f].length / 1024).toFixed(1)} KB)`);
}

if (contents['sitemap-index.xml']) {
  for (const child of ['sitemap.xml', 'image-sitemap.xml']) {
    if (!contents['sitemap-index.xml'].includes(`${BASE_URL}/${child}`))
      err(`sitemap-index.xml does not reference ${BASE_URL}/${child}`);
  }
  if (!errors.length) ok('sitemap-index.xml references both child sitemaps');
}

// ---------- 2. regenerated after last content change ----------
console.log('\nregeneration recency');
const tables = ['blog', 'gallery', 'service_pages', 'discount_offers', 'hero_section'];
let latestChange = 0;
let latestSource = '';
let supabaseReachable = false;

for (const t of tables) {
  const rows = await fetchJson<{ updated_at?: string; created_at?: string }>(
    `${t}?select=updated_at,created_at&order=updated_at.desc.nullslast&limit=1`,
  );
  if (rows === null) continue;
  supabaseReachable = true;
  const r = rows[0];
  const ts = Date.parse(r?.updated_at ?? r?.created_at ?? '');
  if (!Number.isNaN(ts) && ts > latestChange) { latestChange = ts; latestSource = t; }
}

if (!supabaseReachable) {
  warn('Supabase unreachable — skipped recency and URL coverage checks');
} else if (!latestChange) {
  warn('no content timestamps found — skipped recency check');
} else {
  const changed = new Date(latestChange).toISOString();
  for (const f of FILES) {
    if (!mtimes[f]) continue;
    if (mtimes[f] + 60_000 < latestChange)
      err(`${f} is STALE — generated ${new Date(mtimes[f]).toISOString()} but ${latestSource} changed ${changed}. Run: bunx tsx scripts/generate-image-sitemap.ts`);
    else ok(`${f} newer than latest content change (${latestSource} @ ${changed})`);
  }
}

// ---------- 3. latest URLs present ----------
if (supabaseReachable) {
  console.log('\nURL coverage');
  const locs = new Set(
    [...(contents['sitemap.xml'] ?? '').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()),
  );
  const imageXml = contents['image-sitemap.xml'] ?? '';

  const missing: string[] = [];
  const checkRoutes = async (table: string, query: string, prefix: string) => {
    const rows = await fetchJson<{ slug: string }>(query);
    if (!rows) return;
    for (const r of rows) {
      if (!r.slug) continue;
      const url = `${BASE_URL}${prefix}${r.slug}`;
      if (!locs.has(url)) missing.push(`${table}: ${url}`);
    }
    ok(`${table}: ${rows.length} URL(s) checked`);
  };

  await checkRoutes('blog', 'blog?select=slug', '/blog/');
  await checkRoutes('service_pages', 'service_pages?select=slug&is_active=eq.true', '/services/');
  await checkRoutes('discount_offers', 'discount_offers?select=slug&is_active=eq.true', '/special-discount-offers/');

  if (missing.length) {
    err(`${missing.length} content URL(s) missing from sitemap.xml (e.g. ${missing.slice(0, 3).join(', ')})`);
  } else ok('all content URLs present in sitemap.xml');

  const gallery = await fetchJson<{ image_url: string }>(
    'gallery?select=image_url&is_active=eq.true&image_url=not.is.null',
  );
  if (gallery) {
    const missingImgs = gallery.filter((g) => g.image_url && !imageXml.includes(g.image_url));
    if (missingImgs.length)
      err(`${missingImgs.length}/${gallery.length} gallery image(s) missing from image-sitemap.xml (e.g. ${missingImgs[0].image_url})`);
    else ok(`all ${gallery.length} active gallery images present in image-sitemap.xml`);
  }
}

// ---------- summary ----------
console.log(
  `\n${errors.length === 0 ? '✅' : '❌'} Sitemap freshness: ${errors.length} error(s), ${warnings.length} warning(s)`,
);
if (errors.length) {
  console.log('\nALERT — sitemaps are out of date or incomplete:');
  errors.forEach((e) => console.log(`  - ${e}`));
  console.log('\nFix: bunx tsx scripts/generate-image-sitemap.ts (regenerates all three files), then rebuild.');
  process.exit(1);
}
