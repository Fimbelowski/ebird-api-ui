import useEbirdApi from '../../../useEbirdApi';
import {
  type UrlParam,
  type QueryParam,
  type BaseQueryParam,
} from '../../../../ebirdApiClient';

type DetailLevel = 'simple' | 'full';

export default async function useRecentNotableObservationsInARegion(
  regionCode: string,
  back = 14,
  detail: DetailLevel = 'simple',
  hotspot = false,
  maxResults?: number,
  locations?: string[],
  speciesCommonNameLocale = 'en'
) {
  const urlParams: UrlParam[] = [
    {
      name: 'regionCode',
      value: regionCode,
    },
  ];

  const detailLevelQueryParam: BaseQueryParam<DetailLevel> = {
    defaultValue: 'simple',
    name: 'detail',
    value: detail,
  };

  const queryParams: QueryParam[] = [
    {
      defaultValue: 14,
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

  return await useEbirdApi('data/obs/{{regionCode}}/recent/notable', {
    urlParams,
    queryParams,
  });
}
