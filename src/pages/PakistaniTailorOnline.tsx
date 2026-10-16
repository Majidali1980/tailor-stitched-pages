import SeoLandingPage from '@/components/SeoLandingPage';

const PakistaniTailorOnline = () => (
  <SeoLandingPage
    slug="pakistani-tailor-online"
    title="Pakistani Tailor Online | Stitching Delivered Across Pakistan"
    metaDescription="MA Tailor is an online tailor in Pakistan for ladies suits, bridal and party wear. Send fabric, share measurements, get a perfect fit. Get a free quote today."
    metaKeywords="online tailor in Pakistan, Pakistani tailor online, online stitching service Pakistan, ma tailor, ladies tailor online Pakistan, custom stitching Pakistan, Pakistani tailor USA, Pakistani tailor UK, Pakistani tailor Canada"
    h1="Online Tailor in Pakistan – Custom Stitching by MA Tailor"
    serviceName="Online Tailor in Pakistan"
    intro="MA Tailor is an online tailor based in Mahmoodabad, Karachi. Customers across Pakistan – and overseas in the UK, USA and Canada – send us their fabric, share measurements on WhatsApp and receive a custom-stitched outfit that fits. No shop visits, no guesswork: just clear communication with a master tailor from the first message to the final hand-over."
    highlights={[
      'Experienced Karachi master tailors for ladies wear',
      'Home pickup and drop inside Karachi',
      'Customers across Pakistan, UK, USA and Canada',
      'Guided measurements on WhatsApp or video call',
      'Shalwar kameez, gharara, sharara, lehenga, maxi and bridal',
      'Your size profile is saved for easy reorders',
    ]}
    sections={[
      {
        heading: 'Why Choose an Online Tailor in Pakistan',
        body: 'Finding a reliable tailor is hard, and visiting a shop two or three times for one suit takes time most people do not have. An online tailor removes those trips. With MA Tailor you talk directly to the person cutting your fabric, you share reference pictures of the design you want, and you get progress updates on WhatsApp. Pakistani stitching is known for neat finishing, careful necklines and well-balanced kameez lengths – we bring that same craft to you wherever you live.',
      },
      {
        heading: 'How It Works – 4 Simple Steps',
        body: '1. Message us on WhatsApp or use the booking form and tell us what you want stitched.\n2. Share your measurements using our measurement guide, or send a well-fitting outfit for reference.\n3. Send your fabric – in Karachi we collect it from your home; outside Karachi you send it through a courier of your choice.\n4. We confirm the design and final price, stitch your outfit, share photos, and hand it over for return delivery.',
      },
      {
        heading: 'Outfits We Stitch',
        body: 'Shalwar kameez, kurta sets, anarkali frocks, maxis, ghararas, shararas, lehengas, party wear, formal wear and bridal couture. Every piece is finished and checked before hand-over. Stitching prices shown on the site are only a guide – the final price is agreed once you share the stitching details such as cut, lining and hand work.',
      },
      {
        heading: 'Delivery and Payment Terms',
        body: 'Inside Karachi we offer home pickup and drop. For other cities and for overseas orders, the parcel is sent through a courier company chosen by the customer, and all courier, customs and duty charges until the parcel is received are paid by the customer. We do not quote delivery times or customs rules for other countries. Payment is accepted only through bank transfer or TapTap Send.',
      },
      {
        heading: 'Ready to Start?',
        body: 'Book your order online on the booking page, or browse all our tailoring services to choose your outfit. You can also message MA Tailor on WhatsApp for a free quote.',
      },
    ]}
    relatedServices={[
      { label: 'Book your order online', to: '/booking', description: 'Book home pickup in Karachi or start an order from anywhere.' },
      { label: 'All tailoring services', to: '/services', description: 'Stitching, alterations, bridal and formal wear in Karachi.' },
      { label: 'Custom bridal dress stitching', to: '/bridal-dress-stitching', description: 'Hand-finished lehengas, ghararas and walima maxis stitched for the big day.' },
      { label: 'Shalwar kameez stitching online', to: '/shalwar-kameez-stitching', description: 'Everyday and party shalwar kameez tailored to your exact measurements.' },
      { label: 'Online Tailor UK', to: '/online-tailor-uk', description: 'Custom stitching for UK customers with guide prices in GBP.' },
      { label: 'Online Tailor USA', to: '/online-tailor-usa', description: 'Custom Pakistani stitching for US customers with guide prices in USD.' },
      { label: 'Online Tailor Canada', to: '/online-tailor-canada', description: 'Custom stitching for Canadian customers with guide prices in CAD.' },
    ]}
    relatedReads={[
      { label: 'How to hire a Pakistani tailor online – 2026 guide', to: '/blog/how-to-hire-pakistani-tailor-online', description: 'Step-by-step guide to ordering custom stitching from overseas.' },
      { label: 'Shalwar kameez stitching: cuts, fabrics & fit guide', to: '/blog/shalwar-kameez-stitching-guide' },
      { label: 'Browse all tailoring tips', to: '/blog/category/tailoring-tips' },
    ]}
    faqs={[
      {
        q: 'How do I order from an online tailor in Pakistan?',
        a: 'Message MA Tailor on WhatsApp or fill in the booking form, share your design and measurements, and send your fabric. We confirm the details and final price before cutting, then stitch and hand over your outfit.',
      },
      {
        q: 'How do I take my measurements?',
        a: 'Use our illustrated measurement guide, send measurements from an outfit that already fits you well, or ask for a WhatsApp video call and our team will guide you through each measurement.',
      },
      {
        q: 'How is the parcel delivered outside Karachi or abroad?',
        a: 'Inside Karachi we provide home pickup and drop. Outside Karachi and overseas, the parcel is sent through a courier company chosen by you. All courier, customs and duty charges until the parcel is received are paid by the customer. We do not know the customs rules of other countries.',
      },
      {
        q: 'How much does stitching cost?',
        a: 'Prices shown on the website are for your idea only. The final stitching price is discussed and agreed once you share the stitching details such as cut, lining, finishing and hand work.',
      },
      {
        q: 'How can I pay?',
        a: 'Payment is accepted only through bank account transfer or TapTap Send.',
      },
      {
        q: 'Can I send my own fabric?',
        a: 'Yes. We stitch your fabric. In Karachi we can collect it from your home; from other cities or abroad you can send it through your chosen courier.',
      },
    ]}
  />
);

export default PakistaniTailorOnline;
