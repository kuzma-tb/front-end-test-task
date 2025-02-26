import { Breed } from '../types/breed.types';

export interface ApiBreed {
  id: string;
  name: string;
  origin: string;
  description: string;
  adaptability: number;
  affection_level: number;
  life_span: string;
  lap: number;
  indoor: number;
}

export const mapApiBreedToDTO = (apiBreed: ApiBreed): Breed => ({
  id: apiBreed.id,
  name: apiBreed.name,
  origin: apiBreed.origin,
  description: apiBreed.description,
  adaptability: apiBreed.adaptability,
  affectionLevel: apiBreed.affection_level,
  lifeSpan: apiBreed.life_span,
  lap: apiBreed.lap,
  indoor: apiBreed.indoor,
});
