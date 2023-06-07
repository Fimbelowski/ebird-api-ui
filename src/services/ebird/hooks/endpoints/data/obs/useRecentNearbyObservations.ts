import useEbirdApi from '../../../useEbirdApi';
import { type EbirdTaxonomyCategory } from '../../ref/taxonomy/useEbirdTaxonomy';
import {
  type QueryParam,
  type BaseQueryParam,
} from '../../../../ebirdApiClient';

type Sort = 'date' | 'species';

export default async function useRecentNearbyObservations(
  latitude: number,
  longitude: number,
  back = 14,
  category?: EbirdTaxonomyCategory,
  distance = 25,
  hotspot = false,
  includeProvisional = false,
  maxResults?: number,
  sort: Sort = 'date',
  speciesCommonNameLocale = 'en'
) {
  const categoryQueryParam: BaseQueryParam<EbirdTaxonomyCategory> = {
    name: 'cat',
    value: category,
  };

  const sortQueryParam: BaseQueryParam<Sort> = {
    defaultValue: 'date',
    name: 'sort',
    value: sort,
  };

  const queryParams: QueryParam[] = [
    {
      name: 'lat',
      value: latitude,
    },
    {
      name: 'lng',
      value: longitude,
    },
    {
      defaultValue: 14,
      name: 'back',
      value: back,
    },
    categoryQueryParam,
    {
      defaultValue: 25,
      name: 'dist',
      value: distance,
    },
    {
      defaultValue: false,
      name: 'hotspot',
      value: hotspot,
    },
    {
      defaultValue: false,
      name: 'includeProvisional',
      value: includeProvisional,
    },
    {
      name: 'maxResults',
      value: maxResults,
    },
    sortQueryParam,
    {
      defaultValue: 'en',
      name: 'sppLocale',
      value: speciesCommonNameLocale,
    },
  ];

  return await useEbirdApi('data/obs/geo/recent?lat={{lat}}&lng={{lng}}', {
    queryParams,
  });
}
