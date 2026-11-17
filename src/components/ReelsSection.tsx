import { ExternalLink, Play } from 'lucide-react';

// HOW TO ADD ANOTHER REEL LATER:
// 1. Copy the Facebook reel URL (e.g. https://www.facebook.com/reel/<id>/).
// 2. Add a new entry at the TOP of the REELS list below (newest first) with:
//    - title: a short name for the reel
//    - url: the Facebook reel URL
//    - embedUrl: the Facebook video-plugin URL — take the reel URL, URL-encode it
//      (https:// -> https%3A%2F%2F, / -> %2F) and put it after
//      "https://www.facebook.com/plugins/video.php?href=" with
//      "&show_text=false&width=500" at the end.
// 3. Push to GitHub and redeploy — no admin panel or database change needed.
//
// NOTE: the site also has a Supabase `videos` table, but it only holds 5 older
// videos (2 TikTok, 1 YouTube Short, 2 old Facebook reels from 2025) and does
// NOT contain these 3 reels, so this section uses the pasted Facebook links
// above instead. If the owner later wants this section driven by the `videos`
// table, the component can be switched to read from it.

interface Reel {
  title: string;
  url: string;
  embedUrl: string;
}

const REELS: Reel[] = [
  {
    title: 'Pink Perfection — Kurti Reel',
    url: 'https://www.facebook.com/reel/1173873741755743/',
    embedUrl:
      'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1173873741755743%2F&show_text=false&width=500',
  },
  {
    title: 'Bridal — Full Reel',
    url: 'https://www.facebook.com/reel/1084337354662759/',
    embedUrl:
      'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1084337354662759%2F&show_text=false&width=500',
  },
  {
    title: 'Beige & Maroon — New Design Reel',
    url: 'https://www.facebook.com/reel/4652984161603468/',
    embedUrl:
      'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F4652984161603468%2F&show_text=false&width=500',
  },
];

const ReelsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-black text-white">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            Our <span className="text-gold">Reels</span>
          </h2>
          <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
            Watch our latest stitching reels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {REELS.map((reel) => (
            <div key={reel.url} className="fancy-border p-1 h-full">
              <div className="bg-black p-4 rounded-lg h-full flex flex-col">
                <a
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[9/16] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden mb-4 bg-black group"
                  title={`${reel.title} — Watch on Facebook`}
                >
                  <iframe
                    src={reel.embedUrl}
                    title={reel.title}
                    className="absolute inset-0 w-full h-full border-0"
                    scrolling="no"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-gold text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <Play className="h-6 w-6" />
                    </span>
                  </span>
                </a>
                <div className="flex-grow flex flex-col items-center text-center">
                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-playfair font-semibold text-gold mb-3 line-clamp-2 hover:text-gold-light transition-colors duration-200"
                  >
                    {reel.title}
                  </a>
                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 bg-gold text-black font-montserrat font-bold text-sm px-5 py-2.5 rounded-full hover:bg-gold-light transition-colors duration-200"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Watch on Facebook
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelsSection;
