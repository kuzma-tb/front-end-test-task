import { type FC } from 'react';
import { Breed } from '../../types/breed.types';

import BarChartComponent from '../Charts/BarChartComponent';
import PieChartComponent from '../Charts/PieChartComponent';
import LineChartComponent from '../Charts/LineChartComponent';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#82ca9d',
];

interface CatStatsProps {
  breeds: Breed[];
}

const CatStats: FC<CatStatsProps> = ({ breeds }) => {
  const adaptabilityData = breeds?.map((breed: Breed) => ({
    name: breed.name,
    value: breed.adaptability,
  }));

  const affectionData = breeds?.map((breed: Breed) => ({
    name: breed.name,
    value: breed.affectionLevel,
  }));

  const originCounts: Record<string, number> = {};
  breeds?.forEach((breed: Breed) => {
    originCounts[breed.origin] = (originCounts[breed.origin] || 0) + 1;
  });

  const originData = Object.keys(originCounts).map((origin) => ({
    name: origin,
    value: originCounts[origin],
  }));

  const indoorCounts = breeds?.reduce(
    (acc, breed) => {
      if (breed.indoor === 1) acc.indoor++;
      else acc.outdoor++;
      return acc;
    },
    { indoor: 0, outdoor: 0 }
  );

  const indoorData = [
    { name: 'Indoor', value: indoorCounts?.indoor || 0 },
    { name: 'Outdoor', value: indoorCounts?.outdoor || 0 },
  ];

  const lapCounts = breeds?.reduce(
    (acc, breed) => {
      if (breed.lap) acc.lap++;
      else acc.notLap++;
      return acc;
    },
    { lap: 0, notLap: 0 }
  );

  const lapData = [
    { name: 'Lap Cats', value: lapCounts?.lap || 0 },
    { name: 'Not Lap Cats', value: lapCounts?.notLap || 0 },
  ];

  const lifeSpanData = breeds?.map((breed: Breed) => ({
    name: breed.name,
    years:
      (parseInt(breed.lifeSpan.split('-')[0]) +
        parseInt(breed.lifeSpan.split('-')[1])) /
      2,
  }));

  return (
    <>
      {/* Adaptability Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BarChartComponent
          title="Affection Levels"
          data={affectionData}
          color="#0088FE"
        />

        {/* Affection Levels */}
        <BarChartComponent
          title="Adaptability Distribution"
          data={adaptabilityData}
          color="#00C49F"
        />

        {/* Top Origins */}
        <PieChartComponent
          title="Top Origins"
          data={originData}
          colors={COLORS}
        />

        {/* Indoor vs Outdoor Chart */}
        <PieChartComponent
          title="Indoor vs Outdoor Preference"
          data={indoorData}
          colors={COLORS}
        />

        {/* Lap Cat Distribution */}
        <PieChartComponent
          title="Lap Cat Distribution"
          data={lapData}
          colors={COLORS}
        />

        {/* Life Span Distribution */}
        <LineChartComponent
          title="Life Span Distribution"
          data={lifeSpanData}
          color="#8884d8"
        />
      </div>
    </>
  );
};

export default CatStats;
