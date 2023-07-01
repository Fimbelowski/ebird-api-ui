import useEbirdApi from '../../../useEbirdApi';
import type EbirdTaxonomyCategory from '../../../../../../types/EbirdTaxonomyCategory';
import type QueryParam from '../../../../types/QueryParam';
import type EbirdRecentNearbyObservationsSortBy from '../../../../../../types/EbirdRecentNearbyObservationsSortBy';

export function useRecentNearbyObservations() {
  const curriedMakeRequest = useEbirdApi();

  return async function getRecentNearbyObservations(
    latitude: string,
    longitude: string,
    back = '14',
    category?: EbirdTaxonomyCategory,
    distance = '25',
    onlyObservationsFromHotspots = false,
    includeProvisionalObservations = false,
    maxResults?: string,
    sort: EbirdRecentNearbyObservationsSortBy = 'date',
    speciesCommonNameLocale = 'en'
  ) {
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
        name: 'cat',
        value: category,
      },
      {
        defaultValue: '25',
        name: 'dist',
        value: distance,
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
        defaultValue: 'date',
        name: 'sort',
        value: sort,
      },
      {
        defaultValue: 'en',
        name: 'sppLocale',
        value: speciesCommonNameLocale,
      },
    ];

    return await curriedMakeRequest('data/obs/geo/recent', {
      queryParams,
    });
  };
}
