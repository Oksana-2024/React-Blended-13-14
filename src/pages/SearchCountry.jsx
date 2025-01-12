import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import SearchForm from '../components/SearchForm/SearchForm';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import CountryList from '../components/CountryList/CountryList';
import { fetchByRegion } from '../service/countryApi';

const SearchCountry = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isloading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  const region = searchParams.get('region');

  const onSubmit = region => {
    setSearchParams({ region });
  };

  useEffect(() => {
    if (region === null) return;
    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [region]);
  return (
    <Section>
      <Container>
        <Heading title="SearchCountry" bottom />
        <SearchForm onSubmit={onSubmit} />
        <CountryList countries={countries} />
        {isloading && <Loader />}
      </Container>
    </Section>
  );
};

export default SearchCountry;
