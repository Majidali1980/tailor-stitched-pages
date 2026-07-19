import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DiscountOffers from '@/components/DiscountOffers';

const PAGE_URL = 'https://matailor.lovable.app/special-discount-offers';
const OG_IMAGE = 'https://matailor.lovable.app/og-special-offers.jpg';
const TITLE = 'Special Discount Offers | MA Tailor Pakistani Stitching';
const DESCRIPTION =
  'Exclusive limited-time discounts on custom Pakistani stitching by MA Tailor — shalwar kameez, bridal, and formal wear. Worldwide delivery to USA, UK, Canada, UAE.';

const SpecialDiscountOffers = () => {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta
          name="keywords"
          content="Pakistani tailor discount, stitching offers USA UK Canada, shalwar kameez discount, bridal stitching deals, MA Tailor promotions"
        />
        <link rel="canonical" href={PAGE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MA Tailor" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:secure_url" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="MA Tailor Special Discount Offers" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content="MA Tailor Special Discount Offers" />

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: TITLE,
          description: DESCRIPTION,
          url: PAGE_URL,
          image: OG_IMAGE,
        })}</script>
      </Helmet>
      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />
        <div className="pt-32 pb-8 container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold gold-gradient-text">Special Discount Offers</h1>
          <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
            Exclusive limited-time savings on our custom stitching services.
          </p>
        </div>
        <DiscountOffers />
        <Footer />
      </div>
    </>
  );
};

export default SpecialDiscountOffers;
