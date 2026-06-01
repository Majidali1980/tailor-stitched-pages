import SeoLandingPage from '@/components/SeoLandingPage';

const BridalDressStitching = () => (
  <SeoLandingPage
    slug="bridal-dress-stitching"
    title="Bridal Dress Stitching – Custom Pakistani Bridal Wear | Ma Tailor"
    metaDescription="Custom bridal dress stitching by Ma Tailor. Hand-finished lehengas, ghararas & maxis with perfect fit, intricate detailing and on-time delivery for your big day."
    h1="Bridal Dress Stitching – Crafted For Your Big Day"
    serviceName="Bridal Dress Stitching"
    intro="Your wedding outfit should fit like it was made for you – because it is. Ma Tailor specialises in custom bridal stitching for brides in Pakistan and around the world."
    highlights={[
      'Hand-finished bridal couture',
      'Lehenga, gharara, maxi, anarkali & walima looks',
      'Multiple fittings to guarantee a perfect fit',
      'Inner lining, canvas & boning where needed',
      'Coordinated stitching for sisters & bridesmaids',
      'On-time delivery with stitched timeline',
    ]}
    sections={[
      {
        heading: 'Bridal Stitching Done Right',
        body: 'A bridal outfit is the most photographed dress you will ever wear. Our master tailors specialise in heavy fabrics, intricate dabka and zari work, and structured silhouettes that hold their shape throughout the event. Every bridal order is treated as a couture project, not a regular stitching job.',
      },
      {
        heading: 'What is Included',
        body: 'Custom measurements, design consultation, premium inner lining, hooks and fasteners, dupatta finishing, edge piping, blouse padding where required, and final pressing. We share progress photos so you always know where your outfit is.',
      },
      {
        heading: 'Timeline & Booking',
        body: 'For full bridal sets we recommend booking 6–8 weeks before your event. For a single bridal piece, 3–4 weeks is usually enough. Rush orders may be accepted subject to availability.',
      },
    ]}
    faqs={[
      { q: 'How early should I book my bridal stitching?', a: 'Ideally 6–8 weeks before the event so we have time for multiple fittings and detailed finishing.' },
      { q: 'Do you stitch heavy bridal lehengas?', a: 'Yes. We specialise in heavy bridal lehengas, ghararas, ferozis and walima maxis with proper canvas and lining.' },
      { q: 'Can overseas brides order?', a: 'Absolutely. We stitch based on your measurements and ship worldwide. Many of our brides order from the USA, UK, Canada and UAE.' },
      { q: 'Do you also stitch family outfits to match?', a: 'Yes, we offer coordinated stitching for sisters, mother of the bride and bridesmaids.' },
      { q: 'What does bridal stitching cost?', a: 'Pricing depends on design complexity and fabric. Share your design and we will quote a fixed price before starting work.' },
    ]}
  />
);

export default BridalDressStitching;
