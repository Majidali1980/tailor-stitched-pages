import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const faqs = [
  { q: "Do you ship stitched dresses to the USA?", a: "Yes, we offer international shipping to USA, UK, Canada, UAE, and many other countries. Delivery typically takes 15-17 days via reliable courier services." },
  { q: "How long does stitching take?", a: "Our standard stitching time is 7-10 days, plus 15-17 days for international delivery. Rush orders can be accommodated with additional charges." },
  { q: "What types of Pakistani dresses do you stitch?", a: "We specialize in all types of Pakistani and Indian ladies' outfits including Shalwar Kameez, Kurtis, Maxis, Party wear, Bridal wear, and traditional outfits." },
  { q: "Do you provide samples before bulk orders?", a: "Yes, we offer free samples for bulk orders to ensure quality and fit before you place your main order." },
  { q: "What are your bulk order minimum quantities?", a: "Our minimum bulk order is 10 pieces per size. We offer competitive rates and discounts based on order quantity and discussion." },
  { q: "How can I get my measurements taken?", a: "We provide detailed measurement guides, or you can visit our local measurement partners. We also offer pick and drop services in select areas." },
];

const FAQPage = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    })),
  };

  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Helmet>
        <title>FAQ | MA Tailor – Pakistani Stitching Questions Answered</title>
        <meta name="description" content="Answers about MA Tailor's Pakistani dress stitching: international shipping, delivery times, bulk orders, measurements, and more." />
        <link rel="canonical" href="https://matailor.lovable.app/faq" />
        <meta property="og:title" content="FAQ | MA Tailor" />
        <meta property="og:description" content="Common questions about Pakistani dress stitching, shipping, and bulk orders." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/faq" />
        <meta property="og:image" content="https://matailor.lovable.app/logo.png" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <Navbar />
      <FAQ />
      <Footer />
    </div>
  );
};

export default FAQPage;
