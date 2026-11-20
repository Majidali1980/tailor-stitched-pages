import { ExternalLink, Play } from 'lucide-react';

// HOW TO ADD ANOTHER REEL LATER:
// 1. Copy the reel URL — Facebook (https://www.facebook.com/reel/<id>/)
//    or TikTok (https://www.tiktok.com/@matailor1234/video/<id>).
// 2. Add a new entry at the TOP of the REELS list below (newest first) with:
//    - title: a short name for the reel
//    - url: the reel URL
//    - platform: 'facebook' or 'tiktok'
//    - embedUrl: Facebook — take the reel URL, URL-encode it
//      (https:// -> https%3A%2F%2F, / -> %2F) and put it after
//      "https://www.facebook.com/plugins/video.php?href=" with
//      "&show_text=false&width=500" at the end.
//      TikTok — "https://www.tiktok.com/embed/v2/<video-id>".
// 3. Push to GitHub and redeploy — no admin panel or database change needed.
//
// MIX (20 Nov 2026): the 10 top-viewed reels — the 3 Facebook dress reels
// already on the site + the 7 most-viewed TikTok videos (@matailor1234,
// checked 20 Nov: top video 3,685 views, next 274 / 266 / 263 / 262 / 259 / 259).
// Facebook views are the Page-post views (Beige & Maroon 227, Pink 211).
//
// NOTE: the site also has a Supabase `videos` table, but it only holds 5 older
// videos (2 TikTok, 1 YouTube Short, 2 old Facebook reels from 2025) and does
// NOT contain these 10 reels, so this section uses the pasted links
// above instead. If the owner later wants this section driven by the `videos`
// table, the component can be switched to read from it.

interface Reel {
  title: string;
  url: string;
  embedUrl: string;
  platform: 'facebook' | 'tiktok';
}

const REELS: Reel[] = [
  {
    title: 'Pink Perfection — Kurti Reel',
    url: 'https://www.facebook.com/reel/1173873741755743/',
    embedUrl:
      'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1173873741755743%2F&show_text=false&width=500',
    platform: 'facebook',
  },
  {
    title: 'Bridal — Full Reel',
    url: 'https://www.facebook.com/reel/1084337354662759/',
    // NOTE 20 Nov 2026: Facebook blocks embedding this reel ("can't be embedded
    // because it may contain content owned by someone else"), so it renders as a
    // link card below instead of a broken black player. External link still works.
    embedUrl: '',
    platform: 'facebook',
  },
  {
    title: 'Beige & Maroon — New Design Reel',
    url: 'https://www.facebook.com/reel/4652984161603468/',
    embedUrl:
      'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F4652984161603468%2F&show_text=false&width=500',
    platform: 'facebook',
  },
  {
    title: 'MA Tailor Promo — Worldwide Delivery',
    url: 'https://www.tiktok.com/@matailor1234/video/7706562490850610450',
    embedUrl: 'https://www.tiktok.com/embed/v2/7706562490850610450',
    platform: 'tiktok',
  },
  {
    title: 'Ladies & Kids Stitching Promo',
    url: 'https://www.tiktok.com/@matailor1234/video/7705502097604709650',
    embedUrl: 'https://www.tiktok.com/embed/v2/7705502097604709650',
    platform: 'tiktok',
  },
  {
    title: 'Missing Pakistani Fits Abroad?',
    url: 'https://www.tiktok.com/@matailor1234/video/7698599380814761223',
    embedUrl: 'https://www.tiktok.com/embed/v2/7698599380814761223',
    platform: 'tiktok',
  },
  {
    title: 'Your Fabric, Our Perfect Stitching',
    url: 'https://www.tiktok.com/@matailor1234/video/7702149826703592712',
    embedUrl: 'https://www.tiktok.com/embed/v2/7702149826703592712',
    platform: 'tiktok',
  },
  {
    title: 'Ladies & Kids Wear — Stitching Promo',
    url: 'https://www.tiktok.com/@matailor1234/video/7704562075045072146',
    embedUrl: 'https://www.tiktok.com/embed/v2/7704562075045072146',
    platform: 'tiktok',
  },
  {
    title: 'MA Tailor Stitching Promo',
    url: 'https://www.tiktok.com/@matailor1234/video/7706781385318485256',
    embedUrl: 'https://www.tiktok.com/embed/v2/7706781385318485256',
    platform: 'tiktok',
  },
  {
    title: 'International Orders — Pakistani Fits',
    url: 'https://www.tiktok.com/@matailor1234/video/7698599938669792520',
    embedUrl: 'https://www.tiktok.com/embed/v2/7698599938669792520',
    platform: 'tiktok',
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
                  title={`${reel.title} — Watch on ${reel.platform === 'tiktok' ? 'TikTok' : 'Facebook'}`}
                >
                  {reel.embedUrl ? (
                    <iframe
                      src={reel.embedUrl}
                      title={reel.title}
                      className="absolute inset-0 w-full h-full border-0"
                      scrolling="no"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  ) : (
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1a1a1a]">
                      <span className="bg-gold text-black p-4 rounded-full shadow-lg">
                        <Play className="h-8 w-8" />
                      </span>
                      <span className="text-gray-300 font-montserrat text-sm px-4 text-center">
                        Watch this reel on Facebook
                      </span>
                    </span>
                  )}
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
                    Watch on {reel.platform === 'tiktok' ? 'TikTok' : 'Facebook'}
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
