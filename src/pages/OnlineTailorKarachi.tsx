import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Ruler, Truck, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { STUDIO, KARACHI_AREAS, SITE_URL } from '@/data/karachiAreas';

const PAGE_URL = `${SITE_URL}/online-tailor-karachi`;
const TITLE = 'Online Tailor in Karachi — Book a Stitching Unit Near You';
const DESCRIPTION =
  'Looking for an online tailor or stitching unit near you? Ma Tailor offers doorstep measurements, custom stitching, and easy online booking in Karachi.';

const STEPS = [
  {
    icon: Ruler,
    title: 'Share your measurements',
    text: 'Send measurements on WhatsApp or book a free doorstep measurement visit anywhere in Karachi.',
  },
  {
    icon: Truck,
    title: 'We pick up your fabric',
    text: 'Rs. 350 flat pick & drop from your home or office — no need to search for a stitching unit near me.',
  },
  {
    icon: ShieldCheck,
    title: 'Fitted, checked, delivered',
    text: 'Your outfit is stitched, quality-checked and delivered back with a perfect-fit guarantee and free re-fitting.',
  },
];

const FAQS = [
  {
    q: 'How does an online tailor work?',
    a: 'You book online, share your measurements (or request a doorstep visit), and we collect the fabric, stitch the outfit and deliver it back. Everything is confirmed on WhatsApp so you never have to visit a shop.',
  },
  {
    q: 'Is there a stitching unit near me in Karachi?',
    a: `Our stitching unit is in ${STUDIO.street}, ${STUDIO.locality}, and we cover Mahmoodabad, DHA, Clifton, Baloch Colony, PECHS, Gulshan-e-Iqbal and the rest of Karachi with pick & drop.`,
  },
  {
    q: 'How long does online stitching take?',
    a: 'Standard stitching takes 5–7 days, express delivery is 24–48 hours for an added charge, and bridal outfits are booked 3–4 weeks ahead.',
  },
  {
    q: 'What does online tailoring cost?',
    a: `Pricing depends on design, fabric and hand-work, so we quote on request. Send the design on WhatsApp at ${STUDIO.phoneDisplay} and you get a firm quote the same day.`,
  },
];

const OnlineTailorKarachi = () => {
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${PAGE_URL}#service`,
    name: 'Online Tailor in Karachi',
    serviceType: 'Online tailoring and stitching unit',
    description: DESCRIPTION,
    url: PAGE_URL,
    provider: {
      '@type': 'LocalBusiness',
      name: 'MA Tailor',
      telephone: STUDIO.phone,
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: STUDIO.street,
        addressLocality: STUDIO.locality,
        addressRegion: STUDIO.region,
        addressCountry: STUDIO.country,
      },
      geo: { '@type': 'GeoCoordinates', latitude: STUDIO.lat, longitude: STUDIO.lng },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '10:00',
        closes: '21:00',
      }],
    },
    areaServed: KARACHI_AREAS.map((a) => ({
      '@type': 'Place',
      name: `${a.name}, Karachi`,
      url: `${SITE_URL}/tailor-near-me/${a.slug}`,
    })),
    availableChannel: {
      '@type': 'ServiceChannel',
      name: 'Online booking',
      serviceUrl: `${SITE_URL}/booking`,
      availableLanguage: ['en', 'ur'],
    },
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
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta
          name="keywords"
          content="online tailor, online tailor Karachi, stitching unit near me, stitching unit Karachi, online stitching service, doorstep tailor Karachi"
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="geo.region" content="PK-SD" />
        <meta name="geo.placename" content="Karachi" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />

        <section className="pt-28 md:pt-32 pb-14 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-gold text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
              Karachi · Doorstep Measurements · Pick &amp; Drop
            </p>
            <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-5 leading-tight">
              Your Trusted <span className="text-gold">Online Tailor</span> in Karachi
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Ma Tailor is an online tailor in Karachi for anyone searching for a stitching unit near me without
              leaving home. Book in a couple of taps, get doorstep measurements anywhere in Karachi, and have your
              fabric collected, stitched to your exact size and delivered back — custom stitching, alterations and
              formal wear from one trusted stitching unit.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center min-h-[48px] bg-gold hover:bg-gold-dark text-black px-7 rounded-full font-semibold transition-all hover:scale-105"
              >
                Book Online Now
              </Link>
              <a
                href={`https://wa.me/${STUDIO.phone.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[48px] border border-gold/60 hover:border-gold text-gold px-7 rounded-full font-semibold transition-all"
              >
                WhatsApp Your Design
              </a>
            </div>

            <address className="not-italic mt-10 grid gap-3 sm:grid-cols-3 text-sm text-gray-300">
              <span className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                {STUDIO.street}, {STUDIO.locality}
              </span>
              <a href={`tel:${STUDIO.phone}`} className="flex items-center justify-center gap-2 min-h-[44px] hover:text-gold transition-colors">
                <Phone className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                {STUDIO.phoneDisplay}
              </a>
              <span className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                Open daily, 10:00 AM – 9:00 PM
              </span>
            </address>
          </div>
        </section>

        <section className="py-14 bg-black">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold text-center mb-10">
              How Our Online Stitching Unit Works
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {STEPS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="p-6 rounded-xl border border-gold/25 bg-gray-900/40">
                  <Icon className="h-6 w-6 text-gold mb-3" aria-hidden="true" />
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold text-center mb-8">
              Stitching Unit Near You in Karachi
            </h2>
            <ul className="flex flex-wrap justify-center gap-2.5">
              {KARACHI_AREAS.map((a) => (
                <li key={a.slug}>
                  <Link
                    to={`/tailor-near-me/${a.slug}`}
                    className="inline-flex items-center min-h-[44px] px-4 rounded-full border border-gold/30 hover:border-gold hover:text-gold text-sm text-gray-200 transition-colors"
                  >
                    Tailor in {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 bg-black">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold text-center mb-8">
              Online Tailor FAQs
            </h2>
            <div className="space-y-5">
              {FAQS.map((f) => (
                <div key={f.q} className="p-5 rounded-xl border border-gold/20 bg-gray-900/40">
                  <h3 className="font-semibold mb-2">{f.q}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/services"
                className="inline-flex items-center justify-center min-h-[48px] bg-gold hover:bg-gold-dark text-black px-7 rounded-full font-semibold transition-all"
              >
                Explore All Tailoring Services
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default OnlineTailorKarachi;
