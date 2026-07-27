import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found (404) | MA Tailor</title>
        <meta name="description" content="The page you're looking for doesn't exist. Browse MA Tailor's stitching services, gallery, and blog instead." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://matailor.lovable.app/" />
        <meta property="og:title" content="Page Not Found | MA Tailor" />
        <meta property="og:description" content="The page you're looking for doesn't exist." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matailor.lovable.app/" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center px-6">
          <h1 className="text-6xl font-playfair font-bold text-gold mb-4">404</h1>
          <p className="text-xl text-gray-300 mb-6">Oops! Page not found</p>
          <Link to="/" className="text-gold hover:text-gold-dark underline font-montserrat">
            Return to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
