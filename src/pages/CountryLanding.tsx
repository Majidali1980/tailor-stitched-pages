import CountryLandingPage from '@/components/CountryLandingPage';
import NotFound from '@/pages/NotFound';
import { COUNTRY_PAGES } from '@/data/countryPages';

interface Props {
  countryKey: string;
}

const CountryLanding = ({ countryKey }: Props) => {
  const data = COUNTRY_PAGES[countryKey];
  if (!data) return <NotFound />;
  return <CountryLandingPage data={data} />;
};

export default CountryLanding;
