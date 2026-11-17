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

interface HeroCopyProps {
  title: string;
  description: string | null;
  button1_text: string | null;
  button1_link: string | null;
  button2_text: string | null;
  button2_link: string | null;
}

/** Left-aligned headline + subhead + CTAs over the slide, anchored above the dots. */
const HeroCopy = ({ title, description, button1_text, button1_link, button2_text, button2_link }: HeroCopyProps) => (
  <div className="absolute inset-x-0 bottom-24 z-10 px-6 sm:px-10 lg:px-16 text-left">
    <p className="text-[#c9a84c] text-[11px] sm:text-sm font-montserrat font-semibold tracking-[0.3em] mb-2 sm:mb-3">
      LADIES TAILOR — KARACHI
    </p>
    <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.05] max-w-3xl">
      {title}
    </h1>
    {description && (
      <p className="mt-3 sm:mt-4 text-white/80 text-sm sm:text-lg max-w-xl leading-relaxed">
        {description}
      </p>
    )}
    {(button1_text || button2_text) && (
      <div className="mt-5 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
        {button1_text && button1_link && (
          <a
            href={button1_link}
            target={button1_link.startsWith('http') ? '_blank' : undefined}
            rel={button1_link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 bg-[#c9a84c] hover:bg-[#b89540] text-black font-montserrat font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {button1_text}
          </a>
        )}
        {button2_text && button2_link && (
          <a
            href={button2_link}
            target={button2_link.startsWith('http') ? '_blank' : undefined}
            rel={button2_link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black font-montserrat font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-black/30"
          >
            {button2_text}
          </a>
        )}
      </div>
    )}
  </div>
);

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
      className="relative w-full overflow-hidden bg-[#0d0d0d] mt-20 sm:mt-24 md:mt-32 lg:mt-36 h-[55vh] min-h-[340px] sm:h-[70vh] sm:min-h-[480px] md:h-[80vh] md:min-h-[560px] lg:h-[92vh] lg:min-h-[640px]"
    >
      <div className="absolute inset-0 z-0">
        {slides.length === 0 && (
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <HeroCopy
              title="Your Style, Our Stitching"
              description="Custom ladies stitching, bridal wear and alterations — perfect fit, home pickup and drop. Book online or WhatsApp today."
              button1_text="Book a Tailor"
              button1_link="/booking"
              button2_text="WhatsApp Us"
              button2_link="https://wa.me/923070125273"
            />
          </div>
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
                    objectFit: (s.object_fit as React.CSSProperties['objectFit']) || 'contain',
                  }}
                  className={`w-full h-full max-w-full max-h-full ${i === current ? 'animate-ken-burns' : ''}`}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>

            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]" />
            )}
            {/* stronger bottom vignette for headline legibility */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            {(s.title || s.button1_text || s.button2_text) && (
              <HeroCopy
                title={s.title}
                description={s.description}
                button1_text={s.button1_text}
                button1_link={s.button1_link}
                button2_text={s.button2_text}
                button2_link={s.button2_link}
              />
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
