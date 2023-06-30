import useEbirdApi from '../../../useEbirdApi';
import type EbirdTaxonomyCategory from '../../../../../../types/EbirdTaxonomyCategory';
import type UrlParam from '../../../../types/UrlParam';
import type QueryParam from '../../../../types/QueryParam';

export default function useRecentObservationsInARegion() {
  const curriedMakeRequest = useEbirdApi();

  return async function getRecentObservationsInARegion(
    regionCode: string,
    back = '14',
    category?: EbirdTaxonomyCategory,
    onlyObservationsFromHotspots = false,
    includeProvisionalObservations = false,
    maxResults?: string,
    locations?: string,
    speciesCommonNameLocale = 'en'
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: '14',
        name: 'back',
        value: back,
      },
      {
        name: 'cat',
        value: category,
      },
      {
        defaultValue: false,
        name: 'hotspot',
        value: onlyObservationsFromHotspots,
      },
      {
        defaultValue: false,
        name: 'includeProvisional',
        value: includeProvisionalObservations,
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

    return await curriedMakeRequest('data/obs/{{regionCode}}/recent', {
      urlParams,
      queryParams,
    });
  };
}
