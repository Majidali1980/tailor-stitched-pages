// Auto-submits URLs to search engines via IndexNow (Bing, Yandex, DuckDuckGo,
// Seznam) and pings Bing's legacy sitemap endpoint. Google deprecated its
// sitemap ping endpoint in 2023, so fresh content is discovered there via the
// sitemap already referenced in robots.txt.
//
// POST body: { urls?: string[], url?: string }
// If no URLs supplied, submits the sitemap URLs.

const HOST = "matailor.lovable.app";
const KEY = "9408cfdfbb4f1d59ee2d050e879a77cf";
const SITEMAP = `https://${HOST}/sitemap.xml`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Payload { urls?: string[]; url?: string }

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  let body: Payload = {};
  try { body = await req.json(); } catch { /* empty body OK */ }

  const urls = [
    ...(body.urls ?? []),
    ...(body.url ? [body.url] : []),
  ]
    .map((u) => (u.startsWith("http") ? u : `https://${HOST}${u.startsWith("/") ? u : `/${u}`}`))
    .filter((u) => u.includes(HOST));

  const submitUrls = urls.length ? urls : [SITEMAP, `https://${HOST}/image-sitemap.xml`];

  const results: Record<string, unknown> = {};

  // IndexNow — one call submits to Bing, Yandex, DuckDuckGo, Seznam, Naver.
  try {
    const r = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: submitUrls,
      }),
    });
    results.indexnow = { status: r.status, ok: r.ok };
  } catch (e) {
    results.indexnow = { error: (e as Error).message };
  }

  // Bing legacy sitemap ping (still works for sitemap refresh notifications).
  try {
    const r = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP)}`);
    results.bing_ping = { status: r.status, ok: r.ok };
  } catch (e) {
    results.bing_ping = { error: (e as Error).message };
  }

  return new Response(
    JSON.stringify({ submitted: submitUrls.length, results }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
