
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Play } from 'lucide-react';

interface VideoItem {
  id: string;
  platform: string;
  video_url: string;
  title: string | null;
  description: string | null;
  display_order: number;
}

const DynamicVideos = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching videos:', error);
        } else {
          setVideos(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();

    // Load TikTok embed script
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const renderVideo = (video: VideoItem) => {
    switch (video.platform) {
      case 'YouTube':
        return (
          <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
            <iframe
              src={video.video_url}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              allowFullScreen={true}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="rounded-lg"
            />
          </div>
        );
      
      case 'TikTok':
        return (
          <div className="w-full rounded-lg overflow-hidden mb-4 flex justify-center">
            <blockquote 
              className="tiktok-embed" 
              cite={video.video_url} 
              data-video-id={video.video_url.split('/').pop()} 
              style={{ maxWidth: '100%', minWidth: '280px', width: '100%' }}
            >
              <section>
                <a target="_blank" href={video.video_url}>
                  View on TikTok
                </a>
              </section>
            </blockquote>
          </div>
        );
      
      case 'Instagram':
        return (
          <div className="aspect-square w-full rounded-lg overflow-hidden mb-4">
            <iframe
              src={video.video_url}
              width="100%"
              height="100%"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              className="rounded-lg"
            />
          </div>
        );
      
      default:
        return (
          <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-gray-800 flex items-center justify-center">
            <Play className="h-12 w-12 text-gold" />
          </div>
        );
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse text-gold text-lg">Loading Videos...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            Our <span className="text-gold">Videos</span>
          </h2>
          <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
            Watch our latest work and behind-the-scenes moments from MA Tailor.
          </p>
        </div>
        
        {videos.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>No videos available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="fancy-border p-1">
                <div className="bg-gray-900 p-4 rounded-lg">
                  {renderVideo(video)}
                  <div className="text-center">
                    <h3 className="text-lg font-playfair font-semibold text-gold mb-2">
                      {video.title || `${video.platform} Video`}
                    </h3>
                    {video.description && (
                      <p className="font-montserrat text-gray-300 text-sm">
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicVideos;
