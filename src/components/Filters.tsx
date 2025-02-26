import { FC } from 'react';
import Input from './UI/Input';
import Select from './UI/Select';

interface FiltersProps {
  originOptions: { value: string; label: string }[];
  filters: {
    origin: string;
    adaptability: number;
    affectionLevel: number;
    lifeSpan: string;
    name: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const Filters: FC<FiltersProps> = ({ originOptions, filters, setFilters }) => {
  return (
    <div className="grid grid-cols-12 gap-4 border border-gray-200 rounded-lg p-4 items-center">
      <div className="flex flex-col col-span-3 w-full">
        <Select
          label="Origin:"
          id="origin"
          labelClassName="text-center"
          value={filters.origin}
          onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
          options={originOptions}
        />
      </div>

      <div className="flex flex-col col-span-2 w-full">
        <Input
          type="range"
          id="adaptability"
          label={`Adaptability: ${filters.adaptability}`}
          labelClassName="text-center"
          min="1"
          max="5"
          value={filters.adaptability}
          onChange={(e) =>
            setFilters({ ...filters, adaptability: Number(e.target.value) })
          }
        />
      </div>

      <div className="flex flex-col col-span-2 w-full">
        <Input
          type="range"
          id="affectionLevel"
          label={`Affection Level: ${filters.affectionLevel}`}
          labelClassName="text-center"
          min="1"
          max="5"
          value={filters.affectionLevel}
          onChange={(e) =>
            setFilters({ ...filters, affectionLevel: Number(e.target.value) })
          }
        />
      </div>

      <div className="flex flex-col col-span-1 w-full">
        <Input
          type="number"
          id="lifeSpan"
          label="Life Span:"
          labelClassName="text-center"
          min="1"
          max="20"
          value={filters.lifeSpan}
          onChange={(e) =>
            setFilters({ ...filters, lifeSpan: Number(e.target.value) })
          }
        />
      </div>

      <div className="flex flex-col col-span-4 w-full">
        <Input
          type="text"
          id="name"
          label="Name:"
          labelClassName="text-center"
          placeholder="Enter keyword..."
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          autoComplete="true"
        />
      </div>
    </div>
  );
};

export default Filters;
