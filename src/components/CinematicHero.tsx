interface HeroCopyProps {
  title: string;
  description: string | null;
  button1_text: string | null;
  button1_link: string | null;
  button2_text: string | null;
  button2_link: string | null;
}

/**
 * Static hero (owner's choice, 17 Nov 2026): the database slides in
 * `hero_section` are intentionally ignored — the old carousel kept
 * replacing this hero after every load. Single fixed slide, vertically
 * centred copy so it is never clipped by the sticky mobile bottom nav.
 */
const HeroCopy = ({ title, description, button1_text, button1_link, button2_text, button2_link }: HeroCopyProps) => (
  <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 text-left">
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
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#0d0d0d] mt-20 sm:mt-24 md:mt-32 lg:mt-36 h-[55vh] min-h-[340px] sm:h-[70vh] sm:min-h-[480px] md:h-[80vh] md:min-h-[560px] lg:h-[92vh] lg:min-h-[640px]"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://nqbvlbtvmesjhgstznhe.supabase.co/storage/v1/object/public/admin-images/hero_section/1794083891058-Mayoon%20Wedding%20Stitching%20Elegance.png"
          alt="Your Style, Our Stitching"
          className="w-full h-full object-cover object-center animate-ken-burns"
          fetchPriority="high"
          loading="eager"
        />
        {/* stronger bottom vignette for headline legibility */}
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
    </section>
  );
};

export default CinematicHero;
