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
      className="relative w-full overflow-hidden bg-[#0d0d0d] pt-14 sm:pt-16 h-[55vh] min-h-[340px] sm:h-[70vh] sm:min-h-[480px] md:h-[80vh] md:min-h-[560px] lg:h-[92vh] lg:min-h-[640px]"
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
              <img
                src={s.image_url}
                alt={s.title}
                className={`w-full h-full object-cover ${i === current ? 'animate-ken-burns' : ''}`}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]" />
            )}
            {/* subtle bottom vignette only, so image stays visible */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d0d0d]/60 to-transparent" />
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
