import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import DynamicGallery from '@/components/DynamicGallery';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';

type GalleryRow = {
  image_url: string;
  caption: string | null;
  category: string | null;
};

const GalleryPage = () => {
  const [images, setImages] = useState<GalleryRow[]>([]);

  useEffect(() => {
    supabase
      .from('gallery')
      .select('image_url,caption,category')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .limit(60)
      .then(({ data }) => setImages((data as GalleryRow[]) ?? []));
  }, []);

  const pageUrl = 'https://matailor.lovable.app/gallery';

  const imageGalleryLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Ma Tailor Gallery',
    description:
      'Custom girls stitching designs gallery - View premium dresses and stitching details crafted for girls in Pakistan',
    url: pageUrl,
    image: images.map((img) => img.image_url),
    associatedMedia: images.map((img) => ({
      '@type': 'ImageObject',
      contentUrl: img.image_url,
      url: img.image_url,
      name: img.caption || 'Ma Tailor stitched design',
      description: img.caption || 'Custom stitched design by Ma Tailor',
      caption: img.caption || undefined,
      keywords: img.category || undefined,
      creditText: 'Ma Tailor',
      creator: { '@type': 'Organization', name: 'Ma Tailor' },
      copyrightNotice: '© Ma Tailor',
      license: pageUrl,
      acquireLicensePage: pageUrl,
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://matailor.lovable.app/' },
      { '@type': 'ListItem', position: 2, name: 'Gallery', item: pageUrl },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Ma Tailor Gallery – Custom Girls Stitching Designs</title>
        <meta name="description" content="Explore Ma Tailor's stitched dress gallery. View premium designs and stitching details crafted for girls in Pakistan." />
        <meta name="keywords" content="stitched dresses gallery Pakistan, custom tailoring showcase, girls stitched designs online, Pakistani dress designs, tailored outfits gallery" />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:title" content="Ma Tailor Gallery – Custom Girls Stitching Designs" />
        <meta property="og:description" content="Explore our stitched dress gallery with premium designs and stitching details." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        {images[0]?.image_url && <meta property="og:image" content={images[0].image_url} />}
        <meta name="twitter:card" content="summary_large_image" />
        {images[0]?.image_url && <meta name="twitter:image" content={images[0].image_url} />}

        <script type="application/ld+json">{JSON.stringify(imageGalleryLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-black text-white font-montserrat">
        <h1 className="sr-only">Ma Tailor Gallery - Custom Girls Stitching Designs</h1>
        <Navbar />
        <DynamicGallery />
        <Footer />
      </div>
    </>
  );
};

export default GalleryPage;
