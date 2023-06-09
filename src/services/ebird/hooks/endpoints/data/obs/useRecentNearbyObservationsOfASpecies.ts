import useEbirdApi from '../../../useEbirdApi';
import type { UrlParam, QueryParam } from '../../../../types/EbirdApiParams';

export default function useRecentNearbyObservationsOfASpecies() {
  const curriedMakeRequest = useEbirdApi();

  return async function getRecentNearbyObservationsOfASpecies(
    speciesCode: string,
    latitude: string,
    longitude: string,
    back = '14',
    distance = '25',
    hotspot = false,
    includeProvisional = false,
    maxResults?: string,
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
        defaultValue: '14',
        name: 'back',
        value: back,
      },
      {
        defaultValue: '25',
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

    return await curriedMakeRequest(
      'data/obs/geo/recent/{{speciesCode}}?lat={{lat}}&lng={{lng}}',
      { urlParams, queryParams }
    );
  };
}
