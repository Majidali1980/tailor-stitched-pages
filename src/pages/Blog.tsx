import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import BlogAdminTools from '@/components/BlogAdminTools';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  author_name: string | null;
  slug: string;
  is_featured: boolean | null;
  tags: string[] | null;
  category: string | null;
  published_at: string | null;
  created_at: string;
}

const Blog = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(blogPosts.map(post => post.category).filter(Boolean))];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.is_featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Ma Tailor Blog",
    "description": "Fashion tips, stitching trends, and custom tailoring advice for Pakistani girls",
    "url": "https://matailor.lovable.app/blog",
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || truncateText(post.content, 150),
      "datePublished": post.published_at || post.created_at,
      "author": {
        "@type": "Person",
        "name": post.author_name || "Ma Tailor"
      }
    }))
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Fashion Tips, Fabric Guides & Custom Tailoring Blog</title>
        </Helmet>
        <div className="min-h-screen bg-black text-white font-montserrat">
          <Navbar />
          <div className="pt-36 pb-16">
            <div className="container mx-auto px-4 text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-96 mx-auto mb-8"></div>
              </div>
            </div>
          </div>
          <Footer />
          <WhatsAppFloat />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Fashion Tips, Fabric Guides & Custom Tailoring Blog</title>
        <meta name="description" content="Expert guides on clothing fit, fabric selection, and modern fashion trends." />
        <meta name="keywords" content="girls stitching trends 2025, custom tailoring tips, Pakistani stitched fashion ideas, dress design trends, tailoring advice Pakistan" />
        <link rel="canonical" href="https://matailor.lovable.app/blog" />
        
        <meta property="og:title" content="Fashion Tips, Fabric Guides & Custom Tailoring Blog" />
        <meta property="og:description" content="Expert guides on clothing fit, fabric selection, and modern fashion trends." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/blog" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />
        <BlogAdminTools />
      
      
      {/* Hero Section */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            Fashion <span className="text-gold">Blog</span>
          </h1>
          <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto mb-8">
            Discover the latest trends, styling tips, and fashion insights from MA Tailor's experts.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-bold text-gold mb-8 text-center">
              Featured Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post) => (
                <Card 
                  key={post.id} 
                  className="bg-black border-gold/20 hover:border-gold/40 transition-colors cursor-pointer"
                  onClick={() => handlePostClick(post.slug)}
                >
                  {post.featured_image_url && (
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src={post.featured_image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-gold text-black">
                        Featured
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.published_at || post.created_at)}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author_name || 'Admin'}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-playfair font-bold text-white hover:text-gold transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {post.excerpt || truncateText(post.content, 150)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {post.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-gold border-gold/30">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center text-gold font-semibold hover:text-gold-dark transition-colors">
                      Read the full article <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {categories.map((category) => {
              const isAll = category === 'all';
              const slug = String(category).toLowerCase().replace(/\s+/g, '-');
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full font-montserrat text-sm font-medium transition-colors ${
                    active ? 'bg-gold text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {String(category).charAt(0).toUpperCase() + String(category).slice(1)}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {categories.filter(c => c !== 'all').map((category) => {
              const slug = String(category).toLowerCase().replace(/\s+/g, '-');
              return (
                <a
                  key={`link-${category}`}
                  href={`/blog/category/${slug}`}
                  className="text-gold/80 hover:text-gold underline-offset-2 hover:underline"
                >
                  Browse {category} posts →
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-playfair font-bold text-gray-400 mb-4">
                No posts found
              </h3>
              <p className="text-gray-500 font-montserrat">
                Check back soon for new content!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="bg-gray-900 border-gray-700 hover:border-gold/40 transition-colors cursor-pointer"
                  onClick={() => handlePostClick(post.slug)}
                >
                  {post.featured_image_url && (
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src={post.featured_image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {post.category && (
                        <Badge className="absolute top-4 left-4 bg-black/80 text-gold">
                          {post.category}
                        </Badge>
                      )}
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.published_at || post.created_at)}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author_name || 'Admin'}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-playfair font-bold text-white hover:text-gold transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {post.excerpt || truncateText(post.content, 150)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {post.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-gold border-gold/30">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center text-gold font-semibold hover:text-gold-dark transition-colors">
                      Read the full article <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
      </div>
    </>
  );
};

export default Blog;