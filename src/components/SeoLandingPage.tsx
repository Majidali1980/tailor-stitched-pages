import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export interface FaqItem { q: string; a: string }

export interface SeoLandingPageProps {
  slug: string;
  title: string; // SEO meta title
  metaDescription: string;
  h1: string;
  intro: string;
  highlights: string[];
  sections: { heading: string; body: string }[];
  faqs: FaqItem[];
  serviceName: string;
}

const SeoLandingPage = ({
  slug, title, metaDescription, h1, intro, highlights, sections, faqs, serviceName,
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
  };

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
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(service)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />

        <section className="pt-36 pb-12 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-6">{h1}</h1>
            <p className="text-base md:text-lg text-gray-300 mb-8">{intro}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/booking"><Button className="bg-gold hover:bg-gold-dark text-black">Book Now</Button></Link>
              <Link to="/gallery"><Button variant="outline" className="text-gold border-gold hover:bg-gold hover:text-black">View Designs</Button></Link>
            </div>
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

        <section className="py-12 bg-black">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-6 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-gray-700">
                  <AccordionTrigger className="text-left text-white hover:text-gold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-300">{f.a}</AccordionContent>
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
