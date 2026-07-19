import { useParams, Navigate } from 'react-router-dom';
import SeoLandingPage from '@/components/SeoLandingPage';
import { serviceLandingPages } from '@/data/serviceLandingPages';

const ServiceLanding = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/services" replace />;
  const cfg = serviceLandingPages[slug];
  if (!cfg) return <Navigate to="/services" replace />;
  return <SeoLandingPage slug={`services/${slug}`} {...cfg} />;
};

export default ServiceLanding;
