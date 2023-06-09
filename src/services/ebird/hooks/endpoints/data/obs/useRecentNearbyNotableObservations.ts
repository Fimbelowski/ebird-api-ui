import useEbirdApi from '../../../useEbirdApi';
import type EbirdObservationDetailLevel from '../../../../../../types/EbirdObservationDetailLevel';
import type {
  QueryParam,
  BaseQueryParam,
} from '../../../../types/EbirdApiParams';

export default function useRecentNearbyNotableObservations() {
  const curriedMakeRequest = useEbirdApi();

  return async function getRecentNearbyNotableObservations(
    latitude: string,
    longitude: string,
    back = '14',
    detailLevel: EbirdObservationDetailLevel = 'simple',
    distance = '25',
    hotspot = false,
    maxResults?: string,
    speciesCommonNameLocale = 'en'
  ) {
    const detailLevelQueryParam: BaseQueryParam<EbirdObservationDetailLevel> = {
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
        defaultValue: '14',
        name: 'back',
        value: back,
      },
      detailLevelQueryParam,
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
      'data/obs/geo/recent/notable?lat={{lat}}&lng={{lng}}',
      { queryParams }
    );
  };
}
