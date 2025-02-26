import { type FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { useGetBreedsQuery } from '../services/catsApi';
import { Breed } from '../types/breed.types';
import useFilteredAndSortedBreeds from '../hooks/useFilteredAndSortedBreeds';
import Filters from '../components/Filters';
import Select from '../components/UI/Select';
import CatCard from '../components/CatsInfo/CatCard';
import CatStats from '../components/CatsInfo/CatStats';

const HomePage: FC = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const { data: breeds, error, isLoading } = useGetBreedsQuery();

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [filters, setFilters] = useState({
    origin: '',
    adaptability: 3,
    affectionLevel: 3,
    lifeSpan: '1',
    name: '',
  });

  const { sortedBreeds, formattedOrigins } = useFilteredAndSortedBreeds(
    breeds || [],
    filters,
    sortOrder
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading || error) {
    return (
      <div className="flex items-center justify-center h-screen">
        {isLoading ? (
          <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" />
        ) : (
          <div className="text-red-500">Error loading cats data</div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">
        Cat Breeds Statistics
      </h1>

      {/* Filter and Sort UI */}
      <div className="mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <Filters
          originOptions={formattedOrigins}
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      <div className="flex mb-6">
        <div className="flex-none">
          <Select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            options={[
              { value: 'asc', label: 'Sort asc' },
              { value: 'desc', label: 'Sort desc' },
            ]}
            className="bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-600"
          />
        </div>
      </div>

      {/* Statistics Charts */}
      <CatStats breeds={sortedBreeds} />

      {/* Cats Grid */}
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBreeds.map((breed: Breed) => (
          <CatCard
            key={breed.id}
            breed={breed}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
