import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, Ruler, Truck } from 'lucide-react';

export const HOME_FAQS = [
  { q: 'Is MA Tailor an online tailor in Karachi?', a: 'Yes. MA Tailor is an online tailor based in Mahmoodabad, Karachi. You can book on our website or WhatsApp, send your fabric through home pickup, and receive the stitched outfit at your door.' },
  { q: 'Do you offer tailor service at home in Karachi?', a: 'Yes. Our rider collects your fabric and a well-fitting sample suit from your home and returns the finished outfit. Pick and drop charges of Rs. 350 apply for areas outside our free range. Bridal clients can request a measurement visit by appointment.' },
  { q: 'What are your stitching charges?', a: 'Charges depend on the garment, cut, lining and finishing, so we quote on request. Send a picture of the design on WhatsApp at +92 307 0125273 and we will share an exact price before stitching.' },
  { q: 'How long does stitching take?', a: 'Everyday shalwar kameez usually takes 7–10 working days, party and formal wear 10–14 days, and bridal outfits 3–4 weeks. Tell us your event date and we will confirm if an urgent order is possible.' },
  { q: 'Do you stitch all types of ladies outfits?', a: 'We specialise in ladies stitching: shalwar kameez, kurtis, frocks, maxis, ghararas, shararas, abayas, party wear and bridal wear, plus alterations on ready-to-wear and designer pieces.' },
  { q: 'How do I book a tailor online?', a: 'Open the booking page, choose your outfit type, add your measurements or choose to send a sample suit, and select home pickup. Your booking is confirmed on WhatsApp. Choosing a date and time is optional.' },
];

interface Props { showFaq?: boolean }

const HomeServiceFaq = ({ showFaq = true }: Props) => {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const steps = [
    { icon: Home, title: 'Book home pickup', text: 'Book online or on WhatsApp and our rider collects your fabric from your door anywhere in Karachi.' },
    { icon: Ruler, title: 'Perfect-fit cutting', text: 'Send a suit that fits you well or follow our measurement guide — we keep your size on file for next time.' },
    { icon: Truck, title: 'Delivered to you', text: 'Your finished, pressed outfit comes back to your home, with free minor alterations if anything needs adjusting.' },
  ];
  return (
    <section className="py-12 md:py-14 bg-black text-white" aria-labelledby="home-service-heading">
      {showFaq && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>
      )}
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 id="home-service-heading" className="font-playfair text-3xl md:text-4xl font-bold mb-4">
          Tailor Service at Home in <span className="text-gold">Karachi</span>
        </h2>
        <p className="font-montserrat text-gray-300 mb-8 max-w-3xl">
          No traffic, no repeated trips to a tailor shop. MA Tailor picks up your fabric, stitches it to your measurements in our Mahmoodabad studio and delivers it back to your home.
        </p>
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {steps.map((s) => (
            <div key={s.title} className="border border-gold/20 bg-white/5 rounded-lg p-5">
              <s.icon className="h-6 w-6 text-gold mb-3" aria-hidden="true" />
              <h3 className="font-playfair text-xl font-semibold mb-2">{s.title}</h3>
              <p className="font-montserrat text-sm text-gray-300">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mb-8">
          <Link to="/booking" className="inline-flex items-center min-h-[48px] px-6 rounded-md bg-gold text-black font-semibold font-montserrat">Book home pickup</Link>
          <Link to="/tailor-near-me" className="inline-flex items-center min-h-[48px] px-6 rounded-md border border-gold text-gold font-montserrat">Find your area</Link>
        </div>

        {showFaq && (
          <>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
              Frequently Asked <span className="text-gold">Questions</span>
            </h2>
            <div className="space-y-3">
              {HOME_FAQS.map((f) => (
                <details key={f.q} className="border border-gold/20 bg-white/5 rounded-lg p-4 group">
                  <summary className="cursor-pointer font-playfair text-lg text-gold min-h-[32px]">{f.q}</summary>
                  <p className="font-montserrat text-gray-300 mt-3 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HomeServiceFaq;
