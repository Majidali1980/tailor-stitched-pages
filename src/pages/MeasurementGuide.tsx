import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Ruler, AlertTriangle, CheckCircle2, Scissors } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { STUDIO, SITE_URL } from '@/data/karachiAreas';

const PAGE_URL = `${SITE_URL}/measurement-guide`;
const TITLE = 'How to Measure Yourself for Stitching — Ladies Size Guide | Ma Tailor';
const DESCRIPTION =
  'Step-by-step guide to taking your own shalwar kameez measurements at home: 14 measurements explained, a printable chart, fabric quantity table and common fit mistakes.';

const STEPS = [
  {
    name: 'Wear a fitted outfit and stand naturally',
    text: 'Measure over a thin, well-fitting suit — never over a shawl, dupatta or loose kurta. Stand straight with your arms relaxed and feet together. Ask someone else to hold the tape if you can; self-measuring the back and shoulder is where most mistakes happen.',
  },
  {
    name: 'Use an inch tape, not a school ruler',
    text: 'A soft plastic or fibreglass inch tape gives accurate curves. Keep the tape snug against the body but never pulled tight — you should be able to slide one finger under it. Record everything in inches to one decimal place (for example 38.5).',
  },
  {
    name: 'Take the upper-body measurements',
    text: 'Shoulder (seam to seam across the back), chest/bust (fullest point), upper bust (just under the arms), waist (narrowest point, usually at the navel), and hip (fullest point of the seat).',
  },
  {
    name: 'Take the length measurements',
    text: 'Kameez length (from the shoulder-neck point straight down to where you want the hem), sleeve length (shoulder tip to wrist with the arm slightly bent), armhole (all the way around the arm at the shoulder joint) and neck depth front and back.',
  },
  {
    name: 'Take the trouser measurements',
    text: 'Trouser length (waist to ankle bone), waist, hip, thigh (fullest point), knee, and the paincha or ankle opening. For churidar, add the stretched length from waist to floor plus 4–6 inches for the gathers.',
  },
  {
    name: 'Cross-check against an outfit you already love',
    text: 'Lay a suit that fits you perfectly on a flat surface and measure it flat, then double the chest and waist. If your body numbers and your favourite outfit disagree by more than an inch, send us both — we will confirm the final cut on WhatsApp before cutting.',
  },
];

const MEASUREMENTS = [
  { name: 'Shoulder', how: 'Across the back, from one shoulder seam to the other', tip: 'Do not include the sleeve cap' },
  { name: 'Bust / Chest', how: 'Around the fullest part of the bust, tape level all round', tip: 'Keep the tape parallel to the floor' },
  { name: 'Upper bust', how: 'Just under the armpits, above the bust', tip: 'Gives a clean fit at the front yoke' },
  { name: 'Waist (kameez)', how: 'Narrowest part of the torso', tip: 'Usually 1 inch above the navel' },
  { name: 'Hip / Seat', how: 'Fullest part of the hips, about 8 inches below the waist', tip: 'Stand with feet together' },
  { name: 'Kameez length', how: 'Shoulder-neck point down to the desired hem', tip: 'Knee length is about 38–40 inches for 5\'4"' },
  { name: 'Sleeve length', how: 'Shoulder tip to wrist bone with the arm slightly bent', tip: 'Full sleeve ends at the wrist bone' },
  { name: 'Sleeve round', how: 'Around the bicep at its fullest', tip: 'Add 1.5 inches ease for comfort' },
  { name: 'Armhole', how: 'Around the shoulder joint, through the underarm', tip: 'Too tight here is the #1 fit complaint' },
  { name: 'Neck front depth', how: 'From the shoulder-neck point down the front', tip: '7–9 inches is a standard round neck' },
  { name: 'Neck back depth', how: 'From the shoulder-neck point down the back', tip: '6–8 inches for everyday wear' },
  { name: 'Trouser length', how: 'Waist to ankle bone along the side of the leg', tip: 'Add 1 inch if you wear heels' },
  { name: 'Thigh round', how: 'Around the fullest part of the upper thigh', tip: 'Needed for cigarette pants and churidar' },
  { name: 'Paincha (ankle)', how: 'The finished opening at the bottom of the trouser', tip: '11–13 inches for straight pants' },
];

const FABRIC = [
  { garment: 'Straight-cut shalwar kameez (44" fabric)', qty: '3.0 – 3.5 metres' },
  { garment: 'A-line kameez with flare', qty: '3.5 – 4.0 metres' },
  { garment: 'Frock / long maxi', qty: '5.0 – 6.5 metres' },
  { garment: 'Gharara (with kalis)', qty: '6.0 – 8.0 metres' },
  { garment: 'Sharara', qty: '5.5 – 7.0 metres' },
  { garment: 'Churidar pajama', qty: '2.5 – 3.0 metres' },
  { garment: 'Abaya / kaftan', qty: '3.5 – 4.5 metres' },
  { garment: 'Lining (for net, organza or chiffon)', qty: 'Same as the main garment' },
];

const MISTAKES = [
  'Measuring over thick winter clothes, which adds up to 2 inches to every reading.',
  'Pulling the tape tight to get a smaller number — the garment then pinches at the armhole and hip.',
  'Copying a ready-to-wear size label instead of measuring; brand sizing is not standard in Pakistan.',
  'Forgetting to state whether the kameez length is measured from the shoulder or from the neck point.',
  'Sending trouser length measured while wearing heels for one order and flats for the next.',
  'Not mentioning a fitted lining, which changes the ease we allow on the bust and waist.',
];

const FAQS = [
  {
    q: 'What measurements do you need for online stitching?',
    a: 'We need 14 measurements: shoulder, bust, upper bust, waist, hip, kameez length, sleeve length, sleeve round, armhole, front and back neck depth, trouser length, thigh and paincha. If you are unsure, send us a well-fitting outfit and we will copy its measurements exactly.',
  },
  {
    q: 'Should I measure my body or an outfit that fits me?',
    a: 'Both, if you can. Body measurements tell us your true size, and a favourite outfit tells us the ease and silhouette you like. When the two disagree we confirm with you on WhatsApp before cutting.',
  },
  {
    q: 'How much ease do you add to the measurements?',
    a: 'For everyday cotton and lawn suits we add roughly 2 inches at the bust and 2 inches at the hip. Fitted formal wear gets 1 to 1.5 inches, and bridal pieces are fitted with a hook-and-eye allowance so they can be adjusted closer to the event.',
  },
  {
    q: 'Can Ma Tailor take my measurements at home?',
    a: `Yes. Within Karachi we arrange doorstep measurement appointments for bridal and heavy formal orders, and pick and drop of fabric for regular stitching. Call or WhatsApp ${STUDIO.phoneDisplay} to book a slot.`,
  },
  {
    q: 'What if the finished outfit does not fit?',
    a: 'If the garment differs from the measurements you supplied, we alter it free of charge. If the measurements themselves were off, we still adjust the piece at labour cost only — we would rather fix the fit than have you not wear it.',
  },
];

const MeasurementGuide = () => {
  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${PAGE_URL}#howto`,
    name: 'How to measure yourself for shalwar kameez stitching',
    description: DESCRIPTION,
    url: PAGE_URL,
    totalTime: 'PT15M',
    tool: [{ '@type': 'HowToTool', name: 'Soft inch tape' }, { '@type': 'HowToTool', name: 'A well-fitting outfit' }],
    step: STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${PAGE_URL}#step-${i + 1}`,
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
        <script type="application/ld+json">{JSON.stringify(howToLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />

        <article>
          <header className="pt-28 md:pt-32 pb-12 bg-gradient-to-b from-gray-900 to-black">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <p className="text-gold text-xs tracking-[0.25em] uppercase mb-4">Free customer guide</p>
              <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-5 leading-tight">
                How to Measure Yourself for <span className="text-gold">Stitching</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Almost every fit complaint we see at our Karachi studio comes down to two or three numbers taken the
                wrong way. This guide walks through all 14 measurements our master tailors use, how much ease we add,
                how much fabric each garment needs, and the mistakes to avoid — written from what we correct on the
                cutting table every week.
              </p>
            </div>
          </header>

          <section className="py-12 bg-black">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-8 flex items-center gap-3">
                <Ruler className="h-6 w-6" aria-hidden="true" /> Six steps to accurate measurements
              </h2>
              <ol className="space-y-6">
                {STEPS.map((s, i) => (
                  <li key={s.name} id={`step-${i + 1}`} className="p-5 rounded-xl border border-gold/20 bg-gray-900/40">
                    <h3 className="font-semibold mb-2">
                      <span className="text-gold mr-2">{i + 1}.</span>
                      {s.name}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="py-12 bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-3">
                The 14 measurements, explained
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Copy this list into WhatsApp, fill in your numbers in inches, and send it with your fabric.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gold/20">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Ladies stitching measurement chart</caption>
                  <thead className="bg-gray-900 text-gold">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Measurement</th>
                      <th scope="col" className="px-4 py-3 font-semibold">How to take it</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Tailor&apos;s tip</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/10">
                    {MEASUREMENTS.map((m) => (
                      <tr key={m.name} className="bg-black/40">
                        <th scope="row" className="px-4 py-3 font-medium text-white whitespace-nowrap">{m.name}</th>
                        <td className="px-4 py-3 text-gray-300">{m.how}</td>
                        <td className="px-4 py-3 text-gray-400">{m.tip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="py-12 bg-black">
            <div className="container mx-auto px-4 max-w-4xl grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-playfair font-bold text-gold mb-4 flex items-center gap-2">
                  <Scissors className="h-5 w-5" aria-hidden="true" /> How much fabric to buy
                </h2>
                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                  Based on 44-inch wide fabric for an average 5&apos;4&quot; frame. Add half a metre for heavy borders,
                  large prints that need matching, or if you are above 5&apos;8&quot;.
                </p>
                <ul className="divide-y divide-gold/10 rounded-xl border border-gold/20 overflow-hidden">
                  {FABRIC.map((f) => (
                    <li key={f.garment} className="flex justify-between gap-4 px-4 py-3 text-sm bg-gray-900/40">
                      <span className="text-gray-300">{f.garment}</span>
                      <span className="text-gold whitespace-nowrap">{f.qty}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-playfair font-bold text-gold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" aria-hidden="true" /> Six mistakes we see every week
                </h2>
                <ul className="space-y-3">
                  {MISTAKES.map((m) => (
                    <li key={m} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="py-12 bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gold mb-8 text-center">
                Measurement FAQs
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
                  to="/booking"
                  className="inline-flex items-center justify-center min-h-[48px] bg-gold hover:bg-gold-dark text-black px-7 rounded-full font-semibold transition-all"
                >
                  Book a Fitting
                </Link>
                <Link
                  to="/fabric-care-guide"
                  className="inline-flex items-center justify-center min-h-[48px] border border-gold/60 hover:border-gold text-gold px-7 rounded-full font-semibold transition-all"
                >
                  Read the Fabric &amp; Care Guide
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

export default MeasurementGuide;
