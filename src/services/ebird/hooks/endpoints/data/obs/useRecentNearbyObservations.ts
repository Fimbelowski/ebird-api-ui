import useEbirdApi from '../../../useEbirdApi';
import type EbirdTaxonomyCategory from '../../../../../../types/EbirdTaxonomyCategory';
import type {
  QueryParam,
  BaseQueryParam,
} from '../../../../types/EbirdApiParams';

export type EbirdRecentNearbyObservationsSortBy = 'date' | 'species';

export default function useRecentNearbyObservations() {
  const curriedMakeRequest = useEbirdApi();

  return async function getRecentNearbyObservations(
    latitude: string,
    longitude: string,
    back = '14',
    category?: EbirdTaxonomyCategory,
    distance = '25',
    hotspot = false,
    includeProvisional = false,
    maxResults?: string,
    sort: EbirdRecentNearbyObservationsSortBy = 'date',
    speciesCommonNameLocale = 'en'
  ) {
    const categoryQueryParam: BaseQueryParam<EbirdTaxonomyCategory> = {
      name: 'cat',
      value: category,
    };

    const sortQueryParam: BaseQueryParam<EbirdRecentNearbyObservationsSortBy> =
      {
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
        defaultValue: '14',
        name: 'back',
        value: back,
      },
      categoryQueryParam,
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
      sortQueryParam,
      {
        defaultValue: 'en',
        name: 'sppLocale',
        value: speciesCommonNameLocale,
      },
    ];

    return await curriedMakeRequest(
      'data/obs/geo/recent?lat={{lat}}&lng={{lng}}',
      {
        queryParams,
      }
    );
  };
}
