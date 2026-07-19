import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesComponent from '@/components/Services';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { serviceLandingPages } from '@/data/serviceLandingPages';
import { supabase } from '@/integrations/supabase/client';

const Services = () => {
  const [dbPages, setDbPages] = useState<{ slug: string; service_name: string | null; intro: string | null }[] | null>(null);

  useEffect(() => {
    supabase
      .from('service_pages')
      .select('slug,service_name,intro,display_order,is_active')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .then(({ data }) => setDbPages((data as any) ?? []));
  }, []);

  const entries = (() => {
    if (!dbPages) {
      return Object.entries(serviceLandingPages).map(([slug, cfg]) => ({
        slug,
        name: cfg.serviceName,
        intro: cfg.intro,
      }));
    }
    return dbPages.map((r) => {
      const fb = serviceLandingPages[r.slug];
      return {
        slug: r.slug,
        name: r.service_name || fb?.serviceName || r.slug,
        intro: r.intro || fb?.intro || '',
      };
    });
  })();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ma Tailor Services",
    "description": "Professional tailoring and stitching services for girls in Pakistan - Custom stitching, alterations, and bulk orders",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Ma Tailor",
      "telephone": "+92-307-0125273",
      "url": "https://matailor.lovable.app"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Pakistan"
    }
  };

  return (
    <>
      <Helmet>
        <title>Our Services - Ma Tailor | Custom Girls Stitching Pakistan</title>
        <meta name="description" content="Professional tailoring and stitching services for girls in Pakistan. Custom stitching, alterations, and bulk orders with perfect fit and elegant designs." />
        <meta name="keywords" content="tailoring services Pakistan, custom stitching services, girls dress stitching, bulk orders tailoring, dress alterations Pakistan, professional tailor services" />
        <link rel="canonical" href="https://matailor.lovable.app/services" />
        
        <meta property="og:title" content="Our Services - Ma Tailor | Custom Girls Stitching Pakistan" />
        <meta property="og:description" content="Professional tailoring and stitching services with perfect fit and elegant designs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/services" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-black text-white font-montserrat">
        <h1 className="sr-only">Ma Tailor Services - Custom Girls Stitching Pakistan</h1>
        <Navbar />
        <ServicesComponent />

        <section className="py-16 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gold mb-3">Explore Every Stitching Service</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">Dedicated pages with pricing guidance, timelines, FAQs and past work for each stitching category.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {entries.map((e) => (
                <Link
                  key={e.slug}
                  to={`/services/${e.slug}`}
                  className="group block p-6 rounded-xl border border-gold/30 bg-black/50 hover:border-gold hover:bg-black/70 transition-all"
                >
                  <h3 className="text-lg font-semibold text-white group-hover:text-gold mb-2 flex items-center gap-2">
                    {e.name}
                    <ArrowRight className="h-4 w-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-400">{e.intro ? `${e.intro.slice(0, 120)}…` : ''}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Services;
