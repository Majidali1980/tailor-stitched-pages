import type { SeoLandingPageProps } from '@/components/SeoLandingPage';

type Config = Omit<SeoLandingPageProps, 'slug'>;

const UNS = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Shared testimonials pool — pick 3 per page for variety
const T = {
  a: { name: 'Ayesha K.', location: 'London, UK', text: 'Perfect fit on the first try. The finishing is exactly what I expected from a premium tailor.', rating: 5 },
  b: { name: 'Sana R.', location: 'Toronto, Canada', text: 'Shipped to Canada in 3 weeks, packaging was spotless and stitching was flawless.', rating: 5 },
  c: { name: 'Hina M.', location: 'Houston, USA', text: 'Ma Tailor understood exactly what I wanted from a Pinterest photo. Highly recommended.', rating: 5 },
  d: { name: 'Fatima A.', location: 'Karachi, PK', text: 'Beautiful bridal work — every bead placed perfectly. Multiple fittings made it effortless.', rating: 5 },
  e: { name: 'Zoya S.', location: 'Manchester, UK', text: 'They handled a rush order for my sister’s mehndi and still delivered couture quality.', rating: 5 },
  f: { name: 'Mariam T.', location: 'Dubai, UAE', text: 'Video fittings on WhatsApp were a game changer. Fit was exact on arrival.', rating: 5 },
  g: { name: 'Nida H.', location: 'Melbourne, AU', text: 'The maxi was structured perfectly — held its shape all night. Worth every rupee.', rating: 5 },
  h: { name: 'Rabia J.', location: 'Vancouver, Canada', text: 'Trusted them with my walima gharara — the kali work was better than the reference photo.', rating: 5 },
};

export const serviceLandingPages: Record<string, Config> = {
  'lawn-suit-stitching': {
    title: 'Lawn Suit Stitching Online | Custom Summer Lawn Tailoring | Ma Tailor',
    metaDescription: 'Custom lawn suit stitching by Ma Tailor. Perfectly fitted summer lawn 3-piece suits, hand-finished with piping, lining and lace. Ship worldwide.',
    metaKeywords: 'lawn suit stitching, lawn suit tailor online, custom lawn 3 piece stitching, Pakistani lawn stitching USA UK Canada, unstitched to stitched lawn service',
    h1: 'Lawn Suit Stitching — Cool, Custom-Fit Summer Suits',
    serviceName: 'Lawn Suit Stitching',
    intro: 'Send us your unstitched lawn 3-piece or pick from our collection — we tailor it to your exact measurements with breathable lining, neat piping and boutique-grade finishing.',
    heroImage: { src: UNS('photo-1610030469983-98e550d6193c', 1200), alt: 'Pakistani lawn suit stitched by Ma Tailor' },
    highlights: [
      'Unstitched-to-stitched lawn suit service',
      'Cotton lining that stays cool in summer',
      'Neckline, sleeve & daman customisation',
      'Piping, lace and pearl work available',
      'Doorstep pickup in Karachi',
      'Worldwide shipping (USA, UK, Canada, UAE)',
    ],
    sections: [
      {
        heading: 'Why Lawn Suit Stitching Deserves a Specialist',
        body: 'Lawn is one of the most-loved summer fabrics across Pakistan and among the diaspora — but it is also one of the trickiest fabrics to stitch well. Its lightweight, semi-transparent weave shows every uneven seam, every mis-placed dart and every rushed hem. At Ma Tailor we treat every lawn suit like a small couture project: fabric is pre-washed if needed, cut on-grain, matched print-to-print on side seams, and lined with soft cotton voile so it drapes beautifully without clinging. Our karigars have stitched hundreds of Gul Ahmed, Sana Safinaz, Maria B, Khaadi and Zellbury lawn suits — so we already know how each brand’s fabric behaves on the shears.',
      },
      {
        heading: 'What is Included in a Custom Lawn Suit',
        body: 'Every lawn suit stitching order includes: full body measurements (or fitting from your provided reference outfit), neckline and sleeve design consultation, matching cotton or silk inner lining for the shirt, neat piping around the neckline and daman, hemmed and pico-finished dupatta, straight or bootcut shalwar / trouser as you prefer, hooks and eyes for kameez side seams, and final steam pressing. Optional add-ons include lace runs, pearl detailing, embroidered patch placement, tassel-finished daman, adda work borders and boat / sweetheart / V necklines. We share progress photos before final finishing so any change is caught early.',
      },
      {
        heading: 'Fit, Timeline and Overseas Orders',
        body: 'A custom lawn suit is normally ready in 7–10 working days from the day fabric reaches us. Rush turnaround (3–5 days) is available on request and subject to workshop load. Overseas clients from the USA, UK, Canada, UAE and Australia can courier their unstitched lawn to our Karachi workshop, or buy from our in-house lawn collection. We ship worldwide via insured DHL / SkyNet with tracking, and we accept payment in PKR, USD, GBP and CAD. If your measurements change, we offer one free minor alteration within 14 days of delivery.',
      },
      {
        heading: 'Style Ideas — What to Ask For',
        body: 'Popular requests this season include: front-open jacket-style kameez with straight pants, angrakha-cut short kameez with gharara-style trousers, cape-sleeve kameez with cigarette pants, and classic A-line kameez with wide dupatta. For office wear we recommend a plain sleeve with a subtle neckline and side slits at the daman. For eid and family functions, a V-neckline with pearl detailing and a bootcut trouser reads modern without losing traditional appeal. Not sure what suits you? Send us your reference photos on WhatsApp and we will suggest options for your body type.',
      },
    ],
    images: [
      { src: UNS('photo-1583391733956-3750e0ff4e8b'), alt: 'Printed lawn kameez neckline finishing' },
      { src: UNS('photo-1614251055880-ee96e4803393'), alt: 'Lawn suit dupatta with lace border' },
      { src: UNS('photo-1594633312681-425c7b97ccd1'), alt: 'Stitched lawn 3-piece hanging in workshop' },
      { src: UNS('photo-1611042553365-9b101441c135'), alt: 'Bootcut trouser hem detail' },
      { src: UNS('photo-1583391733981-8498408b3f5b'), alt: 'Printed lawn fabric cut on grain' },
      { src: UNS('photo-1585487000160-6ebcfceb0d03'), alt: 'Piping detail on lawn kameez' },
    ],
    testimonials: [T.a, T.c, T.f],
    faqs: [
      { q: 'Can I send my own unstitched lawn to be stitched?', a: 'Yes. Most of our lawn stitching orders are customer-supplied 3-piece unstitched fabric from Gul Ahmed, Sana Safinaz, Maria B, Khaadi and other Pakistani brands. Courier it to our Karachi workshop or drop it off; we handle it from cutting to final press.' },
      { q: 'How long does lawn suit stitching take?', a: 'Standard turnaround is 7–10 working days from fabric receipt. Rush orders (3–5 days) are possible when the workshop has capacity — please confirm before couriering.' },
      { q: 'Do you ship stitched lawn suits to the USA, UK and Canada?', a: 'Yes, we ship worldwide via insured DHL and SkyNet with tracking numbers. Typical transit time is 5–10 business days depending on your city.' },
      { q: 'What if the fit is not perfect on arrival?', a: 'We offer one free minor alteration within 14 days of delivery. For overseas clients we can guide a local tailor via WhatsApp video if reshipping is not practical.' },
      { q: 'Can you add lace, pearls or embroidery to a plain lawn suit?', a: 'Absolutely. Share your reference and we will quote lace, pearl, adda or machine embroidery add-ons upfront.' },
      { q: 'Do you stitch pants, tulip pants, ghararas and shararas with lawn suits?', a: 'Yes — straight, bootcut, tulip, cigarette, patiala, sharara and gharara-style bottoms are all supported. Please specify at booking.' },
    ],
    relatedServices: [
      { label: 'Shalwar kameez stitching', to: '/services/shalwar-kameez-stitching', description: 'Everyday and formal shalwar kameez stitched to fit.' },
      { label: 'Party wear stitching', to: '/services/party-wear-stitching', description: 'Turn a lawn base into a full party-ready look.' },
    ],
    relatedReads: [
      { label: 'How to hire a Pakistani tailor online', to: '/blog/how-to-hire-pakistani-tailor-online' },
      { label: 'Browse tailoring articles', to: '/blog/category/tailoring' },
    ],
  },

  'bridal-dress-stitching': {
    title: 'Bridal Dress Stitching – Custom Pakistani Bridal Wear | Ma Tailor',
    metaDescription: 'Custom bridal dress stitching by Ma Tailor. Hand-finished lehengas, ghararas, maxis and walima outfits with perfect fit and heavy embroidery finishing.',
    metaKeywords: 'bridal dress stitching, Pakistani bridal lehenga stitching, walima gharara stitching, bridal maxi tailor, bridal couture Karachi, overseas bridal stitching',
    h1: 'Bridal Dress Stitching — Couture For Your Big Day',
    serviceName: 'Bridal Dress Stitching',
    intro: 'The most photographed dress you will ever wear deserves couture-level construction. We specialise in bridal lehengas, ghararas, maxis and walima outfits with hand embroidery and structured silhouettes.',
    heroImage: { src: UNS('photo-1610030006870-c17f0895c144', 1200), alt: 'Pakistani bridal lehenga stitched by Ma Tailor' },
    highlights: [
      'Hand-finished bridal couture',
      'Lehenga, gharara, maxi, anarkali & walima looks',
      'Multiple fittings to guarantee a perfect fit',
      'Inner lining, canvas & boning where needed',
      'Coordinated stitching for the family & bridesmaids',
      'On-time delivery with a written timeline',
    ],
    sections: [
      {
        heading: 'Bridal Stitching Done Right',
        body: 'A bridal outfit works harder than any other dress in your wardrobe. It has to hold a heavily embroidered kali, carry the weight of dabka, naqshi and zari, sit perfectly for hours of photographs, and let you dance without slipping. Our master tailors specialise in heavy fabrics — raw silk, jamawar, organza, velvet and net — and build every bridal outfit with proper canvas, kali structure, inner lining, side hooks and boning where the design demands it. Nothing is glued, everything is stitched, and every seam is finished from the inside as well as the outside.',
      },
      {
        heading: 'What is Included',
        body: 'Every bridal order includes: personal design consultation, custom pattern drafting to your measurements, premium inner lining, hooks and fasteners, dupatta pico and finishing, edge piping, blouse padding where required, and a full steam-press before packing. Where the design uses hand embroidery, dabka, naqshi, sequin or zari work, we plan the placement before cutting so motifs sit correctly on the body — not chopped at side seams. Progress photos are shared at cutting, first fitting, embroidery placement and final finishing.',
      },
      {
        heading: 'Timeline, Fittings and the Day-Of Fit',
        body: 'For a full bridal set (mehndi + baraat + walima) we recommend booking 8–10 weeks before the first event. A single bridal lehenga, gharara or maxi usually needs 4–6 weeks. Bridal outfits are constructed with extra seam allowance so we can take them in or let them out by an inch or two — we schedule the final fitting close to the wedding date so adjustments reflect your actual day-of measurements. Rush orders may be accepted subject to workshop capacity and always come with a written revised timeline.',
      },
      {
        heading: 'Overseas Brides — USA, UK, Canada, UAE',
        body: 'Many of our brides live abroad. We stitch on your submitted measurements, share progress photos at every stage, and schedule WhatsApp video fittings so you approve the fit before dispatch. Bridal pieces are pressed, padded at stress points, wrapped in muslin, placed flat in a rigid box with embroidery facing up, and sealed in an insured courier parcel. Dupattas and accessories ship in separate compartments so nothing snags on the way to you.',
      },
    ],
    images: [
      { src: UNS('photo-1594612173100-0d4c48db5f74'), alt: 'Pakistani bridal lehenga with hand embroidery' },
      { src: UNS('photo-1583391733956-3750e0ff4e8b'), alt: 'Bridal gharara kali detail' },
      { src: UNS('photo-1583391733975-b8d3e5b0f6a7'), alt: 'Walima maxi with dabka work' },
      { src: UNS('photo-1610030181087-540017dc9d61'), alt: 'Bridal dupatta finishing' },
      { src: UNS('photo-1594612173100-9c78f7f9e1a2'), alt: 'Blouse fitting on mannequin' },
      { src: UNS('photo-1595777457583-95e059d581b8'), alt: 'Bridal embroidery karigar work' },
    ],
    testimonials: [T.d, T.h, T.e],
    faqs: [
      { q: 'How early should I book bridal dress stitching before my wedding?', a: 'For full bridal sets we recommend 8–10 weeks; a single bridal outfit typically needs 4–6 weeks. This buffer covers consultation, fabric sourcing, two or three fittings and heavy embroidery placement without any last-minute rush.' },
      { q: 'Do you stitch heavy bridal lehengas, ghararas and maxis?', a: 'Yes — heavy bridal couture is our core specialty. We structure each outfit with canvas, kalis, inner lining and hooks so the silhouette holds throughout long events. Embroidery is hand-applied by skilled karigars.' },
      { q: 'Can overseas brides order bridal stitching from the USA, UK or Canada?', a: 'Absolutely. We stitch based on your submitted measurements, share progress photos, ship via insured tracked courier, and schedule WhatsApp video fittings before dispatch.' },
      { q: 'Do you stitch coordinated outfits for the family and bridesmaids?', a: 'Yes. We regularly stitch matching or coordinated outfits for mothers, sisters, bridesmaids and the mehndi party. Share your palette and we recommend fabrics and cuts that complement the bridal look.' },
      { q: 'How much does bridal dress stitching cost?', a: 'Pricing depends on design, fabric and embroidery. Simple bridal maxis start in the lower range; fully hand-embroidered lehengas sit in the premium range. We always quote a fixed price in writing before starting work.' },
      { q: 'What if my measurements change before the wedding?', a: 'We plan for it — bridal outfits are constructed with extra seam allowance so they can be taken in or let out. The final fitting is scheduled close to your event date.' },
      { q: 'How is my bridal outfit packed and shipped?', a: 'Pressed, padded at stress points, wrapped in muslin, laid flat in a rigid box with embroidery facing up, then sealed in an insured tracked parcel. Dupattas and accessories ship in separate compartments.' },
    ],
    relatedServices: [
      { label: 'Maxi stitching', to: '/services/maxi-stitching', description: 'Nikah and walima maxis in silk, chiffon and velvet.' },
      { label: 'Sharara stitching', to: '/services/sharara-stitching', description: 'Bridal and family shararas with kali structure.' },
      { label: 'Gharara stitching', to: '/services/gharara-stitching', description: 'Traditional walima ghararas with heavy zari finishing.' },
    ],
    relatedReads: [
      { label: 'Bridal dress stitching checklist – booking to big day', to: '/blog/bridal-dress-stitching-checklist' },
      { label: 'Browse all bridal articles', to: '/blog/category/bridal' },
    ],
  },

  'maxi-stitching': {
    title: 'Maxi Stitching Online | Custom Nikah & Walima Maxi Tailor | Ma Tailor',
    metaDescription: 'Custom maxi stitching for nikah, walima and formal events. Silk, chiffon, velvet and net maxis stitched to fit with lining, boning and hand finishing.',
    metaKeywords: 'maxi stitching, nikah maxi tailor, walima maxi stitching, engagement maxi, long maxi dress tailor, Pakistani maxi stitching online',
    h1: 'Maxi Stitching — Nikah, Walima & Engagement Maxis',
    serviceName: 'Maxi Stitching',
    intro: 'From soft flowy chiffon nikah maxis to structured velvet walima gowns, our tailors build maxis that hold shape, flatter the silhouette and photograph beautifully.',
    heroImage: { src: UNS('photo-1596993100471-c3905dafa78e', 1200), alt: 'Custom nikah maxi stitched by Ma Tailor' },
    highlights: [
      'Nikah, walima, engagement & mehndi maxis',
      'Silk, chiffon, velvet, net & organza',
      'Structured bodice with inner lining',
      'Boning, canvas and hooks where needed',
      'Kali-cut, A-line, mermaid & fishtail silhouettes',
      'Worldwide shipping with insured courier',
    ],
    sections: [
      {
        heading: 'What Makes a Maxi Sit Beautifully',
        body: 'A well-stitched maxi is 80% construction and 20% embellishment. The bodice needs proper inner lining, dart placement and — for heavier fabrics — canvas or light boning to hold the shape without collapsing. The skirt panels have to be cut on-grain so the fall is even, and kali seams have to match perfectly at the waist. We use French seams or bound seams on delicate fabrics so nothing scratches the skin, and hooks are hand-stitched (never glued) at the side and back so the closure lies flat under embroidery.',
      },
      {
        heading: 'Silhouettes We Stitch',
        body: 'Classic A-line, front-open angrakha, kali-cut umbrella, mermaid, fishtail, high-low, cape-sleeve, off-shoulder, sweetheart neckline, boat neckline and V-neckline maxis are all supported. For nikah events, ivory or pastel chiffon maxis with delicate pearl work are the most requested. For walima, a structured velvet or raw-silk mermaid with heavy dabka is a classic. For engagements, a sharara-attached maxi or an A-line with organza dupatta reads modern and photographs beautifully. Share your Pinterest board on WhatsApp and we will translate the look into a construction plan.',
      },
      {
        heading: 'Fabric, Lining and Comfort',
        body: 'Fabric choice affects both look and comfort. Chiffon flows beautifully but needs a soft crepe or silk lining so it is not see-through. Velvet is dramatic but heavy — we stitch it with a lighter shoulder pad support so it does not drag. Net needs a matching-tone inner slip so embroidery reads clearly. Organza needs neat pico-finished edges because raw edges show. We advise you on all of this at consultation, and lining is included in every maxi stitching order.',
      },
      {
        heading: 'Timeline and Overseas Orders',
        body: 'A custom maxi is normally ready in 3–4 weeks from fabric receipt for simple designs and 5–7 weeks for heavy hand-embroidered maxis. Overseas clients courier fabric to Karachi or select from our in-house collection, and we ship worldwide via insured DHL / SkyNet. WhatsApp video fittings are available before dispatch so you approve the fit while the maxi is still on the form.',
      },
    ],
    images: [
      { src: UNS('photo-1594612173100-0d4c48db5f74'), alt: 'Long walima maxi with dabka work' },
      { src: UNS('photo-1583391733956-3750e0ff4e8b'), alt: 'Nikah maxi in pastel chiffon' },
      { src: UNS('photo-1595777457583-95e059d581b8'), alt: 'Engagement maxi hand embroidery' },
      { src: UNS('photo-1596993100471-c3905dafa78e'), alt: 'Kali-cut maxi from behind' },
      { src: UNS('photo-1610030181087-540017dc9d61'), alt: 'Fishtail maxi trial fitting' },
      { src: UNS('photo-1614251055880-ee96e4803393'), alt: 'Chiffon maxi hem finishing' },
    ],
    testimonials: [T.g, T.a, T.h],
    faqs: [
      { q: 'How long does a custom maxi take to stitch?', a: 'Simple maxis are ready in 3–4 weeks from fabric receipt. Heavy hand-embroidered maxis need 5–7 weeks. Rush turnaround may be possible on request.' },
      { q: 'Do you stitch mermaid and fishtail maxis?', a: 'Yes — mermaid, fishtail, kali-cut, A-line, angrakha and cape maxis are all part of our standard portfolio.' },
      { q: 'Can I supply my own fabric?', a: 'Absolutely. Courier chiffon, silk, velvet, net or organza to our Karachi workshop. Lining is included in the stitching price.' },
      { q: 'Do you ship maxis internationally?', a: 'Yes, via insured DHL and SkyNet to the USA, UK, Canada, UAE, Australia and more. Tracking is provided.' },
      { q: 'Will the fit be right if I am overseas?', a: 'We stitch on your submitted measurements and schedule a WhatsApp video fitting before dispatch. One free minor alteration is offered within 14 days.' },
      { q: 'Can you add embroidery, pearls or dabka?', a: 'Yes — hand embroidery, dabka, naqshi, sequins, zari and pearl work are all available. We quote embellishment separately.' },
    ],
    relatedServices: [
      { label: 'Bridal dress stitching', to: '/services/bridal-dress-stitching', description: 'Complete bridal couture including maxis.' },
      { label: 'Party wear stitching', to: '/services/party-wear-stitching', description: 'Semi-formal party maxis and short frocks.' },
    ],
    relatedReads: [
      { label: 'Bridal dress stitching checklist', to: '/blog/bridal-dress-stitching-checklist' },
      { label: 'Browse bridal articles', to: '/blog/category/bridal' },
    ],
  },

  'party-wear-stitching': {
    title: 'Party Wear Stitching | Custom Formal & Semi-Formal Party Dresses | Ma Tailor',
    metaDescription: 'Custom party wear stitching by Ma Tailor. Frocks, peplums, gowns and short shirts with sharara or trousers. Stitched to fit, shipped worldwide.',
    metaKeywords: 'party wear stitching, formal dress tailor, semi formal Pakistani stitching, peplum stitching, frock stitching online, party maxi tailor',
    h1: 'Party Wear Stitching — Occasion-Ready In Weeks',
    serviceName: 'Party Wear Stitching',
    intro: 'From peplum tops with cigarette pants to short frocks with shararas, our party wear stitching is designed for weddings, eid events, engagements and cocktail nights.',
    heroImage: { src: UNS('photo-1614594975525-e45190c55d0b', 1200), alt: 'Pakistani party wear frock stitched by Ma Tailor' },
    highlights: [
      'Peplums, frocks, gowns, short shirts, capes',
      'Sharara, gharara, cigarette, tulip & straight pants',
      'Structured shoulder & bust with inner lining',
      'Add-on embroidery, pearls, sequins, dabka',
      'Turnaround from 2–4 weeks',
      'Worldwide shipping',
    ],
    sections: [
      {
        heading: 'Party Wear That Actually Fits',
        body: 'Party wear is where fit matters most — you are photographed, you dance, you sit for dinner, and the outfit has to survive all of it looking sharp. Our party wear stitching focuses on three things: a bodice that hugs without pulling, a hem that swings without twisting, and closures that stay invisible. We line every party piece so nothing is see-through under camera flash, we double-stitch stress points, and we hand-tack embellishments so nothing pops off mid-event.',
      },
      {
        heading: 'Silhouettes and Combinations',
        body: 'Popular party looks include: peplum kameez with cigarette pants and organza dupatta, short frock with sharara pants, angrakha top with tulip trousers, cape-style short shirt with straight pants, high-low frock with churidar, and A-line gown with a sheer overlay. For younger clients we recommend cropped silhouettes with statement sleeves; for a classic look, a long A-line frock with a fitted bodice never dates. Send us your reference photos and body-shape info and we suggest the silhouette that photographs best on you.',
      },
      {
        heading: 'Fabric, Lining and Embellishment',
        body: 'Chiffon, organza, raw silk, jamawar, katan silk, net and velvet are the most common party fabrics we stitch. Inner lining is included in every order — silk crepe for delicate outer fabrics, cotton voile for lawns and thicker linings for structured bodices. Hand embroidery, machine embroidery, dabka, naqshi, sequins, pearls, zari and cutwork are all supported and quoted separately. If you already have embroidered panels, we plan the pattern around them so nothing is chopped at seams.',
      },
      {
        heading: 'Timeline & Booking',
        body: 'Standard turnaround for party wear stitching is 2–4 weeks depending on complexity. For eid, wedding season and December events we recommend booking at least 4 weeks ahead. Rush orders (7–10 days) may be accepted subject to workshop capacity. Overseas clients ship fabric to Karachi and receive stitched outfits via insured DHL / SkyNet.',
      },
    ],
    images: [
      { src: UNS('photo-1583391733956-3750e0ff4e8b'), alt: 'Peplum top with cigarette pants' },
      { src: UNS('photo-1614594975525-e45190c55d0b'), alt: 'Short frock with sharara' },
      { src: UNS('photo-1594612173100-0d4c48db5f74'), alt: 'Cape-style party shirt' },
      { src: UNS('photo-1596993100471-c3905dafa78e'), alt: 'A-line party frock' },
      { src: UNS('photo-1610030181087-540017dc9d61'), alt: 'Party wear neckline finishing' },
      { src: UNS('photo-1614251055880-ee96e4803393'), alt: 'Party wear embroidery placement' },
    ],
    testimonials: [T.c, T.e, T.f],
    faqs: [
      { q: 'How long does party wear stitching take?', a: 'Typically 2–4 weeks depending on design complexity and embellishment. Rush orders may be possible.' },
      { q: 'Can I combine a short frock with sharara or cigarette pants?', a: 'Yes — any silhouette / bottom combination is supported. Peplum + cigarette pants and short frock + sharara are the most requested this season.' },
      { q: 'Do you stitch backless or off-shoulder designs?', a: 'Yes, subject to inner lining and structural support. We advise on modesty options like sheer nets or attached inner bodices.' },
      { q: 'Can I supply embroidered panels for you to stitch?', a: 'Absolutely. Courier the panels along with the base fabric and we plan the pattern around them.' },
      { q: 'Do you ship stitched party wear overseas?', a: 'Yes, insured DHL / SkyNet to the USA, UK, Canada, UAE, Australia and more.' },
      { q: 'How is fit guaranteed for overseas clients?', a: 'We stitch on your submitted measurements and offer a WhatsApp video fitting before dispatch.' },
    ],
    relatedServices: [
      { label: 'Maxi stitching', to: '/services/maxi-stitching', description: 'Full-length party and event maxis.' },
      { label: 'Sharara stitching', to: '/services/sharara-stitching', description: 'Pair a short shirt with a sharara.' },
      { label: 'Blouse stitching', to: '/services/blouse-stitching', description: 'Fitted blouses to pair with sarees or lehengas.' },
    ],
    relatedReads: [
      { label: 'Browse tailoring articles', to: '/blog/category/tailoring' },
    ],
  },

  'sharara-stitching': {
    title: 'Sharara Stitching in Karachi | Bridal & Party Wear - MA Tailor',
    metaDescription: 'Bridal, mehndi and party sharara stitching in Karachi by MA Tailor. Full kali flare, lined and hand-finished. Book home pickup or WhatsApp for a free quote.',
    metaKeywords: 'sharara stitching, sharara tailor online, wedding sharara, mehndi sharara stitching, Pakistani sharara tailor, kali sharara',
    h1: 'Sharara Stitching — Flare, Structure & Perfect Fall',
    serviceName: 'Sharara Stitching',
    intro: 'Shararas live and die by their kali flare and waist fit. We cut, stitch and finish shararas the traditional way — panel by panel — so the fall is even and the waist sits perfectly.',
    heroImage: { src: UNS('photo-1610030006870-c17f0895c144', 1200), alt: 'Pakistani sharara stitched by Ma Tailor' },
    highlights: [
      'Bridal, mehndi & family shararas',
      'Kali-cut flare with even fall',
      'Structured waistband with hook & bar closure',
      'Matching inner lining',
      'Embroidery, gota and lace add-ons',
      'Worldwide shipping with tracking',
    ],
    sections: [
      {
        heading: 'The Craft Behind a Perfect Sharara',
        body: 'A sharara is not one wide pant — it is a fitted upper section that flares from the knee into multiple kali panels. Each panel has to be cut on-grain, matched to its neighbour, and joined with even top-stitching so the flare falls in a clean bell shape. We draft each sharara pattern to the wearer’s hip, thigh and knee measurements, add matching inner lining (crepe or silk depending on outer fabric), and finish the waistband with a proper hook-and-bar closure that stays flat under a fitted kameez.',
      },
      {
        heading: 'Silhouettes and Styling',
        body: 'Bridal shararas usually pair with a heavily embroidered short kameez or a peplum top and a matching dupatta with wide lace or gota border. Family and mehndi shararas can be paired with an angrakha, a cape-sleeve short kameez, or a plain kurta with a printed dupatta. Sharara panels can be plain (letting the top do the talking), gota-work bordered, dabka-embroidered along the hem, or fully worked with kali-line motifs. We recommend the styling based on your event, body type and comfort.',
      },
      {
        heading: 'Fit and Comfort',
        body: 'Because a sharara has weight and flare, the waist and hip fit have to be exact. We measure with the shoes and inner you plan to wear on the day, add a slight ease at the hip so you can sit and dance without pinching, and place the hook-and-bar high enough that it sits under the kameez. Inner lining is included, and for heavy embroidered shararas we can add a light net can-can layer to lift the flare further.',
      },
      {
        heading: 'Timeline & Overseas Orders',
        body: 'A custom sharara is normally ready in 3–5 weeks. Heavy embroidered shararas may need 6–8 weeks. Overseas clients from the USA, UK, Canada and UAE courier fabric to Karachi and receive stitched outfits via insured DHL / SkyNet, with WhatsApp video fittings before dispatch.',
      },
    ],
    images: [
      { src: UNS('photo-1596993100471-c3905dafa78e'), alt: 'Bridal sharara kali detail' },
      { src: UNS('photo-1594612173100-0d4c48db5f74'), alt: 'Sharara paired with peplum kameez' },
      { src: UNS('photo-1583391733956-3750e0ff4e8b'), alt: 'Mehndi sharara with gota' },
      { src: UNS('photo-1614594975525-e45190c55d0b'), alt: 'Sharara waistband and closure' },
      { src: UNS('photo-1610030181087-540017dc9d61'), alt: 'Sharara flare front view' },
      { src: UNS('photo-1614251055880-ee96e4803393'), alt: 'Sharara hem embroidery' },
    ],
    testimonials: [T.d, T.h, T.b],
    faqs: [
      { q: 'How is a sharara different from a gharara?', a: 'A sharara flares from the knee in kali panels; a gharara is fitted to the knee and then flares out from a joined band. Both are traditional and we stitch both.' },
      { q: 'Can you match a sharara to my existing kameez or top?', a: 'Yes. Send the top with the fabric and we will match panel widths, hem finish, and border style so both pieces read as one outfit.' },
      { q: 'Do you add can-can for extra flare?', a: 'Yes — a light net can-can layer can be stitched inside heavy shararas to lift the flare, on request.' },
      { q: 'How long does sharara stitching take?', a: '3–5 weeks for standard shararas; 6–8 weeks for heavy embroidered bridal shararas.' },
      { q: 'Do you ship stitched shararas worldwide?', a: 'Yes, via insured DHL and SkyNet with tracking.' },
      { q: 'Can I supply my own embroidered panels?', a: 'Absolutely. We plan the sharara pattern around them so motifs sit correctly.' },
    ],
    relatedServices: [
      { label: 'Gharara stitching', to: '/services/gharara-stitching', description: 'Traditional walima ghararas with heavy zari.' },
      { label: 'Bridal dress stitching', to: '/services/bridal-dress-stitching', description: 'Full bridal packages including shararas.' },
      { label: 'Party wear stitching', to: '/services/party-wear-stitching', description: 'Pair a sharara with a party-ready short shirt.' },
    ],
    relatedReads: [
      { label: 'Browse bridal articles', to: '/blog/category/bridal' },
    ],
  },

  'gharara-stitching': {
    title: 'Gharara Stitching Online | Custom Walima & Bridal Gharara | Ma Tailor',
    metaDescription: 'Custom gharara stitching by Ma Tailor. Traditional walima and bridal ghararas with kali flare, gota borders and hand embroidery. Ships worldwide.',
    metaKeywords: 'gharara stitching, walima gharara tailor, bridal gharara online, Pakistani gharara stitching, traditional gharara Karachi',
    h1: 'Gharara Stitching — Traditional Walima Elegance',
    serviceName: 'Gharara Stitching',
    intro: 'Ghararas are a bridal classic — fitted to the knee and dramatically flared below. We stitch them the traditional way with a knee band, kali flare and proper inner lining.',
    heroImage: { src: UNS('photo-1594612173100-0d4c48db5f74', 1200), alt: 'Bridal gharara stitched by Ma Tailor' },
    highlights: [
      'Bridal, walima & family ghararas',
      'Knee-band construction with kali flare',
      'Gota, dabka & zari border work',
      'Inner lining for opacity and comfort',
      'Matching short kameez / peplum available',
      'Insured worldwide shipping',
    ],
    sections: [
      {
        heading: 'What Makes a Gharara Different',
        body: 'A gharara is one of the oldest pieces in the sub-continental bridal wardrobe. Unlike a sharara, it is fitted to the knee and then joined at a decorative knee band that opens out into a wide kali flare. The knee band is often heavily worked with gota, zari or dabka, and the flare has to fall evenly around the entire circumference. This construction takes precision — a badly stitched gharara twists at the knee band and the flare becomes uneven within one wear.',
      },
      {
        heading: 'Our Gharara Construction',
        body: 'We draft each gharara pattern to the wearer’s hip, thigh and knee measurements. The upper section is cut fitted with a soft inner lining so it does not cling. The knee band is stitched separately, embroidered where the design calls for it, then joined to both the fitted upper and the kali flare in a single continuous line so the seam does not pucker. The kali panels are cut on-grain and matched at every seam so the flare falls evenly.',
      },
      {
        heading: 'Styling and Occasions',
        body: 'Bridal ghararas are traditionally worn for the walima or nikah, paired with a short kameez or peplum top and a heavy dupatta. For family functions, lighter ghararas in chiffon or organza with gota border are elegant and comfortable. We can also stitch mehndi ghararas in bright yellows and greens with lighter embroidery. Send us your reference and we advise on fabric, embroidery placement and pairing.',
      },
      {
        heading: 'Timeline and Overseas Orders',
        body: 'Standard turnaround is 4–6 weeks; heavy bridal ghararas may need 6–8 weeks. Overseas clients courier fabric to Karachi or select from our in-house collection, and we ship stitched ghararas worldwide via insured DHL / SkyNet with tracking. WhatsApp video fittings are available before dispatch.',
      },
    ],
    images: [
      { src: UNS('photo-1596993100471-c3905dafa78e'), alt: 'Walima gharara kali flare' },
      { src: UNS('photo-1583391733956-3750e0ff4e8b'), alt: 'Gharara knee band embroidery' },
      { src: UNS('photo-1594612173100-0d4c48db5f74'), alt: 'Bridal gharara with short kameez' },
      { src: UNS('photo-1610030006870-c17f0895c144'), alt: 'Gharara detail with gota' },
      { src: UNS('photo-1614594975525-e45190c55d0b'), alt: 'Gharara paired with peplum' },
      { src: UNS('photo-1614251055880-ee96e4803393'), alt: 'Gharara hem finishing' },
    ],
    testimonials: [T.h, T.d, T.a],
    faqs: [
      { q: 'What is the difference between a gharara and a sharara?', a: 'A gharara is fitted to the knee and joined at a decorative knee band before flaring out. A sharara flares directly from the knee in kali panels without the band.' },
      { q: 'Do you stitch heavy walima ghararas with dabka and zari?', a: 'Yes — heavy walima ghararas with dabka, zari, naqshi and gota work are one of our signature offerings.' },
      { q: 'How long does gharara stitching take?', a: '4–6 weeks for standard ghararas; 6–8 weeks for heavy bridal ghararas.' },
      { q: 'Can I get a matching short kameez or peplum?', a: 'Yes — we regularly stitch coordinated tops with ghararas.' },
      { q: 'Do you ship ghararas internationally?', a: 'Yes, via insured DHL and SkyNet worldwide.' },
      { q: 'Can I supply my own knee-band embroidery panel?', a: 'Absolutely — we plan the gharara construction around your existing panels.' },
    ],
    relatedServices: [
      { label: 'Sharara stitching', to: '/services/sharara-stitching', description: 'Kali-flared shararas for weddings and mehndis.' },
      { label: 'Bridal dress stitching', to: '/services/bridal-dress-stitching', description: 'Full bridal couture including walima ghararas.' },
    ],
    relatedReads: [
      { label: 'Browse bridal articles', to: '/blog/category/bridal' },
    ],
  },

  'abaya-stitching': {
    title: 'Abaya Stitching Online | Custom Modern & Classic Abaya Tailor | Ma Tailor',
    metaDescription: 'Custom abaya stitching by Ma Tailor. Modern open-front, kimono-sleeve and classic butterfly abayas in nida, formal and crepe fabrics. Ships worldwide.',
    metaKeywords: 'abaya stitching, custom abaya tailor, open abaya stitching, kimono abaya, butterfly abaya, Pakistani abaya online, modern abaya USA UK',
    h1: 'Abaya Stitching — Modern, Modest & Perfectly Fitted',
    serviceName: 'Abaya Stitching',
    intro: 'From flowy butterfly abayas to structured open-front kimono cuts, our abayas are stitched in premium nida, formal and crepe fabrics with clean finishing inside and out.',
    heroImage: { src: UNS('photo-1621786030484-4c855eed6974', 1200), alt: 'Custom abaya stitched by Ma Tailor' },
    highlights: [
      'Open-front, kimono, butterfly & classic abayas',
      'Nida, formal, crepe & jazz fabrics',
      'Neat inner finishing & hidden closures',
      'Add-on embroidery, lace & pearl detailing',
      'Matching hijab / shawl available',
      'Worldwide shipping to KSA, UAE, USA, UK, Canada',
    ],
    sections: [
      {
        heading: 'Modern Abaya Silhouettes',
        body: 'The modern abaya wardrobe is much wider than the classic black closed cut. We stitch open-front abayas with hidden buttons for daytime wear, kimono-sleeve abayas with a soft belt for a structured look, butterfly abayas with flowing side panels, front-slit abayas over a matching inner dress, and classic closed abayas for formal or religious settings. Each cut is drafted to your shoulder, bust and length measurements so the abaya falls straight without pulling.',
      },
      {
        heading: 'Fabric Choice',
        body: 'Nida is the workhorse fabric — matte, opaque, drapes beautifully, and travels well. Formal (Korean formal) is slightly heavier with a smooth finish, ideal for evening abayas. Crepe is lightweight and cool for summer wear. Jazz has a soft sheen and works well for embellished abayas. We advise on fabric based on climate — heavier nida for winter, breathable crepe for hot climates.',
      },
      {
        heading: 'Finishing and Comfort',
        body: 'A well-stitched abaya has clean inner seams (French or bound), a hem that skims the floor without dragging, sleeves that clear the wrist by the right amount, and closures that stay hidden. We add optional inner side pockets on request, and we stitch matching hijabs / shawls from the same or contrasting fabric. Embroidery, lace, pearl and stone work can be added along the sleeves, front placket or hem.',
      },
      {
        heading: 'Timeline & Shipping',
        body: 'A custom abaya is normally ready in 2–4 weeks. Bulk orders (for families, schools or Umrah groups) are quoted separately with volume discounts. Overseas clients from the USA, UK, Canada, KSA and UAE receive their abayas via insured DHL / SkyNet with tracking.',
      },
    ],
    images: [
      { src: UNS('photo-1621786030484-4c855eed6974'), alt: 'Modern open-front abaya' },
      { src: UNS('photo-1596993100471-c3905dafa78e'), alt: 'Kimono sleeve abaya' },
      { src: UNS('photo-1583391733956-3750e0ff4e8b'), alt: 'Butterfly abaya side panels' },
      { src: UNS('photo-1614251055880-ee96e4803393'), alt: 'Abaya sleeve embroidery' },
      { src: UNS('photo-1610030181087-540017dc9d61'), alt: 'Classic closed abaya with hijab' },
      { src: UNS('photo-1594612173100-0d4c48db5f74'), alt: 'Abaya hem finishing' },
    ],
    testimonials: [T.f, T.b, T.c],
    faqs: [
      { q: 'What abaya styles do you stitch?', a: 'Open-front, kimono-sleeve, butterfly, front-slit, classic closed and umrah abayas are all supported.' },
      { q: 'Which fabric should I choose?', a: 'Nida for everyday, formal for evening, crepe for hot climates and jazz for embellished abayas. We advise based on your city and use.' },
      { q: 'Do you ship abayas to KSA, UAE, USA and UK?', a: 'Yes — insured DHL / SkyNet worldwide with tracking numbers.' },
      { q: 'Can I add embroidery, lace or pearl work?', a: 'Yes, along the sleeves, front placket and hem. Quoted separately.' },
      { q: 'Do you offer bulk pricing for families or Umrah groups?', a: 'Yes, bulk orders of 5+ abayas qualify for volume discounts. Contact us with quantity and design.' },
      { q: 'How long does abaya stitching take?', a: '2–4 weeks for standard designs; 5–6 weeks for heavy embellished abayas.' },
    ],
    relatedServices: [
      { label: 'Formal suit stitching', to: '/services/formal-suit-stitching', description: 'Formal shalwar kameez for office and events.' },
      { label: 'Custom stitching', to: '/services/custom-stitching', description: 'Send any reference — we stitch it.' },
    ],
    relatedReads: [
      { label: 'Browse tailoring articles', to: '/blog/category/tailoring' },
    ],
  },

  'blouse-stitching': {
    title: 'Blouse Stitching Online | Custom Saree Blouse & Lehenga Choli | Ma Tailor',
    metaDescription: 'Custom blouse stitching by Ma Tailor. Saree blouses, lehenga cholis and short shirts stitched to fit with padding, boning and hand finishing.',
    metaKeywords: 'blouse stitching, saree blouse tailor, lehenga choli stitching, padded blouse, custom short shirt stitching, Pakistani blouse online',
    h1: 'Blouse Stitching — Saree, Lehenga & Short-Shirt Blouses',
    serviceName: 'Blouse Stitching',
    intro: 'A perfectly fitted blouse changes how a saree or lehenga sits on the body. We stitch padded, boned and lined blouses to your exact measurements — no gaping, no pinching.',
    heroImage: { src: UNS('photo-1596993100471-c3905dafa78e', 1200), alt: 'Custom blouse stitched by Ma Tailor' },
    highlights: [
      'Saree blouses, lehenga cholis & short shirts',
      'Padded, boned & lined construction',
      'Princess cuts, sweetheart & deep back',
      'Hook, zip or hidden closure options',
      'Embroidery panel placement planning',
      'Overseas shipping with WhatsApp fit check',
    ],
    sections: [
      {
        heading: 'Why Blouse Fit Is So Difficult',
        body: 'A blouse is one of the smallest garments in a woman’s wardrobe, but also the most fit-sensitive. A saree blouse sits directly against the ribcage and has almost no fabric to hide construction mistakes — the smallest darting error creates gaping at the neckline or pulling at the bust. Our blouse stitching starts from a paper pattern drafted to your exact bust, waist, shoulder, sleeve and back-length measurements. We then run a muslin trial for bridal or heavy blouses so the fit is confirmed before cutting into good fabric.',
      },
      {
        heading: 'Construction Details',
        body: 'Every blouse we stitch is fully lined for opacity and comfort, has cup padding sized to your fit, and uses light boning at side seams for structure where the design requires it (deep necklines, sweetheart, off-shoulder). Closures are chosen based on the back design — hook-and-eye for classic blouses, hidden zip for very fitted or embroidered backs, and dori-lace for traditional cholis. All inner seams are bound or overlocked so nothing scratches.',
      },
      {
        heading: 'Styles We Stitch',
        body: 'Classic round-neck saree blouse, princess-cut blouse, sweetheart neckline, boat neck, off-shoulder, cold-shoulder, cap sleeve, three-quarter sleeve, full sleeve, backless with dori, deep V back, and short-shirt blouses paired with lehengas or ghararas — all supported. Embroidered panels, mirror work, dabka and pearl work can be added or applied from panels you supply.',
      },
      {
        heading: 'Timeline & Overseas Orders',
        body: 'A custom blouse is usually ready in 1–2 weeks. Heavy embellished blouses need 3–4 weeks. Overseas clients ship fabric to Karachi and receive stitched blouses via insured DHL / SkyNet with tracking. A WhatsApp video fitting is available before dispatch for bridal blouses.',
      },
    ],
    images: [
      { src: UNS('photo-1583391733956-3750e0ff4e8b'), alt: 'Fitted saree blouse' },
      { src: UNS('photo-1594612173100-0d4c48db5f74'), alt: 'Lehenga choli with embroidery' },
      { src: UNS('photo-1610030181087-540017dc9d61'), alt: 'Blouse neckline detail' },
      { src: UNS('photo-1614251055880-ee96e4803393'), alt: 'Blouse back closure' },
      { src: UNS('photo-1614594975525-e45190c55d0b'), alt: 'Padded blouse construction' },
      { src: UNS('photo-1596993100471-c3905dafa78e'), alt: 'Short-shirt style blouse' },
    ],
    testimonials: [T.a, T.g, T.e],
    faqs: [
      { q: 'Do you stitch padded and boned blouses?', a: 'Yes — cup padding and light boning are standard on request; boning is included by default on deep-neckline and off-shoulder designs.' },
      { q: 'Can I supply embroidered blouse panels?', a: 'Absolutely. Courier the panel with your base fabric and we plan the blouse around it.' },
      { q: 'What is the turnaround time?', a: '1–2 weeks for standard blouses; 3–4 weeks for heavy embellished blouses.' },
      { q: 'Do you offer WhatsApp fit checks for overseas clients?', a: 'Yes — a video fit check is standard for bridal blouses and available on request for all others.' },
      { q: 'What closures do you use?', a: 'Hook-and-eye, hidden zip, and dori-lace depending on the design and your preference.' },
      { q: 'Do you ship blouses internationally?', a: 'Yes, insured DHL / SkyNet to the USA, UK, Canada, UAE, Australia and more.' },
    ],
    relatedServices: [
      { label: 'Bridal dress stitching', to: '/services/bridal-dress-stitching', description: 'Full bridal outfits including cholis.' },
      { label: 'Sharara stitching', to: '/services/sharara-stitching', description: 'Pair a fitted blouse with a sharara.' },
    ],
    relatedReads: [
      { label: 'Browse tailoring articles', to: '/blog/category/tailoring' },
    ],
  },

  'formal-suit-stitching': {
    title: 'Formal Suit Stitching | Office & Event Shalwar Kameez Tailor | Ma Tailor',
    metaDescription: 'Formal shalwar kameez stitching by Ma Tailor. Office, event and evening suits in raw silk, jamawar and cotton silk with clean finishing.',
    metaKeywords: 'formal suit stitching, formal shalwar kameez tailor, office wear stitching Pakistan, raw silk suit tailor, evening suit stitching online',
    h1: 'Formal Suit Stitching — Office, Event & Evening Wear',
    serviceName: 'Formal Suit Stitching',
    intro: 'Formal shalwar kameez needs a cleaner cut, structured shoulder and neat finishing to read professional. We stitch formal suits in raw silk, jamawar, cotton silk and karandi with boutique-grade finishing.',
    heroImage: { src: UNS('photo-1583391733975-b8d3e5b0f6a7', 1200), alt: 'Formal shalwar kameez stitched by Ma Tailor' },
    highlights: [
      'Office, event & evening formal suits',
      'Raw silk, jamawar, cotton silk & karandi',
      'Structured shoulder & clean darts',
      'Straight, cigarette & bootcut trousers',
      'Hand-finished necklines and hems',
      'Turnaround from 2–3 weeks',
    ],
    sections: [
      {
        heading: 'What Makes a Formal Suit Different',
        body: 'Everyday shalwar kameez can be soft and relaxed. A formal suit has to hold structure — straight shoulder line, crisp neckline, clean princess or bust darts, and a hem that sits parallel to the floor. We build formal suits with a slightly heavier inner lining, a light shoulder pad where the design calls for it, and precision top-stitching along the placket and cuffs. The result is a suit that reads polished in a boardroom and elegant at an evening event.',
      },
      {
        heading: 'Fabrics That Photograph Well',
        body: 'Raw silk is the classic formal choice — matte, structured, holds embroidery beautifully. Jamawar reads rich under evening light and works well with dabka and zari borders. Cotton silk is a comfortable summer formal — breathable but still crisp. Karandi is the go-to winter formal — warm, matte and structured. We advise on fabric based on your event and climate, and lining is included in every formal stitching order.',
      },
      {
        heading: 'Silhouettes',
        body: 'Straight-cut kameez with cigarette pants and a chiffon dupatta is the modern office standard. A-line kameez with straight pants reads traditional but polished. Peplum kameez with cigarette pants is popular for evening events. Angrakha with tulip pants adds a modern twist. For senior clients we recommend a floor-length A-line with a printed dupatta — classic and forgiving.',
      },
      {
        heading: 'Timeline & Alterations',
        body: 'Standard formal suit stitching takes 2–3 weeks. Rush turnaround (7–10 days) may be possible depending on workshop load. We offer one free minor alteration within 14 days of delivery. Overseas clients ship fabric to Karachi and receive stitched suits via insured DHL / SkyNet with tracking.',
      },
    ],
    images: [
      { src: UNS('photo-1583391733975-b8d3e5b0f6a7'), alt: 'Formal raw silk suit' },
      { src: UNS('photo-1594612173100-0d4c48db5f74'), alt: 'Jamawar evening suit' },
      { src: UNS('photo-1583391733956-3750e0ff4e8b'), alt: 'Cotton silk office suit' },
      { src: UNS('photo-1610030181087-540017dc9d61'), alt: 'Formal suit neckline' },
      { src: UNS('photo-1614251055880-ee96e4803393'), alt: 'Cigarette pant finishing' },
      { src: UNS('photo-1596993100471-c3905dafa78e'), alt: 'Peplum formal look' },
    ],
    testimonials: [T.c, T.a, T.b],
    faqs: [
      { q: 'What is the turnaround for a formal suit?', a: '2–3 weeks for standard formal suits; rush 7–10 day turnaround may be possible on request.' },
      { q: 'Do you stitch formal suits in raw silk and jamawar?', a: 'Yes — raw silk, jamawar, cotton silk and karandi are our standard formal fabrics.' },
      { q: 'Can I get a matching dupatta finished?', a: 'Yes — pico finishing, lace application and border stitching are included in the base price.' },
      { q: 'Do you offer alterations after delivery?', a: 'Yes — one free minor alteration within 14 days of delivery.' },
      { q: 'Do you ship stitched formal suits abroad?', a: 'Yes, insured DHL / SkyNet worldwide.' },
      { q: 'Which trouser style is best for formal wear?', a: 'Cigarette pants are the modern office standard; straight pants are the safe classic; bootcut works well with A-line and peplum tops.' },
    ],
    relatedServices: [
      { label: 'Shalwar kameez stitching', to: '/services/shalwar-kameez-stitching', description: 'Everyday and family shalwar kameez.' },
      { label: 'Party wear stitching', to: '/services/party-wear-stitching', description: 'Semi-formal and evening party looks.' },
    ],
    relatedReads: [
      { label: 'Browse tailoring articles', to: '/blog/category/tailoring' },
    ],
  },

  'custom-stitching': {
    title: 'Custom Stitching Online | Reference-Based Pakistani Tailoring | Ma Tailor',
    metaDescription: 'Custom stitching from any reference photo. Ma Tailor drafts a pattern from your Pinterest, Instagram or catalog reference and stitches it to your exact fit.',
    metaKeywords: 'custom stitching, reference photo stitching, Pinterest dress tailor, Pakistani custom tailor online, bespoke stitching service USA UK Canada',
    h1: 'Custom Stitching — Send a Reference, Get It Made',
    serviceName: 'Custom Stitching',
    intro: 'Have a Pinterest board, an Instagram post or a catalog page? We draft the pattern, source or use your fabric, and stitch the outfit to your exact measurements.',
    heroImage: { src: UNS('photo-1594612173100-0d4c48db5f74', 1200), alt: 'Custom stitched Pakistani outfit by Ma Tailor' },
    highlights: [
      'Reference-based pattern drafting',
      'Any silhouette — bridal, party, formal, casual',
      'Fabric sourcing on request',
      'Inner lining, hooks, boning included',
      'Progress photos at every stage',
      'Insured worldwide shipping',
    ],
    sections: [
      {
        heading: 'How Custom Stitching Works',
        body: 'Custom stitching is our most flexible service. Send us any reference — a Pinterest pin, a designer runway photo, an Instagram post, a wedding photograph, a catalog page — and we will draft a pattern to your measurements, quote the fabric and embellishment cost, and stitch the outfit exactly. We are honest about what is and is not possible from a reference: if a runway construction needs a specific fabric that is not available, we suggest the closest match and confirm with you before cutting.',
      },
      {
        heading: 'Fabric Sourcing',
        body: 'You have three options: send us your own fabric via courier, choose from our in-house stock (we send photos on WhatsApp), or ask us to source specific fabric from the Karachi cloth markets and quote you before purchase. For overseas clients, sourcing locally in Karachi is usually much more cost-effective than shipping fabric internationally. We photograph any purchase before cutting so you approve the exact fabric.',
      },
      {
        heading: 'Fit Guarantee',
        body: 'Every custom order is stitched from a fresh paper pattern drafted to your submitted measurements. For heavy or complex designs we run a muslin trial (a rough calico version) so the fit is confirmed before cutting into good fabric. WhatsApp video fittings are available for overseas clients before dispatch. One free minor alteration is offered within 14 days of delivery.',
      },
      {
        heading: 'Timeline and Booking',
        body: 'Custom stitching turnaround depends on complexity — 2–3 weeks for simple designs, 4–6 weeks for medium designs with embroidery, 6–10 weeks for heavy bridal or couture work. We share a written timeline at booking and confirm every milestone (pattern approval, cutting, first fitting, embroidery, finishing, dispatch) on WhatsApp.',
      },
    ],
    images: [
      { src: UNS('photo-1594612173100-0d4c48db5f74'), alt: 'Custom Pakistani dress from reference' },
      { src: UNS('photo-1583391733956-3750e0ff4e8b'), alt: 'Reference-based pattern drafting' },
      { src: UNS('photo-1610030006870-c17f0895c144'), alt: 'Custom bridal from Pinterest reference' },
      { src: UNS('photo-1596993100471-c3905dafa78e'), alt: 'Custom party wear from Instagram post' },
      { src: UNS('photo-1614594975525-e45190c55d0b'), alt: 'Fabric sourcing photo' },
      { src: UNS('photo-1614251055880-ee96e4803393'), alt: 'Finished custom outfit' },
    ],
    testimonials: [T.c, T.f, T.a],
    faqs: [
      { q: 'Can you stitch from a Pinterest or Instagram photo?', a: 'Yes — this is our most requested service. Share the link or image on WhatsApp and we quote fabric, embellishment and timeline.' },
      { q: 'Do you source fabric or do I have to supply it?', a: 'Both options are available. Local sourcing in Karachi is usually cheaper for overseas clients than shipping fabric abroad and back.' },
      { q: 'What if the reference outfit is not possible in the fabric I have?', a: 'We are honest about it up front and suggest the closest achievable version. Approval is always confirmed in writing before cutting.' },
      { q: 'Do you offer a fit guarantee?', a: 'Yes — we stitch from your submitted measurements, offer WhatsApp video fittings before dispatch, and provide one free minor alteration within 14 days.' },
      { q: 'How long does a custom outfit take?', a: '2–3 weeks for simple designs; 4–6 weeks for medium designs with embroidery; 6–10 weeks for heavy bridal work.' },
      { q: 'Do you ship custom outfits worldwide?', a: 'Yes, insured DHL / SkyNet to the USA, UK, Canada, UAE, Australia and more with tracking.' },
    ],
    relatedServices: [
      { label: 'Bridal dress stitching', to: '/services/bridal-dress-stitching', description: 'Custom bridal couture from your reference.' },
      { label: 'Party wear stitching', to: '/services/party-wear-stitching', description: 'Custom party outfits for events.' },
      { label: 'Formal suit stitching', to: '/services/formal-suit-stitching', description: 'Custom formal wear for office and evenings.' },
    ],
    relatedReads: [
      { label: 'How to hire a Pakistani tailor online', to: '/blog/how-to-hire-pakistani-tailor-online' },
      { label: 'Browse tailoring articles', to: '/blog/category/tailoring' },
    ],
  },
};

// Shalwar kameez uses its own dedicated existing page component; add it too for the /services/ path
serviceLandingPages['shalwar-kameez-stitching'] = {
  title: 'Shalwar Kameez Stitching Online | Custom Pakistani Suit Tailor | Ma Tailor',
  metaDescription: 'Custom shalwar kameez stitching by Ma Tailor. Everyday, formal and family shalwar kameez stitched to fit. Ships worldwide with WhatsApp video fittings.',
  metaKeywords: 'shalwar kameez stitching, custom shalwar kameez tailor, Pakistani suit stitching online, shalwar kameez tailor USA UK Canada',
  h1: 'Shalwar Kameez Stitching — Everyday to Formal',
  serviceName: 'Shalwar Kameez Stitching',
  intro: 'The shalwar kameez is the backbone of the Pakistani wardrobe. We stitch it to fit — everyday cotton, printed lawn, formal jamawar and event silk — with clean finishing and lining.',
  heroImage: { src: UNS('photo-1610030006870-c17f0895c144', 1200), alt: 'Custom shalwar kameez stitched by Ma Tailor' },
  highlights: [
    'Everyday, formal & family shalwar kameez',
    'Straight, A-line, angrakha & peplum cuts',
    'Straight, bootcut, tulip, cigarette & patiala trousers',
    'Matching dupatta finishing included',
    'Turnaround from 7–14 days',
    'Worldwide shipping',
  ],
  sections: [
    {
      heading: 'The Wardrobe Staple, Done Right',
      body: 'A shalwar kameez looks simple, but a well-stitched one is instantly recognisable — the shoulder sits flat, the bust darts do not pull, the daman is parallel to the floor, and the trouser drapes without twisting. We stitch shalwar kameez in cotton, lawn, cambric, khaddar, karandi, raw silk, jamawar, chiffon and organza — each with the correct lining, seam finish and closure.',
    },
    {
      heading: 'Cuts and Combinations',
      body: 'Straight-cut kameez with straight pants is the everyday classic. A-line kameez with bootcut pants is flattering for most body types. Angrakha with tulip pants adds a modern twist. Peplum with cigarette pants reads formal and slim. For family functions, a floor-length A-line with a wide dupatta is elegant and forgiving. We advise on the cut based on your body type, occasion and comfort.',
    },
    {
      heading: 'What is Included',
      body: 'Every shalwar kameez stitching order includes: full body measurements, neckline and sleeve design consultation, matching inner lining for the shirt, neat piping around the neckline and daman, hemmed and pico-finished dupatta, straight or bootcut trouser, hooks and eyes for kameez side seams, and final steam pressing.',
    },
    {
      heading: 'Timeline & Overseas Orders',
      body: 'Standard turnaround is 7–14 working days. Overseas clients courier fabric to Karachi and receive stitched suits via insured DHL / SkyNet with tracking. One free minor alteration is offered within 14 days of delivery.',
    },
  ],
  images: [
    { src: UNS('photo-1610030006870-c17f0895c144'), alt: 'Everyday shalwar kameez' },
    { src: UNS('photo-1583391733956-3750e0ff4e8b'), alt: 'A-line kameez with bootcut trouser' },
    { src: UNS('photo-1596993100471-c3905dafa78e'), alt: 'Formal jamawar suit' },
    { src: UNS('photo-1594612173100-0d4c48db5f74'), alt: 'Angrakha kameez detail' },
    { src: UNS('photo-1614594975525-e45190c55d0b'), alt: 'Peplum kameez with cigarette pants' },
    { src: UNS('photo-1614251055880-ee96e4803393'), alt: 'Dupatta lace finishing' },
  ],
  testimonials: [T.a, T.c, T.b],
  faqs: [
    { q: 'What fabrics do you stitch shalwar kameez in?', a: 'Cotton, lawn, cambric, khaddar, karandi, raw silk, jamawar, chiffon and organza — each with the correct lining and finish.' },
    { q: 'How long does shalwar kameez stitching take?', a: 'Standard turnaround is 7–14 working days from fabric receipt. Rush turnaround may be possible on request.' },
    { q: 'Do you stitch matching dupattas?', a: 'Yes — pico finishing, lace application and border stitching are included in the base price.' },
    { q: 'Can I supply my own fabric?', a: 'Absolutely. Courier fabric to our Karachi workshop and we handle it from cutting to final press.' },
    { q: 'Do you ship stitched shalwar kameez abroad?', a: 'Yes, insured DHL / SkyNet to the USA, UK, Canada, UAE, Australia and more.' },
    { q: 'What if the fit is not right on arrival?', a: 'We offer one free minor alteration within 14 days. For overseas clients we can guide a local tailor via WhatsApp video.' },
  ],
  relatedServices: [
    { label: 'Lawn suit stitching', to: '/services/lawn-suit-stitching', description: 'Summer lawn 3-piece stitched to fit.' },
    { label: 'Formal suit stitching', to: '/services/formal-suit-stitching', description: 'Office and event formal suits.' },
  ],
  relatedReads: [
    { label: 'Browse tailoring articles', to: '/blog/category/tailoring' },
  ],
};
