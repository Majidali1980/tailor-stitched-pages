import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface DigitalServicesBannerProps {
  variant?: 'wide' | 'compact';
}

const DigitalServicesBanner = ({ variant = 'wide' }: DigitalServicesBannerProps) => {
  if (variant === 'compact') {
    return (
      <section className="w-full py-4">
        <div className="container mx-auto px-4">
          <Link
            to="/digital-services"
            className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-gold/40 bg-gradient-to-r from-black via-[#141414] to-black px-6 py-5 hover:border-gold transition-colors"
          >
            <p className="font-montserrat text-sm sm:text-base text-white text-center sm:text-left">
              <span className="text-gold font-semibold">Need a website or social media content?</span>{' '}
              Reels, TikTok hooks, captions, hashtags & promo designs — done for you.
            </p>
            <span className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-3 font-montserrat font-semibold text-black min-h-[48px]">
              View Services <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-6">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-[#1a1a1a] via-black to-[#1a1a1a] p-6 md:p-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1 font-montserrat text-xs uppercase tracking-widest text-gold mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Digital Growth Studio
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3">
            Website Development & Social Media Content
          </h2>
          <p className="font-montserrat text-gray-300 max-w-2xl mx-auto mb-4">
            We build fast, SEO-ready websites and produce scroll-stopping content — reels, TikTok videos,
            promotional images, hooks, captions and hashtag sets that actually grow your brand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/digital-services"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-7 py-3 font-montserrat font-semibold text-black min-h-[48px] hover:bg-gold-light transition-colors"
            >
              Explore Services <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/923343233883"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-gold px-7 py-3 font-montserrat font-semibold text-gold min-h-[48px] hover:bg-gold hover:text-black transition-colors"
            >
              WhatsApp +92 334 3233883
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalServicesBanner;
