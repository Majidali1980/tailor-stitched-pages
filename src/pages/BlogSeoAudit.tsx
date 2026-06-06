import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, RefreshCw, Download, ShieldAlert } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://matailor.lovable.app';

interface BlogRow {
  slug: string;
  title: string;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  featured_image_url: string | null;
  author_name: string | null;
  category: string | null;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
}

interface CheckResult {
  slug: string;
  title: string;
  url: string;
  status: 'pass' | 'warn' | 'fail' | 'error';
  fetchStatus?: number;
  checks: {
    canonical: { ok: boolean; value?: string; note?: string };
    robots: { ok: boolean; value?: string; note?: string };
    ogTitle: { ok: boolean; note?: string };
    ogDescription: { ok: boolean; note?: string };
    ogImage: { ok: boolean; note?: string };
    ogUrl: { ok: boolean; value?: string; note?: string };
    ogType: { ok: boolean; note?: string };
    twitterCard: { ok: boolean; note?: string };
    twitterTitle: { ok: boolean; note?: string };
    twitterDescription: { ok: boolean; note?: string };
    jsonLd: { ok: boolean; note?: string };
  };
  failedCount: number;
  warningCount: number;
}

const extractMeta = (html: string, attr: 'name' | 'property', key: string): string | null => {
  const re = new RegExp(
    `<meta\\s+[^>]*${attr}=["']${key.replace(/[-/\\^$*+?.()|[\\]{}]/g, '\\\\$&')}["'][^>]*>`,
    'i'
  );
  const m = html.match(re);
  if (!m) return null;
  const c = m[0].match(/content=["']([^"']*)["']/i);
  return c ? c[1] : '';
};

const extractCanonical = (html: string): string | null => {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  if (!m) return null;
  const h = m[0].match(/href=["']([^"']*)["']/i);
  return h ? h[1] : '';
};

const hasJsonLd = (html: string): boolean =>
  /<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i.test(html);

const auditOne = async (row: BlogRow): Promise<CheckResult> => {
  const url = `${BASE_URL}/blog/${row.slug}`;
  const result: CheckResult = {
    slug: row.slug,
    title: row.title,
    url,
    status: 'pass',
    checks: {} as CheckResult['checks'],
    failedCount: 0,
    warningCount: 0,
  };

  let html = '';
  try {
    const res = await fetch(url, { headers: { Accept: 'text/html' } });
    result.fetchStatus = res.status;
    html = await res.text();
    if (!res.ok) {
      result.status = 'error';
      return result;
    }
  } catch (e) {
    result.status = 'error';
    return result;
  }

  const canonical = extractCanonical(html);
  const robots = extractMeta(html, 'name', 'robots');
  const ogTitle = extractMeta(html, 'property', 'og:title');
  const ogDesc = extractMeta(html, 'property', 'og:description');
  const ogImage = extractMeta(html, 'property', 'og:image');
  const ogUrl = extractMeta(html, 'property', 'og:url');
  const ogType = extractMeta(html, 'property', 'og:type');
  const twCard = extractMeta(html, 'name', 'twitter:card');
  const twTitle = extractMeta(html, 'name', 'twitter:title');
  const twDesc = extractMeta(html, 'name', 'twitter:description');

  result.checks.canonical = {
    ok: canonical === url,
    value: canonical || undefined,
    note: !canonical ? 'missing' : canonical !== url ? `mismatch (expected ${url})` : undefined,
  };
  result.checks.robots = {
    ok: !!robots && /index/i.test(robots) && !/noindex/i.test(robots),
    value: robots || undefined,
    note: !robots ? 'missing' : /noindex/i.test(robots) ? 'noindex set' : undefined,
  };
  result.checks.ogTitle = { ok: !!ogTitle, note: !ogTitle ? 'missing' : undefined };
  result.checks.ogDescription = { ok: !!ogDesc, note: !ogDesc ? 'missing' : undefined };
  result.checks.ogImage = {
    ok: !!ogImage || !row.featured_image_url,
    note: !ogImage && row.featured_image_url ? 'missing (post has featured image)' : !ogImage ? 'none (post has no image)' : undefined,
  };
  result.checks.ogUrl = {
    ok: ogUrl === url,
    value: ogUrl || undefined,
    note: !ogUrl ? 'missing' : ogUrl !== url ? 'mismatch' : undefined,
  };
  result.checks.ogType = {
    ok: ogType === 'article',
    note: ogType !== 'article' ? `expected "article", got "${ogType ?? 'missing'}"` : undefined,
  };
  result.checks.twitterCard = { ok: !!twCard, note: !twCard ? 'missing' : undefined };
  result.checks.twitterTitle = { ok: !!twTitle, note: !twTitle ? 'missing' : undefined };
  result.checks.twitterDescription = { ok: !!twDesc, note: !twDesc ? 'missing' : undefined };
  result.checks.jsonLd = { ok: hasJsonLd(html), note: !hasJsonLd(html) ? 'missing Article schema' : undefined };

  const failKeys: (keyof CheckResult['checks'])[] = ['canonical', 'robots', 'ogTitle', 'ogDescription', 'ogUrl', 'ogType', 'twitterCard'];
  const warnKeys: (keyof CheckResult['checks'])[] = ['ogImage', 'twitterTitle', 'twitterDescription', 'jsonLd'];

  result.failedCount = failKeys.filter(k => !result.checks[k].ok).length;
  result.warningCount = warnKeys.filter(k => !result.checks[k].ok).length;

  if (result.failedCount > 0) result.status = 'fail';
  else if (result.warningCount > 0) result.status = 'warn';
  else result.status = 'pass';

  return result;
};

const StatusBadge = ({ status }: { status: CheckResult['status'] }) => {
  if (status === 'pass') return <Badge className="bg-green-600 hover:bg-green-600">PASS</Badge>;
  if (status === 'warn') return <Badge className="bg-yellow-600 hover:bg-yellow-600">WARN</Badge>;
  if (status === 'fail') return <Badge className="bg-red-600 hover:bg-red-600">FAIL</Badge>;
  return <Badge className="bg-gray-600 hover:bg-gray-600">ERROR</Badge>;
};

const CheckIcon = ({ ok }: { ok: boolean }) =>
  ok ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />;

const BlogSeoAudit = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<BlogRow[]>([]);
  const [results, setResults] = useState<CheckResult[]>([]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [filter, setFilter] = useState<'all' | 'fail' | 'warn'>('all');

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' });
        setIsAdmin(data === true);
      }
      setAuthChecked(true);
    })();
  }, []);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('blog')
      .select('slug,title,excerpt,meta_title,meta_description,featured_image_url,author_name,category,tags,published_at,created_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false });
    if (!error && data) setPosts(data as BlogRow[]);
  };

  useEffect(() => {
    if (isAdmin) loadPosts();
  }, [isAdmin]);

  const runAudit = async () => {
    setRunning(true);
    setResults([]);
    setProgress({ done: 0, total: posts.length });
    const out: CheckResult[] = [];
    const concurrency = 4;
    let i = 0;
    const workers = Array.from({ length: concurrency }).map(async () => {
      while (i < posts.length) {
        const idx = i++;
        const r = await auditOne(posts[idx]);
        out.push(r);
        setResults([...out]);
        setProgress({ done: out.length, total: posts.length });
      }
    });
    await Promise.all(workers);
    out.sort((a, b) => b.failedCount - a.failedCount || b.warningCount - a.warningCount);
    setResults(out);
    setRunning(false);
  };

  const downloadCsv = () => {
    const header = ['slug', 'url', 'status', 'failed_count', 'warning_count', 'canonical_ok', 'robots_ok', 'og_title_ok', 'og_description_ok', 'og_image_ok', 'og_url_ok', 'og_type_ok', 'twitter_card_ok', 'twitter_title_ok', 'twitter_description_ok', 'json_ld_ok', 'fetch_status', 'notes'];
    const esc = (v: string) => `"${(v ?? '').replace(/"/g, '""')}"`;
    const lines = [header.join(',')];
    results.forEach(r => {
      const notes = Object.entries(r.checks)
        .filter(([, c]) => !c.ok)
        .map(([k, c]) => `${k}: ${c.note ?? 'fail'}`)
        .join(' | ');
      lines.push([
        esc(r.slug),
        esc(r.url),
        r.status,
        String(r.failedCount),
        String(r.warningCount),
        r.checks.canonical?.ok ? 'yes' : 'no',
        r.checks.robots?.ok ? 'yes' : 'no',
        r.checks.ogTitle?.ok ? 'yes' : 'no',
        r.checks.ogDescription?.ok ? 'yes' : 'no',
        r.checks.ogImage?.ok ? 'yes' : 'no',
        r.checks.ogUrl?.ok ? 'yes' : 'no',
        r.checks.ogType?.ok ? 'yes' : 'no',
        r.checks.twitterCard?.ok ? 'yes' : 'no',
        r.checks.twitterTitle?.ok ? 'yes' : 'no',
        r.checks.twitterDescription?.ok ? 'yes' : 'no',
        r.checks.jsonLd?.ok ? 'yes' : 'no',
        r.fetchStatus ?? '',
        esc(notes),
      ].join(','));
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blog-seo-audit-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const filtered = results.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'fail') return r.status === 'fail' || r.status === 'error';
    if (filter === 'warn') return r.status === 'warn';
    return true;
  });

  const summary = {
    pass: results.filter(r => r.status === 'pass').length,
    warn: results.filter(r => r.status === 'warn').length,
    fail: results.filter(r => r.status === 'fail').length,
    error: results.filter(r => r.status === 'error').length,
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-gold" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />
        <div className="pt-36 pb-16 container mx-auto px-4 text-center">
          <ShieldAlert className="h-12 w-12 text-gold mx-auto mb-4" />
          <h1 className="text-3xl font-playfair font-bold mb-4">Admin Access Required</h1>
          <p className="text-gray-400 mb-8">You need an admin role to view the blog SEO audit.</p>
          <Link to="/blog">
            <Button className="bg-gold hover:bg-gold-dark text-black">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Helmet>
        <title>Blog SEO Audit | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <div className="pt-36 pb-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <Link to="/blog" className="text-gold hover:text-gold-dark text-sm inline-flex items-center mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Blog
            </Link>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold">Blog SEO Audit</h1>
            <p className="text-gray-400 mt-2 text-sm">
              Fetches every published blog URL and validates canonical, robots, OpenGraph, Twitter Card, and JSON-LD tags in the initial HTML.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button onClick={runAudit} disabled={running || posts.length === 0} className="bg-gold hover:bg-gold-dark text-black">
              <RefreshCw className={`h-4 w-4 mr-2 ${running ? 'animate-spin' : ''}`} />
              {running ? `Auditing ${progress.done}/${progress.total}…` : `Run Audit (${posts.length} posts)`}
            </Button>
            {results.length > 0 && (
              <Button onClick={downloadCsv} variant="outline" className="text-gold border-gold hover:bg-gold hover:text-black">
                <Download className="h-4 w-4 mr-2" /> Export CSV
              </Button>
            )}
          </div>
        </div>

        {results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button onClick={() => setFilter('all')} className={`rounded-lg border p-4 text-left transition ${filter === 'all' ? 'border-gold bg-gold/10' : 'border-gray-700'}`}>
              <div className="text-2xl font-bold">{results.length}</div>
              <div className="text-sm text-gray-400">Total audited</div>
            </button>
            <div className="rounded-lg border border-green-700/40 bg-green-900/10 p-4">
              <div className="text-2xl font-bold text-green-400 flex items-center gap-2"><CheckCircle2 className="h-5 w-5" />{summary.pass}</div>
              <div className="text-sm text-gray-400">Passing</div>
            </div>
            <button onClick={() => setFilter('warn')} className={`rounded-lg border p-4 text-left transition ${filter === 'warn' ? 'border-yellow-500 bg-yellow-900/20' : 'border-yellow-700/40 bg-yellow-900/10'}`}>
              <div className="text-2xl font-bold text-yellow-400 flex items-center gap-2"><AlertTriangle className="h-5 w-5" />{summary.warn}</div>
              <div className="text-sm text-gray-400">Warnings</div>
            </button>
            <button onClick={() => setFilter('fail')} className={`rounded-lg border p-4 text-left transition ${filter === 'fail' ? 'border-red-500 bg-red-900/20' : 'border-red-700/40 bg-red-900/10'}`}>
              <div className="text-2xl font-bold text-red-400 flex items-center gap-2"><XCircle className="h-5 w-5" />{summary.fail + summary.error}</div>
              <div className="text-sm text-gray-400">Failures</div>
            </button>
          </div>
        )}

        {results.length === 0 && !running && (
          <div className="rounded-lg border border-gray-700 p-12 text-center text-gray-400">
            Click "Run Audit" to fetch every published blog URL and check its SEO tags.
          </div>
        )}

        {filtered.length > 0 && (
          <div className="rounded-lg border border-gray-700 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-transparent">
                  <TableHead className="text-gold">Status</TableHead>
                  <TableHead className="text-gold">Post</TableHead>
                  <TableHead className="text-gold text-center" title="Canonical">Canon</TableHead>
                  <TableHead className="text-gold text-center" title="Robots">Robots</TableHead>
                  <TableHead className="text-gold text-center" title="OG Title">OG:T</TableHead>
                  <TableHead className="text-gold text-center" title="OG Description">OG:D</TableHead>
                  <TableHead className="text-gold text-center" title="OG Image">OG:I</TableHead>
                  <TableHead className="text-gold text-center" title="OG URL">OG:U</TableHead>
                  <TableHead className="text-gold text-center" title="OG Type">OG:Ty</TableHead>
                  <TableHead className="text-gold text-center" title="Twitter Card">TW:C</TableHead>
                  <TableHead className="text-gold text-center" title="Twitter Title">TW:T</TableHead>
                  <TableHead className="text-gold text-center" title="Twitter Description">TW:D</TableHead>
                  <TableHead className="text-gold text-center" title="JSON-LD">LD</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(r => (
                  <TableRow key={r.slug} className="border-gray-700 hover:bg-gray-900/40">
                    <TableCell><StatusBadge status={r.status} /></TableCell>
                    <TableCell className="max-w-xs">
                      <a href={r.url} target="_blank" rel="noreferrer" className="text-gold hover:underline text-sm block truncate">{r.title}</a>
                      <span className="text-xs text-gray-500 block truncate">/blog/{r.slug}</span>
                      {(r.failedCount > 0 || r.warningCount > 0) && (
                        <div className="text-xs text-red-400 mt-1">
                          {Object.entries(r.checks)
                            .filter(([, c]) => !c.ok)
                            .map(([k, c]) => `${k}: ${c.note ?? 'fail'}`)
                            .join('; ')}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-center"><CheckIcon ok={r.checks.canonical?.ok ?? false} /></TableCell>
                    <TableCell className="text-center"><CheckIcon ok={r.checks.robots?.ok ?? false} /></TableCell>
                    <TableCell className="text-center"><CheckIcon ok={r.checks.ogTitle?.ok ?? false} /></TableCell>
                    <TableCell className="text-center"><CheckIcon ok={r.checks.ogDescription?.ok ?? false} /></TableCell>
                    <TableCell className="text-center"><CheckIcon ok={r.checks.ogImage?.ok ?? false} /></TableCell>
                    <TableCell className="text-center"><CheckIcon ok={r.checks.ogUrl?.ok ?? false} /></TableCell>
                    <TableCell className="text-center"><CheckIcon ok={r.checks.ogType?.ok ?? false} /></TableCell>
                    <TableCell className="text-center"><CheckIcon ok={r.checks.twitterCard?.ok ?? false} /></TableCell>
                    <TableCell className="text-center"><CheckIcon ok={r.checks.twitterTitle?.ok ?? false} /></TableCell>
                    <TableCell className="text-center"><CheckIcon ok={r.checks.twitterDescription?.ok ?? false} /></TableCell>
                    <TableCell className="text-center"><CheckIcon ok={r.checks.jsonLd?.ok ?? false} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <p className="text-xs text-gray-500 mt-6">
          Note: Audit fetches the live published URL. To see prerendered tags, deploy first — preview env serves the SPA shell only.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default BlogSeoAudit;
