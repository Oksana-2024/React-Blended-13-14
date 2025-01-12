import { FiSearch } from 'react-icons/fi';
import styles from './SearchForm.module.css';
import { useSearchParams } from 'react-router-dom';

const regions = [
  { id: 'africa', value: 'africa', name: 'Africa' },
  { id: 'america', value: 'america', name: 'America' },
  { id: 'asia', value: 'asia', name: 'Asia' },
  { id: 'europe', value: 'europe', name: 'Europe' },
  { id: 'oceania', value: 'oceania', name: 'Oceania' },
];

const SearchForm = ({ onSubmit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get('region');

  const handleSubmit = event => {
    event.preventDefault();
    const value = event.target.elements.region.value;
    if (value === 'default') return;

    onSubmit(value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <select
        aria-label="select"
        className={styles.select}
        name="region"
        required
        defaultValue={region}
      >
        <option disabled value="default">
          Select a region
        </option>
        {regions.map(region => {
          return (
            <option value={region.value} key={region.id}>
              {region.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default SearchForm;
