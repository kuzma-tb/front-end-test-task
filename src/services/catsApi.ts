import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
} from '@reduxjs/toolkit/query/react';
import { Breed } from '../types/breed.types';
import { ApiBreed, mapApiBreedToDTO } from '../dto/breed.dto';

type BreedsResponse = Breed[];

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('x-api-key', import.meta.env.VITE_API_KEY || '');

    return headers;
  },
});

const baseQueryWithRetry: BaseQueryFn<string, unknown, unknown> = async (
  url,
  api,
  extraOptions
) => {
  let result = await baseQuery(url, api, extraOptions);
  if (result.error) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    result = await baseQuery(url, api, extraOptions);
  }

  return result;
};

export const catsApi = createApi({
  reducerPath: 'catsApi',
  baseQuery: baseQueryWithRetry,
  endpoints: (build) => ({
    getBreeds: build.query<BreedsResponse, void>({
      query: () => 'breeds',
      transformResponse: (response: ApiBreed[]): Breed[] => {
        return response.map(mapApiBreedToDTO);
      },
    }),
  }),
});

export const { useGetBreedsQuery } = catsApi;
