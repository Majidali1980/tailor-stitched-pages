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
    faqs={[
      { q: 'Do you ship outside Pakistan?', a: 'Yes. We ship worldwide including USA, UK, Canada, UAE, Saudi Arabia, Australia and Europe via tracked international courier.' },
      { q: 'How do I take my measurements?', a: 'We provide a step-by-step measurement guide with images. You can also send measurements from an outfit that already fits you well.' },
      { q: 'How long does stitching take?', a: 'Standard turnaround is 10–14 working days. Bridal and heavy formal wear may take 3–4 weeks.' },
      { q: 'Can I send my own fabric?', a: 'Yes, you can courier fabric to our Pakistan address, or we can source matching fabric for you.' },
      { q: 'What if the fit is not right?', a: 'We offer free minor alterations. For overseas customers we provide remote-fit adjustments based on photos.' },
    ]}
  />
);

export default PakistaniTailorOnline;
