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
  /** Approximate PKR per 1 unit of local currency — used only for indicative guide pricing */
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  h1: string;
  heroKicker: string;
  intro: string;
  /** Country-specific delivery detail */
  shipping: {
    courier: string;
    time: string;
    cost: string;
    duty: string;
  };
  turnaround: string;
  payments: string[];
  measurement: string[];
  prices: PriceRow[];
  sections: { heading: string; body: string }[];
  faqs: CountryFaq[];
  testimonials: CountryTestimonial[];
  cities: string[];
}

export const WHATSAPP_NUMBER = STUDIO.phone.replace('+', '');

export const COUNTRY_PAGES: Record<string, CountryPage> = {
  uk: {
    slug: 'online-tailor-uk',
    country: 'United Kingdom',
    countryCode: 'GB',
    demonym: 'British',
    currencyCode: 'GBP',
    currencySymbol: '£',
    metaTitle: 'Online Tailor UK — Custom Stitching for Pakistani Clothes Delivered',
    metaDescription:
      'Custom stitching & online tailoring delivered to the UK. Send measurements from home, pay in GBP, and get shalwar kameez, bridal and party wear posted to your door in 2–3 weeks.',
    metaKeywords:
      'online tailor for Pakistani clothes UK, Pakistani stitching UK, shalwar kameez stitching UK, Asian tailor online UK, bridal stitching London, custom stitching delivered UK, Pakistani dressmaker Birmingham',
    h1: 'Custom Stitching & Online Tailoring Delivered to the UK',
    heroKicker: 'Serving London · Birmingham · Manchester · Bradford · Glasgow',
    intro:
      'If you are in the UK and tired of unstitched lawn suits sitting in the wardrobe, Ma Tailor stitches them for you in Karachi and posts the finished outfit to your address. You send measurements from home, we confirm the design on WhatsApp, and your parcel arrives tracked through Royal Mail after DHL clears customs. Prices are quoted in GBP so there are no exchange-rate surprises.',
    shipping: {
      courier: 'DHL Express or Royal Mail tracked hand-off',
      time: '4–7 working days after dispatch',
      cost: 'From £14 for one to two outfits, £22–£30 for a heavier bridal parcel',
      duty:
        'UK customs applies VAT (and sometimes a small duty) on parcels valued over £135. We declare accurately and send the invoice with the parcel so nothing is held up at the border.',
    },
    turnaround: '10–14 working days stitching + 4–7 days delivery — roughly 3 weeks door to door.',
    payments: [
      'Bank transfer to a UK-friendly account (Wise, Remitly)',
      'Debit/credit card payment link in GBP',
      'PayPal for first-time customers who want buyer protection',
      'Half now, half before dispatch on bridal orders',
    ],
    measurement: [
      'Measure a shalwar kameez you already love — lay it flat, note kameez length, chest, shoulder, sleeve and trouser length, and send us the numbers.',
      'Use our illustrated measurement guide if you are starting from body measurements.',
      'Book a free WhatsApp video call — evenings UK time work fine, we schedule around GMT/BST.',
      'Repeat customers skip this entirely: we keep your size profile on file.',
    ],
    prices: [
      { item: 'Everyday shalwar kameez stitching', local: '£18 – £28', note: 'Labour only, your fabric' },
      { item: 'Party wear / embroidered formal', local: '£45 – £90', note: 'Lining and finishing included' },
      { item: 'Bridal lehenga or gharara', local: '£220+', note: 'Quote after design review' },
      { item: 'Alterations on an existing outfit', local: '£12 – £25', note: 'Posted back tracked' },
    ],
    sections: [
      {
        heading: 'Why British-Pakistani families order stitching from Karachi',
        body: 'Most UK high-street Asian tailors charge £40–£60 for a plain suit and still queue your order behind wedding season. Ordering direct from our Karachi studio cuts that cost roughly in half, and you get master tailors who cut Pakistani silhouettes every single day — proper kalidar cuts, correct daman flare, and lining that does not go see-through under UK indoor lighting.',
      },
      {
        heading: 'Sending your fabric from the UK',
        body: 'Plenty of our UK customers post their unstitched lawn, chiffon or organza to our Karachi address in one batch — four or five suits in a single parcel keeps the shipping economical. We stitch them all, photograph each piece, then send the finished lot back together. If you would rather not post anything, we can source fabric from Karachi markets and send you photos before cutting.',
      },
      {
        heading: 'Wedding and Eid season planning',
        body: 'UK wedding orders should be placed 6–8 weeks ahead — mehndi, barat and walima outfits all need fittings by photo, and heavy embroidery cannot be rushed. For Eid, place orders three weeks before the moon sighting; the last week before Eid is when Karachi couriers are at their slowest.',
      },
    ],
    faqs: [
      {
        q: 'Do you ship to the UK?',
        a: 'Yes. We ship to every UK postcode including Scotland, Wales and Northern Ireland via DHL Express, with a tracking number sent on WhatsApp the day your parcel leaves Karachi.',
      },
      {
        q: 'How do I get measured if I am not in Pakistan?',
        a: 'Three ways: send the measurements of an outfit that already fits, follow our illustrated measurement guide, or book a free WhatsApp video call where our team walks you through each measurement. UK evening slots are available.',
      },
      {
        q: 'What is the delivery time to the UK?',
        a: 'Stitching takes 10–14 working days, then 4–7 working days in transit. Most UK orders land within three weeks of confirming measurements. Bridal work adds two more weeks.',
      },
      {
        q: 'Will I be charged customs or VAT?',
        a: 'Parcels valued over £135 attract UK VAT and occasionally duty, collected by the courier before delivery. We declare the value honestly and include the invoice, which keeps clearance quick.',
      },
      {
        q: 'How do I pay from the UK?',
        a: 'Bank transfer via Wise or Remitly, a GBP card payment link, or PayPal. Bridal orders can be split 50% at booking and 50% before dispatch.',
      },
      {
        q: 'What if the fit is not right when it arrives?',
        a: 'Send us photos wearing the outfit. Minor adjustments are usually a 20-minute job at any local UK tailor and we cover up to £15 of that cost. For anything structural we re-stitch and share the return shipping.',
      },
    ],
    testimonials: [
      { name: 'Sana H.', city: 'Manchester', text: 'Posted five unstitched suits over and got them all back in three weeks. Fit was better than the tailor I used on Wilmslow Road, and half the price.' },
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
    metaTitle: 'Custom Shalwar Kameez Stitching with USA Delivery | Online Tailor',
    metaDescription:
      'Order custom shalwar kameez, bridal and party wear stitched in Pakistan and shipped to the USA. Remote measurements, USD pricing, DHL delivery in 5–8 days.',
    metaKeywords:
      'custom shalwar kameez stitching USA delivery, Pakistani tailor online USA, desi stitching service America, Pakistani clothes stitching New York, online tailor Houston, Indian Pakistani tailor Chicago',
    h1: 'Custom Shalwar Kameez & Pakistani Stitching Shipped to the USA',
    heroKicker: 'Shipping to New York · Houston · Chicago · Dallas · Bay Area',
    intro:
      'Ma Tailor stitches Pakistani and South Asian outfits to your exact measurements in Karachi and ships them to any US address. You never need to find a desi tailor in your city, drive across town for a fitting, or wait for someone visiting Pakistan to carry your suits. Send measurements once, approve the design on WhatsApp, and pay in USD.',
    shipping: {
      courier: 'DHL Express or FedEx International Priority',
      time: '5–8 working days after dispatch, coast to coast',
      cost: 'From $22 for one to two outfits; $35–$55 for bridal parcels',
      duty:
        'The US de minimis threshold means most personal garment parcels under $800 clear without duty. Above that, the courier collects duty at delivery and we provide the itemised invoice.',
    },
    turnaround: '10–14 working days stitching + 5–8 days shipping — about 3 to 3.5 weeks total.',
    payments: [
      'Zelle or bank transfer to a US-accessible account',
      'USD card payment link',
      'PayPal (buyer protection included)',
      'Wise transfer at the mid-market rate',
    ],
    measurement: [
      'Ship us nothing: measure a kurta or dress that fits you well and send the numbers in inches.',
      'Follow our step-by-step measurement guide with photos of each measuring point.',
      'Book a WhatsApp video fitting — we schedule around EST, CST and PST evenings.',
      'Ordering for a family? Send one profile per person and we store them all.',
    ],
    prices: [
      { item: 'Everyday shalwar kameez stitching', local: '$25 – $38', note: 'Labour only, your fabric' },
      { item: 'Party wear / embroidered formal', local: '$60 – $120', note: 'Full lining and finishing' },
      { item: 'Bridal lehenga or gharara', local: '$290+', note: 'Quote after design review' },
      { item: 'Alterations and resizing', local: '$16 – $32', note: 'Return shipping extra' },
    ],
    sections: [
      {
        heading: 'Why US customers order stitching from Pakistan',
        body: 'A single stitched suit at a US desi boutique typically runs $80–$150, and the cut is often a generic ready-made block. Our Karachi tailors work from your own measurements, use Pakistani-market lining and finishing, and cost a fraction of that even after international shipping. For families ordering three or four outfits for a wedding, the saving usually pays for the whole shipping bill several times over.',
      },
      {
        heading: 'Sending fabric from the USA',
        body: 'Many US customers buy unstitched lawn from Pakistani brands during sale season and have it drop-shipped straight to our Karachi studio — that skips one international leg entirely. Send us the tracking number, and we stitch as soon as it lands. Alternatively we source fabric in Karachi and send photos and close-ups for approval before cutting.',
      },
      {
        heading: 'Planning around US wedding and Eid dates',
        body: 'Book bridal and mehndi outfits 8 weeks out — hand embroidery, multiple photo fittings and customs clearance all need buffer. For Eid and Ramadan orders, we recommend confirming measurements a month ahead because Karachi courier volumes spike in the final ten days.',
      },
    ],
    faqs: [
      {
        q: 'Do you ship to the USA?',
        a: 'Yes, to all 50 states plus Puerto Rico via DHL Express or FedEx. You get a tracking number on WhatsApp as soon as the parcel is dispatched from Karachi.',
      },
      {
        q: 'How do I get measured if I am not in Pakistan?',
        a: 'Measure an outfit that already fits and send the numbers in inches, use our illustrated guide, or book a free WhatsApp video call. We schedule calls for US evenings across all four time zones.',
      },
      {
        q: 'What is the delivery time to the USA?',
        a: 'Roughly three weeks door to door: 10–14 working days stitching plus 5–8 working days in transit. Bridal orders take 4–6 weeks total.',
      },
      {
        q: 'Will I pay customs duty in the US?',
        a: 'Most personal parcels under $800 clear duty-free. Larger bridal orders may attract duty collected by the courier; we always include an accurate itemised invoice.',
      },
      {
        q: 'How can I pay from the United States?',
        a: 'Zelle, USD card payment link, PayPal or a Wise transfer. Bridal orders can be split into a booking deposit and a pre-dispatch balance.',
      },
      {
        q: 'Can you stitch Indian-style suits and lehengas too?',
        a: 'Yes. Anarkalis, Indo-western gowns, saree blouses and lehenga cholis are all part of our regular work alongside Pakistani cuts.',
      },
    ],
    testimonials: [
      { name: 'Hina R.', city: 'Houston, TX', text: 'Sent measurements over WhatsApp on a Sunday and had four stitched suits in Houston twenty-two days later. The lining and finishing are far better than what I was buying locally.' },
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
    metaTitle: 'Pakistani Tailor Online Canada — Custom Stitching Shipped to You',
    metaDescription:
      'Pakistani tailor online for Canada. Custom shalwar kameez, bridal and party stitching sent to Toronto, Mississauga, Calgary and Vancouver. CAD pricing, remote measurements.',
    metaKeywords:
      'Pakistani tailor online Canada, stitching services Toronto, shalwar kameez stitching Mississauga, desi tailor Calgary, Pakistani dress stitching Vancouver, custom stitching shipped Canada',
    h1: 'Pakistani Tailor Online for Canada — Stitched in Karachi, Delivered to You',
    heroKicker: 'Toronto · Mississauga · Brampton · Calgary · Vancouver · Montreal',
    intro:
      'Canada has a huge South Asian community and a shortage of tailors who can cut a proper Pakistani silhouette without a six-week queue. Ma Tailor solves that remotely: submit your measurements once, choose your design over WhatsApp, and we stitch in Karachi and courier the finished outfit to your Canadian address with pricing quoted in CAD.',
    shipping: {
      courier: 'DHL Express, handed to Canada Post for remote postal codes',
      time: '5–9 working days after dispatch',
      cost: 'From C$30 for one to two outfits; C$45–C$70 for bridal parcels',
      duty:
        'CBSA charges GST/HST (and occasionally duty) on garment parcels above C$20 — realistically most orders. The courier collects it at delivery; budget roughly 13–15% of the declared value in Ontario.',
    },
    turnaround: '10–14 working days stitching + 5–9 days shipping — around 3 to 3.5 weeks in total.',
    payments: [
      'Interac e-Transfer via a Canadian contact',
      'CAD card payment link',
      'Wise or Remitly bank transfer',
      'PayPal for first orders',
    ],
    measurement: [
      'Send the flat measurements of a kurta that already fits — the fastest and most accurate option.',
      'Use our illustrated measurement guide covering all 14 points we need.',
      'Book a WhatsApp video fitting; we run calls in Canadian evenings across ET, MT and PT.',
      'Winter note: tell us if you want slightly roomier sleeves for layering — we adjust ease accordingly.',
    ],
    prices: [
      { item: 'Everyday shalwar kameez stitching', local: 'C$34 – C$52', note: 'Labour only, your fabric' },
      { item: 'Party wear / embroidered formal', local: 'C$82 – C$165', note: 'Lining and finishing included' },
      { item: 'Bridal lehenga or gharara', local: 'C$400+', note: 'Quote after design review' },
      { item: 'Alterations and resizing', local: 'C$22 – C$44', note: 'Return shipping extra' },
    ],
    sections: [
      {
        heading: 'Built for the GTA and beyond',
        body: 'Most of our Canadian orders come from Mississauga, Brampton and Scarborough, where tailoring demand spikes every wedding season and turnaround stretches past a month. Ordering direct from Karachi bypasses that queue completely — your outfit is cut the week you confirm measurements, not whenever a slot opens.',
      },
      {
        heading: 'Fabric options for Canadian customers',
        body: 'Lightweight lawn works beautifully for Canadian summers and indoor events, but for winter functions we suggest heavier khaddar, linen or a lined velvet kameez. Tell us the season and venue and we recommend fabric weight and lining before cutting — an important detail most online stitching services skip.',
      },
      {
        heading: 'Group and family orders',
        body: 'Sending four to six outfits in one parcel makes the per-item shipping cost drop sharply, which is why most Canadian families batch their wedding orders with us. We stitch the whole set together for colour consistency and ship as a single tracked consignment.',
      },
    ],
    faqs: [
      {
        q: 'Do you ship to Canada?',
        a: 'Yes, to every province and territory. DHL Express handles the main route and hands off to Canada Post for remote postal codes.',
      },
      {
        q: 'How do I get measured if I am not in Pakistan?',
        a: 'Send flat measurements from an outfit that fits, follow our illustrated guide, or book a free WhatsApp video fitting scheduled for Canadian evening hours.',
      },
      {
        q: 'What is the delivery time to Canada?',
        a: 'About three weeks total: 10–14 working days of stitching plus 5–9 working days in transit. Winter storms occasionally add a day or two on the final leg.',
      },
      {
        q: 'Will I pay GST/HST or duty?',
        a: 'Yes, CBSA applies GST/HST on most imported garment parcels and the courier collects it on delivery. Budget roughly 13–15% of declared value in Ontario, less in provinces with GST only.',
      },
      {
        q: 'How do I pay from Canada?',
        a: 'Interac e-Transfer, a CAD card payment link, Wise/Remitly transfer, or PayPal. Bridal orders can be split into a deposit and a pre-dispatch balance.',
      },
      {
        q: 'Can I send fabric I bought in Toronto?',
        a: 'Yes. Courier it to our Karachi studio — batch several suits together to keep the cost down — and we stitch on a labour-only basis and ship the finished set back.',
      },
    ],
    testimonials: [
      { name: 'Fatima A.', city: 'Mississauga, ON', text: 'Every tailor here quoted six weeks before my cousin\'s wedding. Ma Tailor delivered three outfits to Mississauga in twenty-four days.' },
      { name: 'Zoya M.', city: 'Calgary, AB', text: 'They suggested a lined kameez because the wedding was in February. Small thing, but nobody else asked.' },
    ],
    cities: ['Toronto', 'Mississauga', 'Brampton', 'Calgary', 'Edmonton', 'Vancouver', 'Montreal'],
  },

  india: {
    slug: 'online-tailor-india',
    country: 'India',
    countryCode: 'IN',
    demonym: 'Indian',
    currencyCode: 'INR',
    currencySymbol: '₹',
    metaTitle: 'Indian Suit Stitching Online — Custom Salwar Kameez & Lehenga Tailoring',
    metaDescription:
      'Indian suit stitching online with custom measurements. Anarkali, salwar kameez, lehenga and blouse tailoring by master tailors, priced in INR with tracked delivery.',
    metaKeywords:
      'Indian suit stitching online, online tailor India, salwar suit stitching online, lehenga stitching online India, blouse stitching online, custom anarkali tailoring India',
    h1: 'Indian Suit Stitching Online — Anarkali, Salwar Kameez & Lehenga',
    heroKicker: 'Anarkali · Salwar suits · Lehenga choli · Saree blouses · Indo-western',
    intro:
      'Ma Tailor stitches Indian and South Asian silhouettes to order — anarkali frocks, straight-cut salwar suits, lehenga cholis, saree blouses and indo-western gowns — all cut to the measurements you send from home. Indicative pricing is shown in INR, work is confirmed over WhatsApp with photos at every stage, and finished orders travel by tracked international courier.',
    shipping: {
      courier: 'Tracked international courier (DHL/Aramex) with local last-mile delivery',
      time: '7–12 working days after dispatch',
      cost: 'From ₹2,200 per parcel; heavier bridal consignments quoted on request',
      duty:
        'Indian customs assesses duty and IGST on imported garments; the courier collects it at delivery. We declare accurately and share the invoice so clearance is not delayed. Ask us for a landed-cost estimate before you confirm.',
    },
    turnaround: '10–14 working days stitching + 7–12 days delivery, so plan on about four weeks.',
    payments: [
      'International bank transfer (SWIFT)',
      'Wise transfer in INR',
      'Card payment link',
      'Deposit plus balance-before-dispatch on bridal work',
    ],
    measurement: [
      'Send flat measurements from a kurta or blouse that fits you well — in inches, with the neckline depth noted separately.',
      'Follow our illustrated measurement guide, which covers blouse-specific points like armhole and back depth.',
      'Book a free WhatsApp video call in IST evening hours and we measure with you live.',
      'For blouses, tell us padded or non-padded, and the saree fabric weight — it changes the fit.',
    ],
    prices: [
      { item: 'Salwar kameez / kurta set stitching', local: '₹2,000 – ₹3,200', note: 'Labour only, your fabric' },
      { item: 'Anarkali or embroidered formal', local: '₹5,500 – ₹11,000', note: 'Lining and finishing included' },
      { item: 'Lehenga choli (bridal)', local: '₹26,000+', note: 'Quote after design review' },
      { item: 'Saree blouse stitching', local: '₹1,400 – ₹2,600', note: 'Padded or lined options' },
    ],
    sections: [
      {
        heading: 'Indian cuts, stitched properly',
        body: 'Indian and Pakistani silhouettes are not interchangeable — an anarkali needs more kali panels and a higher waist seam than a Pakistani frock, a saree blouse needs precise armhole and back-depth work, and a lehenga waistband must sit without a belt. Our tailors cut all of these regularly, so you are not asking a generalist to improvise.',
      },
      {
        heading: 'Fabric: send yours or let us source it',
        body: 'You can courier your own fabric to our studio, or we source georgette, chinon, raw silk, velvet or net from wholesale markets and send you photos and swatch close-ups before cutting. Fabric cost is quoted separately from stitching so you always know what you are paying for.',
      },
      {
        heading: 'Photo fittings before dispatch',
        body: 'Every order gets a photo review on the mannequin before finishing. For structured pieces like blouses and lehenga tops we send interim shots at the toile stage so adjustments happen before the final stitch, not after delivery.',
      },
    ],
    faqs: [
      {
        q: 'Do you ship to India?',
        a: 'Yes, we ship to all major Indian cities and most PIN codes via tracked international courier with local last-mile delivery. Customs duty and IGST are payable on arrival.',
      },
      {
        q: 'How do I get measured if I am not in Pakistan?',
        a: 'Send flat measurements from a kurta or blouse that fits, use our illustrated measurement guide, or book a free WhatsApp video call during IST evenings.',
      },
      {
        q: 'What is the delivery time to India?',
        a: 'Around four weeks: 10–14 working days of stitching plus 7–12 working days for courier transit and customs clearance.',
      },
      {
        q: 'What will customs cost me?',
        a: 'Imported garments attract duty plus IGST, collected by the courier at delivery. Message us before you confirm and we will give you a landed-cost estimate for your order value.',
      },
      {
        q: 'Do you stitch saree blouses and lehengas, not just Pakistani suits?',
        a: 'Yes. Saree blouses, lehenga cholis, anarkalis and indo-western gowns are core work for us, with the fit details each style needs.',
      },
      {
        q: 'How do I pay from India?',
        a: 'International bank transfer, Wise in INR, or a card payment link. Bridal orders are split into a booking deposit and a balance before dispatch.',
      },
    ],
    testimonials: [
      { name: 'Priya N.', city: 'Dubai (from Mumbai)', text: 'They asked about my saree fabric weight before cutting the blouse. The armhole was right first time.' },
      { name: 'Rukhsar J.', city: 'Hyderabad', text: 'Anarkali arrived with the kali flare exactly as in the reference photo I sent.' },
    ],
    cities: ['Mumbai', 'Delhi', 'Hyderabad', 'Bengaluru', 'Lucknow', 'Kolkata', 'Ahmedabad'],
  },

  bangladesh: {
    slug: 'online-tailor-bangladesh',
    country: 'Bangladesh',
    countryCode: 'BD',
    demonym: 'Bangladeshi',
    currencyCode: 'BDT',
    currencySymbol: '৳',
    metaTitle: 'Bespoke South Asian Tailoring Bangladesh — Online Custom Stitching',
    metaDescription:
      'Bespoke South Asian tailoring for Bangladesh. Custom salwar kameez, kurti, gown and bridal stitching to your measurements, priced in BDT with tracked delivery to Dhaka and beyond.',
    metaKeywords:
      'bespoke South Asian tailoring Bangladesh, online tailor Dhaka, salwar kameez stitching Bangladesh, custom stitching Chittagong, bridal stitching Dhaka online, kurti stitching online Bangladesh',
    h1: 'Bespoke South Asian Tailoring for Bangladesh',
    heroKicker: 'Dhaka · Chattogram · Sylhet · Khulna · Rajshahi',
    intro:
      'Ma Tailor offers made-to-measure South Asian tailoring for customers in Bangladesh — salwar kameez, kurtis, gowns, party wear and bridal outfits cut to your own measurements by Karachi master tailors. Everything is arranged over WhatsApp, indicative pricing is shown in BDT, and finished orders arrive by tracked courier.',
    shipping: {
      courier: 'Tracked international courier with Dhaka clearance and local delivery',
      time: '7–12 working days after dispatch',
      cost: 'From ৳3,000 per parcel; bridal consignments quoted separately',
      duty:
        'Bangladesh Customs applies duty and VAT on imported garments, collected at clearance. We declare honestly and provide a full invoice; ask for a landed-cost estimate before confirming your order.',
    },
    turnaround: '10–14 working days stitching + 7–12 days delivery — approximately four weeks.',
    payments: [
      'International bank transfer (SWIFT)',
      'Wise transfer',
      'Card payment link',
      'Deposit plus balance before dispatch on bridal orders',
    ],
    measurement: [
      'Send flat measurements taken from a kameez or kurti you already wear comfortably.',
      'Use our illustrated measurement guide for body measurements taken at home.',
      'Book a free WhatsApp video call — Bangladesh evening slots are easy for us since we are only one hour behind.',
      'Tell us your preferred sleeve length and neckline depth; Bangladeshi and Pakistani defaults differ.',
    ],
    prices: [
      { item: 'Salwar kameez / kurti stitching', local: '৳2,600 – ৳4,200', note: 'Labour only, your fabric' },
      { item: 'Party wear / embroidered formal', local: '৳7,000 – ৳14,000', note: 'Lining and finishing included' },
      { item: 'Bridal lehenga or gharara', local: '৳34,000+', note: 'Quote after design review' },
      { item: 'Alterations and resizing', local: '৳1,800 – ৳3,600', note: 'Return shipping extra' },
    ],
    sections: [
      {
        heading: 'Pakistani craftsmanship, Bangladeshi styling preferences',
        body: 'Bangladeshi customers usually want a slightly different balance — longer kameez lengths, lighter fabrics for the humidity, and simpler daman work for everyday wear. We adjust the pattern rather than defaulting to a Karachi block, so the outfit reads right at a Dhaka wedding, not just in a lookbook.',
      },
      {
        heading: 'Fabric weight matters in this climate',
        body: 'For Dhaka and Chattogram we recommend lawn, voile and light cotton-silk for daytime, with viscose or chiffon for evening events, and we avoid heavy inner lining unless you specifically need structure. Say the word "summer wedding" and we will change the lining plan accordingly.',
      },
      {
        heading: 'Timezone-friendly service',
        body: 'Bangladesh is only one hour ahead of Pakistan, so WhatsApp replies, video fittings and design approvals happen the same working day — no overnight waits like our North American customers experience.',
      },
    ],
    faqs: [
      {
        q: 'Do you ship to Bangladesh?',
        a: 'Yes. We deliver to Dhaka, Chattogram, Sylhet, Khulna, Rajshahi and other districts via tracked international courier with local last-mile delivery.',
      },
      {
        q: 'How do I get measured if I am not in Pakistan?',
        a: 'Send flat measurements from an outfit that fits, use our illustrated measurement guide, or book a free WhatsApp video fitting — same-day scheduling is easy given the one-hour time difference.',
      },
      {
        q: 'What is the delivery time to Bangladesh?',
        a: 'About four weeks door to door: 10–14 working days of stitching plus 7–12 working days for courier transit and customs clearance.',
      },
      {
        q: 'What are the customs charges?',
        a: 'Bangladesh Customs charges duty and VAT on imported garments, collected at clearance. Message us with your order value and we will estimate the landed cost before you commit.',
      },
      {
        q: 'How can I pay from Bangladesh?',
        a: 'International bank transfer, Wise, or a card payment link. Bridal work is split into a booking deposit and a pre-dispatch balance.',
      },
      {
        q: 'Can you match a design from a photo?',
        a: 'Yes. Send a photo on WhatsApp and we confirm what is achievable in the fabric and budget you have in mind, then send progress photos before finishing.',
      },
    ],
    testimonials: [
      { name: 'Nusrat I.', city: 'Dhaka', text: 'They changed the lining plan when I said it was a July wedding. The kameez was comfortable all evening.' },
      { name: 'Tahmina R.', city: 'Sylhet', text: 'Replies came the same day, which made approving the design much easier than dealing with tailors abroad.' },
    ],
    cities: ['Dhaka', 'Chattogram', 'Sylhet', 'Khulna', 'Rajshahi', 'Narayanganj'],
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
