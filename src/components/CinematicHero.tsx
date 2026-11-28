import { useEffect, useState } from 'react';

/**
 * Hero (owner's choice, 17 Nov 2026): 3 HARDCODED image slides, no database
 * fetch — the Supabase `hero_section` slides are intentionally ignored (they
 * kept replacing the hero with the old carousel). NO text overlay at all:
 * the images already carry their own text. Only the two CTA buttons stay.
 * Images are object-cover, full-bleed width to width (owner's choice, 17 Nov
 * 2026 — top of the image is anchored (object-top, 20 Nov 2026) so the head/face stays
 * visible and only the hem crops on portrait images).
 */
const SLIDES = [
  {
    id: 'bridal',
    src: 'https://nqbvlbtvmesjhgstznhe.supabase.co/storage/v1/object/public/admin-images/hero_section/hero-mayoon.webp',
    alt: 'Bridal stitching by MA Tailor',
  },
  {
    id: 'eid',
    src: 'https://nqbvlbtvmesjhgstznhe.supabase.co/storage/v1/object/public/admin-images/hero_section/hero-gemini-1.webp',
    alt: 'Eid style tailoring by MA Tailor',
  },
  {
    id: 'pakistani-dress',
    src: 'https://nqbvlbtvmesjhgstznhe.supabase.co/storage/v1/object/public/admin-images/hero_section/hero-gemini-2.webp',
    alt: 'Online Pakistani dress tailor for ladies',
  },
];

const ROTATION_MS = 6000;

const CinematicHero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((i) => (i + 1) % SLIDES.length), ROTATION_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#0d0d0d] mt-20 sm:mt-24 md:mt-32 lg:mt-36 h-[55vh] min-h-[340px] sm:h-[65vh] sm:min-h-[420px] md:h-[70vh] md:min-h-[480px] lg:h-[78vh] lg:min-h-[540px]"
    >
      <div className="absolute inset-0 z-0">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={i !== current}
          >
            <img
              src={s.src}
              alt={s.alt}
              className="w-full h-full object-cover object-top"
              fetchPriority={i === 0 ? 'high' : 'auto'}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* CTA buttons only — no headline/subhead/eyebrow (the images carry their own text) */}
      <div className="absolute inset-x-0 bottom-24 z-10 px-6 sm:px-10 lg:px-16">
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <a
            href="/booking"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 bg-[#c9a84c] hover:bg-[#b89540] text-black font-montserrat font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Book a Tailor
          </a>
          <a
            href="https://wa.me/923070125273"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black font-montserrat font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-black/30"
          >
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* gold dot indicators */}
      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 sm:gap-3">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-[2px] transition-all duration-500 ${
              i === current ? 'w-8 sm:w-10 bg-[#c9a84c]' : 'w-4 sm:w-5 bg-[#c9a84c]/30 hover:bg-[#c9a84c]/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default CinematicHero;
