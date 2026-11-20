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
    title: 'Ordering Process',
    items: [
      { q: "How do I place a stitching order online?", a: "Share your design on WhatsApp (+92 307 0125273) or use the booking form on this website. Send a photo or sketch of the design, your fabric details, and your measurements. We confirm the design, timeline and delivery before starting work." },
      { q: "How do I send my measurements?", a: "Use our guided self-measurement form with a soft measuring tape, or book a home measurement visit in Karachi. If you are unsure, request a video call on WhatsApp and we will walk you through each measurement step by step." },
      { q: "Can I send my own fabric?", a: "Yes — most of our clients send their own fabric. We stitch lawn, chiffon, silk, velvet, net, organza, jamawar, cotton and more. You can courier the fabric to our Mahmoodabad studio or drop it off in person." },
      { q: "Can you stitch a dress from a photo or a designer's picture?", a: "Yes. Share a clear photo of the design and we will stitch it to your measurements, matching the neckline, sleeves, cut and detailing as closely as possible." },
      { q: "How do I track my order?", a: "Use the Track Order page with your order number, or message us on WhatsApp for a progress update and photos at each stage of stitching." },
    ],
  },
  {
    title: 'Fit & Measurements',
    items: [
      { q: "How do I take accurate measurements at home?", a: "Use a soft measuring tape over fitted clothing, stand straight, and follow our step-by-step measurement guide. Key measurements are bust, waist, hips, shoulder, sleeve length, shirt length and trouser length." },
      { q: "What if my measurements change after ordering?", a: "We build extra seam allowance into every garment so it can be taken in or let out later. Tell us as soon as possible and we will adjust the fit before the final finishing." },
      { q: "Do you offer fittings?", a: "Yes. Fittings are available at our Mahmoodabad studio in Karachi, and overseas clients can book a WhatsApp video fitting to approve the fit before dispatch." },
      { q: "Can you copy a dress I already own and love?", a: "Yes. Send us the garment or clear photos with measurements and we will replicate the fit, cut and detailing in your chosen fabric." },
      { q: "What is the difference between standard size and custom stitching?", a: "Standard sizes follow fixed charts. Custom stitching is drafted to your exact measurements, posture and style preferences, so the dress fits only you." },
    ],
  },
  {
    title: 'Fabrics & Stitching',
    items: [
      { q: "Which fabrics do you stitch?", a: "We stitch lawn, chiffon, georgette, silk, raw silk, velvet, net, organza, jamawar, cotton, cambric and more — from everyday wear to heavy bridal fabrics." },
      { q: "Do you provide the fabric or should I send my own?", a: "MA Tailor is a stitching service, so most clients send their own fabric. If you need help sourcing, message us on WhatsApp and we will guide you on suitable fabric for your design." },
      { q: "Can you do embroidery, lace and embellishment work?", a: "Yes. We do dabka, zari, sequin and thread embroidery, lace application, piping, tassels and gota work, hand-applied by skilled karigars." },
      { q: "How do you finish seams, hems and necklines?", a: "All garments are finished with overlocked seams, neat hems, piped edges where required, and reinforced stitching at stress points so the dress holds its shape." },
      { q: "How should I wash and care for my stitched clothes?", a: "Dry-clean heavily embellished and bridal outfits. For everyday lawn and cotton, wash gently in cold water, dry in shade, and steam rather than ironing directly on embroidery." },
    ],
  },
  {
    title: 'Bridal & Formal Wear',
    items: [
      { q: "How early should I book bridal stitching?", a: "For a full bridal set (mehndi, baraat and walima) book 8–10 weeks before your first event. A single bridal lehenga, gharara or maxi usually needs 3–4 weeks, and formal wear needs 10–14 days." },
      { q: "Do you stitch lehengas, ghararas, maxis and shararas?", a: "Yes — bridal couture is our specialty. We stitch lehengas, ghararas, shararas, maxis and anarkalis with proper canvas, lining, kalis and boning so the silhouette holds through long events." },
      { q: "Can you stitch matching outfits for my family and bridesmaids?", a: "Yes. We regularly stitch coordinated outfits for mothers, sisters and bridesmaids. Share your colour palette and we will recommend cuts and embroidery that complement the bridal look." },
      { q: "Can overseas brides order bridal stitching?", a: "Absolutely. Brides in the USA, UK, Canada, UAE and Australia order from us regularly. We stitch to your measurements, share progress photos, hold WhatsApp video fittings, and ship by insured tracked courier." },
    ],
  },
  {
    title: 'Delivery & Timeline',
    items: [
      { q: "How long does stitching take?", a: "Everyday wear takes 7–10 days, formal wear 10–14 days, and bridal wear 3–4 weeks. Timelines depend on the design and embroidery work, and we confirm your delivery date before starting." },
      { q: "Do you deliver outside Karachi and worldwide?", a: "Yes. We deliver across Pakistan and ship worldwide to the USA, UK, Canada, UAE and Australia by tracked courier. Home pickup is available from our Mahmoodabad studio in Karachi." },
      { q: "How is my order packed for delivery?", a: "Each outfit is pressed, wrapped in muslin, and packed flat so embroidery and pleats stay safe. Bridal pieces travel in a rigid box with the embroidery facing up." },
      { q: "What are your working hours?", a: "Our studio is open Monday to Saturday, 10:00 AM to 8:00 PM. You can message us on WhatsApp anytime and we will reply during working hours." },
    ],
  },
  {
    title: 'Revisions & Support',
    items: [
      { q: "What if my dress doesn't fit perfectly on delivery?", a: "Tell us at the first fitting and we will adjust it — sleeve length, waist, hem and other fit corrections are included until you are happy with the fit." },
      { q: "Do you offer alterations after delivery?", a: "Yes. Minor alterations for fit are available after delivery, and we can also restyle or resize outfits later at a discounted rate." },
      { q: "Can I change my design after ordering?", a: "Small changes are possible before cutting begins. Once the fabric is cut, major design changes may not be possible — so message us as early as you can." },
      { q: "How can I contact MA Tailor?", a: "WhatsApp us on +92 307 0125273, use the contact form on this website, or visit our studio in Mahmoodabad, Karachi (Monday to Saturday, 10:00 AM to 8:00 PM)." },
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
        <title>Ladies Stitching FAQ | MA Tailor – Questions Answered</title>
        <meta
          name="description"
          content="Answers to common ladies stitching questions: ordering, measurements, fabrics, bridal wear, delivery timelines and alterations from MA Tailor Karachi."
        />
        <link rel="canonical" href="https://matailor.lovable.app/faq" />
        <meta property="og:title" content="Ladies Stitching FAQ | MA Tailor" />
        <meta
          property="og:description"
          content="Everything you need to know about ordering custom ladies stitching — measurements, fabrics, bridal wear, delivery and alterations."
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
            Ladies Stitching FAQ
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Everything you need to know about ordering custom ladies stitching —
            from your first measurement to final delivery.
          </p>
        </header>

        <div className="relative mb-12 max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions (e.g. fabric, measurements, bridal)..."
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
