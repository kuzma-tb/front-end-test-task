import { useMemo } from 'react';
import { Breed } from '../types/breed.types';

const useFilteredAndSortedBreeds = (
  breeds: Breed[],
  filters: any,
  sortOrder: 'asc' | 'desc'
) => {
  const uniqueOrigins = [...new Set(breeds.map((breed) => breed.origin))];

  const formattedOrigins = [
    { value: 'All', label: 'All' },
    ...uniqueOrigins.map((origin) => ({
      value: origin,
      label: origin,
    })),
  ];

  const filteredBreeds = breeds.filter((breed) => {
    const matchesOrigin =
      filters.origin && filters.origin !== 'All'
        ? breed.origin === filters.origin
        : true;
    const matchesAdaptability = breed.adaptability >= filters.adaptability;
    const matchesAffection = breed.affectionLevel >= filters.affectionLevel;
    const matchesLifeSpan = filters.lifeSpan
      ? breed.lifeSpan.includes(filters.lifeSpan)
      : true;
    const matchesDescription = filters.name
      ? breed.name?.toLowerCase().includes(filters.name.toLowerCase())
      : true;

    return (
      matchesOrigin &&
      matchesAdaptability &&
      matchesAffection &&
      matchesLifeSpan &&
      matchesDescription
    );
  });

  const sortedBreeds = useMemo(
    () =>
      filteredBreeds.sort((a, b) =>
        sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      ),
    [filteredBreeds, sortOrder]
  );

  return { sortedBreeds, formattedOrigins };
};

export default useFilteredAndSortedBreeds;
