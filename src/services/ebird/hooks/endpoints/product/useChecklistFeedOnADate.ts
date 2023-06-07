import useEbirdApi from '../../useEbirdApi';
import yearMonthDayToUrlParams from '../../../helpers/yearMonthDayToUrlParams';
import type {
  UrlParam,
  QueryParam,
  BaseQueryParam,
} from '../../../types/EbirdApiParams';

export type EbirdChecklistFeedOnADateSortBy = 'obs_dt' | 'creation_dt';

export default async function useChecklistFeedOnADate(
  regionCode: string,
  year: number,
  month: number,
  day: number,
  sortKey: EbirdChecklistFeedOnADateSortBy = 'obs_dt',
  maxResults = 10
) {
  const urlParams: UrlParam[] = [
    {
      name: 'regionCode',
      value: regionCode,
    },
    ...yearMonthDayToUrlParams(year, month, day),
  ];

  const sortKeyQueryParam: BaseQueryParam<EbirdChecklistFeedOnADateSortBy> = {
    defaultValue: 'obs_dt',
    name: 'sortKey',
    value: sortKey,
  };

  const queryParams: QueryParam[] = [
    sortKeyQueryParam,
    {
      defaultValue: 10,
      name: 'maxResults',
      value: maxResults,
    },
  ];

  return await useEbirdApi('product/lists/{{regionCode}}/{{y}}/{{m}}/{{d}}', {
    urlParams,
    queryParams,
  });
}
