import { Star, ExternalLink, BadgeCheck, Check, ArrowRight } from 'lucide-react';

interface SewingProduct {
  name: string;
  tagline: string;
  badge: string;
  stars: string;
  ratings: string;
  highlight: string;
  price: string;
  priceNote?: string;
  features: string[];
  link: string;
}

// Products verified 28 Nov 2026 from the user's own Amazon screenshots +
// SiteStripe links (Associates tag wellnessroo08-20). Prices are shown only
// where they were visible on the product page — SE700 price was not visible,
// so it is deliberately left as "See price on Amazon".
const PRODUCTS: SewingProduct[] = [
  {
    name: 'Brother XM2701',
    tagline: 'Best for Beginners',
    badge: '#1 Best Seller in Sewing Machines',
    stars: '4.6',
    ratings: '19,442 ratings',
    highlight:
      'The classic first machine — simple, affordable, and the most-loved beginner pick on Amazon.',
    price: 'From $129.99',
    features: [
      '27 built-in stitches',
      '6 sewing feet included',
      'Automatic needle threader',
      'Free arm for sleeves & cuffs',
    ],
    link: 'https://link.amazon/B02IuxHzF',
  },
  {
    name: 'Brother CS7000X',
    tagline: 'Best All-Rounder',
    badge: '2,000+ bought in the past month',
    stars: '4.5',
    ratings: '3,690 ratings',
    highlight:
      'Quilting-ready with 70 stitches, an LCD display and a wide table — grows with your skills.',
    price: '$279.99',
    priceNote: '+ $35 coupon available',
    features: [
      '70 built-in stitches',
      'LCD display',
      'Wide table for quilting',
      '10 sewing feet included',
    ],
    link: 'https://link.amazon/B0eFFVGEE',
  },
  {
    name: 'Brother SE700',
    tagline: 'Best for Embroidery',
    badge: '#1 Best Seller in Embroidery Machines',
    stars: '4.5',
    ratings: '1,084 ratings',
    highlight:
      'Sewing plus embroidery in one machine — 135 designs and a touchscreen, made for creative work.',
    price: 'See price on Amazon',
    features: [
      '135 embroidery designs',
      '103 built-in stitches',
      '4" x 4" embroidery hoop',
      '3.7" touchscreen display',
    ],
    link: 'https://link.amazon/B06oCzURk',
  },
];

const SewingEssentials = () => {
  return (
    <section className="py-12 bg-black text-white">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Shop Sewing <span className="text-gold">Essentials</span>
          </h2>
          <p className="text-lg font-montserrat text-gray-300 max-w-2xl mx-auto">
            The sewing machines we recommend for beginners — real ratings and
            prices from Amazon.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {PRODUCTS.map((product) => (
            <article
              key={product.name}
              className="flex flex-col rounded-2xl border border-gold/20 bg-gray-900/50 p-6"
            >
              <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-gold/15 px-3 py-1 font-montserrat text-xs font-semibold text-gold mb-4">
                <BadgeCheck className="h-3.5 w-3.5" />
                {product.badge}
              </span>

              <h3 className="font-playfair text-2xl font-bold">
                {product.name}
              </h3>
              <p className="font-montserrat text-sm text-gold mt-1">
                {product.tagline}
              </p>

              <div className="flex items-center gap-1.5 mt-3">
                <Star className="h-4 w-4 fill-gold text-gold" />
                <span className="font-montserrat text-sm font-semibold">
                  {product.stars}
                </span>
                <span className="font-montserrat text-sm text-gray-400">
                  ({product.ratings})
                </span>
              </div>

              <p className="font-montserrat text-sm text-gray-300 mt-3 leading-relaxed">
                {product.highlight}
              </p>

              <ul className="space-y-2 mt-4 mb-5">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 font-montserrat text-sm text-gray-300"
                  >
                    <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <p className="font-playfair text-xl font-bold text-white">
                  {product.price}
                </p>
                {product.priceNote && (
                  <p className="font-montserrat text-xs text-gray-400 mt-0.5">
                    {product.priceNote}
                  </p>
                )}
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 font-montserrat text-sm font-bold text-black transition-colors hover:bg-gold-light"
                >
                  Check Price on Amazon
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center font-montserrat text-sm text-gray-400 mt-8 max-w-3xl mx-auto">
          As an Amazon Associate, MA Tailor earns from qualifying purchases.
          Prices and availability may change — please check the Amazon page
          for the latest price.
        </p>
        <p className="text-center mt-4">
          <a
            href="/blog/best-sewing-machines-essentials"
            className="font-montserrat text-gold hover:underline inline-flex items-center gap-1.5"
          >
            Read the full guide: Best Sewing Machines &amp; Essentials for
            Beginners
            <ArrowRight className="h-4 w-4" />
          </a>
        </p>
      </div>
    </section>
  );
};

export default SewingEssentials;
