import SeoLandingPage from '@/components/SeoLandingPage';

const PakistaniTailorOnline = () => (
  <SeoLandingPage
    slug="pakistani-tailor-online"
    title="Pakistani Tailor Online – Custom Stitching Worldwide | Ma Tailor"
    metaDescription="Hire a trusted Pakistani tailor online. Custom stitched shalwar kameez, bridal & party wear with perfect fit and worldwide shipping. Order from Ma Tailor today."
    h1="Pakistani Tailor Online – Custom Stitching, Delivered Worldwide"
    serviceName="Pakistani Tailor Online"
    intro="Ma Tailor brings authentic Pakistani tailoring to your doorstep – wherever you are. Share your measurements, pick a design, and receive a perfectly stitched outfit ready to wear."
    highlights={[
      'Authentic Pakistani master tailors',
      'Worldwide shipping to USA, UK, Canada & UAE',
      'Custom measurements with size-chart guidance',
      'Stitching for shalwar kameez, gharara, lehenga & more',
      'Premium finishing and inner lining',
      'Easy reorders – we save your size profile',
    ]}
    sections={[
      {
        heading: 'Why Choose a Pakistani Tailor Online',
        body: 'Pakistani stitching is known worldwide for its precision, intricate detailing and traditional craftsmanship. By ordering online from Ma Tailor, you get the skill of Lahore and Karachi master tailors without leaving your home. Whether you live in New York, London, Toronto or Dubai, your outfit is stitched in Pakistan and shipped directly to you.',
      },
      {
        heading: 'How Online Ordering Works',
        body: '1. Choose a design from our gallery or share your own.\n2. Submit your measurements using our simple guide.\n3. We stitch your outfit with premium finishing.\n4. Your parcel is shipped via tracked courier worldwide.',
      },
      {
        heading: 'Outfits We Stitch',
        body: 'Shalwar kameez, kurta sets, anarkali frocks, maxis, ghararas, shararas, lehengas, party wear, formal wear, and bridal couture. Every piece is hand-finished and quality-checked before dispatch.',
      },
    ]}
    relatedServices={[
      { label: 'Custom bridal dress stitching', to: '/bridal-dress-stitching', description: 'Hand-finished lehengas, ghararas and walima maxis stitched for the big day.' },
      { label: 'Shalwar kameez stitching online', to: '/shalwar-kameez-stitching', description: 'Everyday and party shalwar kameez tailored to your exact measurements.' },
    ]}
    relatedReads={[
      { label: 'How to hire a Pakistani tailor online – 2026 guide', to: '/blog/how-to-hire-pakistani-tailor-online', description: 'Step-by-step guide to ordering custom stitching from overseas.' },
      { label: 'Shalwar kameez stitching: cuts, fabrics & fit guide', to: '/blog/shalwar-kameez-stitching-guide' },
      { label: 'Browse all tailoring tips', to: '/blog/category/tailoring-tips' },
    ]}
    faqs={[
      {
        q: 'How do I hire a Pakistani tailor online from the USA, UK or Canada?',
        a: 'Pick a design from our gallery (or share your own reference), submit your measurements through our guided form, and confirm your order. We stitch your outfit in Pakistan and ship it via tracked international courier to your door. Most overseas orders are delivered within 3–4 weeks end-to-end. You can pay in PKR, USD or GBP – prices auto-convert at checkout.',
      },
      {
        q: 'How do I take my measurements for an online Pakistani tailor?',
        a: 'You have three easy options:\n• Use our illustrated measurement guide – it covers bust, waist, hip, shoulder, sleeve, kameez length, trouser length and neckline depth.\n• Send measurements from an outfit that already fits you well – just lay it flat and measure across.\n• Book a free WhatsApp video call and our team will walk you through every measurement live.\nAccurate measurements are the single biggest factor in a perfect-fit result.',
      },
      {
        q: 'How long does stitching and worldwide shipping take?',
        a: 'Standard stitching turnaround is 10–14 working days from the day measurements are confirmed. Bridal and heavy embroidered formals take 3–4 weeks. International shipping via DHL/FedEx adds 4–7 working days to USA, UK, Canada, UAE and Australia. You get a tracking number the moment your parcel is dispatched.',
      },
      {
        q: 'Can I send my own fabric to a Pakistani tailor online?',
        a: 'Yes. You can courier fabric to our Pakistan address and we will stitch on a labour-only basis. Alternatively, we can source matching fabric for you from Lahore and Karachi markets – just share a colour, fabric type (lawn, chiffon, organza, silk) and budget, and we will send photos for your approval before cutting.',
      },
      {
        q: 'What if the stitching does not fit properly?',
        a: 'For local Pakistan customers, we offer free minor alterations within 7 days of delivery. For overseas customers, we provide remote-fit support: send us photos and we will guide you through quick adjustments at a local tailor, or accept the outfit back for full alteration with shared shipping. Because we save your size profile, repeat orders fit perfectly from the first try.',
      },
      {
        q: 'Do you stitch men’s and kids’ Pakistani outfits too?',
        a: 'Our core specialty is women’s and girls’ stitching – shalwar kameez, frocks, ghararas, lehengas, maxis and bridal couture. We also stitch coordinated kids’ outfits for weddings and family events on request. For men’s stitching, please contact us directly to confirm availability.',
      },
      {
        q: 'Is it safe to order custom stitching online from Pakistan?',
        a: 'Yes. Ma Tailor is an established Pakistani tailoring brand with verified customer reviews from Pakistan, USA, UK, Canada and UAE. We share progress photos before dispatch, use tracked international couriers, and accept secure payment in PKR, USD or GBP. Your measurement profile is stored privately and only used for your future orders.',
      },
    ]}
  />
);

export default PakistaniTailorOnline;
