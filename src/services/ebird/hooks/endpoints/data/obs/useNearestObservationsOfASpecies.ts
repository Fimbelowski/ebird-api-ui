import useEbirdApi from '../../../useEbirdApi';
import type { QueryParam } from '../../../../types/EbirdApiParams';
import type UrlParam from '../../../../types/UrlParam';

export default function useNearestObservationsOfASpecies() {
  const curriedMakeRequest = useEbirdApi();

  return async function getNearestObservationOfASpecies(
    speciesCode: string,
    latitude: string,
    longitude: string,
    back = '14',
    hotspot = false,
    includeProvisional = false,
    maxResults?: string,
    speciesCommonNameLocale = 'en',
    distance?: string
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

    return await curriedMakeRequest('data/nearest/geo/recent/{{speciesCode}}', {
      urlParams,
      queryParams,
    });
  };
}
