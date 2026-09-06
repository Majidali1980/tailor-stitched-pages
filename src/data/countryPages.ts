import { SITE_URL, STUDIO } from './karachiAreas';

export interface CountryFaq {
  q: string;
  a: string;
}

export interface CountryTestimonial {
  name: string;
  city: string;
  text: string;
}

export interface PriceRow {
  item: string;
  local: string;
  note: string;
}

export interface CountryPage {
  slug: string;
  country: string;
  countryCode: string;
  demonym: string;
  currencyCode: string;
  currencySymbol: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  h1: string;
  heroKicker: string;
  intro: string;
  /** How the finished parcel reaches the customer — courier chosen and paid for by the customer */
  delivery: {
    courierChoice: string;
    charges: string;
    customs: string;
    handover: string;
  };
  payments: string[];
  measurement: string[];
  prices: PriceRow[];
  sections: { heading: string; body: string }[];
  faqs: CountryFaq[];
  testimonials: CountryTestimonial[];
  cities: string[];
}

export const WHATSAPP_NUMBER = STUDIO.phone.replace('+', '');

const PAYMENTS = [
  'Direct bank transfer to our account (details shared on WhatsApp)',
  'TapTap Send transfer to our bank account',
  'Advance on confirmation, balance before the parcel is handed to your courier',
  'No cash on delivery and no other payment channels',
];

const sharedFaqTail = (country: string): CountryFaq[] => [
  {
    q: `How is my order delivered to ${country}?`,
    a: `You choose and arrange the courier service you prefer. We prepare and pack your finished order in Karachi and hand it over to the courier you nominate. We do not tie you to any single delivery company.`,
  },
  {
    q: 'Who pays for shipping, customs and duty?',
    a: 'The customer does. All courier charges, customs, duty, taxes and any handling fees from dispatch until the parcel reaches you are paid by the customer. Those amounts are set by your courier and your country\'s authorities, not by us.',
  },
  {
    q: 'Can you tell me the customs or duty I will pay?',
    a: 'No. We are a stitching studio in Karachi and we do not know the customs or duty rules that will apply in any country. Please check with your courier or local customs office before you order.',
  },
  {
    q: 'How much will delivery cost and how long will it take?',
    a: 'That depends entirely on the courier you choose. Your courier quotes the cost and the timeline directly to you; we only confirm when your order is stitched and ready for hand-over.',
  },
  {
    q: 'Are the prices on this page final?',
    a: 'No. The prices shown are only to give you an idea. The final price is discussed and confirmed once you share the stitching details — the cut, lining, hand work and finishing you want.',
  },
  {
    q: 'How do I pay?',
    a: 'Payment is accepted only by direct bank transfer to our account or through TapTap Send to the same account. We share the account details on WhatsApp once your order is confirmed.',
  },
];

export const COUNTRY_PAGES: Record<string, CountryPage> = {
  uk: {
    slug: 'online-tailor-uk',
    country: 'United Kingdom',
    countryCode: 'GB',
    demonym: 'British',
    currencyCode: 'GBP',
    currencySymbol: '£',
    metaTitle: 'Online Tailor UK — Pakistani Custom Stitching for UK Customers',
    metaDescription:
      'Online tailor for UK customers. Custom shalwar kameez, bridal and party stitching by Karachi master tailors. Send measurements from home, indicative GBP guide prices, courier of your choice.',
    metaKeywords:
      'online tailor for Pakistani clothes UK, Pakistani stitching UK, shalwar kameez stitching UK, Asian tailor online UK, bridal stitching London, custom stitching UK, Pakistani dressmaker Birmingham, ladies tailor online UK',
    h1: 'Online Tailor for the UK — Pakistani Custom Stitching from Karachi',
    heroKicker: 'Serving London · Birmingham · Manchester · Bradford · Glasgow',
    intro:
      'If your unstitched lawn and chiffon suits are sitting in the wardrobe, Ma Tailor stitches them properly in Karachi to the measurements you send from home. You approve the design on WhatsApp, we stitch and pack the finished order, and it is handed to the courier service you choose. Guide prices are shown in GBP so you know roughly what to expect before you ask for a firm quote.',
    delivery: {
      courierChoice:
        'You select the courier or delivery service you want to use. We simply prepare your parcel and hand it over to them in Karachi.',
      charges:
        'All courier charges, customs, duty, taxes and handling fees from dispatch until the parcel reaches you are borne by the customer.',
      customs:
        'We do not know the customs or duty rules that apply in the UK or anywhere else. Please confirm those with your courier or local customs office before ordering.',
      handover:
        'We message you on WhatsApp the moment your order is stitched, checked and ready for hand-over, so you can arrange collection whenever it suits you.',
    },
    payments: PAYMENTS,
    measurement: [
      'Measure a shalwar kameez you already love — lay it flat and note kameez length, chest, shoulder, sleeve and trouser length.',
      'Or follow our illustrated measurement guide if you are starting from body measurements.',
      'Book a free WhatsApp video call — UK evenings work fine, we schedule around GMT/BST.',
      'Repeat customers skip this entirely: we keep your size profile on file.',
    ],
    prices: [
      { item: 'Everyday shalwar kameez stitching', local: '£18 – £28', note: 'Guide only — labour, your fabric' },
      { item: 'Party wear / embroidered formal', local: '£45 – £90', note: 'Guide only — depends on hand work' },
      { item: 'Bridal lehenga or gharara', local: '£220+', note: 'Guide only — quoted after design review' },
      { item: 'Alterations on an existing outfit', local: '£12 – £25', note: 'Guide only — depends on the work needed' },
    ],
    sections: [
      {
        heading: 'Why British-Pakistani families order stitching from Karachi',
        body: 'Most UK high-street Asian tailors charge £40–£60 for a plain suit and still queue your order behind wedding season. Ordering direct from our Karachi studio cuts that cost sharply, and you get master tailors who cut Pakistani silhouettes every single day — proper kalidar cuts, correct daman flare, and lining that does not go see-through under UK indoor lighting.',
      },
      {
        heading: 'Sending your fabric from the UK',
        body: 'Plenty of our UK customers send their unstitched lawn, chiffon or organza to our Karachi address in one batch — several suits together keeps their own courier cost sensible. We stitch them all, photograph each piece, and hand the finished lot back to the courier you nominate. If you would rather not send anything, we can source fabric from Karachi markets and share photos before cutting.',
      },
      {
        heading: 'Wedding and Eid season planning',
        body: 'UK wedding orders should be discussed well ahead — mehndi, barat and walima outfits all need fittings by photo, and heavy embroidery cannot be rushed. Message us with your event date and we will tell you honestly whether the stitching can be completed comfortably in time.',
      },
      {
        heading: 'How pricing is agreed',
        body: 'The figures on this page are indicative only. Once you share your stitching details — the cut, the lining, the finishing, any hand embroidery or piping — we confirm an exact price on WhatsApp before any work starts. Payment is made by bank transfer or TapTap Send to our account.',
      },
    ],
    faqs: [
      {
        q: 'Do you take orders from the UK?',
        a: 'Yes. We stitch for customers across England, Scotland, Wales and Northern Ireland. Everything is arranged over WhatsApp, from measurements to design approval.',
      },
      {
        q: 'How do I get measured if I am not in Pakistan?',
        a: 'Three ways: send the measurements of an outfit that already fits, follow our illustrated measurement guide, or book a free WhatsApp video call. UK evening slots are available.',
      },
      ...sharedFaqTail('the UK'),
      {
        q: 'What if the fit is not right when it arrives?',
        a: 'Send us photos wearing the outfit. Minor adjustments are usually a quick job at any local tailor. For anything structural we re-stitch the piece; any courier charges involved remain with the customer.',
      },
    ],
    testimonials: [
      { name: 'Sana H.', city: 'Manchester', text: 'Sent five unstitched suits over and got them all back stitched beautifully. Fit was better than the tailor I used on Wilmslow Road.' },
      { name: 'Ayesha K.', city: 'London', text: 'My walima gharara was stitched from photos and a video call. It fitted first time — I only had to steam it before the event.' },
    ],
    cities: ['London', 'Birmingham', 'Manchester', 'Bradford', 'Leeds', 'Luton', 'Glasgow'],
  },

  usa: {
    slug: 'online-tailor-usa',
    country: 'United States',
    countryCode: 'US',
    demonym: 'American',
    currencyCode: 'USD',
    currencySymbol: '$',
    metaTitle: 'Custom Shalwar Kameez Stitching for USA | Online Pakistani Tailor',
    metaDescription:
      'Order custom shalwar kameez, bridal and party wear stitched in Pakistan for USA customers. Remote measurements over WhatsApp, indicative USD guide prices, courier of your choice.',
    metaKeywords:
      'custom shalwar kameez stitching USA, Pakistani tailor online USA, desi stitching service America, Pakistani clothes stitching New York, online tailor Houston, Pakistani tailor Chicago, ladies tailor online USA',
    h1: 'Custom Shalwar Kameez & Pakistani Stitching for the USA',
    heroKicker: 'For customers in New York · Houston · Chicago · Dallas · Bay Area',
    intro:
      'Ma Tailor stitches Pakistani and South Asian outfits to your exact measurements in Karachi for customers across the United States. You never need to find a desi tailor in your city or wait for someone travelling to Pakistan. Send your measurements once, approve the design on WhatsApp, and we hand the finished order to the courier you choose. USD figures on this page are a guide to help you plan.',
    delivery: {
      courierChoice:
        'The courier or delivery service is chosen and booked by you. We pack your finished order in Karachi and hand it over to whichever company you nominate.',
      charges:
        'Every courier charge, customs payment, duty, tax and handling fee from dispatch until the parcel reaches you is paid by the customer.',
      customs:
        'We cannot advise on US customs or duty — those rules are outside our knowledge. Please check with your courier or local customs authority before placing an order.',
      handover:
        'You get a WhatsApp message with photos as soon as your order is stitched, checked and packed, ready for your courier to collect.',
    },
    payments: PAYMENTS,
    measurement: [
      'Send us nothing: measure a kurta or dress that fits you well and share the numbers in inches.',
      'Follow our step-by-step measurement guide with photos of each measuring point.',
      'Book a WhatsApp video fitting — we schedule around EST, CST and PST evenings.',
      'Ordering for a family? Send one profile per person and we store them all.',
    ],
    prices: [
      { item: 'Everyday shalwar kameez stitching', local: '$25 – $38', note: 'Guide only — labour, your fabric' },
      { item: 'Party wear / embroidered formal', local: '$60 – $120', note: 'Guide only — depends on hand work' },
      { item: 'Bridal lehenga or gharara', local: '$290+', note: 'Guide only — quoted after design review' },
      { item: 'Alterations and resizing', local: '$16 – $32', note: 'Guide only — depends on the work needed' },
    ],
    sections: [
      {
        heading: 'Why US customers order stitching from Pakistan',
        body: 'A single stitched suit at a US desi boutique typically runs $80–$150, and the cut is often a generic ready-made block. Our Karachi tailors work from your own measurements, use proper Pakistani-market lining and finishing, and cost a fraction of that. For families ordering several outfits for a wedding, the saving is substantial.',
      },
      {
        heading: 'Sending fabric from the USA',
        body: 'Many US customers buy unstitched lawn from Pakistani brands during sale season and have it sent straight to our Karachi studio, which skips one leg entirely. Share the tracking number and we stitch as soon as it lands. Alternatively we source fabric in Karachi and send photos and close-ups for approval before cutting.',
      },
      {
        heading: 'Planning around weddings and Eid',
        body: 'Bridal and mehndi outfits need hand embroidery and several photo fittings, so tell us your event date early. We will confirm honestly whether the stitching can be completed in comfort, and you can plan your own courier arrangements around the ready date we give you.',
      },
      {
        heading: 'How pricing is agreed',
        body: 'Everything shown here is indicative. Share your stitching details — cut, lining, finishing, embroidery — and we confirm the exact price on WhatsApp before starting. Payment is by bank transfer or TapTap Send to our account only.',
      },
    ],
    faqs: [
      {
        q: 'Do you take orders from the USA?',
        a: 'Yes, from customers in all 50 states. Measurements, design approval and quotes are all handled over WhatsApp.',
      },
      {
        q: 'How do I get measured if I am not in Pakistan?',
        a: 'Measure an outfit that already fits and send the numbers in inches, use our illustrated guide, or book a free WhatsApp video call. We schedule calls for US evenings across all four time zones.',
      },
      ...sharedFaqTail('the USA'),
      {
        q: 'Can you stitch Indian-style suits and lehengas too?',
        a: 'Yes. Anarkalis, indo-western gowns, saree blouses and lehenga cholis are all part of our regular work alongside Pakistani cuts.',
      },
    ],
    testimonials: [
      { name: 'Hina R.', city: 'Houston, TX', text: 'Sent measurements over WhatsApp on a Sunday and had four suits stitched exactly as I asked. The lining and finishing are far better than what I was buying locally.' },
      { name: 'Maryam S.', city: 'New Jersey', text: 'Ordered mehndi outfits for three of us. They kept our profiles on file, so the second order needed one message.' },
    ],
    cities: ['New York', 'Houston', 'Chicago', 'Dallas', 'Los Angeles', 'Atlanta', 'Bay Area'],
  },

  canada: {
    slug: 'online-tailor-canada',
    country: 'Canada',
    countryCode: 'CA',
    demonym: 'Canadian',
    currencyCode: 'CAD',
    currencySymbol: 'C$',
    metaTitle: 'Pakistani Tailor Online Canada — Custom Stitching from Karachi',
    metaDescription:
      'Pakistani tailor online for Canada. Custom shalwar kameez, bridal and party stitching for Toronto, Mississauga, Calgary and Vancouver. Remote measurements, indicative CAD guide prices.',
    metaKeywords:
      'Pakistani tailor online Canada, stitching services Toronto, shalwar kameez stitching Mississauga, desi tailor Calgary, Pakistani dress stitching Vancouver, custom stitching Canada, ladies tailor online Canada',
    h1: 'Pakistani Tailor Online for Canada — Stitched in Karachi',
    heroKicker: 'Toronto · Mississauga · Brampton · Calgary · Vancouver · Montreal',
    intro:
      'Canada has a large South Asian community and a shortage of tailors who can cut a proper Pakistani silhouette without a long queue. Ma Tailor solves that remotely: send your measurements once, choose your design over WhatsApp, and we stitch in Karachi and hand the finished order to the courier you select. CAD figures here are a guide for planning.',
    delivery: {
      courierChoice:
        'You decide which courier or delivery service carries your order. We pack it in Karachi and hand it to the company you nominate.',
      charges:
        'All courier fees, customs, duty, taxes and handling charges from dispatch until you receive the parcel are the customer\'s responsibility.',
      customs:
        'We do not know Canadian customs or duty rules and cannot estimate them. Please confirm with your courier or the relevant authority before ordering.',
      handover:
        'We send WhatsApp photos of the finished outfit and confirm the day it is packed and ready for your courier to collect.',
    },
    payments: PAYMENTS,
    measurement: [
      'Send the flat measurements of a kurta that already fits — the fastest and most accurate option.',
      'Use our illustrated measurement guide covering all 14 points we need.',
      'Book a WhatsApp video fitting; we run calls in Canadian evenings across ET, MT and PT.',
      'Winter note: tell us if you want slightly roomier sleeves for layering — we adjust ease accordingly.',
    ],
    prices: [
      { item: 'Everyday shalwar kameez stitching', local: 'C$34 – C$52', note: 'Guide only — labour, your fabric' },
      { item: 'Party wear / embroidered formal', local: 'C$82 – C$165', note: 'Guide only — depends on hand work' },
      { item: 'Bridal lehenga or gharara', local: 'C$400+', note: 'Guide only — quoted after design review' },
      { item: 'Alterations and resizing', local: 'C$22 – C$44', note: 'Guide only — depends on the work needed' },
    ],
    sections: [
      {
        heading: 'Built for the GTA and beyond',
        body: 'Most of our Canadian orders come from Mississauga, Brampton and Scarborough, where tailoring demand spikes every wedding season and local turnaround stretches past a month. Ordering direct from Karachi bypasses that queue completely — your outfit is cut the week you confirm measurements, not whenever a slot opens.',
      },
      {
        heading: 'Fabric options for Canadian customers',
        body: 'Lightweight lawn works beautifully for Canadian summers and indoor events, but for winter functions we suggest heavier khaddar, linen or a lined velvet kameez. Tell us the season and venue and we recommend fabric weight and lining before cutting — a detail most online stitching services skip.',
      },
      {
        heading: 'Group and family orders',
        body: 'Sending several outfits together keeps your own courier cost per item much lower, which is why most Canadian families batch their wedding orders with us. We stitch the whole set together for colour consistency and pack it as one consignment.',
      },
      {
        heading: 'How pricing is agreed',
        body: 'Treat the table above as a rough idea only. Once you share the stitching details you want, we confirm the exact price on WhatsApp before work begins. Payment is accepted only by bank transfer or TapTap Send to our account.',
      },
    ],
    faqs: [
      {
        q: 'Do you take orders from Canada?',
        a: 'Yes, from every province and territory. Measurements, design approval and quotes are handled over WhatsApp.',
      },
      {
        q: 'How do I get measured if I am not in Pakistan?',
        a: 'Send flat measurements from an outfit that fits, follow our illustrated guide, or book a free WhatsApp video fitting scheduled for Canadian evening hours.',
      },
      ...sharedFaqTail('Canada'),
      {
        q: 'Can I send fabric I bought in Toronto?',
        a: 'Yes. Send it to our Karachi studio using any courier you prefer — batching several suits keeps your cost down — and we stitch on a labour-only basis.',
      },
    ],
    testimonials: [
      { name: 'Fatima A.', city: 'Mississauga, ON', text: 'Every tailor here quoted six weeks before my cousin\'s wedding. Ma Tailor had three outfits stitched and ready long before that.' },
      { name: 'Zoya M.', city: 'Calgary, AB', text: 'They suggested a lined kameez because the wedding was in February. Small thing, but nobody else asked.' },
    ],
    cities: ['Toronto', 'Mississauga', 'Brampton', 'Calgary', 'Edmonton', 'Vancouver', 'Montreal'],
  },
};

export const COUNTRY_LIST = Object.entries(COUNTRY_PAGES).map(([key, c]) => ({
  key,
  slug: c.slug,
  country: c.country,
  countryCode: c.countryCode,
  currencyCode: c.currencyCode,
}));

export const COUNTRY_URL = (slug: string) => `${SITE_URL}/${slug}`;
