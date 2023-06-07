import useEbirdApi from '../../../useEbirdApi';
import {
  type QueryParam,
  type BaseQueryParam,
} from '../../../../ebirdApiClient';

type DetailLevel = 'simple' | 'full';

export default async function useRecentNearbyNotableObservations(
  latitude: number,
  longitude: number,
  back = 14,
  detailLevel: DetailLevel = 'simple',
  distance = 25,
  hotspot = false,
  maxResults?: number,
  speciesCommonNameLocale = 'en'
) {
  const detailLevelQueryParam: BaseQueryParam<DetailLevel> = {
    defaultValue: 'simple',
    name: 'detail',
    value: detailLevel,
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
    detailLevelQueryParam,
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
      name: 'maxResults',
      value: maxResults,
    },
    {
      defaultValue: 'en',
      name: 'sppLocale',
      value: speciesCommonNameLocale,
    },
  ];

  return await useEbirdApi(
    'data/obs/geo/recent/notable?lat={{lat}}&lng={{lng}}',
    { queryParams }
  );
}
