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
