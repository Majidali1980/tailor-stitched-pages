import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import {
  Globe, Video, Image as ImageIcon, Hash, PenLine, Sparkles,
  Mail, Phone, ExternalLink, Check, MessageCircle,
} from 'lucide-react';

const Footer = lazy(() => import('@/components/Footer'));

const WHATSAPP = '923343233883';
const WHATSAPP_DISPLAY = '+92 334 3233883';
const EMAIL = 'alimajid03021980@gmail.com';
const PORTFOLIO = 'https://majidali.lovable.app/';

const SERVICES = [
  {
    icon: Globe,
    title: 'Website Development',
    text: 'Fast, mobile-first business websites with SEO setup, contact forms, WhatsApp booking and Google-friendly structure. Landing pages, portfolios and full multi-page sites.',
    points: ['Mobile-first responsive build', 'On-page SEO & sitemap', 'WhatsApp / form integration', 'Speed & Core Web Vitals tuning'],
  },
  {
    icon: PenLine,
    title: 'Social Media Content',
    text: 'A full monthly content plan for Instagram, Facebook and TikTok — post ideas, copywriting and a posting calendar tailored to your business and audience.',
    points: ['Monthly content calendar', 'Platform-specific copy', 'Brand tone & voice guide', 'Engagement-focused CTAs'],
  },
  {
    icon: ImageIcon,
    title: 'Social Posts with Images',
    text: 'Designed post graphics and carousels that match your brand colours and fonts — ready to upload in the correct size for every platform.',
    points: ['Feed posts & carousels', 'Story & reel covers', 'Brand-consistent templates', 'Export-ready sizes'],
  },
  {
    icon: Sparkles,
    title: 'Promotional Images',
    text: 'Sale banners, offer creatives, product highlights and ad visuals designed to convert — for organic posts or paid Meta and TikTok campaigns.',
    points: ['Offer & sale creatives', 'Ad-ready visuals', 'Product highlight graphics', 'Multiple size variants'],
  },
  {
    icon: Hash,
    title: 'Hooks, Hashtags & Captions',
    text: 'Scroll-stopping first lines, researched hashtag sets and captions written for TikTok and Reels so your content gets discovered, not buried.',
    points: ['3-second scroll-stopping hooks', 'Researched hashtag sets', 'Captions with clear CTAs', 'TikTok & Reels optimised'],
  },
  {
    icon: Video,
    title: 'Reels & TikTok Videos',
    text: 'End-to-end short-form video: scripting, shot list, editing, captions, transitions and trending audio — delivered ready to post.',
    points: ['Script & shot list', 'Editing with captions', 'Trending audio selection', 'Vertical 9:16 delivery'],
  },
];

const PROCESS = [
  { step: '01', title: 'Discovery call', text: 'Message on WhatsApp. We discuss your business, goals, audience and budget.' },
  { step: '02', title: 'Plan & quote', text: 'You receive a clear scope, timeline and fixed price — no hidden charges.' },
  { step: '03', title: 'Production', text: 'We build the website or produce the content batch, sharing previews as we go.' },
  { step: '04', title: 'Delivery & support', text: 'Final files handed over with revisions, plus ongoing monthly support if needed.' },
];

const FAQS = [
  { q: 'How long does a website take?', a: 'A single landing page takes 2–4 days. A full multi-page business website usually takes 7–14 days depending on content readiness and revisions.' },
  { q: 'Do you write the captions and hashtags too?', a: 'Yes. Every content package includes hooks, captions and researched hashtag sets written for the platform you are posting on — TikTok, Instagram Reels or Facebook.' },
  { q: 'Can you edit videos I already filmed?', a: 'Absolutely. Send your raw clips on WhatsApp and we handle editing, captions, transitions, trending audio and the final vertical export.' },
  { q: 'Do you work with clients outside Pakistan?', a: 'Yes. We work remotely with clients in the UK, USA, Canada and UAE. Everything is coordinated over WhatsApp and email.' },
  { q: 'How do I get started?', a: `Message ${WHATSAPP_DISPLAY} on WhatsApp or email ${EMAIL} with a short description of what you need. You get a reply and a quote the same day.` },
];

const DigitalServices = () => {
  const title = 'Website Development & Social Media Services Karachi | Majid Ali';
  const description = 'Professional website development and social media content services in Karachi. Custom websites, posts, reels, TikTok videos, promotional images, hooks, hashtags and captions. Get a same-day quote on WhatsApp.';
  const url = 'https://matailor.lovable.app/digital-services';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${url}#business`,
        name: 'Majid Ali — Web & Social Media Studio',
        description,
        url,
        telephone: `+${WHATSAPP}`,
        email: EMAIL,
        areaServed: ['Pakistan', 'United Kingdom', 'United States', 'Canada', 'United Arab Emirates'],
        sameAs: [PORTFOLIO],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Digital services',
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: s.text },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="website development Karachi, social media content creator, reels editing, tiktok video editing, promotional images design, hashtags and captions, social media manager Pakistan" />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="https://matailor.lovable.app/og-digital-services.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Website development and social media content services by Majid Ali in Karachi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://matailor.lovable.app/og-digital-services.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />

        {/* Hero */}
        <header className="relative overflow-hidden border-b border-gold/20 bg-gradient-to-br from-[#1a1a1a] via-black to-[#111]">
          <div className="container mx-auto px-4 py-16 md:py-24 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1 text-xs uppercase tracking-widest text-gold mb-5">
              <Sparkles className="h-3.5 w-3.5" /> Web & Social Media Studio
            </span>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-5">
              Website Development &{' '}
              <span className="text-gold">Social Media Content Services</span> in Karachi
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto mb-8">
              We design and develop websites, and create social media content — posts with images, promotional
              designs, hooks, hashtags, captions and reels for TikTok and Instagram. One team for your
              online presence, from build to daily posting.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi, I am interested in your website / social media services.')}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-7 py-3 font-semibold text-black min-h-[48px] hover:bg-gold-light transition-colors"
              >
                <Phone className="h-4 w-4" /> WhatsApp {WHATSAPP_DISPLAY}
              </a>
              <a
                href={PORTFOLIO} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gold px-7 py-3 font-semibold text-gold min-h-[48px] hover:bg-gold hover:text-black transition-colors"
              >
                View Portfolio <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        {/* Services */}
        <section className="py-16" aria-labelledby="services-heading">
          <div className="container mx-auto px-4">
            <h2 id="services-heading" className="font-playfair text-3xl md:text-4xl font-bold text-center text-gold mb-4">
              Our Services
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
              Pick a single service or combine them into a monthly package.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map(({ icon: Icon, title: t, text, points }) => (
                <article key={t} className="rounded-2xl border border-gold/20 bg-[#0d0d0d] p-6 hover:border-gold/60 transition-colors">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-white mb-2">{t}</h3>
                  <p className="text-sm text-gray-400 mb-4">{text}</p>
                  <ul className="space-y-2">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-gray-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {p}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-[#0b0b0b] border-y border-gold/10" aria-labelledby="process-heading">
          <div className="container mx-auto px-4">
            <h2 id="process-heading" className="font-playfair text-3xl md:text-4xl font-bold text-center text-gold mb-12">
              How We Work
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p) => (
                <div key={p.step} className="rounded-2xl border border-gold/20 bg-black p-6">
                  <span className="font-playfair text-3xl font-bold text-gold/40">{p.step}</span>
                  <h3 className="font-playfair text-lg font-bold text-white mt-2 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16" aria-labelledby="contact-heading" id="contact">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-2xl border border-gold/30 bg-gradient-to-br from-[#161616] to-black p-8 md:p-12 text-center">
              <h2 id="contact-heading" className="font-playfair text-3xl md:text-4xl font-bold text-gold mb-3">
                Get in Touch
              </h2>
              <p className="text-gray-300 mb-8">
                Tell us what you need and get a clear quote the same day.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-xl bg-gold px-6 py-4 font-semibold text-black min-h-[48px] hover:bg-gold-light transition-colors"
                >
                  <Phone className="h-5 w-5" /> {WHATSAPP_DISPLAY}
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center justify-center gap-3 rounded-xl border border-gold px-6 py-4 font-semibold text-gold min-h-[48px] hover:bg-gold hover:text-black transition-colors break-all"
                >
                  <Mail className="h-5 w-5 shrink-0" /> {EMAIL}
                </a>
              </div>
              <a
                href={PORTFOLIO} target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 text-gold hover:text-gold-light transition-colors"
              >
                majidali.lovable.app <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#0b0b0b] border-t border-gold/10" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4">
            <h2 id="faq-heading" className="font-playfair text-3xl md:text-4xl font-bold text-center text-gold mb-12">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto max-w-3xl space-y-4">
              {FAQS.map((f) => (
                <details key={f.q} className="group rounded-xl border border-gold/20 bg-black p-5">
                  <summary className="cursor-pointer list-none font-playfair text-lg font-semibold text-white marker:hidden">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm text-gray-400">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="min-h-[100px]" />}>
          <Footer />
        </Suspense>

        {/* Prominent WhatsApp CTA */}
        <a
          href={`https://wa.me/923343233883?text=${encodeURIComponent('Hi, I am interested in your website / social media services.')}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Majid Ali on WhatsApp"
          className="fixed right-4 bottom-24 z-[60] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-montserrat font-semibold text-black shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#128C7E] hover:text-white animate-bounce-slow"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">Chat on WhatsApp</span>
        </a>
      </div>
    </>
  );
};

export default DigitalServices;
