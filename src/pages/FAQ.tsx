import { Helmet } from 'react-helmet-async';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type FaqItem = { q: string; a: string };
type FaqCategory = { title: string; items: FaqItem[] };

const categories: FaqCategory[] = [
  {
    title: 'Process',
    items: [
      { q: "What's the difference between made-to-measure and bespoke suits?", a: "Made-to-measure adjusts an existing base pattern to your measurements, while bespoke builds a unique pattern from scratch with multiple fittings and full customization of every detail." },
      { q: "How many fittings will I need?", a: "Made-to-measure usually requires one fitting plus a final pickup. Bespoke typically involves 2–4 fittings, including a basted (rough) fitting, a forward fitting, and a final fitting." },
      { q: "Can I order a custom suit online without visiting in person?", a: "Yes. We provide a guided self-measurement video, a measurement form, and a virtual consultation. For best results, we recommend having a tailor or experienced friend assist with measurements." },
      { q: "How do I take accurate measurements at home?", a: "Use a soft measuring tape, wear a fitted shirt, and follow our step-by-step video. Key measurements include chest, waist, hips, shoulder width, sleeve length, jacket length, and inseam." },
      { q: "Can you copy a suit I already own and love?", a: "Yes. Ship us the garment or send detailed photos with measurements. We'll replicate the fit, silhouette, and details in your chosen fabric." },
    ],
  },
  {
    title: 'Fit & Style',
    items: [
      { q: "Why does a custom suit fit better than off-the-rack?", a: "Off-the-rack suits are cut for an average body shape. A custom suit accounts for your exact shoulders, posture, chest-to-waist drop, and arm length, so it sits cleanly without pulling or excess fabric." },
      { q: "Which lapel style should I choose?", a: "Notch lapels are versatile for business and daily wear. Peak lapels add formality and elongate the torso. Shawl lapels are reserved for tuxedos and black-tie events." },
      { q: "Can you tailor suits for unusual body types?", a: "Absolutely. Custom tailoring is ideal for athletic builds, tall or petite frames, uneven shoulders, or any posture that off-the-rack ignores." },
      { q: "Should I get a two-piece or three-piece suit?", a: "A two-piece is more versatile for everyday business wear. A three-piece (with waistcoat) adds formality and works well for weddings, events, and a more classic look." },
      { q: "What trouser 'break' should I choose?", a: "No break gives a modern, cropped look. A slight or quarter break is the most versatile. A full break is traditional and dressier but can pool at the shoe." },
    ],
  },
  {
    title: 'Fabric & Details',
    items: [
      { q: "Which fabric weight is right for my climate?", a: "Lightweight wools (Super 110s–130s, 7–9 oz) suit warm climates. Mid-weight (10–12 oz) works year-round. Heavier flannel and tweed (13 oz+) are best for cold weather." },
      { q: "Wool vs. synthetic blends — which is better?", a: "Pure wool breathes better, drapes more elegantly, and lasts longer. Blends with polyester are cheaper and more wrinkle-resistant but feel less premium and trap heat." },
      { q: "What lining options do you offer?", a: "Standard viscose linings, breathable Bemberg cupro for warmer climates, and bold patterned linings for personality. Half-lined jackets are available for hot weather." },
      { q: "Can I customize buttons, stitching, and monograms?", a: "Yes. Choose horn, mother-of-pearl, or covered buttons; pick stitching colors for buttonholes and lapels; and add a personal monogram inside the jacket." },
      { q: "What's the difference between half-canvas and full-canvas construction?", a: "Half-canvas uses a canvas layer in the chest and lapels with fused construction below. Full-canvas runs canvas through the entire jacket, giving the best drape and longevity — and is what we recommend for premium suits." },
    ],
  },
  {
    title: 'Pricing',
    items: [
      { q: "How much does a custom suit cost?", a: "Pricing depends on fabric and construction. Made-to-measure starts at a set base price, with premium mills (Loro Piana, Zegna, Holland & Sherry) increasing the cost. Full bespoke is priced higher due to additional hand-work and fittings." },
      { q: "Why are custom suits more expensive than off-the-rack?", a: "You're paying for higher-grade fabric, individual pattern drafting, multiple fittings, and skilled hand-finishing. The result lasts years longer and fits only you." },
      { q: "Is a custom suit worth it if I only wear suits occasionally?", a: "Yes — a well-made custom suit is a long-term investment. Even worn a few times a year, it will outlast and outperform several off-the-rack suits in fit, comfort, and durability." },
      { q: "What's included in the price?", a: "The price includes consultation, fabric, full construction, all fittings, basic monogram, and a garment bag. Shipping and rush orders may incur additional charges." },
    ],
  },
  {
    title: 'Timeline',
    items: [
      { q: "How long does it take to make a custom suit?", a: "Made-to-measure typically takes 4–6 weeks. Bespoke suits take 8–12 weeks due to additional fittings and hand-work. Rush orders may be available for an additional fee." },
      { q: "How should I care for my custom suit?", a: "Hang it on a wide wooden hanger, brush after each wear, steam (don't iron) to remove wrinkles, and rotate between suits so the fabric can rest for at least 24 hours between wears." },
      { q: "How often should I dry-clean my suit?", a: "Only when truly needed — typically 2–4 times a year. Frequent dry-cleaning breaks down the fibers and shortens the suit's lifespan. Spot-clean and steam between cleanings." },
      { q: "Will my custom suit hold its shape over time?", a: "Yes, especially with full-canvas construction. With proper care — rotation, brushing, and correct storage — a quality custom suit holds its shape for 8–10 years or more." },
    ],
  },
  {
    title: 'Revisions',
    items: [
      { q: "What happens if my suit doesn't fit perfectly on delivery?", a: "We schedule a final fitting on delivery. Any necessary adjustments — sleeve length, waist suppression, trouser hem — are done free of charge until you're happy with the fit." },
      { q: "Do you offer free alterations after delivery?", a: "Yes. Adjustments for fit issues are free within the first 30 days. We also offer minor alterations later (for weight change, etc.) at a discounted rate." },
      { q: "Can I return a custom suit if I'm not satisfied?", a: "Custom suits are made to your specifications and cannot be returned. However, we guarantee the fit — if something isn't right, we'll remake the affected piece at no cost." },
      { q: "What if I gain or lose weight after ordering?", a: "We build extra fabric into the seams during construction so we can let out or take in the suit later. Most fit changes can be accommodated within reasonable weight fluctuations." },
    ],
  },
];

const FAQPage = () => {
  const [query, setQuery] = useState('');

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q),
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [query]);

  const allFaqs = useMemo(() => categories.flatMap((c) => c.items), []);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Helmet>
        <title>Custom Suit FAQ | MA Tailor – Bespoke Suit Questions Answered</title>
        <meta
          name="description"
          content="Answers to common custom suit questions: process, fit & style, fabric & details, pricing, timeline, and revisions from MA Tailor."
        />
        <link rel="canonical" href="https://matailor.lovable.app/faq" />
        <meta property="og:title" content="Custom Suit FAQ | MA Tailor" />
        <meta
          property="og:description"
          content="Everything you need to know about ordering a custom suit — process, fit, fabric, pricing, timeline, and revisions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/faq" />
        <meta property="og:image" content="https://matailor.lovable.app/logo.png" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-20 max-w-4xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            Custom Suit FAQ
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Everything you need to know about ordering a bespoke or made-to-measure
            suit — from your first fitting to final delivery.
          </p>
        </header>

        <div className="relative mb-12 max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions (e.g. fabric, fittings, price)..."
            aria-label="Search FAQ"
            className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-primary"
          />
        </div>

        {filteredCategories.length === 0 ? (
          <p className="text-center text-white/60 py-12">
            No results for &ldquo;{query}&rdquo;. Try a different keyword.
          </p>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((cat) => (
              <section key={cat.title}>
                <h2 className="text-2xl font-playfair font-semibold mb-4 border-b border-white/10 pb-2">
                  {cat.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {cat.items.map((item, idx) => (
                    <AccordionItem
                      key={`${cat.title}-${idx}`}
                      value={`${cat.title}-${idx}`}
                      className="border-white/10"
                    >
                      <AccordionTrigger className="text-left text-white hover:text-primary">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/75 leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
