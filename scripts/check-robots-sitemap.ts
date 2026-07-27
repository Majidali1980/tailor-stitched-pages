// Post-build check: verifies robots.txt and sitemap.xml are reachable (HTTP 200)
// on the live site. Fails the build with a non-zero exit code on any failure.
// Skip with SKIP_ROBOTS_SITEMAP_CHECK=1 (useful for offline builds).

const BASE_URL = process.env.SITE_URL ?? "https://matailor.lovable.app";
const PATHS = ["/robots.txt", "/sitemap.xml"];
const TIMEOUT_MS = 15_000;

if (process.env.SKIP_ROBOTS_SITEMAP_CHECK === "1") {
  console.log("[check-robots-sitemap] Skipped via SKIP_ROBOTS_SITEMAP_CHECK=1");
  process.exit(0);
}

async function check(url: string): Promise<{ url: string; status: number | string; ok: boolean }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal, redirect: "follow" });
    return { url, status: res.status, ok: res.status === 200 };
  } catch (err) {
    return { url, status: (err as Error).message, ok: false };
  } finally {
    clearTimeout(timer);
  }
}

const results = await Promise.all(PATHS.map((p) => check(`${BASE_URL}${p}`)));
let failed = false;
for (const r of results) {
  if (r.ok) {
    console.log(`[check-robots-sitemap] OK  ${r.url} (${r.status})`);
  } else {
    failed = true;
    console.error(`[check-robots-sitemap] FAIL ${r.url} (${r.status})`);
  }
}

if (failed) {
  console.error("[check-robots-sitemap] Build check failed: robots.txt or sitemap.xml did not return 200.");
  process.exit(1);
}
console.log("[check-robots-sitemap] All checks passed.");
