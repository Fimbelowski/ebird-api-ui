import useEbirdApi from '../../useEbirdApi';
import yearMonthDayToUrlParams from '../../../helpers/yearMonthDayToUrlParams';
import type { QueryParam, BaseQueryParam } from '../../../types/EbirdApiParams';
import type UrlParam from '../../../types/UrlParam';

export function useChecklistFeedOnADate() {
  const curriedMakeRequest = useEbirdApi();

  return async function getChecklistFeedOnADate(
    regionCode: string,
    year: string,
    month: string,
    day: string,
    sortKey: EbirdChecklistSortBy = 'obs_dt',
    maxResults = '10'
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
      ...yearMonthDayToUrlParams(year, month, day),
    ];

    const sortKeyQueryParam: BaseQueryParam<EbirdChecklistSortBy> = {
      defaultValue: 'obs_dt',
      name: 'sortKey',
      value: sortKey,
    };

    const queryParams: QueryParam[] = [
      sortKeyQueryParam,
      {
        defaultValue: '10',
        name: 'maxResults',
        value: maxResults,
      },
    ];

    return await curriedMakeRequest(
      'product/lists/{{regionCode}}/{{y}}/{{m}}/{{d}}',
      {
        urlParams,
        queryParams,
      }
    );
  };
}
