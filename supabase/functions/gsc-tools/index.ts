import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://matailor.lovable.app/";
const SITE_ORIGIN = "https://matailor.lovable.app";
const VERIFICATION_TOKEN = "nZkiMXj6qeWgpshnBsEPO66SYz8cAV7dIjWdNtAXJTo";
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function gsc(path: string, init: RequestInit = {}) {
  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
      "X-Connection-Api-Key": Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY") ?? "",
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let body: unknown = text;
  try { body = JSON.parse(text); } catch { /* keep text */ }
  return { ok: res.ok, status: res.status, body };
}

async function requireAdmin(req: Request): Promise<string | null> {
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const client = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: auth } } },
  );
  const { data: userRes } = await client.auth.getUser();
  const userId = userRes?.user?.id;
  if (!userId) return null;
  const { data: isAdmin } = await client.rpc("has_role", { _user_id: userId, _role: "admin" });
  return isAdmin ? userId : null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const uid = await requireAdmin(req);
    if (!uid) return json({ error: "Unauthorized" }, 401);

    const { action, payload } = await req.json();

    if (action === "list-sites") {
      const r = await gsc("/webmasters/v3/sites");
      return json(r);
    }

    if (action === "submit-sitemap") {
      const siteUrl = payload?.siteUrl ?? SITE_URL;
      const sitemap = payload?.sitemap ?? `${SITE_ORIGIN}/sitemap.xml`;
      const r = await gsc(
        `/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemap)}`,
        { method: "PUT" },
      );
      return json(r);
    }

    if (action === "list-sitemaps") {
      const siteUrl = payload?.siteUrl ?? SITE_URL;
      const r = await gsc(`/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps`);
      return json(r);
    }

    if (action === "inspect-url") {
      const siteUrl = payload?.siteUrl ?? SITE_URL;
      const inspectionUrl = payload?.inspectionUrl;
      if (!inspectionUrl) return json({ error: "inspectionUrl required" }, 400);
      const r = await gsc(`/v1/urlInspection/index:inspect`, {
        method: "POST",
        body: JSON.stringify({ inspectionUrl, siteUrl }),
      });
      return json(r);
    }

    if (action === "image-performance") {
      const siteUrl = payload?.siteUrl ?? SITE_URL;
      const days = Number(payload?.days ?? 28);
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - days);
      const fmt = (d: Date) => d.toISOString().slice(0, 10);
      const r = await gsc(
        `/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
        {
          method: "POST",
          body: JSON.stringify({
            startDate: fmt(start),
            endDate: fmt(end),
            dimensions: ["query"],
            type: "image",
            rowLimit: 100,
          }),
        },
      );
      return json(r);
    }

    if (action === "verify-tag") {
      const routes: string[] = payload?.routes ?? ["/", "/gallery", "/booking", "/services", "/blog", "/contact"];
      const results = await Promise.all(routes.map(async (path) => {
        try {
          const res = await fetch(`${SITE_ORIGIN}${path}`, { headers: { "User-Agent": "MA-Tailor-SEO-Check" } });
          const html = await res.text();
          const match = html.match(/<meta[^>]+name=["']google-site-verification["'][^>]+content=["']([^"']+)["']/i);
          const token = match?.[1] ?? null;
          return { path, status: res.status, token, matches: token === VERIFICATION_TOKEN };
        } catch (e) {
          return { path, error: String((e as Error).message ?? e) };
        }
      }));
      return json({ ok: true, expected: VERIFICATION_TOKEN, results });
    }

    if (action === "image-audit") {
      const path = payload?.path ?? "/";
      const res = await fetch(`${SITE_ORIGIN}${path}`);
      const html = await res.text();
      const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
      const parsed = imgs.map((tag) => {
        const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1] ?? "";
        const alt = tag.match(/\balt=["']([^"']*)["']/i)?.[1];
        return { src, alt: alt ?? null };
      }).filter((i) => i.src && !i.src.startsWith("data:"));

      const results = await Promise.all(parsed.slice(0, 40).map(async (img) => {
        const url = img.src.startsWith("http") ? img.src : `${SITE_ORIGIN}${img.src.startsWith("/") ? "" : "/"}${img.src}`;
        let size: number | null = null;
        let contentType: string | null = null;
        try {
          const h = await fetch(url, { method: "HEAD" });
          size = Number(h.headers.get("content-length")) || null;
          contentType = h.headers.get("content-type");
        } catch { /* ignore */ }
        const issues: string[] = [];
        if (!img.alt || img.alt.trim().length < 3) issues.push("missing/weak alt text");
        if (size && size > 300_000) issues.push(`oversized (${Math.round(size / 1024)} KB)`);
        if (contentType && !/webp|avif|svg/i.test(contentType) && /jpeg|png/i.test(contentType) && (size ?? 0) > 100_000) {
          issues.push("non-optimised format (use WebP/AVIF)");
        }
        return { ...img, url, size, contentType, issues };
      }));
      return json({ ok: true, path, total: parsed.length, audited: results.length, results });
    }

    if (action === "index-coverage") {
      const siteUrl = payload?.siteUrl ?? SITE_URL;
      let urls: string[] = payload?.urls ?? [];
      if (!urls.length) {
        try {
          const res = await fetch(`${SITE_ORIGIN}/sitemap.xml`);
          const xml = await res.text();
          urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
        } catch (e) {
          return json({ error: `failed to load sitemap: ${(e as Error).message}` }, 500);
        }
      }
      const results: any[] = [];
      // sequential to avoid gateway rate limits
      for (const inspectionUrl of urls) {
        const r = await gsc(`/v1/urlInspection/index:inspect`, {
          method: "POST",
          body: JSON.stringify({ inspectionUrl, siteUrl }),
        });
        const idx = (r.body as any)?.inspectionResult?.indexStatusResult ?? {};
        results.push({
          url: inspectionUrl,
          verdict: idx.verdict ?? "UNKNOWN",
          coverageState: idx.coverageState ?? null,
          lastCrawlTime: idx.lastCrawlTime ?? null,
          robotsTxtState: idx.robotsTxtState ?? null,
          indexingState: idx.indexingState ?? null,
          pageFetchState: idx.pageFetchState ?? null,
          googleCanonical: idx.googleCanonical ?? null,
          userCanonical: idx.userCanonical ?? null,
          referringUrls: idx.referringUrls ?? null,
          error: r.ok ? null : (r.body as any)?.error ?? `HTTP ${r.status}`,
        });
      }
      const indexed = results.filter((r) => r.verdict === "PASS");
      const notIndexed = results.filter((r) => r.verdict !== "PASS");
      return json({ ok: true, total: results.length, indexedCount: indexed.length, notIndexedCount: notIndexed.length, indexed, notIndexed, results });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: String((e as Error).message ?? e) }, 500);
  }
});
