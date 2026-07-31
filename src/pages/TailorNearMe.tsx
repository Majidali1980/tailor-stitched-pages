import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { KARACHI_AREAS, SITE_URL, STUDIO } from '@/data/karachiAreas';

const TailorNearMe = () => {
  const url = `${SITE_URL}/tailor-near-me`;
  const title = 'Tailor Near Me in Karachi – Ladies Stitching by Area | Ma Tailor';
  const metaDescription =
    'Looking for a ladies tailor near me in Karachi? Ma Tailor serves DHA, Clifton, Gulshan, North Nazimabad, PECHS, Malir and more with free pick & drop stitching.';

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${STUDIO.street}, ${STUDIO.locality}, ${STUDIO.region}, Pakistan`,
  )}&output=embed`;

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `${url}#localbusiness`,
    name: STUDIO.name,
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
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${STUDIO.street}, ${STUDIO.locality}`,
    )}`,
    areaServed: KARACHI_AREAS.map((a) => ({
      '@type': 'Place',
      name: `${a.name}, Karachi`,
      geo: { '@type': 'GeoCoordinates', latitude: a.lat, longitude: a.lng },
    })),
    openingHoursSpecification: STUDIO.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Tailor Near Me', item: url },
    ],
  };

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ladies tailor service areas in Karachi',
    itemListElement: KARACHI_AREAS.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Ladies tailor in ${a.name}, Karachi`,
      url: `${SITE_URL}/tailor-near-me/${a.slug}`,
    })),
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content="tailor near me, tailor shop near me, ladies tailor near me Karachi, stitching near me Karachi, best ladies tailor Karachi, boutique tailor near me, shalwar kameez stitching near me"
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
        <meta name="geo.placename" content="Karachi" />
        <meta name="geo.position" content={`${STUDIO.lat};${STUDIO.lng}`} />
        <meta name="ICBM" content={`${STUDIO.lat}, ${STUDIO.lng}`} />
        <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(itemList)}</script>
      </Helmet>

      <Navbar />

      <article className="bg-background">
        <header className="border-b border-border/40 bg-card/40">
          <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
            <p className="text-gold font-montserrat text-xs md:text-sm uppercase tracking-[0.2em] mb-3">
              Karachi · Sindh
            </p>
            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-4">
              Tailor Near Me – Ladies Stitching Across Karachi
            </h1>
            <p className="font-montserrat text-base md:text-lg text-muted-foreground max-w-3xl mb-6">
              Ma Tailor is a ladies stitching studio in Mahmoodabad No 04 serving every major Karachi neighbourhood.
              Pick your area below for local details, pick &amp; drop coverage and directions to our studio.
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

        <section className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-5">Our studio</h2>
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
              </address>
            </div>
            <div className="rounded-lg overflow-hidden border border-border/60 shadow-lg">
              <iframe
                src={mapSrc}
                title="Ma Tailor studio location — Mahmoodabad No 04, Karachi"
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

        <section className="border-t border-border/40 bg-card/30">
          <div className="container mx-auto px-4 py-12 max-w-5xl">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-6">
              Choose your area in Karachi
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {KARACHI_AREAS.map((a) => (
                <li key={a.slug}>
                  <Link
                    to={`/tailor-near-me/${a.slug}`}
                    className="block h-full rounded-lg border border-border/60 bg-background p-5 hover:border-gold transition-colors"
                  >
                    <span className="flex items-center gap-2 font-playfair text-lg font-semibold text-foreground mb-1">
                      <MapPin className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                      {a.name}
                    </span>
                    <span className="block font-montserrat text-xs uppercase tracking-wider text-gold mb-2">
                      {a.town}
                    </span>
                    <span className="block font-montserrat text-sm text-muted-foreground">{a.distance}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="flex flex-wrap gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-montserrat text-gold hover:underline min-h-[44px]"
            >
              All stitching services <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
              to="/contact"
              className="inline-flex items-center gap-2 font-montserrat text-gold hover:underline min-h-[44px]"
            >
              Contact us <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </article>

      <Footer />
    </>
  );
};

export default TailorNearMe;
