import useEbirdApi from '../../../useEbirdApi';
import { type UrlParam, type QueryParam } from '../../../../ebirdApiClient';

export default async function useRecentNearbyObservationsOfASpecies(
  speciesCode: string,
  latitude: number,
  longitude: number,
  back = 14,
  distance = 25,
  hotspot = false,
  includeProvisional = false,
  maxResults?: number,
  speciesCommonNameLocale = 'en'
) {
  const urlParams: UrlParam[] = [
    {
      name: 'speciesCode',
      value: speciesCode,
    },
  ];

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
    {
      defaultValue: 'en',
      name: 'sppLocale',
      value: speciesCommonNameLocale,
    },
  ];

  return await useEbirdApi(
    'data/obs/geo/recent/{{speciesCode}}?lat={{lat}}&lng={{lng}}',
    { urlParams, queryParams }
  );
}
