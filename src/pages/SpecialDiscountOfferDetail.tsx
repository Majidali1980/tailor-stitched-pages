import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Percent, ArrowLeft } from 'lucide-react';

interface Offer {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  discount_percentage: number | null;
  discount_amount: number | null;
  code: string | null;
  valid_from: string | null;
  valid_until: string | null;
  is_active: boolean;
  image_url: string | null;
}

const SITE = 'https://matailor.lovable.app';

const SpecialDiscountOfferDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from('discount_offers')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();
      if (error || !data) setNotFound(true);
      else setOffer(data as Offer);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (notFound || !offer) return <Navigate to="/special-discount-offers" replace />;

  const url = `${SITE}/special-discount-offers/${offer.slug}`;
  const title = `${offer.title} | MA Tailor Special Discount Offer`;
  const description =
    offer.description ||
    `Exclusive limited-time offer from MA Tailor: ${offer.title}. Save on custom Pakistani stitching.`;
  const image = offer.image_url || `${SITE}/og-special-offers.jpg`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: offer.title,
    description,
    url,
    image,
    priceCurrency: 'PKR',
    ...(offer.discount_amount ? { price: offer.discount_amount } : {}),
    ...(offer.valid_from ? { validFrom: offer.valid_from } : {}),
    ...(offer.valid_until ? { validThrough: offer.valid_until } : {}),
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'MA Tailor',
      url: SITE,
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Special Discount Offers', item: `${SITE}/special-discount-offers` },
      { '@type': 'ListItem', position: 3, name: offer.title, item: url },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <div className="min-h-screen bg-black text-white font-montserrat">
        <Navbar />
        <article className="pt-32 pb-16 container mx-auto px-4 max-w-4xl">
          <Link to="/special-discount-offers" className="inline-flex items-center gap-2 text-gold hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to all offers
          </Link>

          {offer.image_url && (
            <div className="w-full aspect-[16/9] overflow-hidden rounded-lg bg-gray-900 mb-8">
              <img src={offer.image_url} alt={offer.title} className="w-full h-full object-cover" />
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-playfair font-bold gold-gradient-text mb-4">
            {offer.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {offer.discount_percentage && (
              <Badge className="bg-gold text-black font-bold">
                <Percent className="h-4 w-4 mr-1" />
                {offer.discount_percentage}% OFF
              </Badge>
            )}
            {offer.discount_amount && (
              <Badge className="bg-gold text-black font-bold">
                Rs {offer.discount_amount} OFF
              </Badge>
            )}
            {offer.code && (
              <Badge variant="outline" className="border-gold text-gold">
                Code: {offer.code}
              </Badge>
            )}
          </div>

          {offer.description && (
            <p className="text-lg text-gray-300 leading-relaxed mb-8 whitespace-pre-line">
              {offer.description}
            </p>
          )}

          {(offer.valid_from || offer.valid_until) && (
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Calendar className="h-4 w-4" />
              {offer.valid_from && <span>From {new Date(offer.valid_from).toLocaleDateString()}</span>}
              {offer.valid_until && <span>· Until {new Date(offer.valid_until).toLocaleDateString()}</span>}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/923070125273?text=${encodeURIComponent(`Hi, I'd like to claim the offer: ${offer.title}${offer.code ? ` (Code: ${offer.code})` : ''}`)}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="bg-gold text-black hover:bg-gold/90">Claim on WhatsApp</Button>
            </a>
            <Link to="/booking">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
                Book Now
              </Button>
            </Link>
          </div>
        </article>
        <Footer />
      </div>
    </>
  );
};

export default SpecialDiscountOfferDetail;
