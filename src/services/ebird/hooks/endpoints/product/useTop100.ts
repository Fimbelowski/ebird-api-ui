import useEbirdApi from '../../useEbirdApi';
import { type QueryParam, type BaseQueryParam } from '../../../ebirdApiClient';
import yearMonthDayToUrlParams from '../../../helpers/yearMonthDayToUrlParams';
import { type UrlParam } from '../../../types/EbirdApiParams';

export type EbirdTop100RankedBy = 'cl' | 'spp';

export default async function useTop100(
  regionCode: string,
  year: number,
  month: number,
  day: number,
  rankedBy: EbirdTop100RankedBy = 'spp',
  maxResults?: number
) {
  const urlParams: UrlParam[] = [
    {
      name: 'regionCode',
      value: regionCode,
    },
    ...yearMonthDayToUrlParams(year, month, day),
  ];

  const rankedByQueryParam: BaseQueryParam<EbirdTop100RankedBy> = {
    defaultValue: 'spp',
    name: 'rankedBy',
    value: rankedBy,
  };

  const queryParams: QueryParam[] = [
    rankedByQueryParam,
    {
      name: 'maxResults',
      value: maxResults,
    },
  ];

  return await useEbirdApi('product/top100/{{regionCode}}/{{y}}/{{m}}/{{d}}', {
    urlParams,
    queryParams,
  });
}
