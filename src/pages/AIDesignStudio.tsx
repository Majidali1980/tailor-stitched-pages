import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AIGalleryCarousel } from '@/components/AIGalleryCarousel';
import { DesignGeneratorForm } from '@/components/DesignGeneratorForm';
import { DesignChatAgent } from '@/components/DesignChatAgent';

const AIDesignStudio = () => {
  return (
    <>
      <Helmet>
        <title>AI Design Studio - Create Your Perfect Dress | MA Tailor</title>
        <meta 
          name="description" 
          content="Use AI to design your perfect Pakistani and Indian stitched dress. Get instant previews, styling suggestions, and expert consultation from our AI fashion designer." 
        />
        <meta name="keywords" content="AI fashion design, custom dress design, Pakistani dress designer, Indian outfit creator, stitching design tool" />
        <link rel="canonical" href="https://matailor.lovable.app/ai-design-studio" />
        <meta property="og:title" content="AI Design Studio – Ma Tailor" />
        <meta property="og:description" content="Design your perfect Pakistani or Indian stitched outfit with our AI design studio." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/ai-design-studio" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section with Carousel */}
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 bg-gradient-to-r from-primary via-gold to-accent bg-clip-text text-transparent">
                AI Design Studio
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Bring your dream dress to life with AI-powered design. Choose your style, get instant previews, and consult with our AI fashion expert.
              </p>
            </div>
            
            <AIGalleryCarousel />
          </div>
        </section>

        {/* Design Generator Section */}
        <section className="py-16 px-4 bg-muted/20">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Create Your Custom Design
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Fill in your preferences and watch as AI generates a beautiful preview of your perfect dress
              </p>
            </div>
            
            <DesignGeneratorForm />
          </div>
        </section>

        {/* AI Chat Agent Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Chat with Our AI Fashion Consultant
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get personalized styling advice, color recommendations, and design suggestions from our AI expert
              </p>
            </div>
            
            <DesignChatAgent />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AIDesignStudio;