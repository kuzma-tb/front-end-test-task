import { FC } from 'react';
import { Breed } from '../../types/breed.types';

interface CatCardProps {
  breed: Breed;
}

const CatCard: FC<CatCardProps> = ({ breed }) => (
  <div className="group flex flex-col h-full bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-200 shadow-sm rounded-xl">
    <div className="p-4 md:p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-300">
        {breed.name}
      </h3>
      <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-gray-300">
        Origin: {breed.origin || 'Unknown'}
      </span>
      <p className="mt-3 text-gray-500 line-clamp-3 dark:text-gray-400">
        {breed.description || 'No description available'}
      </p>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span>Adaptability:</span>
          <span>{breed.adaptability}</span>
        </div>
        <div className="flex justify-between">
          <span>Affection Level:</span>
          <span>{breed.affectionLevel}</span>
        </div>
        <div className="flex justify-between">
          <span>Life Span:</span>
          <span>{breed.lifeSpan} years</span>
        </div>
      </div>
    </div>
  </div>
);

export default CatCard;
