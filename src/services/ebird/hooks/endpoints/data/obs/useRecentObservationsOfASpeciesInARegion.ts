import useEbirdApi from '../../../useEbirdApi';
import type UrlParam from '../../../../types/UrlParam';
import type QueryParam from '../../../../types/QueryParam';

export default function useRecentObservationsOfASpeciesInARegion() {
  const curriedMakeRequest = useEbirdApi();

  return async function getRecentObservationsOfASpeciesInARegion(
    regionCode: string,
    speciesCode: string,
    back = '14',
    onlyObservationsFromHotspots = false,
    includeProvisional = false,
    maxResults?: string,
    locations?: string[],
    speciesCommonNameLocale = 'en'
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
      {
        name: 'speciesCode',
        value: speciesCode,
      },
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: '14',
        name: 'back',
        value: back,
      },
      {
        defaultValue: false,
        name: 'hotspot',
        value: onlyObservationsFromHotspots,
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
        name: 'r',
        value: locations,
      },
      {
        defaultValue: 'en',
        name: 'sppLocale',
        value: speciesCommonNameLocale,
      },
    ];

    return await curriedMakeRequest(
      'data/obs/{{regionCode}}/recent/{{speciesCode}}',
      {
        urlParams,
        queryParams,
      }
    );
  };
}
