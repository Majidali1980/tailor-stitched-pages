import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Scissors } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const WHATSAPP_URL = 'https://wa.me/923070125273?text=Hello%20MA%20Tailor%2C%20I%27d%20like%20to%20book%20a%20consultation.';

const BentoShowcase = () => {
  const [lookbookImage, setLookbookImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('ai_gallery')
        .select('image_url')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(1);
      if (data && data[0]?.image_url) setLookbookImage(data[0].image_url);
    })();
  }, []);

  return (
    <section className="w-full bg-[#0d0d0d] text-[#f0d78c]" style={{ fontFamily: 'Fira Sans, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 sm:gap-5 md:gap-6 md:h-[560px] lg:h-[620px]">



          {/* Services */}
          <div className="sm:col-span-2 md:col-span-2 md:row-span-1 group relative overflow-hidden bg-[#1a1a1a] border border-[#c9a84c]/20 rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-end min-h-[220px] sm:min-h-[240px] md:min-h-[260px]">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-25 transition-opacity duration-700">
              <svg className="w-24 h-24 text-[#c9a84c]" fill="none" stroke="currentColor" strokeWidth="0.5" viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-playfair mb-3 sm:mb-4 md:mb-5 text-[#f0d78c]">Master Tailoring</h3>
              <p className="text-sm md:text-base text-[#f0d78c]/60 leading-relaxed mb-6 md:mb-8 max-w-sm">
                Artisanal precision for bridal, formal, and pret collections. Every stitch preserves the legacy of Pakistani heritage.
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-3 text-[#c9a84c] text-xs font-bold uppercase tracking-widest border-b border-[#c9a84c]/30 pb-1 group-hover:gap-6 transition-all duration-300"
              >
                Discover Services <span>→</span>
              </Link>
            </div>
          </div>

          {/* AI Design Studio */}
          <div className="md:col-span-1 group relative overflow-hidden bg-gradient-to-br from-[#c9a84c] to-[#9c7d2e] border border-[#c9a84c]/20 rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] md:min-h-[260px]">
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-[#0d0d0d] text-[10px] uppercase tracking-widest mb-6 font-bold text-[#c9a84c]">
                Virtual Atelier
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair text-[#0d0d0d] leading-tight mb-3">
                AI Design Studio
              </h3>
              <p className="text-sm text-[#0d0d0d]/80 font-medium">
                Visualize your custom silhouette before the first cut.
              </p>
            </div>
            <Link
              to="/ai-design-studio"
              className="relative z-10 block text-center w-full py-4 bg-[#0d0d0d] text-[#c9a84c] text-[10px] uppercase tracking-widest font-bold mt-8 group-hover:bg-black transition-colors shadow-2xl"
            >
              Launch Studio
            </Link>
          </div>

          {/* Bespoke Quotes */}
          <div className="md:col-span-1 bg-[#151515] border border-[#c9a84c]/20 rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center group hover:border-[#c9a84c]/50 transition-colors min-h-[220px] sm:min-h-[240px] md:min-h-[260px]">
            <Scissors className="w-8 h-8 sm:w-10 sm:h-10 text-[#c9a84c] mb-3 sm:mb-4" strokeWidth={1.5} />
            <h3 className="text-sm sm:text-base md:text-lg font-semibold uppercase tracking-widest mb-3">Bespoke Quotes</h3>

            <p className="text-xs text-[#f0d78c]/50 mb-8">
              Every outfit is priced individually. Message us for a personalized quote.
            </p>
            <a
              href="https://wa.me/923070125273?text=Hello%20MA%20Tailor%2C%20I%27d%20like%20a%20stitching%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[#c9a84c] font-bold uppercase tracking-[0.3em] group-hover:text-[#f0d78c] transition-colors"
            >
              Request Quote →
            </a>
          </div>

          {/* Lookbook */}
          <Link
            to="/gallery"
            className="sm:col-span-2 md:col-span-2 group relative overflow-hidden bg-[#1a1a1a] border border-[#c9a84c]/20 rounded-2xl cursor-pointer min-h-[240px] sm:min-h-[260px] md:min-h-[280px] block"
          >
            {lookbookImage ? (
              <img
                src={lookbookImage}
                alt="Latest lookbook"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-[2000ms] ease-out"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-playfair mb-2 sm:mb-3 text-[#f0d78c]">The Lookbook</h3>

              <p className="text-sm text-[#f0d78c]/80 tracking-wide">
                Curated aesthetics for the modern Pakistani woman
              </p>
            </div>
          </Link>

          {/* Concierge / WhatsApp */}
          <div className="sm:col-span-2 md:col-span-2 bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] border border-[#c9a84c]/20 rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-playfair mb-2 sm:mb-3 md:mb-4 text-[#f0d78c]">Bespoke Concierge</h3>

              <p className="text-sm md:text-base text-[#f0d78c]/60 leading-relaxed">
                Consult with our master stylists for fabric selection and measurement guidance instantly.
              </p>
              <a
                href="tel:+923070125273"
                className="inline-flex items-center gap-2 mt-3 md:mt-4 text-sm md:text-base font-semibold text-[#c9a84c] hover:text-[#f0d78c] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.21l-2.02 1.01a11 11 0 005.4 5.4l1.01-2.02a1 1 0 011.21-.5l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z"/></svg>
                +92 307 0125273
              </a>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-5 px-6 md:px-10 py-6 md:py-8 bg-[#25d366]/5 hover:bg-[#25d366]/10 border border-[#25d366]/30 transition-all group rounded-sm"
            >
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-widest text-[#25d366]/70 mb-1">Available Now</span>
                <span className="block text-base md:text-lg font-bold text-[#25d366]">WhatsApp Booking</span>
              </div>
              <div className="w-12 h-12 bg-[#25d366] text-[#0d0d0d] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.463 3.488A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoShowcase;
