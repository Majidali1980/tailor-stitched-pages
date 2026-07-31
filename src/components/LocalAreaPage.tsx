import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Check, ArrowRight, Truck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { KARACHI_AREAS, SITE_URL, STUDIO, type KarachiArea } from '@/data/karachiAreas';

const SERVICES = [
  'Shalwar kameez & everyday suit stitching',
  'Bridal, walima & mehndi outfit stitching',
  'Party wear, maxis, frocks & ghararas',
  'Abaya, kaftan & office wear stitching',
  'Alterations, resizing & fall picot',
  'Free pick & drop within Karachi (Rs. 350 outside range)',
];

const areaFaqs = (area: KarachiArea) => [
  {
    q: `Do you offer a ladies tailor service near me in ${area.name}?`,
    a: `Yes. Ma Tailor serves ${area.name} and the surrounding ${area.town} area from our stitching studio at ${STUDIO.street}, ${STUDIO.locality}. ${area.distance}. You can visit us for measurements, or book pick and drop and we will collect your fabric from your doorstep in ${area.name} and deliver the finished outfit back to you.`,
  },
  {
    q: `How do I get my fabric to you from ${area.name}?`,
    a: `Three options: drop it at our ${STUDIO.street} studio yourself, book our pick and drop rider (Rs. 350 charges apply for areas outside our free range), or courier it. Once we have your measurements on file, future orders only need the fabric — no repeat measurement visit.`,
  },
  {
    q: `How long does stitching take for customers in ${area.name}?`,
    a: 'Everyday shalwar kameez takes 7–10 working days. Party and formal wear takes 10–14 days. Bridal outfits need 3–4 weeks. Urgent orders can often be accommodated — message us on WhatsApp with your event date and we will confirm.',
  },
  {
    q: `Can I get measurements taken at home in ${area.name}?`,
    a: `For bridal and heavy formal orders we can arrange a measurement visit in ${area.name} by appointment. For regular stitching, you can send your existing well-fitting outfit with the fabric and we will match it exactly, or follow our measurement guide over WhatsApp.`,
  },
  {
    q: 'What are your charges and timings?',
    a: `Prices depend on the garment, cut and finishing, so we quote on request — send a picture on WhatsApp at ${STUDIO.phoneDisplay} for an exact quote. The studio is open Monday to Saturday, 11:00 AM to 9:00 PM.`,
  },
];

interface Props {
  area: KarachiArea;
}

const LocalAreaPage = ({ area }: Props) => {
  const url = `${SITE_URL}/tailor-near-me/${area.slug}`;
  const title = `Ladies Tailor Near Me in ${area.name}, Karachi | Ma Tailor`;
  const metaDescription = `Looking for a ladies tailor near you in ${area.name}, Karachi? Ma Tailor stitches shalwar kameez, bridal and party wear with free pick & drop. Call ${STUDIO.phoneDisplay}.`;
  const h1 = `Ladies Tailor Near Me in ${area.name}, Karachi`;
  const faqs = areaFaqs(area);

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(area.mapQuery)}&output=embed`;

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `${url}#localbusiness`,
    name: `${STUDIO.name} — Ladies Tailor ${area.name}`,
    legalName: STUDIO.legalName,
    description: metaDescription,
    url,
    telephone: STUDIO.phone,
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    priceRange: STUDIO.priceRange,
    currenciesAccepted: 'PKR',
    paymentAccepted: 'Cash, Bank Transfer, Easypaisa, JazzCash',
    address: {
      '@type': 'PostalAddress',
      streetAddress: STUDIO.street,
      addressLocality: STUDIO.locality,
      addressRegion: STUDIO.region,
      postalCode: STUDIO.postalCode,
      addressCountry: STUDIO.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: STUDIO.lat, longitude: STUDIO.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(area.mapQuery)}`,
    areaServed: [
      {
        '@type': 'Place',
        name: `${area.name}, Karachi`,
        geo: { '@type': 'GeoCoordinates', latitude: area.lat, longitude: area.lng },
      },
      { '@type': 'City', name: 'Karachi' },
    ],
    openingHoursSpecification: STUDIO.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    makesOffer: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s, areaServed: `${area.name}, Karachi` },
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Tailor Near Me', item: `${SITE_URL}/tailor-near-me` },
      { '@type': 'ListItem', position: 3, name: `${area.name}, Karachi`, item: url },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const nearby = KARACHI_AREAS.filter((a) => a.slug !== area.slug).slice(0, 6);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content={`tailor near me ${area.name}, ladies tailor ${area.name} Karachi, tailor shop near me ${area.name}, stitching near me ${area.name}, boutique tailor ${area.town} Karachi, shalwar kameez stitching ${area.name}, bridal tailor ${area.name} Karachi`}
        />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="business.business" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="geo.region" content="PK-SD" />
        <meta name="geo.placename" content={`${area.name}, Karachi`} />
        <meta name="geo.position" content={`${area.lat};${area.lng}`} />
        <meta name="ICBM" content={`${area.lat}, ${area.lng}`} />
        <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <Navbar />

      <article className="bg-background">
        {/* Hero */}
        <header className="border-b border-border/40 bg-card/40">
          <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
            <p className="text-gold font-montserrat text-xs md:text-sm uppercase tracking-[0.2em] mb-3">
              {area.town} · Karachi
            </p>
            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-4">{h1}</h1>
            <p className="font-montserrat text-base md:text-lg text-muted-foreground max-w-3xl mb-6">
              {area.blurb}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="min-h-[48px]">
                <Link to="/booking">Book stitching now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-[48px]">
                <a href={`https://wa.me/${STUDIO.phone.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp {STUDIO.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </header>

        {/* Address + map */}
        <section className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-5">
                Visit our stitching studio
              </h2>
              <address className="not-italic space-y-4 font-montserrat text-muted-foreground">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-foreground">{STUDIO.name}</strong>
                    <br />
                    {STUDIO.street}, {STUDIO.locality}
                    <br />
                    {STUDIO.region} {STUDIO.postalCode}, Pakistan
                  </span>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <a href={`tel:${STUDIO.phone}`} className="hover:text-gold transition-colors">
                    {STUDIO.phoneDisplay}
                  </a>
                </div>
                <div className="flex gap-3">
                  <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Monday – Saturday, 11:00 AM – 9:00 PM</span>
                </div>
                <div className="flex gap-3">
                  <Truck className="h-5 w-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    Serving {area.name} — {area.distance}. Pick &amp; drop available.
                  </span>
                </div>
              </address>

              <p className="font-montserrat text-sm text-muted-foreground mt-6">
                Close to {area.landmarks.slice(0, 3).join(', ')} and {area.landmarks[3] ?? area.town}.
              </p>
            </div>

            <div className="rounded-lg overflow-hidden border border-border/60 shadow-lg">
              <iframe
                src={mapSrc}
                title={`Map of ${area.name}, Karachi — area served by Ma Tailor`}
                width="100%"
                height="340"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="border-y border-border/40 bg-card/30">
          <div className="container mx-auto px-4 py-12 max-w-5xl">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-6">
              Stitching services available in {area.name}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s} className="flex gap-3 font-montserrat text-muted-foreground">
                  <Check className="h-5 w-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why local */}
        <section className="container mx-auto px-4 py-12 max-w-5xl space-y-8">
          <div>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-3">
              Why {area.name} customers choose Ma Tailor
            </h2>
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Finding a reliable ladies tailor near {area.name} usually means trial and error — outfits that come back
              too tight, sleeves that never sit right, and deadlines that slip past your event. Ma Tailor keeps a saved
              measurement profile for every customer, so once we get your fit right, every future order from {area.name}{' '}
              matches it exactly. You send the fabric, we handle the rest.
            </p>
          </div>
          <div>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-3">
              Pick and drop across {area.town}
            </h2>
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Our rider covers {area.name} and nearby points including {area.landmarks.join(', ')}. Book a collection on
              WhatsApp, hand over your fabric at your door, and we deliver the finished outfit back to the same address.
              Pick and drop is Rs. 350 for areas outside our free range — confirmed before we dispatch the rider.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="border-t border-border/40 bg-card/30">
          <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-6">
              {area.name} tailoring — frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-montserrat text-foreground">{f.q}</AccordionTrigger>
                  <AccordionContent className="font-montserrat text-muted-foreground whitespace-pre-line">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Nearby areas + related */}
        <section className="container mx-auto px-4 py-12 max-w-5xl">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-6">
            Other areas we serve in Karachi
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {nearby.map((a) => (
              <li key={a.slug}>
                <Link
                  to={`/tailor-near-me/${a.slug}`}
                  className="flex items-center gap-2 font-montserrat text-muted-foreground hover:text-gold transition-colors min-h-[44px]"
                >
                  <MapPin className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                  Ladies tailor in {a.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/tailor-near-me"
              className="inline-flex items-center gap-2 font-montserrat text-gold hover:underline min-h-[44px]"
            >
              All Karachi areas <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/shalwar-kameez-stitching"
              className="inline-flex items-center gap-2 font-montserrat text-gold hover:underline min-h-[44px]"
            >
              Shalwar kameez stitching <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/bridal-dress-stitching"
              className="inline-flex items-center gap-2 font-montserrat text-gold hover:underline min-h-[44px]"
            >
              Bridal dress stitching <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 font-montserrat text-gold hover:underline min-h-[44px]"
            >
              See our work <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </article>

      <Footer />
    </>
  );
};

export default LocalAreaPage;
