export interface KarachiArea {
  slug: string;
  name: string;
  /** Broader town / district the area belongs to */
  town: string;
  /** Short intro sentence used in the hero and meta description */
  blurb: string;
  /** Well-known landmarks nearby — used for local relevance signals */
  landmarks: string[];
  /** Approx. travel distance from the Mahmoodabad studio */
  distance: string;
  /** Map query passed to the Google Maps embed */
  mapQuery: string;
  /** Coordinates for LocalBusiness geo + serviceArea schema */
  lat: number;
  lng: number;
  /** Unique long-form local copy (150–250 words) */
  about?: string;
}

export const STUDIO = {
  name: 'Ma Tailor',
  legalName: 'Ma Tailor — Ladies Stitching Studio',
  street: 'Mahmoodabad No 04',
  locality: 'Karachi',
  region: 'Sindh',
  postalCode: '75460',
  country: 'PK',
  phone: '+923070125273',
  phoneDisplay: '+92 307 0125273',
  lat: 24.8607,
  lng: 67.0426,
  priceRange: '$$',
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '11:00', closes: '21:00' },
  ],
} as const;

export const SITE_URL = 'https://matailor.lovable.app';

export const KARACHI_AREAS: KarachiArea[] = [
  {
    slug: 'mahmoodabad',
    name: 'Mahmoodabad',
    town: 'Jamshed Town',
    blurb:
      'Our stitching studio is based right here in Mahmoodabad No 04 — walk in for measurements, fittings and same-week alterations.',
    landmarks: ['Mahmoodabad No 04', 'Manzoor Colony', 'Jamshed Town', 'Chanesar Goth'],
    distance: 'Walk-in studio — 0 km',
    mapQuery: 'Mahmoodabad No 4, Karachi, Sindh, Pakistan',
    lat: 24.8601,
    lng: 67.0448,
  },
  {
    slug: 'gulshan-e-iqbal',
    about:
      'Gulshan-e-Iqbal is a large area, and many customers there tell us the hardest part is finding a reliable tailor who returns outfits on time. We collect fabric from Gulshan Blocks 1 to 13 — around NIPA Chowrangi, Hasan Square, Millennium Mall and the Expo Centre — and bring stitched outfits back to your home, so you never have to sit in traffic for a fitting. Our studio in Mahmoodabad is about 8 km away. Students and working women in Gulshan often order simple lawn and cotton suits for daily wear, while families order wedding outfits in batches before the season. Send us a well-fitting kameez with your fabric and we will match its measurements, or follow our measurement guide on a WhatsApp call. We are happy to stitch shalwar, trousers, tulip pants or palazzos with your kameez — just mention the style. Book home pickup online or message us your block number and we will confirm a slot.',
    name: 'Gulshan-e-Iqbal',
    town: 'Gulshan Town',
    blurb:
      'Ladies tailoring for Gulshan-e-Iqbal blocks 1–13 with free pick and drop of your fabric and stitched outfits.',
    landmarks: ['NIPA Chowrangi', 'Hasan Square', 'Expo Centre', 'Millennium Mall'],
    distance: 'About 8 km from our Mahmoodabad studio',
    mapQuery: 'Gulshan-e-Iqbal, Karachi, Sindh, Pakistan',
    lat: 24.9209,
    lng: 67.0971,
  },
  {
    slug: 'dha',
    about:
      'DHA households often have a busy event calendar — mehndis, nikahs, dinners and Eid — and want a tailor who can manage several outfits at once without repeated trips. We serve DHA Phase 1 to 8, including Khayaban-e-Shahbaz, Zamzama and the Do Darya side, from our Mahmoodabad studio about 9 km away. Our rider collects your fabric, and we keep your measurements on file so the next order needs nothing more than the fabric and a design note. For bridal and heavy formal wear we can arrange a measurement visit in DHA by appointment, and we share progress pictures on WhatsApp before final finishing. Family orders are welcome: matching outfits for sisters, mothers and girls can be stitched together so colours and finishing stay consistent in photos. We also handle alterations on imported and designer pieces. To start, book online with home pickup or send us your address and event date on WhatsApp.',
    name: 'DHA',
    town: 'Defence Housing Authority',
    blurb:
      'Bridal, party and formal stitching for DHA Phase 1–8 with doorstep measurement pick-up and courier delivery.',
    landmarks: ['Khayaban-e-Shahbaz', 'Zamzama', 'DHA Phase 6', 'Do Darya'],
    distance: 'About 9 km from our Mahmoodabad studio',
    mapQuery: 'Defence Housing Authority, Karachi, Sindh, Pakistan',
    lat: 24.8008,
    lng: 67.0561,
  },
  {
    slug: 'clifton',
    about:
      'Clifton customers usually come to us for formal and occasion wear — engagement maxis, walima ghararas, party frocks and well-finished office suits. Whether you live near Dolmen Mall, Boat Basin, Teen Talwar or Bilawal Chowrangi, our Mahmoodabad studio is about 7 km away, and we collect fabric from Clifton Blocks 1 to 9 and deliver the finished outfit to your door. For heavier designer fabric we discuss lining, can-can, piping and dupatta finishing before cutting, so the outfit falls the way the reference picture shows. You can share a Pinterest photo or a boutique look on WhatsApp and we will tell you honestly what your fabric can achieve. Alterations are a big part of our Clifton work too: taking in ready-to-wear pieces, shortening maxis and fixing sleeves so a branded outfit actually fits. Bridal clients can request a measurement visit by appointment. Book online, choose home pickup, and we will confirm the timing on WhatsApp.',
    name: 'Clifton',
    town: 'Saddar Town',
    blurb:
      'Custom ladies stitching for Clifton Blocks 1–9 — bridal wear, formal maxis, office suits and precision alterations.',
    landmarks: ['Dolmen Mall Clifton', 'Boat Basin', 'Teen Talwar', 'Bilawal Chowrangi'],
    distance: 'About 7 km from our Mahmoodabad studio',
    mapQuery: 'Clifton, Karachi, Sindh, Pakistan',
    lat: 24.8138,
    lng: 67.0299,
  },
  {
    slug: 'north-nazimabad',
    about:
      'North Nazimabad has a strong market culture — Hyderi Market alone is where many families buy their fabric and laces — but finding a ladies tailor with neat finishing and on-time delivery is still a common worry. MA Tailor collects fabric from North Nazimabad Blocks A to T, including the areas around Five Star Chowrangi, KDA Chowrangi and Board Office. Our studio is about 15 km away in Mahmoodabad, so we schedule pickups in batches, which keeps the service affordable and reliable. We stitch shalwar kameez, abayas, party frocks and formal maxis, and we can add laces, buttons or piping you have bought from Hyderi. If you want a design copied from a picture, send it on WhatsApp first and we will confirm whether your fabric and quantity work for that cut. Plan a little earlier before Eid and wedding season so we can reserve your stitching slot. Book online with home pickup or WhatsApp your address to begin.',
    name: 'North Nazimabad',
    town: 'North Nazimabad Town',
    blurb:
      'Shalwar kameez, abaya and party wear stitching for North Nazimabad blocks A to T with pick and drop service.',
    landmarks: ['Five Star Chowrangi', 'Hyderi Market', 'KDA Chowrangi', 'Board Office'],
    distance: 'About 15 km from our Mahmoodabad studio',
    mapQuery: 'North Nazimabad, Karachi, Sindh, Pakistan',
    lat: 24.9425,
    lng: 67.0367,
  },
  {
    slug: 'gulistan-e-johar',
    name: 'Gulistan-e-Johar',
    town: 'Gulshan Town',
    blurb:
      'Ladies tailor service across Gulistan-e-Johar blocks 1–20, Rabia City and Johar Chowrangi apartments.',
    landmarks: ['Johar Chowrangi', 'Rabia City', 'Perfume Chowk', 'Safari Park'],
    distance: 'About 12 km from our Mahmoodabad studio',
    mapQuery: 'Gulistan-e-Johar, Karachi, Sindh, Pakistan',
    lat: 24.9204,
    lng: 67.1298,
  },
  {
    slug: 'pechs',
    about:
      'PECHS sits right next to our Mahmoodabad studio, about 4 km away, which makes it one of the fastest areas we serve. Customers from PECHS Blocks 1 to 6, Tariq Road, Nursery and the Shahra-e-Faisal side often shop for fabric on Tariq Road and send it to us the same day. With such a short distance we can collect quickly, arrange a trial fitting for formal pieces and finish alterations sooner than most areas. We stitch everyday kameez, kurtis with matching pants, formal suits for office and events, and bridal wear by appointment. Bring or send a suit that already fits you and we will copy the measurements, or visit the studio for a proper measurement session if you prefer. Tariq Road boutique outfits that are slightly too loose or too long are also welcome for alteration. To get started, book online and choose home pickup, or simply WhatsApp us your address in PECHS and the outfits you want stitched.',
    name: 'PECHS',
    town: 'Jamshed Town',
    blurb:
      'Our closest neighbourhood after Mahmoodabad — quick turnaround stitching and alterations for PECHS Blocks 1–6.',
    landmarks: ['Tariq Road', 'Nursery', 'Shahra-e-Faisal', 'Bahadurabad'],
    distance: 'About 4 km from our Mahmoodabad studio',
    mapQuery: 'PECHS, Karachi, Sindh, Pakistan',
    lat: 24.8664,
    lng: 67.0616,
  },
  {
    slug: 'bahadurabad',
    about:
      'Bahadurabad is one of our closest neighbourhoods — about 3 km from our Mahmoodabad studio — so it is ideal if you want quick fittings and fast alterations. Customers around Bahadurabad Chowrangi, Alamgir Road, Dhoraji Colony and CP Berar Society often bring us boutique pieces that need resizing, along with fresh unstitched suits from the local shops. Because the drive is short, we can usually collect fabric the same or next day and return trial pieces for a fitting check before final finishing. We stitch straight-cut and A-line kameez, frocks, kurtis with tulip or cigarette pants, and formal maxis for nikah and walima events. If you already own a suit that fits you well, send it with your fabric and we will copy the fit exactly, so there is no need for a measurement visit. Working women in Bahadurabad also use our office-wear service for plain, neatly finished suits for the week. Book a pickup online or WhatsApp us your address to get started.',
    name: 'Bahadurabad',
    town: 'Jamshed Town',
    blurb:
      'Fast ladies stitching and fitting service for Bahadurabad, Alamgir Road and the surrounding CP Berar Society.',
    landmarks: ['Bahadurabad Chowrangi', 'Alamgir Road', 'Dhoraji Colony', 'CP Berar Society'],
    distance: 'About 3 km from our Mahmoodabad studio',
    mapQuery: 'Bahadurabad, Karachi, Sindh, Pakistan',
    lat: 24.8797,
    lng: 67.0602,
  },
  {
    slug: 'malir',
    name: 'Malir',
    town: 'Malir Town',
    blurb:
      'Stitching service for Malir Cantt, Model Colony and Saudabad with scheduled fabric pick-up and delivery.',
    landmarks: ['Malir Cantt', 'Model Colony', 'Saudabad', 'Malir Halt'],
    distance: 'About 18 km from our Mahmoodabad studio',
    mapQuery: 'Malir, Karachi, Sindh, Pakistan',
    lat: 24.8918,
    lng: 67.2065,
  },
  {
    slug: 'korangi',
    name: 'Korangi',
    town: 'Korangi Town',
    blurb:
      'Affordable ladies tailoring for Korangi No 1–6, Zaman Town and Landhi with pick and drop across the district.',
    landmarks: ['Korangi Crossing', 'Zaman Town', 'Landhi', 'Korangi Industrial Area'],
    distance: 'About 11 km from our Mahmoodabad studio',
    mapQuery: 'Korangi, Karachi, Sindh, Pakistan',
    lat: 24.8402,
    lng: 67.1319,
  },
  {
    slug: 'saddar',
    about:
      'Saddar is where much of Karachi buys its fabric — Zainab Market, Empress Market and the cloth stalls around Preedy Street and Garden East. If you shop for lawn, chiffon or wedding fabric downtown, you do not need to carry it across the city looking for a tailor. Our Mahmoodabad studio is roughly 6 km away, so we can collect your fabric from your home or office in Saddar and bring the stitched outfit back. Many Saddar customers order everyday shalwar kameez in batches after a market trip, then add one party or formal suit for an upcoming event. Tell us which market piece is for which design, share a photo of the neckline or sleeve you like, and we cut everything to the measurements we keep on file. For urgent weddings and Eid, message us early on WhatsApp with your date — Saddar pickups are quick because of the short distance, which gives us more stitching time. Book your pickup online or send a voice note with your address and we will confirm a slot.',
    name: 'Saddar',
    town: 'Saddar Town',
    blurb:
      'Old-city stitching service for Saddar, Empress Market and Garden East — ideal if you buy fabric downtown.',
    landmarks: ['Empress Market', 'Zainab Market', 'Garden East', 'Preedy Street'],
    distance: 'About 6 km from our Mahmoodabad studio',
    mapQuery: 'Saddar, Karachi, Sindh, Pakistan',
    lat: 24.8607,
    lng: 67.0221,
  },
  {
    slug: 'scheme-33',
    name: 'Scheme 33',
    town: 'Gadap Town',
    blurb:
      'Ladies tailor covering Scheme 33, Gulzar-e-Hijri and Abul Hassan Isphahani Road societies.',
    landmarks: ['Gulzar-e-Hijri', 'Abul Hassan Isphahani Road', 'Sohrab Goth', 'Ahsanabad'],
    distance: 'About 20 km from our Mahmoodabad studio',
    mapQuery: 'Scheme 33, Karachi, Sindh, Pakistan',
    lat: 24.9498,
    lng: 67.1149,
  },
];

export const getArea = (slug?: string) =>
  KARACHI_AREAS.find((a) => a.slug === slug);
