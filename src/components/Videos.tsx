
import { Play, Video } from 'lucide-react';
import { useEffect } from 'react';

const Videos = () => {
  useEffect(() => {
    // Load TikTok embed script
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section id="videos" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            Our <span className="text-gold">Videos</span>
          </h2>
          <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
            Watch our latest work and behind-the-scenes moments from MA Tailor.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="fancy-border p-1">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="aspect-[357/476] w-full rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1354046195683019%2F&show_text=false&width=357&t=0"
                  width="100%"
                  height="100%"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-playfair font-semibold text-gold mb-2">Latest Work Showcase</h3>
                <p className="font-montserrat text-gray-300 text-sm">
                  See our latest tailoring work and craftsmanship in action.
                </p>
              </div>
            </div>
          </div>
          
          {/* TikTok Video 1 */}
          <div className="fancy-border p-1">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="w-full rounded-lg overflow-hidden mb-4 flex justify-center">
                <blockquote 
                  className="tiktok-embed" 
                  cite="https://www.tiktok.com/@matailor1234/video/7526305743679540487" 
                  data-video-id="7526305743679540487" 
                  style={{ maxWidth: '100%', minWidth: '280px', width: '100%' }}
                >
                  <section>
                    <a target="_blank" title="@matailor1234" href="https://www.tiktok.com/@matailor1234?refer=embed">
                      @matailor1234
                    </a> 
                    MA TAILOR Ladies Online Stitching Shop{' '}
                    <a title="tailor" target="_blank" href="https://www.tiktok.com/tag/tailor?refer=embed">
                      #tailor
                    </a>{' '}
                    <a title="matailor" target="_blank" href="https://www.tiktok.com/tag/matailor?refer=embed">
                      #matailor
                    </a>{' '}
                    <a target="_blank" title="♬ original sound - MA TAILOR" href="https://www.tiktok.com/music/original-sound-7526305834784115473?refer=embed">
                      ♬ original sound - MA TAILOR
                    </a>
                  </section>
                </blockquote>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-playfair font-semibold text-gold mb-2">TikTok Showcase</h3>
                <p className="font-montserrat text-gray-300 text-sm">
                  Follow us on TikTok for quick tailoring tips and showcases.
                </p>
              </div>
            </div>
          </div>
          
          {/* TikTok Photo/Video 2 */}
          <div className="fancy-border p-1">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="w-full rounded-lg overflow-hidden mb-4 flex justify-center">
                <blockquote 
                  className="tiktok-embed" 
                  cite="https://www.tiktok.com/@matailor1234/photo/7526444149067746578" 
                  data-video-id="7526444149067746578" 
                  style={{ maxWidth: '100%', minWidth: '280px', width: '100%' }}
                >
                  <section>
                    <a target="_blank" title="@matailor1234" href="https://www.tiktok.com/@matailor1234?refer=embed">
                      @matailor1234
                    </a> 
                    Latest Pakistani Dress Collection{' '}
                    <a title="pakistanidress" target="_blank" href="https://www.tiktok.com/tag/pakistanidress?refer=embed">
                      #pakistanidress
                    </a>{' '}
                    <a title="matailor" target="_blank" href="https://www.tiktok.com/tag/matailor?refer=embed">
                      #matailor
                    </a>
                  </section>
                </blockquote>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-playfair font-semibold text-gold mb-2">Latest Collection</h3>
                <p className="font-montserrat text-gray-300 text-sm">
                  Browse our latest Pakistani dress designs and styles.
                </p>
              </div>
            </div>
          </div>

          {/* YouTube Short 1 */}
          <div className="fancy-border p-1">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="aspect-[9/16] w-full max-w-xs mx-auto rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.youtube.com/embed/UER1fHZudhc"
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  allowFullScreen={true}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-playfair font-semibold text-gold mb-2">YouTube Short</h3>
                <p className="font-montserrat text-gray-300 text-sm">
                  Watch our latest YouTube shorts for quick tips and showcases.
                </p>
              </div>
            </div>
          </div>

          {/* YouTube Video 2 */}
          <div className="fancy-border p-1">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.youtube.com/embed/U7SpQWhw9TE"
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  allowFullScreen={true}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-playfair font-semibold text-gold mb-2">Tailoring Process</h3>
                <p className="font-montserrat text-gray-300 text-sm">
                  Get an inside look at our detailed tailoring process.
                </p>
              </div>
            </div>
          </div>

          {/* YouTube Short 3 */}
          <div className="fancy-border p-1">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="aspect-[9/16] w-full max-w-xs mx-auto rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.youtube.com/embed/7-RqIkEsrcM"
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  allowFullScreen={true}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-playfair font-semibold text-gold mb-2">Design Showcase</h3>
                <p className="font-montserrat text-gray-300 text-sm">
                  Explore our creative design process and finished products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;
