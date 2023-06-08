import useEbirdApi from '../../../useEbirdApi';
import type { UrlParam, QueryParam } from '../../../../types/EbirdApiParams';

export default function useNearestObservationsOfASpecies() {
  const curriedMakeRequest = useEbirdApi();

  return async function getNearestObservationOfASpecies(
    speciesCode: string,
    latitude: number,
    longitude: number,
    back = 14,
    hotspot = false,
    includeProvisional = false,
    maxResults?: number,
    speciesCommonNameLocale = 'en',
    distance?: number
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
      {
        name: 'dist',
        value: distance,
      },
    ];

    return await curriedMakeRequest(
      'data/nearest/geo/recent/{{speciesCode}}?lat={{lat}}&lng={{lng}}',
      { urlParams, queryParams }
    );
  };
}
