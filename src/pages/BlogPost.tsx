import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, BookOpen, Phone, Image } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  meta_title: string | null;
  meta_description: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      setPost(data);
      
      // Update page title and meta description
      if (data?.meta_title) {
        document.title = data.meta_title;
      } else if (data?.title) {
        document.title = `${data.title} - MA Tailor Blog`;
      }
      
      if (data?.meta_description) {
        const metaTag = document.querySelector('meta[name="description"]');
        if (metaTag) {
          metaTag.setAttribute('content', data.meta_description);
        } else {
          const newMetaTag = document.createElement('meta');
          newMetaTag.name = 'description';
          newMetaTag.content = data.meta_description;
          document.head.appendChild(newMetaTag);
        }
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive"
      });
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    // Convert markdown-style formatting to HTML
    return content
      .replace(/## (.*)/g, '<h2 class="text-2xl font-playfair font-bold text-gold mb-4 mt-8">$1</h2>')
      .replace(/### (.*)/g, '<h3 class="text-xl font-playfair font-bold text-white mb-3 mt-6">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="w-full max-w-2xl mx-auto rounded-lg shadow-lg my-6" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-gold hover:text-gold-dark underline">$1</a>')
      .replace(/^\d+\.\s(.+)/gm, '<li class="mb-2">$1</li>')
      .replace(/^-\s(.+)/gm, '<li class="mb-2 list-disc ml-4">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<[h|l|i])/gm, '<p class="mb-4">')
      .replace(/(?<!>)$/gm, '</p>');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />
        <div className="pt-36 pb-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse max-w-4xl mx-auto">
              <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-64 bg-gray-700 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <WhatsAppFloat />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />
        <div className="pt-36 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-playfair font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/blog')} className="bg-gold hover:bg-gold-dark text-black">
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
        <WhatsAppFloat />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Navbar />
      
      <article className="pt-36 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button 
            onClick={() => navigate('/blog')}
            variant="ghost"
            className="text-gold hover:text-gold-dark mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>

          {/* Featured Image */}
          {post.featured_image_url && (
            <div className="relative mb-8 rounded-lg overflow-hidden">
              <img 
                src={post.featured_image_url} 
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Post Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.category && (
                <Badge className="bg-gold text-black">
                  {post.category}
                </Badge>
              )}
              {post.is_featured && (
                <Badge variant="outline" className="text-gold border-gold">
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.published_at || post.created_at)}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author_name || 'Admin'}
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-gold border-gold/30">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          <div 
            className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />

          {/* Action Buttons */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <Button 
                onClick={() => navigate('/blog')}
                variant="outline"
                className="text-gold border-gold hover:bg-gold hover:text-black w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/booking">
                  <Button className="bg-gold hover:bg-gold-dark text-black">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="text-gold border-gold hover:bg-gold hover:text-black">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Us
                  </Button>
                </Link>
                <Link to="/gallery">
                  <Button variant="outline" className="text-gold border-gold hover:bg-gold hover:text-black">
                    <Image className="h-4 w-4 mr-2" />
                    View Gallery
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default BlogPost;