
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import WhatsAppFloat from "./components/WhatsAppFloat";
import BottomNav from "./components/BottomNav";
import TailorAssistant from "./components/TailorAssistant";
import Index from "./pages/Index";

// Lazy load all non-homepage routes
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Videos = lazy(() => import("./pages/Videos"));
const Reviews = lazy(() => import("./pages/Reviews"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Booking = lazy(() => import("./pages/Booking"));
const BulkOrders = lazy(() => import("./pages/BulkOrders"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogSeoAudit = lazy(() => import("./pages/BlogSeoAudit"));
const AIDesignStudio = lazy(() => import("./pages/AIDesignStudio"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const Career = lazy(() => import("./pages/Career"));
const Services = lazy(() => import("./pages/Services"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));
const PakistaniTailorOnline = lazy(() => import("./pages/PakistaniTailorOnline"));
const BridalDressStitching = lazy(() => import("./pages/BridalDressStitching"));
const ShalwarKameezStitching = lazy(() => import("./pages/ShalwarKameezStitching"));
const BlogTaxonomy = lazy(() => import("./pages/BlogTaxonomy"));
const SpecialDiscountOffers = lazy(() => import("./pages/SpecialDiscountOffers"));
const SpecialDiscountOfferDetail = lazy(() => import("./pages/SpecialDiscountOfferDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/admin/Login"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <WhatsAppFloat />
      <TailorAssistant />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/bulk-orders" element={<BulkOrders />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/category/:category" element={<BlogTaxonomy mode="category" />} />
              <Route path="/blog/tag/:tag" element={<BlogTaxonomy mode="tag" />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/admin/blog-seo-audit" element={<BlogSeoAudit />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/ai-design-studio" element={<AIDesignStudio />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/career" element={<Career />} />
              <Route path="/services" element={<Services />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/pakistani-tailor-online" element={<PakistaniTailorOnline />} />
              <Route path="/bridal-dress-stitching" element={<BridalDressStitching />} />
              <Route path="/shalwar-kameez-stitching" element={<ShalwarKameezStitching />} />
              <Route path="/special-discount-offers" element={<SpecialDiscountOffers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <BottomNav />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
