import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, AlertCircle, AlertTriangle, RefreshCw, Bell, FileWarning, Search } from "lucide-react";
import { toast } from "sonner";

type ActionState = { loading: boolean; data: any };

const SITE = "https://matailor.lovable.app";

function useAction() {
  const [state, setState] = useState<ActionState>({ loading: false, data: null });
  const run = async (action: string, payload?: any) => {
    setState({ loading: true, data: null });
    const { data, error } = await supabase.functions.invoke("gsc-tools", { body: { action, payload } });
    if (error) {
      toast.error(error.message);
      setState({ loading: false, data: { error: error.message } });
      return;
    }
    setState({ loading: false, data });
  };
  return { ...state, run };
}

function Pre({ data }: { data: any }) {
  if (!data) return null;
  return (
    <pre className="mt-3 max-h-96 overflow-auto rounded bg-black/40 p-3 text-xs">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export default function SearchConsole() {
  const sitemap = useAction();
  const listSitemaps = useAction();
  const verify = useAction();
  const inspect = useAction();
  const perf = useAction();
  const audit = useAction();
  const coverage = useAction();
  const siteAudit = useAction();

  const runOverview = async () => {
    await coverage.run("index-coverage");
    await siteAudit.run("site-image-audit", { limitPages: 20 });
  };

  const [queue, setQueue] = useState<string>(
    ["/", "/services", "/blog", "/gallery", "/booking"].map((p) => SITE + p).join("\n"),
  );
  const [inspectUrl, setInspectUrl] = useState(SITE + "/");
  const [days, setDays] = useState(28);
  const [auditPath, setAuditPath] = useState("/");
  const [overviewSearch, setOverviewSearch] = useState("");

  const [batch, setBatch] = useState<any[]>([]);
  const [batchLoading, setBatchLoading] = useState(false);
  const inspectAll = async () => {
    const urls = queue.split("\n").map((s) => s.trim()).filter(Boolean);
    setBatchLoading(true);
    setBatch([]);
    const results: any[] = [];
    for (const u of urls) {
      const { data } = await supabase.functions.invoke("gsc-tools", {
        body: { action: "inspect-url", payload: { inspectionUrl: u } },
      });
      results.push({ url: u, data });
    }
    setBatch(results);
    setBatchLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Google Search Console</h1>
        <p className="text-muted-foreground">SEO health, indexing, sitemap and image audit tools.</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alerts"><Bell className="h-3 w-3 mr-1" />Alerts</TabsTrigger>
          <TabsTrigger value="notfound"><FileWarning className="h-3 w-3 mr-1" />404 & Redirects</TabsTrigger>
          <TabsTrigger value="sitemap-workflow"><RefreshCw className="h-3 w-3 mr-1" />Sitemap Workflow</TabsTrigger>
          <TabsTrigger value="inspector"><Search className="h-3 w-3 mr-1" />URL Inspector</TabsTrigger>
          <TabsTrigger value="submit">Submit for Indexing</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          <TabsTrigger value="verify">Verification</TabsTrigger>
          <TabsTrigger value="indexing">Indexing Queue</TabsTrigger>
          <TabsTrigger value="images">Image Search</TabsTrigger>
          <TabsTrigger value="audit">Image Audit</TabsTrigger>
          <TabsTrigger value="coverage">Index Coverage</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts"><AlertsTab /></TabsContent>
        <TabsContent value="notfound"><NotFoundTab /></TabsContent>
        <TabsContent value="sitemap-workflow"><SitemapWorkflowTab /></TabsContent>
        <TabsContent value="inspector"><UrlInspectorTab /></TabsContent>


        <TabsContent value="submit">
          <SubmitForIndexing />
        </TabsContent>


        <TabsContent value="overview">
          <Card>
            <CardHeader><CardTitle>SEO overview — URLs & images at a glance</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Runs a full audit: inspects every URL in <code>/sitemap.xml</code> against Google's index, then scans images across the top pages for SEO issues.
              </p>
              <Button onClick={runOverview} disabled={coverage.loading || siteAudit.loading}>
                {(coverage.loading || siteAudit.loading) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Run full audit
              </Button>

              {(coverage.data?.results || siteAudit.data?.totals) && (
                <div className="flex gap-2 items-center">
                  <Input
                    placeholder="Find URL or image filename..."
                    value={overviewSearch}
                    onChange={(e) => setOverviewSearch(e.target.value)}
                    className="max-w-md"
                  />
                  {overviewSearch && (
                    <Button variant="ghost" size="sm" onClick={() => setOverviewSearch("")}>Clear</Button>
                  )}
                </div>
              )}

              {coverage.data?.results && (
                <div>
                  <h3 className="font-semibold text-sm mb-2">URLs — indexing status</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="rounded border p-3">
                      <div className="text-2xl font-bold">{coverage.data.total}</div>
                      <div className="text-xs text-muted-foreground">Total URLs in sitemap</div>
                    </div>
                    <div className="rounded border border-green-600/40 bg-green-600/10 p-3">
                      <div className="text-2xl font-bold text-green-400">{coverage.data.indexedCount}</div>
                      <div className="text-xs text-muted-foreground">Indexed on Google</div>
                    </div>
                    <div className="rounded border border-red-600/40 bg-red-600/10 p-3">
                      <div className="text-2xl font-bold text-red-400">{coverage.data.notIndexedCount}</div>
                      <div className="text-xs text-muted-foreground">Not indexed</div>
                    </div>
                    <div className="rounded border p-3">
                      <div className="text-2xl font-bold">
                        {coverage.data.total ? Math.round((coverage.data.indexedCount / coverage.data.total) * 100) : 0}%
                      </div>
                      <div className="text-xs text-muted-foreground">Coverage rate</div>
                    </div>
                  </div>

                  {coverage.data.notIndexedCount > 0 && (() => {
                    const q = overviewSearch.toLowerCase();
                    const filtered = coverage.data.notIndexed.filter((r: any) =>
                      !q || r.url?.toLowerCase().includes(q)
                    );
                    const groups: Record<string, any[]> = {};
                    filtered.forEach((r: any) => {
                      const k = r.coverageState || r.indexingState || r.error || "Unknown reason";
                      (groups[k] ??= []).push(r);
                    });
                    return (
                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-semibold text-red-400">Not-indexed URLs by reason</h4>
                        {overviewSearch && (
                          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {coverage.data.notIndexed.length} not-indexed URLs.</p>
                        )}
                        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No matching URLs.</p>}
                        {Object.entries(groups).map(([reason, items]) => (
                          <div key={reason} className="border rounded p-2">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline">{items.length}</Badge>
                              <span className="text-sm font-medium">{reason}</span>
                            </div>
                            <ul className="text-xs font-mono text-muted-foreground space-y-0.5 max-h-40 overflow-auto">
                              {items.map((r: any, i: number) => (
                                <li key={i} className="truncate">{r.url.replace(SITE, "") || "/"}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}

              {siteAudit.data?.totals && (
                <div>
                  <h3 className="font-semibold text-sm mb-2 mt-4">Images — SEO status</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="rounded border p-3">
                      <div className="text-2xl font-bold">{siteAudit.data.totals.totalImages}</div>
                      <div className="text-xs text-muted-foreground">Images scanned ({siteAudit.data.totals.totalPages} pages)</div>
                    </div>
                    <div className="rounded border border-green-600/40 bg-green-600/10 p-3">
                      <div className="text-2xl font-bold text-green-400">{siteAudit.data.totals.ok}</div>
                      <div className="text-xs text-muted-foreground">Fully optimised</div>
                    </div>
                    <div className="rounded border border-amber-600/40 bg-amber-600/10 p-3">
                      <div className="text-2xl font-bold text-amber-400">{siteAudit.data.totals.withIssues}</div>
                      <div className="text-xs text-muted-foreground">With issues (may hurt indexing)</div>
                    </div>
                    <div className="rounded border border-red-600/40 bg-red-600/10 p-3">
                      <div className="text-2xl font-bold text-red-400">{siteAudit.data.totals.broken}</div>
                      <div className="text-xs text-muted-foreground">Broken (HTTP 4xx/5xx)</div>
                    </div>
                    <div className="rounded border p-3">
                      <div className="text-2xl font-bold text-amber-400">{siteAudit.data.totals.missingAlt}</div>
                      <div className="text-xs text-muted-foreground">Missing/weak alt text</div>
                    </div>
                    <div className="rounded border p-3">
                      <div className="text-2xl font-bold text-amber-400">{siteAudit.data.totals.oversized}</div>
                      <div className="text-xs text-muted-foreground">Oversized (&gt;300 KB)</div>
                    </div>
                    <div className="rounded border p-3">
                      <div className="text-2xl font-bold text-amber-400">{siteAudit.data.totals.nonOptimised}</div>
                      <div className="text-xs text-muted-foreground">Non-optimised format (JPG/PNG)</div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-semibold">Problem images by page</h4>
                    {(() => {
                      const q = overviewSearch.toLowerCase();
                      const pages = siteAudit.data.perPage
                        .map((p: any) => {
                          const bad = (p.images || [])
                            .filter((im: any) => im.issues.length > 0)
                            .filter((im: any) => !q || im.url?.toLowerCase().includes(q) || im.src?.toLowerCase().includes(q) || p.page?.toLowerCase().includes(q));
                          return { ...p, bad };
                        })
                        .filter((p: any) => p.bad.length > 0);
                      return (
                        <>
                          {overviewSearch && (
                            <p className="text-xs text-muted-foreground">Showing {pages.length} page(s) with matching problem images.</p>
                          )}
                          {pages.length === 0 && !overviewSearch && (
                            <p className="text-sm text-green-400">✓ No image issues detected.</p>
                          )}
                          {pages.length === 0 && overviewSearch && (
                            <p className="text-sm text-muted-foreground">No matching images.</p>
                          )}
                          {pages.map((p: any, i: number) => (
                            <div key={i} className="border rounded p-2">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline">{p.bad.length}</Badge>
                                <span className="text-sm font-mono">{p.page}</span>
                              </div>
                              <ul className="text-xs space-y-1 max-h-48 overflow-auto">
                                {p.bad.map((im: any, j: number) => (
                                  <li key={j} className="flex gap-2">
                                    <span className="font-mono text-muted-foreground truncate max-w-md">{im.url.replace(SITE, "")}</span>
                                    <span className="text-amber-400">{im.issues.join(" • ")}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}

              {!coverage.data && !siteAudit.data && (
                <p className="text-sm text-muted-foreground">Click <strong>Run full audit</strong> to see categorized URL indexing + image SEO status.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coverage">
          <Card>
            <CardHeader><CardTitle>Full site index coverage</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Inspects every URL in <code>/sitemap.xml</code> against Google's index and groups them into indexed vs not-indexed. Sequential; may take a minute for large sitemaps.
              </p>
              <div className="rounded border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-200">
                <strong>Note:</strong> Google's Indexing API is restricted to Job Posting / Livestream sites, so we can't push arbitrary pages to the index programmatically. The workflow below is the fastest legit path:
                <ol className="list-decimal ml-5 mt-1 space-y-0.5">
                  <li>Resubmit sitemap (nudges Google to re-crawl).</li>
                  <li>Scan to find pages still not indexed.</li>
                  <li>Use the <em>Inspect in GSC</em> link on each row to open Search Console and click "Request Indexing" (~10/day quota).</li>
                </ol>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={async () => {
                    await sitemap.run("submit-sitemap");
                    await coverage.run("index-coverage");
                  }}
                  disabled={coverage.loading || sitemap.loading}
                >
                  {(coverage.loading || sitemap.loading) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Resubmit sitemap + scan all URLs
                </Button>
                <Button variant="outline" onClick={() => coverage.run("index-coverage")} disabled={coverage.loading}>
                  {coverage.loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Scan only
                </Button>
              </div>
              {coverage.data?.results && (
                <div className="space-y-4 mt-3">
                  <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-green-600">Indexed: {coverage.data.indexedCount}</Badge>
                    <Badge className="bg-amber-600">Not indexed: {coverage.data.notIndexedCount}</Badge>
                    <Badge variant="outline">Total: {coverage.data.total}</Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const csv = "url,verdict,coverageState,indexingState,lastCrawlTime,googleCanonical\n" +
                          coverage.data.results.map((r: any) =>
                            [r.url, r.verdict, r.coverageState ?? "", r.indexingState ?? "", r.lastCrawlTime ?? "", r.googleCanonical ?? ""]
                              .map((v: string) => `"${String(v).replace(/"/g, '""')}"`).join(",")
                          ).join("\n");
                        const blob = new Blob([csv], { type: "text/csv" });
                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(blob);
                        a.download = "index-coverage.csv";
                        a.click();
                      }}
                    >Export CSV</Button>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm mb-2 text-red-400">Not indexed ({coverage.data.notIndexedCount})</h3>
                    <div className="flex gap-2 mb-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          coverage.data.notIndexed.forEach((r: any, i: number) => {
                            setTimeout(() => {
                              window.open(
                                `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(SITE + "/")}&id=${encodeURIComponent(r.url)}`,
                                "_blank",
                              );
                            }, i * 300);
                          });
                        }}
                      >Open all in GSC Inspect</Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const text = coverage.data.notIndexed.map((r: any) => r.url).join("\n");
                          navigator.clipboard.writeText(text);
                          toast.success(`Copied ${coverage.data.notIndexedCount} URLs`);
                        }}
                      >Copy URLs</Button>
                    </div>
                    <div className="space-y-1">
                      {coverage.data.notIndexed.map((r: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-sm border rounded p-2">
                          <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                          <span className="font-mono text-xs truncate flex-1">{r.url.replace(SITE, "") || "/"}</span>
                          <Badge variant="outline">{r.verdict}</Badge>
                          <span className="text-xs text-muted-foreground truncate max-w-[180px]">{r.coverageState ?? r.error ?? ""}</span>
                          <a
                            href={`https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(SITE + "/")}&id=${encodeURIComponent(r.url)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-primary underline shrink-0"
                          >Inspect in GSC</a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm mb-2 text-green-400">Indexed ({coverage.data.indexedCount})</h3>
                    <div className="space-y-1">
                      {coverage.data.indexed.map((r: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-sm border rounded p-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                          <span className="font-mono text-xs truncate flex-1">{r.url.replace(SITE, "") || "/"}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-[220px]">{r.coverageState ?? ""}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sitemap">
          <Card>
            <CardHeader><CardTitle>Submit sitemap.xml</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Pushes <code>{SITE}/sitemap.xml</code> to Google Search Console via the Webmasters API.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button onClick={() => sitemap.run("submit-sitemap")} disabled={sitemap.loading}>
                  {sitemap.loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Submit sitemap now
                </Button>
                <Button variant="outline" onClick={() => listSitemaps.run("list-sitemaps")} disabled={listSitemaps.loading}>
                  {listSitemaps.loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  List submitted sitemaps
                </Button>
              </div>
              <Pre data={sitemap.data} />
              <Pre data={listSitemaps.data} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verify">
          <Card>
            <CardHeader><CardTitle>Verification tag check</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Fetches every public route and confirms the <code>google-site-verification</code> meta tag matches.
              </p>
              <Button onClick={() => verify.run("verify-tag")} disabled={verify.loading}>
                {verify.loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Run check
              </Button>
              {verify.data?.results && (
                <div className="space-y-1 mt-3">
                  {verify.data.results.map((r: any) => (
                    <div key={r.path} className="flex items-center gap-2 text-sm border rounded p-2">
                      {r.matches ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                      <span className="font-mono">{r.path}</span>
                      <Badge variant="outline">HTTP {r.status ?? "err"}</Badge>
                      <span className="text-xs text-muted-foreground truncate">{r.token ?? r.error ?? "no tag"}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="indexing">
          <Card>
            <CardHeader><CardTitle>Indexing queue (URL Inspection)</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                URL Inspection reads Google's current index status — <strong>does not</strong> count against the ~10/day Request Indexing quota.
              </p>
              <div className="space-y-2">
                <label className="text-sm font-medium">Single URL</label>
                <div className="flex gap-2">
                  <Input value={inspectUrl} onChange={(e) => setInspectUrl(e.target.value)} />
                  <Button onClick={() => inspect.run("inspect-url", { inspectionUrl: inspectUrl })} disabled={inspect.loading}>
                    {inspect.loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Inspect
                  </Button>
                </div>
                <Pre data={inspect.data} />
              </div>
              <div className="space-y-2 pt-4 border-t">
                <label className="text-sm font-medium">Priority queue (one URL per line)</label>
                <Textarea value={queue} onChange={(e) => setQueue(e.target.value)} rows={8} className="font-mono text-xs" />
                <div className="flex gap-2 flex-wrap">
                  <Button onClick={inspectAll} variant="secondary" disabled={batchLoading}>
                    {batchLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Inspect all ({queue.split("\n").filter((s) => s.trim()).length})
                  </Button>
                  <Button
                    variant="outline"
                    onClick={async () => {
                      const res = await fetch("/sitemap.xml");
                      const xml = await res.text();
                      const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
                      setQueue(urls.join("\n"));
                    }}
                  >
                    Load all sitemap URLs
                  </Button>
                  {batch.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        const csv = "url,verdict,coverageState\n" + batch.map((b) => {
                          const r = b.data?.body?.inspectionResult?.indexStatusResult ?? {};
                          return [b.url, r.verdict ?? "", r.coverageState ?? ""].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
                        }).join("\n");
                        const blob = new Blob([csv], { type: "text/csv" });
                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(blob);
                        a.download = "indexing-queue.csv";
                        a.click();
                      }}
                    >
                      Export CSV
                    </Button>
                  )}
                </div>
                {batch.length > 0 && (
                  <div className="space-y-1 mt-3">
                    {batch.map((b, i) => {
                      const verdict = b.data?.body?.inspectionResult?.indexStatusResult?.verdict ?? "?";
                      const cov = b.data?.body?.inspectionResult?.indexStatusResult?.coverageState ?? "";
                      const ok = verdict === "PASS";
                      return (
                        <div key={i} className="flex items-center gap-2 text-sm border rounded p-2">
                          {ok ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4 text-amber-500" />}
                          <span className="font-mono text-xs truncate flex-1">{b.url}</span>
                          <Badge>{verdict}</Badge>
                          <span className="text-xs text-muted-foreground">{cov}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images">
          <Card>
            <CardHeader><CardTitle>Google Image Search performance</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Clicks, impressions, CTR and average position from Google Image Search.
              </p>
              <div className="flex gap-2">
                {[7, 28, 90].map((d) => (
                  <Button key={d} variant={days === d ? "default" : "outline"} size="sm" onClick={() => setDays(d)}>
                    Last {d} days
                  </Button>
                ))}
                <Button onClick={() => perf.run("image-performance", { days })} disabled={perf.loading}>
                  {perf.loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Load report
                </Button>
              </div>
              {perf.data?.body?.rows ? (
                <div className="overflow-auto">
                  <table className="w-full text-sm mt-3">
                    <thead className="text-left border-b">
                      <tr><th className="p-2">Query</th><th className="p-2">Clicks</th><th className="p-2">Impr.</th><th className="p-2">CTR</th><th className="p-2">Pos.</th></tr>
                    </thead>
                    <tbody>
                      {perf.data.body.rows.map((r: any, i: number) => (
                        <tr key={i} className="border-b">
                          <td className="p-2">{r.keys?.[0]}</td>
                          <td className="p-2">{r.clicks}</td>
                          <td className="p-2">{r.impressions}</td>
                          <td className="p-2">{(r.ctr * 100).toFixed(2)}%</td>
                          <td className="p-2">{r.position?.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : perf.data ? <Pre data={perf.data} /> : (
                <p className="text-sm text-muted-foreground">Click Load report to fetch Google Image Search data.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader><CardTitle>Image SEO audit</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Flags missing/weak alt text, oversized files, and non-optimised formats. Runs a HEAD request per image.
              </p>
              <div className="flex gap-2">
                <Input value={auditPath} onChange={(e) => setAuditPath(e.target.value)} placeholder="/" className="max-w-xs" />
                <Button onClick={() => audit.run("image-audit", { path: auditPath })} disabled={audit.loading}>
                  {audit.loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Audit page
                </Button>
              </div>
              {audit.data?.results && (
                <div className="space-y-1 mt-3">
                  <div className="text-xs text-muted-foreground">
                    Audited {audit.data.audited} of {audit.data.total} images on <code>{audit.data.path}</code>
                  </div>
                  {audit.data.results.map((r: any, i: number) => (
                    <div key={i} className="border rounded p-2 text-sm">
                      <div className="flex items-center gap-2">
                        {r.issues.length === 0 ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4 text-amber-500" />}
                        <span className="font-mono text-xs truncate flex-1">{r.url}</span>
                        {r.size && <Badge variant="outline">{Math.round(r.size / 1024)} KB</Badge>}
                      </div>
                      {r.alt && <div className="text-xs mt-1">alt: "{r.alt}"</div>}
                      {r.issues.length > 0 && (
                        <div className="text-xs text-amber-500 mt-1">{r.issues.join(" • ")}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const SUBMITTED_KEY = "gsc-submitted-urls";

function SubmitForIndexing() {
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<"all" | "pending" | "submitted">("all");

  useEffect(() => {
    try {
      setSubmitted(JSON.parse(localStorage.getItem(SUBMITTED_KEY) || "{}"));
    } catch { /* ignore */ }
    loadSitemap();
  }, []);

  const persist = (next: Record<string, boolean>) => {
    setSubmitted(next);
    localStorage.setItem(SUBMITTED_KEY, JSON.stringify(next));
  };

  const loadSitemap = async () => {
    setLoading(true);
    try {
      const res = await fetch("/sitemap.xml", { cache: "no-store" });
      const xml = await res.text();
      const list = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
      setUrls(list);
    } catch (e) {
      toast.error("Failed to load sitemap.xml");
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return urls.filter((u) => {
      if (q && !u.toLowerCase().includes(q)) return false;
      if (filter === "pending" && submitted[u]) return false;
      if (filter === "submitted" && !submitted[u]) return false;
      return true;
    });
  }, [urls, search, submitted, filter]);

  const submittedCount = Object.values(submitted).filter(Boolean).length;

  const inspectUrl = (u: string) =>
    `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(SITE + "/")}&id=${encodeURIComponent(u)}`;

  const openNext = (n: number) => {
    const pending = filtered.filter((u) => !submitted[u]).slice(0, n);
    if (pending.length === 0) {
      toast.info("Nothing pending in current view.");
      return;
    }
    pending.forEach((u, i) => {
      setTimeout(() => window.open(inspectUrl(u), "_blank"), i * 400);
    });
    toast.success(`Opening ${pending.length} URL(s) in Google Search Console...`);
  };

  return (
    <Card>
      <CardHeader><CardTitle>Submit URLs for indexing</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-200">
          Google doesn't accept programmatic indexing for generic sites (Indexing API is Job Posting / Livestream only).
          The fastest legit path is <strong>Request Indexing</strong> in Search Console (~10 URLs/day quota).
          This page lists every URL from your sitemap — click <em>Inspect in GSC</em>, then click <strong>Request Indexing</strong> in the panel that opens.
          Tick the checkbox to mark it as submitted so you can track progress across sessions.
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Button size="sm" variant="outline" onClick={loadSitemap} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />} Reload sitemap
          </Button>
          <Badge variant="outline">Total: {urls.length}</Badge>
          <Badge className="bg-green-600">Submitted: {submittedCount}</Badge>
          <Badge className="bg-amber-600">Pending: {urls.length - submittedCount}</Badge>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Input
            placeholder="Search URL..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
          <div className="flex gap-1">
            {(["all", "pending", "submitted"] as const).map((f) => (
              <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)}>
                {f[0].toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => openNext(10)}>
            Open next 10 in GSC (daily quota)
          </Button>
          <Button size="sm" variant="outline" onClick={() => openNext(filtered.length)}>
            Open all shown ({filtered.filter((u) => !submitted[u]).length})
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(filtered.join("\n"));
              toast.success(`Copied ${filtered.length} URLs`);
            }}
          >Copy shown URLs</Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              if (confirm("Reset submitted checkmarks?")) persist({});
            }}
          >Reset checkmarks</Button>
        </div>

        <div className="text-xs text-muted-foreground">Showing {filtered.length} of {urls.length} URLs</div>

        <div className="rounded border p-2 bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold">Copy-paste ready ({filtered.length} URLs)</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(filtered.join("\n"));
                toast.success(`Copied ${filtered.length} URLs to clipboard`);
              }}
            >Copy all</Button>
          </div>
          <textarea
            readOnly
            value={filtered.join("\n")}
            onFocus={(e) => e.currentTarget.select()}
            className="w-full h-40 text-xs font-mono bg-background border rounded p-2"
          />
        </div>

        <div className="space-y-1 max-h-[600px] overflow-auto border rounded p-2">
          {filtered.map((u) => {
            const done = !!submitted[u];
            return (
              <div key={u} className="flex items-center gap-2 text-sm border rounded p-2">
                <input
                  type="checkbox"
                  checked={done}
                  onChange={(e) => persist({ ...submitted, [u]: e.target.checked })}
                  className="h-4 w-4 shrink-0"
                />
                {done ? <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" /> : <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />}
                <span className="font-mono text-xs truncate flex-1" title={u}>{u.replace(SITE, "") || "/"}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs shrink-0"
                  onClick={() => {
                    navigator.clipboard.writeText(u);
                    toast.success("URL copied");
                  }}
                >Copy</Button>
                <a
                  href={inspectUrl(u)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => persist({ ...submitted, [u]: true })}
                  className="text-xs text-primary underline shrink-0"
                >Inspect in GSC</a>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">No URLs match the current filter.</p>
          )}
        </div>

      </CardContent>
    </Card>
  );
}


// ============ ALERTS TAB ============
function AlertsTab() {
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<any>(null);
  const [snapshots, setSnapshots] = useState<any[]>([]);
  const [savingSnap, setSavingSnap] = useState(false);

  const loadSnapshots = async () => {
    const { data } = await supabase.functions.invoke("gsc-tools", { body: { action: "list-snapshots" } });
    setSnapshots(data?.snapshots ?? []);
  };
  const checkAlerts = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("gsc-tools", { body: { action: "alerts-check" } });
    if (error) toast.error(error.message); else setAlerts(data);
    setLoading(false);
  };
  const saveSnapshot = async () => {
    setSavingSnap(true);
    const { data, error } = await supabase.functions.invoke("gsc-tools", { body: { action: "save-snapshot" } });
    if (error) toast.error(error.message);
    else { toast.success(`Snapshot saved — ${data?.indexed_count}/${data?.total} indexed`); await loadSnapshots(); }
    setSavingSnap(false);
  };
  useEffect(() => { loadSnapshots(); checkAlerts(); }, []);

  return (
    <Card>
      <CardHeader><CardTitle><Bell className="h-4 w-4 inline mr-2" />Indexing error alerts</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Compares your last two coverage snapshots and flags newly failing URLs, crawl-issue spikes and coverage drops.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={saveSnapshot} disabled={savingSnap}>
            {savingSnap && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Save new snapshot
          </Button>
          <Button variant="outline" onClick={checkAlerts} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Re-check alerts
          </Button>
        </div>

        {alerts && !alerts.hasAlerts && (
          <div className="rounded border border-green-600/40 bg-green-600/10 p-3 text-sm text-green-300 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            {alerts.message ?? "No new indexing errors detected between the last two snapshots."}
          </div>
        )}

        {alerts?.hasAlerts && (
          <>
            {alerts.spike && (
              <div className="rounded border border-red-600/50 bg-red-600/10 p-3 text-sm text-red-300 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold">Indexing error spike detected</div>
                  <div className="text-xs">
                    {alerts.newlyFailing.length} new failures · errors changed by {alerts.errorDelta >= 0 ? "+" : ""}{alerts.errorDelta} · indexed changed by {alerts.coverageDelta >= 0 ? "+" : ""}{alerts.coverageDelta}
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded border border-red-600/40 bg-red-600/10 p-3"><div className="text-2xl font-bold text-red-400">{alerts.newlyFailing.length}</div><div className="text-xs">Newly failing</div></div>
              <div className="rounded border p-3"><div className="text-2xl font-bold text-amber-400">{alerts.stillFailing.length}</div><div className="text-xs">Still failing</div></div>
              <div className="rounded border border-green-600/40 bg-green-600/10 p-3"><div className="text-2xl font-bold text-green-400">{alerts.recovered.length}</div><div className="text-xs">Recovered</div></div>
              <div className="rounded border p-3"><div className="text-xs text-muted-foreground">Current vs previous</div><div className="text-xs mt-1">{new Date(alerts.currentDate).toLocaleDateString()}<br/>vs {new Date(alerts.previousDate).toLocaleDateString()}</div></div>
            </div>

            {alerts.newlyFailing.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-red-400 mb-2">Newly failing URLs</h4>
                <div className="space-y-1">
                  {alerts.newlyFailing.map((r: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm border rounded p-2">
                      <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                      <span className="font-mono text-xs truncate flex-1">{r.url.replace(SITE, "") || "/"}</span>
                      <Badge variant="outline">{r.coverageState ?? r.verdict}</Badge>
                      <span className="text-xs text-muted-foreground">was: {r.previousVerdict}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div>
          <h4 className="text-sm font-semibold mb-2">Snapshot history</h4>
          {snapshots.length === 0 && <p className="text-xs text-muted-foreground">No snapshots yet — click "Save new snapshot".</p>}
          <div className="space-y-1">
            {snapshots.map((s) => (
              <div key={s.id} className="flex items-center gap-2 text-sm border rounded p-2">
                <span className="text-xs text-muted-foreground w-40">{new Date(s.created_at).toLocaleString()}</span>
                <Badge className="bg-green-600">{s.indexed_count} indexed</Badge>
                <Badge className="bg-amber-600">{s.not_indexed_count} not indexed</Badge>
                <span className="text-xs text-muted-foreground">of {s.total}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============ 404 & REDIRECTS TAB ============
function NotFoundTab() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [days, setDays] = useState(90);

  const run = async () => {
    setLoading(true);
    const { data: res, error } = await supabase.functions.invoke("gsc-tools", { body: { action: "list-404s", payload: { days } } });
    if (error) toast.error(error.message); else setData(res);
    setLoading(false);
  };

  const redirectsFile = data?.not_found?.map((r: any) => {
    const from = r.url.replace(SITE, "");
    const to = r.suggestion.replace(SITE, "");
    return `${from}  ${to}  301`;
  }).join("\n") ?? "";

  return (
    <Card>
      <CardHeader><CardTitle><FileWarning className="h-4 w-4 inline mr-2" />404 pages & suggested redirects</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Pulls top pages from Search Console (last {days} days), HEAD-checks each, and suggests the closest live URL to redirect to based on slug similarity.
        </p>
        <div className="flex flex-wrap gap-2">
          {[28, 90, 180].map((d) => (
            <Button key={d} size="sm" variant={days === d ? "default" : "outline"} onClick={() => setDays(d)}>Last {d} days</Button>
          ))}
          <Button onClick={run} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Scan for 404s
          </Button>
        </div>

        {data && (
          <>
            <div className="flex gap-3">
              <div className="rounded border p-3"><div className="text-2xl font-bold">{data.totalChecked}</div><div className="text-xs text-muted-foreground">URLs checked</div></div>
              <div className={`rounded border p-3 ${data.notFoundCount > 0 ? "border-red-600/40 bg-red-600/10" : "border-green-600/40 bg-green-600/10"}`}>
                <div className={`text-2xl font-bold ${data.notFoundCount > 0 ? "text-red-400" : "text-green-400"}`}>{data.notFoundCount}</div>
                <div className="text-xs text-muted-foreground">Broken (404/410)</div>
              </div>
            </div>

            {data.not_found?.length > 0 && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">Copy-paste redirect list</h4>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(redirectsFile); toast.success("Copied"); }}>Copy plain</Button>
                      <Button size="sm" variant="outline" onClick={() => {
                        const nginx = data.not_found.map((r: any) => `  rewrite ^${r.url.replace(SITE, "")}$ ${r.suggestion.replace(SITE, "")} permanent;`).join("\n");
                        navigator.clipboard.writeText(nginx); toast.success("nginx rules copied");
                      }}>Copy nginx</Button>
                      <Button size="sm" variant="outline" onClick={() => {
                        const json = JSON.stringify(data.not_found.map((r: any) => ({ source: r.url.replace(SITE, ""), destination: r.suggestion.replace(SITE, ""), permanent: true })), null, 2);
                        navigator.clipboard.writeText(json); toast.success("JSON copied");
                      }}>Copy JSON (Vercel)</Button>
                    </div>
                  </div>
                  <textarea readOnly value={redirectsFile} onFocus={(e) => e.currentTarget.select()} className="w-full h-32 text-xs font-mono bg-background border rounded p-2" />
                  <p className="text-xs text-muted-foreground mt-1">Format: <code>from  to  301</code></p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Details</h4>
                  <div className="space-y-1">
                    {data.not_found.map((r: any, i: number) => (
                      <div key={i} className="border rounded p-2 text-sm">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                          <span className="font-mono text-xs truncate flex-1">{r.url.replace(SITE, "")}</span>
                          <Badge variant="destructive">{r.status}</Badge>
                          <Badge variant="outline">{r.clicks} clicks</Badge>
                          <Badge variant="outline">{r.impressions} impr</Badge>
                        </div>
                        <div className="text-xs mt-1 pl-6">
                          → <span className="font-mono text-green-400">{r.suggestion.replace(SITE, "")}</span>
                          {r.alternatives?.length > 0 && <span className="text-muted-foreground"> · alts: {r.alternatives.map((a: string) => a.replace(SITE, "")).join(", ")}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ============ SITEMAP WORKFLOW TAB ============
function SitemapWorkflowTab() {
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [lastResult, setLastResult] = useState<any>(null);

  const load = async () => {
    const { data } = await supabase.functions.invoke("gsc-tools", { body: { action: "list-sitemap-log" } });
    setSubmissions(data?.submissions ?? []);
  };
  useEffect(() => { load(); }, []);

  const refresh = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("gsc-tools", { body: { action: "refresh-sitemap" } });
    if (error) toast.error(error.message);
    else {
      setLastResult(data);
      if (data?.ok) toast.success(`Sitemap resubmitted (${data.record?.url_count ?? "?"} URLs)`);
      else toast.error(`Submission failed: HTTP ${data?.record?.http_status}`);
      await load();
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader><CardTitle><RefreshCw className="h-4 w-4 inline mr-2" />Sitemap refresh & resubmit</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          After publishing new stitching pages, click <strong>Refresh & resubmit</strong>. It counts URLs in the live <code>/sitemap.xml</code>, pushes it to Google Search Console, and logs the result below.
        </p>
        <div className="rounded border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-200">
          <strong>Tip:</strong> New service and blog pages are added to <code>public/sitemap.xml</code> in code. After a deploy, click here to notify Google.
        </div>

        <div className="flex gap-2">
          <Button onClick={refresh} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Refresh & resubmit sitemap
          </Button>
          <Button variant="outline" onClick={load}>Reload log</Button>
        </div>

        {lastResult && (
          <div className={`rounded border p-3 text-sm ${lastResult.ok ? "border-green-600/40 bg-green-600/10 text-green-300" : "border-red-600/40 bg-red-600/10 text-red-300"}`}>
            {lastResult.ok ? <CheckCircle2 className="h-4 w-4 inline mr-1" /> : <XCircle className="h-4 w-4 inline mr-1" />}
            {lastResult.record?.message} — {lastResult.record?.url_count ?? "?"} URLs
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold mb-2">Submission log (last 50)</h4>
          {submissions.length === 0 && <p className="text-xs text-muted-foreground">No submissions logged yet.</p>}
          <div className="space-y-1">
            {submissions.map((s) => (
              <div key={s.id} className="flex items-center gap-2 text-sm border rounded p-2">
                {s.status === "success" ? <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" /> : <XCircle className="h-4 w-4 text-red-500 shrink-0" />}
                <span className="text-xs text-muted-foreground w-40">{new Date(s.created_at).toLocaleString()}</span>
                <Badge variant={s.status === "success" ? "default" : "destructive"}>{s.status}</Badge>
                <Badge variant="outline">HTTP {s.http_status ?? "?"}</Badge>
                {s.url_count != null && <Badge variant="outline">{s.url_count} URLs</Badge>}
                <span className="text-xs text-muted-foreground truncate flex-1" title={s.message}>{s.message}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ============ URL INSPECTOR TAB ============
function UrlInspectorTab() {
  const [path, setPath] = useState("/");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const run = async () => {
    if (!path.trim()) return;
    setLoading(true);
    const { data: res, error } = await supabase.functions.invoke("gsc-tools", {
      body: { action: "inspect-full", payload: { inspectionUrl: path.trim() } },
    });
    if (error) toast.error(error.message); else setData(res);
    setLoading(false);
  };

  const verdictColor = (v?: string) => v === "PASS" ? "bg-green-600" : v === "NEUTRAL" ? "bg-amber-600" : v === "FAIL" ? "bg-red-600" : "bg-muted";

  return (
    <Card>
      <CardHeader><CardTitle><Search className="h-4 w-4 inline mr-2" />URL Inspection — index status + live fetch</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Runs Google's URL Inspection API for a single path and does a live server fetch to compare current rendered metadata against what Google has indexed.
        </p>
        <div className="flex gap-2">
          <Input value={path} onChange={(e) => setPath(e.target.value)} placeholder="/services/bridal-dress-stitching or full URL" />
          <Button onClick={run} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Inspect
          </Button>
        </div>

        {data && (
          <div className="space-y-4 mt-3">
            <div className="text-xs font-mono text-muted-foreground truncate">Inspected: {data.inspectionUrl}</div>

            {/* Index status */}
            {data.indexStatus && (
              <div className="border rounded p-3">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-semibold">Google index status</h4>
                  <Badge className={verdictColor(data.indexStatus.verdict)}>{data.indexStatus.verdict}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <div><span className="text-muted-foreground">Coverage:</span> {data.indexStatus.coverageState ?? "—"}</div>
                  <div><span className="text-muted-foreground">Indexing:</span> {data.indexStatus.indexingState ?? "—"}</div>
                  <div><span className="text-muted-foreground">Robots:</span> {data.indexStatus.robotsTxtState ?? "—"}</div>
                  <div><span className="text-muted-foreground">Page fetch:</span> {data.indexStatus.pageFetchState ?? "—"}</div>
                  <div><span className="text-muted-foreground">Last crawl:</span> {data.indexStatus.lastCrawlTime ? new Date(data.indexStatus.lastCrawlTime).toLocaleString() : "never"}</div>
                  <div><span className="text-muted-foreground">Crawled as:</span> {data.indexStatus.crawledAs ?? "—"}</div>
                  <div className="col-span-2 truncate"><span className="text-muted-foreground">Google canonical:</span> {data.indexStatus.googleCanonical ?? "—"}</div>
                  <div className="col-span-2 truncate"><span className="text-muted-foreground">User canonical:</span> {data.indexStatus.userCanonical ?? "—"}</div>
                </div>
              </div>
            )}

            {/* Live fetch */}
            {data.live && (
              <div className="border rounded p-3">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-semibold">Live fetch (right now)</h4>
                  {data.live.httpStatus && <Badge className={data.live.httpStatus < 400 ? "bg-green-600" : "bg-red-600"}>HTTP {data.live.httpStatus}</Badge>}
                  {data.live.responseTimeMs != null && <Badge variant="outline">{data.live.responseTimeMs} ms</Badge>}
                  {data.live.bytes != null && <Badge variant="outline">{Math.round(data.live.bytes / 1024)} KB</Badge>}
                </div>
                {data.live.error && <div className="text-xs text-red-400">Error: {data.live.error}</div>}
                <div className="grid grid-cols-1 gap-1 text-xs">
                  <div><span className="text-muted-foreground">Title:</span> {data.live.title ?? "—"}</div>
                  <div><span className="text-muted-foreground">Description:</span> {data.live.description ?? "—"}</div>
                  <div className="truncate"><span className="text-muted-foreground">Canonical:</span> {data.live.canonical ?? "—"}</div>
                  <div><span className="text-muted-foreground">Robots meta:</span> {data.live.robots ?? "—"}</div>
                </div>
              </div>
            )}

            {/* Mobile & rich results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.mobileUsability && (
                <div className="border rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm font-semibold">Mobile usability</h4>
                    <Badge className={verdictColor(data.mobileUsability.verdict)}>{data.mobileUsability.verdict}</Badge>
                  </div>
                  {data.mobileUsability.issues?.length > 0 ? (
                    <ul className="text-xs text-red-400 list-disc ml-4">{data.mobileUsability.issues.map((i: any, k: number) => <li key={k}>{i.message ?? i.issueType}</li>)}</ul>
                  ) : <p className="text-xs text-green-400">No issues.</p>}
                </div>
              )}
              {data.richResults && (
                <div className="border rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm font-semibold">Rich results</h4>
                    <Badge className={verdictColor(data.richResults.verdict)}>{data.richResults.verdict}</Badge>
                  </div>
                  {data.richResults.detectedItems?.length > 0 ? (
                    <ul className="text-xs list-disc ml-4">{data.richResults.detectedItems.map((i: any, k: number) => <li key={k}>{i.richResultType} × {i.items?.length ?? 0}</li>)}</ul>
                  ) : <p className="text-xs text-muted-foreground">None detected.</p>}
                </div>
              )}
            </div>

            {data.inspectionResultLink && (
              <a href={data.inspectionResultLink} target="_blank" rel="noreferrer" className="text-xs text-primary underline">
                Open full result in Google Search Console →
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
