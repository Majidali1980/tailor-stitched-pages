import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesComponent from '@/components/Services';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, Clock, Scissors, Ruler, Truck } from 'lucide-react';
import { serviceLandingPages } from '@/data/serviceLandingPages';
import { supabase } from '@/integrations/supabase/client';
import { STUDIO, KARACHI_AREAS, SITE_URL } from '@/data/karachiAreas';

const FAQS = [
  {
    q: 'What does your tailor shop actually do?',
    a: 'Ma Tailor is a ladies tailor shop in Karachi offering custom stitching, bridal and party wear, shalwar kameez, abaya, blouse and kids stitching, plus alterations and bulk orders. Every order is cut to your own measurements — no ready-made sizing.',
  },
  {
    q: 'Where is your tailor shop located?',
    a: `Our stitching shop is at ${STUDIO.street}, ${STUDIO.locality}, ${STUDIO.region}. We serve DHA, Clifton, Gulshan-e-Iqbal, Bahadurabad, PECHS, North Nazimabad and the rest of Karachi with pick & drop.`,
  },
  {
    q: 'How do I find a good tailor shop near me in Karachi?',
    a: 'Check fit guarantees, turnaround time, and real customer work. Ma Tailor offers a perfect-fit guarantee, photos of past orders in the gallery, and free re-fitting if the stitching needs adjustment. You can also browse our area pages to see the nearest coverage to you.',
  },
  {
    q: 'How long does stitching take at your shop?',
    a: 'Standard stitching takes 5–7 days. Express service delivers in 24–48 hours for an added charge, and bridal work is booked 3–4 weeks in advance because of the hand embroidery involved.',
  },
  {
    q: 'Do you offer pick and drop instead of visiting the shop?',
    a: 'Yes. Pick & drop across Karachi is Rs. 350 flat. You can also order online from the USA, UK, Canada or UAE by sending your measurements on WhatsApp — we stitch and ship.',
  },
  {
    q: 'How much does stitching cost at your tailor shop?',
    a: 'Pricing depends on the design, fabric and hand-work involved, so we quote on request. Send a picture of the design on WhatsApp at ' + STUDIO.phoneDisplay + ' and you get a firm quote the same day.',
  },
];

const HIGHLIGHTS = [
  { icon: Ruler, title: 'Measurement-first stitching', text: 'Every garment is cut to your own body measurements with a perfect-fit guarantee and free re-fitting.' },
  { icon: Scissors, title: 'All stitching under one roof', text: 'Bridal, party wear, shalwar kameez, abaya, blouse, kids wear, alterations and bulk orders — one shop, one standard.' },
  { icon: Truck, title: 'Pick & drop + online orders', text: 'Rs. 350 flat pick & drop across Karachi, and worldwide shipping for overseas customers.' },
];

const Services = () => {
  const [dbPages, setDbPages] = useState<{ slug: string; service_name: string | null; intro: string | null; hero_image_url: string | null; hero_image_alt: string | null }[] | null>(null);

  useEffect(() => {
    supabase
      .from('service_pages')
      .select('slug,service_name,intro,hero_image_url,hero_image_alt,display_order,is_active')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .then(({ data }) => setDbPages((data as any) ?? []));
  }, []);

  const entries = (() => {
    if (!dbPages || dbPages.length === 0) {
      return Object.entries(serviceLandingPages).map(([slug, cfg]) => ({
        slug,
        name: cfg.serviceName,
        intro: cfg.intro,
        image: cfg.heroImage?.src,
        imageAlt: cfg.heroImage?.alt,
      }));
    }
    return dbPages.map((r) => {
      const fb = serviceLandingPages[r.slug];
      return {
        slug: r.slug,
        name: r.service_name || fb?.serviceName || r.slug,
        intro: r.intro || fb?.intro || '',
        image: r.hero_image_url || fb?.heroImage?.src,
        imageAlt: r.hero_image_alt || fb?.heroImage?.alt,
      };
    });
  })();

  const pageUrl = `${SITE_URL}/services`;
  const metaTitle = 'Tailoring Services in Karachi | Ladies & Gents Stitching - MA Tailor';
  const metaDescription =
    'Ladies and gents stitching, bridal wear and alterations in Karachi from MA Tailor. Perfect fit, home pickup and drop across the city. Get a free quote on WhatsApp.';

  const shopLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `${pageUrl}#shop`,
    name: 'Ma Tailor — Tailor Shop in Karachi',
    alternateName: ['Ma Tailor Stitching Shop', 'Ladies Tailor Shop Karachi'],
    description: metaDescription,
    url: pageUrl,
    telephone: STUDIO.phone,
    priceRange: STUDIO.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: STUDIO.street,
      addressLocality: STUDIO.locality,
      addressRegion: STUDIO.region,
      postalCode: STUDIO.postalCode,
      addressCountry: STUDIO.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: STUDIO.lat, longitude: STUDIO.lng },
    openingHoursSpecification: STUDIO.openingHours.map((o) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: o.days,
      opens: o.opens,
      closes: o.closes,
    })),
    areaServed: [
      ...KARACHI_AREAS.map((a) => ({ '@type': 'Place', name: `${a.name}, Karachi` })),
      { '@type': 'Country', name: 'Pakistan' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${STUDIO.lat},${STUDIO.lng}`,
    currenciesAccepted: 'PKR',
    paymentAccepted: 'Cash, Bank Transfer, JazzCash, EasyPaisa',
    knowsAbout: [
      'tailor shop',
      'ladies tailor shop near me',
      'custom stitching',
      'bridal dress stitching',
      'shalwar kameez stitching',
      'dress alterations',
    ],
    makesOffer: entries.map((e) => ({
      '@type': 'Offer',
      itemOffered: { '@id': `${SITE_URL}/services/${e.slug}#service` },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tailor shop services in Karachi',
      itemListElement: entries.map((e) => ({
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'PKR',
          valueAddedTaxIncluded: true,
        },
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/services/${e.slug}`,
        itemOffered: { '@id': `${SITE_URL}/services/${e.slug}#service` },
      })),
    },
  };

  // One detailed Service node per stitching category, each tied to the shop
  // and to every Karachi area we cover — strong "tailor shop near me" signal.
  const serviceNodes = entries.map((e) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${e.slug}#service`,
    name: e.name,
    serviceType: e.name,
    category: 'Tailoring & Stitching',
    url: `${SITE_URL}/services/${e.slug}`,
    description: e.intro || `${e.name} at Ma Tailor, a ladies tailor shop in Karachi.`,
    ...(e.image && { image: e.image }),
    provider: { '@id': `${pageUrl}#shop` },
    areaServed: [
      ...KARACHI_AREAS.map((a) => ({
        '@type': 'Place',
        name: `${a.name}, Karachi`,
        url: `${SITE_URL}/tailor-near-me/${a.slug}`,
      })),
      { '@type': 'City', name: 'Karachi' },
      { '@type': 'Country', name: 'Pakistan' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    availableChannel: [
      {
        '@type': 'ServiceChannel',
        name: 'Visit the shop',
        serviceLocation: { '@id': `${pageUrl}#shop` },
      },
      {
        '@type': 'ServiceChannel',
        name: 'Pick & drop / online order',
        serviceUrl: `${SITE_URL}/booking`,
        availableLanguage: ['en', 'ur'],
      },
    ],
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/services/${e.slug}`,
      priceCurrency: 'PKR',
      availability: 'https://schema.org/InStock',
      areaServed: { '@type': 'City', name: 'Karachi' },
    },
  }));

  const serviceGraphLd = { '@context': 'https://schema.org', '@graph': serviceNodes.map(({ ['@context']: _c, ...n }) => n) };

  // Explicit service-area list so search engines can map each suburb page
  const areaListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Karachi areas served by our tailor shop',
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: KARACHI_AREAS.length,
    itemListElement: KARACHI_AREAS.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Tailor shop near ${a.name}, Karachi`,
      url: `${SITE_URL}/tailor-near-me/${a.slug}`,
      item: {
        '@type': 'Place',
        name: `${a.name}, Karachi`,
        url: `${SITE_URL}/tailor-near-me/${a.slug}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Karachi',
          addressRegion: STUDIO.region,
          addressCountry: STUDIO.country,
        },
      },
    })),
  };

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Stitching services at our tailor shop',
    numberOfItems: entries.length,
    itemListElement: entries.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/services/${e.slug}`,
      name: e.name,
      item: { '@id': `${SITE_URL}/services/${e.slug}#service` },
      ...(e.image && {
        image: {
          '@type': 'ImageObject',
          contentUrl: e.image,
          url: e.image,
          name: e.imageAlt || e.name,
          description: e.intro || e.name,
          creditText: 'Ma Tailor',
        },
      }),
    })),
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };


  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content="tailor shop, tailor shop near me, ladies tailor shop Karachi, stitching shop Karachi, tailoring shop Pakistan, female tailor near me, custom stitching services, dress alterations Karachi, online tailor shop"
        />
        <link rel="canonical" href={pageUrl} />
        <meta name="geo.region" content="PK-SD" />
        <meta name="geo.placename" content="Karachi" />
        <meta name="geo.position" content={`${STUDIO.lat};${STUDIO.lng}`} />
        <meta name="ICBM" content={`${STUDIO.lat}, ${STUDIO.lng}`} />

        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />

        <script type="application/ld+json">{JSON.stringify(shopLd)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListLd)}</script>
        <script type="application/ld+json">{JSON.stringify(areaListLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceGraphLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />

        {/* Keyword-targeted intro */}
        <section className="pt-28 md:pt-32 pb-14 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-gold font-montserrat text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
              Mahmoodabad, Karachi · Pick &amp; Drop Citywide
            </p>
            <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-5 leading-tight">
              Our <span className="text-gold">Tailoring Services</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              From custom stitching to alterations and formal wear, Ma Tailor is a ladies tailor shop in Karachi
              where every dress is cut to your own measurements — bridal and party wear, shalwar kameez, abaya,
              blouse, kids stitching, and repairs. Visit the shop, book pick &amp; drop for Rs. 350, or order
              online from the USA, UK, Canada and UAE.
            </p>


            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center min-h-[48px] bg-gold hover:bg-gold-dark text-black px-7 rounded-full font-semibold transition-all hover:scale-105"
              >
                Book Your Stitching
              </Link>
              <Link
                to="/tailor-near-me"
                className="inline-flex items-center justify-center min-h-[48px] border border-gold/60 hover:border-gold text-gold px-7 rounded-full font-semibold transition-all"
              >
                Find a Tailor Near Me
              </Link>
            </div>

            <address className="not-italic mt-10 grid gap-3 sm:grid-cols-3 text-sm text-gray-300">
              <span className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                {STUDIO.street}, {STUDIO.locality}
              </span>
              <a href={`tel:${STUDIO.phone}`} className="flex items-center justify-center gap-2 hover:text-gold transition-colors">
                <Phone className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                {STUDIO.phoneDisplay}
              </a>
              <span className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                Mon – Sat, 11:00 AM – 9:00 PM
              </span>
            </address>
          </div>
        </section>

        {/* Why this shop */}
        <section className="py-14 bg-black">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold text-center mb-10">
              Why Customers Choose Our Stitching Shop
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="p-6 rounded-xl border border-gold/25 bg-gray-900/40">
                  <Icon className="h-6 w-6 text-gold mb-3" aria-hidden="true" />
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core service sections — one H2 each */}
        <section className="py-14 bg-black" aria-label="Our core tailoring services">
          <div className="container mx-auto px-4 max-w-4xl space-y-10">
            <article>
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-3">Custom Stitching</h2>
              <p className="text-gray-300 leading-relaxed">
                Every outfit is cut from scratch to your own measurements — shalwar kameez, maxis, ghararas,
                shararas, abayas, blouses and kids wear. Send us your fabric and a reference design, and our
                master tailors in Karachi handle the pattern, cutting, stitching and finishing with a
                perfect-fit guarantee and free re-fitting if anything needs adjusting.
              </p>
            </article>
            <article>
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-3">Alterations &amp; Repairs</h2>
              <p className="text-gray-300 leading-relaxed">
                Bring in a dress that no longer fits and we resize, reshape and repair it — taking in seams,
                shortening lengths, replacing zips and linings, and restoring embroidery. Most alterations are
                ready within 2–3 days, with express options and Rs. 350 pick &amp; drop anywhere in Karachi.
              </p>
            </article>
            <article>
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-3">Formal &amp; Occasion Wear</h2>
              <p className="text-gray-300 leading-relaxed">
                Bridal outfits, walima and mehndi dresses, party wear and formal suits are stitched with
                structured linings, hand-finished detailing and multiple fittings so the drape is right on the
                day. Bridal work is booked 3–4 weeks in advance because of the hand embroidery involved.
              </p>
            </article>
          </div>
        </section>

        <ServicesComponent />

        <section className="py-16 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gold mb-3">Every Stitching Service in Our Shop</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">Dedicated pages with pricing guidance, timelines, FAQs and past work for each stitching category.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {entries.map((e) => (
                <Link
                  key={e.slug}
                  to={`/services/${e.slug}`}
                  className="group block p-6 rounded-xl border border-gold/30 bg-black/50 hover:border-gold hover:bg-black/70 transition-all"
                >
                  <h3 className="text-lg font-semibold text-white group-hover:text-gold mb-2 flex items-center gap-2">
                    {e.name}
                    <ArrowRight className="h-4 w-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-400">{e.intro ? `${e.intro.slice(0, 120)}…` : ''}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Local coverage — internal links to the near-me cluster */}
        <section className="py-14 bg-black">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold text-center mb-3">
              Areas Our Tailor Shop Serves in Karachi
            </h2>
            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-8">
              Not close to Mahmoodabad? We collect and deliver across the city — pick your area to see local
              timings, landmarks and directions.
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {KARACHI_AREAS.map((a) => (
                <li key={a.slug}>
                  <Link
                    to={`/tailor-near-me/${a.slug}`}
                    className="inline-flex items-center min-h-[44px] px-4 rounded-full border border-gold/30 text-sm text-gray-200 hover:border-gold hover:text-gold transition-colors"
                  >
                    Tailor in {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold text-center mb-10">
              Tailor Shop FAQs
            </h2>
            <div className="space-y-4">
              {FAQS.map((f) => (
                <details key={f.q} className="group rounded-xl border border-gold/25 bg-black/50 p-5">
                  <summary className="cursor-pointer list-none font-semibold text-white group-open:text-gold flex items-start justify-between gap-4">
                    <h3 className="text-base font-semibold">{f.q}</h3>
                    <ArrowRight className="h-4 w-4 text-gold shrink-0 mt-1 transition-transform group-open:rotate-90" aria-hidden="true" />
                  </summary>
                  <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Services;
