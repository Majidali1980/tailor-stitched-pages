import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, ChevronRight, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  featured_image_url: string | null;
  tags: string[] | null;
  category: string | null;
  published_at: string | null;
  created_at: string;
}

interface Props { mode: 'category' | 'tag' }

const titleCase = (s: string) =>
  s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const BlogTaxonomy = ({ mode }: Props) => {
  const params = useParams();
  const raw = mode === 'category' ? params.category : params.tag;
  const value = (raw || '').toLowerCase();
  const display = titleCase(value);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let query = supabase.from('blog').select('*').eq('is_published', true).order('published_at', { ascending: false });
      if (mode === 'category') {
        query = query.ilike('category', value.replace(/-/g, ' '));
      } else {
        query = query.contains('tags', [value.replace(/-/g, ' ')]);
      }
      const { data } = await query;
      setPosts(data || []);
      setLoading(false);
    })();
  }, [mode, value]);

  const url = `https://matailor.lovable.app/blog/${mode}/${value}`;
  const title = mode === 'category'
    ? `${display} – Blog Posts | Ma Tailor`
    : `${display} Articles & Guides | Ma Tailor`;
  const description = mode === 'category'
    ? `Read the latest ${display.toLowerCase()} blog posts from Ma Tailor – tips, guides and trends for custom Pakistani stitching.`
    : `All blog posts tagged "${display}" from Ma Tailor – guides, tips and inspiration for custom stitching.`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />
        <section className="pt-36 pb-10 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="uppercase tracking-widest text-gold text-sm mb-2">{mode === 'category' ? 'Category' : 'Tag'}</p>
            <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-4">{display}</h1>
            <p className="text-gray-300">{description}</p>
            <div className="mt-6">
              <Link to="/blog" className="text-gold hover:underline">← Back to all posts</Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-black">
          <div className="container mx-auto px-4">
            {loading ? (
              <p className="text-center text-gray-400">Loading…</p>
            ) : posts.length === 0 ? (
              <p className="text-center text-gray-400">No posts found for "{display}" yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {posts.map(post => (
                  <Link key={post.id} to={`/blog/${post.slug}`}>
                    <Card className="bg-gray-900 border-gray-700 hover:border-gold/40 transition-colors h-full">
                      {post.featured_image_url && (
                        <div className="h-44 overflow-hidden rounded-t-lg">
                          <img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.published_at || post.created_at).toLocaleDateString()}
                        </div>
                        <CardTitle className="text-lg font-playfair text-white hover:text-gold">{post.title}</CardTitle>
                        <CardDescription className="text-gray-300">{post.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {post.tags && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.slice(0, 3).map((t, i) => (
                              <Badge key={i} variant="outline" className="text-gold border-gold/30 text-xs">
                                <Tag className="h-3 w-3 mr-1" />{t}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center text-gold text-sm">Read more <ChevronRight className="h-4 w-4 ml-1" /></div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default BlogTaxonomy;
