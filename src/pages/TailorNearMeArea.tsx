import { useParams } from 'react-router-dom';
import LocalAreaPage from '@/components/LocalAreaPage';
import NotFound from '@/pages/NotFound';
import { getArea } from '@/data/karachiAreas';

const TailorNearMeArea = () => {
  const { area: slug } = useParams<{ area: string }>();
  const area = getArea(slug);

  if (!area) return <NotFound />;

  return <LocalAreaPage area={area} />;
};

export default TailorNearMeArea;
