import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export interface FaqItem { q: string; a: string }
export interface InternalLink { label: string; to: string; description?: string }
export interface Testimonial { name: string; location?: string; text: string; rating?: number }
export interface GalleryImage { src: string; alt: string; caption?: string }

export interface SeoLandingPageProps {
  slug: string;
  title: string;
  metaDescription: string;
  metaKeywords?: string;
  h1: string;
  intro: string;
  highlights: string[];
  sections: { heading: string; body: string }[];
  faqs: FaqItem[];
  serviceName: string;
  heroImage?: GalleryImage;
  images?: GalleryImage[];
  testimonials?: Testimonial[];
  relatedReads?: InternalLink[];
  relatedServices?: InternalLink[];
}

const SeoLandingPage = ({
  slug, title, metaDescription, metaKeywords, h1, intro, highlights, sections, faqs, serviceName,
  heroImage, images = [], testimonials = [],
  relatedReads = [], relatedServices = [],
}: SeoLandingPageProps) => {
  const url = `https://matailor.lovable.app/${slug}`;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://matailor.lovable.app/' },
      { '@type': 'ListItem', position: 2, name: h1, item: url },
    ],
  };

  const allImages = [
    ...(heroImage ? [heroImage] : []),
    ...images,
  ];

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    serviceType: serviceName,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Ma Tailor',
      url: 'https://matailor.lovable.app',
      telephone: '+92-307-0125273',
      address: { '@type': 'PostalAddress', addressCountry: 'PK', addressRegion: 'Punjab' },
    },
    areaServed: ['Pakistan', 'United States', 'United Kingdom', 'Canada', 'United Arab Emirates'],
    description: metaDescription,
    url,
    ...(allImages.length && { image: allImages.map((i) => i.src) }),
  };

  const imageGalleryLd = allImages.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: `${serviceName} — Portfolio`,
        url,
        image: allImages.map((i) => i.src),
        associatedMedia: allImages.map((i) => ({
          '@type': 'ImageObject',
          contentUrl: i.src,
          url: i.src,
          name: i.alt || serviceName,
          description: i.caption || i.alt || serviceName,
          caption: i.caption || undefined,
          creditText: 'Ma Tailor',
          creator: { '@type': 'Organization', name: 'Ma Tailor' },
          copyrightNotice: '© Ma Tailor',
          license: url,
          acquireLicensePage: url,
        })),
      }
    : null;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        {heroImage?.src && <meta property="og:image" content={heroImage.src} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDescription} />
        {heroImage?.src && <meta name="twitter:image" content={heroImage.src} />}
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(service)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        {imageGalleryLd && (
          <script type="application/ld+json">{JSON.stringify(imageGalleryLd)}</script>
        )}
      </Helmet>

      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />

        <section className="pt-36 pb-12 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-6">{h1}</h1>
              <p className="text-base md:text-lg text-gray-300 mb-8">{intro}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link to="/booking"><Button className="bg-gold hover:bg-gold-dark text-black">Book Now</Button></Link>
                <Link to="/gallery"><Button variant="outline" className="text-gold border-gold hover:bg-gold hover:text-black">View Designs</Button></Link>
              </div>
            </div>
            {heroImage && (
              <div className="rounded-2xl overflow-hidden border border-gold/30 shadow-2xl">
                <img src={heroImage.src} alt={heroImage.alt} loading="eager" className="w-full h-full object-cover aspect-[4/5]" />
              </div>
            )}
          </div>
        </section>

        <section className="py-12 bg-black">
          <div className="container mx-auto px-4 max-w-4xl">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-200">
                  <Check className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-12 bg-gray-900">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            {sections.map((s, i) => (
              <article key={i}>
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-3">{s.heading}</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        {images.length > 0 && (
          <section className="py-12 bg-black">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-6 text-center">Recent Work</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, i) => (
                  <figure key={i} className="rounded-lg overflow-hidden border border-gray-800">
                    <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-56 object-cover" />
                    {img.caption && <figcaption className="text-xs text-gray-400 p-2">{img.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {testimonials.length > 0 && (
          <section className="py-12 bg-gray-900">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-6 text-center">What Our Clients Say</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {testimonials.map((t, i) => (
                  <blockquote key={i} className="p-5 rounded-lg border border-gold/30 bg-black/40">
                    <div className="text-gold mb-2">{'★'.repeat(t.rating ?? 5)}</div>
                    <p className="text-gray-200 italic mb-3">"{t.text}"</p>
                    <footer className="text-sm text-gray-400">— {t.name}{t.location ? `, ${t.location}` : ''}</footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        {relatedServices.length > 0 && (
          <section className="py-12 bg-black">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-6">Related Stitching Services</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedServices.map((l, i) => (
                  <li key={i}>
                    <Link to={l.to} className="block p-5 rounded-lg border border-gray-700 hover:border-gold/60 transition-colors">
                      <div className="flex items-center gap-2 text-white font-semibold">
                        {l.label} <ArrowRight className="h-4 w-4 text-gold" />
                      </div>
                      {l.description && <p className="text-sm text-gray-400 mt-1">{l.description}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {relatedReads.length > 0 && (
          <section className="py-12 bg-gray-900">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-6">Helpful Reads From Our Blog</h2>
              <ul className="space-y-3">
                {relatedReads.map((l, i) => (
                  <li key={i}>
                    <Link to={l.to} className="block p-4 rounded-lg border border-gray-700 hover:border-gold/60 transition-colors">
                      <div className="flex items-center gap-2 text-white font-semibold">
                        {l.label} <ArrowRight className="h-4 w-4 text-gold" />
                      </div>
                      {l.description && <p className="text-sm text-gray-400 mt-1">{l.description}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="py-12 bg-black">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-6 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-gray-700">
                  <AccordionTrigger className="text-left text-white hover:text-gold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-300 whitespace-pre-line leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Ready to Get Stitched?</h2>
            <p className="text-gray-300 mb-6">Order your custom outfit online or book a consultation with our master tailors.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/booking"><Button className="bg-gold hover:bg-gold-dark text-black">Book Appointment</Button></Link>
              <Link to="/contact"><Button variant="outline" className="text-gold border-gold hover:bg-gold hover:text-black">Contact Us</Button></Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default SeoLandingPage;
