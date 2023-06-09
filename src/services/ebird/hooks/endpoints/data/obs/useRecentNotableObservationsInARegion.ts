import useEbirdApi from '../../../useEbirdApi';
import type EbirdObservationDetailLevel from '../../../../types/EbirdObservationDetailLevel';
import type {
  UrlParam,
  QueryParam,
  BaseQueryParam,
} from '../../../../types/EbirdApiParams';

export default function useRecentNotableObservationsInARegion() {
  const curriedMakeRequest = useEbirdApi();

  return async function getRecentNotableObservationsInARegion(
    regionCode: string,
    back = '14',
    detail: EbirdObservationDetailLevel = 'simple',
    hotspot = false,
    maxResults?: string,
    locations?: string[],
    speciesCommonNameLocale = 'en'
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    const detailLevelQueryParam: BaseQueryParam<EbirdObservationDetailLevel> = {
      defaultValue: 'simple',
      name: 'detail',
      value: detail,
    };

    const queryParams: QueryParam[] = [
      {
        defaultValue: '14',
        name: 'back',
        value: back,
      },
      detailLevelQueryParam,
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
