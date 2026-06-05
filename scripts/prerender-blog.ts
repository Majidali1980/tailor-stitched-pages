/**
 * Build-time prerender for blog posts.
 *
 * After `vite build`, this script:
 *   1. Reads dist/index.html (the Vite-built SPA shell with hashed asset links)
 *   2. Fetches all published blog posts from Supabase
 *   3. For each post, generates dist/blog/<slug>/index.html with
 *      per-route canonical, robots, OpenGraph, Twitter Card, and JSON-LD
 *      tags baked into the initial HTML (visible to non-JS crawlers like
 *      LinkedIn, Slack, Facebook, X).
 *
 * Static hosts (Lovable / Netlify / Vercel) serve dist/blog/<slug>/index.html
 * when the URL matches; the React app still hydrates and renders the page
 * client-side as before.
 */

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';

const BASE_URL = 'https://matailor.lovable.app';
const SUPABASE_URL = 'https://nqbvlbtvmesjhgstznhe.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xYnZsYnR2bWVzamhnc3R6bmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNTkzOTYsImV4cCI6MjA3MTYzNTM5Nn0.leeVdR5ijVl4uIP8Omt-suWHULG5TsWfUxqt8a6kpts';

const DIST = resolve('dist');
const SHELL_PATH = resolve(DIST, 'index.html');

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  author_name: string | null;
  meta_title: string | null;
  meta_description: string | null;
  category: string | null;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clamp(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 1).trimEnd() + '…';
}

function buildHead(post: BlogPost): string {
  const url = `${BASE_URL}/blog/${post.slug}`;
  const title = clamp(post.meta_title || `${post.title} | MA Tailor Blog`, 60);
  const description = clamp(
    post.meta_description || post.excerpt || post.title,
    160,
  );
  const image = post.featured_image_url || '';
  const published = post.published_at || post.created_at;
  const author = post.author_name || 'MA Tailor';
  const keywords = (post.tags || []).join(', ');

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description,
    image: image ? [image] : undefined,
    author: { '@type': 'Person', name: author },
    publisher: {
      '@type': 'Organization',
      name: 'MA Tailor',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
    },
    datePublished: published,
    dateModified: published,
    mainEntityOfPage: url,
  });

  const tagsMeta = (post.tags || [])
    .map(t => `    <meta property="article:tag" content="${escapeHtml(t)}" />`)
    .join('\n');

  return [
    `    <!-- BEGIN prerendered blog head -->`,
    `    <title>${escapeHtml(title)}</title>`,
    `    <meta name="description" content="${escapeHtml(description)}" />`,
    keywords && `    <meta name="keywords" content="${escapeHtml(keywords)}" />`,
    `    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `    <link rel="canonical" href="${url}" />`,
    `    <meta property="og:type" content="article" />`,
    `    <meta property="og:site_name" content="MA Tailor" />`,
    `    <meta property="og:locale" content="en_US" />`,
    `    <meta property="og:url" content="${url}" />`,
    `    <meta property="og:title" content="${escapeHtml(post.meta_title || post.title)}" />`,
    `    <meta property="og:description" content="${escapeHtml(description)}" />`,
    image && `    <meta property="og:image" content="${escapeHtml(image)}" />`,
    image && `    <meta property="og:image:alt" content="${escapeHtml(post.title)}" />`,
    `    <meta property="article:published_time" content="${published}" />`,
    `    <meta property="article:author" content="${escapeHtml(author)}" />`,
    post.category && `    <meta property="article:section" content="${escapeHtml(post.category)}" />`,
    tagsMeta,
    `    <meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    `    <meta name="twitter:title" content="${escapeHtml(post.meta_title || post.title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(description)}" />`,
    image && `    <meta name="twitter:image" content="${escapeHtml(image)}" />`,
    `    <script type="application/ld+json">${jsonLd}</script>`,
    `    <!-- END prerendered blog head -->`,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Strip the sitewide tags from the SPA shell that we override per-post.
 * Keeps verification meta, viewport, charset, scripts, AdSense, GA, etc.
 */
function stripShellTags(html: string): string {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']keywords["'][^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:(title|description|type|url|image)["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:(card|title|description|image|site)["'][^>]*>/gi, '');
}

async function fetchPosts(): Promise<BlogPost[]> {
  const url =
    `${SUPABASE_URL}/rest/v1/blog?is_published=eq.true` +
    `&select=slug,title,excerpt,content,featured_image_url,author_name,meta_title,meta_description,category,tags,published_at,created_at`;
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
  });
  if (!res.ok) throw new Error(`Supabase fetch failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  if (!existsSync(SHELL_PATH)) {
    console.warn(`[prerender-blog] dist/index.html not found at ${SHELL_PATH}; skipping.`);
    return;
  }
  const shell = readFileSync(SHELL_PATH, 'utf8');
  const stripped = stripShellTags(shell);

  const posts = await fetchPosts();
  console.log(`[prerender-blog] prerendering ${posts.length} blog posts…`);

  let ok = 0;
  for (const post of posts) {
    if (!post.slug) continue;
    const head = buildHead(post);
    const html = stripped.replace(/<\/head>/i, `${head}\n  </head>`);
    const outPath = resolve(DIST, 'blog', post.slug, 'index.html');
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    ok++;
  }
  console.log(`[prerender-blog] wrote ${ok} files into dist/blog/<slug>/index.html`);
}

main().catch(err => {
  console.error('[prerender-blog] failed:', err);
  // Non-fatal: SPA shell still serves the page, Helmet hydrates tags client-side.
  process.exit(0);
});
