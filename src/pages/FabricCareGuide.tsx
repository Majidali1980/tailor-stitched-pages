import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shirt, Droplets, Sun, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE_URL, STUDIO } from '@/data/karachiAreas';

const PAGE_URL = `${SITE_URL}/fabric-care-guide`;
const TITLE = 'Fabric Guide for Pakistani Suits — Choose & Care for Your Cloth | Ma Tailor';
const DESCRIPTION =
  'Which fabric suits your outfit and season? A tailor\u2019s guide to lawn, cotton, chiffon, organza, silk, karandi and net — with shrinkage, lining, stitching and washing advice.';

const FABRICS = [
  {
    name: 'Lawn',
    season: 'Summer (April–September)',
    bestFor: 'Everyday suits, office wear, printed 3-piece sets',
    stitching: 'Stitches cleanly with a fine needle; needs a proper hem, not an overlock edge.',
    care: 'Cold machine wash inside out, dry in shade. Expect 2–3% shrinkage on the first wash, so we pre-shrink lengths on request.',
  },
  {
    name: 'Cotton & cambric',
    season: 'Summer and spring',
    bestFor: 'Daily wear, school and office uniforms, kids clothing',
    stitching: 'Holds structure well; ideal for straight cuts, collars and pleats.',
    care: 'Warm wash, iron while slightly damp. Pure cotton shrinks the most — always wash before altering.',
  },
  {
    name: 'Chiffon',
    season: 'Party and evening wear, all seasons',
    bestFor: 'Formal shirts, dupattas, flowy maxis',
    stitching: 'Slippery — must be cut single-layer with tissue backing and always needs a lining.',
    care: 'Hand wash cold or dry clean. Never wring. Iron on low with a cloth between the iron and fabric.',
  },
  {
    name: 'Organza',
    season: 'Weddings, walima, mehndi',
    bestFor: 'Structured shirts, sleeves, dupattas, capes',
    stitching: 'Holds shape and flare beautifully but shows every seam, so French seams are used.',
    care: 'Dry clean only. Store rolled or hung, never folded, to avoid permanent creases.',
  },
  {
    name: 'Raw silk & jamawar',
    season: 'Winter formals and bridal',
    bestFor: 'Ghararas, shararas, bridal shirts, festive kurtis',
    stitching: 'Heavy and stiff — needs interlining at the neckline and a strong hem.',
    care: 'Dry clean only. Keep away from perfume and deodorant, which stain silk permanently.',
  },
  {
    name: 'Karandi, khaddar & linen',
    season: 'Winter (November–February)',
    bestFor: 'Warm daily suits, shawls, winter office wear',
    stitching: 'Thick weave; seams are pressed open so the outfit does not look bulky.',
    care: 'Machine wash cold, dry flat. Iron on medium; too much heat flattens the texture.',
  },
  {
    name: 'Net',
    season: 'Bridal and heavy formal',
    bestFor: 'Lehengas, dupattas, embroidered overlays',
    stitching: 'Always double-lined with silk or raw silk; hems are finished with horsehair braid for flare.',
    care: 'Dry clean only. Store flat in a muslin bag, never in plastic.',
  },
  {
    name: 'Jacquard & banarsi',
    season: 'Winter festive and Eid',
    bestFor: 'Kurtis, formal shirts, dupattas',
    stitching: 'Motif matching costs extra time — allow half a metre of extra fabric.',
    care: 'Dry clean. Iron on the reverse to protect the raised weave.',
  },
];

const LINING = [
  'Net, chiffon, organza and lace always need a lining — usually silk, malai or cotton depending on the season.',
  'For summer formals we recommend cotton or malai lining; it breathes far better than polyester silk.',
  'A separate inner shirt (not attached) makes the outfit easier to wash and lasts longer than a stitched lining.',
  'Light-coloured lawn over dark trousers can shadow — a skin-tone lining solves it.',
];

const WASH = [
  { icon: Droplets, title: 'First wash matters most', text: 'Wash new unstitched cloth separately in cold water with a mild detergent. Dark cottons and lawn bleed on the first two washes.' },
  { icon: Sun, title: 'Dry in the shade', text: 'Karachi sun fades printed lawn within a season. Dry inside out, in shade, on a flat surface for heavy pieces.' },
  { icon: Shirt, title: 'Store embroidery correctly', text: 'Fold heavy work outward-in with tissue between layers, keep it in muslin, and refold every few months so the creases move.' },
  { icon: Info, title: 'Alterations later', text: 'Ask us to keep an extra half inch in the side seams if you expect size changes; it costs nothing at stitching time and saves a remake later.' },
];

const FAQS = [
  {
    q: 'Which fabric is best for everyday shalwar kameez in Karachi?',
    a: 'Lawn and cambric for most of the year, and karandi or khaddar for December to February. Both wash easily and hold up to daily wear in Karachi humidity.',
  },
  {
    q: 'Does fabric shrink after stitching?',
    a: 'Pure cotton and lawn can shrink 2–3% on the first wash. If you are worried about length, ask us to pre-wash the fabric before cutting, or we keep an extra inch in the hem for later adjustment.',
  },
  {
    q: 'Do I have to add lining to my outfit?',
    a: 'Only for sheer fabrics — net, chiffon, organza, lace and light-coloured lawn. Lining is charged separately because it is effectively a second garment.',
  },
  {
    q: 'Can Ma Tailor buy the fabric for me?',
    a: `Yes. Tell us the colour, budget and occasion and we source from the Karachi cloth markets, then send you photos for approval before cutting. Message ${STUDIO.phoneDisplay} on WhatsApp to start.`,
  },
];

const FabricCareGuide = () => {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${PAGE_URL}#article`,
    headline: 'Fabric guide for Pakistani suits: choosing and caring for your cloth',
    description: DESCRIPTION,
    url: PAGE_URL,
    author: { '@type': 'Organization', name: 'Ma Tailor' },
    publisher: { '@type': 'Organization', name: 'Ma Tailor', url: SITE_URL },
    mainEntityOfPage: PAGE_URL,
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
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={PAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />

        <article>
          <header className="pt-28 md:pt-32 pb-12 bg-gradient-to-b from-gray-900 to-black">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <p className="text-gold text-xs tracking-[0.25em] uppercase mb-4">Free customer guide</p>
              <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-5 leading-tight">
                Fabric &amp; Care Guide for <span className="text-gold">Pakistani Suits</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                The cloth you choose decides how an outfit hangs, how long it lasts and how much stitching work it
                needs. Here is what our cutting table has taught us about the eight fabrics we handle most, plus
                lining rules, shrinkage numbers and washing advice for Karachi weather.
              </p>
            </div>
          </header>

          <section className="py-12 bg-black">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-8">
                Eight fabrics and what they are good for
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                {FABRICS.map((f) => (
                  <div key={f.name} className="p-6 rounded-xl border border-gold/20 bg-gray-900/40">
                    <h3 className="text-xl font-playfair font-bold text-gold mb-1">{f.name}</h3>
                    <p className="text-xs uppercase tracking-wide text-gray-400 mb-4">{f.season}</p>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-white font-medium">Best for</dt>
                        <dd className="text-gray-300">{f.bestFor}</dd>
                      </div>
                      <div>
                        <dt className="text-white font-medium">Stitching notes</dt>
                        <dd className="text-gray-300">{f.stitching}</dd>
                      </div>
                      <div>
                        <dt className="text-white font-medium">Care</dt>
                        <dd className="text-gray-300">{f.care}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-4 max-w-4xl grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gold mb-4">When you need lining</h2>
                <ul className="space-y-3">
                  {LINING.map((l) => (
                    <li key={l} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold mt-2 shrink-0" aria-hidden="true" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gold mb-4">Washing &amp; storage</h2>
                <div className="space-y-4">
                  {WASH.map(({ icon: Icon, title, text }) => (
                    <div key={title} className="flex gap-3">
                      <Icon className="h-5 w-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{title}</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 bg-black">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-8 text-center">
                Fabric FAQs
              </h2>
              <div className="space-y-5">
                {FAQS.map((f) => (
                  <div key={f.q} className="p-5 rounded-xl border border-gold/20 bg-gray-900/40">
                    <h3 className="font-semibold mb-2">{f.q}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link
                  to="/measurement-guide"
                  className="inline-flex items-center justify-center min-h-[48px] border border-gold/60 hover:border-gold text-gold px-7 rounded-full font-semibold transition-all"
                >
                  Read the Measurement Guide
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center min-h-[48px] bg-gold hover:bg-gold-dark text-black px-7 rounded-full font-semibold transition-all"
                >
                  See Our Services
                </Link>
              </div>
            </div>
          </section>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default FabricCareGuide;
