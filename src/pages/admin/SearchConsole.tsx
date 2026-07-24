import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
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
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          <TabsTrigger value="verify">Verification</TabsTrigger>
          <TabsTrigger value="indexing">Indexing Queue</TabsTrigger>
          <TabsTrigger value="images">Image Search</TabsTrigger>
          <TabsTrigger value="audit">Image Audit</TabsTrigger>
          <TabsTrigger value="coverage">Index Coverage</TabsTrigger>
        </TabsList>

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
