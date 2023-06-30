import useEbirdApi from '../../../useEbirdApi';
import type EbirdObservationDetailLevel from '../../../../../../types/EbirdObservationDetailLevel';
import type UrlParam from '../../../../types/UrlParam';
import type QueryParam from '../../../../types/QueryParam';

export default function useRecentNotableObservationsInARegion() {
  const curriedMakeRequest = useEbirdApi();

  return async function getRecentNotableObservationsInARegion(
    regionCode: string,
    back = '14',
    detail: EbirdObservationDetailLevel = 'simple',
    onlyObservationsFromHotspots = false,
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
        defaultValue: 'simple',
        name: 'detail',
        value: detail,
      },
      {
        defaultValue: false,
        name: 'hotspot',
        value: onlyObservationsFromHotspots,
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

    return await curriedMakeRequest('data/obs/{{regionCode}}/recent/notable', {
      urlParams,
      queryParams,
    });
  };
}
