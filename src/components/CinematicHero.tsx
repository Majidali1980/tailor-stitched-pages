import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface HeroSlide {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  button1_text: string | null;
  button1_link: string | null;
  button2_text: string | null;
  button2_link: string | null;
}

const ROTATION_MS = 6000;

const CinematicHero = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('hero_section')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (data && data.length) setSlides(data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setCurrent((i) => (i + 1) % slides.length), ROTATION_MS);
    return () => clearInterval(t);
  }, [slides.length]);

  const active = slides[current];

  const renderCTA = (text: string | null, link: string | null, primary = true) => {
    if (!text || !link) return null;
    const cls = primary
      ? 'px-10 md:px-12 py-5 bg-[#c9a84c] text-[#0d0d0d] font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#f0d78c] transition-all duration-500 shadow-xl'
      : 'px-10 md:px-12 py-5 border border-[#c9a84c]/50 text-[#c9a84c] font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#c9a84c] hover:text-[#0d0d0d] transition-all duration-500 backdrop-blur-sm';
    const isExternal = /^https?:\/\//i.test(link);
    if (isExternal) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" className={cls}>
          {text}
        </a>
      );
    }
    return <Link to={link} className={cls}>{text}</Link>;
  };

  return (
    <section id="home" className="relative h-[92vh] min-h-[620px] w-full overflow-hidden bg-[#0d0d0d] text-[#f0d78c] pt-16">
      {/* Slide layer */}
      <div className="absolute inset-0 z-0">
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
                key={`${s.id}-${current === i}`}
                src={s.image_url}
                alt={s.title}
                className={`w-full h-full object-cover opacity-70 grayscale-[10%] ${
                  i === current ? 'animate-ken-burns' : ''
                }`}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/70 via-[#0d0d0d]/30 to-[#0d0d0d]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/60 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6 max-w-5xl mx-auto">
          <span className="block uppercase tracking-[0.5em] text-[10px] md:text-xs mb-6 md:mb-8 text-[#c9a84c] font-semibold">
            Exquisite Pakistani Stitching
          </span>
          {loading ? (
            <div className="h-24 md:h-40 flex items-center justify-center">
              <span className="text-[#c9a84c]/60 text-sm animate-pulse">Loading…</span>
            </div>
          ) : active ? (
            <div key={active.id} className="animate-slow-fade-in">
              <h1
                className="font-playfair text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] text-[#f0d78c] mb-8 leading-[0.95] drop-shadow-2xl"
              >
                {active.title}
              </h1>
              {active.description && (
                <p className="max-w-2xl mx-auto text-base md:text-lg text-white/70 font-light mb-10 leading-relaxed">
                  {active.description}
                </p>
              )}
              <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                {renderCTA(active.button1_text, active.button1_link, true)
                  ?? renderCTA('Start Your Design', '/booking', true)}
                {renderCTA(active.button2_text, active.button2_link, false)
                  ?? renderCTA('View Lookbook', '/gallery', false)}
              </div>
            </div>
          ) : (
            <div className="animate-slow-fade-in">
              <h1 className="font-playfair text-6xl md:text-9xl text-[#f0d78c] mb-8 leading-none">MA Tailor</h1>
              <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                {renderCTA('Start Your Design', '/booking', true)}
                {renderCTA('View Lookbook', '/gallery', false)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-[2px] transition-all duration-500 ${
                i === current ? 'w-10 bg-[#c9a84c]' : 'w-5 bg-[#c9a84c]/30 hover:bg-[#c9a84c]/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll cue */}
      <div className="absolute bottom-4 right-6 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#c9a84c]/60">Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#c9a84c] via-[#c9a84c]/40 to-transparent" />
      </div>
    </section>
  );
};

export default CinematicHero;
