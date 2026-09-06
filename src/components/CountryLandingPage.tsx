import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Check, Truck, Ruler, CreditCard, MessageCircle, Clock, ArrowRight, Quote } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE_URL, STUDIO } from '@/data/karachiAreas';
import { COUNTRY_LIST, WHATSAPP_NUMBER, type CountryPage } from '@/data/countryPages';

interface Props {
  data: CountryPage;
}

const CountryLandingPage = ({ data }: Props) => {
  const url = `${SITE_URL}/${data.slug}`;
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Ma Tailor, I am in ${data.country} and would like to order custom stitching.`,
  )}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: data.h1,
    serviceType: 'Online custom stitching and tailoring',
    description: data.metaDescription,
    url,
    provider: {
      '@type': 'ClothingStore',
      name: STUDIO.name,
      telephone: STUDIO.phone,
      url: SITE_URL,
      image: `${SITE_URL}/logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: STUDIO.street,
        addressLocality: STUDIO.locality,
        addressRegion: STUDIO.region,
        postalCode: STUDIO.postalCode,
        addressCountry: STUDIO.country,
      },
    },
    areaServed: [
      { '@type': 'Country', name: data.country },
      ...data.cities.map((c) => ({ '@type': 'City', name: c })),
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${SITE_URL}/booking`,
      servicePhone: STUDIO.phone,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: data.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Online Tailor', item: `${SITE_URL}/pakistani-tailor-online` },
      { '@type': 'ListItem', position: 3, name: data.country, item: url },
    ],
  };

  const others = COUNTRY_LIST.filter((c) => c.slug !== data.slug);

  return (
    <>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <meta name="keywords" content={data.metaKeywords} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE_URL}/logo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.metaTitle} />
        <meta name="twitter:description" content={data.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />

        {/* Hero */}
        <section className="px-4 pt-10 pb-12 md:pt-16 md:pb-16 border-b border-gold/20">
          <div className="max-w-5xl mx-auto">
            <p className="text-gold text-xs md:text-sm tracking-wide uppercase mb-3">{data.heroKicker}</p>
            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-white leading-tight mb-4">{data.h1}</h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">{data.intro}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="min-h-[48px] bg-gold text-black hover:bg-gold/90 font-semibold">
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp us from {data.country}
                </a>
              </Button>
              <Button asChild variant="outline" className="min-h-[48px] border-gold text-gold hover:bg-gold hover:text-black">
                <Link to="/booking">
                  Start an order <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Delivery terms */}
        <section className="px-4 py-12 border-b border-gold/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-2xl md:text-3xl text-gold mb-6">
              How your order reaches you in {data.country}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gold/20 bg-white/5 p-5">
                <Truck className="h-6 w-6 text-gold mb-2" />
                <h3 className="font-semibold text-white mb-1">Courier chosen by you</h3>
                <p className="text-gray-300 text-sm">{data.delivery.courierChoice}</p>
              </div>
              <div className="rounded-xl border border-gold/20 bg-white/5 p-5">
                <CreditCard className="h-6 w-6 text-gold mb-2" />
                <h3 className="font-semibold text-white mb-1">Charges borne by the customer</h3>
                <p className="text-gray-300 text-sm">{data.delivery.charges}</p>
              </div>
              <div className="rounded-xl border border-gold/20 bg-white/5 p-5">
                <Check className="h-6 w-6 text-gold mb-2" />
                <h3 className="font-semibold text-white mb-1">Customs &amp; duty</h3>
                <p className="text-gray-300 text-sm">{data.delivery.customs}</p>
              </div>
              <div className="rounded-xl border border-gold/20 bg-white/5 p-5">
                <Clock className="h-6 w-6 text-gold mb-2" />
                <h3 className="font-semibold text-white mb-1">Ready for hand-over</h3>
                <p className="text-gray-300 text-sm">{data.delivery.handover}</p>
              </div>
            </div>
          </div>
        </section>


        {/* Prices */}
        <section className="px-4 py-12 border-b border-gold/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-2xl md:text-3xl text-gold mb-2">
              Guide stitching prices in {data.currencyCode}
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              These figures are for your idea only, not a final quote. The price is discussed and confirmed once you
              share your stitching details (cut, lining, finishing and hand work) on WhatsApp. Stitching charges only —
              the fabric is yours.
            </p>

            <div className="overflow-x-auto rounded-xl border border-gold/20">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-gold">
                  <tr>
                    <th className="text-left p-3 font-semibold">Garment</th>
                    <th className="text-left p-3 font-semibold">From ({data.currencySymbol})</th>
                    <th className="text-left p-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {data.prices.map((p) => (
                    <tr key={p.item} className="border-t border-gold/10">
                      <td className="p-3 text-white">{p.item}</td>
                      <td className="p-3 text-gold whitespace-nowrap">{p.local}</td>
                      <td className="p-3 text-gray-300">{p.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-playfair text-xl text-gold mb-2">Ways to pay</h3>
                <ul className="space-y-2">
                  {data.payments.map((p) => (
                    <li key={p} className="flex gap-2 text-gray-300 text-sm">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-playfair text-xl text-gold mb-2 flex items-center gap-2">
                  <Ruler className="h-5 w-5" /> Sending measurements from {data.country}
                </h3>
                <ol className="space-y-2 list-decimal list-inside text-gray-300 text-sm">
                  {data.measurement.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Country-specific sections */}
        <section className="px-4 py-12 border-b border-gold/10">
          <div className="max-w-5xl mx-auto space-y-8">
            {data.sections.map((s) => (
              <article key={s.heading}>
                <h2 className="font-playfair text-2xl md:text-3xl text-gold mb-3">{s.heading}</h2>
                <p className="text-gray-300 leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 py-12 border-b border-gold/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-2xl md:text-3xl text-gold mb-6">
              What our {data.demonym} customers say
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {data.testimonials.map((t) => (
                <blockquote key={t.name} className="rounded-xl border border-gold/20 bg-white/5 p-5">
                  <Quote className="h-5 w-5 text-gold mb-2" />
                  <p className="text-gray-300 text-sm mb-3">{t.text}</p>
                  <footer className="text-gold text-sm font-semibold">
                    {t.name} <span className="text-gray-400 font-normal">— {t.city}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Cities served */}
        <section className="px-4 py-12 border-b border-gold/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-2xl md:text-3xl text-gold mb-4">Cities we deliver to in {data.country}</h2>
            <div className="flex flex-wrap gap-2">
              {data.cities.map((c) => (
                <span key={c} className="rounded-full border border-gold/30 px-3 py-1 text-sm text-gray-300">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="px-4 py-12 border-b border-gold/10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-playfair text-2xl md:text-3xl text-gold mb-6">
              Frequently asked questions — ordering from {data.country}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {data.faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="border-gold/20">
                  <AccordionTrigger className="text-left text-white hover:text-gold min-h-[48px]">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-300">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Internal links */}
        <section className="px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-2xl text-gold mb-4">Order from other countries</h2>
            <div className="flex flex-wrap gap-3 mb-8">
              {others.map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.slug}`}
                  className="rounded-full border border-gold/30 px-4 py-2 text-sm text-gray-300 hover:text-gold hover:border-gold transition-colors min-h-[44px] inline-flex items-center"
                >
                  Online tailor for {c.country}
                </Link>
              ))}
              <Link
                to="/pakistani-tailor-online"
                className="rounded-full border border-gold/30 px-4 py-2 text-sm text-gray-300 hover:text-gold hover:border-gold transition-colors min-h-[44px] inline-flex items-center"
              >
                Pakistani tailor online
              </Link>
            </div>
            <div className="rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 to-transparent p-6 text-center">
              <h2 className="font-playfair text-2xl text-white mb-2">Ready to get stitched from {data.country}?</h2>
              <p className="text-gray-300 text-sm mb-5">
                Send us a picture of the design and your measurements on WhatsApp — we reply within a few hours,
                Karachi time.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="min-h-[48px] bg-gold text-black hover:bg-gold/90 font-semibold">
                  <a href={waLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="min-h-[48px] border-gold text-gold hover:bg-gold hover:text-black">
                  <Link to="/booking">Book online</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CountryLandingPage;
