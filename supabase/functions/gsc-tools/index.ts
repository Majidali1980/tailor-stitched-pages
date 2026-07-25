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

    if (action === "site-image-audit") {
      let urls: string[] = payload?.urls ?? [];
      const limitPages = Number(payload?.limitPages ?? 15);
      if (!urls.length) {
        try {
          const res = await fetch(`${SITE_ORIGIN}/sitemap.xml`);
          const xml = await res.text();
          urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
        } catch (e) {
          return json({ error: `failed to load sitemap: ${(e as Error).message}` }, 500);
        }
      }
      urls = urls.slice(0, limitPages);
      const perPage: any[] = [];
      const all: any[] = [];
      for (const pageUrl of urls) {
        try {
          const path = pageUrl.replace(SITE_ORIGIN, "") || "/";
          const res = await fetch(pageUrl);
          const html = await res.text();
          const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
          const parsed = imgs.map((tag) => {
            const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1] ?? "";
            const alt = tag.match(/\balt=["']([^"']*)["']/i)?.[1];
            return { src, alt: alt ?? null, page: path };
          }).filter((i) => i.src && !i.src.startsWith("data:"));

          const audited = await Promise.all(parsed.slice(0, 20).map(async (img) => {
            const url = img.src.startsWith("http") ? img.src : `${SITE_ORIGIN}${img.src.startsWith("/") ? "" : "/"}${img.src}`;
            let size: number | null = null;
            let contentType: string | null = null;
            let httpStatus: number | null = null;
            try {
              const h = await fetch(url, { method: "HEAD" });
              httpStatus = h.status;
              size = Number(h.headers.get("content-length")) || null;
              contentType = h.headers.get("content-type");
            } catch { /* ignore */ }
            const issues: string[] = [];
            if (httpStatus && httpStatus >= 400) issues.push(`broken (HTTP ${httpStatus})`);
            if (!img.alt || img.alt.trim().length < 3) issues.push("missing/weak alt text");
            if (size && size > 300_000) issues.push(`oversized (${Math.round(size / 1024)} KB)`);
            if (contentType && !/webp|avif|svg/i.test(contentType) && /jpeg|png/i.test(contentType) && (size ?? 0) > 100_000) {
              issues.push("non-optimised format");
            }
            const rec = { ...img, url, size, contentType, httpStatus, issues };
            all.push(rec);
            return rec;
          }));
          perPage.push({ page: path, total: parsed.length, audited: audited.length, images: audited });
        } catch (e) {
          perPage.push({ page: pageUrl, error: String((e as Error).message ?? e) });
        }
      }
      const totals = {
        totalPages: perPage.length,
        totalImages: all.length,
        ok: all.filter((i) => i.issues.length === 0).length,
        missingAlt: all.filter((i) => i.issues.some((x: string) => x.includes("alt"))).length,
        oversized: all.filter((i) => i.issues.some((x: string) => x.includes("oversized"))).length,
        nonOptimised: all.filter((i) => i.issues.some((x: string) => x.includes("non-optimised"))).length,
        broken: all.filter((i) => i.issues.some((x: string) => x.includes("broken"))).length,
        withIssues: all.filter((i) => i.issues.length > 0).length,
      };
      return json({ ok: true, totals, perPage, all });
    }

    // ---- Snapshots + alerts ----
    const supa = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    async function runCoverage(siteUrl: string) {
      const res = await fetch(`${SITE_ORIGIN}/sitemap.xml`);
      const xml = await res.text();
      const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
      const results: any[] = [];
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
          pageFetchState: idx.pageFetchState ?? null,
          indexingState: idx.indexingState ?? null,
          error: r.ok ? null : `HTTP ${r.status}`,
        });
      }
      const indexed = results.filter((r) => r.verdict === "PASS").length;
      return { total: results.length, indexed_count: indexed, not_indexed_count: results.length - indexed, results };
    }

    if (action === "save-snapshot") {
      const siteUrl = payload?.siteUrl ?? SITE_URL;
      const snap = await runCoverage(siteUrl);
      const { data, error } = await supa.from("seo_coverage_snapshots").insert({
        ...snap,
        created_by: uid,
      }).select("id, created_at").single();
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true, snapshot: data, ...snap });
    }

    if (action === "list-snapshots") {
      const { data, error } = await supa
        .from("seo_coverage_snapshots")
        .select("id, created_at, total, indexed_count, not_indexed_count")
        .order("created_at", { ascending: false })
        .limit(30);
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true, snapshots: data ?? [] });
    }

    if (action === "alerts-check") {
      const { data, error } = await supa
        .from("seo_coverage_snapshots")
        .select("id, created_at, total, indexed_count, not_indexed_count, results")
        .order("created_at", { ascending: false })
        .limit(2);
      if (error) return json({ error: error.message }, 500);
      if (!data || data.length < 2) {
        return json({ ok: true, hasAlerts: false, message: "Need at least 2 snapshots to compare. Save another snapshot to enable alerts.", snapshots: data ?? [] });
      }
      const [curr, prev] = data;
      const prevMap = new Map((prev.results as any[]).map((r) => [r.url, r]));
      const newlyFailing: any[] = [];
      const stillFailing: any[] = [];
      const recovered: any[] = [];
      for (const r of curr.results as any[]) {
        const p = prevMap.get(r.url);
        if (r.verdict !== "PASS") {
          if (!p || p.verdict === "PASS") newlyFailing.push({ ...r, previousVerdict: p?.verdict ?? "NEW" });
          else stillFailing.push(r);
        } else if (p && p.verdict !== "PASS") {
          recovered.push(r);
        }
      }
      const coverageDelta = (curr.indexed_count - prev.indexed_count);
      const totalDelta = (curr.not_indexed_count - prev.not_indexed_count);
      const spike = newlyFailing.length >= 3 || totalDelta >= 5;
      return json({
        ok: true,
        hasAlerts: spike || newlyFailing.length > 0,
        spike,
        currentDate: curr.created_at,
        previousDate: prev.created_at,
        coverageDelta,
        errorDelta: totalDelta,
        newlyFailing,
        stillFailing,
        recovered,
      });
    }

    if (action === "list-sitemap-log") {
      const { data, error } = await supa
        .from("seo_sitemap_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true, submissions: data ?? [] });
    }

    if (action === "refresh-sitemap") {
      // 1) count URLs in current sitemap
      let urlCount: number | null = null;
      try {
        const smRes = await fetch(`${SITE_ORIGIN}/sitemap.xml`, { cache: "no-store" });
        const xml = await smRes.text();
        urlCount = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].length;
      } catch { /* ignore */ }

      // 2) push to GSC
      const siteUrl = payload?.siteUrl ?? SITE_URL;
      const sitemap = payload?.sitemap ?? `${SITE_ORIGIN}/sitemap.xml`;
      const r = await gsc(
        `/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemap)}`,
        { method: "PUT" },
      );

      // 3) log
      const record = {
        sitemap_url: sitemap,
        status: r.ok ? "success" : "failed",
        http_status: r.status,
        url_count: urlCount,
        message: r.ok ? "Submitted successfully" : (typeof r.body === "string" ? r.body : JSON.stringify(r.body)).slice(0, 500),
        submitted_by: uid,
      };
      await supa.from("seo_sitemap_submissions").insert(record);
      return json({ ok: r.ok, record, gateway: r });
    }

    if (action === "list-404s") {
      const siteUrl = payload?.siteUrl ?? SITE_URL;
      const days = Number(payload?.days ?? 90);
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - days);
      const fmt = (d: Date) => d.toISOString().slice(0, 10);

      // Top pages from GSC by clicks + impressions
      const rr = await gsc(
        `/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
        {
          method: "POST",
          body: JSON.stringify({
            startDate: fmt(start),
            endDate: fmt(end),
            dimensions: ["page"],
            rowLimit: 500,
          }),
        },
      );
      const rows: any[] = (rr.body as any)?.rows ?? [];

      // Existing sitemap URLs (candidates for redirects)
      let sitemapUrls: string[] = [];
      try {
        const sm = await fetch(`${SITE_ORIGIN}/sitemap.xml`);
        const xml = await sm.text();
        sitemapUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
      } catch { /* ignore */ }

      const slugify = (u: string) => (u.replace(/^https?:\/\/[^/]+/, "").replace(/\/$/, "") || "/").toLowerCase();
      const tokens = (s: string) => s.split(/[-/_ ]+/).filter((t) => t && t.length > 1);
      const similarity = (a: string, b: string) => {
        const A = new Set(tokens(a));
        const B = new Set(tokens(b));
        if (!A.size || !B.size) return 0;
        let inter = 0; A.forEach((t) => { if (B.has(t)) inter++; });
        return inter / Math.max(A.size, B.size);
      };

      // HEAD each page, capture 404s
      const not_found: any[] = [];
      const checked: any[] = [];
      for (const row of rows) {
        const url: string = row.keys?.[0];
        if (!url || !url.startsWith(SITE_ORIGIN)) continue;
        let status: number | null = null;
        try {
          const h = await fetch(url, { method: "HEAD", redirect: "manual" });
          status = h.status;
        } catch { /* ignore */ }
        const rec = { url, status, clicks: row.clicks, impressions: row.impressions, position: row.position };
        checked.push(rec);
        if (status && (status === 404 || status === 410)) {
          const slug = slugify(url);
          const scored = sitemapUrls
            .map((s) => ({ url: s, score: similarity(slug, slugify(s)) }))
            .filter((x) => x.score > 0)
            .sort((a, b) => b.score - a.score);
          const suggestion = scored[0] && scored[0].score >= 0.25 ? scored[0].url : `${SITE_ORIGIN}/`;
          not_found.push({ ...rec, suggestion, alternatives: scored.slice(1, 4).map((x) => x.url) });
        }
      }
      return json({ ok: true, totalChecked: checked.length, notFoundCount: not_found.length, not_found });
    }

    if (action === "inspect-full") {
      const siteUrl = payload?.siteUrl ?? SITE_URL;
      let inspectionUrl: string = payload?.inspectionUrl;
      if (!inspectionUrl) return json({ error: "inspectionUrl required" }, 400);
      if (inspectionUrl.startsWith("/")) inspectionUrl = SITE_ORIGIN + inspectionUrl;
      if (!inspectionUrl.startsWith("http")) inspectionUrl = SITE_ORIGIN + "/" + inspectionUrl;

      const r = await gsc(`/v1/urlInspection/index:inspect`, {
        method: "POST",
        body: JSON.stringify({ inspectionUrl, siteUrl }),
      });

      // Live fetch from our server (public rendered HTML)
      let live: any = null;
      try {
        const startTs = Date.now();
        const res = await fetch(inspectionUrl, { redirect: "manual" });
        const html = await res.text();
        const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? null;
        const desc = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? null;
        const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ?? null;
        const robots = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? null;
        live = {
          httpStatus: res.status,
          contentType: res.headers.get("content-type"),
          responseTimeMs: Date.now() - startTs,
          bytes: html.length,
          title,
          description: desc,
          canonical,
          robots,
        };
      } catch (e) {
        live = { error: String((e as Error).message ?? e) };
      }

      const ins = (r.body as any)?.inspectionResult ?? {};
      return json({
        ok: r.ok,
        inspectionUrl,
        indexStatus: ins.indexStatusResult ?? null,
        mobileUsability: ins.mobileUsabilityResult ?? null,
        richResults: ins.richResultsResult ?? null,
        ampResult: ins.ampResult ?? null,
        inspectionResultLink: ins.inspectionResultLink ?? null,
        live,
        raw: r.body,
      });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: String((e as Error).message ?? e) }, 500);
  }
});
