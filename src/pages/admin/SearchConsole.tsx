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

  const [queue, setQueue] = useState<string>(
    ["/", "/services", "/blog", "/gallery", "/booking"].map((p) => SITE + p).join("\n"),
  );
  const [inspectUrl, setInspectUrl] = useState(SITE + "/");
  const [days, setDays] = useState(28);
  const [auditPath, setAuditPath] = useState("/");

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

      <Tabs defaultValue="sitemap" className="w-full">
        <TabsList className="flex-wrap">
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          <TabsTrigger value="verify">Verification</TabsTrigger>
          <TabsTrigger value="indexing">Indexing Queue</TabsTrigger>
          <TabsTrigger value="images">Image Search</TabsTrigger>
          <TabsTrigger value="audit">Image Audit</TabsTrigger>
        </TabsList>

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
                <Textarea value={queue} onChange={(e) => setQueue(e.target.value)} rows={6} className="font-mono text-xs" />
                <Button onClick={inspectAll} variant="secondary">Inspect all</Button>
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
