import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface HeroSlide {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  image_width: number | null;
  image_height: number | null;
  object_fit: string | null;
  button1_text: string | null;
  button1_link: string | null;
  button2_text: string | null;
  button2_link: string | null;
}

const ROTATION_MS = 6000;

const CinematicHero = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('hero_section')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });
      if (data && data.length) setSlides(data);
    })();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setCurrent((i) => (i + 1) % slides.length), ROTATION_MS);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#0d0d0d] mt-16 sm:mt-20"
    >
      <div className="absolute inset-0 z-0">
        {slides.length === 0 && (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]" />
        )}
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={i !== current}
          >
            {s.video_url ? (
              <video
                src={s.video_url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : s.image_url ? (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={s.image_url}
                  alt={s.title}
                  width={s.image_width ?? undefined}
                  height={s.image_height ?? undefined}
                  style={{
                    objectFit: (s.object_fit as React.CSSProperties['objectFit']) || 'cover',
                    aspectRatio:
                      s.image_width && s.image_height
                        ? `${s.image_width} / ${s.image_height}`
                        : undefined,
                  }}
                  className={`w-full h-full max-w-full max-h-full ${i === current ? 'animate-ken-burns' : ''}`}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>

            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]" />
            )}
            {/* subtle bottom vignette only, so image stays visible */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d0d0d]/80 to-transparent" />

            {(s.button1_text || s.button2_text) && (
              <div className="absolute inset-x-0 bottom-14 sm:bottom-20 z-10 flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
                {s.button1_text && s.button1_link && (
                  <a
                    href={s.button1_link}
                    target={s.button1_link.startsWith('http') ? '_blank' : undefined}
                    rel={s.button1_link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 bg-[#c9a84c] hover:bg-[#b89540] text-black font-montserrat font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    {s.button1_text}
                  </a>
                )}
                {s.button2_text && s.button2_link && (
                  <a
                    href={s.button2_link}
                    target={s.button2_link.startsWith('http') ? '_blank' : undefined}
                    rel={s.button2_link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black font-montserrat font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-black/30"
                  >
                    {s.button2_text}
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 sm:gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-[2px] transition-all duration-500 ${
                i === current ? 'w-8 sm:w-10 bg-[#c9a84c]' : 'w-4 sm:w-5 bg-[#c9a84c]/30 hover:bg-[#c9a84c]/60'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CinematicHero;
