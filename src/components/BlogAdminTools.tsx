import { useEffect, useState } from 'react';
import { Download, ShieldCheck, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const BASE_URL = 'https://matailor.lovable.app';

interface BlogRow {
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  featured_image_url: string | null;
  is_featured: boolean | null;
  published_at: string | null;
  created_at: string;
}

const BlogAdminTools = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin',
      });
      if (data === true) setIsAdmin(true);
    })();
  }, []);

  const score = (p: BlogRow) =>
    (p.is_featured ? 100 : 0) +
    (p.meta_title ? 20 : 0) +
    (p.meta_description ? 20 : 0) +
    (p.featured_image_url ? 10 : 0);

  const buildCsv = (rows: BlogRow[]) => {
    const ranked = [...rows].sort((a, b) => {
      const s = score(b) - score(a);
      if (s !== 0) return s;
      const da = a.published_at || a.created_at || '';
      const db = b.published_at || b.created_at || '';
      return db.localeCompare(da);
    });
    const header = [
      'priority_rank', 'url', 'title',
      'has_meta_title', 'has_meta_description', 'has_featured_image',
      'is_featured', 'published_at', 'gsc_action',
    ];
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const lines = [header.join(',')];
    ranked.forEach((p, i) => {
      const pub = (p.published_at || p.created_at || '').slice(0, 10);
      lines.push([
        String(i + 1),
        escape(`${BASE_URL}/blog/${p.slug}`),
        escape(p.title || ''),
        p.meta_title ? 'yes' : 'no',
        p.meta_description ? 'yes' : 'no',
        p.featured_image_url ? 'yes' : 'no',
        p.is_featured ? 'yes' : 'no',
        pub,
        i < 10 ? 'Request Indexing' : 'Submit via sitemap',
      ].join(','));
    });
    return lines.join('\n');
  };

  const handleDownload = async () => {
    setBusy(true);
    try {
      const { data, error } = await supabase
        .from('blog')
        .select('slug,title,meta_title,meta_description,featured_image_url,is_featured,published_at,created_at')
        .eq('is_published', true);
      if (error) throw error;
      const csv = buildCsv(data as BlogRow[]);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gsc-priority-blog-urls-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast({
        title: 'Checklist ready',
        description: `Ranked ${data.length} blog URLs. Open GSC → URL Inspection and request indexing for the top entries.`,
      });
    } catch (e: any) {
      toast({ title: 'Failed to build checklist', description: e.message, variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="container mx-auto px-4 pt-4">
      <div className="flex items-center justify-end gap-3 rounded-lg border border-gold/30 bg-gold/5 px-4 py-3">
        <ShieldCheck className="h-4 w-4 text-gold" />
        <span className="text-xs text-gold/80 mr-auto">Admin tools</span>
        <Link to="/admin/blog-seo-audit">
          <Button size="sm" variant="outline" className="text-gold border-gold/40 hover:bg-gold hover:text-black">
            <Search className="h-4 w-4 mr-2" />
            SEO Audit
          </Button>
        </Link>
        <Button
          onClick={handleDownload}
          disabled={busy}
          size="sm"
          className="bg-gold text-black hover:bg-gold-dark"
        >
          <Download className="h-4 w-4 mr-2" />
          {busy ? 'Building…' : 'Download GSC Indexing Checklist'}
        </Button>
      </div>
    </div>
  );
};

export default BlogAdminTools;
